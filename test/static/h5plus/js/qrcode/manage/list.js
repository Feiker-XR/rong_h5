/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-26 11:32:50
*/
seajs.use(['Ajax','dot','pagination','tips2',"Dialog",'sortable', 'clipboard'], 
    function(Ajax,dot,pagination,Tips,Dialog,sortable, Clipboard){

    var setModel = function() {

        var listUrl = $$r.routers.data.link.list;
        var destroyUrl = $$r.routers.data.link.delete;
        var details = $$r.routers.data.details;

        var main = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.loading("数据加载中");
                    me.formSend();
                    me._bind();
                    //me.myFunction();
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    me._render(json);
                });
                /*$rk.listener.on('pager', 'send', function(e, num) {
                    $rk.listener.trigger('main', 'requesting', '数据加载中');
                    me.setPage(num);
                    me.formSend();
                });*/
            },

            myFunction:function(){
                var me = this;
                me._container.on('change','[data-op="myFunction"]',function(){
                    //执行的方法
                })
            },
            _container: $('#j_con_main'),
            _render: function(data) {
                //data.details = details
                var html = $rk.tplRender(dot, $('#j_view_con').html(), data);
                this._container.html(html);
            },
            _bind : function(){
                var that = this;
                this._container.off("click");
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                   // var siteId=$('tbody').find('input:checked').attr('value');
                    // console.log(siteId);
                    if (dataOp=="copyclip") {
                        var clipboard = new Clipboard('.cp'+this.className.replace(/[^\d]/img,''))
                        that.copyClip(clipboard, this)
                        e.preventDefault()
                    }

                    if(dataOp=="del"){
                        that.delete(siteId,$(this));
                        e.preventDefault();
                    }
                    if(dataOp=="srcList"){
                        var qrcode_name = $('#qrcode_name').val();
                        if(qrcode_name){that.sendOpt({"qrcode_name" :qrcode_name});}else{return};
                        e.preventDefault();
                    }
                    if(dataOp=="createL"){
                        that.creat(siteId,$(this));
                        e.preventDefault();
                    }
                    if(dataOp=="modifyL"){
                        that.edit(siteId,$(this));
                        e.preventDefault();
                    }

                })
            },
            copyClip:function (clipboard ,that) {
                var msg
                clipboard.on('success', function(e) {
                    console.log(e);
                    msg = '复制成功！'
                    var reminder = new Tips({
                            button: $(that),
                            top: 40,
                            left: '20%',
                            content: '<div class="ui-msg ui-msg-loading">'+msg+'</div>'
                        });
                    reminder.show();
                    setTimeout(function () {
                        reminder.hide();
                    },500)
                });
                /*clipboard.on('error', function(e) {
                    console.log(e);
                });*/
            },
            creat: function (dataId,that) {
                var self = this;
                //var editId = that.parents('tr').data('tagid');
                var dialog = new Dialog({
                    title: '提示',
                    content: '<p class="ui-msg ui-msg-warning">确认执行新建操作?</p>',
                    confirmFun: function (dialog,button) {
                        window.location.href = details
                        dialog.close()
                    }
                });
                dialog.open();

            },
            edit: function (dataId,that) {
                var self = this;
                //var editId = that.parents('tr').data('tagid');
                var dialog = new Dialog({
                    title: '提示',
                    content: '<p class="ui-msg ui-msg-warning">确认执行编辑操作?</p>',
                    confirmFun: function (dialog,button) {
                        window.location.href = details + '?id=' + dataId
                        dialog.close()
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
            formSend :function(){
                var page = $('#setPage').val();
                var me = this;
                me.sendOpt({"page" :page});
            },
            sendOpt: function(parObj){
                var option = {
                    url : listUrl,
                    data : parObj,
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        $rk.listener.trigger('main', 'success', json);
                    }
                }
                new Ajax(option);
            },
            loading: function(text) {
                this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
            },
            setPage: function(num) {
                $("#setPage").val(num);
            }
        });

       /* var pager = new $rk.VC({
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
                var d = json.data;
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

        /*$('#twoDimensCd20_010').datagrid({
            fitColumns:true,
            rownumbers:true,
            singleSelect:true,
            checkOnSelect:true,
            selectOnCheck:true,
            pagination:true,
            pagePosition:'bottom',
            pageList:[10,20,50],
            cache : false,
            url : listUrl,
            method : 'POST',
            queryParams : {
                qrcode_name : $('#qrcode_name').val()
            },
            onSelect : function(rowIndex, rowData) {

                if (uncheckRowIndex == rowIndex) {
                    $('#staticQrcodeId').val('');
                    uncheckRowIndex = 999;
                    $('#twoDimensCd20_010').datagrid('unselectRow', rowIndex);
                    changeStatus(false);
                } else {
                    $('#staticQrcodeId').val(rowData.id);
                    uncheckRowIndex = rowIndex;
                    changeStatus(true);
                }
            },
            onLoadSuccess : function(data) {
                changeStatus(false);
            },
            onLoadError : function(XMLHttpRequest, textStatus) {
                assertSessionTimeOut(XMLHttpRequest, textStatus);
            }
        });*/
        
    }

    $Rk.plat.s(function(){
        setModel()
    })
});