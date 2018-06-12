
define(RKC.seaConfig.alias.formsend,['../../tips/1.0.2/tips','../../ajax/1.0.1/ajax'],function(require, exports, module) {
    
    var Tips = require('tips2');
    var Ajax = require('Ajax');
    var formsend = function(opt) {
        var form = opt.form;
        var sb = opt.submit;
        if(opt.data){
            var data = opt.data;
        }else{
            var data = form.serialize();
        }
        var type = opt.type || 'post';
        opt = $.extend({
            success: function() {},
            beforeSend: function() {},
            fail: function() {},
            tipText: '检索中',
            tips: true
        }, opt)
        if (sb && sb.hasClass('ui-button-disabled')) {
            return
        }
        var a = new Ajax({
            data: data,
            type: type,
            url: opt.action || form.attr('action'),
            beforeSend: function() {
                
                if (opt.tips) {
                    tip = new Tips({
                        button: sb,
                        content: '<div class="ui-msg ui-msg-loading">' + opt.tipText + '</div>',
                        position: 'body'
                    })
                    tip.show();
                }
                if(sb){
                    sb.addClass('ui-button-disabled');
                }
                
                opt.beforeSend();
            },
            success: function(json) {

                if ($rk.ajaxSuccess(json)) {
                    if (opt.tips) {
                       tip.close(); 
                    }
                    if(sb){
                        sb.removeClass('ui-button-disabled');
                    }
                    
                    opt.success(json,data); //data为hashdata
                } else {
                    //提供错误信息 by chenyiqi
                    opt.fail && opt.fail(json);
                    if(sb){
                        sb.removeClass('ui-button-disabled');   
                    }
                    
                    if(opt.tips) {
                        tip.close();
                    }
                }

            },
            dataType: 'json'
        });
    }

    module.exports = formsend;
})
