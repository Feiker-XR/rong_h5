/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-13 10:43:28
*/
seajs.use(['Ajax','dot','pnotify','migrate','bootstrap','jqui','mousewheel','mCustomScrollbar'], 
    function(Ajax,dot,pnotify,migrate,bootstrap,jqui,mousewheel,mCustomScrollbar){

    var setModel = function() {

        var imageTextListUrl = $$r.routers.data.link.imageTextList,
            imageTextDelUrl = $$r.routers.data.link.imageTextDel;

        var pageLength=10,
            page_num=5,
            page_current=1,
            page_size,
            hostUrl='http://'+window.location.host,
            homePage=hostUrl+'/pc/photon.html';

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.render();
                    me.bind();
                    var data={page_num:1,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                    me.imageTextListRequst(data);
                });
                $rk.listener.on('imageTextList', 'success', function(e, json) {
                    me.renderImageTextList(json);
                    me.bindImageTextList();
                });
                $rk.listener.on('tips', 'success', function(e, msg) {
                    $.pnotify({
                        title: '提示',
                        type: 'info',
                        text: msg
                    });
                });
            },
            container: $('#j_con_list'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_list').html(), data||{});
                this.container.html(html);
            },
            bind:function(){
                var me=this;
                //搜索
                $('div[data_id=searchBtn]').unbind('click').click(function(){
                    var data={page_num:1,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                    me.imageTextListRequst(data);
                });
                //搜索回车
                 $("body").keydown(function() {
                    if (event.keyCode == "13") {
                        if($('input[data_id=imageTextTit]:focus').length!=0){
                            $('div[data_id=searchBtn]').click();
                        }else{
                            return false;
                        }
                    }
                 });
                //左侧菜单滚动
                if( $('.panel-slider-center .panel-slider-arrow').css('position') != 'absolute'){
                    $win_hei = $(window).height();
                    $(".sidebarMenuHolder").height($win_hei-$('.activityTit').height());
                }
                else{
                    $(".sidebarMenuHolder").height(300);
                }
                $(".sidebarMenuHolder").mCustomScrollbar({
                    scrollButtons:{
                        enable:true
                    },
                    advanced:{
                        updateOnBrowserResize: true,
                        updateOnContentResize:true
                    }
                });
                $('.panel-slider-arrow').off().on('click', function(){
                    $('.panel').toggleClass('retracted');
                    $('.imageTextContent').toggleClass('contentRetracted');
                });
                $('ul[data_id=imageTextMenuLeft] li').unbind('click').click(function(){
                    window.location.href=$$r.hosts+$(this).attr('url')+ RKC.mainSuffix;
                });
                //顶部导航
                $('ul[data_id=navTop] li:first').click(function(){
                    window.parent.location.href=homePage;
                });
            },
            renderImageTextList: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_imageTextList').html(), data||{});
                this.container.find('div[data_id=imageTextList]').html(html);
            },
            bindImageTextList:function(){
                var me=this;
                //分页
                page_size=$('.imageTextList').attr('page_size');
                $('ul[data_id=pageShow] li').not(':last').not(':first').remove();
                if(page_size!=0){
                    me.pageShow(page_num,page_current,page_size);
                }else{
                    $('.prev,.next').hide();
                }
                $('ul[data_id=pageShow]').off().on('click','li:not(:first):not(:last):not(.active)',function(){
                    page_current=$(this).text()-0;
                    $('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
                    var data={page_num:page_current,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                    me.imageTextListRequst(data);
                });
                $('.next').unbind('click').click(function(){
                    page_current+=1;
                    if(page_current>page_size){
                        page_current=page_size;
                        $('ul[data_id=pageShow] li:last').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:last').removeClass('disabled');
                        var data={page_num:page_current,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                        me.imageTextListRequst(data);
                    }
                });
                $('.prev').unbind('click').click(function(){
                    page_current-=1;
                    if(page_current<1){
                        page_current=1;
                        $('ul[data_id=pageShow] li:first').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:first').removeClass('disabled');
                        var data={page_num:page_current,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                        me.imageTextListRequst(data);
                    }
                });
                //删除图文
                $('span[data_id=imageTextDel]').unbind('click').click(function(){
                    var data={id:$(this).parents('tr').attr('id')};
                    me.imageTextDelRequest(data);
                });
                //编辑图文
                $('span[data_id=imageTextEdit]').unbind('click').click(function(){
                    var id=$(this).parents('tr').attr('id');
                    window.location.href=$$r.hosts +'/subscriptionManage/material/imageText/imageTextCon' + RKC.mainSuffix + '?id='+id;
                });
                //添加图文报表和图文链接
               $('.imageTextLink').css('top',($('ul[data_id=imageTextListActivityHover] li').height()/2-$('.imageTextLink').height()/2)+'px'); 
                $('ul[data_id=imageTextListActivityHover] li:not(.imageTextLink)').hover(function(){
                    var actualWidth=$(this).find('.imageTextTitCon span').width();
                    var maxWidth=$(this).find('.imageTextTitCon').width();
                    var popWidth=$('.imageTextLink').width();
                    var maxPos=maxWidth-popWidth;
                    if(actualWidth>=maxPos){
                        $(this).find('.imageTextLink').css('left',(maxPos-10)+'px'); 
                    }else{
                       $(this).find('.imageTextLink').css('left',(actualWidth+20)+'px'); 
                    };
                    $(this).find('.imageTextLink').show();
                },function(){
                    $(this).find('.imageTextLink').hide();
                });                
            },
            imageTextListRequst:function(data){
                var option = {
                    url : imageTextListUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        json.pageLength=pageLength;
                        if(!json.error_response){
                            $rk.listener.trigger('imageTextList', 'success',json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            imageTextDelRequest:function(data){
                var me=this;
                var option = {
                    url : imageTextDelUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            var data={page_num:page_current,page_size:pageLength,title:$('input[data_id=imageTextTit]').val()};
                            me.imageTextListRequst(data);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
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
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});