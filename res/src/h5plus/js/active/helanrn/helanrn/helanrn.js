/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-12 14:34:29
*/
var m1=null,u1=null,$arr=[];
seajs.use(['Ajax','dot','iscroll','pnotify'], 
    function(Ajax,dot,iscroll,pnotify){

    var setModel = function() {

        var imageTextMenuUrl = $$r.routers.data.link.imageTextMenu,
            imageTextSaveUrl = $$r.routers.data.link.imageTextSave,
            goodsListUrl = $$r.routers.data.link.goodsList,
            imgFileUrl= $$r.routers.data.link.imgUpload;
        var data;

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.render();
                    me.bind();
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
                m1=me;
                //获取活动页面信息
                me.imageTextMenuRequest({'activity_id':"4ff47baa-1e37-11e6-9979-001e67c7eaf9"});
                //实例化编辑器
                $('.right').append('<script id="editor" type="text/plain"></script>');
                var ue = UE.getEditor('editor',{
                    initialFrameWidth:'auto'
                    ,toolbars: [[
                            'undo', 'redo', '|','fontsize', '|', 'blockquote','horizontal', '|','removeformat', 'formatmatch','|','link', 'unlink', '|','simpleupload',
                            'bold', 'italic', 'underline', 'forecolor', 'backcolor','|','indent','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','rowspacingtop', 'rowspacingbottom', 'lineheight', '|','insertorderedlist', 'insertunorderedlist', '|','imagenone', 'imageleft', 'imageright', 'imagecenter', '|'
                        ]]
                    ,initialFrameHeight:471
                    ,elementPathEnabled : false
                    ,maximumWords:20000
                    ,wordCountMsg:'{#count}/20000'
                    ,enableAutoSave: false
                    ,saveInterval: 5000000000000000000
                });
                u1=ue;
                ue.ready(function(){
                    //编辑器增加添加正文、标题、作者、原文链接且样式有所修改
                    var $body=$($('#ueditor_0')[0].contentWindow.document.body);
                    $('#edui33').after('<br>');
                    $body.css({'padding':'14px 60px 0','margin':0,'color':'#999'});
                    //设置编辑器工具栏是否可用
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
                    ue.addListener("keyup", function (type, event) {   
                        $('.moni').html(ue.getContent())
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
                                ue.execCommand('inserthtml','<p class="insertimg"><img src="'+oss_path+'"></p>');
                                $('.moni').html(ue.getContent())
                            }else{
                                $rk.listener.trigger('tips', 'success', XMLHttpReq.responseText); 
                            }    
                        }
                        $(this).val('');
                    });
                    //富文本撤销
                    $('body.helanrn').on('click','.edui-box.edui-icon.edui-default',function(){
                        $('.moni').html(ue.getContent())
                    })

                    //超链接
                    $('#edui30').click(function(){
                        $('#edui24_iframe').attr('src',location.href.split('.html')[0]+'/link/link1');
                    })
                    //实时改变活动title
                    $('#staff_number').on('keyup',function(){
                        $('.imageTextConTit').html('<span class="fanhui"><返回</span>'+$(this).val()+'<span class="dian">...</span>');
                    })

                    //关闭选择商品
                    $("#quxiao,#quxiao1").on('click',function(){
                        $('#dig-select-wood-chair').addClass('hide');
                    })
                    //确定选择商品
                    $("#queding").on('click',function(){
                        if($(this).attr('name')){
                            $('#dig-select-wood-chair').addClass('hide');
                            document.getElementById('edui24_iframe').contentWindow.getName($(this).attr('name'));
                        }else{
                            alert('请选择商品');
                        }
                    })
                    $('#moodtable').on('change','input',function(){
                        if($(this).prop('checked')){
                            $("#queding").attr('name',$(this).parents('tr').attr('id'));
                        }
                    })
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
                //刷新提示保存
                window.onbeforeunload=function(){
                    if(JSON.stringify(data[0])!='{}'){
                        return "页面未保存，请点击下方的保存按钮进行保存！";
                    }
                }
                //保存页面
                $('button[data_id=save]').click(function(){
                    var param={
                                "activity_id": "4ff47baa-1e37-11e6-9979-001e67c7eaf9",    //string型,必须,【活动id】
                                "name": $('#staff_number').val(),    //string型,必须,【活动名称】
                                "info": ue.getContent(),    //string型,必须,【活动富文本信息】
                                "product_infos":$arr
                            }
                    me.imageTextSaveRequest(JSON.stringify(param));
                });
                //顶部导航
                $('ul[data_id=navTop] li:first').click(function(){
                    window.parent.location.href=homePage;
                });
            },
            imageTextMenuRequest:function(param){   
                var option = {
                    url : imageTextMenuUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                   // contentType: "application/json;charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function(json) {
                        if(!json.error_response){
                            var data=json.hfive_weidian_staffsale_activity_get_response;
                            u1.setContent(data.info);
                            $('.moni').html(data.info);
                            $('#staff_number').val(data.name);
                            $.each(data.product_infos,function(i,v){
                                $arr.push(v);
                            })
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
                XMLHttpReq.withCredentials = true;
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
            imageTextSaveRequest:function(param){   //保存富文本信息
                var option = {
                    url : imageTextSaveUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('tips', 'success','页面保存成功！');
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        }
                    }
                }
                new Ajax(option); 
            },
            goodsListUrlRequest:function(param){
                var option = {
                    url : goodsListUrl,
                    dataType:'json',
                    data:param,
                    type: 'post',
                    contentType: "application/json;charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function(json) {
                        if(!json.error_response){
                            var html='';
                            var data=json.hfive_weidian_goods_list_response;
                            $.each(data.list,function(i,v){
                                html+='<tr id="'+v.product_id+'">'
                                    +   '<td>'
                                    +       '<input type="radio" style="margin: -3px 0 0;" name="radioname" value="'+(i+1)+'">'
                                    +   (i+1)+'</td>'
                                    +   '<td>'+v.name+'</td>'
                                    +   '<td>----</td>'
                                    + '</tr>';

                            })
                            $('#moodtable').html(html);
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

function getParent(){
   var $commodity=$('#edui24_iframe').contents().find("#commodity");
   var $link=$('#edui24_iframe').contents().find("#link");
   var $link_c=$('#edui24_iframe').contents().find("#link_c");
   //选择商品

   $commodity.on('click',function(){
       $('#dig-select-wood-chair').removeClass('hide');
       var param={
               "page": 1,    //int型,【获取的页数】
               "page_size": 10    //int型,【每页的条数】
           }
       m1.goodsListUrlRequest(JSON.stringify(param));
   })

   $link.on('change',function(){
       var ii=$(this).val();
       $link_c.children().eq(ii).removeClass('hide').siblings().addClass('hide');
   })
}

function getEDITORUI(){
     return $EDITORUI["edui28"]._onClick(event, this);
}

function setArr(arr){
     $arr.push(arr);
}
