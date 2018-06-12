define(RKC.seaConfig.alias.dialog, ['../../dot/dot'], function(require, exports, module) {
    var dot = require('dot');
    var Dialog = function(opts) {
        var opt = {
            isButton: true,
            isClose:false,
            isEscClose:false,
            isCancel: false,
            width: 300,
            height: 'auto',
            confirmFun: function() {},
            closeFun: function() {},
            afterOpen: function() {},
            beforeShow: function() {},
            cancelFun: function() {},
            class: "",
            content: '',
            clickCloseWindow: true,
            model: 'remove' //hide 表示隐藏 remove 表示删除
        }
        $.extend(opt, opts);
        opt.marginLefts = -opt.width / 2;
        $Rk.BassClass.call(this);
        this.opt = opt;
        this.opt.guid = this.guid;

        this.isButton = opt.isButton || true;
        this.isClose = opt.isClose || false;
        this.isCancel = opt.isCancel || false;
        opt.baseTpl = [
            '<div class="ui-dialog-mask" id="j_dialog_mask_{{=it.guid}}"></div>',
            '<div class="ui-dialog" id="j_dialog_{{=it.guid}}" style="width:{{=it.width}}px;margin-left:{{=it.marginLefts}}px">',
            '<div class="ui-dialog-head"><p>{{=it.title}}</p><i data-dialog-op="close" class="j_op"></i></div>',
            '<div class="ui-dialog-content" style="height:{{? it.height=="auto"}}{{=it.height}}{{??}}{{=it.height}}px{{?}};">',
            this.opt.content,
            '</div>',
            '{{? it.isButton }}',
            '<div class="ui-dialog-footer">',
            '<div class="rel"><input type="button" class="ui-button j_op" value="确定" data-dialog-op="confirm" /></div>',
            '<input type="button" class="ui-button j_op '+ this.opt.class +'" value="取消" data-dialog-op="cancel" />',
            '</div>',
            '{{?}}',
            '</div>'
        ].join('');
        opt.v3Tpl = '<div id="modal-notification" class="modal hide fade in v3_dialog_{{=it.guid}}" aria-hidden="false" style="display: block;">\
                        <div class="modal-header">\
                        {{? !!it.isClose }}\
                            <button type="button" class="close j_op" data-dismiss="modal" data-dialog-op="close" aria-hidden="true">×</button>\
                        {{?}}\
                            <h3>{{=it.title}}</h3>\
                        </div>\
                        <div class="modal-body">\
                            <p>'+this.opt.content+'</p>\
                        </div>\
                        <div class="modal-footer modal-centered">\
                        {{console.log("it:",it);}}\
                        {{? it.isButton }}\
                            <a href="javascript:;" class="btn btn-large btn-success j_op" data-dismiss="modal" data-dialog-op="confirm">确定</a>\
                            {{? it.isCancel }}<a href="javascript:;" class="btn btn-large btn-success" data-dismiss="modal" data-dialog-op="confirm">取消</a>{{?}}\
                        {{?}}\
                        </div>\
                    </div>\
                    <div id="v3_mask_{{=it.guid}}" class="modal-backdrop fade in"></div>';
        this.tpl = opt.v3Tpl;
        this._init();
    }
    $Rk.extend(Dialog, $Rk.BassClass);
    $.extend(Dialog.prototype, {
        //状态设置 by chenyiqi
        //opened: false,
        opened: false,
        _init: function() {
            // this.bind();
        },
        bind: function() {
            var me = this;
            $('.v3_dialog_' + this.guid).on('click', '[data-dialog-op]', function() {
                //防重复
                //
                //

                if ($(this).hasClass('ui-button-disabled')) {
                    return
                }

                var opt = $(this).data('dialog-op');
                /* me[opt]($(this)) //by chenyiqi*/
                me[opt] && me[opt]($(this));
            })

            //扩展事件
            $('.v3_dialog_' + this.guid).on('click', '[data-user-op]', function() {
                //防重复
                //
                //
                var user = $(this).data('user-op');

                me.opt[user]($(this));
            })
        },
        resetHeight: function() {
            var dialog = $('.v3_dialog_' + this.guid);
            var h = dialog.height();
            var mt = -h / 2;
            dialog.css({
                'margin-top': mt
            })
        },
        _setHeight: function() {
            var dialog = $('.v3_dialog_' + this.guid);
            var h = dialog.height();

            var mt = -h / 2;
            dialog.animate({
                'margin-top': mt
            }, 100)
        },
        setContent: function(content) {
            var dialog = $('.v3_dialog_' + this.guid);
            dialog.find('.ui-dialog-content').html(content)
        },
        open: function() {
            var me = this;
            var dialogHtml = $rk.tplRender(dot, this.tpl, this.opt);
            $('body').append(dialogHtml);
            this.beforeShow();
            // this._bindEsc();
            this.bind();
            this._setHeight();
            this.opt.afterOpen();

            //状态设置 by chenyiqi
            // $(document).on('click.dialog', function(e) {
            //     if (!me.opt.clickCloseWindow) return;
            //     if ($(e.target).closest('.ui-dialog').length < 1 && me.opened) {
            //         me.close();
            //     }
            //     me.opened = true;
            // });
            /*

            chenyiqi 添加如下代码
            $(document).on('click.dialog', function(e) {
                if($(e.target).closest('.ui-dialog').length < 1 && me.opened) {
                    me.close();
                }
                me.opened = true;
            });

            */

        },

        append: function() {
            var dialogHtml = $rk.tplRender(dot, this.tpl, this.opt);
            $('body').append(dialogHtml);
            this._setHeight();
            this.bind();
            this.close();

        },
        show: function() {
            this.beforeShow();
            try {
                this._bindEsc();
            } catch (e) {}
            $('#v3_mask_' + this.guid).show();
            $('.v3_dialog_' + this.guid).show();
        },
        //esc start
        _escEvent: function(e) {
            var me = e.data.me;
            if (e.keyCode == 27) {
                me.close();
            }
        },

        _bindEsc: function() {
            var me = this;
            $(document).bind('keyup', {
                me: me
            }, me._escEvent);
        },
        _offBindEsc: function() {
            var me = this;
            $(document).unbind("keyup", me._escEvent);
        },
        //esc end
        //
        //操作 start
        close: function() {

            if (this.opt.model === 'hide') {
                $('#v3_mask_' + this.guid).hide();
                $('.v3_dialog_' + this.guid).hide();

            } else {
                $('#v3_mask_' + this.guid).remove();
                $('.v3_dialog_' + this.guid).remove();
            }
            $(document).off('click.dialog');
            this.opened = false;
            this._offBindEsc();
            this.opt.closeFun();
        },
        hide: function() {
            $('#v3_mask_' + this.guid).hide();
            $('.v3_dialog_' + this.guid).hide();
        },
        cancel: function(button) {
            //添加点击取消按钮后的事件处理 by chenyiqi
            this.opt.cancelFun(this, button);
            this.close();
        },
        confirm: function(button) {
            this.opt.confirmFun(this, button);
        },
        beforeShow: function() {
            this.opt.beforeShow(this);
        }
    })

    module.exports = Dialog;
})