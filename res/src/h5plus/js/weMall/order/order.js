/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-20 14:26:54
*/
seajs.use(['Ajax','dot','tips2','migrate','bootstrap','jqui','Dialog','uniform','bootstrap_fileupload','photon_select2','zclip','mousewheel','mCustomScrollbar','tagsinput'],
    function(Ajax,dot,Tips,migrate,bootstrap,jqui,Dialog,uniform,bootstrap_fileupload,photon_select2,zclip,mousewheel,mCustomScrollbar,tagsinput){ 

    var setModel = function() {

        var loginUrl = $$r.routers.data.link.loginUrl,
            brandListUrl = $$r.routers.data.link.brandListUrl,  // 品牌-列表
            brandAddUrl = $$r.routers.data.link.brandAddUrl,   // 品牌-新建
            uploadImgUrl = $$r.routers.data.link.uploadImgUrl, // 图片上传
            getBrandInfoUrl = $$r.routers.data.link.getBrandInfoUrl, // 品牌-获取单个详情
            editBrandUrl = $$r.routers.data.link.editBrandUrl, // 品牌-编辑
            deleteBrandUrl = $$r.routers.data.link.deleteBrandUrl, // 品牌-删除
            goodsListUrl = $$r.routers.data.link.goodsListUrl, // 商品列表
            deleteGoodsUrl = $$r.routers.data.link.deleteGoodsUrl, // 商品删除
            goodsClassUrl = $$r.routers.data.link.goodsClassUrl, // 商品类目
            getGoodsDetaiSetlUrl = $$r.routers.data.link.getGoodsDetaiSetlUrl, // 商品-获取单个详情
            attrListUrl = $$r.routers.data.link.attrListUrl, // 商品-获取商品规格下拉列表
            svaeSigleValVidUrl = $$r.routers.data.link.svaeSigleValVidUrl, // 每新添加一个规格值 获取vid
            svaeSigleValImageUrl = $$r.routers.data.link.svaeSigleValImageUrl, // 每新添加或改变一个规格值图片 
            goodsAddUrl = $$r.routers.data.link.goodsAddUrl,          // 添加商品 
            goodsEditUrl = $$r.routers.data.link.goodsEditUrl;          // 编辑商品 

        var finalData = {};

        var _dom;

        var idx = 0;

        var detailData = {};

        var flag = 0,
            pageLength=10,
            page_num=10,
            page_current=1,
            page_size,
            pageFlag=0,
            copyUrl='http://h5plus.net/static/comlibjs/third/zclip/ZeroClipboard.swf';

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    $rk.listener.trigger('brandList', 'change');
                });
                $rk.listener.on('brandList', 'change', function(e, json) {  // 品牌列表change
                    me.brandListRequest();
                });
                $rk.listener.on('brandList', 'success', function(e, json) {
                    me.render(json);
                    me.bind();
                });
                $rk.listener.on('tipsPhoton', 'success', function(e, json) {  // 提示
                    me.renderTipsPhoton(json);
                    me.bindTipsPhoton();
                });
            },
            container: $('#j_con_left'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_con_left_tml').html(), data||{});
                this.container.html(html);
            },
            bind: function() {
                var me=this;
                //enter确定
                /*$('body').keydown(function() {
                     if (event.keyCode == '13') {
                        if($('input[data_id=searchKey]:focus').length!=0){
                            $('button[data_id=searchAward]').click();
                        }else{
                            $('div[aria-hidden=false] .btn-primary').click();
                            return false;
                        }
                     }
                 });*/
                me.container.off("click")
                me.container.on("click",'[data-op]',function(e){
                    var dataOp=$(this).data('op');
                   if(dataOp=="showBrandModal1"){
                       me.showBrandModal1($(this));
                       e.preventDefault();
                   }
                });

                //获取品牌信息 品牌列表点击
                $('#jstree li a').unbind('click').click(function(){
                    pageFlag=0;
                    brand_id=$(this).parents('li').attr('id');

                    // 抓取品牌id
                    finalData.brand_id = brand_id ? brand_id - 0 : "";

                    $('#jstree li a').removeClass('jstree-clicked');
                    $(this).addClass('jstree-clicked');
                    var data={"brand_id": +brand_id};
                    $rk.listener.trigger('goodsCon', 'success',data);
                }).hover(function(){
                    $(this).addClass('jstree-hovered');
                },function(){
                    $(this).removeClass('jstree-hovered');
                });
                $('.panel-slider-arrow').off().on('click', function(){
                    console.log("点击隐藏左侧菜单：：");
                    $('.panel').toggleClass('retracted');
                    $('.main-content').toggleClass('contentRetracted');
                });
                //input清空
                $('a[data-dismiss=modal]').click(function(){
                    $('input[type=text]:not(#datepicker):not(#dateHistory)').val('');
                });
            },
            showBrandModal1: function(dom){
                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_brandModal').html(), {});
                $('#brandAddEdit').html(html);
                dom.attr('data-target','#brandAddEdit');

                //图片上传
                $('#brandAddEdit input[data_id=imgFile]').change(function(){
                    var param={};
                    param.inputName='file';
                    param._this=this;
                    param.method='POST';
                    me.imgFileRequest(param);
                });

                //新建品牌
                $('#brandAddEdit .btn-primary').unbind('click').click(function(){
                    var brand_name=$('#brandAddName').val();
                    var brand_url=$('#brandAddUrl').attr('url');
                    var brand_des=$('#brandAddDes').val();

                    if(!brand_name){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌名称不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    if(!brand_url){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌logo不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    if(!brand_des){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌简介不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    {
                        var data={'brand_name':brand_name,'brand_url':brand_url,brand_des:brand_des};
                        me.brandAddRequest(data);
                    }
               
                    $('#brandAddEdit a[data-dismiss=modal]').click();
                });
                
                $('#brandAddEdit a[data-dismiss=modal]').click(function(){
                    $('.modal-backdrop').remove();
                });

            },
            brandAddRequest:function(data){
                var option = {
                    url : brandAddUrl,
                    data: data,
                    dataType:'json',
                    type: 'post',
                    //contentType : 'application/json',
                    success: function(json) {
                        if(!json.error_response){
                            var successTip={};
                            successTip.code=1;
                            successTip.msg='创建新品牌成功！';
                            $rk.listener.trigger('tipsPhoton', 'success',successTip);
                            $rk.listener.trigger('brandList', 'change');
                            flag = 0;
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            brandListRequest:function(){

               var option = {
                    url : brandListUrl,
                    dataType:'json',
                    contentType : 'application/json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('brandList', 'success', json);
                        }else{
                            var errorCode=json.error_response.code;
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option); 
            },
            renderTipsPhoton:function(data){
                var html = $rk.tplRender(dot, $('#j_view_tipsPhoton').html(), data||{});
                $('#j_con_tipsPhoton').html(html);
            },
            bindTipsPhoton:function(){
                $('.alert').fadeOut(10000,function(){
                    $('.alert .close').click();
                });
            },
            // 图片上传
            imgFileRequest:function(param){
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                XMLHttpReq.open(param.method,uploadImgUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            if(JSON.parse(XMLHttpReq.responseText).callResult){
                                $(param._this).attr('url',JSON.parse(XMLHttpReq.responseText).oss_path);
                            }else{
                                JSON.parse(XMLHttpReq.responseText).code=0;
                                $rk.listener.trigger('tipsPhoton', 'success',JSON.parse(XMLHttpReq.responseText));
                            }     
                        }
                    }
                }
            }
        });
        

        var main = new $rk.VC({
            _init: function() {
                var me=this;
                $rk.listener.on('goodsCon', 'success', function(e, data) {  // 右侧渲染 绑定事件
                    var listData = $.extend({},data,{"page": 1,"page_size": 10});
                    me.brandInfoRequest(data);
                    me.awardListRequest(listData);
                    me.render();
                    me.bind();
                });
                $rk.listener.on('brandInfo', 'success', function(e, json) {   // 渲染品牌信息
                    me.renderbrandInfo(json);
                });
                $rk.listener.on('awardList', 'success', function(e, json) {  // 列表渲染 绑定事件
                    me.renderAwardList(json);
                    me.bindAwardList();
                });
                $rk.listener.on('tipsPhoton', 'success', function(e, json) {  // 提示
                    me.renderTipsPhoton(json);
                    me.bindTipsPhoton();
                });
                $rk.listener.on('goodsDetail', 'success', function(e, json) {   // 编辑商品
                    me.goodsAddEditOne(json);
                    me.bindGoodsAddEditOne();

                    detailData = json;
                    //me.goodsAddEditTwo(json);
                    //me.bindGoodsAddEditTwo();
                });
                $rk.listener.on('brandEdit', 'success', function(e, json) {   // 编辑品牌
                    me.bindBrandEdit(json);
                });
                $rk.listener.on('sigle', 'change', function(e, json) {   // 编辑商品
                    // 重新收集数据 // 重新渲染
                    me.collectSigleData();    
                });
            },
            container: $('#j_con_right'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_right').html(), data||{});
                this.container.html(html);
            },
            bind: function() {
                var me=this;
                me.container.off("click")
                me.container.on("click",'[data-op]',function(e){
                    var dataOp=$(this).data('op');
                    if(dataOp=="showBrandModal2"){  // 编辑品牌
                       me.showBrandModal2($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="removeBrand"){   // 删除品牌
                       me.removeBrand($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="addGood"){   //  添加商品
                       me.addGoodRequst($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="editGood"){   //  编辑商品---quest
                       me.editGoodRequest($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="removeGood"){   // 删除商品
                       me.removeGood($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="serchGood"){   // 搜索商品
                       me.serchGood($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="selGoodsClassList"){   // 选择类目进入第一编辑商品
                       me.selGoodsClassList($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="goodsImgAdd"){   // 第一编辑商品-----添加图片
                       me.goodsImgAdd($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="goodsImgRemove"){   // 第一编辑商品-----删除图片
                       me.goodsImgRemove($(this));
                       e.preventDefault();
                    }  
                    if(dataOp=="goodsNext"){   // 第一编辑商品-----点击下一步
                       me.goodsNext($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="calcel_goodsNext"){   // 第一编辑商品-----点击取消下一步
                       me.calcel_goodsNext($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="removeAttr"){  // 删除商品规格--大
                       me.removeAttr($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="removeSigle"){   // 删除单个规格值--小
                       me.removeSigle($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="addAttr"){  // 添加商品规格--大
                       me.addAttr($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="addSigle"){   // 添加单个规格值--小
                       me.addSigle($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="finishCancel"){  // 添加商品取消
                       me.finishCancel($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="finishAdd"){   // 添加商品完成
                       me.finishAdd($(this));
                       e.preventDefault();
                    }
                    if(dataOp=="crateTags"){   // 保存创建的tags
                       me.crateTags($(this));
                       e.preventDefault();
                    }
                    /*if(dataOp=="cancelTags"){   // 取消创建的tags
                       me.cancelTags($(this));
                       e.preventDefault();
                    }*/
                    
                });
            },
            imgUpLoad: function(dom){
              var me = this;
              dom.find('input[data_id=imgFile]').change(function(){
                    var param={};
                    param.inputName='file';
                    param._this=this;
                    param.method='POST';
                    me.imgFileRequest(param,dom);
              });
            },
            // 图片上传
            imgFileRequest:function(param,dom){
                
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                XMLHttpReq.open(param.method,uploadImgUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            if(JSON.parse(XMLHttpReq.responseText).callResult){
                                $(param._this).attr('url',JSON.parse(XMLHttpReq.responseText).oss_path);
                                if(dom.attr('class')=='sigle'){
                                   $(param._this).prev('div.sigle_img').find('img').attr('src',JSON.parse(XMLHttpReq.responseText).oss_path);
                                   // 渲染images
                                   var vid = $(param._this).attr('dataimg_vid');
                                   var option = {
                                       url: svaeSigleValImageUrl,
                                       data: JSON.stringify({"vid": + vid, "image": JSON.parse(XMLHttpReq.responseText).oss_path}),
                                       dataType: 'json',
                                       type: 'post',
                                       success: function(json) {
                                           if(json.error_response){
                                               alert(json.error_response.msg);
                                           }
                                       }
                                   };
                                     new Ajax(option);
                                }else{console.log('不是single')}
                            }else{
                                JSON.parse(XMLHttpReq.responseText).code=0;
                                $rk.listener.trigger('tipsPhoton', 'success',JSON.parse(XMLHttpReq.responseText));
                            }     
                        }
                    }
                }
            },
            // 添加图片
            goodsImgAdd: function(dom){
                var me = this;

                var flag = dom.attr('data_flag');
                if(flag!=0){return;}

                var lasts = $('#showImgs div[data_id=j_upLoad]').last();
                var idx = lasts.attr('data_index');
                idx ++;

                var html = '<div class="control-group row-fluid" data_id="j_upLoad">'   //  id="j_img2" data_index=2
                                +'<div class="span10">'
                                    +'<div class="fileupload fileupload-new" data-provides="fileupload">'
                                        +'<div class="input-append">'
                                           +' <div class="uneditable-input span3">'
                                                +'<i class="icon-file fileupload-exists"></i>'
                                                +'<span class="fileupload-preview"></span>'
                                            +'</div>'
                                            +'<span class="btn btn-file"><span class="fileupload-new">选择上传图片</span><span class="fileupload-exists">更改上传图片</span>'
                                            +'<input type="file" data_id="imgFile" id="brandAddUrl" url="" /></span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="span2">'
                                    +'<div class="control-label entypo">'
                                        +'<span class="circlePlus" data-original-title="circled-minus" data-op="goodsImgRemove">⊖</span>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                $('#showImgs').append(html);

                var _lasts = $('#showImgs div[data_id=j_upLoad]').last();
                _lasts.attr({
                    id: 'j_img'+idx,
                    data_index: idx
                });

                me.goodsImgCount();
            },
            // 删除图片
            goodsImgRemove: function(dom){
                var me = this;
                var item = dom.parents('div[data_id=j_upLoad]');
                item.remove();
                me.goodsImgCount();
            },
            // 判断当前图片数量 最多为6个
            goodsImgCount: function(){
                var len = $('#showImgs div[data_id=j_upLoad]').length;
                if(len>=6){
                    $('#showImgs').find('span[data-op=goodsImgAdd]').attr('data_flag',1);
                }else{
                    $('#showImgs').find('span[data-op=goodsImgAdd]').attr('data_flag',0);
                }
            },
            //编辑品牌
            showBrandModal2: function(dom){
                dom.attr('data-target','#brandAddEdit');
                var brand_id = dom.parent().find('input[type=hidden]').val();
                var data = {"brand_id": +brand_id};
                var option = {
                     url : getBrandInfoUrl,
                     dataType:'json',
                     //contentType : 'application/json',
                     type: 'post',
                     data: data,
                     success: function(json) {
                         if(!json.error_response){
                             $rk.listener.trigger('brandEdit', 'success', json);
                         }else{
                             var errorCode=json.error_response.code;
                             json.error_response.code=0;
                             $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                         } 
                     }
                 }
                 new Ajax(option);
            },
            bindBrandEdit: function(data){
                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_brandModal').html(), data.hfive_weidian_brand_get_response);
                $('#brandAddEdit').html(html);

                //图片上传
                $('#brandAddEdit input[data_id=imgFile]').change(function(){
                    var param={};
                    param.inputName='file';
                    param._this=this;
                    param.method='POST';
                    form.imgFileRequest(param);
                });

                $('#brandAddEdit .btn-primary').unbind('click').click(function(){
                    var brand_id = $('#brandAddId').val();
                    var brand_name=$('#brandAddName').val();
                    var brand_url=$('#brandAddUrl').attr('url');
                    var brand_des=$('#brandAddDes').val();

                    if(!brand_name){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌名称不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    if(!brand_url){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌logo不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    if(!brand_des){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='品牌简介不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else
                    {
                        var data={"brand_id": + brand_id,"brand_name": brand_name,"brand_url": brand_url,"brand_des": brand_des};
                        //console.log(data);
                        me.brandEditRequest(data);
                    }
                    $('#brandAddEdit a[data-dismiss=modal]').click();
                });
                
                $('#brandAddEdit a[data-dismiss=modal]').click(function(){
                    $('.modal-backdrop').remove();
                });
            },
            // 跟新品牌信息
            brandEditRequest:function(data){
                var option = {
                    url : editBrandUrl,
                    data: data,
                    dataType:'json',
                    type: 'post',
                    //contentType : 'application/json',
                    success: function(json) {
                        if(!json.error_response){
                            var successTip={};
                            successTip.code=1;
                            successTip.msg='编辑品牌成功！';
                            $rk.listener.trigger('tipsPhoton', 'success',successTip);
                            $rk.listener.trigger('brandList', 'change');
                            flag = 0;
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            // 品牌详细信息
            brandInfoRequest: function(data){
               var option = {
                    url : getBrandInfoUrl,
                    dataType:'json',
                    //contentType : 'application/json',
                    type: 'post',
                    data: data,
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('brandInfo', 'success', json);
                        }else{
                            var errorCode=json.error_response.code;
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option); 
            },
            renderbrandInfo: function(data){
                var html = $rk.tplRender(dot, $('#j_view_brandInfo').html(), data||{});
                this.container.find('div.brandInfoCon').html(html);
            },
            // 商品列表
            awardListRequest:function(data){
                var option = {
                    url : goodsListUrl,
                    data:data,
                    dataType:'json',
                    //contentType : 'application/json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('awardList', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);  
            },
            renderAwardList:function(data){
                //data.pageLength=data.hfive_weidian_goods_list_response.page_size;
                var html = $rk.tplRender(dot, $('#j_view_awardList').html(), data||{});
                this.container.find('div[data_id=awardList]').html(html);
            },
            bindAwardList:function(){
                var me=this;
                // 复制链接
                $('button[data_id=copyLink]').zclip({
                  path: 'http://h5plus.net/static/comlibjs/third/zclip/ZeroClipboard.swf',
                  beforeCopy: function(){},
                  copy: function(){
                      return "http://test.weidian.h5plus.net/wap/home.html?id=" + $(this).parent().find('input[type=hidden]').val();
                　},
                  afterCopy: function(){
                    var errorTip={};
                    errorTip.code=1;
                    errorTip.msg='复制链接成功！';
                    $rk.listener.trigger('tipsPhoton', 'success',errorTip);   
                  }
                });
                //分页
                page_size=$('.awardTable').attr('page_size');
                if(pageFlag==0){
                    $('ul[data_id=pageShow] li').not(':last').not(':first').remove();
                    if(page_size!=0){
                        me.pageShow(page_num,1,page_size);
                    }else{
                        $('.prev,.next').hide();
                    }
                    pageFlag=1;
                }
                $('ul[data_id=pageShow]').off().on('click','li:not(:first):not(:last):not(.active)',function(){
                    page_current=$(this).text()-0;
                    me.pageShow(page_num,page_current,page_size);
                    $('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
                    var data={'page':page_current,'page_size':pageLength,'brand_id': + brandId};
                    me.awardListRequest(data);
                });
                $('.next').unbind('click').click(function(){
                    page_current+=1;
                    if(page_current>page_size){
                        page_current=page_size;
                        $('ul[data_id=pageShow] li:last').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:last').removeClass('disabled');
                        var data={'page':page_current,'page_size':pageLength,'brand_id': + brandId};
                        me.awardListRequest(data);
                    }
                    me.pageShow(page_num,page_current,page_size);
                });
                $('.prev').unbind('click').click(function(){
                    page_current-=1;
                    if(page_current<1){
                        page_current=1;
                        $('ul[data_id=pageShow] li:first').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:first').removeClass('disabled');
                        var data={'page_num':page_current,'page_size':pageLength,'brand_id': + brandId};
                        me.awardListRequest(data);
                    }
                    me.pageShow(page_num,page_current,page_size);
                });
            },
            pageShow:function(page_num,page_current,page_size){
                var page_end,page_range,page_start=1;
                if(page_size<=page_num){
                    page_end=page_size;
                }else{
                    page_range=Math.ceil(page_num/2)-1;
                    page_end=page_current+page_range;
                    if(page_end>page_num){
                        if(page_end>page_size){
                            page_end=page_size;
                        }
                        page_start=page_end-page_num+1;          
                    }else{
                        page_end=page_num;
                        page_start=1;
                    }   
                }
                var page='';
                for(var i=page_start;i<=page_end;i++){
                        page+='<li><a href="javascript:void(0);">'+i+'</a></li>';
                }
                $('ul[data_id=pageShow] li').not(':last').not(':first').remove();
                $('ul[data_id=pageShow] li:first').after(page);
                if(page_current==1){
                    $('ul[data_id=pageShow] li:first').addClass('disabled');
                }else{
                    $('ul[data_id=pageShow] li:first').removeClass('disabled');
                }
                if(page_current==page_size){
                    $('ul[data_id=pageShow] li:last').addClass('disabled');
                }else{
                    $('ul[data_id=pageShow] li:last').removeClass('disabled');
                }
                $('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
            },
            // 提示相关
            renderTipsPhoton:function(data){
                var html = $rk.tplRender(dot, $('#j_view_tipsPhoton').html(), data||{});
                $('#j_con_tipsPhoton').html(html);
            },
            bindTipsPhoton:function(){
                $('.alert').fadeOut(10000,function(){
                    $('.alert .close').click();
                });
            },
            // 删除品牌
            removeBrand: function(dom){
                var me = this;
                var dialog = new Dialog({
                    title: '删除品牌',
                    content: '<p class="ui-msg ui-msg-warning">确定删除此品牌吗?</p>',
                    confirmFun: function (dialog,button) {
                        me.removeBrandRequest(button,dom);
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000)
                    }
                });
                dialog.open();
            },
            removeBrandRequest: function(button,that){
              var brand_id = that.parent().find('input[type=hidden]').val();
              var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url : deleteBrandUrl,
                  data : JSON.stringify({"brand_id": +brand_id}),
                  contentType : 'application/json',
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      if(json.hfive_weidian_brand_delete_response.msg=='success'){
                          setTimeout(function () {
                            $rk.listener.trigger('brandList', 'change');
                            flag = 0;
                          }, 500)
                      }
                  }
              }
                new Ajax(option);
            },
            // 添加商品
            addGoodRequst: function(dom){
               var me = this;
               dom.attr('data-target','#goodsAddClass'); 
               var option = {
                   url : goodsClassUrl,
                   dataType:'json',
                   type: 'post',
                   success: function(json) {
                       if(!json.error_response){
                           me.addGoodreader(json);
                       }else{
                           json.error_response.code=0;
                           $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                       } 
                   }
               }
               new Ajax(option);
            },
            // 添加商品类目
            addGoodreader: function(data){
                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_goodsClass_Modal').html(), data || {});
                $('#goodsAddClass').html(html);

                $('#j_flags_ae').val('0');
                //dom.attr('data-target','#goodsAddClass');
            },
            // 选择类目进入第一编辑
            selGoodsClassList: function(dom){
                var me = this;
                
                finalData.category_id = dom.attr('data_id') ? dom.attr('data_id') - 0 : "";
                finalData.category_name = dom.attr('data_name');

                //console.log(finalData);
                $('#goodsAddClass button[data-dismiss=modal]').click();
                me.goodsAddEditOne({});
            },
            // 渲染第一层
            goodsAddEditOne: function(data){
                var me =this;
                var html = $rk.tplRender(dot, $('#j_view_goodsAddEdit_Modal').html(), data || {});
                $('#goodsAddEdit').html(html);

                var categoryName = $('#goodsAddEdit').find('#goodsOne_categoryName').val();
                if(!categoryName){
                    $('#goodsAddEdit').find('#goodsOne_categoryName').val(finalData.category_name);
                }
                
                // 初始化富文本编辑器
                $('#j_ueditor').empty().html('<script id="editor" type="text/plain" style="height:150px;"></script>');
                var ue = UE.getEditor('editor');

                if(data.info){
                    ue.addListener("ready", function () {
                        ue.setContent(data.info);
                    }); 
                }

                me.bindGoodsAddEditOne(data);
            },
            bindGoodsAddEditOne: function(){
                var me = this;
                $('#showImgs div[data_id=j_upLoad]').each(function(index, el) {
                  var dom = $(el).attr('id');
                  me.imgUpLoad($("#"+dom)); 
                });
            },
            // 点击下一步
            goodsNext: function(dom){
                var me = this;
                //$('#j_flags_ae').val('0');
                var v = $('#j_flags_ae').val();
                if(v == 0){ // add
                    me.goodsAddEditTwo({});
                }else{  // edit
                    me.goodsAddEditTwo(detailData);
                }
                
                $('#goodsAddEdit button[data-dismiss=modal]').click();

                //me.validNext(dom);
                var imgArr = [];
                $('#showImgs input[data_id="imgFile"]').each(function(index, el) {
                    imgArr.push({"image":$(el).attr('url')});
                });
                // 抓取数据
                finalData.name = $('#goodsName').val();
                finalData.info = UE.getEditor('editor').getContent();
                finalData.images = imgArr;
            },
            // 取消下一步
            calcel_goodsNext: function(dom){
                finalData.name = '';
                finalData.info = '';
                finalData.images = '';
            },
            validNext: function(dom){
                var goodsName = $('#goodsName').val();
                var goodsInfo = UE.getEditor('editor').getContent();
            },
            // 渲染第二层
            goodsAddEditTwo: function(data){
                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_goodsAddEditLast_Modal').html(), data);
                $('#goodsAddEditLast').html(html);

                me.bindGoodsAddEditTwo();
            },
            bindGoodsAddEditTwo: function(){
                var me = this;
                var v = $('#j_flags_ae').val();
                if(v == 1){ // edit
                    var cate_id =finalData.category_id; 
                    var option = {
                        url: attrListUrl,
                        data: JSON.stringify({"cate_id": +cate_id}),
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            if(json.hfive_weidian_property_list_response){
                                // 渲染下拉列表
                                var html = $rk.tplRender(dot, $('#j_view_goodsAttrOption').html(), json);
                                $('.goodAttrCon #goodsAttrOption').html(html);

                                // 选中opt
                                for (var i = detailData.properties.length - 1; i >= 0; i--) {
                                    var sel = $('.goodAttrCon select').eq(i);
                                    $(sel).find('option').each(function(index, el) {
                                        if(detailData.properties[i].pid == $(el).val()){
                                            $(this).attr("selected",true);
                                        }
                                    });
                                };

                            }
                        }
                    }
                      new Ajax(option);

                    $('.sigleBox').find('div.sigle').each(function(index, el) {
                        var dom = $(el).attr('id');
                        me.imgUpLoad($("#"+dom)); 
                    });

                    idx = $('.goodAttrCon .j_goodAttr_sigle').last().attr('data_id');
                }
                $('button[data-op=save_price]').click(function(event) {
                    var v = $('#j_save_price').val();
                    if(v){
                        $('#j_goodsSigleList').find('input[name=price]').val(v);
                        $('#j_save_price').val('');
                    }else{
                        alert('设置价格不能为空！');
                    }
                });
                $('button[data-op=cancel_price]').click(function(event) {
                    $('#j_save_price').val('');
                });
                $('button[data-op=save_batch]').click(function(event) {
                    var v = $('#j_save_batch').val();
                    if(v){
                        $('#j_goodsSigleList').find('input[name=quantity]').val(v);
                        $('#j_save_batch').val('');
                    }else{
                        alert('设置库存不能为空！');
                    }
                });
                $('button[data-op=cancel_batch]').click(function(event) {
                    $('#j_save_batch').val('');
                });
            },
            // 删除商品规格--大
            removeAttr: function(dom){
                var me = this;
                dom.parent('div').remove();
                $rk.listener.trigger('sigle', 'change');
                me.checkaddAttr();
            },
            // 删除单个规格值--小
            removeSigle: function(dom){
                dom.parent('div').remove();
                $rk.listener.trigger('sigle', 'change');
            },
            // 添加商品规格--大
            addAttr: function(dom){
                var me = this;
                /*console.log($('.goodAttrCon .j_goodAttr_sigle').last().attr('data_id'));
                var idx = $('.goodAttrCon .j_goodAttr_sigle').last().attr('data_id')?$('.goodAttrCon').last('.j_goodAttr_sigle').attr('data_id'):0;
                console.log(idx);*/
                idx ++;
                var html = $rk.tplRender(dot, $('#j_view_goodAttr').html(), {});
                $('.goodAttrCon').append(html);
                $('.goodAttrCon .j_goodAttr_sigle').last().attr({
                    data_id: idx,
                    id: 'j_goodAttr_sigle'+idx
                });
                me.goodsAddEditTwo_attrListOpt();

                me.checkaddAttr();
            },
            checkaddAttr: function(){
                var len = $('.goodAttrCon .j_goodAttr_sigle').length;
                if(len>=3){
                    $('.goodAttrAdd').hide();
                }else{
                    $('.goodAttrAdd').show();
                }
            },
            // 请求规格下拉列表
            goodsAddEditTwo_attrListOpt: function(){
               var cate_id =finalData.category_id; 
               var option = {
                   url: attrListUrl,
                   data: JSON.stringify({"cate_id": +cate_id}),
                   dataType: 'json',
                   type: 'post',
                   success: function(json) {
                       if(json.hfive_weidian_property_list_response){
                           // 渲染下拉列表
                           var html = $rk.tplRender(dot, $('#j_view_goodsAttrOption').html(), json);
                           $('.goodAttrCon #goodsAttrOption').last().html(html);
                       }
                   }
               }
                 new Ajax(option); 
            },
            // 添加单个规格值--小
            addSigle: function(dom){
                var me = this;
                var flag = $('#crateTags_flag').attr('data_flag');

                var pid = dom.parents('.j_goodAttr_sigle').find('select').val();

                if(flag==0){
                    $('#tags_tagsinput').find('span.tag').remove();
                    $('#tags').tagsInput({
                        'width':'100%',
                        'defaultText':'回车创建标签',
                        'placeholderColor' : '#fff',
                        onAddTag:function(tag){
                            var option = {
                                url: svaeSigleValVidUrl,
                                data: JSON.stringify({"pid": + pid,"value": tag}),
                                dataType: 'json',
                                type: 'post',
                                success: function(json) {
                                    if(json.hfive_weidian_goods_addpropertyvalue_response){
                                        var vid = json.hfive_weidian_goods_addpropertyvalue_response.vid;
                                        var ls = $('#tags_tagsinput .tag').last();
                                        $(ls).attr('data_vid',vid);
                                    }
                                }
                            }
                              new Ajax(option);
                        },
                        onRemoveTag:function(tag){
                            //console.log('删除了'+tag)
                        }
                    });
                    $('#crateTags_flag').attr('data_flag',1);
                }
                _dom = dom;
            },
            // 保存创建的tags
            crateTags: function(dom){
                var me = this;
                var D = $('#crateTags');
                var tagArr = [];
                $('#tags_tagsinput .tag span').each(function(index, el) {
                    var vid = $(el).parent().attr('data_vid');
                    var val = $(el).text();
                    tagArr.push({"vid": vid,"value": val,"image":""});
                });
                $('#crateTags button[data-dismiss=modal]').click();
                me.readerTags(tagArr);

                // $rk.listener.trigger('sigle', 'change');
            },
            readerTags: function(data){
                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_goodSigle').html(), data);
                var container = _dom.parent('div').prev('div.sigleBox');
                container.append(html);

                container.find('div.sigle').each(function(index, el) {
                    var dom = $(el).attr('id');
                    me.imgUpLoad($("#"+dom)); 
                });

                $rk.listener.trigger('sigle', 'change');

            },
            // 重新收集数据
            collectSigleData: function(){
                var me = this;
                var obj = {};
                var properties_Arr = [];
                var properties_value_Arr = [];
                $('.goodAttrCon').find('div.j_goodAttr_sigle').each(function(index, el) {
                   properties_Arr.push({});
                   var sele_v = $(el).find('select option:selected').val();
                   var sele_t =  $(el).find("select option:selected").text();

                   properties_Arr[properties_Arr.length-1].pid = sele_v;
                   properties_Arr[properties_Arr.length-1].pname = sele_t;
                   properties_Arr[properties_Arr.length-1].values = [];
                   
                   var m = $(el).attr('id');
                   $('#'+m).find('.sigleBox .sigle').each(function(idx, item) {
                       var vid = $(item).find('input[type=file]').attr('dataimg_vid')?$(item).find('input[type=file]').attr('dataimg_vid') - 0:'';
                       var value = $(item).find('p').text()?$(item).find('p').text():'';
                       var images = $(item).find('input[type=file]').attr('url')?$(item).find('input[type=file]').attr('url'):'';
                       properties_Arr[properties_Arr.length-1].values.push(
                            {
                                "vid": vid,
                                "value": value,
                                "image": images
                            }
                        );
                   });
                                    
                });
                finalData.properties =properties_Arr; 
                //console.log(finalData.properties);
                me.readerStockTable(finalData.properties);
            },
            // 重新渲染
            readerStockTable: function(data){ 
                finalData.property_is_changed = true;

                var me = this;
                var html = $rk.tplRender(dot, $('#j_view_goodsSigleList').html(), data||{});
                $('#j_goodsSigleList').empty().html(html);
            },
            // 添加商品取消
            finishCancel: function(dom){

            },
            // 添加商品完成
            finishAdd: function(dom){
                var me = this;
                var goodsPrice = $('#goodsPrice').val();
                finalData.price = goodsPrice;
                var obj_1_nv = {},
                    obj_2_nv = {},
                    obj_3_nv = {},
                    obj_4_nv = {};

                // 拼数据    规格的数据
                var len; 
                if(finalData.properties.length){len =  finalData.properties.length;} // add
                else{len = detailData.properties.length;}

                finalData.skus = {};
                finalData.skus.pid = finalData.properties[0].pid ? finalData.properties[0].pid - 0 :"";
                finalData.skus.pname = finalData.properties[0].pname; 
                finalData.skus.values = [];

                if(len==1){
                    var pid = finalData.properties[0].pid ? finalData.properties[0].pid - 0 : "";
                    var pname = finalData.properties[0].pname;

                    var ar = finalData.properties[0].values;
                    for (var i = ar.length - 1; i >= 0; i--) {
                        var obj = {};
                        
                        var vid = ar[i].vid ? ar[i].vid - 0 : "";
                        var value = ar[i].value;
                        obj.vid = vid;
                        obj.value = value;
                        obj.next = {};
                        obj.next.pid = pid;
                        obj.next.pname = pname;
                        obj.next.values = [];

                        var dom = $('#j_goodsSigleList tbody tr').eq(i);

                        var l = dom.find('td').length;
                        var _value = dom.find('td').first().find('input').val();
                        var quantity = dom.find('td').last().find('input').val();
                        var price = dom.find('td').eq(l-2).find('input').val();

                        obj_1_nv.vid = vid;
                        obj_1_nv.value = _value;
                        obj_1_nv.price = price;
                        obj_1_nv.quantity = quantity;

                        obj.next.values.push(obj_1_nv);

                        finalData.skus.values.push(obj);
                    };

                        //console.log(finalData.skus);
                    
                }
                else if(len==2){
                    var pid = finalData.properties[0].pid ? finalData.properties[0].pid - 0 : "";
                    var pname = finalData.properties[0].pname;

                    var ar = finalData.properties[0].values;
                    for (var i = ar.length - 1; i >= 0; i--) {
                        var obj = {};
                        var vid = ar[i].vid ? ar[i].vid - 0 : "";
                        var value = ar[i].value;
                        obj.vid = vid;
                        obj.value = value;
                        obj.next = {};
                        obj.next.pid = pid;
                        obj.next.pname = pname;
                        obj.next.values = [];

                        var dom = $('#j_goodsSigleList tbody').find('tr[class="gradeX j_strip_x"]').eq(i);

                        var l = dom.find('td').length;
                        var _value = dom.find('td').first().find('input').val();
                        var _value2 = dom.find('td').eq(l-3).find('input').val();
                        var price = dom.find('td').eq(l-2).find('input').val();
                        var quantity = dom.find('td').last().find('input').val();

                        obj_1_nv.vid = vid;
                        obj_1_nv.value = _value;
                        //obj_1_nv._value2 = _value2;
                        obj_1_nv.price = price;
                        obj_1_nv.quantity = quantity;

                        obj.next.values.push(obj_1_nv);

                        //console.log(obj_1_nv);

                        $('#j_goodsSigleList tbody tr[id=j_'+i+']').each(function(index, el) {
                            
                            obj_2_nv.vid = vid;
                            obj_2_nv.value = _value;

                            var _value2_2 = $(el).find('td').first().find('input').val();
                            var price2 = $(el).find('td').eq(index-2).find('input').val();
                            var quantity2 = $(el).find('td').last().find('input').val();

                            //obj_1_nv._value2_2 = _value2_2;
                            obj_2_nv.price = price2;
                            obj_2_nv.quantity = quantity2;
                            obj.next.values.push(obj_2_nv);
                        });

                        finalData.skus.values.push(obj);
                    }
                        //console.log(finalData.skus);
                }
                else{
                    var pid = finalData.properties[0].pid ? finalData.properties[0].pid - 0 :"";
                    var pname = finalData.properties[0].pname;

                    var ar = finalData.properties[0].values;
                    var ar2 = finalData.properties[1].values;
                    var ar3 = finalData.properties[2].values;
                    for (var i = ar.length - 1; i >= 0; i--) {

                        var obj = {};
                        //var obj_1_nv = {};
                            
                        var vid = ar[i].vid ? ar[i].vid - 0 : "";
                        var value = ar[i].value;
                        obj.vid = vid;
                        obj.value = value;
                        obj.next = {};
                        obj.next.pid = finalData.properties[1].pid ? finalData.properties[1].pid - 0 : "";
                        obj.next.pname = finalData.properties[1].pname;
                        obj.next.values = [];
                        

                        for(var d = ar2.length - 1; d >= 0 ; d--){
                                var obj_3_nv_2 = {};
                                var obj_2_nv_2 = {};
                            
                                obj_3_nv_2.pid = finalData.properties[2].pid;
                                obj_3_nv_2.pname = finalData.properties[2].pname;
                                obj_3_nv_2.values = [];
                            for(var h = ar3.length - 1; h >= 0 ; h--){
                                
                                    var obj_4_nv_2 = {};
                                    obj_4_nv_2.vid = vid;
                                    obj_4_nv_2.value = finalData.properties[2].values[h].value;
                                    var n = $('#j_goodsSigleList tbody').find('tr').eq(h).find('td').length;
                                    obj_4_nv_2.quantity =  $('#j_goodsSigleList tbody').find('tr').eq(h).find('td').eq(n-1).find('input').val();
                                    obj_4_nv_2.price = $('#j_goodsSigleList tbody').find('tr').eq(h).find('td').eq(n-2).find('input').val();

                                obj_3_nv_2.values.push(obj_4_nv_2);
                            };

                            obj_2_nv_2.vid = ar[d].vid;
                            obj_2_nv_2.value = ar[d].value;
                            obj_2_nv_2.next = {};
                            obj_2_nv_2.next = obj_3_nv_2;
                        };

                        obj.next.values.push(obj_2_nv_2);
                        
                        finalData.skus.values.push(obj);

                    }
                }

                //console.log(finalData.skus);
                
                var v = $('#j_flags_ae').val();
                var saveUrl;
                if(v == 0){saveUrl =  goodsAddUrl;} // add
                else{saveUrl = goodsEditUrl;}  // edit

                var Ob = {};
                Ob.hfive_weidian_goods_getdetailsetting_response = {};
                Ob.hfive_weidian_goods_getdetailsetting_response = finalData; 
                var option = {
                    url: saveUrl,
                    data: JSON.stringify(Ob), 
                    //contentType : 'application/json',
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            var brandId  = $('input[data-id=brandId]').val();
                            setTimeout(function () {
                              me.awardListRequest({ "page": 1,"page_size": 10,"brand_id": brandId});
                            }, 500)
                        }
                    }
                }
                new Ajax(option);
            },
            // 编辑商品---获取数据
            editGoodRequest: function(dom){
                var product_id = dom.parent().find('input[type=hidden]').val();
                //dom.attr('data-target','#goodsAddEdit'); 
                var option = {
                    url: getGoodsDetaiSetlUrl,
                    data: JSON.stringify({"product_id": + product_id}),
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('goodsDetail', 'success', json.hfive_weidian_goods_getdetailsetting_response);
                        }
                    }
                }
                  new Ajax(option);

                  $('#j_flags_ae').val('1');
            },
            // 预览
            reviewGood: function(dom){  
            },
            // 删除商品
            removeGood: function(dom){
                var me = this;
                var dialog = new Dialog({
                    title: '删除商品',
                    content: '<p class="ui-msg ui-msg-warning">确定删除此商品吗?</p>',
                    confirmFun: function (dialog,button) {
                        me.removeGoodRequest(button,dom);
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000)
                    }
                });
                dialog.open();
            },
            removeGoodRequest: function(button,that){
              var me = this;
              var product_id = that.parent().find('input[type=hidden]').val();
              var brandId  = $('input[data-id=brandId]').val();
              var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url: deleteGoodsUrl,
                  data: JSON.stringify({"id": +product_id}),
                  //contentType : 'application/json',
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      if(json.hfive_weidian_goods_delete_response.msg=='success'){
                          setTimeout(function () {
                            me.awardListRequest({ "page": 1,"page_size": 10,"brand_id": brandId});
                          }, 500)
                      }
                  }
              }
                new Ajax(option);
            },
            // 商品列表关键字搜索
            serchGood: function(dom){
                var me = this;
                var brandId  = $('input[data-id=brandId]').val();
                //列表关键字搜索
                dom.unbind('click').click(function(){
                    var data={name:$('input[data_id=searchKey]').val(),'page':page_current,'page_size':pageLength,'brand_id': + brandId};
                    me.awardListRequest(data);
                    pageFlag=0;
                });
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});