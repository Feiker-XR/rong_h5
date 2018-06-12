



seajs.use(['Ajax','dot','pagination','tips2',"Dialog",'sortable'],
    function(Ajax,dot,pagination,Tips,Dialog,sortable){


           var setModel = function() {


              var  getTree = $$r.routers.data.link.getTree,
                    getTable = $$r.routers.data.link.getTable,
                    delTable= $$r.routers.data.link.delTable;



            var controltableedit = new $rk.VC({
                _init: function() {
                    var me = this;
                    $rk.listener.on('plat', 'ready', function(e, c) {
                        me.loading("数据加载中");
                        me._render();
                      //  me._bind();
                    });
                },

                _container: $('.main'),
                _render: function() {
                    var html = $rk.tplRender(dot, $('#mypage-control-edit-tml').html(), undefined);
                    this._container.html(html);
                },
                _bind : function(){
                    var that = this;
                    this._container.off("click");
                    this._container.on("click",'span',function(e){
                        var dataOp=this.getAttribute('data-op');
                        var siteId = $(this).attr("data-id");
                        if(dataOp=="upload"){
                            //上传按钮
                        }
                        e.preventDefault();
                    })
                },
                loading: function(text) {
                    this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
                },
                delete: function (dataId,that) {
                    var self = this;
                    var dialog = new Dialog({
                        title: '提示',
                        content: '<p class="ui-msg ui-msg-warning">确认执行删除操作?</p>',
                        confirmFun: function (dialog,button) {
                            self.delRequest(dataId,button,that);
                            window.setTimeout(function () {
                                dialog.close();

                            }, 1000)
                        }
                    });
                    dialog.open();

                },
                delRequest: function(siteId,button,that){
                    var btn = button;
                    var self = this;
                    var tip = null;
                    var option = {
                        url : delTable,
                        data : {id :siteId},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            btn.removeClass('ui-button-disabled');
                            if (json.ruixue_hfive_core_tag_microapp_mypage_table_delete.error==true) {
                                self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                                //$(that).parent().parent().remove();
                                controltable.getTableRequest();
                                setTimeout(function () {
                                    $rk.listener.trigger('list', 'change')
                                }, 500);
                            }else{
                                self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                            }

                        },
                        beforeSend: function() {
                            btn.addClass('ui-button-disabled');
                            self.delTip = new Tips({
                                button: btn,
                                content: '<div class="ui-msg ui-msg-loading">删除中</div>'
                            });
                            self.delTip.show();
                        }
                    }
                    new Ajax(option);
                }
            });




        };



        $Rk.plat.s(function(obj){
            setModel();
        });

    });
