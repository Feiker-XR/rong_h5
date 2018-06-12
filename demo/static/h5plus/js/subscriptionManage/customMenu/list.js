/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   zhaoxiaoyang
* @Last Modified time: 2016-01-20 18:51:07
*/
seajs.use(['Ajax','dot','tips2',"Dialog",'sortable'], 
    function(Ajax,dot,Tips,Dialog,sortable){

    var setModel = function() {

        var imageslibraryUrl = $$r.routers.data.link.imageslibrary,
            menuTreeUrl = $$r.routers.data.link.menuTree,
            menu1AddUrl = $$r.routers.data.link.menu1Add,
            menu1EditUrl = $$r.routers.data.link.menu1Edit,
            menuDelUrl = $$r.routers.data.link.menuDel,
            menu2AddUrl = $$r.routers.data.link.menu2Add,
            menu2EditUrl = $$r.routers.data.link.menu2Edit,
            menuContentUrl = $$r.routers.data.link.menuContent,
            subscriptionUrl = $$r.routers.data.link.subscription,
            sortUrl = $$r.routers.data.link.sort,
            pageUrl = $$r.routers.data.link.page,
            saveUrl = $$r.routers.data.link.save,
            releaseUrl = $$r.routers.data.link.release;

        var subscription,flag=0;

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.subscriptionRequest();
                });
                $rk.listener.on('form', 'success', function(e, json) {
                    me._render(json);
                    me.bind();
                })
            },
            _container: $('#j_con_form'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_form').html(), data||{});
                this._container.html(html);
            },
            bind: function() {
                var me=this;
                //选择公众号
                subscription=$('#subscription').val();
                $rk.listener.trigger('menuTree', 'change');
                $('#subscription').change(function(){
                    flag=0;
                    subscription=$('#subscription').val();
                    $rk.listener.trigger('menuTree', 'change');
                });
                //提示成功
                $('.release').click(function(){
                    var tipBotton=$(this);
                    me.release(tipBotton);
                });
            },
            subscriptionRequest:function(){
                var option = {
                    url : subscriptionUrl,
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        $rk.listener.trigger('form', 'success', json);
                    }
                }
                new Ajax(option); 
            },
            release:function(tipBotton){
                console.log(subscription)
                var option = {
                    url : releaseUrl,
                    dataType: 'json',
                    data: {'subscription':subscription},
                    type: 'post',
                    success: function(json) {
                        if (json.hfive_core_tag_customMenu_release_response.code){
                            $rk.listener.trigger('tips', 'success','发布成功！',tipBotton);
                        }else{
                            $rk.listener.trigger('tips', 'fail','发布失败！',tipBotton);
                        };
                    }
                }
                new Ajax(option);
            }
        });

        var main = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me._render('');
                    me._bind();
                });

                $rk.listener.on('imageslibrary', 'success', function(act, json) {
                    me.imgInfoRender(json);
                    me.imgInfoBind();
                });
                
                $rk.listener.on('link', 'success', function(act, json) {
                    me.linkInfoRender(json);
                    me.linkInfoBind();
                });

                $rk.listener.on('menuTree', 'success', function(act, json) {
                    me.menuTreeRender(json);
                    me.menuTreeBind();
                });

                $rk.listener.on('menuTree', 'change', function() {
                    console.log(subscription);
                    me.menuTreeRequest(subscription);
                });
                $rk.listener.on('tips', 'success', function(e,tip,tipBotton) {
                    me.tips('tipsSuccess',tip,tipBotton); 
                });
                $rk.listener.on('tips', 'fail', function(e,tip,tipBotton) {
                    me.tips('tipsFail',tip,tipBotton);
                    
                });
            },
            _container: $('#j_con_main'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_con').html(), data||{});
                this._container.html(html);
            },
            _bind : function(){
                var me = this;
                //失败提示
                $('.save').click(function(){
                    var tipsButton=$(this);
                    var customMenuConChoose=$('#customMenuConChoose').val();
                    var id=$('.customMenu1Active').attr('data-id');
                    var editValue;
                    if(customMenuConChoose=='text'){
                        editValue=$('#editor_id').val();
                    }else if(customMenuConChoose=='image'){
                        editValue={'id':$('.imageText>.imageTextChooseImg').attr('id'),'imageTit':$('.imageText>.imageTextChooseImg .imageTextChooseImgTitIcon').next('span').text(),'imageurl':$('.imageText>.imageTextChooseImg .imageTextChooseImgDetail img').attr('src'),'imageDetail':$('.imageText>.imageTextChooseImg .imageTextChooseImgIntro').text()};
                    }else if(customMenuConChoose=='link'){
                        if ($('#linkInner').is(':checked')) {
                            editValue={'sort':$('#sort').val(),'page':$('#page').val()};
                        }else if($('#linkOuter').is(':checked')){
                            editValue=$('#outerTxt').val();
                            if(editValue==''){
                                $rk.listener.trigger('tips', 'fail','保存内容不能为空！',tipsButton);
                                return false;
                            }
                        };
                    };
                    var saveData={'customMenuConChoose':customMenuConChoose,'editValue':editValue,'subscription':subscription,'id':id};
                    console.log(JSON.stringify(saveData));
                    me.saveRequest(saveData,tipsButton);
                });
                //编辑器
                //KindEditor.ready(function(K) {
                    window.editor = KindEditor.create('#editor_id',{
                        items : [
                             'emoticons','link', 'unlink'
                        ],
                        uploadJson:'',
                        urlType:'domain',
                        afterBlur:function(){
                            this.sync();
                        },
                        afterCreate:function(){
                            this.sync();
                        },
                        afterChange:function(){
                            this.sync();
                        }
                    })
                //})
                //编辑内容改变
                $('#customMenuConChoose').change(function(){
                    $('.imageTextAdd').show();
                    $('.imageText>.imageTextChooseImg').remove();
                    $('#linkInner').prop('checked',true);
                    $('.linkInnerCon').show();
                    $('.linkOuterCon').hide();
                    $('#sort option:first,#page option:first').prop('selected',true);
                    KindEditor.html('#editor_id','');
                    $('#outerTxt').val('');
                })
                //选择编辑内容
                $('#customMenuConChoose').change(function(){
                    if($(this).val()=='text'){
                        $('#textEidt').show();
                        $('.link,.imageText').hide();
                    }else if($(this).val()=='image'){
                        $('.imageText').show();
                        $('#textEidt,.link').hide();
                    }else if ($(this).val()=='link') {
						if($('#sort option').length<=0){
                            me.sortRequest();
                        }
                        $('.link').show();
                        $('#textEidt,.imageText').hide();
                    };
                });
                //选择内外部链接
                $('.linkTit input[type=radio]').click(function(){
                    if ($('#linkInner').is(':checked')) {
						if($('#sort option').length<=0){
                            me.sortRequest();
                        }
                        $('#sort option:first,#page option:first').prop('selected',true);
                        $('.linkInnerCon').show();
                        $('.linkOuterCon').hide();
                    }else if($('#linkOuter').is(':checked')){
                        $('#outerTxt').val('');
                        $('.linkInnerCon').hide();
                        $('.linkOuterCon').show();
                    };
                });
                //选择图片
                $('.imageTextAdd').click(function(){
					if($('.imageTextChooseImgs .imageTextChooseImg').length<=0){
						me.imgInfoRequest();
					}
                    $('.imageTextChoose').show();
                });
            },
            imgInfoRender : function (data) {
                var html = $rk.tplRender(dot, $('#j_img_info').html(), data||{});
                this._container.find('.imageTextChoose').html(html);
            },
            imgInfoBind : function () {
                //图文取消
                $('.imageTextShut,.imageTextChooseCancel').click(function(){
                    $('.imageTextChoose').hide();
                });
                //图文鼠标经过
                $('.imageTextChoose .imageTextChooseImg').hover(function(){
                    if(!$(this).hasClass('imageTextChooseActive')){
                        $(this).addClass('imageTextChooseHover').siblings().removeClass('imageTextChooseHover');
                    }
                },function(){
                    if(!$(this).hasClass('imageTextChooseActive')){
                        $(this).removeClass('imageTextChooseHover');
                    }
                });
                //选中图文
                $('.imageTextChoose .imageTextChooseImg').click(function(){
                    $(this).removeClass('imageTextChooseHover').addClass('imageTextChooseActive').append('<div class="imageTextchooseIcon"></div>').siblings().removeClass('imageTextChooseActive').find('.imageTextchooseIcon').remove();
                });
                //选择图文确定
                $('.imageTextChooseCertain').click(function(){
                    var imageTextChooseActive=$('.imageTextChooseCon .imageTextChooseActive .imageTextchooseIcon').remove();
                    imageTextChooseActive=$('.imageTextChooseCon .imageTextChooseActive').removeClass('imageTextChooseActive').prop('outerHTML');
                    $('.imageText>.imageTextChooseImg').remove();
                    $('.imageText').append(imageTextChooseActive);
                    $('.imageTextChoose,.imageTextAdd').hide();
                });
                 //重新选择图文
                $('.imageText').on('click','.imageTextChooseImg',function(){
					if($('.imageTextChoose').length>0){
						$('.imageTextChoose').show();
					}else{
						me.imgInfoRequest();
					}
                });
            },
            tips:function(tipClass,tip,tipBotton){
                var tipsCon='<div class="tipsWrap">'+
                                    '<div class="tips '+tipClass+'">'+
                                        '<span class="tipsLabel"></span>'+
                                        '<span>'+tip+'</span>'+
                                    '</div>'+
                                '</div>';
                    var tips = new Tips({content:tipsCon,button:tipBotton,width: '100%'});
                    tips.show();
                    $(tips.tipsId).css({'top':0,'left':0}).fadeOut(4000);
            },
            imgInfoRequest : function () {
                    var option = {
                        url : imageslibraryUrl,
                        dataType: 'json',
                        type: 'get',
                        success: function(json) {
                            $rk.listener.trigger('imageslibrary', 'success', json);
                        }
                    }
                    new Ajax(option);                
            },
            linkInfoRender:function(data){
                var html = $rk.tplRender(dot, $('#j_link_info').html(), data||{});
                this._container.find('.linkInnerCon').html(html);
            },
            linkInfoBind:function(){
                var me=this;
                var sortValue=$('#sort').val();
                me.pageRequest(sortValue);
                $('#sort').change(function(){
                    var sortValue=$(this).val();
                    me.pageRequest(sortValue);
                });
            },
            sortRequest:function(){
                var option = {
                    url : sortUrl,
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        $rk.listener.trigger('link', 'success', json);
                    }
                }
                new Ajax(option);
            },
            pageRequest:function(sortValue){
                var option = {
                    url : pageUrl,
                    dataType: 'json',
                    data:{sortValue:sortValue},
                    type: 'get',
                    success: function(json) {
                        console.log(json);
                        var pages=json.hfive_core_tag_customMenu_page_response.pages;
                        var options='';
                        for(var i=0;i<pages.length;i++){
                            options+='<option>'+pages[i].page+'</option>';
                        };
                        $('#page option').remove();
                        $('#page').append(options);
                    }
                }
                new Ajax(option);
            },
            saveRequest : function (data,tipBotton) {
                    var me=this;
                    var option = {
                        url : saveUrl,
                        dataType: 'json',
                        type: 'post',
                        data:data,
                        success: function(json) {
                           if(json.hfive_core_tag_customMenu_save_response.code){
                               $rk.listener.trigger('tips', 'success','保存成功！',tipBotton);
                           }else{
                                $rk.listener.trigger('tips', 'fail','保存失败！',tipBotton);
                           };
                        }
                    }
                    new Ajax(option);                
            },
            menuTreeRender: function(data){
                var html = $rk.tplRender(dot, $('#j_menu_tree').html(), data||{});
                this._container.find('.customMenuList').html(html);
            },
            menuTreeBind:function(){
                var me=this;
                $('.customMenuList span[data-op]').click(function(e){
                    var dataOp=$(this).attr('data-op');
                    var id=$(this).parents('a').attr('data-id');
                    if(dataOp=='menu1Del'){
                        me.menu1Del(id);
                    }else if(dataOp=='menu2Del'){
                        me.menu2Del(id);
                    }else if(dataOp=='menu1Edit'){
                        me.menu1Edit(id,this);
                    }else if(dataOp=='menu1Add'){
                        me.menu1Add();
                    }else if(dataOp=='menu2Edit'){
                        me.menu2Edit(id,this);
                    }else if(dataOp=='menu2Add'){
                        if ($(this).parents('li').find('ul').length) {
                           me.menu2Add();
                        }else{
                            var dialog = new Dialog({
                                title: '添加二级菜单',
                                content: '<div class="popBoxCon addCustomMenu2ConTip">'+
                                             '<span class="addCustomMenu2ConTipIcon"></span>'+
                                             '使用二级菜单之后，原有编辑内容将被取消，确定使用二级菜单么？'+
                                         '</div>',
                                confirmFun: function (dialog,button) {
                                    me.menu2Add();
                                    dialog.close();
                                }
                            });
                            dialog.open();
                        };
                    };
                    e.stopPropagation();
                }); 
                $('.customMenuList li').not(':has(li)').click(function(){
                    $('.customMenuList li a').removeClass('customMenu1Active');
                    $('a',this).addClass('customMenu1Active');
                    var id=$('a',this).attr('data-id');
                    me.menuContentRequest(id);

                });
                if(flag==0){
                    flag=1; 
                    $('.customMenuList li').not(':has(li)').first().click(); 
                }
            },
            menu1Add:function(){
                var me=this;
                var dialog = new Dialog({
                    title: '添加一级菜单',
                    content: '<div class="popBoxCon addCustomMenu1Con">'+
                                '<div>请设置一级菜单名称：</div>'+
                                '<div class="menuTxtWrap"><input class="text customMenu1Txt" maxlength="4"></div>'+
                                '<div class="numberTip">最多4个汉字</div>'+
                             '</div>',
                    confirmFun: function (dialog,button) {
                        var data={menu1Name:$('#j_dialog_'+dialog.guid).find('.customMenu1Txt').val(),subscription:subscription};
                        me.menu1AddRequest(data);
                        console.log($('#j_dialog_'+dialog.guid).find('.customMenu1Txt').val());
                        dialog.close()
                    }
                });
                dialog.open();

            },
            menu1Edit:function(id,selector){
                var me=this;
                var customMenu1EditCon='<div class="popBoxCon addCustomMenu1Con">'+
                                                '<div>请设置一级菜单名称：</div>'+
                                                '<div class="menuTxtWrap"><input class="text customMenu1Txt" value="'+$(selector).parent('.customMenu1Opr').next('.customMenu1').text()+'" maxlength="4"></div>'+
                                                '<div class="numberTip">最多4个汉字</div>'+
                                             '</div>';
                var dialog = new Dialog({
                    title: '编辑一级菜单',
                    content: customMenu1EditCon,
                    confirmFun: function (dialog,button) {
                        var data={menu1Name:$('#j_dialog_'+dialog.guid).find('.customMenu1Txt').val(),id:id,subscription:subscription};
                        me.menu1EditRequest(data);
                        console.log($('#j_dialog_'+dialog.guid).find('.customMenu1Txt').val());
                        dialog.close();
                    }
                });
                dialog.open();
            },
            menu2Add:function(){
                var me=this;
                var dialog = new Dialog({
                    title: '添加二级菜单',
                    content: '<div class="popBoxCon addCustomMenu2Con">'+
                                 '<div>请设置二级菜单名称：</div>'+
                                 '<div class="menuTxtWrap"><input class="text customMenu2Txt" maxlength="7"></div>'+
                                 '<div class="numberTip">最多7个汉字</div>'+
                            '</div>',
                    confirmFun: function (dialog,button) {
                        var data={menu2Name:$('#j_dialog_'+dialog.guid).find('.customMenu2Txt').val(),subscription:subscription};
                        me.menu2AddRequest(data);
                        console.log($('#j_dialog_'+dialog.guid).find('.customMenu2Txt').val());
                        dialog.close();
                    }
                });
                dialog.open();
            },
            menu2Edit:function(id,selector){
                var me=this;
                var customMenu2EditCon='<div class="popBoxCon addCustomMenu2Con">'+
                                             '<div>请设置二级菜单名称：</div>'+
                                             '<div class="menuTxtWrap"><input class="text customMenu2Txt" value="'+$(selector).parent('.customMenu2Opr').next('.customMenu2').text()+'" maxlength="7"></div>'+
                                             '<div class="numberTip">最多7个汉字</div>'+
                                        '</div>';
                var dialog = new Dialog({
                    title: '编辑二级菜单',
                    content: customMenu2EditCon,
                    confirmFun: function (dialog,button) {
                        var data={menu2Name:$('#j_dialog_'+dialog.guid).find('.customMenu1Txt').val(),id:id,subscription:subscription};
                        me.menu2EditRequest(data);
                        console.log($('#j_dialog_'+dialog.guid).find('.customMenu2Txt').val());
                        dialog.close();
                    }
                });
                dialog.open();
            },
            menu1Del:function(id){
                var me=this;
                var dialog = new Dialog({
                title: '删除一级菜单',
                content: '<div class="popBoxCon addCustomMenu2ConTip">'+
                                 '<span class="addCustomMenu2ConTipIcon"></span>'+
                                 '删除一级菜单之后，原有编辑一级菜单及子菜单内容将被取消，确定删除一级菜单么？'+
                             '</div>',
                confirmFun: function (dialog,button) {
                    var data={id:id,subscription:subscription};
                    me.delRequest(data);
                    dialog.close();
                }
                });
                dialog.open();
            },
            menu2Del:function(id){
                var me=this;
                var dialog = new Dialog({
                    title: '删除二级菜单',
                    content: '<div class="popBoxCon addCustomMenu2ConTip">'+
                                     '<span class="addCustomMenu2ConTipIcon"></span>'+
                                     '删除二级菜单之后，原有编辑菜单内容将被取消，确定删除二级菜单么？'+
                                 '</div>',
                    confirmFun: function (dialog,button) {
                        var data={id:id,subscription:subscription};
                        me.delRequest(data);
                        dialog.close();
                    }
                });
                dialog.open();
            },
            menuContentRequest:function(id){
                var me=this;
                var option = {
                    url : menuContentUrl,
                    data: {id:id},
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        console.log(json);
                        var menuContent=json.hfive_core_tag_customMenu_menuContent_response.menuContent;
                        if(menuContent.type==1){
                            $('#customMenuConChoose').val('text');
                            KindEditor.html('#editor_id',menuContent.content);
                        }else if(menuContent.type==2){
                            $('#customMenuConChoose').val('image');
                            var item=menuContent.content;
                            var imageTextChooseActive='<div class="imageTextChooseImg">'+
                                                            '<div class="imageTextChooseImgTit">'+
                                                                '<span class="imageTextChooseImgTitIcon"></span>'+
                                                                '<span>'+item.imageTit+'</span>'+
                                                            '</div>'+
                                                            '<div class="imageTextChooseImgDetail">'+
                                                                '<img src="'+item.imageurl+'">'+
                                                            '</div>'+
                                                            '<div class="imageTextChooseImgIntro">'+item.imageDetail+'</div>'+
                                                        '</div>'; 
                            $('.imageText').append(imageTextChooseActive).show();
                            $('#textEidt,.link,.imageTextAdd').hide();
                       }else if(menuContent.type==3){
                            $('#customMenuConChoose').val('link');
                            var item=menuContent.content;
                            if(item.type==1){
								if($('#sort option').length<=0){
                                    me.sortRequest();
                                }
                                $('#linkInner').attr('checked',true);
                                $('.linkInnerCon').show();
                                $('.linkOuterCon').hide();
                                $('#sort').val(item.sortValue);
                                $('#page').val(item.pageValue);
                            }else if(item.type==2){
                                $('#linkOuter').attr('checked',true);
                                $('.linkInnerCon').hide();
                                $('.linkOuterCon').show();
                                $('.linkOuterCon input').val(item.linkValue)
                            }
                            $('#textEidt,.imageText').hide();
                            $('.link').show();
                       }
                    }
                }
                new Ajax(option);
            },
            menuTreeRequest: function(subscription){
                var option = {
                    url : menuTreeUrl,
                    data: {subscription:subscription},
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        $rk.listener.trigger('menuTree', 'success', json);
                    }
                }
                new Ajax(option);
            },
            menu1AddRequest:function(data){
                var option = {
                    url : menu1AddUrl,
                    dataType: 'json',
                    data: data,
                    type: 'post',
                    success: function(json) {
                        var menu1AddRes=json.hfive_core_tag_customMenu_menu1Add_response;
                        if (menu1AddRes.code) {
                            $rk.listener.trigger('menuTree', 'change');
                        }else{
                            alert(menu1AddRes.message);
                        };
                    }
                }
                new Ajax(option);
            },
            menu1EditRequest:function(data){
                var option = {
                    url : menu1EditUrl,
                    dataType: 'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        var menu1EditRes=json.hfive_core_tag_customMenu_menu1Edit_response;
                        if (menu1EditRes.code) {
                            $rk.listener.trigger('menuTree', 'change');
                        }else{
                            alert(menu1EditRes.message);
                        };
                    }
                }
                new Ajax(option);
            },
            menu2AddRequest:function(data){
                var option = {
                    url : menu2AddUrl,
                    dataType: 'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        var menu2AddRes=json.hfive_core_tag_customMenu_menu2Add_response;
                        if (menu2AddRes.code) {
                            $rk.listener.trigger('menuTree', 'change');
                        }else{
                            menu2AddRes.message;
                        };
                    }
                }
                new Ajax(option);
            },
            menu2EditRequest:function(data){
                var option = {
                    url : menu2EditUrl,
                    dataType: 'json',
                    data: data,
                    type: 'post',
                    success: function(json) {
                        var menu2EditRes=json.hfive_core_tag_customMenu_menu2Edit_response;
                        if (menu2EditRes.code) {
                            $rk.listener.trigger('menuTree', 'change');
                        }else{
                            menu2EditRes.message;
                        };
                    }
                }
                new Ajax(option);
            },
            delRequest:function(data){
                var option = {
                    url : menuDelUrl,
                    dataType: 'json',
                    data: data,
                    type: 'post',
                    success: function(json) {
                        var menuDelRes=json.hfive_core_tag_customMenu_menuDel_response;
                        if (menuDelRes.code) {
                            $rk.listener.trigger('menuTree', 'change');
                        }else{
                            alert(menuDelRes.message);
                        };
                    }
                }
                new Ajax(option);
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});