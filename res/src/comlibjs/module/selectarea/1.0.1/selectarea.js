define(RKC.seaConfig.alias.selectarea,['../../dot/dot'],function(require, exports, module) {
    var dot = require('dot');
    /**
     * [SelectArea description]
     * @param {[type]} opts.field [将指定的属性 返回在dom中]
     */
    var SelectArea = function(opts) {
        $Rk.BassClass.call(this);
        var opt = {
            lbox: opts.box.find('[data-act="left"]'),
            rbox: opts.box.find('[data-act="right"]'),
            field: opts.field || {},
            afterAdd: function() {},
            afterRemove: function() {}
        }
        $.extend(opt, opts);
        this.opt = opt;
        this._init();
    }
    $Rk.extend(SelectArea, $Rk.BassClass);
    $.extend(SelectArea.prototype, {


        _init: function() {

            this.bind();
        },
        _bindLeft: function() {
            var me = this;
            this.opt.lbox.on('mouseenter', 'p', function() {
                if ($(this).hasClass('on')) {
                    $(this).find('[data-op="del"]').show();
                } else {
                    $(this).find('[data-op="add"]').show();
                }
            })
            this.opt.lbox.on('mouseleave', 'p', function() {
                $(this).find('[data-op]').hide();
            })
            this.opt.lbox.on('click', '[data-op]', function() {
                var op = $(this).data('op');
                switch (op) {
                    case 'del':
                        me.del($(this), {
                            position: 'lbox' //当前是left
                        });
                        break;
                    case 'add':
                        me.add($(this), {
                            position: 'lbox' //当前是left
                        });
                        break;
                }
            })
        },
        _bindRight: function() {
            var me = this;
            this.opt.rbox.on('mouseenter', 'p', function() {
                $(this).find('[data-op="del"]').show();
            })
            this.opt.rbox.on('mouseleave', 'p', function() {
                $(this).find('[data-op="del"]').hide();
            })
            this.opt.rbox.on('click', '[data-op]', function() {
                var op = $(this).data('op');
                switch (op) {
                    case 'del':
                        me.del($(this), {
                            position: 'rbox' //当前是right
                        });
                        break;
                    case 'add':
                        me.add($(this), {
                            position: 'rbox' //当前是right
                        });
                        break;
                }
            })
        },
        bind: function() {
            this._bindLeft();
            this._bindRight();
        },
        add: function(dom, opt) {
            var position = opt.position;
            var toPos = (opt.position == 'lbox') ? 'rbox' : 'lbox';
            var otherBox = this.opt[toPos];
            var item = dom.parent();
            var jid = item.data('jid');
            var tpl = '<p  data-jid="{{=it.jid}}" \
                        {{ for(var key in it.field) { }} data-{{=key}}="{{=it.field[key]}}" {{ } }}\
                        >\
                            <span data-op="del" class="hide" style="display: none;">删除</span>\
                            <b>{{=it.tag}}</b></p>'
            var o = {
                jid: jid,
                tag: item.find('b').html()
            }

            var field = this.getField(this.opt.field, item);
            $.extend(o, {
                field: field
            });
            
            var html = $rk.tplRender(dot, tpl, o);
            otherBox.find('dd').append(html)
            item.addClass('on');
            item.find('[data-op="add"]').hide();
            item.find('[data-op="del"]').show();
            // by chenyiqi
            this.opt.afterAdd(dom.parent());
        },
        getField: function(field, dom) {
            var o = {};
            for (var key in field) {
                o[key] = dom.data(key);
            }
            return o;
        },
        del: function(dom, opt) {
            var position = opt.position;
            var toPos = (opt.position == 'lbox') ? 'rbox' : 'lbox';
            var item = dom.parent();
            var jid = item.data('jid');
            var otherBox = this.opt[toPos];
            var otherItem = otherBox.find('[data-jid=' + jid + ']');
            if (position == 'lbox') {
                item.removeClass('on');
                otherItem.remove();
                item.find('[data-op="add"]').show();
                //修改此处的硬编码 by chenyiqi
                //item.data('rid').find('[data-op="del"]').hide();
                item.find('[data-op="del"]').hide();
            }
            if (position == 'rbox') {
                otherItem.removeClass('on');
                item.remove();
            }
            //添加删除回调 by chenyiqi
            this.opt.afterRemove(dom.parent());
        }
    })

    module.exports = SelectArea;
})
