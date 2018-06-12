/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   zhaoxiaoyang
* @Last Modified time: 2016-02-22 14:58:49
*/
seajs.use(['Ajax','dot'], 
    function(Ajax,dot){

    var setModel = function() {

        /*var listUrl = $$r.routers.data.link.list,
            destroyUrl = $$r.routers.data.link.delete,
            editUrl = $$r.routers.data.link.getDetail,
            details = $$r.routers.data.details;*/

        /*var title = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, json) {
                    me._render(json);
                    // me._bind();
                });
            },
            _container: $('#j_con_title'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_title').html(), data || {});
                this._container.html(html);
            },
            _bind: function(){
                var me = this;
                this._container.on("click",'[data-op="upline"]',function(){
                    main.upline($(this));
                });
            }
        });*/

        /*var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, json) {
                    me._render(json.data);
                    me.bind();
                })

                $rk.listener.on('list', 'change', function() {
                  me.formSend();
                })
            },
            _container: $('#j_con_tab'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_tab').html(), data.form || {});
                this._container.html(html);
            },
            bind: function() {
                var me = this;
                var form = this._container.find('form');
                form.on('click','[data-op="sb"]',function(e) {
                    e.preventDefault();
                    $rk.listener.trigger('main', 'requesting', '数据加载中');
                    me.formSend();
                });

            },
            formSend :function(){
                var button = this._container.find('[type="submit"]');
                var siteName = this._container.find('[type="text"]').val();
                var me = this;
                var option = {
                    url : listUrl,
                    data : $rk.plat.serializeObject(me._container.find('form')),
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        button.removeClass("ui-button-disabled");
                        $rk.listener.trigger('main', 'success', json);
                    },
                    beforeSend:function(){
                        button.addClass("ui-button-disabled");
                        me.delTip = new Tips({
                            button: button,
                            content: '<div class="ui-msg ui-msg-loading">检索中</div>'
                        });
                        me.delTip.show();
                    }
                }
                new Ajax(option);
            }
        });*/

        var main = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.loading("数据加载中");
                    //me.formSend();
                    me._bind();
                    //me.myFunction();
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    // 计算nav 的个数 和 宽度 滚动效果
                    //me._render(json);
                });
                $rk.listener.on('pager', 'send', function(e, num) {
                    $rk.listener.trigger('main', 'requesting', '数据加载中');
                    //me.setPage(num);
                    //me.formSend();
                });
            },
            /*myFunction:function(){
                var me = this;
                me._container.on('change','[data-op="myFunction"]',function(){
                    //执行的方法
                })
            },*/
            _container: $('#j_con_table'),
            _render: function(data) {
                /*data.details = details
                var html = $rk.tplRender(dot, $('#j_view_table').html(), data);
                this._container.html(html);*/
            },
            _bind : function(){
                var that = this;
                this._container.off("click")
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                    var siteId = $(this).attr("data-id");
                    
                    if(dataOp=="copylink"){
                        that.copylink(siteId,$(this));
                        e.preventDefault(); 
                    }
                    if(dataOp=="qcode"){
                        that.qcode(siteId,$(this));
                        e.preventDefault(); 
                    }
                    if(dataOp=="edit"){
                        that.edit(siteId,$(this));
                        e.preventDefault(); 
                    }
                    if(dataOp=="offshelf"){
                        that.offshelf(siteId,$(this));
                        e.preventDefault(); 
                    }
                    if(dataOp=="delete"){
                        that.delete(siteId,$(this));
                        e.preventDefault();
                    }

                })
            },
            copylink: function(x,that){

            },
            qcode: function(x,that){
                var self = this;
                var dialog = new Dialog({
                    title: '提示',
                    content: '<p class="ui-msg ui-msg-warning"><img src="" alt=""></p>',
                    buttons: {
                      "确认": function() { } 
                    },
                    confirmFun: function (dialog,button) {
                        self.offshelfRequest(dataId,button,that);
                        window.setTimeout(function () {
                            dialog.close();

                        }, 1000)
                    }
                });
                dialog.open();
            },
            edit: function (dataId,that) {
                var self = this;
                var editId = that.parents('tr').data('tagid');
                var dialog = new Dialog({
                    title: '提示',
                    content: '<p class="ui-msg ui-msg-warning">确认执行编辑操作?</p>',
                    confirmFun: function (dialog,button) {
                        window.location.href = details + '?id=' + editId
                        dialog.close()
                    }
                });
                dialog.open();

            },
            offshelf: function(x,that){
                var self = this;
                var dialog = new Dialog({
                    title: '提示',
                    content: '<p class="ui-msg ui-msg-warning">确认执行下架操作?</p>',
                    confirmFun: function (dialog,button) {
                        self.offshelfRequest(dataId,button,that);
                        window.setTimeout(function () {
                            dialog.close();

                        }, 1000)
                    }
                });
                dialog.open();

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
            offshelfRequest: function(siteId,button,that){

            },
            delRequest: function(siteId,button,that){
             var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url : destroyUrl,
                  data : {id :siteId},
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      btn.removeClass('ui-button-disabled');
                      if ($rk.ajaxSuccess(json)) {
                          self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                          that.parents("tr").remove();
                          setTimeout(function () {
                            $rk.listener.trigger('list', 'change')
                          }, 500)
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
            },
            /*formSend :function(){
                var page = $('#setPage').val();
                var me = this;
                var option = {
                    url : listUrl,
                    data : {"page" :page},
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        $rk.listener.trigger('main', 'success', json);
                    }
                }
                new Ajax(option);
            },*/
            loading: function(text) {
                this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
            },
            setPage: function(num) {
                $("#setPage").val(num);
            }
        });

        /*var pager = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('main', 'success', function(act, json){
                    pager._render(json);
                });
                $rk.listener.on('main', 'requesting', function(act) {
                    me.hide();
                })
            },
            _container: $('#j_con_page'),
            _render: function(json) {
                var d = json;
                var total = d.total;
                var curpage = d.page;
                if(total < 1) return;
                pager._container.pagination(total, {
                    items_per_page: d.length || 20,
                    current_page: curpage - 1,
                    num_edge_entries: 2,
                    callback: function(index, panel) {
                        var pageNum = index + 1;
                        $rk.listener.trigger('pager', 'send', pageNum);
                    }
                });
                pager._container.show();
            },
            hide: function() {
                var me = this;
                me._container.hide();
            }
        });*/
    }

    $Rk.plat.s(function(){
        setModel()
    })
});