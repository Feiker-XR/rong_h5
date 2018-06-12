define(function(require, exports, module) {

    var Validate = function(opt) {
        $Rk.BassClass.call(this);
        var me = this;
        this.extendValData = {} 
        this.val = {
            require: function(el) {
                var vv = $.trim(el.val());
                var msg = el.data('err') || '此处为必填';
                if (vv === '') {
                    me.val._setErr(el, msg)
                    return false
                }  else {
                    return true
                }
            },
            checked: function (el) {
                var isChecked = false;
                var listContainor = el.parent().find('[data-v="checked"]');
                var msg = el.parent().data('err') || '请至少勾选一项';
                listContainor.each(function (i, m) {
                    if($(m).prop('checked')){
                        isChecked = true
                        return
                    }
                    me.val._setErr(el, msg)
                })
                return isChecked
            },
            phone: function(el) {
                var vv = $.trim(el.val())
                var reg = /^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/;
                if (reg.test(vv)) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入正确的手机号')
                    return false
                }
            },
            "minlength":function(el, min){
                if(el.val().length < min){
                    me.val._setErr(el, '请至少输入'+min+'个字符');
                    return false
                }
                return true
                
                var value = el.val();
                var size = value.replace(/[^\x00-\xff]/g, s).length;

                if(min <= size && max >= size){
                    return true;
                }else{
                    return false;
                }
            },
            "blength":function(el, level2V){
                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var length = parseInt(level2V.split('_')[2]);
                var n = length || 2;
                var s = '';
                for(var i = 0; i < n; i++){
                    s += 'x';
                }

                var value = el.val();
                var size = value.replace(/[^\x00-\xff]/g, s).length;

                if(min <= size && max >= size){
                    return true;
                }else{
                    me.val._setErr(el, '请输入' + min + '－' + max + '个字符');
                    return false;
                }
            },
            range: function(el, level2V) {

                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var len = el.val().length;
                if (len >= min && len <= max) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入' + min + '－' + max + '个字符，数字或字母组合');
                    return false
                }
            },
            textRange: function(el, level2V) {

                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var len = el.val().length;
                if (len >= min && len <= max) {
                    return true;
                } else {
                    me.val._setErr(el, '已超过字符数限制');
                    return false
                }
            },
            urlrange: function(el, level2V) {
                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var len = el.val().length;
                if (len >= min && len <= max) {
                    return true;
                } else {
                    me.val._setErr(el, 'url长度不能超过' + max + '个字符');
                    return false
                }
            },
            customRange: function(el, level2V) {
                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var name = level2V.split('_')[2];
                var len = el.val().length;
                if (len >= min && len <= max) {
                    return true;
                } else {
                    me.val._setErr(el, name+'长度不能超过' + max + '个字符');
                    return false
                }
            },
            date: function(el) {
                var vv = $.trim(el.val());
                var reg = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
                if (reg.test(vv)) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入正确的日期 格式为xxxx-xx-xx ')
                    return false
                }
            },
            rank: function(el, level2V) {
                //添加数字范围 by chenyiqi
                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var len = el.val();
                if(len >= min && len <= max) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入'+min+'-'+max+'之间的数字');
                    return false;
                }
            },
            number: function(el) {
                //添加对数字的验证规则，包括0 by chenyiqi
                var vv = $.trim(el.val());
                var reg = /^(0|[1-9][0-9]*)$/i;
                if(reg.test(vv)) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入大于等于0的数字');
                    return false;
                }
            },
            url: function(el) {
                //添加url验证规则 by chenyiqi
                var vv = $.trim(el.val());
                var reg = /^(https?):\/\/[^\u4e00-\u9fa5\s&<>#;,"\'\?]+(|#[^\s<>;"\']*|\?[^\s<>;"\']*)$/i;
                if (reg.test(vv) || vv == '') {
                    return true;
                } else {
                    me.val._setErr(el, '请输入正确的url');
                    return false;
                }
            },
            hotVal:function(el) {
                //热度值范围限制 by lixiaofeng 
                var vv = $.trim(el.val());
                var reg = /^(1|[1-9][0-9]*)$/i;
                if(reg.test(vv) && vv <= 999999) {
                    return true;
                }else {
                    me.val._setErr(el, '请输入1-999999之间的整数');
                    return false;
                }
            },
            numberRange: function(el, level2V) {
                //数字范围限制 by lixiaofeng
                var min = parseInt(level2V.split('_')[0]);
                var max = parseInt(level2V.split('_')[1]);
                var vv = $.trim(el.val());
                var reg = /^\d*$/i;
                var isNumber = vv.length <=1 || vv.length > 1 && vv.substring(0, 1) != "0";
                if (vv == "" || (reg.test(vv) && vv >= min && vv <= max) && isNumber) {
                    return true;
                }else {
                    me.val._setErr(el, '请输入' + min + '-' + max + '之间的整数');
                    return false;
                }
            },
            numberV: function(el, num) {
                // 精确版本号位数  by yangxinjing
                var vv = $.trim(el.val());
                var reg = /^\d*$/i;
                if(vv == ""){
                    me.val._setErr(el, '此处为必填');
                    return false;
                }else if(vv.length == num){
                    return true;
                }else{
                    me.val._setErr(el, '请输入' + num + '位的版本号');
                    return false;
                }
            },
            color: function(el) {
                //添加颜色值验证规则 by chenyiqi
                var vv = $.trim(el.val());
                var reg = /^\#[\dabcdef]{6}$/i;
                if (reg.test(vv)) {
                    return true;
                } else {
                    me.val._setErr(el, '请输入正确的颜色值');
                    return false;
                }
            },
            reconfirm: function(el) {
                var vv = el.val();
                var vv0 = /*$.trim(*/el.parent('form').find('[type="password"]:eq(0)').val();
                // var reg = /^\#[\dabcdef]{6}$/i;
                if (vv0===vv) {
                    return true;
                } else {
                    me.val._setErr(el, '两次密码录入必须一致');
                    return false;
                }
            },
            _setErr: function(el, err) {
                el.data('err', err)
            }
        }
    }
    $Rk.extend(Validate, $Rk.BassClass);
    $.extend(Validate.prototype, {
        sb: function(op) {
            //form字段可以提供对象和字符串两种形式 by chenyiqi
            var form = (typeof(op.sb) == 'string') ? $('#' + op.form) : $('.' + op.form);
            this.sb = (typeof(op.sb) == 'string') ? $('#' + op.sb) : $('.' + op.sb);
            this.display = op.display;
            this.extendValData = op.extendValData || {};
            this._bindInput(form);
            this._bindButton(op, form);
        },
        _bindButton: function(op, form) {
            var me = this;
            var sb = this.sb;
            var successCallback = function () {
                if(op.beforeCheck){
                    op.beforeCheck();
                }
                if (me._checkvAll(form)) {
                    op.success(form,me.sb);
                    return false
                } else {
                    return false;
                }
            };
            sb.attr('type', 'submit');
            
            sb.bind('click',function(){return false})
            sb.bind('mousedown', function() {
                successCallback()

            });
            if (op.preventSubmit) {
                
                successCallback()

            }else{
                //form监听submit事件 by chenyiqi
                form.bind('submit', function(e) {
                    e.preventDefault();
                    successCallback()
                })
            }
        },
        _bindInput: function(form) {
            var me = this;

            form.on('blur', 'input', function() {
                if ($(this).data('v')) {
                    me._setErrOrSuc($(this))
                }

            });
            form.on('change', 'input', function() {
                if($(this).data('v') || $(this).data('user')) {
                    me._setErrOrSuc($(this));
                }
            })
            //增加对textarea的验证 by chenyiqi
            form.on('blur', 'textarea', function() {
                if ($(this).data('v')) {
                    me._setErrOrSuc($(this))
                }

            });

            /*增加对hidden textarea的验证 by chenyiqi
            * 由于hidden表单的change事件无法触发，所以在改变
            * hidden域的值的时候要主动触发
            *
            */
            form.on('change', 'textarea', function() {
                if($(this).data('v') || $(this).data('user')) {
                    me._setErrOrSuc($(this));
                }
            })
            form.on('change', 'input[type=hidden]', function() {
                //对自定义事件的处理
                if ($(this).data('user')) {
                    me._setErrOrSuc($(this))
                }
            });

            form.on('change', 'select', function() {
                if ($(this).data('v')) {
                    me._setErrOrSuc($(this))
                }

            });
             //为max验证方法添加验证效果
            form.find('[data-v]').each(function(i, el) {
                //获取所有方法，并分组
                var validators = $(el).attr("data-v").split('-');
                //取出max验证方法，并初始化
                $.each(validators, function(i, validator) {
                  //max:30
                    validator = validator.split(":");
                    if (validator[0] == "max") {
                        $(el).inputMax(validator[1]);
                    }
                })
              });

        },
        _setErrOrSuc: function(el) {
            var me = this;

            var cur_v = me._checkv(el); //当前没有通过的验证  true 表示全通过 
            if (cur_v === true) {
                me.setSuc(el);
                return 1;
            } else {
                var err = el.data('err'); // 参数为2级验证
                me.setErr(el, err);
                return 0;
            }
        },
        setErr: function(el, html) {
            //根据配置设置错误显示标签的样式 by chenyiqi
            var err = el.next()//.find('.errors')
            var computedStyle = function (ele, prop) {
                return parseInt(window.getComputedStyle(ele.get(0),null)[prop])
            }
            err.removeClass('hide')
            el.addClass('error')
            // err.css('margin-left',-(el.offset().left-err.offset().left))
            err.css({
                'width': el.width() + computedStyle(err, 'padding') + computedStyle(err, 'border-width'),
                'left': el.offset().left- el.parent().offset().left,
                'top' : el.offset().top- el.parent().offset().top + 33
            })
            if(this.display) {
                err.css('display', this.display).html(html);
            } else {
                err.show().html(html);
            }
            
        },
        setSuc: function(el) {
            el.next()/*.find('.errors')*/.hide();
            el.removeClass('error')
        },
        _checkv: function(el) {
            if(el.data('user')){ //自定义验证
                //自定义验证规则 由页面自己控制返回
                return this.extendValData[el.data('user')](el); 
                
            }
            var vvv = el.data('v') ;

            v = vvv.split('-');
            var me = this;
            for (var i = 0; i < v.length; i++) {
                var itemv = v[i].split('|')[0];
                var level2V = v[i].split('|')[1];
                if (me.val[itemv]) { //有验证 通过

                    if (me.val[itemv](el, level2V)) {

                    } else {
                        return v[i]
                    }
                }

            }
            return true
        },
        _checkvAll: function(form) {
            var me = this;
            var r = true;
            $.each(form.find('[data-v],[data-user]'), function() {
               
                if (me._setErrOrSuc($(this))) {

                } else {
                    r = false;
                }
            })

            return r;
        }
        // ,
        // //制定验证规则
        // val: function(arr, callback) {
        //     var me = this;
        //     var callback = callback || function() {};
        //     for (var i = 0; i < arr.length; i++) {
        //         if (me._setErrOrSuc($('#' + arr[i]))) {
        //             callback()
        //         }
        //     }
        // }

    })
    function InputMax(element, num) {
        this.num = Number(num);
        this.element = element;
        this.initialize();
    }
    $.extend(InputMax.prototype, {
        initialize: function() {
            var marginRright = 44;
                this.content = $('<sup class="input-limit">' +
                '<i class="input-number">0</i>' +
                '/<b class="input-total">' + this.num + '</b></sup>')
            .insertAfter(this.element);
            this.inputCallback = $.proxy(this.inputCallback, this);
            $(this.element)
            .css({
              "width": $(this.element).width() - marginRright,
              "padding-right": marginRright 
            })
            .bind("input", this.inputCallback)
            .bind("propertychange", this.inputCallback)
            //.trigger("input").trigger("propertychange");
        },
        inputCallback: function() {
            var len = $(this.element).val().length;
            if (len >= this.num) {
                len = this.num;
                $(this.element).trigger("InputMaxErr");
                var str = $(this.element).val().slice(0, len);
                $(this.element).val(str); 
            }
            $(this.content).find(".input-number").html(len);
            $(this.element).trigger("change");
        }
    });

    $.fn.inputMax = function(num) {
    var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var $this = $(this),
            data = $this.data('inputMax')
            if (!data) $this.data('inputMax', (data = new InputMax(this, num)))
        });
    };
    module.exports = Validate;
})