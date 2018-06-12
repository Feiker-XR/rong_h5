/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-12 14:34:29
*/
seajs.use(['Ajax','dot','iscroll','pnotify','migrate','bootstrap','jqui','mousewheel','mCustomScrollbar'], 
    function(Ajax,dot,iscroll,pnotify,migrate,bootstrap,jqui,mousewheel,mCustomScrollbar){

    var setModel = function() {

        var imageTextMenuUrl = $$r.routers.data.link.imageTextMenu,
            imgFileUrl= $$r.routers.data.link.imgUpload,
            videoFileUrl= $$r.routers.data.link.videoUpload,
            imageLibAddUrl = $$r.routers.data.link.imageLibAdd,
            videoLibAddUrl = $$r.routers.data.link.videoLibAdd,
            audioLibAddUrl = $$r.routers.data.link.audioLibAdd,
            imgTextSaveUrl = $$r.routers.data.link.imgTextSave;
        var data,
            dataDel=[],
            hostUrl='http://'+window.location.host,
            defaultImgUrl=hostUrl+'/static/h5plus/img/default.png',
            homePage=hostUrl+'/pc/photon.html';
        var saveFlag=0;

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.render();
                    me.bind();
                });
                $rk.listener.on('imageTextMenu', 'success', function(e, json) {
                    me.renderImageTextMenu(json);
                    me.bindImageTextMenu();
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
                //实例化编辑器
                $('.right').prepend('<script id="editor" type="text/plain"></script>');
                var ue = UE.getEditor('editor',{
                    initialFrameWidth:'auto'
                    ,toolbars: [[
                            'undo', 'redo', '|','fontsize', '|', 'blockquote','horizontal', '|','removeformat', 'formatmatch','|','link', 'unlink', '|','simpleupload','insertvideo','music',
                            'bold', 'italic', 'underline', 'forecolor', 'backcolor','|','indent','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','rowspacingtop', 'rowspacingbottom', 'lineheight', '|','insertorderedlist', 'insertunorderedlist', '|','imagenone', 'imageleft', 'imageright', 'imagecenter', '|'
                        ]]
                    ,initialFrameHeight:350
                    ,elementPathEnabled : false
                    ,maximumWords:20000
                    ,wordCountMsg:'{#count}/20000'
                    ,enableAutoSave: false
                    ,saveInterval: 5000000000000000000
                    ,imageScaleEnabled:false
                    ,wordCount:false
                });
                ue.ready(function(){
                    //编辑器增加添加正文、标题、作者、原文链接且样式有所修改
                    var $body=$($('#ueditor_0')[0].contentWindow.document.body);
                    $('#edui43').after('<br>');
                    $('#editor #edui1_toolbarbox').after('<div class="paddingLR60" data_id="toolMask"><div class="articleTit"><input placeholder="在这里输入图文标题" data_id="inputArticleTit" maxlength="64"><span><span data_id="articleTitLength">0</span>/64</span></div><div class="articleAuthor"><input placeholder="请输入图文作者" data_id="inputArticleAuthor" maxlength="8"><span><span data_id="articleAuthorLength">0</span>/8</span></div><div class="imageTextArticle"><span class="checkboxActive"><input type="checkbox" checked></span><label>添加正文</label></div></div>');
                    $body.css({'padding':'14px 60px 0','margin':0,'color':'#999'});
                    $('#edui1_bottombar').append('<div class="imageTextLink"><span class="checkboxActive"><input type="checkbox" checked></span><label>原文链接</label></div><div class="control-group row-fluid" data_id="inputLinkShow"><div class="controls"><input type="text" value="http://" data_id="inputLink"></div></div>').css('padding-bottom','15px');
                    //设置编辑器工具栏是否可用
                    $('#edui1_iframeholder').append('<p class="tips">在这里编写图文正文</p>');
                    ue.setDisabled();
                    $('.edui-default .edui-toolbar #edui33 .edui-state-disabled .edui-icon').css('opacity','0.3');
                    $('div[data_id=toolMask]').click(function(){
                        ue.setDisabled();
                        $('.edui-default .edui-toolbar #edui33 .edui-state-disabled .edui-icon').css('opacity','0.3');
                    });
                    $body.click(function(){
                        ue.setEnabled();
                        $('.edui-default .edui-toolbar #edui33 .edui-state-disabled .edui-icon').css('opacity','1');
                    });
                    //本地保存
                    var url=decodeURI(location.href);
                    var id=url.substring(url.search(/\?/) + 1).split('=')[1];
                    if(id){
                        var param={id:id};
                        me.imageTextMenuRequest(param);
                    }else{
                        $('ul[data_id=imageTextMenu]').append('<li class="liActive"><a href="javascript:void(0);"><img src="'+defaultImgUrl+'" data_id="imageTextMain"><div class="imgeTextMainTit"><span>标题</span></div></a></li>');
                        data=[{jump_type:1}];
                    }
                    //多选框
                    $('.imageTextArticle span').click(function(){
                        if($(this).find('input').is(':checked')){
                            $(this).addClass('checkboxActive');
                            $('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').show();
                            $('.imageTextArticle').css('border-bottom','1px solid #d2d3d4');
                        }else if($('.imageTextLink span input').is(':checked')){
                            ue.setContent('');
                            $('.tips').show();
                            var index=$('.liActive').index('.left li');
                            data[index].content='';
                            console.log('imageTextArticle data->'+JSON.stringify(data));
                            $(this).removeClass('checkboxActive');
                            $('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').hide();
                            $('.imageTextArticle').css('border-bottom','none');
                        }else{
                            $.pnotify({
                                        title: '提示',
                                        type: 'info',
                                        text: '添加正文和原文链接不可全部取消！'
                                    });
                            $(this).find('input').prop('checked',true);
                        }
                    });
                    $('.imageTextLink span').click(function(){
                        if($(this).find('input').is(':checked')){
                            var index=$('.liActive').index('.left li');
                            data[index].jump_type=1;
                            data[index].jump_url=$(this).val();
                            $(this).addClass('checkboxActive');
                            $('div[data_id=inputLinkShow]').show();
                            console.log('imageTextLink1 data->'+JSON.stringify(data));
                        }else if($('.imageTextArticle span input').is(':checked')){
                            $('input[data_id=inputLink]').val('http://');
                            var index=$('.liActive').index('.left li');
                            data[index].jump_type=0;
                            $(this).removeClass('checkboxActive');
                            $('div[data_id=inputLinkShow]').hide();
                            console.log('imageTextLink2 data->'+JSON.stringify(data));
                        }else{
                            $.pnotify({
                                        title: '提示',
                                        type: 'info',
                                        text: '添加正文和原文链接不可全部取消！'
                                    });
                            $(this).find('input').prop('checked',true);
                        }
                    });
                    //左右同步更新
                    $('input[data_id=inputArticleTit]').keyup(function(){
                        if($('.liActive').index('.left li')==0){
                            $('.liActive .imgeTextMainTit span').html($(this).val());
                        }else{
                            $('.liActive .imageTextSubTit').html($(this).val());
                        }
                        $('span[data_id=articleTitLength]').html($(this).val().length);
                    });
                    //内容改变存入本地缓存
                    $('input[data_id=inputArticleTit]').change(function(){
                            var index=$('.liActive').index('.left ul li');
                            data[index].title=$(this).val();
                            console.log('title data->'+JSON.stringify(data));
                    });
                    $('input[data_id=inputArticleAuthor]').change(function(){
                        var index=$('.liActive').index('.left ul li');
                        data[index].author=$(this).val();
                        console.log('author data->'+JSON.stringify(data));
                    }).keyup(function(){
                        $('span[data_id=articleAuthorLength]').html($(this).val().length);
                    });
                    $('input[data_id=inputLink]').change(function(){
                        if($('.imageTextLink span input').is(':checked')){
                            var index=$('.liActive').index('.left ul li');
                            data[index].jump_url=$(this).val();
                        }
                        console.log('link data->'+JSON.stringify(data));
                    });
                    $('textarea[data_id=summaryImageText]').change(function(){
                        var index=$('.liActive').index('.left ul li');
                        data[index].summary=$(this).val();
                        console.log('summary data->'+JSON.stringify(data));
                    }).keyup(function(){
                        $('span[data_id=summaryLength]').html($(this).val().length);
                    });
                    $('input[data_id=fileImageText]').change(function(){
                        var param={};
                        param.inputName='file';
                        param._this=this;
                        param.method='POST';
                        me.imgFileRequest(param,imageUploadCover);
                        function imageUploadCover(rs){
                            if(rs.callResult){
                                var oss_path=rs.oss_path;
                                var index=$('.liActive').index('.left ul li');
                                data[index].image_url=oss_path;
                                $('.liActive img').attr('src',oss_path);
                                $(param._this).attr('url',oss_path);
                                $('.imageExmple img').attr('src',oss_path);
                                $('.imageExmple').show();
                                console.log('file data->'+JSON.stringify(data));
                                var paramImgLibAdd={title:rs.file_name,image_url:'oss_path',size:rs.file_size};
                                me.imageLibAddRequest(paramImgLibAdd); 
                            }else{
                                $rk.listener.trigger('tips', 'success', XMLHttpReq.responseText); 
                            }    
                        }
                        $(this).val('');
                    });
                    ue.addListener("blur", function (type, event) {
                        var index=$('.liActive').index('.left ul li');
                        var content=ue.getContent();
                        if(content){
                            data[index].content=content;
                        }else{
                            data[index].content='';
                            $('.tips').show();
                        }
                        console.log('content data->'+JSON.stringify(data));
                    });
                    //提示隐藏
                    ue.addListener("focus", function (type, event) {
                        $('.tips').hide();
                    })
                    $('.tips').click(function(){
                        $body.click();
                    });
                    $(document).scroll(function() {
                      $('.panelSelf').height($(document).scrollTop()+$(window).height());
                    });
					//编辑器图片上传
					$('#edui33').append('<div class="uploadImg" data_id="uploadImgRequest"><input type="file"></div>');
					$('div[data_id=uploadImgRequest] input').change(function(){
						var param={};
						param.inputName='file';
						param._this=this;
						param.method='POST';
						me.imgFileRequest(param,imageUploadUeditor);
                        function imageUploadUeditor(rs){
                            if(rs.callResult){
                                var oss_path=rs.oss_path;
                                ue.focus();
                                ue.execCommand('inserthtml','<img src="'+oss_path+'">');
                                console.log('file data->'+JSON.stringify(data));
                                var paramImgLibAdd={title:rs.file_name,image_url:'oss_path',size:rs.file_size};
                                me.imageLibAddRequest(paramImgLibAdd); 
                            }else{
                                $rk.listener.trigger('tips', 'success', XMLHttpReq.responseText); 
                            }    
                        }
						$(this).val('');
					});
                    //编辑器视频上传
                    $('#edui38').append('<div class="uploadImg" data_id="uploadVideoRequest"><input type="file"></div>');
                    $('div[data_id=uploadVideoRequest] input').change(function(){
                        var param={};
                        param.inputName='file';
                        param._this=this;
                        param.method='POST';
                        me.videoFileRequest(param,videoUploadUeditor);
                        function videoUploadUeditor(rs){
                            if(rs.callResult){
                                var oss_path=rs.oss_path;
                                ue.focus();
                                ue.execCommand('inserthtml','<video src="'+oss_path+'" controls="controls">your browser does not support the video tag</video>');
                                console.log('file data->'+JSON.stringify(data));
                                var paramVideoLibAdd={title:rs.file_name,video_url:'oss_path',size:rs.file_size};
                                me.videoLibAddRequest(paramVideoLibAdd); 
                            }else{
                                $rk.listener.trigger('tips', 'success', XMLHttpReq.responseText); 
                            }    
                        }
                        $(this).val('');
                    });
                    //编辑器音频上传
                    $('#edui43').append('<div class="uploadImg" data_id="uploadAudioRequest"><input type="file"></div>');
                    $('div[data_id=uploadAudioRequest] input').change(function(){
                        var param={};
                        param.inputName='file';
                        param._this=this;
                        param.method='POST';
                        me.videoFileRequest(param,audioUploadUeditor);
                        function audioUploadUeditor(rs){
                            if(rs.callResult){
                                var oss_path=rs.oss_path;
                                ue.focus();
                                ue.execCommand('inserthtml','<audio controls="controls"><source src="'+oss_path+'">你的浏览器不支持video标签。</audio>');
                                console.log('file data->'+JSON.stringify(data));
                                var paramAudioLibAdd={title:rs.file_name,sound_url:'oss_path',size:rs.file_size};
                                me.audioLibAddRequest(paramAudioLibAdd); 
                            }else{
                                $rk.listener.trigger('tips', 'success', XMLHttpReq.responseText); 
                            }    
                        }
                        $(this).val('');
                    });
                });
                //滚动条
                var myScroll;
                function loaded() {
                    myScroll = new iScroll('wrapper',{useTransform:false});
                }
                loaded();
                //触发change
                function changeTrigger(){
                    if($(document.activeElement.outerHTML).attr('id')=='ueditor_0'){
                        ue.trigger("blur");
                    }else if($(document.activeElement.outerHTML).attr('data_id')=='fileImageText'){
                        
                    }else{
                        $(document.activeElement).blur().change();
                    }
                }
                //添加图文
                $('.imageTextAdd').click(function(){
                    changeTrigger();
                    $('span[data_id=articleTitLength]').html(0);
                    $('span[data_id=articleAuthorLength]').html(0);
                    $('span[data_id=summaryLength]').html(0);
                    $('#edui1').find('input').val('');
                    $('.imageTextArticle span,.imageTextLink span').addClass('checkboxActive');
                    $('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount,div[data_id=inputLinkShow]').show();
                    $('.imageTextArticle').css('border-bottom','1px solid #d2d3d4');
                    $('.imageTextArticle input').prop('checked',true);
                    ue.setContent('');
                    $('.tips').show();
                    $('input[data_id=inputLink]').val('http://');
                    $('.imageTextLink input').prop('checked',true);
                    $('input[data_id=fileImageText]').attr('url','');
                    $('.imageExmple img').prop('src','');
                    $('.imageExmple').hide();
                    $('textarea[data_id=summaryImageText]').val('');
                    $('.left ul li').removeClass('liActive');
                    if($('.left ul li').length>1){
                        $('.left ul li:last .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
                    }
                    var $li=$('<li class="liActive"><a href="javascript:void(0);"><div class="paddingLeftLi"><div class="imgSub"><img src="'+defaultImgUrl+'" data_id="imageTextSub"></div><div class="imageTextSubTit">标题</div></div><div class="imageTextSubMask"></div><div class="imageTextSubMaskCon"><span class="imageTextUp"></span><span class="imageTextDel"></span></div></a></li>');
                    $('.left ul').append($li);
                    data.push({jump_type:1});
                    if($('.left ul li').length==2){
                        $('.left ul li:first a').append('<div class="imageTextSubMask"></div><div class="imageTextSubMaskCon"><span class="imageTextDown"></span></div>');
                    }
                    myScroll.refresh();
                });
                //删除图文
                $('.left ul').on('click','.imageTextDel',function(){
                    $('#delTip .btn-primary').prop('_this',this);
                });
                $('#delTip .btn-primary').click(function(){
                    changeTrigger();
                    var $this=$($(this).prop('_this'));
                    var $li=$this.parents('li');
                    var index=$li.index('.left ul li');
                    if($li.hasClass('liActive')){
                        $('.left ul li:first').click();
                    }
                    var del=data.splice(index,1);
                    dataDel.push(del[0].id);
                    $li.remove();
                    $('.left li:last .imageTextDown').remove();
                    myScroll.refresh();
                    console.log('del data->'+JSON.stringify(data));
                    $('#delTip a[data-dismiss=modal]').click();
                    return false;
                });
                //编辑图文
                $('.left ul').on('click','li',function(){
                    changeTrigger();
                    var index=$(this).index('.left ul li');
                    $(this).addClass('liActive').siblings().removeClass('liActive');
                    $('input[data_id=inputArticleTit]').val(data[index].title||'');
                    $('input[data_id=inputArticleAuthor]').val(data[index].author||'');
                    console.log(data);
                    if(data[index].content){
                        $('.tips').hide();
                        $('.imageTextArticle input').prop('checked',true);
                        ue.setContent(data[index].content);
                        $('.imageTextArticle span').addClass('checkboxActive');
                        $('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').show();
                        $('.imageTextArticle').css('border-bottom','1px solid #d2d3d4');
                    }else{
                        $('.tips').show();
                        ue.setContent('');
                        $('.imageTextArticle input').attr('checked',false);
                        $('.imageTextArticle span').removeClass('checkboxActive');
                        $('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').hide();
                        $('.imageTextArticle').css('border-bottom','none');
                    }
                    if(data[index].jump_type){
                        $('.imageTextLink input').prop('checked',true);
                        $('.imageTextLink span').addClass('checkboxActive');
                        $('div[data_id=inputLinkShow]').show();
                        $('input[data_id=inputLink]').val(data[index].jump_url||'http://');
                    }else{
                        $('.imageTextLink input').attr('checked',false);
                        $('.imageTextLink span').removeClass('checkboxActive');
                        $('div[data_id=inputLinkShow]').hide();
                        $('input[data_id=inputLink]').val('http://');
                    }
                    if(data[index].image_url){
                        $('input[data_id=fileImageText]').attr('url',data[index].image_url);
                        $('.imageExmple img').attr('src',data[index].image_url);
                        $('.imageExmple').show();
                    }else{
                        $('input[data_id=fileImageText]').attr('url','');
                        $('.imageExmple img').attr('src','');
                        $('.imageExmple').hide();
                    }
                    $('textarea[data_id=summaryImageText]').val(data[index].summary||'');
                    $('span[data_id=articleTitLength]').html($('input[data_id=inputArticleTit]').val().length);
                    $('span[data_id=articleAuthorLength]').html($('input[data_id=inputArticleAuthor]').val().length);
                    $('span[data_id=summaryLength]').html($('textarea[data_id=summaryImageText]').val().length);
                })
                //移动图文
                $('.left ul').on('click','.imageTextDown',function(){
                    changeTrigger();
                    var $li=$(this).parents('li');
                    var index=$li.index('.left ul li');
                    var temp=data[index];
                    data[index]=data[index+1];
                    data[index+1]=temp;
                    if(index==0){
                        $('.left ul li:eq(1)').click();
                        $('.left ul li:eq(0) .imgeTextMainTit span').html(data[index].title||'');
                        $('.left ul li:eq(0) img[data_id=imageTextMain]').prop('src',data[index].image_url||defaultImgUrl);
                        $('.left ul li:eq(1) .imageTextSubTit').html(data[index+1].title||'');
                        $('.left ul li:eq(1) img[data_id=imageTextSub]').prop('src',data[index+1].image_url||defaultImgUrl);
                    }else if(index==$('.left ul li').length-2){
                        $('.left ul li:eq('+(index+1)+')').after($li);
                        $('.left ul li:eq('+(index+1)+')').click();
                        $('.left ul li:eq('+($('.left ul li').length-2)+') .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
                        $('.left ul li:last .imageTextSubMaskCon .imageTextDown').remove();
                    }else{
                        $('.left ul li:eq('+(index+1)+')').after($li);
                        $('.left ul li:eq('+(index+1)+')').click();
                    }
                    console.log('down data->'+JSON.stringify(data));
                    return false;
                });
                $('.left ul').on('click','.imageTextUp',function(){
                    changeTrigger();
                    var $li=$(this).parents('li');
                    var index=$li.index('.left ul li');
                    var temp=data[index];
                    data[index]=data[index-1];
                    data[index-1]=temp;
                    console.log('data->'+JSON.stringify(data));
                    if(index==1){
                        $('.left ul li:eq(0)').click();
                        $('.left ul li:eq(0) .imgeTextMainTit span').html(data[0].title);
                        $('.left ul li:eq(0) img[data_id=imageTextMain]').prop('src',data[0].image_url||defaultImgUrl);
                        $('.left ul li:eq(1) .imageTextSubTit').html(data[index].title);
                        $('.left ul li:eq(1) img[data_id=imageTextSub]').prop('src',data[index].image_url||defaultImgUrl);
                    }else if(index==$('.left ul li').length-1){
                        $('.left ul li:eq('+(index-1)+')').before($li);
                        $('.left ul li:eq('+(index-1)+')').click();
                        $('.left ul li:eq('+($('.left ul li').length-2)+') .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
                        $('.left ul li:last .imageTextSubMaskCon .imageTextDown').remove();
                    }else{
                        $('.left ul li:eq('+(index-1)+')').before($li);
                        $('.left ul li:eq('+(index-1)+')').click();
                    }
                    return false;
                    console.log('up data->'+JSON.stringify(data));
                });
                //刷新提示保存
                window.onbeforeunload=function(){
                    if(JSON.stringify(data[0])!='{}'){
                        return "图文未保存，请点击下方的保存按钮进行保存！";
                    }
                }
                //删除图片
                $('span[data_id=imageDel]').click(function(){
                    if($('.liActive').index($('ul[data_id=imageTextMenu] li'))==0){
                        $(this).prev('img').prop('src',defaultImgUrl);
                        $('.liActive img').prop('src',defaultImgUrl);
                    }else{
                        $(this).prev('img').prop('src',defaultImgUrl);
                        $('.liActive img').prop('src',defaultImgUrl);
                    }
                    $(this).parents('.imageExmple').hide();
                    $('input[data_id=fileImageText]').attr('url','');
                });
                //保存图文
                $('button[data_id=save]').click(function(){
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        data[i].parent_ids=null;
                        data[i].children_ids=null;
                        if(!data[i].title){
                            $rk.listener.trigger('tips', 'success','图文标题不能为空！'); 
                            $('.left li:eq('+i+')').click();
                            return false;
                        }else if(!data[i].image_url){
                            $rk.listener.trigger('tips', 'success','图文封面图片不能为空！'); 
                            $('.left li:eq('+i+')').click();
                            return false;
                        }
                    }
                    if(saveFlag==0){
                        var param={"image_texts":data,"delete_ids":dataDel};
                        console.log(JSON.stringify(param));
                        me.imageTextSaveRequest(JSON.stringify(param));
                        saveFlag=1;
                    }
                });
                //顶部导航
                $('ul[data_id=navTop] li:first').click(function(){
                    window.parent.location.href=homePage;
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
                $('.panel-slider-arrow').on('click', function(){
                    $('.panel,.panel-content').toggleClass('retracted');
                    $('.imageTextContent').toggleClass('contentRetracted');
                    $('.saveBtns').css('width',($('.imageTextCon').width()+parseInt($('.imageTextCon').css('padding-left'))+parseInt($('.imageTextCon').css('padding-right')))+'px');
                });
                $('.mCSB_container').css('position','static');
                $('ul[data_id=imageTextMenuLeft] li').unbind('click').click(function(){
                    window.location.href=$$r.hosts+$(this).attr('url')+ RKC.mainSuffix;
                });
                $('.saveBtns').css('width',($('.imageTextCon').width()+parseInt($('.imageTextCon').css('padding-left'))+parseInt($('.imageTextCon').css('padding-right')))+'px');
            },
            bindImageTextMenu:function(){
                $('ul[data_id=imageTextMenu] li:first').click();
            },
            renderImageTextMenu:function(param){
                var html = $rk.tplRender(dot, $('#j_view_ImageTextMenu').html(), param||{});
                this.container.find('ul[data_id=imageTextMenu]').html(html);
            },
            imageTextMenuRequest:function(param){
                var option = {
                    url : imageTextMenuUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            data=json.hfive_wechat_imagetext_query_response.imagetexts.imagetext;
                            json.defaultImgMainUrl=defaultImgUrl;
                            json.defaultImgSubUrl=defaultImgUrl;
                            $rk.listener.trigger('imageTextMenu', 'success',json);
                            saveFlag=0;
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            imgFileRequest:function(param,callback){
                var me=this;
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                XMLHttpReq.open(param.method,imgFileUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            callback(JSON.parse(XMLHttpReq.responseText));
                             
                        }
                    }
                }
            },
            videoFileRequest:function(param,callback){
                var me=this;
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                XMLHttpReq.open(param.method,videoFileUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            callback(JSON.parse(XMLHttpReq.responseText));
                             
                        }
                    }
                }
            },
            imageLibAddRequest:function(param){
               var option = {
                    url : imageLibAddUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            console.log(json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option); 
            },
            videoLibAddRequest:function(param){
                var option = {
                    url : videoLibAddUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            console.log(json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            audioLibAddRequest:function(param){
                var option = {
                    url : audioLibAddUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            console.log(json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            imageTextSaveRequest:function(param){
                var me=this;
                var option = {
                    url : imgTextSaveUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    contentType:"application/json",
                    success: function(json) {
                        console.log(json);
                        if(!json.error_response){
                            $rk.listener.trigger('tips', 'success','图文保存成功！');
                            var param={id:json.hfive_wechat_imagetext_save_response.main_image_text_id};
                            me.imageTextMenuRequest(param);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
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