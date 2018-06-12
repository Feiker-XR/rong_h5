/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   chen
* @Last Modified time: 2016-02-22 14:58:49
*/
seajs.use(['Ajax','dot','Validate2'], 
    function(Ajax,dot,Validate){

    var setModel = function() {

        var saveUrl = $$r.routers.data.link.saveUrl,
            tempgetsettingUrl = $$r.routers.data.link.tempgetsettingUrl;

        var id = $rk.getUrlAllParam().id;
        //console.log(id);

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
                var html = $rk.tplRender(dot, $('#j_view_title').html(), data || {});
                this._container.html(html);
                var navstr = '<li><a href="./common/list.html?id='+id+'">一般页面</a></li>'+ 
                              '<li><a href="./special/list.html?id='+id+'">特殊页面</a></li> '+
                              '<li class="active"><a href="javascript:void(0);">模板设置</a></li>';
                $('.nav').html(navstr);
            },
            _bind: function(){
                $('#j_refresh').click(function(event) {
                    window.location.reload();
                });
            }
        });

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.formSend();
                    me._bind();
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    me._render(json);
                    me.bind();
                });
            },
            _container: $('#j_con_tab'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_tab').html(), data);
                this._container.html(html);
                $('#j_con_form').validate({
                    rules:{
                        templateName: {
                            maxlength: 4
                        }
                    }
                });
            },
            formSend: function(){
                var me = this;
                var option = {
                    url : tempgetsettingUrl,
                    data: JSON.stringify({"template_id": + id}),
                    contentType : 'application/json',
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        if(json.error_response){
                            $rk.listener.trigger('main', 'success', {"name":""});
                        }else{
                            $rk.listener.trigger('main', 'success', json.hfive_weidian_template_getsetting_response);
                        }
                    }
                }
                new Ajax(option);
            },
            bind: function() {
                var me = this;
                this._container.off("click")
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                   if(dataOp=="save_configTemp"){
                       me.saveConfigTemp($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="cancel_configTemp"){
                       me.cancelConfigTemp($(this));
                       e.preventDefault();
                   }
                });
            },
            saveConfigTemp:function(dom){
                if(!$('#templateName').val()){
                    alert("请输入页面名称！");
                    return;
                }
                if($('#j_con_form').valid()){
                   var val = $('#templateName').val();
                   var option = {
                       url : saveUrl,
                       contentType : 'application/json',
                       dataType: 'json',
                       data: JSON.stringify({"template_name":val,"template_id": + id}),
                       type: 'post',
                       success: function(json) {
                            if(json.hfive_weidian_template_setsetting_response.msg=='success'){
                                window.location.href = './common/list.html?id=' +id;
                            }else{
                                alert(json.error_response.msg);
                            }
                       }
                   }
                   new Ajax(option); 
                }
            },
            cancelConfigTemp:function(dom){
                 window.location.href = './common/list.html?id=' +id;
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});