/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   chen
* @Last Modified time: 2016-03-25 20:39:01
*/
seajs.use(['jqui', 'Ajax','dot','Validate2',"Dialog","tips2", 'bootstrap', 'sortable','pagination'],  
    function(jqui,Ajax,dot,Validate,Dialog,Tips,bootstrap,sortable,pagination){

    var setModel = function() {

        var DetailUrl = $$r.routers.data.link.getDetail,
            imgFileUrl = $$r.routers.data.link.UploadUrl,
            getGoodsListUrl = $$r.routers.data.link.getGoodsListUrl,
            UpdateUrl = $$r.routers.data.link.UpdateUrl,
            addUrl = $$r.routers.data.link.addUrl,
            isAdd = !$rk.getUrlAllParam().store_id,  // store_id  page_id
            editId = $rk.getUrlAllParam().store_id || -1;

        var id = $rk.getUrlAllParam().id;
        //console.log(id); 
        var store_id = $rk.getUrlAllParam().store_id;
        var page_id = $rk.getUrlAllParam().page_id;

        var title_data = {
                "page_name": "",
                "order": ""
            };
        var goods_data0 = {
                "type": "goods",
                "id": "",
                "style": 0,
                "name": "商品名称",
                "intro": "商品简介",
                "price": "价格",
                "url": "",
                "image": "http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png"
            };
        var goods_data1 = {
                "type": "",
                "id": "",
                "style": 1,
                "salenum" : "X",
                "name": "商品名称",
                "intro": "商品简介",
                "price": "价格",
                "price_old": "原价",
                "url": "",
                "image": "http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default2.png"
            };
        var txt_data = {
                "type": "txt",
                "style": 0,
                "name": "文字标题"
        };
        var group_data = {
                "type": "group",
                "id": "",
                "name": "商品名称",
                "price": "价格",
                "intro": "商品简介",
                "staff": "X",
                "url": "",
                "image": "http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png"
        };
        var banner_data = {
          "type": "ads",
          "adlist": [
              {
                  "id": "",
                  "url": "",
                  "image": ""
              }
          ]
        };
        //console.log(isAdd,editId);  // true -1
        var title = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, json) {
                    me._render(json);
                    me._bind();
                });
            },
            _container: $('#j_con_title'),
            _render: function(data) {
                //data.title = isAdd ? '': ''
                var html = $rk.tplRender(dot, $('#j_view_title').html(), data);
                this._container.html(html);
                var navstr = '<li class="active"><a href="./list.html?id='+id+'">一般页面</a></li> '+ 
                              '<li><a href="../special/list.html?id='+id+'">特殊页面</a></li>'+
                              '<li><a href="../configTemp.html?id='+id+'">模板设置</a></li>';
                $('.nav').html(navstr);
            },
            _bind: function(){
                $('#j_refresh').click(function(event) {
                    window.location.reload();
                });
            }
        });

        var panel_top = 0;
        var goods_json_idx;

        var main = new $rk.VC({
            _obj:{},
            _index:0,
            _idx:0,
            _json: {},
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.loading("数据加载中");
                    if(isAdd){ // add 
                      me._render($('#j_view_content_add'),{});
                      me._bind();
                      me.closeHover();
                      $('#j_con_content_title').click(); 
                    }else{  // edit
                      me.formSend();
                      me._bind();
                    }
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    me._json = json;
                    me._render($('#j_view_content_edit'),json);
                    // me.validForm($('#j_form_setName'));
                    $('#j_con_content_title').click(); 
                    me.showSortable();
                    me.closeHover();
                });
            },
            up: function(dom){
              var me = this;
              $(dom).parent('div').find('input[data_id=imgFile]').change(function(){
                    var param={};
                    param.inputName='file';
                    param._this=this;
                    param.method='POST';
                    me.imgFileRequest(param,dom);
              });
            },
            imgFileRequest:function(param,dom){
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                    //console.log(XMLHttpReq);
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                
                XMLHttpReq.open(param.method,imgFileUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            if(JSON.parse(XMLHttpReq.responseText).callResult){
                                $(param._this).attr('url',JSON.parse(XMLHttpReq.responseText).oss_path);
                                $(dom).parent('div').find('.j_maId').find('img').attr("src",JSON.parse(XMLHttpReq.responseText).oss_path);
                                /*$(dom).parent('div').find('.j_maId').css({
                                  backgroundImage: 'url('+JSON.parse(XMLHttpReq.responseText).oss_path+') no-repeat',
                                  backgroundSize: '100% 100%'
                                });*/
                                $(dom).attr('data-url',JSON.parse(XMLHttpReq.responseText).oss_path);
                                var the = $(dom).parent().parent().parent('.addBanerDom');
                                if(the.length){  // banner
                                  var theData = the.attr('data-list');
                                  var theObj = JSON.parse(theData.replace(/\'/g,"\""));
                                  theObj.image = JSON.parse(XMLHttpReq.responseText).oss_path;
                                  var theNew = JSON.stringify(theObj).replace(/\"/g,"'");
                                  the.attr('data-list',theNew);
                                }
                            }else{
                                JSON.parse(XMLHttpReq.responseText).code=0;
                                //alert(JSON.parse(XMLHttpReq.responseText).error_response.msg);
                            }     
                        }
                    }
                }
            },
            validForm: function(dom){
                dom.validate({
                    rules:{
                        page_name: {
                            maxlength: 4
                        },
                        order: {
                            number: true,
                            range: [0,99]
                        },
                        name: {
                            maxlength: 10
                        },
                        showLink: {
                            url: true
                        }
                    }
                });
            },
            _container: $('#j_con_content'),
            _render: function(view,data) {
                var html = $rk.tplRender(dot, view.html(), data);
                this._container.html(html);
            },
            _bind : function(){
                var that = this;
                this._container.off("click")
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                   if(dataOp=="setName"){
                       that.setName($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="cancleTips"){
                       that.cancleTips($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="showGoods"){
                      that.showGoods($(this));
                      e.preventDefault();
                   }
                   if(dataOp=="removeList"){
                       that.removeList($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="showConmmonListTips"){
                       that.showConmmonListTips($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="selShowRedioList"){
                       that.selShowRedioList($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="bannerRedioList"){
                       that.bannerRedioList($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="showTeams"){
                      that.showTeams($(this));
                      e.preventDefault();
                   }
                   if(dataOp=="showTeamsListTips"){
                       that.showTeamsListTips($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="showBanner"){
                      that.showBanner($(this));
                      e.preventDefault();
                   }
                   if(dataOp=="showBannerListTips"){
                       that.showBannerListTips($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="removeAddMemu"){
                       that.removeAddMemu($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="addBanerMenu"){
                       that.addBanerMenu($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="showTexttitle"){
                      that.showTexttitle($(this));
                      e.preventDefault();
                   }
                   if(dataOp=="showTexttitleListTips"){
                       that.showTexttitleListTips($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="saveTips_title"){
                       that.saveTips_title($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="saveTips_goods"){
                       that.saveTips_goods($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="saveTips_teams"){
                       that.saveTips_teams($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="saveTips_banners"){
                       that.saveTips_banners($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="submit"){
                       that.submit($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="cancel"){
                       that.cancel($(this));
                       e.preventDefault();
                   }
                });
            },
            closeHover: function(){
                var len = $('#j_con_content_listBody span.close').length;
                $('#j_con_content_listBody span.close').each(function(index, el) {
                    if (index == len - 1)
                    {
                       $(this).removeClass('hide');
                    }else{
                       $(this).addClass('hide');
                       $(this).closest('.j_mark').on("mouseover mouseout",function(event){
                         if(event.type == "mouseover"){
                           $(this).find('span.close').removeClass('hide');
                          }else if(event.type == "mouseout"){
                           $(this).find('span.close').addClass('hide');
                          }
                       });
                    }
                });
            },
            hovers: function(that){
              //console.log(that);
              that.closest('.j_mark').off("mouseover mouseout").find('span.close').removeClass('hide');
              that.closest('.j_mark').siblings().find('span.close').addClass('hide');
              that.closest('.j_mark').siblings().on("mouseover mouseout",function(event){
                if(event.type == "mouseover"){
                  $(this).find('span.close').removeClass('hide');
                 }else if(event.type == "mouseout"){
                  $(this).find('span.close').addClass('hide');
                 }
              });
            },
            saveTips_title: function (that) {
              if(!$('#page_name').val()){
                alert('请输入页面名称！');
                return
              }
              if(!$('#order').val()){
                alert('请输入页面顺序！');
                return
              }
              if($('#j_form_setName').valid()){
                var me = this;
                var str = $('#page_name').val();
                var order = $('#order').val();
                $('#j_pageName').attr('data-order',order);
                $('#j_pageName').text(str);
                $('#j_page_name').val(str);
                $('#j_order').val(order);
                $('#j_con_content_uiTips').addClass('hide');

                // 保存数据 data_obj
                //data_obj.page_name = str;
                //data_obj.order = $('#j_pageName').attr('data-order');
              }
            },
            saveTips_goods: function(that){
              // 获取所有数据  拼成json字符 点击确定  改变原有的已改变的值  保存在当前listdom 上  当前listdom重新按新生成数据渲染 
              var old = $('#j_selgs').attr('data-json');
              var oldObj = JSON.parse(old.replace(/\'/g,"\""));
              var newS = that.parents('#j_con_content_setNameTips').find('input[type="radio"]:checked').attr('data-rid');
              var newI = that.parents('#j_con_content_setNameTips').find('.j_maId').attr('data-url');
              var newG = that.parents('#j_con_content_setNameTips').find('.showsPic img').attr('src');
              oldObj.style = newS;
              //console.log(newG);
              if(newG=='http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_showsPic.png'){
                alert('请选择商品！'); return;
              }
              if(newS == 1){
                if(!newI){alert("请上传背景图片！"); return }else{
                  oldObj.image = newI;
                }
              }else{
                  oldObj.image = oldObj.image;
              }
              oldObj.style = + oldObj.style;
              //console.log(oldObj);
              var id = that.parents('#j_con_content_setNameTips').attr('data-parentid');
              $('#'+id).find('.showlist').find('dt img').attr({
                src: oldObj.image,
                alt: oldObj.name
              });
              $('#'+id).find('.showlist').find('.j_goods_name').text(oldObj.name);
              $('#'+id).find('.showlist').find('.j_goods_intro').text(oldObj.intro);
              $('#'+id).find('.showlist').find('.sthCount samp').text(oldObj.salenum);
              $('#'+id).find('.showlist').find('.price samp').text(oldObj.price);
              $('#'+id).find('.showlist').find('.oldPrice').text(oldObj.price_old);

              var newSave = JSON.stringify(oldObj).replace(/\"/g,"'");
              $('#'+id).attr('data-save',newSave);
              $('#j_con_content_uiTips').addClass('hide');
            },
            saveTips_teams: function(that){
              var old = $('#j_selgs').attr('data-json');
              var oldObj = JSON.parse(old.replace(/\'/g,"\""));
              var id = that.parents('#j_con_content_setNameTips').attr('data-parentid');
              var newG = that.parents('#j_con_content_setNameTips').find('.showsPic img').attr('src');
              if(newG=='http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_showsPic.png'){
                alert('请选择商品！'); return;
              }
              $('#'+id).find('dt img').attr({
                src: oldObj.image,
                alt: oldObj.name
              });
              if(oldObj.staff=="undefined"){oldObj.staff = 0};
              $('#'+id).find('.j_goods_name').text(oldObj.name);
              $('#'+id).find('.j_goods_intro').text(oldObj.intro);
              $('#'+id).find('.price samp').text(oldObj.price);
              $('#'+id).find('.j_person').text('已有'+oldObj.staff+'人成团');
              $('#'+id).attr('data-save',old);
              $('#j_con_content_uiTips').addClass('hide');
            },
            saveTips_banners: function(that){
              var id = that.parents('#j_con_content_setNameTips').attr('data-parentid');
              var old = $('#'+id).attr('data-save');
              var oldObj = JSON.parse(old.replace(/\'/g,"\""));
              var listr=[],olstr=[],idarr = [],imgarr = [];

              oldObj.adlist.length = 0;

              $('#j_bannerTipsContent div.addBanerDom').each(function(index, item) {
                  var save = $(item).attr('data-list');
                  var saveObj = JSON.parse(save.replace(/\'/g,"\""));
                  oldObj.adlist.push(saveObj);
              });
              // 验证收集
              $.each(oldObj.adlist,function(index, el) {
                if(!el.id){idarr.push(0)}else{idarr.push(1)}
                if(el.image == 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/upload_icon2.png' || el.image == ""){imgarr.push(0)}else{imgarr.push(1)}
              });

              if($.inArray(0, idarr)!=-1){  //$.inArray(0, arr);  // 0--- have    -1----nohave
                alert('请选择商品！'); return;
              }
              if($.inArray(0, imgarr)!=-1){  //$.inArray(0, arr);  // 0--- have    -1----nohave
                alert('请上传图片！'); return;
              }
              //  渲染banner ul 和 ol
              $.each(oldObj.adlist,function(index, el) {
                if(el.image != 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/upload_icon2.png'){
                  listr.push('<li data-url="'+el.url+'" data-rid="'+el.id+'"><img src="'+el.image+'" alt=""></li>');
                  olstr.push('<li></li>');
                }
              });
              $('#'+id).find('.banner_over ul').html(listr.join(''));
              if(oldObj.adlist.length>1){$('#'+id).find('ol#j_bannerOl').html(olstr.join(''));}else{$('#'+id).find('ol#j_bannerOl').html('')}
              // 收集数据
              var newSave = JSON.stringify(oldObj).replace(/\"/g,"'");
              $('#'+id).attr('data-save',newSave);
              $('#j_con_content_uiTips').addClass('hide'); 
            },
            saveTips_text: function (that,btnDom) {
                var val = btnDom.parents('#j_con_content_setNameTips').find('#titleName').val();
                if(!val){
                  alert('请输入文字标题！');
                  return
                }
                var dom = $('#'+that).find('div#j_titleName');
                var me = this;
                var id = $('#titleName').attr('data-rid');
                //if(id){id = id}else{id = 0}
                if($('#j_form_setTitle').valid()){
                  var str = $('#titleName').val();
                  dom.html(str);
                  $('#j_con_content_uiTips').addClass('hide');
                  //保存数据
                  var data_json = "{'type': 'txt','style': 0,'name': '"+str+"'}";
                  $('#'+that).attr("data-save",data_json);
                }
                $('#j_con_content_uiTips').addClass('hide');
            },
            setName: function (that) {
              var order_val = $('#j_order').val();
              var orderVal;
              if(order_val){
                orderVal = +order_val;
              }else{
                orderVal = "";
              }
              var data= {
                            "page_name": $('#j_page_name').val(),
                            "order": orderVal
                          };
              var html = $rk.tplRender(dot, $('#j_view_content_setNameTips').html(), data);
              $('#j_con_content_setNameTips').empty().html(html);
              this.showTipsDom('j_con_content_title');
              this.validForm($('#j_form_setName'));
            },
            showGoods: function (that) {
                this._index++;
                //var dd = $('#setType').val();
                var ids = that.attr('id');
                var str = '#j_view_content_'+ids+'_0';  // + dd
                var str2 = '#j_view_content_'+ids;
                var dom = 'j_gooDomds'+this._index;
                var data = goods_data0;
                var html2 = $rk.tplRender(dot, $(str2).html(), data);
                $('#j_con_content_listBody').append(html2);
                var lasts = $('#j_con_content_listBody div.j_mark').last();
                lasts.attr('id','j_gooDomds'+this._index);
                var html = $rk.tplRender(dot, $(str).html(), data);
                $('#'+dom).html(html);
                var d = 'j_gooDomds'+this._index;
              
                this.showConmmonListTips($('#'+d).find('dl'));
                this.showSortable();
            },
            cancleTips: function (that) {
                $('#j_con_content_uiTips').addClass('hide');
            },
            removeList: function (that) {
                var dataId = that.attr("data-id");
                var self = this;
                var dialog = new Dialog({
                    title: '删除商品',
                    content: '<p class="ui-msg ui-msg-warning">你确定要执行删除操作吗?</p>',
                    confirmFun: function (dialog,button) {
                        if(!($('#j_con_content_uiTips').hasClass("hide"))){
                            $('#j_con_content_uiTips').addClass('hide');
                        }
                        that.closest(".removeDom").remove();
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000)
                    }
                });
                dialog.open();
            },
            showSortable: function(){
                var me = this;
                $('.phonebodycont').sortable({
                    placeholderTag: 'div',
                    items : '.j_mark',
                    dropEnds : function (dom) {
                      setTimeout(function  () {
                        var id = $('#j_con_content_setNameTips').attr('data-parentid');
                        //console.log(dom.attr('id'),id);
                        if(dom.attr('id')==id){
                          me.showTipsDom(dom.attr('id'));
                        }
                      })
                    }
                })
            },
            showConmmonListTips: function (that) {
                var goodsId = that.closest('.removeDom').attr('id');
                var tips_parId = that.closest('.j_mark').attr('id');
                var me = this;
                me.hovers(that);

                var tipdata = that.closest('.j_mark').attr('data-save');
                var data = JSON.parse(tipdata.replace(/\'/g,"\""));
                var style = data.style;
                var html = $rk.tplRender(dot, $('#j_view_content_goodsTips').html(), data);
                $('#j_con_content_setNameTips').empty().html(html);
                $('#j_con_content_setNameTips').attr('data-parentId',tips_parId);
                $('#j_formradio input[name="setname"]').each(function(index, el) {
                  $(el).checked = false;
                  if($(el).attr('data-rid')==style){
                    this.checked = true;
                    if(this.value=='一般陈列'){
                        $('#specailBg').addClass('hide');
                    }else{
                        $('#specailBg').removeClass('hide');
                        $('#specailBg').find('#myId').css({
                          background: 'url('+data.image+') no-repeat',
                          backgroundSize:'100% 100%'
                        });
                    }
                  }
                });
                var image;
                if(data.image == 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png'){
                  image = 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_showsPic.png';
                }else{
                  image = data.image;
                }
                $('.showsPic').html('<img src='+image+' alt=""/>');
                var data_json =  JSON.stringify(data).replace(/\"/g,"'");
                $('#j_selgs').attr('data-json',data_json);

                this.showTipsDom(goodsId);
                me.up("#myId"); 

                $('#j_formradio input[name="setname"]').change(function(){
                    if(this.value=='一般陈列'){
                        $('#specailBg').addClass('hide');
                        $('#setType').attr('value',0);
                        me.changeRadio(goodsId,data,tips_parId);
                    }else{
                        $('#specailBg').removeClass('hide');
                        $('#setType').attr('value',1);
                         me.changeRadio(goodsId,data,tips_parId);
                    }
                });
            },
            showTipsDom: function (dom){
                var doms = $('#'+dom);
                var dom_top = doms.offset().top;
                // console.log(dom_top, doms[0].getBoundingClientRect().top)
                if(dom_top!=0){
                  var h = dom_top - 250;
                }else{
                  h = panel_top
                }
                panel_top = h;
                $('#j_con_content_uiTips').css({top: h});
                if($('#j_con_content_uiTips').hasClass("hide")){$('#j_con_content_uiTips').removeClass('hide');}
            },
            changeRadio: function(dom,data,that){
                var dd = $('#setType').val();
                var str = '#j_view_content_j_goods_'+dd;
                var html = $rk.tplRender(dot, $(str).html(), data);
                $('#'+dom).empty().html(html);
                
                $('#'+that).off("mouseover mouseout").find('span.close').removeClass('hide');
            },
            selShowRedioList: function(that){
              var _type = that.attr('data-type');  // 区分类型 
              var me = this;
              var option = {
                  url : getGoodsListUrl,
                  contentType : 'application/json',
                  data : JSON.stringify({"page": 1,"page_size": 10}),
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                     if(json.error_response){alert(json.error_response.msg); return}
                     var str = '';
                     $.each(json.hfive_weidian_goods_list_response.list,function(index, el) {
                         el.url = 'http://172.16.13.180:1221/weMall/mobile/details.html?id='+el.product_id;
                         el.type = _type;
                         el.product_id =  + el.product_id;
                         var json_str = JSON.stringify(el).replace(/\"/g,"'");
                         json_str = json_str.replace("product_id","id");
                         json_str = json_str.replace("original_price","price_old");
                         var jsonStr = json_str.replace("month_sale","salenum");
                         //console.log(json_str);
                         str+='<div class="radio">'+
                              '<label for="j_radio_'+index+'">'+
                              '<input type="hidden" id="j_sel_id" value="'+el.product_id+'"/>'+
                              '<input type="hidden" id="j_sel_url" value="'+el.url+'"/>'+
                              '<input type="hidden" id="j_sel_image" value="'+el.image+'"/>'+
                              '<input name="form-field-radio" data-json="'+jsonStr+'" type="radio" id="j_radio_'+index+'" value="'+el.name+'"><span class="lbl">'+
                               el.name+'</span></label></div>';
                     });
                     var dialog = new Dialog({
                         title: '选择商品',
                         width: 500,
                         height: 520,
                         content: '<div class="contain"><div class="cont">'+str+'</div><input type="hidden" name="page" id="setPage" value="1"><div class="ui-paging" id="j_con_page"></div></div>',
                         beforeShow: function() {
                            var d = json;
                            var total = d.total;
                            var curpage = d.page;
                            if(total < 1) return;
                            $('#j_con_page').pagination(total, {
                                items_per_page: 10,
                                current_page: curpage - 1,
                                num_edge_entries: 2,
                                callback: function(index, panel) {
                                    var pageNum = index + 1;
                                    $("#setPage").val(pageNum);
                                    var option = {
                                        url : getGoodsListUrl,
                                        contentType : 'application/json',
                                        data : JSON.stringify({"page": pageNum,"page_size": 10}),
                                        dataType: 'json',
                                        type: 'post',
                                        success: function(){
                                            if(json.error_response){alert(json.error_response.msg); return}
                                            var strs = '';
                                             $.each(json.hfive_weidian_goods_list_response.list,function(index, el) {
                                                 el.url = 'http://172.16.13.180:1221/weMall/mobile/details.html?id='+el.product_id;
                                                 el.type = "goods";
                                                 el.product_id =  + el.product_id;
                                                 var json_str = JSON.stringify(el).replace(/\"/g,"'");
                                                 json_str = json_str.replace("product_id","id");
                                                 json_str = json_str.replace("original_price","price_old");
                                                 var jsonStr = json_str.replace("month_sale","salenum");
                                                 //console.log(json_str);
                                                 strs+='<div class="radio">'+
                                                      '<label for="j_radio_'+index+'">'+
                                                      '<input type="hidden" id="j_sel_id" value="'+el.product_id+'"/>'+
                                                      '<input type="hidden" id="j_sel_url" value="'+el.url+'"/>'+
                                                      '<input type="hidden" id="j_sel_image" value="'+el.image+'"/>'+
                                                      '<input name="form-field-radio" data-json="'+jsonStr+'" type="radio" id="j_radio_'+index+'" value="'+el.name+'"><span class="lbl">'+
                                                       el.name+'</span></label></div>';
                                             }); 
                                            $('.cont').html(strs);
                                        }
                                    };
                                    new Ajax(option);
                                }
                            });
                            $('#j_con_page').show();
                         },
                         confirmFun: function (dialog,button) {
                             me.selShowRequest(button,that);
                             window.setTimeout(function () {
                                 dialog.close();
                             }, 1000)
                         }
                     });
                     dialog.open(); 
                  }
              }
              new Ajax(option);
            },
            selShowRequest: function(button,that){
              var dom;
              var me = this;
              $.each($('.cont input'),function(index,item){
                if(this.checked){
                  var imgUrl = $(this).parent().find('#j_sel_image').val();
                  that.find('img').attr('src',imgUrl);
                  that.attr("data-json",$(this).attr('data-json'));
                }
              });
            },
            bannerRedioList: function(that){
              var me = this;
              var option = {
                  url : getGoodsListUrl,
                  contentType : 'application/json',
                  data : JSON.stringify({"page": 1,"page_size": 10}),
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                    if(json.error_response){alert(json.error_response.msg); return}
                     var str = '';
                     $.each(json.hfive_weidian_goods_list_response.list,function(index, el) {
                          el.url = 'http://172.16.13.180:1221/weMall/mobile/details.html?id='+el.product_id;
                         //var jsonStr = JSON.stringify(el).replace(/\"/g,"'");
                         str+='<div class="radio">'+
                              '<label for="j_radio_'+index+'">'+
                              '<input type="hidden" id="j_sel_id" value="'+el.product_id+'"/>'+
                              '<input type="hidden" id="j_sel_url" value="'+el.url+'"/>'+
                              '<input type="hidden" id="j_sel_image" value="'+el.image+'"/>'+
                              '<input name="form-field-radio" data-json="" type="radio" id="j_radio_'+index+'" value="'+el.name+'"><span class="lbl">'+
                               el.name+'</span></label></div>';
                     });
                     var dialog = new Dialog({
                         title: '选择商品',
                         width: 500,
                         height: 520,
                         content: '<div class="contain"><div class="cont">'+str+'</div><input type="hidden" name="page" id="setPage" value="1"><div class="ui-paging" id="j_con_page"></div></div>',
                         beforeShow: function() {
                            var d = json;
                            var total = d.total;
                            var curpage = d.page;
                            if(total < 1) return;
                            $('#j_con_page').pagination(total, {
                                items_per_page: 10,
                                current_page: curpage - 1,
                                num_edge_entries: 2,
                                callback: function(index, panel) {
                                    var pageNum = index + 1;
                                    $("#setPage").val(pageNum);
                                    var option = {
                                        url : getGoodsListUrl,
                                        contentType : 'application/json',
                                        data : JSON.stringify({"page": pageNum,"page_size": 10}),
                                        dataType: 'json',
                                        type: 'post',
                                        success: function(){
                                            if(json.error_response){alert(json.error_response.msg); return}
                                            var strs = '';
                                             $.each(json.hfive_weidian_goods_list_response.list,function(index, el) {
                                                 var jsonStr = JSON.stringify(el).replace(/\"/g,"'");
                                                 strs+='<div class="radio">'+
                                                      '<label for="j_radio_'+index+'">'+
                                                      '<input type="hidden" id="j_sel_id" value="'+el.product_id+'"/>'+
                                                      '<input type="hidden" id="j_sel_url" value="'+el.url+'"/>'+
                                                      '<input type="hidden" id="j_sel_image" value="'+el.image+'"/>'+
                                                      '<input name="form-field-radio" data-json="" type="radio" id="j_radio_'+index+'" value="'+el.name+'"><span class="lbl">'+
                                                       el.name+'</span></label></div>';
                                             }); 
                                            $('.cont').html(strs);
                                        }
                                    };
                                    new Ajax(option);
                                }
                            });
                            $('#j_con_page').show();
                         },
                         confirmFun: function (dialog,button) {
                             me.bannerRequest(button,that);
                             window.setTimeout(function () {
                                 dialog.close();
                             }, 1000)
                         }
                     });
                     dialog.open(); 
                  }
              };
              new Ajax(option);
            },
            bannerRequest: function(button,that){
              var dom;
              var me = this;
              $.each($('.cont input'),function(index,item){
                if(this.checked){
                  var imgUrl = $(this).parent().find('#j_sel_image').val();
                  var Url = $(this).parent().find('#j_sel_url').val();
                  var idUrl = $(this).parent().find('#j_sel_id').val();
                  that.find('img').attr('src',imgUrl);
                  var inputUrl = that.next('#selShowsOpt2').find('input');
                  inputUrl.val(Url);
                  var the = that.parents('.addBanerDom');
                  var theData = the.attr('data-list');
                  var theObj = JSON.parse(theData.replace(/\'/g,"\""));
                  theObj.url = Url;
                  theObj.id = + idUrl;  // set id
                  that.parent().find('input#j_banner_sel_url').val(Url);
                  var theNew = JSON.stringify(theObj).replace(/\"/g,"'");
                  the.attr('data-list',theNew);
                }
              });
            },
            showTeams: function (that) {
                this._index++;
                var ids = that.attr('id');
                var str = '#j_view_content_'+ids;
                var data = group_data;
                var html = $rk.tplRender(dot, $(str).html(), data);
                $('#j_con_content_listBody').append(html);

                var lasts = $('#j_con_content_listBody div.j_mark').last();
                var d = 'j_teams'+this._index;
                lasts.attr('id',d);
                this.showTeamsListTips($('#'+d).find('dl'));
                this.showSortable();
            },
            showTeamsListTips: function (that) {
                var me = this;
                me.hovers(that);
                var goodsId = that.closest('.removeDom').attr('id');
                var tips_parId = that.closest('.j_mark').attr('id');

                var tipdata = that.closest('.j_mark').attr('data-save');
                var data = JSON.parse(tipdata.replace(/\'/g,"\""));

                var html = $rk.tplRender(dot, $('#j_view_content_teamsTips').html(), data);
                $('#j_con_content_setNameTips').empty().html(html);
                $('#j_con_content_setNameTips').attr('data-parentId',tips_parId);
                $('.showsPic').html('<img src='+data.image+' alt=""/>');
                var data_json =  JSON.stringify(data).replace(/\"/g,"'");
                $('#j_selgs').attr('data-json',data_json);
                if(data.image == 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png'){
                  image = 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_showsPic.png';
                }else{
                  image = data.image;
                }
                $('.showsPic').html('<img src='+image+' alt=""/>');
                
                this.showTipsDom(goodsId);
            },
            showBanner: function (that) {
                this._index++;
                var ids = that.attr('id');
                var str = '#j_view_content_'+ids;
                var data = banner_data;
                var html = $rk.tplRender(dot, $(str).html(), data);
                $('#j_con_content_listBody').append(html);

                var lasts = $('#j_con_content_listBody div.j_mark').last();
                var d = 'j_banner'+this._index;
                lasts.attr('id',d);
                this.showBannerListTips($('#'+d));
                this.showSortable();
            },
            showBannerListTips: function (that) {
                var me = this;
                me.hovers(that);
                var tips_parId = that.closest('.j_mark').attr('id');

                var tipdata = that.closest('.j_mark').attr('data-save');  //  content 里的数据 {'type': 'ads','id':'','adlist': [{'id':'','url':'','image':'http://172.16.13.135:1000/h5plus/img/weMall/shelf/upload_icon2.png'}]}
                var data = JSON.parse(tipdata.replace(/\'/g,"\""));
                var goodsId = that.closest('.removeDom').attr('id');
                var html = $rk.tplRender(dot, $('#j_view_content_bannerTips_edit').html(), data);
                $('#j_con_content_setNameTips').html(html);
                $('#j_con_content_setNameTips').attr('data-parentId',tips_parId);
                this.showTipsDom(goodsId);

                $('select').each(function(index, el) {
                    $(el).change(function(event) {
                      if(this.value=='商品'){
                          $(this).next('#selShowsOpt').find('#selShowsOpt2').addClass('hide');
                          $(this).next('#selShowsOpt').find('#selShowsOpt1').removeClass('hide');
                      }else{
                          $(this).next('#selShowsOpt').find('#selShowsOpt1').addClass('hide');
                          $(this).next('#selShowsOpt').find('#selShowsOpt2').removeClass('hide');
                          var urlInput = $(this).next('#selShowsOpt').find('#selShowsOpt2 input');
                          
                          $(urlInput).blur(function(event) {
                            var urlVal = $(this).val();
                            //if(!urlVal){alert("请输入链接！");return}
                            var the = $(this).parents('.addBanerDom');  //'.addBanerDom'
                            var theData = the.attr('data-list');
                            var theObj = JSON.parse(theData.replace(/\'/g,"\""));
                            theObj.url = urlVal;
                            var theNew = JSON.stringify(theObj).replace(/\"/g,"'");
                            the.attr('data-list',theNew);
                          });
                      }
                    });
                });

                $('#j_bannerTipsContent div.j_maId').each(function(index, el) {
                  var dom = $(el).attr('id');
                  me.up("#"+dom); 
                });

                var len = $('#j_bannerTipsContent .addBanerDom').length;
                if(len>1){
                  $('#j_bannerTipsContent .addBanerDom').hover(function() {
                      $(this).find('span.close').removeClass('hide');
                  }, function() {
                     $(this).find('span.close').addClass('hide');
                  });
                }

                me.validForm($('#j_form_setUrl'));
            },
            addBanerMenu: function (that) {
                var me = this;
                var data = {};
                var html = $rk.tplRender(dot, $('#j_view_content_addBannerTips').html(), data);
                $('#j_bannerTipsContent').append(html);

                me._idx++;
                var lasts = $('#j_bannerTipsContent div.j_maId').last();
                lasts.attr('id','myIds'+me._idx);
                var d = '#myIds'+me._idx;
                me.up(d);

                $('select').each(function(index, el) {
                    $(el).change(function(event) {
                      if(this.value=='商品'){
                          $(this).next('#selShowsOpt').find('#selShowsOpt2').addClass('hide');
                          $(this).next('#selShowsOpt').find('#selShowsOpt1').removeClass('hide');
                      }else{
                          $(this).next('#selShowsOpt').find('#selShowsOpt1').addClass('hide');
                          $(this).next('#selShowsOpt').find('#selShowsOpt2').removeClass('hide');
                          
                          var urlInput = $(this).next('#selShowsOpt').find('#selShowsOpt2 input');
                          $(urlInput).blur(function(event) {
                            var urlVal = $(this).val();
                            //if(!urlVal){alert("请输入链接！");return}
                            var the = $(this).parents('.addBanerDom');  //'.addBanerDom'
                            var theData = the.attr('data-list');
                            var theObj = JSON.parse(theData.replace(/\'/g,"\""));
                            theObj.url = urlVal;
                            var theNew = JSON.stringify(theObj).replace(/\"/g,"'");
                            the.attr('data-list',theNew);
                          });
                      }
                    });
                });

                var len = $('#j_bannerTipsContent .addBanerDom').length;
                if(len>1){
                  $('#j_bannerTipsContent .addBanerDom').hover(function() {
                      $(this).find('span.close').removeClass('hide');
                  }, function() {
                     $(this).find('span.close').addClass('hide');
                  });
                }

                me.validForm($('#j_form_setUrl'));
            },
            removeAddMemu: function(that){
                var self = this;
                var dialog = new Dialog({
                    title: '删除添加项',
                    content: '<p class="ui-msg ui-msg-warning">你确定要执行删除操作吗?</p>',
                    confirmFun: function (dialog,button) {
                        that.closest(".removeDom").remove();
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000);
                        var len = $('#j_bannerTipsContent .addBanerDom').length;
                        if(len>1){
                          $('#j_bannerTipsContent .addBanerDom').hover(function() {
                              $(this).find('span.close').removeClass('hide');
                          }, function() {
                             $(this).find('span.close').addClass('hide');
                          });
                        }else{
                          $('#j_bannerTipsContent .addBanerDom').unbind("mouseenter").unbind("mouseleave");
                        }
                    }
                });
                dialog.open();
            },
            showTexttitle: function (that) {
                this._index++;
                var ids = that.attr('id');
                var str = '#j_view_content_'+ids;
                var data = txt_data;
                var html = $rk.tplRender(dot, $(str).html(), data);
                $('#j_con_content_listBody').append(html);

                var lasts = $('#j_con_content_listBody div.j_mark').last();
                var d = 'j_texttitle'+this._index;
                lasts.attr('id',d);
                this.showTexttitleListTips($('#'+d));
                this.showSortable();
            },
            showTexttitleListTips:  function (that) {
                var me = this;
                var tips_parId = that.closest('.j_mark').attr('id');
                me.hovers(that);

                var tipdata = that.closest('.j_mark').attr('data-save');
                var data = JSON.parse(tipdata.replace(/\'/g,"\""));

                var goodsId = that.closest('.removeDom').attr('id');
                var html = $rk.tplRender(dot, $('#j_view_content_texttitleTips').html(),data);
                $('#j_con_content_setNameTips').empty().html(html);
                
                $('#j_con_content_setNameTips').attr('data-parentId',tips_parId);
                
                var s = $('#j_con_content_setNameTips').attr('data-parentId'); 
                $('#saveTips_text').click(function(event) {
                  me.saveTips_text(s,$(this));
                });
                me.showTipsDom(goodsId);
                me.validForm($('#j_form_setTitle'));
            },
            formSend: function(){
                var me = this;
                var option = {
                    url : DetailUrl,
                    data: JSON.stringify({page_id:+ page_id}),
                    contentType : 'application/json',
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        if(json.hfive_weidian_page_get_response){
                          var infos = JSON.parse(json.hfive_weidian_page_get_response.page_info);
                          json.hfive_weidian_page_get_response.page_info = infos;
                          $rk.listener.trigger('main', 'success', json);
                        }else{
                          alert(json.error_response.msg);
                        }
                    }
                }
                new Ajax(option);
            },
            loading: function(text) {
                this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
            },
            submit: function(that) {
               var data_obj = {
                  "store_id": + store_id,
                  "page_id": + page_id,
                  "page_info":[]
               };
               var testArr = [];
               var goodsD = "{'type': 'goods','style': 0,'salenum':'X','name': '商品名称','intro': '商品简介','price': '价格','price_old': '原价','image': 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png'}",
                   groups = "{'type': 'group','id': '','staff': 'X','name': '商品名称','intro': '商品简介','price': '价格','url': '','image': 'http://172.16.13.135:1000/h5plus/img/weMall/shelf/bg_default1.png'}",
                   banners = "{'type': 'ads','adlist': [{'id':'','url':'','image':'http://172.16.13.135:1000/h5plus/img/weMall/shelf/upload_icon2.png'}]}",
                   txt = "{'type': 'txt','style': 0,'name': ''}";
              
               if(!$('#j_page_name').val()){alert('请输入页面名称！'); return}
               if(!$('#j_order').val()){alert('请输入页面顺序！'); return}
               data_obj.page_name = $('#j_pageName').text();
               data_obj.order = +$('#j_pageName').attr('data-order');
               var len = $('#j_con_content_listBody div.j_mark').length;
               if(!len){alert("请添加组件数据！");return;}
               
               $('#j_con_content_listBody div.j_mark').each(function(index, item) {
                   var save = $(item).attr('data-save');
                   if(!save){alert('请完善数据！')}
                   if(save == goodsD){
                    testArr.push(0);
                   }else if(save == groups){
                    testArr.push(1);
                   }else if(save == banners){
                    testArr.push(2);
                   }else if(save == txt){
                    testArr.push(3);
                   }
               });
               var g = $.inArray(0,testArr);
               var p = $.inArray(1,testArr);
               var b = $.inArray(2,testArr);
               var t = $.inArray(3,testArr);
               if(g != -1){alert('请补全商品信息！');return};
               if(p != -1){alert('请补全组团购信息！');return};
               if(b != -1){alert('请补全广告栏信息！');return};
               if(t != -1){alert('请补全文字标题信息！');return};
                
              $('#j_con_content_listBody div.j_mark').each(function(index, item) {
                var save = $(item).attr('data-save');
                var Obj = JSON.parse(save.replace(/\'/g,"\""));
                data_obj.page_info.push(Obj);
              });

             data_obj.page_info = JSON.stringify(data_obj.page_info);
             var sdata = JSON.stringify(data_obj);
             //console.log(sdata);
             var submitUrl;
             if(isAdd){submitUrl = addUrl;}else{submitUrl = UpdateUrl;}
             var option = {
                 url : submitUrl,
                 data: sdata,
                 contentType : 'application/json',
                 dataType: 'json',
                 type: 'post',
                 success: function(json) {
                  //console.log(json);
                   if(json.error_response){
                    alert(json.error_response.msg);
                   }else{
                     window.location.href = 'list.html?id=' +id;
                   }
                 }
             }
            new Ajax(option);
            },
            cancel: function(that) {
              window.location.href = 'list.html?id=' +id;
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});