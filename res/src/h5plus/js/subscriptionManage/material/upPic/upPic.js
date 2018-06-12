/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-13 10:43:28
*/
seajs.use(['Ajax','dot','pnotify','bootstrap','zclip','uploadermin','diyUpload','mCustomScrollbar'], 
function(Ajax,dot,pnotify,bootstrap,zclip){

    var setModel = function() {

        var imageListUrl = $$r.routers.data.link.imageList,
            imageDeleteUrl = $$r.routers.data.link.imageDelete,
            imageUpdateUrl = $$r.routers.data.link.imageUpdate,
            imageAddUrl = $$r.routers.data.link.imageAdd;

        var pageLength=18,
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
                    var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                    me.upFileListRequst(data);
                });
                $rk.listener.on('upFileList', 'success', function(e, json) {
                    me.renderupFileList(json);
                    me.bindvideoList();
                    me.imgUpload();
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
                    $('.picContainer').toggleClass('contentRetracted');
                });
                $('ul[data_id=imageTextMenuLeft] li').unbind('click').click(function(){
                    window.location.href=$$r.hosts+$(this).attr('url')+ RKC.mainSuffix;
                });
                //顶部导航
                $('ul[data_id=navTop] li:first').click(function(){
                    window.parent.location.href=homePage;
                });
            },
            renderupFileList: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_upAudioList').html(), data||{});
                this.container.find('div[data_id=upFileList]').html(html);
            },
            bindvideoList:function(){
                var me=this;
                //分页
                page_size=$('#picTablemain').attr('page_size');
                $('ul[data_id=pageShow] li').not(':last').not(':first').remove();
                if(page_size!=0){
                    me.pageShow(page_num,page_current,page_size);
                }else{
                    $('.prev,.next').hide();
                }
                $('ul[data_id=pageShow]').off().on('click','li:not(:first):not(:last):not(.active)',function(){
                    page_current=$(this).text()-0;
                    $('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
                    var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                    me.upFileListRequst(data);
                });
                $('.next').unbind('click').click(function(){
                    page_current+=1;
                    if(page_current>page_size){
                        page_current=page_size;
                        $('ul[data_id=pageShow] li:last').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:last').removeClass('disabled');
                        var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                        me.upFileListRequst(data);
                    }
                });
                $('.prev').unbind('click').click(function(){
                    page_current-=1;
                    if(page_current<1){
                        page_current=1;
                        $('ul[data_id=pageShow] li:first').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:first').removeClass('disabled');
                        var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                        me.upFileListRequst(data);
                    }
                });
                //修改名称
                $('a[class=updateNamebtn]').unbind('click').click(function(){
                    var name=$(this).attr('name');
                    var dataId= $(this).attr('data-id');
                    $('#updateNametext').val(name);
                    $('#confirmbtn').unbind('click').click(function(){
                        var data={id:dataId,title:$('#updateNametext').val()}
                        me.imageUpdate(data)
                    })
                });
                /*复制链接*/
                $('a[class=copybtn]').unbind('click').click(function(){
                    var t=1;
                    $('#copyPathBtn').attr('disabled',false)
                    $('#copyPath').show();
                    var copypath = $(this).attr('dataUrl');
                    $('#pathtext').val(copypath)
                    $('input[id=copyPathBtn]').zclip({
                        path:$$r.rootUrl +'/comlibjs/third/zclip/ZeroClipboard.swf',
                        copy:function(){
                            return $('#pathtext').val();
                        },
                        beforeCopy:function(){
                            $('#j_p').nextAll('.ui-pnotify ').hide();
                            $('#j_p').nextAll('.ui-pnotify ').remove();
                        },
                        afterCopy: function(){
                            if(t==1){
                                $rk.listener.trigger('tips', 'success','复制链接成功');
                                $('input[id=copyPathBtn]').zclip('remove');
                                $('.ui-pnotify ').css({'top':'40px'})
                                t++;
                            }
                            
                        }
                    });
                    
                });
                //删除
                $('a[class=deletebtn]').unbind('click').click(function(){
                    $('#j_p').nextAll('.ui-pnotify ').hide();
                    $('#j_p').nextAll('.ui-pnotify ').remove();
                     var data={id:$(this).attr('data-id')};
                         me.imgDelRequest(data);
                });
                //搜索
                $('div[id=searchBtn]').unbind('click').click(function(){
                    var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                    me.upFileListRequst(data,Flag);
                });
                $(document).keydown(function(e) {
                    if (e.keyCode == 13) {
                       var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                           me.upFileListRequst(data);
                    }
                });
                $('#uploadPicbtn').unbind('click').click(function(){
                    me.imgUpload();
                    $('.fileBoxUl li').remove();
                    $('#upPicbut').attr('disabled',true)
                })
                
                $('#upPicbut').unbind('click').click(function(){
                    var file_data=[];//项目附件路径（数组） 选填
                    $(".fileBoxUl li").each(function(){ 
                        var titleNqame=$(this).attr('data-name');
                        var imageUrl=$(this).find('.viewThumb img').attr('src');
                        var imageSize=$(this).attr('file_size');
                        file_data.push({'title':titleNqame,'image_url':imageUrl,'size':imageSize});
                    })
                    var ObjData = {'rkylin_images':file_data}
                    me.imgAdd( ObjData )
                });
                $('#canselbtn,#canselbtn1').unbind('click').click(function(){
                    $('#upPicbut').attr('disabled',true);
                    $('.fileBoxUl>li').remove();
                    $('input[type="file"]').val('')
                    //me.imgUpload();
                })
                
            },
            imgUpload:function(){
                $('#upfile').diyUpload({
                    url:'',
                    buttonText : '+',
                    buttonText : '+',
                    chunked:false,
                    auto : false,
                    // 分片大小
                    chunkSize:1048576,
                    //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
                    fileNumLimit:50,//验证文件总数量, 超出则不允许加入队列。
                    fileSizeLimit:1048576 * 50, //验证文件总大小是否超出限制,
                    fileSingleSizeLimit:1048576,//验证单个文件大小是否超出限制
                    accept : {
                        extensions: 'jpg,gif,png',
                        mimeTypes:"image/*"
                    },
                    //配置生成缩略图的选项
                    thumb:{
                        width:1600,
                        height:1300,
                        // 图片质量，只有type为`image/jpeg`的时候才有效。
                        quality:70,
                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                        allowMagnify:false,
                        // 是否允许裁剪。
                        crop:false,
                        // 为空的话则保留原有图片格式。
                        // 否则强制转换成指定的类型。
                        type:""
                    },
                    success:function( data ) {
                        console.log( data );
                       /* localStorage.setItem('file_path',data.file_path)*/
                    },
                    error:function( err ) {
                         console.log( err );
                        //选择文件错误触发事件;
                    }

                  
                });


            },
            imgAdd:function(data){
                
                var me=this;
                var option = {
                    url : imageAddUrl,
                    dataType:'json',
                    contentType:'application/json; charset=UTF-8',
                    data:JSON.stringify(data),
                    type: 'post',
                    success: function(json) {
                        json.pageLength=pageLength;
                        $('#upPicbut').attr('disabled','false')
                        if(!json.error_response){
                            $('.fileBoxUl>li').remove();
                            $rk.listener.trigger('upFileList', 'success',json);
                            var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                            me.upFileListRequst(data);
                        }else{
                            $('.fileBoxUl>li').remove();
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        }
                    }
                }
                new Ajax(option);
            },
            upFileListRequst:function(data){
                
                var option = {
                    url : imageListUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        json.pageLength=pageLength;
                        if(!json.error_response){
                            $rk.listener.trigger('upFileList', 'success',json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            imageUpdate:function(data){
                
                var me=this;
                var option = {
                    url : imageUpdateUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        json.pageLength=pageLength;
                        if(!json.error_response){
                            $rk.listener.trigger('upFileList', 'success',json);
                            var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                            me.upFileListRequst(data);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            imgDelRequest:function(data,Flag){
              
              var me=this;
              var option = {
                    url : imageDeleteUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        json.pageLength=pageLength;
                        if(!json.error_response){
                            $rk.listener.trigger('tips', 'success','删除成功！');
                            $('.ui-pnotify ').css({'top':'40px'})
                            var data={page_num:page_current,page_size:pageLength,title:$('#title').val()};
                            me.upFileListRequst(data);
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