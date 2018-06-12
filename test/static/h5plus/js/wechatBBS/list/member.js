seajs.use(['Ajax', 'dot', 'pagination', 'tips2', "Dialog", 'sortable', 'upload', 'zTree', 'zThide', "jstree", "dataTables", "easyui", "jqui", "bootstrap"],
	function(Ajax, dot, pagination, Tips, Dialog, sortable, upload, zTree, zThide, jstree, dataTables, easyui, jqui, bootstrap) {

		var page_size, //共page_size页
			prenum = 0, //上一页页码
			nextnum = 2, //下一页页码
			wechat_id = "", //公众号的id string    必须
			nickname = "", //用户昵称，  
			company_key = "", //公司keyString  必须
			uid = 0, //用户id  int  必须
			pageLength = 10,//每页显示消息数量
			page_num = 5,//??可见页码个数  LG：<<2.3.4.5.6>>
			page_current = 1,//当前页吗
			flag=0,//??
			pageFlag=0,//??
			hostUrl='http://'+window.location.host,
            homePage=hostUrl+'/pc/photon.html',
			newActivityId, activityStatus,activity_id;
		var obj = arguments,
			setModel = function() {

				//接口参数
				var setEditor = $$r.routers.data.link.setEditor,
					cancleEditor = $$r.routers.data.link.cancleEditor,
					findEditor = $$r.routers.data.link.findEditor,
					findPaging = $$r.routers.data.link.findPaging,
					pubidlist=$$r.routers.data.link.pubidlist;

				//控制菜单
				var controlmenu = new $rk.VC({
					_init: function() {
						var me = this;
						this._bind();
						$rk.listener.on('plat', 'ready', function(e, c) {
							me.loading("数据加载中");
						});
					},
					_container: $('#controlmenu'),
					_render: function(obj) {
					},
					_bind: function() {
						//菜单滚动
						
						$('.panel-slider-arrow').off().on('click', function() {
							$('.panel, .main-content').toggleClass('retracted');
						});
						this._container.off("click");
						this._container.on("click", '.menubnt', function(e) {
							$(e.target).attr('data-target', "#dig-cteat-album");
						});//菜单滚动 End
					}
				});
//============当前位置导航====================================
				var localNav=new $rk.VC({
					_init:function(){
						var me = this;
						$rk.listener.on('plat', 'ready', function(e, json) {//初始加载表格
							me._render();
							me._bind();
						});
					},
					_container:$("#local-nav-tip"),
					_bind:function(){
						$('ul[data_id=navTop] li').first().click(function(){
		                    window.parent.location.href=homePage;
		                });
					},
					_render:function(){
						var _this = this;
						var html = $rk.tplRender(dot, $('#local-nav-tip-tml').html(),undefined);
						_this._container.html(html);
					}
				})
//==========表格====================================================
				var membertable = new $rk.VC({
					_init: function() {
						var me = this;
						$rk.listener.on('plat', 'ready', function(e, json) {//初始加载表格
							
							
							me.getWeiXinRequest();//加载微信下拉  2
							me.bindSearchMember();//搜索栏--搜索会员
//							pageFlag=0;//......
							 
						});
						$rk.listener.on('selectWX','success',function(e,json){
							me.wxRender(json);
							me.bindWxList();
//							me.bindAwardList();//绑定分页
							var awardData=me.returnParam(page_current,pageLength);
							me.memberListRequest(awardData);//加载数据table
						});
						//监听表格加载完成
						$rk.listener.on('table', 'success', function(e, json) {
							me.renderMemberList(json);
							me.bindMemberList();//绑定分页
							me.bindEditor_YN();//设置/取消编辑者
						});
						//监听微信
					
						//监听返回值 报异常
						$rk.listener.on('tipsPhoton', 'success', function(e, json) {
		                    me.renderTipsPhoton(json);
		                    me.bindTipsPhoton();
		                });
					},
					setpage: function(num) {
						$("#setPage").val(num);
					},
					_container: $('#member-table-list'),
					_render: function(data) {
						//加载表格
						var _this = this;
						var html = $rk.tplRender(dot, $('#member-table-tml').html(), data || {});
						$('#member-table-list').html(html);
					},
					wxRender:function(json){
						var html = $rk.tplRender(dot, $('#member-select-wechat-tml').html(), json||{});
						$('#member-select-wechat').html(html);
					},
					bindWxList:function(){
						//切换微信公众号
						var me=this;
						$("#usrbidsel").unbind("change").bind("change",function(){
							$("#panelSearch").val("");//在切换公众号的时候 搜索栏的值要清掉
							page_current=1;
							var data=me.returnParam(page_current,pageLength);
							me.memberListRequest(data);
							pageFlag=0;
						});
					},
					bindSearchMember:function(){
						//绑定搜索功能
						var me=this;
						$("#select-member-btn").unbind("click").bind("click",function(){
							var data=me.returnParam(1,10);
							page_current=1;
							me.memberListRequest(data);
							
							pageFlag=0;
						});
						$("#panelSearch").focus(function(){
							$(this).keypress(function(event){
							    var keyCode = event.keyCode;
							    if(keyCode==13||keyCode=="13"){
							    	$("#select-member-btn").click();
							    }
							})
						})
					},
					bindEditor_YN:function(){
						//绑定   设置/取消--编辑
						var me=this;
						$("#editor_yn button").unbind("click").bind('click',function(){
							var open_id=$(this).parent().parent().find('.open_id').attr("data-openID");
							var nickname=$(this).parent().parent().find('.nickname').attr("title");
							var wechat_id=$("#usrbidsel option:selected").attr("weixin_id");
							var data={
								'open_id':open_id,
								'wechat_id':wechat_id
							}
							if($(this).attr("editor_yn")=="N"){
								//当前不是编辑者--绑定方法
								//显示二次确认的  窗口
								var container=$("div[ng-controller='labelController']");
								container.removeClass("hide-confirm");
								container.find(".AlertDelete_1>.title>.title-name").empty().html("设为作者");
								container.find(".AlertDelete_1>.title1").empty().html("确定要将\""+nickname+"\"设为作者吗？");
								container.find(".AlertDelete_1>.title3>div[data-action='sure']").unbind("click").bind("click",function(){
									me.setEditorFn(data);
									container.addClass("hide-confirm");
								});
								container.find(".AlertDelete_1>.title3>div[data-action='cancle']").unbind("click").bind("click",function(){
									container.addClass("hide-confirm");
								});
							}else if($(this).attr("editor_yn")=="Y"){
								//当前已是编辑者--取消方法
								var container=$("div[ng-controller='labelController']");
								container.removeClass("hide-confirm");
								container.find(".AlertDelete_1>.title>.title-name").empty().html("撤销");
								container.find(".AlertDelete_1>.title1").empty().html("确定要将\""+nickname+"\"撤销作者吗？");
								container.find(".AlertDelete_1>.title3>div[data-action='sure']").unbind("click").bind("click",function(){
									me.cancelEditorFn(data);
									container.addClass("hide-confirm");
								});
								container.find(".AlertDelete_1>.title3>div[data-action='cancle']").unbind("click").bind("click",function(){
									container.addClass("hide-confirm");
								});
							}
						});
					},
					loading: function(text) {
						this._container.html('<div class="ui-msg ui-msg-loading">' + text + '...</div>');
					},
					//加载数据  判断是正确返回还是错误返回
					memberListRequest: function(data) {
						var option = {
							url: findPaging,
							data: data,
							dataType: 'json',
							type: 'post',
							success: function(json) {
								//正确返回
								JSON.stringify(json);
								if (!json.error_response) {
									$rk.listener.trigger('table', 'success', json);
								} else {
									//错误返回
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},
					getWeiXinRequest:function(data){
						var option={
							url: pubidlist,
							dataType: 'json',
							type: 'post',
							success: function(json) {
								//正确返回
								if (!json.error_response) {
									$rk.listener.trigger('selectWX','success',json);
								} else {
									//错误返回
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},
					setEditorFn:function(data){
						//设为编辑
						var me=this;
						var option={
							url:setEditor,
							data:data,
							dataType:'json',
							type:'post',
							success:function(json){
								if (!json.error_response) {
									var data=me.returnParam(page_current,pageLength);
									me.memberListRequest(data);
								} else {
									//错误返回
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},
					cancelEditorFn:function(data){
						//取消编辑
						var me=this;
						var option={
							url:cancleEditor,
							data:data,
							dataType:'json',
							type:'post',
							success:function(json){
								if (!json.error_response) {
								//成功修改之后应该刷新一次Table
									var data=me.returnParam(page_current,pageLength);
									me.memberListRequest(data);
								} else {
									//错误返回
									json.error_response.code = 0;
									$rk.listener.trigger('tipsPhoton', 'success', json.error_response);
								}
							}
						}
						new Ajax(option);
					},
					renderMemberList: function(data) {
						data.pageLength = pageLength;
						var html = $rk.tplRender(dot, $('#member-table-tml').html(), data || {});
						$('#member-table-list').html(html);
					},
					//分页
					bindMemberList: function() {
						var me = this;
						page_size = $('.awardTable').attr('page_size');
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
							var awardData=me.returnParam(page_current,pageLength);// 这个方法可能要被修改***********
							me.memberListRequest(awardData);//加载数据table
						});
						$('.next').unbind('click').click(function() {
							page_current += 1;
							if (page_current > page_size) {
								page_current = page_size;
								$('ul[data_id=pageShow] li:last').addClass('disabled');
							} else {
								$('ul[data_id=pageShow] li:last').removeClass('disabled');
								var awardData=me.returnParam(page_current,pageLength);// 这个方法可能要被修改***********
								me.memberListRequest(awardData);//加载数据table
							}
//							me.pageShow(page_num, page_current, page_size);
						});
						$('.prev').unbind('click').click(function() {
							page_current -= 1;
							if (page_current < 1) {
								page_current = 1;
								$('ul[data_id=pageShow] li:first').addClass('disabled');
							} else {
								$('ul[data_id=pageShow] li:first').removeClass('disabled');
								var awardData=me.returnParam(page_current,pageLength);//   这个方法可能要被修改***********
								me.memberListRequest(awardData);//加载数据table
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
					returnParam:function(page_current,pageLength){
						//查看表格需要传到后台的数据
						var weixin_id=$("#usrbidsel option:selected").attr("weixin_id");//weixin_id
						if(weixin_id===undefined){
							weixin_id="";
						}
						var nickname=$("#panelSearch").val();//按昵称搜索
						var data = {
//								"company_key":"",//公司key  string
//								"uid":0,//用户id  int
								'wechat_id':weixin_id,//微信id   这个字段和微信下拉菜单的名字不一致  请注意 string
								'nickname':nickname,//用户昵称
								'page_num': page_current,//页数   默认为1
								'page_size': pageLength//,//每页大小  默认20
							};
							return data;
					},
					renderTipsPhoton:function(data){
						//返回值错误  提示框出现
		                var html = $rk.tplRender(dot, $('#j_view_tipsPhoton').html(), data||{});
		                $('#j_con_tipsPhoton').html(html).css("z-index","9");
		            },
		            bindTipsPhoton:function(){
		            	//提示框  淡出的效果
		                $('.alert').fadeOut(10000,function(){
		                    $('.alert .close').click();
		                    $('#j_con_tipsPhoton').css("z-index","auto");
		                });
		            },
//		            postbindata: function(suc, bin, uploading) {
//			            var fd = new FormData(),
//			              xhr = new XMLHttpRequest();
//			            var _this = this;
//			            fd.append("file", bin);
//			
//			            xhr.onreadystatechange = function() {
//			              if (xhr.readyState == 4 && xhr.status == 200) {
//			                if (suc instanceof Function) {
//			                  suc(xhr.responseText);
//			                }
//			              }
//			            }
//			            xhr.upload.onprogress = function(evt) {
//			              var per = Math.floor(100 * evt.loaded / evt.total);
//			              if (uploading instanceof Function) {
//			                uploading(per);
//			              }
//			            };
//			            xhr.open("post", upLoadImage);
//			            xhr.send(fd);
//			          },
				});
			};

		$Rk.plat.s(function(obj) {

//			Date.prototype.format = function(A) {
//				if (!A)
//					A = "yyyy/MM/dd HH:mm:ss.SSS";
//				var year = this.getFullYear();
//				var month = this.getMonth();
//				var sMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
//				var sWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//				var date = this.getDate();
//				var day = this.getDay();
//				var hr = this.getHours();
//				var min = this.getMinutes();
//				var sec = this.getSeconds();
//				var daysInYear = Math.ceil((this - new Date(year, 0, 0)) / 86400000);
//				var weekInYear = Math.ceil((daysInYear + new Date(year, 0, 1).getDay()) / 7);
//				var weekInMonth = Math.ceil((date + new Date(year, month, 1).getDay()) / 7);
//				return A.replace(/yyyy/g, year).replace(/yy/g, year.toString().substr(2)).replace(/dd/g, (date < 10 ? "0" : "") + date).replace(/HH/g, (hr < 10 ? "0" : "") + hr).replace(/KK/g, (hr % 12 < 10 ? "0" : "") + hr % 12).replace(/kk/g, (hr > 0 && hr < 10 ? "0" : "") + (((hr + 23) % 24) + 1)).replace(/hh/g, (hr > 0 && hr < 10 || hr > 12 && hr < 22 ? "0" : "") + (((hr + 11) % 12) + 1)).replace(/mm/g, (min < 10 ? "0" : "") + min).replace(/ss/g, (sec < 10 ? "0" : "") + sec).replace(/SSS/g, this % 1000).replace(/a/g, (hr < 12 ? "AM" : "PM")).replace(/W/g, weekInMonth).replace(/F/g, Math.ceil(date / 7)).replace(/EEE/g, sWeek[day].substring(0, 3)).replace(/E/g, sWeek[day]).replace(/D/g, daysInYear).replace(/w/g, weekInYear).replace(/MMMM/g, sMonth).replace(/MMM/g, sMonth.substring(0, 3)).replace(/MM/g, (month < 9 ? "0" : "") + (month + 1));
//			}

			setModel();
		});

	});

//