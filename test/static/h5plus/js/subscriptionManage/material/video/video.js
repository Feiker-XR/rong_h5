/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-13 10:43:28
*/
seajs.use(['Ajax','dot','pnotify','bootstrap','zclip','mCustomScrollbar'], 
function(Ajax,dot,pnotify,bootstrap,zclip){

    var setModel = function() {

        var videoListUrl = $$r.routers.data.link.videoList,
            videoDeleteUrl = $$r.routers.data.link.videoDelete,
            videoAddUrl = $$r.routers.data.link.videoAdd;

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
                    var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                    me.upFileListRequst(data);
                });
                $rk.listener.on('upFileList', 'success', function(e, json) {
                    me.renderupFileList(json);
                    me.bindvideoList();
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
                    $('.videoContainer').toggleClass('contentRetracted');
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
                page_size=$('#videoTablemain').attr('page_size');
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
                //播放
                $('a[class=playVideo]').unbind('click').click(function(){
                    var video_url=$(this).attr('video_url');
                    var str='<video src="'+video_url+'" controls="controls" >your browser does not support the video tag</video>';
                    $('#Videotab').html(str);
                });
                //复制链接
                $('a[class=copyVideopath]').zclip({
                  path:$$r.rootUrl +'/comlibjs/third/zclip/ZeroClipboard.swf',
                  copy:function(){
                    return $(this).attr('path')
                  },
                  beforeCopy:function(){
                    $('#j_p').nextAll('.ui-pnotify ').hide();
                    $('#j_p').nextAll('.ui-pnotify ').remove();
                  },
                  afterCopy: function(){
                    $rk.listener.trigger('tips', 'success','复制链接成功'); 
                    $('.ui-pnotify ').css({'top':'40px'})
                  }
                });
                //删除
                $('a[class=deleteVideo]').unbind('click').click(function(){
                    $('#j_p').nextAll('.ui-pnotify ').hide();
                    $('#j_p').nextAll('.ui-pnotify ').remove();
                    var data={id:$(this).parents('tr').attr('id')};
                    me.soundDelRequest(data);
                });
                //搜索
                $('div[id=searchBtn]').unbind('click').click(function(){
                  console.log($('#title').val())
                    var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                    me.upFileListRequst(data);
                });
                $(document).keydown(function(e) {
                    if (e.keyCode == 13) {
                       var data={page_num:1,page_size:pageLength,title:$('#title').val()};
                        me.upFileListRequst(data);
                    }
                });
                $('#addVideoToggle').unbind('click').click(function(){
                    $('#upVideobtn').attr('disabled',true);
                })
                //视频上传调用
                $('#files').change(function(){
                    $('#upVideobtn').attr('disabled',false);
                    $('#upVideobtn').attr('data-dismiss','modal');
                    var that = $(this);
                    $('#fileName').val(that.val())
                    var This = this.files[0];
                    $('#upVideobtn').unbind('click').click(function(){
                        $('#j_p').nextAll('.ui-pnotify ').hide();
                        $('#j_p').nextAll('.ui-pnotify ').remove();
                        lastname()
                        function lastname(){
                             //获取欲上传的文件路径
                            var filepath = document.getElementById("files").value; 
                            var re = /(\+)/g; //为了避免转义反斜杠出问题，这里将对其进行转换
                            var filename=filepath.replace(re,"#");//对路径字符串进行剪切截取
                            var one=filename.split("#");
                            var two=one[one.length-1];//获取数组中最后一个，即文件名
                            var three=two.split(".");//再对文件名进行截取，以取得后缀名
                            var last=three[three.length-1];//获取截取的最后一个字符串，即为后缀名
                            var tp ="mp4";//添加需要判断的后缀名类型
                            var rs=tp.indexOf(last);//返回符合条件的后缀名在字符串中的位置
                            //如果返回的结果大于或等于0，说明包含允许上传的文件类型
                            if(rs>=0){
                                 var file_indexParam={};
                                    file_indexParam.inputName="file";
                                    file_indexParam._this=This;
                                    file_indexParam.method="POST";
                                    file_indexParam.url=hostUrl + '/auth-portal/api/upload?method=ruixue.hfive.core.filemanager.activity.multimedia.upload';
                                    me.videoUpload(file_indexParam);
                                 return true;
                             }else{
                                $('#fileName').val('')
                                $rk.listener.trigger('tips', 'success','上传的文件仅支持mp4格式！');
                                $('.ui-pnotify ').css({'top':'40px'})
                                return false;
                                 
                              }
                        }
                        
                    })
                });
                $('#canselbtn,#canselbtn1').unbind('click').click(function(){
                    $('#upVideobtn').attr('data-dismiss','');
                    $('#fileName,#files').val('');
                })
                $('#canselVideo').unbind('click').click(function(){
                    var myVideo = document.getElementsByTagName('video')[0];
                        myVideo.pause();
                        $('#Videotab').html('');

                })
            },
            videoUpload:function(param){
                var me=this;
                console.log(param._this)
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                XMLHttpReq.withCredentials=true;
                var formData=new FormData();
                formData.append(param.inputName, param._this);
                XMLHttpReq.open(param.method,param.url,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            if(JSON.parse(XMLHttpReq.responseText).callResult){
                                $(param._this).attr('url',JSON.parse(XMLHttpReq.responseText).oss_path);
                                localStorage.setItem('oss_path',JSON.parse(XMLHttpReq.responseText).oss_path)
                                localStorage.setItem('file_name',JSON.parse(XMLHttpReq.responseText).file_name)
                                localStorage.setItem('file_size',JSON.parse(XMLHttpReq.responseText).file_size)
                                $('#upVideobtn').attr('disabled',false);
                                var fileData={title:JSON.parse(XMLHttpReq.responseText).file_name,video_url:JSON.parse(XMLHttpReq.responseText).oss_path,size:JSON.parse(XMLHttpReq.responseText).file_size}
                                    me.videoAdd(fileData)
                            }else{
                                JSON.parse(XMLHttpReq.responseText).code=0;
                                $('#fileName,#files').val('');
                                $rk.listener.trigger('tips', 'success',JSON.parse(XMLHttpReq.responseText).msg);
                                //console.log(JSON.parse(XMLHttpReq.responseText).msg)
                            }     
                        }
                    }
                }
 

            },
            videoAdd:function(data){
              var me=this;
              var option = {
                    url : videoAddUrl,
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
                        $('#upVideobtn').attr('disabled',true);
                        $('#upVideobtn').attr('data-dismiss','');
                        $('#fileName,#files').val('');
                        localStorage.removeItem('oss_path')
                        localStorage.removeItem('file_name')
                        localStorage.removeItem('file_size')
                    }
                }
                new Ajax(option);
            },
            upFileListRequst:function(data){
                var option = {
                    url : videoListUrl,
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
            soundDelRequest:function(data){
              var me=this;
              var option = {
                    url : videoDeleteUrl,
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