seajs.use(['Ajax', 'dot', 'migrate', 'pagination', 'tips2', "Dialog", 'sortable', 'upload', 'zTree', 'zclip', 'zThide', "jstree", "dataTables", "easyui", "jqui", "bootstrap", "bootstrap_fileupload","swiper_min","query_qrcode_min","qrcode","hammer_min","mobilelable","commoditylable","jquery_Jcrop","jquery_color","imgedit","jquery_pnotify_min"],
	function(Ajax, dot, migrate, pagination, Tips, Dialog, sortable, upload, zTree, zclip, zThide, jstree, dataTables, easyui, jqui, bootstrap, bootstrap_fileupload,swiper_min,query_qrcode_min,qrcode,hammer_min
		,mobilelable,commoditylable,jquery_Jcrop,jquery_color,imgedit,jquery_pnotify_min) {
	var page_size, //共page_size页
			prenum = 0, //上一页页码
			nextnum = 2, //下一页页码
			wechat_id = "", //公众号的id string    必须
			nickname = "", //用户昵称，  
			company_key = "", //公司keyString  必须
			uid = 0, //用户id  int  必须
			pageLength = 10, //每页显示消息数量
			page_num = 5, //??可见页码个数  LG：<<2.3.4.5.6>>
			page_current = 1, //当前页吗
			flag = 0, //??
			pageFlag = 0, //??
			taglistArr,
			selectedImgPath,
			woodid = new Array(),
			tag_id_list = new Array(),
			imgid_arr=new Array(),
			opFlag,//创建标签还是添加图片
			opFlagTag,
			img_tag_json=new Array(),
			img_tag_one=new Array(),
			commodity_goods_name="不限",//切换下拉菜单的时候出发还没写;
			tag_id_edit,
			lablepos;
		var obj = arguments,
			setModel = function() {

				var curalbumid, //专辑id
					curtopicid = 0,
					commodity_id,
					tag_id ,brand_id,
				//					当前话题的id
					cuiimgid = 0,
					comment_count = 0,
					getalbumlist = $$r.routers.data.link.getalbumlist,
					getalbuminfro = $$r.routers.data.link.getalbumlist,
					addalbumlist = $$r.routers.data.link.getalbumlist,
					editalbumlist = $$r.routers.data.link.getalbumlist,
					delalbumlist = $$r.routers.data.link.getalbumlist,
					addTreeItem = $$r.routers.data.link.addTreeItem,
					gettpic = $$r.routers.data.link.gettopic,
					deltopic = $$r.routers.data.link.deltopic,
					addto = $$r.routers.data.link.addtopicto,
					settotop = $$r.routers.data.link.settotop,
					deltopic = $$r.routers.data.link.deltopic,
					getmood = $$r.routers.data.link.mood,
					getdisc = $$r.routers.data.link.getdiscu,
					ptalbumlist = $$r.routers.data.link.ptalbumlist, //findlist
					ptfindone = $$r.routers.data.link.ptfindone,
					pttopic = $$r.routers.data.link.pttopic,
					ptdelbattopic = $$r.routers.data.link.ptdelbattopic,
					ptaddbattopic = $$r.routers.data.link.ptaddbattopic,
					ptlokdiscu = $$r.routers.data.link.ptlokdiscu,
					ptdeldiscu = $$r.routers.data.link.ptdeldiscu,
					ptsettop = $$r.routers.data.link.ptsettop,
					ptaddtopic = $$r.routers.data.link.ptaddtopic,
					ptcretopic = $$r.routers.data.link.ptcretopic,
					ptgettopic = $$r.routers.data.link.ptgettopic,
					ptgetimglist = $$r.routers.data.link.ptgetimglist,
					ptgettaglist = $$r.routers.data.link.ptgettaglist,
					ptupdatetag = $$r.routers.data.link.ptupdatetag,
					ptdeltag = $$r.routers.data.link.ptdeltag,
					ptproductlist = $$r.routers.data.link.ptproductlist,
					upLoadImage = $$r.routers.data.link.upLoadImage,
					updatedigInfo = $$r.routers.data.link.updatedigInfo,
					ptdelimg = $$r.routers.data.link.ptdelimg,
					ptuptopic = $$r.routers.data.link.ptuptopic,
					ptcretage = $$r.routers.data.link.ptcretage,
					ptcrealbum = $$r.routers.data.link.ptcrealbum,
					ptdelalbum = $$r.routers.data.link.ptdelalbum,
					ptcreimg = $$r.routers.data.link.ptcreimg,
					ptselgood = $$r.routers.data.link.ptselgood,
					ptselgoods = $$r.routers.data.link.ptselgoods,
					getcompanygoods = $$r.routers.data.link.getcompanygoods,
					getbatwoods = $$r.routers.data.link.getbatwoods, //这个接口和ptselgoods是同一个接口
					countdefault = $$r.routers.data.link.countdefault,
					checkbinduser = $$r.routers.data.link.checkbinduser,
					pubidlist = $$r.routers.data.link.pubidlist,
					userbind = $$r.routers.data.link.userbind,
					authorlist = $$r.routers.data.link.authorlist,
					gtWechatPid = $$r.routers.data.link.gtWechatPid,
					copylinkUrl = $$r.routers.data.link.copylink,
					commentcount=$$r.routers.data.link.commentcount,
					hostUrl='http://'+window.location.host,
            		homePage=hostUrl+'/pc/photon.html',
					updD = '';
				var pid, copyUrl = 'http://h5plus.net/static/comlibjs/third/zclip/ZeroClipboard.swf';

				function notifications(jsonobj, type) {
					$.pnotify({
			            title: jsonobj.title,
			        	text: jsonobj.txt,
			            type: 'info',
				        delay: '3000'
				    }); 
				    $(".ui-pnotify-history-container").hide();
				    return false;
					if (type == "suc") {
						var html = $rk.tplRender(dot, $('#notifica-success-tml').html(), jsonobj);
						$(".control-group").html(html);
//						$.pnotify({
//				            title: jsonobj.title,
//				        	text: jsonobj.content,
//				            type: 'info',
//				            delay: '5000'
//				        }); 
//				        return false;
					} else if (type == "info") {
						var html = $rk.tplRender(dot, $('#notifica-info-tml').html(), jsonobj);
						$(".control-group").html(html);
					} else if (type == "block") {
						var html = $rk.tplRender(dot, $('#notifica-block-tml').html(), jsonobj);
						$(".control-group").html(html);
					} else if (type == "error") {
						var html = $rk.tplRender(dot, $('#notifica-error-tml').html(), jsonobj);
						$(".control-group").html(html);
					}
					setTimeout(function() {
						$(".control-group").html("");
					}, 3000);
				}

				//微信公众号的选择切换
				var wechatList = new $rk.VC({
					_init: function() {
						var me = this;
						$rk.listener.on('plat', 'ready', function(e, json) {
							$(".cont-all").css("position","static");
							me.getWechatRequest(); //加载微信下拉  2
						});
						$rk.listener.on('selectWX', 'success', function(e, json) {
							me._render(json);
							me.getWechatPid();
							$rk.listener.trigger('menulist', 'getdata');
							me._bind();

						});
						$rk.listener.on("copylink", "suc", function(e, json) {
							me.renderCopylink(json);
						});
					},
					_container: $(".selectWX"),
					_bind: function() {
						//切换微信公众号
						var win_h= window.innerHeight -60;
						$(".main-content>.container-fluid").css("height",win_h+"px");
						var me = this;
						$('ul[data_id=navTop] li:not(:last)').click(function(){
		                    window.parent.location.href=homePage;
		                });
							me._container.find("#usrbidsel").unbind("change").bind("change", function(e, json) {
							var album_id;
							var wechat_id; //=$(this).find("option:selected").attr("weixin_id");
							me.getWechatPid();
							//							//var pid=$(this).find("option:selected").attr("weixin_id");
							createtopic.getAuthorRequest({
								"wechat_id": $(".selectWX>#usrbidsel option:selected").attr("weixin_id"),
//								"page_num": 1,
//								"page_size": 1000
							});
							$rk.listener.trigger('menulist', 'getdata');

						});
					},
					_render: function(json) {
						var html = $rk.tplRender(dot, $('#selectWX-tml').html(), json || {});
						this._container.html(html);
						//$rk.listener.trigger("authorList","success");//*************
						createtopic.getAuthorRequest({
							"wechat_id": $(".selectWX>#usrbidsel option:selected").attr("weixin_id"),
//							"page_num": 1,
//							"page_size": 1000
						});
					},

					getWechatPid: function() {
						var me = this;
//						var pid = "";
						var option = {
							url: gtWechatPid,
							dataType: 'json',
							type: 'get',
							success: function(json) {
								if (!json.msg) {
									pid = json.data._id;
									$rk.listener.trigger("copylink", "suc", json);
								} else {
									pid = json.msg;
								}
								var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
							}
						}
						new Ajax(option);
					},
					getWechatRequest: function() {
						var me = this;
						var option = {
							url: pubidlist,
							dataType: 'json',
							type: 'post',
							success: function(json) {
								//正确返回

								if (!json.error_response) {
									$rk.listener.trigger('selectWX', 'success', json);
								} else {
									//错误返回
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},
					renderCopylink: function(json) {
						var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
						var component_appid = $(".selectWX>#usrbidsel option:selected").attr("component_appid");
						var jsonData = ({
								"copylink": hostUrl+"/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?wehcat_id=" + wechat_id + "&pid=" + json.data._id+"&component_appid="+component_appid
						});
							//		                me.renderCopylink(jsonData);
						var html = $rk.tplRender(dot, $('#j_view_link').html(), jsonData || {});
						$(".panel-copy-link-sty").find('div[data_id=link]').html(html);
					}
				});
				//	//编辑专辑对话框
				//	//编辑专辑对话框
				var editalbumdlg = new $rk.VC({
					_init: function() {
						var me = this;
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
							me._render();
						});

						$rk.listener.on('albumdlg', 'getdata', function(e, c) {
							me.lookDig({//updateDig
								"album_id": curalbumid
							});
						});

					},
					_container: $('#my-dialog-edit-album'),
					_render: function(obj) {
						$('.diglogName').val(obj.album_name);
						$('.dialog_img').attr('src', obj.album_pic_url);
//						if(obj.album_pic_url==""||obj.album_pic_url==null){
//							
//						}
						$('.diglogText').val(obj.album_desc);
						updD = obj.album_pic_url;
						var _this = this;
						var api;
						$('#inputimgpath').change(function(ev) {
							_this.postbindata(function(obj) {
									var jsong = JSON.parse(obj);
									//0512 Tip未修改
									$('.dialog_img').attr('src', jsong.oss_path);
									if (jsong.code == 0 || jsong.code == "0") {
										updD = jsong.oss_path;
										$('.dialog_img').attr('src', jsong.oss_path);
										// _this._render(json["hfive_community_album_findone_response"]);
										//获取专辑数据
									} else if (jsong.code != 0 && jsong.code != "0") {
										var obj = {
											"title": "获取专辑数据",
											"txt":  jsong.msg
										};
										notifications(obj, "error");
									} else {
										var obj = {
											"title": "获取专辑数据",
											"txt": "数据结构出现问题URL:" + ptalbumlist
										};
										notifications(obj, "error");
									}
								},
								document.getElementById("inputimgpath").files[0],
								function(obj) {
								});
						});
						$('.upddig').off("click").on('click', function() {
							_this.updatedig({
								'album_pic_url': updD,
								'album_id': curalbumid,
								'album_name': $('.diglogName').val(),
								'album_desc': $('.diglogText').val()
							});

						});
					},
					postbindata: function(suc, bin, uploading) {
						var fd = new FormData(),
							xhr = new XMLHttpRequest();
						var _this = this;
						fd.append("file", bin);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4 && xhr.status == 200) {
								if (suc instanceof Function) {
									suc(xhr.responseText);
								}
							}
						}
						xhr.upload.onprogress = function(evt) {
							var per = Math.floor(100 * evt.loaded / evt.total);
							if (uploading instanceof Function) {
								uploading(per);
							}
						};
						xhr.open("post", upLoadImage);
						xhr.send(fd);
					},
					bind: function() {
						this._container.off("click");

						this._container.on("click", 'button', function(e) {
							$('.window').hide();
							//$("#dialog-edit-album").show();

						});
					},
					lookDig: function(obj) {//改名字------查看
						var _this = this;
						curalbumid = obj.album_id; //保存当前专辑ID
						var option = {
							url: ptfindone,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_community_album_findone_response"] != undefined) {
									_this._render(json["hfive_community_album_findone_response"]);
								} 
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					uploadImgFun: function(obj) {
						var option = {
							url: upLoadImage,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
									$('.dialog_img').attr('src', json.oss_path);
								if (json["hfive_community_album_findone_response"] != undefined) {
									updD = json.oss_path;
									$('.dialog_img').attr('src', json.oss_path);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取专辑数据",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取专辑数据",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					updatedig: function(obj) {
						var par = obj;
						var option = {
							url: updatedigInfo,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_community_album_update_response"] != undefined) {
									//$rk.listener.trigger('albumdlg', 'getdata');
									albumlist.albuminformation({
										"album_id": par.album_id
									});
									var obj = {
										"title": "编辑专辑",
										"txt": "操作成功！"
									};
//									$("#dig-cteat-album").show();
									$(".close").click();
									notifications(obj, "suc");return;
								}else if(json["error_response"].code=="H5MCI061"){
									var obj = {
										"title": "编辑专辑",
										"txt": "专辑名不能为空！"
									};
//									$("#dig-cteat-album").show();
									notifications(obj, "error");return;
								}else if(json["error_response"].code=="H5MCI314"){
									var obj = {
										"title": "编辑专辑",
										"txt": "专辑名称已存在！"
									};
//									$("#dig-cteat-album").show();
									notifications(obj, "error");return;
								}else if(json["error_response"].code=="H5MCI062"){
									var obj = {
										"title": "编辑专辑",
										"txt": "专辑名称的长度为3到10位字符！"
									};
//									$("#dig-cteat-album").show();
									notifications(obj, "error");return;
								}else if(json["error_response"].code=="H5MCI090"){
									var obj = {
										"title": "编辑专辑",
										"txt": "专辑描述不能为空!"
									};
//									$("#dig-cteat-album").show();
									notifications(obj, "error");
									return;
								}else if(json["error_response"].code=="H5MCI063"){
									var obj={
										"title":"编辑专辑",
										"txt":"尚未选择图片"
									}
									notifications(obj, "error");
									return;
								}
									$("#dig-cteat-album").show();
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//编辑专辑对话框

				//控制菜单
				var controlmenu = new $rk.VC({
					_init: function() {
						var me = this;

						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
						this._bind();
						//						$rk.listener.on("selectWX", "success",function(){
						//							var jsonData=({"copylink":"http://test.h5plus.net/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?wehcat_id="+wechat_id+"&pid="+pid); })
						//		                    me.renderCopylink(json);
						//						})
						//						$rk.listener.on('copylink', 'success', function(e, json) {
						//							var jsonData=({"copylink":"http://test.h5plus.net/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?wehcat_id="+wechat_id+"&pid="+pid); })
						//		                    me.renderCopylink(json);
						//		                });
					},
					_container: $('#controlmenu'),
					_render: function(obj) {
						$(".cancelAdd").click(function() {
							$("#dig-cteat-album").hide();
						});
					},
					_bind: function() {

						$('.panel-slider-arrow').off().on('click', function() {

							$('.panel, .main-content').toggleClass('retracted');
						});

						this._container.off("click");
						//控制菜单栏  的按钮点击事件
						this._container.on("click", ".menubnt", function(e) {
							var flag = $(e.target).attr("data-target");
							if (flag == "#activityAdd") {
								// alert("创建专辑");
								$(".albuminput").val("");
								$(e.target).attr("data-target", "#dig-cteat-album");
							}
						});
					},
					copylinkRequest: function(data) {
						var option = {
							url: copylinkUrl,
							data: data,
							dataType: 'json',
							type: 'post',
							success: function(json) {
								if (!json.error_response) {
									$rk.listener.trigger('copylink', 'success', json);
								} else {
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},

				});
				//编辑专辑对话框

				//选择商品
				var selectwood = new $rk.VC({
					_init: function() {
						var _this = this;
						this._bind();
					},
					_container: $('#dig-select-wood-chair'),
					getgoods: function(obj, fun) {
						//新建话题  ----->选择商品列表
						var _this = this;
						var option = {
							url: getcompanygoods,
							dataType: 'json',
							type: 'post',
							data: obj,
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_weidian_goods_getcompanygoods_response"] != undefined) {
									if (fun != undefined) {
										fun(json["hfive_weidian_goods_getcompanygoods_response"]);
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取商品",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取商品",
										"txt": "数据结构出现问题URL:" + getcompanygoods
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					_render: function(obj) {
						var me = this;
						// 显示商品列表
						var woodhtml = "";
						for (var i = 0; i < obj.list.length; i++) {
							woodhtml += '<tr>' + '<td><input type="radio" style="margin: -3px 0 0;" name="radioname" value="' + obj.list[i].id + '">' + obj.list[i].id + '</td>' + '<td>' + obj.list[i].name + '</td>' + '<td>' + (obj.list[i].brand?obj.list[i].brand:'----') + '</td>' + '</tr>';
						}
						$(".moodtable").html(woodhtml);
						$("#dig-select-wood").show();
						
						//在选择商品标签的时候禁止 创建话题中的  确认  取消 关闭  按钮功能
						$("#cancelTopicBtn").attr("disabled","disabled");
						$("#updateTopicBtn").attr("disabled","disabled");
						$("#modal-create-dialog .modal-header button[class=close]").attr("disabled","disabled");
						$(function() {
							// $("#dig-select-wood").dialog({
							//   height: 300,
							//   width: 471,
							//   modal: true
							// });
						});
					},
					_bind: function() {
						var _this = this;
						var leftSize = window.innerWidth - _this._container.width();
						$("#dig-select-wood-chair").css("left", leftSize / 2 + "px");
						this._container.off("click");
						this._container.on("click", '.albun-bnt', function(e) {
							var flag = $(e.target).attr("bnt-type"); //按钮的类型
							var data = $(e.currentTarget).attr("data-id"); //?????????????????????
							if (flag == "cancel") {
								$("#dig-select-wood-chair").hide();

							} else if (flag == "ok") {
								//保存选中的商品信息
								$("#dig-select-wood-chair").hide();
								
								//创建标签
								var redioid = $("input[type=radio]:checked").val();
								if (redioid != undefined) {
									_this.cretag(JSON.stringify({
										"topic_id": curtopicid,
										"brand_id": 0,
										"commodity_id": redioid,
										"topic_img_id": cuiimgid
									}));
								}
							}
							//在选择商品标签的时候禁止 创建话题中的  确认  取消 关闭  按钮功能
							$("#cancelTopicBtn").removeAttr("disabled");
							$("#updateTopicBtn").removeAttr("disabled");
							$("#modal-create-dialog .modal-header button[class=close]").removeAttr("disabled");

						});

						$("#select-img-path").unbind("click").click(function() {
							selectedImgPath=$("#inputpath").val();
							$("#inputpath").click();
						})
					},
					getwoods: function() {
						//少  goods_name
						var _this = this;
						this.getgoods(JSON.stringify({
							"goods_name": $("#good-name-input").val(),
							"page": 1,
							"page_size": 20
						}), function(obj) {
							_this._render(obj);
						});

					},
					getwood: function() {
						var _this = this;
						var option = {
							url: getmood,
							dataType: 'json',
							type: 'get',
							success: function(json) {
								if (json["get-mood"]["errnum"] == 10000 || json["get-mood"]["errnum"] == "10000") {
									//渲染话题
									_this._render(json["get-mood"]);
								} else {
									alert("请求数据出错URL:" + addto);
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					cretag: function(obj) {
						var _this = this;
						var option = {
							url: ptcretage,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {
								if (json["hfive_community_tag_create_response"] != undefined) {
//									var obj = {
//										"title": "创建标签",
//										"txt": json["hfive_community_tag_create_response"].message
//									};
//									notifications(obj, "suc");
									//创建标签成功:0516注释掉   创建标签之后暂定不需要刷新图片
									 createtopic.getlistimg({
									 	"topic_id": curtopicid
									 });
									 if(opFlagTag=="edit"){
										$("#boxid"+tag_id_edit).remove();
										createtopic.delwood({
											"tag_id": tag_id_edit
										});
										opFlagTag="end";
										 var obj = {
											"title": "编辑标签",
											"txt": "编辑成功"
										};
										notifications(obj, "suc");
									}else{
										var obj = {
											"title": "创建标签",
											"txt": json["hfive_community_tag_create_response"].message
										};
										notifications(obj, "suc");
									}
									
									//调用渲染标签方法
								} else if (json["error_response"] != undefined) {
									if(opFlag!="edit"){
										var obj = {
											"title": "创建标签",
											"txt": (json["error_response"].msg).indexOf("重复添加")?"添加的商品已存在":json["error_response"].msg
										};
									}else{
										var obj = {
											"title": "编辑标签",
											"txt": (json["error_response"].code).indexOf("H5MCI316")?"选择的商品已存在":json["error_response"].msg
										};
									}
									notifications(obj, "error");
								} else {
									if(opFlag!="edit"){
										var obj = {
											"title": "创建标签",
											"txt": "数据结构出现问题URL:" + ptcretage
										};
										
									}else{
										var obj = {
											"title": "编辑标签",
											"txt": "数据结构出现问题URL:" + ptcretage
										};
									}
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//选择商品
				//
				//新建专辑
				var createalbum = new $rk.VC({
					_init: function() {
						this._bind();
					},
					_container: $('#dig-cteat-album'),
					_render: function() {

					},

					_bind: function() {
						var _this = this;
						this._container.off("click").on("click", '.albun-bnt', function(e) {
							var flag = $(e.target).attr("bnt-type");
							if (flag == "albuncancel") {
								$("#dig-cteat-album").dialog("close");
							} else if (flag == "albunok") {
								_this.create($(".albuminput").val(), $(".selectWX>#usrbidsel option:selected").attr("weixin_id"));
							}
						});
						$(".albuminput").focus(function(){
							var a=1;
							var keyCode 
							$(this).keydown(function(event){
							    keyCode = event.keyCode;
							    if(keyCode==13||keyCode=="13"){
							    	a++;
							    	if(a>2){
							    		return;
							    	}else{
										_this.create($(".albuminput").val(), $(".selectWX>#usrbidsel option:selected").attr("weixin_id"));
									}
							    }
							});
						});
					},
					create: function(namestr, wechat_id) {
//						if(namestr==""||namestr=undefined){
//							var obj = {
//								"title": "创建专辑",
//								"txt": "创建专辑" + json["error_response"].msg
//							};
//							notifications(obj, "error");
//						}
						var option = {
							url: ptcrealbum,
							data: {
								wechat_id: wechat_id,
								album_name: namestr
							},
							dataType: 'json',
							type: 'post',
							success: function(json) {
								//$rk.listener.trigger('table', 'success', json);

								//专辑创建成功了
								if (json["hfive_community_album_create_response"] != undefined) {
									var obj = {
										"title": "创建专辑",
										"txt": json["hfive_community_album_create_response"].message
									};
									$(".cancelAdd").click();
									notifications(obj, "suc");
									$rk.listener.trigger('menulist', 'getdata');
								} else if(json["error_response"].code=="H5MCI061"){
									var obj = {
										"title": "创建专辑",
										"txt": "专辑名不能为空！"
									};
									$("#dig-cteat-album").show();
									notifications(obj, "error");
								}else if(json["error_response"].code=="H5MCI314"){
									var obj = {
										"title": "创建专辑",
										"txt": "专辑名称已存在！"
									};
									$("#dig-cteat-album").show();
									notifications(obj, "error");
								}else if(json["error_response"].code=="H5MCI062"){
									var obj = {
										"title": "创建专辑",
										"txt": "专辑名称的长度为3到10位字符！"
									};
									$("#dig-cteat-album").show();
									notifications(obj, "error");
								}
								$(".albuminput").val("");
							},
							beforeSend: function() {

							}
						}

						new Ajax(option);
					}
				});
				//话题 批量添加到
				var addtoalbum = new $rk.VC({
					_init: function() {
						var _this = this;
						$rk.listener.on('batadd', 'topic', function(e, c) {
							_this._render(c.albums.album);
						});
						this._bind();
					},
					_container: $('#dig-add-to'),
					_render: function(obj) {
						var htmlstr = "";
						for (var i = 0; i < obj.length; i++) {
							htmlstr = htmlstr + "<option data-id='" + obj[i].album_id + "'> " + obj[i].album_name + "</option>"
						}
						$("#album-list").html(htmlstr);
					},
					_bind: function() {
						var _this = this;
						this._container.off("click");
						this._container.on("click", '.btn', function(e) {
							var flag = $(e.target).attr("bnt-type");
							if (flag == "albuncancel") {
								$("#dig-add-to").dialog("close");
							} else if (flag == "albunbataddto") {
								//var name = $("#add-to-name").val();
								var name = $("#album-list option:selected").attr("data-id");
								var idarr = new Array();
								$('input:checkbox[name=checkbox]:checked').each(function(i) {
									if (this.attributes[2].value !== "checked") {
										idarr.push(this.attributes[2].value);
									}
								});
								//Modify:0511
								if (idarr.length == 0) {
										//未选中任何话题
										var obj = {
											"title": "批量添加到",
											"txt": "您还未选择任何话题,不能完成批量添加操作。"
										};
										$rk.listener.trigger('table', 'topiclist');
										notifications(obj, "error");
										return;
								}
								//Modify:0511
								$(".batadd").attr("data-target", "#dig-add-to");
								//需要添加下拉列表
								_this.addto(JSON.stringify({
									"topic_ids": idarr,
									"album_id": name
								}));
							}
						});

					},
					addto: function(obj) {
						var _this = this;
						var option = {
							url: ptaddbattopic,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topic_movebatch_response"] != undefined) {
									var obj = {
										"title": "批量添加到",
										"txt": json["hfive_community_topic_movebatch_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');//刷新当前的未分组的话题列表
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "批量添加到",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								}else {
									var obj = {
										"title": "批量添加到",
										"txt": "数据结构出现问题URL:" + ptaddbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				// 话题记录添加到指定专辑 Sin
				var addsingletoalbum = new $rk.VC({
					_init: function() {
						var _this = this;
						$rk.listener.on('batadd', 'topic', function(e, c) {
							_this._render(c.albums.album);
						});
						this._bind();
					},
					_container: $('#dig-single-add-to'),
					_render: function(obj) {
						var htmlstr = "";
						for (var i = 0; i < obj.length; i++) {
							htmlstr = htmlstr + "<option data-id='" + obj[i].album_id + "'> " + obj[i].album_name + "</option>"
						}
						$("#album-single-list").html(htmlstr);
					},
					_bind: function() {
						var _this = this;
						this._container.off("click");
						this._container.on("click", '.albun-bnt', function(e) {
							var flag = $(e.target).attr("bnt-type");
							if (flag == "albuncancel") {
								$("#dig-single-add-to").dialog("close");
							} else if (flag == "albunok") {

								var name = $("#album-single-list option:selected").attr("data-id");

								albumtable.topicadd(JSON.stringify({
									"topic_id": curtopicid,
									"album_id": name
								}));

							}
						});

					},
					addto: function(obj) {
						var _this = this;
						var option = {
							url: ptaddbattopic,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topic_movebatch_response"] != undefined) {
									var obj = {
										"title": "批量添加到",
										"txt": json["hfive_community_topic_movebatch_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');//刷新当前的未分组的话题列表
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "批量添加到",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "批量添加到",
										"txt": "数据结构出现问题URL:" + ptaddbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//话题 记录添加到指定专辑

				//专辑列表
				var albumlist = new $rk.VC({
					_init: function() {

						var me = this;
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
							me._bind();
						});
						$rk.listener.on('menulist', 'getdata', function(e, c) {
							var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
							if (wechat_id != undefined) {
								me.getmenulist({
									'wechat_id': wechat_id
								});
							}
						});

						this.loadalbumlist();
						this.loadjs();
						this.loadCss();
					},
					isbind: function() {
						var _this = this;
						var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
						//						var obj={"wechat_id":wechat_id};
						$("#use-num-bind").hide();
						//					_this.getmenulist();
						_this.getmenulist({
							'wechat_id': wechat_id
						});
						return;
						_this.getcheckuserbind(wechat_id, function(obj) {
							//obj.wechat_id="";
							if (obj.wechat_id == "" || obj.wechat_id == null) {
								//调用绑定窗口
								//$("#modal-bind").attr('data-target',"#dig-user-bind");
								//$("#dig-cteat-album").attr('data-target',"#dig-user-bind");
								// $("#user-bind-bnt").attr('data-target',"#dig-user-bind");
								//显示
								//_this.getmenulist();
								$(".main-content").hide();
								$("#use-num-bind").show();

								_this.getuserbidlst(function(obj) {
									var htmlstr = "";
									if (obj.result_success == true) {
										for (var i = 0; i < obj.wxinfos.wxinfo.length; i++) {
											htmlstr += "<option data-id='" + obj.wxinfos.wxinfo[i].weixin_id + "'>" + obj.wxinfos.wxinfo[i].name + "</option>";
										}
										$("#usrbidsel").html(htmlstr);
									}
								});
								_this.getmenulist({
									'wechat_id': obj.wechat_id
								});

								$("#user-bnd-bnt").click(function(obj) {
									_this.usrbind(JSON.stringify({
										"wechat_id": $("#usrbidsel option:selected").attr("data-id")
									}));
								});

								$("#user-bnd-bnt-can").click(function(obj) {
									$(".main-content").show();
									$("#use-num-bind").hide();
									_this.getmenulist({
										'wechat_id': obj.wechat_id
									});
								});

							} else {
								$("#use-num-bind").hide();
								_this.getmenulist({
									'wechat_id': obj.wechat_id
								});
							}
						}, function(obj) {
							//调用绑定窗口
							var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
							me.getmenulist({
								'wechat_id': wechat_id
							});
						});
					},

					_container: $('#album-head'),
					_rendermoren: function(obj) {
						//添加话题头像
						//初次进入页面  左侧默认显示未分组已被点击
						$("#jstree ul li:first-child").find("a").addClass("jstree-clicked");
						$("button[data-target=#my-dialog-edit-album]").attr("disabled","disabled");
						$("button[data-target=#my-dialog-del-album]").attr("disabled","disabled");
//						var htmlstr = '<div style="float: left;margin: 10px;"><img src="" style="width: 100px;height: 100px;"></div> ' 
//									+ '<div style="float: left;" class="album_head">  ' 
//									+ '<div><span>专辑名称:</span><span>----</span></div> ' 
//									+ ' <div><span>专辑描述:</span><span>----</span></div> ' 
//									+ '<div><span>话题数:</span><span>'+ obj.count+ '</span></div> ' 
//									+ '</div>';
						var html_img='<div style="float: left;margin: 10px;"><img src="'+hostUrl+'/static/h5plus/img/wechatBBS/mobilefront/album.png" style="width: 100px;height: 100px;"></div> ' ;
						var htmlstr ='<div style="float: left;" class="album_head">  ' 
									+'<table><tr><td style="width:70px;">专辑名称:</td><td>----</td></tr>'
									+ '<tr><td>专辑描述:</td><td>----</td></tr>' 
									+ '<tr><td>话题数量:</td><td>'+ obj.count+ '</td></tr> ' 
									+ '</table>';
						
						$(".topichead").html(html_img);
						$(".album-info-container").html(htmlstr);
						$(".albumtable").html("");
						//若当前显示的是未分组则专辑的编辑和删除时不可用的
						//var album_id;
						albumtable.posttopic({
							"album_id": curalbumid,
							"page_num": 1,
							"page_size": 10
						});

					},
					_render: function(obj) {
						//添加话题头像
						//专辑设置
//						var htmlstr = '<div style="float: left;margin: 10px;"><img src="' + (obj.album_pic_url?obj.album_pic_url:"") + '" style="width: 100px;height: 100px;"></div>' + '<div style="float: left;" class="album_head">  ' + '<div><span>专辑名称:</span><span>' + obj.album_name + '</span></div> ' + ' <div><span>专辑描述:</span><span>' + (obj.album_desc?obj.album_desc:'----') + '</span></div> ' + '  <div><span>话题数:</span><span>' + obj.album_topic_count + '</span></div> ' + '</div>';
						var html_img= '<div style="float: left;margin: 10px;"><img src="' + (obj.album_pic_url?obj.album_pic_url:hostUrl+"/static/h5plus/img/wechatBBS/album.png") + '" style="width: 100px;height: 100px;"></div>';
						var htmlstr = '<div style="float: left;" class="album_head">  ' 
									+'<table><tr><td style="width:80px">专辑名称:</td><td>'+obj.album_name+'</td></tr>'
									+ '<tr><td style="width:70px;">专辑描述:</td><td>'+(obj.album_desc?obj.album_desc:'----')+'</td></tr>' 
									+ '<tr><td>话题数量:</td><td>'+ obj.album_topic_count+ '</td></tr> ' 
									+ '</table>';
//						$(".topichead").html(htmlstr);
						$(".topichead").html(html_img);
						$(".album-info-container").html(htmlstr);
						var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
						//0520注释
						albumtable.posttopic({
							"album_id": obj.album_id,
							"wechat_id": wechat_id,
							"page_num": 1,
							"page_size": 10
						});
						//albumtable.render(obj);  //渲染专辑话题列表

					},
					usrbind: function(obj) {
						var _this = this;
						var option = {
							
							url: userbind,
							dataType: 'json',
							type: 'post',
							data: obj,
							contentType: 'application/json',
							success: function(json) {

								if (json["hfive_community_wechat_bind_response"] != undefined) {
									var obj = {
										"title": "公众号绑定",
										"txt": json["hfive_community_wechat_bind_response"].message
									};
									notifications(obj, "suc");
									$(".main-content").show(); //显示主窗口
									$("#use-num-bind").hide();
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "公众号绑定",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
									$(".main-content").show(); //显示主窗口
									$("#use-num-bind").hide();
								} else {
									var obj = {
										"title": "公众号绑定",
										"txt": "数据结构出现问题URL:" + userbind
									};
									notifications(obj, "error");
									$(".main-content").show(); //显示主窗口
									$("#use-num-bind").hide();
								}
							},
							beforeSend: function() {}
						}

						new Ajax(option);
					},
					getuserbidlst: function(fun) {
						var _this = this;
						//checkuser
						var option = {
							url: pubidlist,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_weixin_pubid_list_response"] != undefined) {
									if (fun != undefined) {
										fun(json["hfive_weixin_pubid_list_response"]);
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取微信公众号",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
									//if(erfun != undefined){
									//  erfun(json["error_response"]);
									// }
								} else {
									var obj = {
										"title": "获取微信公众号",
										"txt": "数据结构出现问题URL:" + pubidlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}

						new Ajax(option);
					},
					getcheckuserbind: function(obj, fun) {
						var _this = this;

						// data:JSON.stringify({"aa":"ff"}),
						var option = {
							url: checkbinduser,
							dataType: 'json',
							type: 'post',
							data: JSON.stringify({
								"wechat_id": obj
							}),
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_community_wechat_check_response"] != undefined) {

									if (fun != undefined) {
										fun(json["hfive_community_wechat_check_response"]);
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "检查用户",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
									if (fun != undefined) {
										fun(json["error_response"]);
									}
								} else {
									var obj = {
										"title": "检查用户",
										"txt": "数据结构出现问题URL:" + checkbinduser
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}

						new Ajax(option);
					},
					getmenulist: function(data) {
						var _this = this;
						//专辑列表
						var option = {
							url: ptalbumlist,
							dataType: 'json',
							data: data,
							type: 'post',
							success: function(json) {
								if (json["hfive_community_album_findlist_response"] != undefined) {
									//为批量添加 到 添加专辑列表
									$rk.listener.trigger('batadd', 'topic', json["hfive_community_album_findlist_response"]);
									_this._initdata(json["hfive_community_album_findlist_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "查询专辑列表",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "查询专辑列表",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					albuminformation: function(obj) {
						var _this = this;
						//非未分组时   解除  disabled属性
						$("button[data-target=#my-dialog-edit-album]").removeAttr("disabled");
						$("button[data-target=#my-dialog-del-album]").removeAttr("disabled");
						curalbumid = obj.album_id; //保存当前专辑ID
						console.log("curalbumid ="+ obj.album_id);
						var option = {
							url: ptfindone,
							dataType: 'json',
							type: 'post',
							data: obj,
							data: JSON.stringify(obj),
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_community_album_findone_response"] != undefined) {
									_this._render(json["hfive_community_album_findone_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取专辑数据",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取专辑数据",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					countdefaultformation: function(obj) {
						var _this = this;
						var option = {
							url: countdefault,
							dataType: 'json',
							type: 'post',
							data: JSON.stringify(obj),
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_community_topic_countdefault_response"] != undefined) {
									_this._rendermoren(json["hfive_community_topic_countdefault_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取未分类话题数量",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取未分类话题数量",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					_initdata: function(obj) {
						//后台有专辑数据返回  不显示默认专辑，无专辑数据列表则显示默认专辑

						var _this = this;
						var json_data = {
							"data": new Array()
						};

						//默认专辑
						var moren = {
							"data": {
								"title": "未分组",
								"attr": {
									"href": "#"
								}
							}
						}

						json_data.data.push(moren);
						//默认专辑
						for (var i = 0; i < obj.albums.album.length; i++) {
							var item = {
									"data": {
										"title": obj.albums.album[i].album_name,
										"attr": {
											"href": obj.albums.album[i].album_id
										}
									}
								}
							json_data.data.push(item);
						}
						//curalbumid = undefined; //(初始)2016-04-29为测试批量删除而注释掉，会影响传到后台时话题id的类型----只有有什么应该   未发现2.(最终)不在这里处理了
						this.countdefaultformation({
							"page_num": 1,
							"page_size": 20
						});

						var data = {
							"json_data": json_data,
							"plugins": ["themes", "json_data", "ui"]
						};

						$(function() {
							$("#jstree").jstree(data)
								.bind("click.jstree", function(event) {
									$("#inputimgpath").val("");
									//curalbumid=$(event.target).attr("data-id");
									var node = $(event.target).closest("li");
									var dataid = node.find('a').attr("href");
									curalbumid=dataid;
									if (dataid == "#") {
										curalbumid = undefined;
										_this.countdefaultformation({
//											"album_id": curalbumid,
											"page_num": 1,
											"page_size": 20
										});
									} else {
										_this.albuminformation({
											"album_id": dataid
										});
									}
									return false;
								}).delegate("a", "click", function(event, data) {
									event.preventDefault();
								});
								

						});

						$('button[data_id=copyLink]').zclip({
							path: copyUrl,
							copy: function() {
								$(".zclip").css("top", "20px !important");
								return $('#link').val();　　　　　
							}
						});
						$('#copyLinkBox .btn-primary').unbind('click').click(function() {
							$('#copyLinkBox button[data-dismiss=modal]').click();
						});

						$(document).ready(function() {

						});

					},
					_bind: function() {
						var that = this;
						this._container.off("click");
						this._container.on("click", '.bntos', function(e) {
							var data = $(e.currentTarget).attr("data-id");
							if ($(e.target).attr('class').indexOf("delstyle") > 0) {
								$(".ContainerLabelCommon").css("display","block");
								$(".title-name").empty().html("删除专辑");
								$(".title1").empty().html("确定要删除该专辑吗？");
								$(".title3").off("click");
								$(".title3").on("click",'.closeAlert',function(ev){
									if($(ev.target).attr("data-action")=="sure"){
										that.delete({
											"album_id": curalbumid
										});
									}
									$(".ContainerLabelCommon").css("display","none");
								})
								
							} else if ($(e.target).attr('class').indexOf("editstyle") > 0) {
								$(e.target).attr('data-target', "#my-dialog-edit-album");
								$rk.listener.trigger('albumdlg', 'getdata');
								$("#inputimgpath").val("");
								editalbumdlg.bind();
							}
						});
					},

					loadalbumlist: function() {
						//0512全部注释掉
//						var option = {
//							url: getalbumlist,
//							dataType: 'json',
//							type: 'get',
//							success: function(json) {
//								//$rk.listener.trigger('table', 'success', json);//原来就已被注释掉
//
//							},
//							beforeSend: function() {
//
//							}
//						}
//
//						new Ajax(option);
					},
					loading: function(text) {

					},
					loadjs: function() {

					},
					loadCss: function() {

					},
					delete: function(obj) {
						var _this = this;
						var option = {

								url: ptdelalbum,
								dataType: 'json',
								type: 'post',
								data: obj,
								success: function(json) {
									if (json["hfive_community_album_delete_response"] != undefined) {
										var obj = {
											"title": "专辑删除",
											"txt": json["hfive_community_album_delete_response"].message
										};
										curalbumid=undefined;
										notifications(obj, "suc");
//										$rk.listener.trigger('albumdlg', 'getdata');
										$rk.listener.trigger('menulist', 'getdata');
									 	 
									} else if (json.error_response.code == "H5MCI065") {
										var obj = {
											"title": "专辑删除",
											"txt": "\"未分组\"不能删除,请重新选择专辑."
										};
										notifications(obj, "error");
									} else if (json["error_response"] != undefined) {
										var obj = {
											"title": "专辑删除",
											"txt": "数据结构出现问题:" + json["error_response"].msg
										};
										notifications(obj, "error");
									} else {
										var obj = {
											"title": "专辑删除",
											"txt": "数据结构出现问题URL:" + ptdelalbum
										};
										notifications(obj, "error");
									}

								},
								beforeSend: function() {

								}
							}
						new Ajax(option);
					},
					delRequest: function(siteId, button, that) {
						var btn = button;
						var self = this;
						var tip = null;

						new Ajax(option);
					}
				});
				//专辑列表

				//专辑管理页面按钮
				var albumbnt = new $rk.VC({
					_init: function() {
						this._bind();
					},
					_container: $('#album-bnt'),
					_bind: function() {
						var _this = this;
						this._container.off("click");

						this._container.on("click", '.albumbnt', function(e) {
							var flag = $(e.target).attr("type");
							var data = $(e.currentTarget).attr("type");
							var wechat_id = $(this).find("option:selected").attr("weixin_id");
							if (flag == "checkbox") {
								if (event.target.checked == true) {
									$('input:checkbox[name=checkbox]').each(function(obj) {

										$(this).attr("checked", true);
										this.checked = true;
									});
								} else {
									$('input:checkbox[name=checkbox]:checked').each(function() {
										$(this).attr("checked", false);
									});
								}
							} else {
								flag = $(e.target).attr("bnt-type");
								if (flag == "create-topic") {
									//新建话题
									cuiimgid=0;
									clear_label();//清楚commoditylable.js中的——lables数组
									$(e.target).attr("data-target", "#modal-create-dialog");
									$(".topicimgarr").empty().html('<img src="http://dummyimage.com/800x600/4d494d/4d494d.gif&text=placeholder+image" alt="placeholder+image" height="287" width="320">');
									$(".topictable").empty();//再次进入新建话题时   清空'缓存'
									createtopic.creatopic({
										"wechat_id": wechat_id,
										"album_id": curalbumid
									});
								} else if (flag == "bat-topic-del") {//批量删除
									$(".ContainerLabelCommon").css("display","block");
									$(".title-name").empty().html("批量删除话题");
									$(".title1").empty().html("确定要批量删除话题吗？");
									$(".title3").unbind("click").bind("click",'.closeAlert',function(ev){
										if($(ev.target).attr("data-action")=="sure"){
											var idarr = new Array();
											$('input:checkbox[name=checkbox]:checked').each(function(i) {
												if (this.attributes[2].value !== "checked") {
													idarr.push(this.attributes[2].value);
												}
		
											});
											if (idarr.length == 0) {
												//未选中任何话题
												var obj = {
													"title": "批量删除",
													"txt": "您还未选择任何话题,不能完成批量删除操作。"
												};
												$rk.listener.trigger('table', 'topiclist');
												notifications(obj, "error");
												return;
											}
											var idstr = idarr.join(",");
											var param = JSON.stringify({
												"topic_ids": idarr,
												"album_id": curalbumid //为空则默认未分类
											});
											//当前专辑为：未分类的话   不能往后台传专辑的字段
											if (curalbumid == undefined||curalbumid=="undefined") {
												//为空则默认未分类
												_this.deltopic(JSON.stringify({
													"topic_ids": idarr,
												}));
											} else {
												_this.deltopic(JSON.stringify({
													"topic_ids": idarr,
													"album_id": curalbumid
												}));
											}
										}
										$(".ContainerLabelCommon").css("display","none");
									});
								}else if (flag == "bat-topic-add-to") {
									var idarr = new Array();
									$('input:checkbox[name=checkbox]:checked').each(function(i) {
										//会存在一个checked
										if (this.attributes[2].value !== "checked") {
											idarr.push(this.attributes[2].value);
										}
									});
									if (idarr.length == 0) {
										//未选中任何话题
										var obj = {
											"title": "批量添加到",
											"txt": "您还未选择任何话题,不能完成批量添加操作。"
										};
										$rk.listener.trigger('table', 'topiclist');
										notifications(obj, "error");
									}else{
										$(".batadd").attr("data-target", "#dig-add-to");
									}
								}
//								if($(".albumbnt button input").attr("checked")=="checked"){
//										//全选选中
//										$(".albumbnt button input").click();
//								}					
							}
						});
					},
					deltopic: function(obj) {
						//						addtopic????这是什么鬼
						var _this = this;
						var option = {
							url: ptdelbattopic,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topic_deletebatch_response"] != undefined) {
									var obj = {
										"title": "批量删除",
										"txt": json["hfive_community_topic_deletebatch_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');
									
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "批量删除",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "批量删除",
										"txt": "数据结构出现问题URL:" + ptdelbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					pageShow: function(page_num, page_current, page_size) {
						var page_end, page_range, page_start = 1;
						if (page_size <= page_num) {
							page_end = page_size;
						} else {
							page_range = Math.ceil(page_num / 2) - 1;
							page_end = page_current + page_range;
							if (page_end > page_num) {
								if (page_end > page_size) {
									page_end = page_size;
								}
								page_start = page_end - page_num + 1;
							} else {
								page_end = page_num;
								page_start = 1;
							}
						}
						var page = '';
						for (var i = page_start; i <= page_end; i++) {
							page += '<li><a href="javascript:void(0);">' + i + '</a></li>';
						}
						$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
						$('ul[data_id=pageShow] li:first').after(page);
						if (page_current == 1) {
							$('ul[data_id=pageShow] li:first').addClass('disabled');
						} else {
							$('ul[data_id=pageShow] li:first').removeClass('disabled');
						}
						if (page_current == page_size) {
							$('ul[data_id=pageShow] li:last').addClass('disabled');
						} else {
							$('ul[data_id=pageShow] li:last').removeClass('disabled');
						}
						$('li:contains(' + page_current + ')').addClass('active').siblings().removeClass('active');
					},
					clearData:function(){
						//清空  创建话题时弹出框的所有输入框  暂时不需要
						
					}
				});
				//专辑管理页面按钮

				//专辑下话题列表
				var albumtable = new $rk.VC({
					_init: function() {
						var me = this;
						me._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});

						$rk.listener.on('table', 'topiclist', function(e, c) {
							var curpagenum = 1;
							if (c != undefined) {
								curpagenum = c;
							}
							me.posttopic({
								"album_id": curalbumid,
								"page_num": curpagenum,
								"page_size": pageLength
							});

						});
						$rk.listener.on("seletRadio","leastOne",function(e,c){
							var len=$(".albumtable input[name='checkbox']:checked").length;
							if(len>0){
								$("#bat-topic-del").removeAttr("disabled");
								$("#bat-topic-add-to").removeAttr("disabled");
							}else{
								$("#bat-topic-del").attr("disabled","disabled");
								$("#bat-topic-add-to").attr("disabled","disabled");
							}
						});
						$rk.listener.on('pager', 'send', function(e, num) {
							$rk.listener.trigger('table', 'requesting', '数据加载中');
							me.setPage(num);
							me.formSend();
						});
					},
					_container: $('#album-table'),
					formSend: function() {},
					setPage: function(num) {
						$("#setPage").val(num);
					},
					render: function(obj) { //加载话题表格22222222
						var _this = this;
						var htmlstr = "";
						if (obj.topics != null) {
							for (var i = 0; i < obj.topics.topic.length; i++) {
								htmlstr += '<tr>' 
										+ '<td><input name="checkbox" type="checkbox" value="'+ obj.topics.topic[i].topic_id+ '">' 
										+ obj.topics.topic[i].topic_id + '</td>'
										+ '<td>' + obj.topics.topic[i].topic_title + '</td>' 
										+ '<td>' + obj.topics.topic[i].topic_create_time + '</td>' 
										+ '<td>' + obj.topics.topic[i].author_name + '</td>' 
										+ '<td class="last-td"> <div class="item_bnt"  data-count="' + obj.topics.topic[i].comment_count + '" data-id="' + obj.topics.topic[i].topic_id 
										+ '" ><button class="btn activityAddBtn" bnt-type="preview" style="display:none">预览<div class="imgcode"'
										+ ' style="width:100px;height:100px;"></div></button><button class="btn activityAddBtn" data-toggle="modal" bnt-type="look" style="display:none">查看</button><button class="btn activityAddBtn"  data-toggle="modal"  bnt-type="edit">编辑</button><button class="btn activityAddBtn" bnt-type="del">删除</button><button class="btn activityAddBtn" bnt-type="set-top">置顶</button><button class="btn activityAddBtn addto_appalb " data-toggle="modal" bnt-type="set-to">添加到</button></div></td>' + '</tr>';
										//$(".imgcode").qrcode("http://www.baidu.com");//?wehcat_id="+wechat_id+"&pid="+pid+"&component_appid="+component_appid
							}
							$(".albumtable").html(htmlstr);
						} else {
							$(".albumtable").html("");
						}
						$("input[name='checkbox']").unbind("click").click(function(e){
							if($(e.target).parent().text().indexOf("全选")){
								setTimeout(function(){
									$rk.listener.trigger("seletRadio","leastOne");
								},600);
							}else{
								$rk.listener.trigger("seletRadio","leastOne");
							}
						})
						//绑定 翻页事件  
						$rk.listener.trigger("seletRadio","leastOne");
						_this.bindTopicPage(obj);
	
					},
					bindTopicPage: function(obj) {
						var me = this;
						// page_size = $('#topicTable').attr('page_size');
						// page_size=obj.total;
						page_size=obj.total%pageLength==0?parseInt(obj.total/pageLength):parseInt(obj.total/pageLength)+1;
						$('.prev,.next').show();
						if (pageFlag == 0) {
							$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
							if (page_size != 0) {
								me.pageShow(page_num, 1, page_size);
							} else {
								$('.prev,.next').hide();
							}
							pageFlag = 1;
						}
						$('ul[data_id=pageShow]').off().on('click', 'li:not(:first):not(:last):not(.active)', function() {
							page_current = $(this).text() - 0;
							me.pageShow(page_num, page_current, page_size);
							$('li:contains(' + page_current + ')').addClass('active').siblings().removeClass('active');
							//刷新话题列表 
							me.posttopic({
								"album_id": curalbumid,
								"page_num": page_current,
								"page_size": pageLength
							});
						});
						$('.next').unbind('click').click(function() {
							page_current += 1;
							if (page_current > page_size) {
								page_current = page_size;
								$('ul[data_id=pageShow] li:last').addClass('disabled');
							} else {
								$('ul[data_id=pageShow] li:last').removeClass('disabled');
								me.posttopic({
									"album_id": curalbumid,
									"page_num": page_current,
									"page_size": pageLength
								});
							}
						});
						$('.prev').unbind('click').click(function() {
							page_current -= 1;
							if (page_current < 1) {
								page_current = 1;
								$('ul[data_id=pageShow] li:first').addClass('disabled');
							} else {
								$('ul[data_id=pageShow] li:first').removeClass('disabled');
								me.posttopic({
									"album_id": curalbumid,
									"page_num": page_current,
									"page_size": pageLength
								});
							}
//							me.pageShow(page_num, page_current, page_size);
						});
						me.pageShow(page_num, page_current, page_size);
					},
					pageShow: function(page_num, page_current, page_size) {
						var page_end, page_range, page_start = 1;
						if (page_size <= page_num) {
							page_end = page_size;
						} else {
							page_range = Math.ceil(page_num / 2) - 1;
							page_end = page_current + page_range;
							if (page_end > page_num) {
								if (page_end > page_size) {
									page_end = page_size;
								}
								page_start = page_end - page_num + 1;
							} else {
								page_end = page_num;
								page_start = 1;
							}
						}
						var page = '';
						for (var i = page_start; i <= page_end; i++) {
							page += '<li><a href="javascript:void(0);">' + i + '</a></li>';
						}
						$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
						$('ul[data_id=pageShow] li:first').after(page);
						if (page_current == 1) {
							$('ul[data_id=pageShow] li:first').addClass('disabled');
						} else {
							$('ul[data_id=pageShow] li:first').removeClass('disabled');
						}
						if (page_current == page_size) {
							$('ul[data_id=pageShow] li:last').addClass('disabled');
						} else {
							$('ul[data_id=pageShow] li:last').removeClass('disabled');
						}
						$('li:contains(' + page_current + ')').addClass('active').siblings().removeClass('active');
					},
					_bind: function() {
						var that = this;
						this._container.off("click");
						this._container.off("mouseover");
						this._container.off("mouseout");
						this._container.on("mouseover", '.item_bnt', function(e) {
							var flag = $(e.target).attr("bnt-type");
							var data = $(e.currentTarget).attr("data-id");
							if (flag == "preview") {
								$(e.target.childNodes[1]).show();
							} else {
								return;
							}
						});

						this._container.on("mouseout", '.item_bnt', function(e) {
							var flag = $(e.target).attr("bnt-type");
							var data = $(e.currentTarget).attr("data-id");
							if (flag == "preview") {
								$(".imgcode").hide();
							} else {
								return;
							}
						});
						//item_btn这个样式的  容器已经弃用了。。。。。。
						this._container.on("click", '.item_bnt', function(e) {

							var flag = $(e.target).attr("bnt-type");
							var data = $(e.currentTarget).attr("data-id");
							var comentcount = $(e.currentTarget).attr("data-count");
							if (flag == "preview") {
								$(".imgcode").hide();
								$(e.target.childNodes[1]).show();
							} else if (flag == "look") {
								//查看话题
								comment_count = comentcount;
								locktopic.getdisu({
									"topic_id": data,
									"page_num": 1,
									"page_size": 20
								});
								var topicid=parseInt($(e.target).parent().attr("data-id"));
								locktopic.getcommentcount({
									"pid":pid,
									"topic_id":topicid
								});
								$(e.target).attr("data-target", "#dig-lok-topic-discuss"); //#dig-topic-discuss
							} else if (flag == "edit") {
								//编辑话题
								curtopicid = data;
								createtopic.gettopic({
									"topic_id": curtopicid,
								}); //渲染 标题和数据
								opFlag="edit";
								curtopicid=$(e.target).parent("div").attr("data-id");
								createtopic.edittopic(curtopicid); 
								$(e.target).attr("data-target", "#modal-create-dialog");
							} else if (flag == "del") {
								var id = $(this).attr("data-id");
								$(".ContainerLabelCommon").css("display","block");
								$(".title-name").empty().html("话题删除");
								$(".title1").empty().html("确定要删除该话题吗？");
								$(".title3").unbind("click").bind("click",'.closeAlert',function(ev){
									if($(ev.target).attr("data-action")=="sure"){
										that.delsingletopic({
											"album_id": curalbumid,
											"topic_id": id
										});
									}
									$(".ContainerLabelCommon").css("display","none");
								});
							} else if (flag == "set-top") {
								var id = $(this).attr("data-id");
								that.settopictop({
									"topic_id": id,
									"album_id": curalbumid
								}); //后端知道 这个话题ID在哪个专辑里置顶
							} else if (flag == "set-to") {
								curtopicid = $(this).attr("data-id");
								$(".addto_appalb").attr("data-target", "#dig-single-add-to");

							}
//							if($(".albumbnt button input").attr("checked")=="checked"){
//										$(".albumbnt button input").click();
//							}
							
						});
							
							
						},
					/**
					 * 时间日期类型转换成unix是时间戳
					 * @type {Int}  num  返回数字类型
					 * @memberof taskManager._timestampToUnix
					 * @param {String}  timeobj '2012-11-16 10:36:50'  时间字符串
					 * @public
					 */
					timestampToUnix: function(timeobj) {
						var tmp_datetime = timeobj.replace(/:/g, '-');
						tmp_datetime = tmp_datetime.replace(/ /g, '-');
						var arr = tmp_datetime.split("-");
						var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
						return parseInt(now.getTime() / 1000);
					},
					/**
					 * unix是时间戳转换成时间日期
					 * @type {String}  时间类型字符串
					 * @memberof taskManager._timestampToData
					 * @param {Int} timestamp 时间戳
					 * @public
					 */
					timestampToData: function(timestamp) {
						var newDate = new Date();
						newDate.setTime(timestamp * 1000); //timestamp*1000
						var stri = newDate.format();
						console.log("您获取服务器的时间是:" + stri);
						return stri;
					},
					topicadd: function(obj) {
						var _this = this;
						var option = {
							url: ptaddtopic,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topic_move_response"] != undefined) {
									var obj = {
										"title": "添加到话题",
										"txt": json["hfive_community_topic_move_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');//刷新当前的未分组的话题列表
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "添加到话题",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "添加到话题",
										"txt": "数据结构出现问题URL:" + ptdelbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					settopictop: function(obj) {
						var _this = this;

						var option = {
							url: ptsettop,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topic_top_response"] != undefined) {
									var obj = {
										"title": "话题置顶",
										"txt": json["hfive_community_topic_top_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');
									page_current =1;
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "话题置顶",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "话题置顶",
										"txt": "数据结构出现问题URL:" + ptdelbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}

						new Ajax(option);
					},
					delsingletopic: function(obj) {
						var _this = this;
						var option = {
							url: ptdeldiscu,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topic_delete_response"] != undefined) {
									var obj = {
										"title": "删除话题",
										"txt": json["hfive_community_topic_delete_response"].message
									};
									$rk.listener.trigger('table', 'topiclist');
									if(curalbumid==undefined||curalbumid=="undefined"){
										albumlist.countdefaultformation({
											"page_num": 1,
											"page_size": 20
										});
									} else {
										albumlist.albuminformation({
											"album_id": curalbumid
										});
									}
									notifications(obj, "suc");

								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "删除话题",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "删除话题",
										"txt": "数据结构出现问题URL:" + ptdelbattopic
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					optopic: function(op, obj) {
						var _this = this;

						var option = {
							url: op,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (op == settotop) {
									if (json["set-top-topic"]["errnum"] == 10000 || json["set-top-topic"]["errnum"] == "10000") {
										//渲染话题

										alert(json["set-top-topic"]["message"]);
									} else {
										alert("请求数据出错URL:" + op);
									}
								} else {
									if (json["del-topic"]["errnum"] == 10000 || json["del-topic"]["errnum"] == "10000") {
										//渲染话题

										alert(json["del-topic"]["message"]);
									} else {
										alert("请求数据出错URL:" + op);
									}
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					posttopic: function(obj) {
						pageFlag=0;//位置待定
						var _this = this;
						var option = {
							url: pttopic,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topic_findpaging_response"] != undefined) {
									_this.render(json["hfive_community_topic_findpaging_response"]);
									if($(".albumbnt button input").attr("checked")=="checked"){
										//全选选中
										$(".albumbnt button input").click();
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取话题数据",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取话题数据",
										"txt": "数据结构出现问题URL:" + pttopic
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//专辑table

				//查看话题
				var locktopic = new $rk.VC({
					_init: function() {
						var me = this;
						me._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
					},
					_container: $('#dig-lok-topic-discuss'),
					_render: function(obj) {
						var _this = this;
						$(".discunum").html('<div style="float: left;" class="pageView">浏览量:' + '----'+ '</div><div style="float: right;" class="numberReviews">点评数:' + obj.total + '</div>');
						var discuhtm = "";
						for (var i = 0; i < obj.comments.comment.length; i++) {
							if (obj.comments.comment[i].logo == undefined) {
								obj.comments.comment[i].logo = "http://img2.3lian.com/2014/f4/188/d/21.jpg";
							}
							if (obj.comments.comment[i].nickname == undefined) {
								obj.comments.comment[i].nickname = "微社区用户";
							}
							discuhtm += '<div style="clear: both;">' + '<div><div style="float: left;">' + '<img style="width:30px;height:30px; border-radius:30px;margin-left:10px;" src="' + obj.comments.comment[i].logo + '">' + '</div>' + ' <div style="float: left;"><span style="display: inline-block;margin-top: 8px;margin-left: 8px;">' + obj.comments.comment[i].nickname + '</span></div>' + '<div style="float:right;"><span style="display: inline-block;margin-top: 8px;margin-right: 10px;">' + obj.comments.comment[i].comment_create_time + '</span></div></div> ' + '<div><textarea style="resize: none;width:88%;margin-left:48px;">' + obj.comments.comment[i].comment_content + '</textarea></div> ' + '</div>';
						}
						$(".discutxt").html(discuhtm);
					},
					_bind: function() {
						this._container.off("click");
						this._container.on("click", '.close', function(e) {

							//$("#dig-topic-discuss").hide();
						});
					},
					getdisu: function(obj) {
						var _this = this;
						var option = {
							url: ptlokdiscu,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_community_topiccomment_findpaging_response"] != undefined) {
									//debugger;
									_this._render(json["hfive_community_topiccomment_findpaging_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "查询话题评论",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "查询话题评论",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					getcommentcount:function(obj){
						//接口不对，暂时注销不要删除
//						var _this = this;
//						var option = {
//							url:commentcount,
//							dataType: 'json',
//							type: 'post',
//							data: JSON.stringify(obj),
//							contentType: 'application/json',
//							success: function(json) {
//								if (json["hfive_community_square_topiccomment_count_response"] != undefined) {
//									$(".numberReviews").empty().html(json["hfive_community_square_topiccomment_count_response"].code);
//								}else{
//									var obj = {
//										"title": "查询话题点评数量",
//										"txt":json["error_response"].msg
//									};
//									notifications(obj, "error");
//								}
//							}
//						}
//						new Ajax(option);
					},
					timestampToData: function(timestamp) {
						var newDate = new Date();
						newDate.setTime(timestamp * 1000); //timestamp*1000
						var stri = newDate.format();
						return stri;
					}
				});
				//查看话题

				var createtopic = new $rk.VC({
					_init: function() {
						var me = this;
						me._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
						//订阅 tipic upimg
						$rk.listener.on('topic', 'upimg', function(e, c) {
							//更新话题图片
							me.edittopic(curtopicid);
						});
						$rk.listener.on("authorList", "success", function(e, c) {
							me._renderAuthor(c);
						});
						$rk.listener.on("tagdel", 'suc', function(e, c) {
							me.gettags({
								"topic_id": parseInt(curtopicid),
								"topic_img_id":cuiimgid
							}, function(obj) {
								me._rendrtag(obj, parseInt(cuiimgid));
							});
						});
						var i = 0;
						$(".topictable").html('');
						$('.topictable').scroll(function() {
							var scrollTop = $(this).scrollTop();
							var scrollHeight = $('.topictable tr').height() * $('#modal-create-dialog .topictable tr').length;
							var windowHeight = $(this).height() + 1;
							if (scrollTop + windowHeight == scrollHeight) {
								me.getproductlist({
									'page': i++,
									'page_size': 5
								});

							}
						});

					},
					_container: $('#modal-create-dialog'),
					_render: function(obj) {
						var topctabel = "";
						$("#authorList option[nickname='"+obj.topic.author_name+"']").attr("selected","selected");
						$("#topictitletxt").val(obj.topic.topic_title);
						$("#topiccontent").val(obj.topic.topic_body);

					},

					uptopic: function(obj) {
						var _this = this;
						var option = {
							url: ptuptopic,
							dataType: 'json',
							contentType: 'application/json',
							type: 'post',
							data: JSON.stringify(obj),
							success: function(json) {
								if (json["hfive_community_topic_update_response"] != undefined) {
										var obj = {
											"title": "话题更新",
											"txt": json["hfive_community_topic_update_response"].message
										};
										$("#cancelTopicBtn").click();
										$rk.listener.trigger('table', 'topiclist'); //更新话题数据
										if(curalbumid==undefined||curalbumid=="undefined"){
										albumlist.countdefaultformation({
											"page_num": 1,
											"page_size": 20
											});
										} else {
											albumlist.albuminformation({
												"album_id": curalbumid
											});
										}
										notifications(obj, "suc");
								}else{
									var obj = {
											"title": "话题更新",
											"txt": "话题更新时:"+json["error_response"].msg
										};
									notifications(obj, "error");
								}
								cuiimgid=0;
							}
						}
						new Ajax(option);
					},
					getwoodsbat: function(obj, fun) {
						// 显示商品标签列表 的请求接口方法
						var _this = this;
						var option = {
							url: getbatwoods,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: obj,
							success: function(json) {
								if (json["hfive_weidian_goods_get_response"] != undefined) {
										fun(json["hfive_weidian_goods_get_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "批量获取商品数据",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "批量获取商品数据",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					_rendrtag: function(obj, imgid) {
						var _this = this;
						//选中的商品列表信息
						img_tag_one=[];
						woodid=[];
						for (var i = 0; i < obj.tags.tag.length; i++) {
							var lablestr = '<div style="width:177px;">' + '<div class="dotdiv"></div> ' + '<div class="bgdiv"> ' + '<li class="landname" >联想:12 </li> ' + '</div> ' + '</div>';
							var boxsize = {
								"width": 177,
								"height": 25
							}
							woodid.push({
								"id": obj.tags.tag[i].commodity_id
							});
							tag_id_list.push({
								"id": obj.tags.tag[i].commodity_id,
								"tag_id": obj.tags.tag[i].tag_id,
							});
							//imgid=cuiimgid;
							//在左侧图上  添加  标签
							if($("#labelview" + cuiimgid).find("div[id=boxid"+obj.tags.tag[i].tag_id+"]").html()==undefined||$("#labelview" + cuiimgid).find("div[id=boxid"+obj.tags.tag[i].tag_id+"]").html()=="undefined"){
								cteatesetlable("#labelview" + cuiimgid, "boxid" + obj.tags.tag[i].tag_id, lablestr, boxsize, {
									"x": obj.tags.tag[i].point_left,
									"y": obj.tags.tag[i].point_top
								}, obj.tags.tag[i].tag_id,obj.tags.tag[i].commodity_id);
							}
						}
						$(".topictable").empty();
						_this.renderTagTable(woodid);
					},
					renderTagTable:function(woodid){
						var _this=this;
						var par = JSON.stringify(woodid);
						if (woodid.length > 0) {
							//商品标签列表**************
							_this.getwoodsbat(par, function(obj) {
								var topctabel = "";
								var tag_id_;
								for (var i in obj) {
									for (var j in tag_id_list) {
										if (tag_id_list[j].id == obj[i].id) {
											tag_id_ = tag_id_list[j].tag_id;
										}
									}
									topctabel += '<tr><td>' + obj[i].id + '</td> ' + '<td>'+commodity_goods_name+':' + obj[i].name + '</td> '
									  		  + '<td class="op-td"><button type="button" bnt-type="edit" tag_id="' + tag_id_ + '" data-id="' + obj[i].id 
									  		  + '" class="btn btn-mini btn-info">编辑</button>&nbsp;<button type="button" bnt-type="del" data-id="'
									  		  + obj[i].id + '"  tag_id="' + tag_id_ + '" class="btn btn-mini btn-info">删除</button></td> ' + '</tr>';
								var divs = $("div[goodsid='" + obj[i].id + "']");
									//更新lable的内容
									for (var j = 0; j < divs.length; j++) {
										for (var x = 0; x < divs[j].childNodes.length; x++) {
											divs[j].childNodes[x].children[0].children[1].children[0].innerText = "品牌:" + obj[i].name;
										}
									}
								}
								$(".topictable").empty().html(topctabel);
								$(".op-td btn-info").css({"height":"24px","width":"44px","color":"#ffffff","font-size":"10px","white-space":"nowrap"});
							});
						}
					},
					_renderproulist: function(obj) {
						//编辑商品标签
						var topctabel = "";
						for (var i = 0; i < obj.length; i++) {
							topctabel += '<tr>  ' + ' <td>' + obj[i].id + '</td> ' + '<td>' + obj[i].name + ':' + obj[i].name + '</td> ' + '<td><button type="button" bnt-type="edit" data-id="23" class="btn btn-mini btn-info">编辑</button>&nbsp;<button type="button" class="btn btn-mini btn-info">删除</button></td> ' + '</tr>';
						}
						$(".topictable").append(topctabel);
					},
					_renderimg: function(obj) {
						var _this = this;
						if (obj.imgs.img.length > 0) {
							cuiimgid=$(".swiper-slide-active").attr("data-id");//当前显示的图片的data-id作为cuiimg
						} else {
							cuiimgid=0;
							$(".topicimgarr").empty().html('<img src="http://dummyimage.com/800x600/4d494d/4d494d.gif&text=placeholder+image" alt="placeholder+image" height="287" width="320">');
							$(".topictable").empty();//再次进入新建话题时   清空'缓存'
							return;
						}
//						var tag_goods_id=new Array();
//						var goods_id;
						var imgid_;
						var imgstr = '<div class="swiper-container"><div class="swiper-wrapper ">';
						for (var i = 0; i < obj.imgs.img.length; i++) {
								imgid_arr.push(obj.imgs.img[i].img_id);
								imgstr += '<div class="swiper-slide swiper-no-swiping swiper-pagination-bullet-active"  data-id="' + obj.imgs.img[i].img_id + '"> '
										+'<div id="labelview' + obj.imgs.img[i].img_id + '"   data-id="' + obj.imgs.img[i].img_id 
										+ '" style="width:314px;height:200px;background-image:url(' + obj.imgs.img[i].img_url + ');background-size:100% 100%;" /></div>';
										imgid_=obj.imgs.img[i].img_id;
						}
						imgstr += '</div><div class="swiper-pagination"></div></div>';
						$(".topicimgarr").empty();
						$(".topicimgarr").html(imgstr);
						//拖动标签事件
						if(opFlag=="cutimg"){//如果是添加图片则显示最后添加的图片,如果是swiper之后则显示操作后的图片
							cuiimgid=imgid_;
						}else if(opFlag=="edit"){
							cuiimgid=imgid_;
						}
						//取出img与goods的对应关系
						//							initialSlide:img_count,//加载显示最新选择的图片
						var img_count=imgid_arr.indexOf(cuiimgid);//先前图片的id在所有图片是的序号,作为当前显示的标志
						var swiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							noSwiping: true,
							loop : false,
							initialSlide:img_count,//加载显示最新选择的图片
//							autoplay : 1000,
							onSlideChangeEnd: function(swiper) {
								$(".topictable").empty();//每每切换话题图片的时候 清空商品标签Table
								cuiimgid = $(".swiper-slide-active").attr("data-id");
								if(cuiimgid == undefined){
										if(imgid_arr[0]  != undefined){
											cuiimgid=imgid_arr[0];
										}
										
								}
								cuiimgid=parseInt(cuiimgid);
								 _this.gettags({
								 	"topic_id": curtopicid,
								 	"topic_img_id":cuiimgid
								 }, function(obj) {
								 	_this._rendrtag(obj, cuiimgid);
								 });
							}
						});
//						setTimeout(function(){
//							//debugger;
//							//swiper.slides[0].style.bottom='1px';
//							//swiper.updateContainerSize();	
//							$(".swiper-container").css("margin-top","11px");
//						},1000)
						
						if (obj.imgs.img.length > 0) {
							
							$("#labelview"+cuiimgid).parent().addClass("swiper-slide-active");
							
							_this.gettags({//本应该是当前图片与自己的tag对应关系,现在取出来的是所有图片的tag,那么现在就要从所有的tag中出去当前图片的tag
								"topic_id": curtopicid,
								"topic_img_id":cuiimgid
							},function(obj) {
								_this._rendrtag(obj, cuiimgid);
							});
						}

					},
					getAuthorRequest: function(wechat_id) {
						var _this = this;
						var option = {
							url: authorlist,
							dataType: 'json',
							contentType: 'application/json',
							data: wechat_id,
							success: function(json) {
								if (json["hfive_community_member_findeditor_response"] != undefined) {
									$rk.listener.trigger("authorList", "success", json["hfive_community_member_findeditor_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取作者列表",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取作者列表",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}
							}
						}
						new Ajax(option);
					},
					_renderAuthor: function(json) {
						//作者的下拉菜单
						var html = "";
						var author = json.editor.editor;
						for (var i = 0; i < author.length; i++) {
							var item = author[i];
								html += "<option value=" + item.open_id + " nickname="+item.nickname+">" + item.nickname + "</option>";
						}
						$("#authorList").empty().html(html);
					},
					closedig: function() {
						clearlable();
					},
					selwood: function() {
						selectwood.getwoods();
					},
					//编辑商品标签
					updatewood: function(data) {
						var _this = this;
						var option = {
							url: ptupdatetag,
							dataType: 'json',
							contentType: 'application/json',
							data: data,
							success: function(json) {
								if (json["hfive_community_tag_update_response"] != undefined) {
									var obj = {
										"title": "修改商品标签",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "修改商品标签",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								}
							}
						}
						new Ajax(option);
					},
					delwood: function(_tag_id) {
						tag_id = _tag_id;
						var me = this;
						var option = {
							url: ptdeltag,
							dataType: 'json',
							contentType: 'application/json',
							data: tag_id,
							success: function(json) {
								if (json[" hfive_community_tag_delete_response "] != undefined) {
									var obj = {
										"title": "删除商品标签",
										"txt": json["hfive_community_tag_delete_response"].message
									};
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "删除商品标签",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								}
								$rk.listener.trigger("tagdel", 'suc', parseInt(curtopicid));
							}
						}
						new Ajax(option);
					},
					_bind: function() {
						var _this = this;
						this._container.off("click");
						this._container.on("click", '.edit-dis-sty', function(e) {

							var flag = $(e.target).attr("bnt-type");
							var data = $(e.currentTarget).attr("data-id");
							//新建话题的编辑框----
							if (flag == "addimg") {
								$("#dig-img-cut").show();
								$("#inputpath").val("");
								//每次点击添加图片执行的清空复位
								//选择图片后的显示框
								$("#dig-img-cut .row-fluid .span9").empty().html('<img id="target" src="http://dummyimage.com/602x400/4d494d/4d494d.gif&text=ple" width="602" height="400"  style="width: 602px;height:400px;    margin-bottom: 10px;" alt="Jcrop Image"/>');//  
							} else if (flag == "addlable") {
								if(cuiimgid==0||cuiimgid=="0"){
									var obj = {
										"title": "创建标签",
										"txt": "请先添加图片,再添加标签"
									};
									notifications(obj, "error");
									return;
								}
								$('#dig-select-wood-chair').show();
								_this.selwood();
							} else if (flag == "edit") {
								//编辑标签
								tag_id_edit = $(e.target).attr("tag_id");
								commodity_id = $(e.target).attr("data-id");
								brand_id = $(".brandopt option:selected").attr("data-id");
								opFlagTag="edit";
								_this.selwood();
								$('#dig-select-wood-chair').show();
//								_this.updatewood({
//									"tag_id": tag_id,
//									"brand_id": brand_id,
//									"commodity_id": commodity_id
//								}); //编辑选中的商品
								
							} else if (flag == "del") {
								//删除标签---要从img_tag_json中删除掉对应的商品
								var tag_id = $(e.target).attr("tag_id");
								for(var i=0;i<img_tag_json.length;i++){
									if(JSON.stringify(img_tag_json[i]).indexOf(cuiimgid+":"+tag_id)){
										delete img_tag_json[i];
									}
								}
								$("#boxid"+tag_id).remove();
								_this.delwood({
									"tag_id": tag_id
								});
							} else if (flag == "save") {
								//保存
							} else if (flag == "cancel") {
								$('#dig-select-wood-chair').hide();
								$('#dig-select-wood').hide();
							} else if (flag == "delimg") {
								if(cuiimgid==0){
										var obj = {
											"title": "删除话题图片",
											"txt": "当前话题未添加图片，不能执行删除操作"
										};
										notifications(obj, "error");return;
									}else{
										_this.delimg({
											"topic_img_id": cuiimgid
										});
									}
								}
						});
						this._container.on("click", '.dis-disBtn', function(e) {
							var flag = $(e.target).attr("bnt-type");
							if (flag == "ok") {
								//新建话题  最后一步      更新话题
								_this.savetopicdata();
								$('#dig-select-wood-chair').hide();
								$('#dig-select-wood').hide();
//								cuiimgid=0;
							}		
							clearlable();
						});

					},
					getCommodityID: function() {
						var tab = $(".span table");
						var comm_id = [];
						for (var i = 1, rows = tab.rows.length; y < rows; i++) {
							for (var j = 0, cells = tab.rows[i].cells.length; j < cells; j++) {
								if (!comm_id[i]) {
									comm_id[i] = new Array();
								}
								comm_id[i][j] = tab.rows[i].cells[j].attr("data_id");
							}
						}
					},
					savetopicdata: function() {
						var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
						var lablepos = getposarr();
						
						var tagid = new Array();
						var tagleft = new Array();
						var tagtop = new Array();
						for (var i in lablepos) {
							tagid.push(parseInt(i));
							tagleft.push(lablepos[i].x ? lablepos[i].x : 0);
							tagtop.push(lablepos[i].y ? lablepos[i].y : 0);
						}
						//验证参数
						if($("#topictitletxt").val()==""){
							var obj = {
								"title": "创建话题",
								"txt": "话题标题不能为空"
							};
							notifications(obj, "error");
							return;
						}else if($("#topictitletxt").val().length>50){
							var obj = {
								"title": "创建话题",
								"txt": "话题标题最大长度为50个字符"
							};
							notifications(obj, "error");return;
						}else if($("#topiccontent").val()==""){
							var obj = {
								"title": "创建话题",
								"txt": "话题正文不能为空"
							};
								notifications(obj, "error");return;
						}else if($("#topiccontent").val().length>1000){
							var obj = {
								"title": "创建话题",
								"txt": "话题正文最大长度为1000个字符"
							};
							notifications(obj, "error");return;
						}
						if(curalbumid=="#"){
							curalbumid=undefined;
						}
						this.uptopic({
							"wechat_id": wechat_id,
							"album_id": curalbumid,
							"topic_id": curtopicid,
							"topic_title": $("#topictitletxt").val(),
							"topic_body": $("#topiccontent").val(),
							"tag_ids": tagid,
							"tag_point_lefts": tagleft,
							"tag_point_tops": tagtop,
							"author_open_id": $("#authorList option:selected").val()
						});

					},

					creatopic: function(obj) {
						var _this = this;
						var option = {
							url: ptcretopic,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topic_create_response"] != undefined) {
									//_this._render(json["ruixue.hfive.community.topic.create"]);
									curtopicid = json["hfive_community_topic_create_response"].topic_id;
									//针对编辑话题
									_this.gettopic({
										"topic_id": curtopicid
									}); //渲染 标题和数据
									_this.edittopic(curtopicid); //获取图片
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "创建话题",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "创建话题",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					edittopic: function(topicid) {
						this.getlistimg({
							"topic_id": topicid
						});
					},

					getproductlist: function(obj) {
						var _this = this;
						var option = {
							url: ptproductlist,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_weidian_goods_get_response"] != undefined) {

									_this._renderproulist(json["hfive_weidian_goods_get_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取标签列表",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取标签列表",
										"txt": "数据结构出现问题URL:" + ptproductlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					gettags: function(obj, fun) {//img于TAG的一一对应  但是现在取出来的是所有图片的TAG
						var _this = this;
						var option = {
							url: ptgettaglist,
							dataType: 'json',
							type: 'post',
							data: JSON.stringify(obj),
							contentType: 'application/json',
							success: function(json) {
								if (json["hfive_community_tag_findlist_response"] != undefined) {

									if (fun != undefined) {
										fun(json["hfive_community_tag_findlist_response"]);
									}

								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取标签列表",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取标签列表",
										"txt": "数据结构出现问题URL:" + ptgettaglist
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					getgood: function(obj, fun) {
						var _this = this;
						var option = {
							url: ptselgood,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {

								if (json["hfive_weidian_goods_getdetail_response"] != undefined) {
									if (fun != undefined) {
										fun(json["hfive_weidian_goods_getdetail_response"]);
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "查看商品详情",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "查看商品详情",
										"txt": "数据结构出现问题URL:" + ptdelimg
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					delimg: function(obj) {
						var _this = this;
						var option = {
							url: ptdelimg,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topicimg_delete_response"] != undefined) {
									var obj = {
										"title": "删除图片",
										"txt": json["hfive_community_topicimg_delete_response"].message
									};

									_this.getlistimg({
										"topic_id": curtopicid
									});
									notifications(obj, "suc");
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "删除图片",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "删除图片",
										"txt": "数据结构出现问题URL:" + ptdelimg
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					getlistimg: function(obj) {
						var _this = this;
						var option = {
							url: ptgetimglist,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topicimg_findlist_response"] != undefined) {
									_this._renderimg(json["hfive_community_topicimg_findlist_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "查看话题图片列表",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "查看话题图片列表",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}
							},
							beforeSend: function() {
							}
						}
						new Ajax(option);
					},
					gettopic: function(obj) {
						var _this = this;
						var option = {
							url: ptgettopic,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json["hfive_community_topic_findone_response"] != undefined) {
									_this._render(json["hfive_community_topic_findone_response"]);
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "获取话题数据",
										"txt": "数据结构出现问题:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "获取话题数据",
										"txt": "数据结构出现问题URL:" + ptalbumlist
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//编辑话题
				var edittopic = new $rk.VC({
					_init: function() {
						var me = this;
						me._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
					},
					_container: $('#moda-edit-discu'),
					_render: function(obj) {
						var topctabel = "";

						for (var i = 0; i < obj.mood.length; i++) {
							for (var j in obj.mood[i]) {
								topctabel += '<tr>  ' + '<td>' + j + '</td> ' + '<td>' + obj.mood[i][j].brand + ':' + obj.mood[i][j].name + '</td> ' + '<td><button type="button" bnt-type="edit" data-id="23" class="btn "   >编辑</button>&nbsp;<button type="button" class="btn btn-mini btn-info">删除</button></td> ' + '</tr>';
							}
						}
						$(".topictable").empty.html(topctabel);
						$("#topictitle").val(obj.title);
						$("#topictxt").val(obj.text);
//						
//
//					},
//					renderImgList:function(obj){
						//头像图片---原没有这个方法  是在render里面的  现在拿出来 
						//Swiper
						var imgstr = '<div class="swiper-container"><div class="swiper-wrapper ">';
						for (var i = 0; i < obj.tipicimg.length; i++) {
							imgstr += '<div class="swiper-slide swiper-no-swiping swiper-pagination-bullet-active"> <div id="labelview' + i + '" style="width:314px;height:200px;background-image:url(' + obj.tipicimg[i].imgsrc + ');background-size:100% 100%;" /></div>';
						}
						imgstr += '</div><div class="swiper-pagination"></div></div>';
						$(".topicimgarr").html(imgstr);

						var swiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							noSwiping: true
						});

						var lablestr = '<div style="width:177px;"> <div class="dotdiv"></div> <div class="bgdiv"> <li>联想:12 </li> <li>消息:你大爷</li> </div></div>';

						//建立标签

						var boxsize = {
							"width": 177,
							height: 25
						}

						cteatelable("#labelview1", "boxid3", lablestr, boxsize);
						cteatelable("#labelview0", "boxid", lablestr, boxsize);
						cteatelable("#labelview0", "boxid1", lablestr, boxsize);
						cteatelable("#labelview0", "boxid2", lablestr, boxsize);
					},
					closedig: function() {
						clearlable();
					},
					selwood: function() {
						//选择商品
						selectwood.getwood();
					},

					_bind: function() {
						var _this = this;
						this._container.off("click");
						this._container.on("click", '.edit-dis-sty', function(e) {

							var flag = $(e.target).attr("bnt-type");
							var data = $(e.currentTarget).attr("data-id");
							if (flag == "addimg") {
								//添加图片
								$("#dig-img-cut").show();
							} else if (flag == "addlable") {//点击添加标签按钮
///								$("#cancelTopicBtn").attr("disabled","disabled");
//								$("#updateTopicBtn").attr("disabled","disabled");
//								/$("#modal-create-dialog modal-header button[class=close]").attr("disabled","disabled");
								_this.selwood();
							} else if (flag == "edit") {
								//编辑已选定的商品标签
								$('#dig-select-wood').show();
								_this.selwood();
							} else if (flag == "del") {
								//data 删除
							} else if (flag == "save") {
								//保存
							} else if (flag == "cancel") {
								//取消保存
							}
						});
						this._container.on("click", '.dis-disBtn', function(e) {
							clearlable();
							$('#dig-edit-discuss').hide();
						});
					},
					gettopic: function() {
						var _this = this;
						var option = {
							url: gettpic,
							dataType: 'json',
							type: 'get',
							success: function(json) {

								if (json["get-topic"]["errnum"] == 10000 || json["get-topic"]["errnum"] == "10000") {
									_this._render(json["get-topic"]);//加载表格？
//									_this.renderImgList(json["get-topic"]);//加载左侧图片列表
								} else {
									//alert("请求数据出错URL:" + getalbumlist);
									var obj = {
										"title": "获取专辑数据",
										"txt": "数据结构出现问题URL:" + jsong.m
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					}
				});
				//编辑话题

				//图片剪切工具对话框
				var cutpic = new $rk.VC({
					_picobj: null,
					_init: function() {
						var me = this;
						setTimeout(function() {
							$("#dig-img-cut").hide();
							$("#dig-img-cut").css({
								"opacity": 1
							});
						}, 1000);
						me._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
					},
					_container: $('#dig-img-cut'),
					_render: function(obj) {
						var _this = this;
					},
					_bind: function() {
						// 保存图片
						var _this = this;
						this._container.off("click");
						this._container.on("click", '.container', function(e) {
							//选择话题的图片之后  的保存按钮
							if (e.target.id == "cutimg") { // 保存图片
								saveimg({
									"topic_id": curtopicid,
									"topic_img_base64": "",
									"topic_img_seq": 0
								}, function(obj) {
									//选定图片并点击保存
									_this.upimgpost(JSON.stringify(obj), function(obj) {
										opFlag="cutimg";
										createtopic.getlistimg({
											"topic_id": curtopicid,
										});
										$("#dig-img-cut").hide();
									});
								});
							} else if (e.target.id == "submitimg") { //废弃
								$("#dig-img-cut").hide();
							}

							$('button[data-id=cutImg-close]').unbind('click').click(function() {
								$("#dig-img-cut").hide();
							});
						});
						//选图片的方法入口-----图片上传完成的返回状态可以在这儿 判断
						$('#inputpath').change(function(ev) {
							console.log("A");
							_this.postbindata(function(obj) { //选择图片完毕
									var jsong = JSON.parse(obj);
									$("#dig-img-cut .row-fluid .span9").empty().html('<img id="target" src="http://dummyimage.com/602x400/4d494d/4d494d.gif&text=ple" width="602" height="400" style="width: 602px;height:400px;    margin-bottom: 10px;"  alt="Jcrop Image"/>');// 
//									_this._picobj = new load(jsong.oss_path);//原位置0512
									$("#interface").hide();
									if (jsong.code == 0 || jsong.code == "0") { //图片上传成功，有返回值
										_this._picobj = new load(jsong.oss_path);
										updD = jsong.oss_path; // updD上传图片的地址
									} else if (jsong.code != 0 || jsong.code != "0") {
										var obj = {
											"title": "加载图片",
											"txt": jsong.msg
										};
										notifications(obj, "error");
									}else{
										var obj = {
											"title": "加载图片",
											"txt": "API处理过程中发生了不可预料的异常情况,请与系统管理员联系"
										};
										notifications(obj, "error");
									}
								},
								document.getElementById("inputpath").files[0],
								function(obj) {
									console.log("图片处理进度::" + obj);
								});
						});
					},
					upimgpost: function(par, fun) {
						//保存图片的方法
						var _this = this;

						var option = {
							url: ptcreimg,
							dataType: 'json',
							type: 'post',
							contentType: 'application/json',
							data: par,
							success: function(json) {
								if (json["hfive_community_topicimg_create_response"] != undefined) {
									//_this._render(json["hfive_community_topicimg_create_response"]);
									if (fun != undefined) {
										fun(json);
									}
								} else if (json["error_response"] != undefined) {
									var obj = {
										"title": "话题上传图片",
										"txt": "数据结构出现问题URL:" + json["error_response"].msg
									};
									notifications(obj, "error");
								} else {
									var obj = {
										"title": "话题上传图片",
										"txt": "数据结构出现问题:" + ptcreimg
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}

						new Ajax(option);

					},
					postbindata: function(suc, bin, uploading) {
						var fd = new FormData(),
							xhr = new XMLHttpRequest();
						var _this = this;
						fd.append("file", bin);
							if(bin==undefined||bin=="undefined"){
								//处理BUG3889
								return;
							}
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4 && xhr.status == 200) {
								if (suc instanceof Function) {
									suc(xhr.responseText);
								}
							}
						}
						xhr.upload.onprogress = function(evt) {
							var per = Math.floor(100 * evt.loaded / evt.total);
							if (uploading instanceof Function) {
								uploading(per);
							}
						};
						xhr.open("post", upLoadImage);
						xhr.send(fd);
					},
					getdisu: function() {
						var _this = this;
						var option = {
							url: getdisc,
							dataType: 'json',
							type: 'get',
							success: function(json) {
								if (json["look-topic"]["errnum"] == 10000 || json["look-topic"]["errnum"] == "10000") {

								} else {
									alert("请求数据出错URL:" + getalbumlist);
								}

							},
							beforeSend: function() {

							}
						}
						new Ajax(option);
					},
					timestampToData: function(timestamp) {
						var newDate = new Date();
						newDate.setTime(timestamp * 1000); //timestamp*1000
						var stri = newDate.format();
						return stri;
					},
					upimg: function(obj, fun) {
						var _this = this;
						var option = {
							url: upLoadImage,
							dataType: 'json',
							type: 'post',
							data: obj,
							success: function(json) {
								if (json.callResult == true || json.callResult == "true") {
									updD = json.oss_path;
									if (fun != undefined) {
										fun(json.oss_path);
									} else {
										var obj = {
											"title": "提交图片数据",
											"txt": "数据结构出现问题:" + json["error_response"].msg
										};
										notifications(obj, "error");
									}
								}else{
									var obj = {
										"title": "提交图片数据",
										"txt": "数据结构出现问题:" + json["msg"]
									};
									notifications(obj, "error");
								}

							},
							beforeSend: function() {

							}
						}

						new Ajax(option);
					}
				});
				//图片剪切工具对话框
			};
		//分页管理
		var pager = new $rk.VC({
			_init: function() {
				var me = this;
				$rk.listener.on('albumtable', 'success', function(act, json) {
					//话题列表加载完成之后
					pager._render(json);
				});
				$rk.listener.on('table', 'requesting', function(act) {
					me.hide();
				});
				$rk.listener.on('pager', 'translate', function(a, b) {
					me._render(b);
				});
			},
			_container: $('#j_con_page'),
			_bind: function(pageTotal) {
				var me = this;
				if (pageFlag == 0) {
				//	$('ul[data_id=pageShow] li').not('.prev').not('.next').remove();
					page_size=pageTotal%pageLength==0?parseInt(pageTotal/pageLength):parseInt(pageTotal/pageLength)+1;
					if (page_size != 0) {
						me.pageShow(page_num, 1, page_size);
					} else {
						$('.prev,.next').hide();
					}
					pageFlag = 1;
				}
				$('ul[data_id=pageShow]').off().on('click', 'li:not(:first):not(:last):not(.active)', function() {
					page_current = $(this).text() - 0;
					me.pageShow(page_num, page_current, page_size);
					$('li:contains(' + page_current + ')').addClass('active').siblings().removeClass('active');
					var wechat_id = $(".selectWX>#usrbidsel option:selected").attr("weixin_id");
				});
				$('.next').unbind('click').click(function() {
					page_current += 1;
					if (page_current > page_size) {
						page_current = page_size;
						$('ul[data_id=pageShow] li:last').addClass('disabled');
					} else {
						$('ul[data_id=pageShow] li:last').removeClass('disabled');
					}
				});
				$('.prev').unbind('click').click(function() {
					page_current -= 1;
					if (page_current < 1) {
						page_current = 1;
						$('ul[data_id=pageShow] li:first').addClass('disabled');
					} else {
						$('ul[data_id=pageShow] li:first').removeClass('disabled');
					}
				});
				me.pageShow(page_num, page_current, page_size);
			},
			_render: function(json) {
				var d = json; //json.hfive_core_tag_microapp_mypage_table_response;
				var total = d.total;
				var curpage = d.page || 1;
				if (total < 1) return;

				$(".preva").attr("data-id", prenum);
				$(".nextli").attr("data-id", nextnum);
				pageLength = d.total;

				//pageLength=100;

				var curpage = prenum + 1;

				$("#pagenum").html("" + curpage);

			 
			},
			pageShow: function(page_num, page_current, page_size) {
				var page_end, page_range, page_start = 1;
				if (page_size <= page_num) {
					page_end = page_size;
				} else {
					page_range = Math.ceil(page_num / 2) - 1;
					page_end = page_current + page_range;
					if (page_end > page_num) {
						if (page_end > page_size) {
							page_end = page_size;
						}
						page_start = page_end - page_num + 1;
					} else {
						page_end = page_num;
						page_start = 1;
					}
				}
				var page = '';
				for (var i = page_start; i <= page_end; i++) {
					page += '<li><a href="javascript:void(0);">' + i + '</a></li>';
				}
//				$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
				$('ul[data_id=pageShow] li:first').after(page);
				if (page_current == 1) {
					$('ul[data_id=pageShow] li:first').addClass('disabled');
				} else {
					$('ul[data_id=pageShow] li:first').removeClass('disabled');
				}
				if (page_current == page_size) {
					$('ul[data_id=pageShow] li:last').addClass('disabled');
				} else {
					$('ul[data_id=pageShow] li:last').removeClass('disabled');
				}
				$('li:contains(' + page_current + ')').addClass('active').siblings().removeClass('active');
			},
			hide: function() {
				var me = this;
				me._container.hide();
			}
		});
		//分页管理

		$Rk.plat.s(function(obj) {
			Date.prototype.format = function(A) {
				if (!A)
				A = "yyyy/MM/dd HH:mm:ss.SSS";
				var year = this.getFullYear();
				var month = this.getMonth();
				var sMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
				var sWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var date = this.getDate();
				var day = this.getDay();
				var hr = this.getHours();
				var min = this.getMinutes();
				var sec = this.getSeconds();
				var daysInYear = Math.ceil((this - new Date(year, 0, 0)) / 86400000);
				var weekInYear = Math.ceil((daysInYear + new Date(year, 0, 1).getDay()) / 7);
				var weekInMonth = Math.ceil((date + new Date(year, month, 1).getDay()) / 7);
				return A.replace(/yyyy/g, year).replace(/yy/g, year.toString().substr(2)).replace(/dd/g, (date < 10 ? "0" : "") + date).replace(/HH/g, (hr < 10 ? "0" : "") + hr).replace(/KK/g, (hr % 12 < 10 ? "0" : "") + hr % 12).replace(/kk/g, (hr > 0 && hr < 10 ? "0" : "") + (((hr + 23) % 24) + 1)).replace(/hh/g, (hr > 0 && hr < 10 || hr > 12 && hr < 22 ? "0" : "") + (((hr + 11) % 12) + 1)).replace(/mm/g, (min < 10 ? "0" : "") + min).replace(/ss/g, (sec < 10 ? "0" : "") + sec).replace(/SSS/g, this % 1000).replace(/a/g, (hr < 12 ? "AM" : "PM")).replace(/W/g, weekInMonth).replace(/F/g, Math.ceil(date / 7)).replace(/EEE/g, sWeek[day].substring(0, 3)).replace(/E/g, sWeek[day]).replace(/D/g, daysInYear).replace(/w/g, weekInYear).replace(/MMMM/g, sMonth).replace(/MMM/g, sMonth.substring(0, 3)).replace(/MM/g, (month < 9 ? "0" : "") + (month + 1));
			}

			setModel();
		});

	});

//