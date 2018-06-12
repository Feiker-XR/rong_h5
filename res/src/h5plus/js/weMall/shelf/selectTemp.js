/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   chen
* @Last Modified time: 2016-02-22 14:58:49
*/
seajs.use(['Ajax','dot'], 
    function(Ajax,dot){

    var setModel = function() {

        var listUrl = $$r.routers.data.link.list;
        var main = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.loading("数据加载中");
                    me.formSend();
                    me._bind();
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    me._render(json);
                });
            },
            _container: $('#j_con_table'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_table').html(), data || {});
                this._container.html(html);
            },
            _bind : function(){
                var that = this;
                this._container.off("click")
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                    if(dataOp=="selTemp"){
                        that.selTemp($(this));
                        e.preventDefault();
                    }
                })
            },
            selTemp: function(dom){
                var id = dom.attr('data-id');
                window.location.href = './common/list.html' + '?id=' + id;
            },
            formSend :function(){
                var me = this;
                var option = {
                    url : listUrl,
                    contentType : 'application/json',
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        if(json.hfive_weidian_template_list_response){
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
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});