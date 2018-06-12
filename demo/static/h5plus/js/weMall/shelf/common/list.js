/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   chen
* @Last Modified time: 2016-02-22 14:58:49
*/
seajs.use(['Ajax','dot','tips2',"Dialog", 'clipboard', 'liMarquee','qrcode'], 
    function(Ajax,dot,Tips,Dialog, Clipboard, liMarquee,qrcode){

    var setModel = function() {

        var listUrl = $$r.routers.data.link.list,
            destroyUrl = $$r.routers.data.link.delete,
            downpageUrl = $$r.routers.data.link.downpage,
            uppageUrl = $$r.routers.data.link.uppage,
            details = $$r.routers.data.details;
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
                var navstr = '<li class="active"><a href="javascript:void(0);">一般页面</a></li>'+ 
                              '<li><a href="../special/list.html?id='+id+'">特殊页面</a></li>'+
                              '<li><a href="../configTemp.html?id='+id+'">模板设置</a></li>';
                $('.nav').html(navstr);
            },
            _bind: function(){
                $('#j_refresh').click(function(event) {
                    window.location.reload();
                });
            }
        });

        var main = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                   // me.loading("数据加载中");
                    me.formSend();
                    me._bind();
                    me.myFunction();
                });
                $rk.listener.on('main', 'requesting', function(act, text) {
                    me.loading(text);
                });
                $rk.listener.on('main', 'success', function(act, json) {
                    me._render(json);
                    me.showNav(json);
                });
                $rk.listener.on('main', 'change', function(act, json) {
                  me.formSend();
                });
                $rk.listener.on('tips', 'success', function(e,tip,tipBotton) {
                    me.tips('tipsSuccess',tip,tipBotton);
                });
                $rk.listener.on('tips', 'fail', function(e,tip,tipBotton) {
                    me.tips('tipsFail',tip,tipBotton);
                    
                });
            },
            tips:function(tipClass,tip,tipBotton){
                var tipsCon='<div class="tipsWrap">'+
                                    '<div class="tips '+tipClass+'">'+
                                        '<span class="tipsLabel"></span>'+
                                        '<span>'+tip+'</span>'+
                                    '</div>'+
                                '</div>';
                    var tips = new Tips({content:tipsCon,button:tipBotton,width: '100%',height:38});
                    tips.show();
                    $(tips.tipsId).css({'top':0,'left':0}).fadeOut(4000);
            },
            myFunction:function(){
                var me = this;
                me._container.on('change','[data-op="myFunction"]',function(){
                    //执行的方法
                })
            },
            _container: $('#j_con_table'),
            _render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_table').html(), data);
                this._container.html(html);
                var html = $rk.tplRender(dot, $('#j_view_phone').html(), data);
                $('#j_con_phone').html(html);
            },
            _bind : function(){
                var that = this;
                this._container.off("click")
                this._container.on("click",'[data-op]',function(e){
                   var dataOp=this.getAttribute('data-op');
                   if (dataOp=="copyclip") {
                       var clipboard = new Clipboard('.cp'+this.className.replace(/[^\d]/img,''))
                       that.copyClip(clipboard, this)
                       e.preventDefault()
                   }
                   if(dataOp=="qcode"){
                       that.qcode($(this));
                       e.preventDefault(); 
                   }
                   if(dataOp=="edit"){
                       that.edit($(this));
                       e.preventDefault(); 
                   }
                   if(dataOp=="offshelf"){
                       that.offshelf($(this));
                       e.preventDefault(); 
                   }
                   if(dataOp=="upshelf"){
                       that.upshelf($(this));
                       e.preventDefault(); 
                   }
                   if(dataOp=="delete"){
                       that.delete($(this));
                       e.preventDefault();
                   }
                   if(dataOp=="add"){
                       that.add($(this));
                       e.preventDefault();
                   }
                });
            },
            copyClip:function (clipboard ,that) {
                var store_id = $(that).parent().find('input').attr('data-store_id');
                var page_id = $(that).parent().find('input').attr('data-page_id');
                var link = 'http://test.weidian.h5plus.net/wap/home.html?id='+store_id+'&page_id='+page_id;
                $(that).attr('data-clipboard-text',link);
                var msg
                clipboard.on('success', function(e) {
                    //msg = '复制成功！';
                    var tipsButton = $('body');
                    $rk.listener.trigger('tips', 'success','复制成功！',tipsButton);
                    /*var reminder = new Tips({
                            button: $(that),
                            width: 100,
                            height: 30,
                            top: -15,
                            left: '15%',
                            content: '<div class="ui-msg ui-msg-loading">'+msg+'</div>'
                        });
                    reminder.show();
                    setTimeout(function () {
                        reminder.hide();
                    },500)*/
                });
                /*clipboard.on('error', function(e) {
                   $rk.listener.trigger('tips', 'fail','复制失败！',tipsButton);
                });*/
            },
            add: function(that){
              window.location.href = details + '.html?id=' + id;
            },
            qcode: function(that){
                var store_id = that.parent().find('input').attr('data-store_id');
                var page_id = that.parent().find('input').attr('data-page_id');
                var link = 'http://test.weidian.h5plus.net/wap/home.html?id='+store_id+'&page_id='+page_id;
                var self = this;
                var dialog = new Dialog({
                    title: '页面二维码',
                    class: 'hide',
                    width: 417,
                    content: '<div id="qrcode" style="text-align:center"></div>',
                    beforeShow: function (dialog){
                      $('#qrcode').qrcode({width: 144,height: 144,text: link});
                    },
                    confirmFun: function (dialog,button) {
                        window.setTimeout(function () {
                            dialog.close();

                        }, 1000)
                    }
                });
                dialog.open();
            },
            edit: function (that) {
                var self = this;
                var store_id = that.parent().find('input').attr('data-store_id');
                var page_id = that.parent().find('input').attr('data-page_id');
                window.location.href = details + '.html?id=' + id + '&store_id=' + store_id + '&page_id=' + page_id;
                /*var dialog = new Dialog({
                    title: '编辑页面',
                    content: '<p class="ui-msg ui-msg-warning">确认执行编辑操作?</p>',
                    confirmFun: function (dialog,button) {
                        window.location.href = details + '?store_id=' + store_id + '&page_id=' + page_id;
                        dialog.close()
                    }
                });
                dialog.open();*/
            },
            // 下架
            offshelf: function(that){
                var self = this;
                var dialog = new Dialog({
                    title: '修改页面状态',
                    content: '<p class="ui-msg ui-msg-warning">确定修改页面状态，将页面置为“下架”吗?</p>',
                    confirmFun: function (dialog,button) {
                        self.offshelfRequest(button,that);
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000)
                    }
                });
                dialog.open();
            },
            offshelfRequest: function(button,that){
              var store_id = that.parent().find('input').attr('data-store_id');
              var page_id = that.parent().find('input').attr('data-page_id');
              //console.log(store_id,page_id);
              var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url : downpageUrl,
                  data : JSON.stringify({"page_id": +page_id}),
                  contentType : 'application/json',
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      btn.removeClass('ui-button-disabled');
                      if(json.hfive_weidian_page_downpage_response.msg=='success'){
                          self.delTip.setContent('<div class="ui-msg ui-msg-suc">修改成功</div>');
                          setTimeout(function () {
                            $rk.listener.trigger('main', 'change');
                          }, 500)
                      }else{
                          self.delTip.setContent('<div class="ui-msg ui-msg-error">修改失败</div>');
                      }
                  },
                  beforeSend: function() {
                      btn.addClass('ui-button-disabled');
                      self.delTip = new Tips({
                          top: 25,
                          left: 125,
                          button: btn,
                          content: '<div class="ui-msg ui-msg-loading">修改中</div>'
                      });
                      self.delTip.show();
                  }
              }
                new Ajax(option);
            },
            // 上架
            upshelf: function(that){
                var self = this;
                var dialog = new Dialog({
                    title: '修改页面状态',
                    content: '<p class="ui-msg ui-msg-warning">确定修改页面状态，将页面置为“上架”吗?</p>',
                    confirmFun: function (dialog,button) {
                        self.upshelfRequest(button,that);
                        window.setTimeout(function () {
                            dialog.close();
                        }, 1000)
                    }
                });
                dialog.open();
            },
            upshelfRequest: function(button,that){
              var store_id = that.parent().find('input').attr('data-store_id');
              var page_id = that.parent().find('input').attr('data-page_id');
              var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url : uppageUrl,
                  data : JSON.stringify({"page_id": +page_id}),
                  contentType : 'application/json',
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      btn.removeClass('ui-button-disabled');
                      if(json.hfive_weidian_page_uppage_response.msg=='success'){
                          self.delTip.setContent('<div class="ui-msg ui-msg-suc">修改成功</div>');
                          setTimeout(function () {
                            $rk.listener.trigger('main', 'change');
                          }, 500)
                      }else{
                          self.delTip.setContent('<div class="ui-msg ui-msg-error">修改失败</div>');
                      }
                  },
                  beforeSend: function() {
                      btn.addClass('ui-button-disabled');
                      self.delTip = new Tips({
                          top: 25,
                          left: 125,
                          button: btn,
                          content: '<div class="ui-msg ui-msg-loading">修改中</div>'
                      });
                      self.delTip.show();
                  }
              }
                new Ajax(option);
            },
            delete: function (that) {
                var self = this;
                var page_name = that.parent().find('input').attr('data-name');
                var dialog = new Dialog({
                    title: '删除页面',
                    content: '<p class="ui-msg ui-msg-warning">你确定要删除页面"'+page_name+'"吗?删除页面将会删除页面所有内容。</p></br>',
                    confirmFun: function (dialog,button) {
                        self.delRequest(button,that);
                        window.setTimeout(function () {
                            dialog.close();

                        }, 1000)
                    }
                });
                dialog.open();
            },
            delRequest: function(button,that){
              var store_id = that.parent().find('input').attr('data-store_id');
              var page_id = that.parent().find('input').attr('data-page_id');
              var btn = button;
              var self = this;
              var tip = null;
              var option = {
                  url : destroyUrl,
                  data : JSON.stringify({"page_id": +page_id}),
                  contentType : 'application/json',
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                      btn.removeClass('ui-button-disabled');
                      if(json.hfive_weidian_page_deletepage_response.msg=='success'){
                          self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                          //that.parents("tr").remove();
                          setTimeout(function () {
                            $rk.listener.trigger('main', 'change');
                          }, 500)
                      }else{
                          self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                      }
                  },
                  beforeSend: function() {
                      btn.addClass('ui-button-disabled');
                      self.delTip = new Tips({
                          top: 25,
                          left: 125,
                          button: btn,
                          content: '<div class="ui-msg ui-msg-loading">删除中</div>'
                      });
                      self.delTip.show();
                  }
              }
                new Ajax(option);
            },
            formSend :function(){
                var me = this;
                var option = {
                    url : listUrl,
                    contentType : 'application/json',
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                      $rk.listener.trigger('main', 'success', json);           
                    }
                }
                new Ajax(option);
            },
            showNav: function(json){
              var item = json.hfive_weidian_page_list_response.list;
              var str = '';
              var arr = [];
              $.each(item,function(index, el) {
                if(el.status==1){
                  arr.push(el);
                }
              });

              arr.sort(function(a,b){
                  return a.order-b.order
              });

              for(var i=0;i<arr.length;i++){
                str +='<li>'+arr[i].page_name+'</li>';
              }
              if(arr.length>5){
                $('#j_nav_menu').width(arr.length * 60);
                $('#j_nav_menu').html(str).find('li').css({
                  width: '60px'
                });
                $('.phonenav').liMarquee();
              }else{
                var w = $('.phonenav').width() / (arr.length);
                $('#j_nav_menu').html(str).find('li').css({
                  width: w
                })
              }
              // <=5时，根据宽度平均显示，当数量大于5时，鼠标左右滑动显示
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