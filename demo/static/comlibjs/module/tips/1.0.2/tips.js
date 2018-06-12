define(RKC.seaConfig.alias.tips2,['../../dot/dot'],function(require, exports, module) {
    var dot = require('dot');
    var Tips = function(opts) {
        $Rk.BassClass.call(this);
        var opt = {
            content: '',
            position : 'parent',
            direct : 'bottom',
            width : 80,
            height: 30,
            zIndex : 1000,
            top: '',
            left: ''
        }
        $.extend(opt, opts);
        this.opt = opt;
        this.opt.guid = this.guid;
        this.tipsId = '#j_tips_' + this.guid;
        this.tpl = [

            '<div class="ui-tip" id="j_tips_{{=it.guid}}">',
            '<div class="j_tips_content">{{=it.content}}</div>',
            '<span id="j_tips_arrow_{{=it.guid}}" class="poptip-arrow ui-tip-'+ this.opt.direct +'"><em>◆</em><i>◆</i></span>',
            // '<a href="javascript:void(0);" id="j_tips_close_{{=it.guid}}" class="ui-tip-close">x</a>',
            '</div>'
        ].join('');
        this.button = opt.button;
        this.direct = opt.direct;
        this._init();
    }
    $Rk.extend(Tips, $Rk.BassClass);
    $.extend(Tips.prototype, {
        _init: function() {

        },
        show: function() {
            var tipsHtml = $rk.tplRender(dot, this.tpl, this.opt);
            var t = this.button.outerHeight();
            if (this.opt.position == 'body') {
                var x = this.button.offset().left;
                var y = this.button.offset().top;
                $('body').append(tipsHtml);
                this.tips = $(this.tipsId);
                var tipsH = this.tips.outerHeight()
                this.tips.css({
                    top: y - (5 + tipsH),
                    left: x,
                    zIndex: this.opt.zIndex,
                    width : this.opt.width
                });
            } else if(this.opt.position == 'parent'){
                this.button.after(tipsHtml);
                this.tips = $(this.tipsId);
                this.tips.css({
                    top: this.opt.top,
                    left: this.opt.left,
                    width : this.opt.width,
                    height : this.opt.height
                });
            }

        },
        hide : function(){
            this.tips.hide();
        },
        close: function() {
            this.tips.remove();
        },

        setContent: function(val) {
            this.tips.find('.j_tips_content').html(val)
        }
    });

    module.exports = Tips;
})
