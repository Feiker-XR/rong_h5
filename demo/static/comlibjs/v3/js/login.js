/*
* @Author: zhaoxiaoyang
* @Date:   2016-04-28 13:55:23
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-23 19:24:05
*/

seajs.use(['dot', 'Ajax', 'jquery.cookie', 'Dialog', 'Validate', 'areaSelect', 'mousewheel319', 'TweenMax', 'portalAnim'], 
    function(dot, Ajax, cookie, Dialog, Validate, areaSelect, MouseWheel, TweenMax, portalAnim) {
// $$r.routers
var tempReady = function () {
    var verifyCodeUrl = $$r.routers.data.link.verifyCode;
    var phoneUrl = $$r.routers.data.link.tel;
    var verifyCheckUrl = $$r.routers.data.link.verifyCheck;
    var confirmRegistUrl = $$r.routers.data.link.confirmRegist;
    var resetPwdUrl = $$r.routers.data.link.resetPwd;
    var loginUrl = $$r.pathLogin;
    var count = 0;
    var dialog = function () {
                    var cont = arguments[0],
                        callback = arguments[1],
                        _title = arguments[2] || '注册提示',
                        d = new Dialog({
                        title: _title,
                        content: cont,
                        confirmFun: function (dialog,button) {
                            callback && callback()
                            dialog.close();
                        }
                    });
                    return d.open()
                };


    var portalAnimate = new $Rk.VC({
        _init: function() {
            var that = this;
            $Rk.listener.on('plat', 'ready', function(token, config) {
                that._pageInit()
            });
            $Rk.listener.on('page', 'loading', function(token, json) {
                $('body').append('<div class="cont-all"><p class="loading"></p></div>')
                setTimeout(function () {
                    $('#scroller .cont-all').remove()
                },500)
            });
        },
        _container: $('#portalMotion'),
        _pageInit:function () {
            this._render()
        },
        _render: function(data) {
            var html = $Rk.tplRender(dot, $('#j_portalMotion').html(), data || {});
            this._container.html(html);
            this._interact(data)
        },
        onDomContentLoaded: function () {
            new portalAnim().animInit()
            /*$.when(new portalAnim().animInit()).then(function () {
                $('body .form-centering-wrapper input').val('')
            })*/
        },
        _interact: function(data){
            var that = this

            that.onDomContentLoaded()

            that._container.on('click', '[data-op]', function (e) {
                var thats = $(this),
                    op = thats.data('op');
                switch(op){
                    case 'topright':
                    break
                }
            })
        }
    })
    

    var topRightLoader = new $Rk.VC({
        _init: function() {
            var that = this;
            $Rk.listener.on('plat', 'ready', function(token, config) {
                that._pageInit()
            });
            $Rk.listener.on('page', 'loading', function(token, json) {
                $('body').append('<div class="cont-all"><p class="loading"></p></div>')
                setTimeout(function () {
                    $('#scroller .cont-all').remove()
                },500)
            });
        },
        _container: $('#nav_topright'),
        _pageInit:function () {
            this._render()
        },
        _render: function(data) {
            var html = $Rk.tplRender(dot, $('#j_topRight').html(), data || {});
            this._container.html(html);
            this._interact(data)
        },
        onDomContentLoaded: function () { 
            setTimeout(function(){
                $('.nav-fixed-topright').removeAttr('style');
            }, 300);
            $(window).scroll(function(){
                if($('.breadcrumb-container').length){
                    var scrollState = $(window).scrollTop();
                    if (scrollState > 0) $('.nav-fixed-topright').addClass('nav-released');
                    else $('.nav-fixed-topright').removeClass('nav-released')
                }
            });
        },
        _interact: function(data){
            var that = this

            that.onDomContentLoaded()

            that._container.on('click', '[data-op]', function (e) {
                var thats = $(this),
                    op = thats.data('op');
                switch(op){
                    case 'topright':
                        thats.toggleClass('active-user-menu');
                    break
                    case 'toprightMenu':
                        that.switchVersion($(e.target).parent('li'))
                    break
                }
            })
        },
        switchVersion: function (switcher) {
            if (switcher.hasClass('light')) {
                if ($('body').is('.light-version')) return;
                $('body').addClass('light-version');
                setTimeout(function() {
                    $.cookie('themeColor', 'light', {
                        expires: 7,
                        path: '/'
                    });
                }, 500);
            }else if(switcher.hasClass('dark')){
                if ($('body').is('.light-version')) {
                    $('body').removeClass('light-version');
                    $.cookie('themeColor', 'dark', {
                        expires: 7,
                        path: '/'
                    });
                }
            }
        }
    })


    var loginForm = new $Rk.VC({
        _init: function() {
            var that = this;
            $Rk.listener.on('plat', 'ready', function(token, config) {
                that._pageInit()
            });
        },
        _container: $('#login_form'),
        _pageInit:function () {
            var that = this;
            that._render()
        },
        _render: function(data) {
            var html = $Rk.tplRender(dot, $('#j_loginForm').html(), data || {});
            this._container.html(html);
            this._interact(data)
        },
        _interact: function(data){
            var that = this
            that._container.on('keydown', 'input', function(e){
                // console.log(e.which);
                if($('.modal.fade.in').length) {
                    return
                }
                if(e.which===13){
                    that.bindValidate(1)
                }
            })
            that._container.on('click', '[data-op]', function (e) {
                var thats = $(this),
                    op = thats.data('op');
                switch(op){
                    case 'login':
                        that.bindValidate()
                        // that.submitLoginForm()
                    break
                    case 'refreshVeri':
                        that.refreshVerifyCode()
                    break
                    case 'reg':
                        that.goRegisteForm()
                    break
                    case 'forgetPass':
                        that.goforgetPassForm()
                    break
                }
            })
        },
        bindValidate: function () {
            var that = this;
                that.validate = new Validate();
                that.validate.sb({
                    form: 'loginForm',
                    sb: 'btnLogin',
                    display: 'inline-block',
                    preventSubmit: arguments[0]===1,
                    success: function(form, btn) {
                        // console.log(form, btn)
                        that.submitLoginForm()
                    }
                })
        },
        submitLoginForm: function () {
            var that = this,
                loginInfo = {
                    "account":  $('[name="username"]').val(),
                    "password": $('[name="password"]').val()
                };
            if ($('#verify input').val()) {
                loginInfo.verify_code = $('#verify input').val()
            }
            if($('#verify').css('display')=='none') $('.login-input-area').removeClass('pt25')
            $('#verify input').removeAttr('data-v').removeAttr('data-err')
            new Ajax({
                url : loginUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : loginInfo,
                dataType: 'json',
                // Content-Type:'application/json',
                success : function (data) {
                    //console.log('suc:',data)
                    if (!data.success) {
                        count++
                        if (count===3) {
                            new Ajax({
                                url : verifyCodeUrl,
                                type : 'post',
                                xhrFields: { withCredentials : true },
                                data : {"width":"100","height":"40"},
                                dataType: 'json',
                                success: function (imgInfo) {
                                    $('#verify img').attr('src', imgInfo.data.image)
                                    $('#verify').show().find('input').attr('data-v',"require-minlength|4").attr('data-err', "验证码不能为空")
                                    //console.log(imgInfo)
                                }
                            })
                            $('#verify').parents('.login-input-area').addClass('pt25')
                            that.refreshVerifyCode()
                        };
                        var dialog = new Dialog({
                            title: '登录提示',
                            content: '<p class="ui-msg ui-msg-warning">'+data.msg+'</p>',
                            confirmFun: function (dialog,button) {
                                // self.delRequest(dataId,button,that);
                                // window.setTimeout(function () {
                                dialog.close();
                                (count>=3)&&that.refreshVerifyCode()
                                // }, 1000)
                            }
                        });
                        dialog.open();
                        return
                    }
                    count = 0
                    $('#verify').hide()
                    // window.location.href = 'http://test.h5plus.net/portal/index.action'
                    var dashboardPage = RKC.mainSuffix?'./pc/photon' + RKC.mainSuffix:'./photon'
                    window.location.href = /*'http://test.h5plus.net/portal/index.action' ||*/ dashboardPage
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        refreshVerifyCode:function () {
          new Ajax({
                    url : verifyCodeUrl,
                    type : 'post',
                    xhrFields: { withCredentials : true },
                    data : {"width":"100","height":"40"},
                    dataType: 'json',
                    success: function (imgInfo) {
                        $('#verify img').attr('src', imgInfo.data.image)
                        $('#verify').parents('.login-input-area').addClass('pt25')
                        $('#verify').show()
                        //console.log(imgInfo)
                    }
                })  
        },
        goRegisteForm: function () {

            $('.form-window-login').addClass('flip-h')
            $('.form-window-login-logo.back').removeClass('hide')
            $('.form-window-login-logo.forget').addClass('hide')
        },
        goforgetPassForm: function () {

            $('.form-window-login').addClass('flip-r')
            $('.form-window-login-logo.back').addClass('hide')
            $('#forget_pwd').show()
            $('.login-input-area.forget').show()
        }
    });


    var regForm = new $Rk.VC({
        _init: function () {
            var that = this
            $Rk.listener.on('plat', 'ready', function(token, config) {
                that._pageInit()
            });
        },
        _container: $('#reg_form'),
        _pageInit:function () {
            this._render()
        },
        _render:function (data) {
            var html = $Rk.tplRender(dot, $('#j_regForm').html(), data || {});
            this._container.html(html);
            this._interact(data)
        },
        _interact:function (data) {
            
            new areaSelect().areaInit();
            
            var that = this
            // $('[data-op="cellphone"]').on('keyup', function (e) {
                // this.value = this.value.replace(/[^\d]/g,'')
            // })
            that._container.on('click', '[data-op]', function (e) {
                var thats = $(this),
                    op = thats.data('op');
                switch(op){
                    case 'backLogin':
                        that.backLoginForm()
                    break
                    case 'getSms':
                        // that.bindValidate('GetSms', that.getSmsForm, 'regForm')
                        $.when($('#subBtn').click()).then(function () {
                            $('[name="phoneveri"]').removeClass('error')
                            $('[name="phoneveri"]').next('.errors')[0].outerHTML = '<p class="errors hide">DATA-ERR</p>'
                            !$('#phone1st').hasClass('error') && that.getSmsForm()
                        })
                        // $('#phone1st').blur()
                    break
                    case 'startReg':
                        that.bindValidate('subBtn', that.startRegForm)
                        // that.startRegForm()
                    break
                    case 'areaSel':
                        // that.bindValidate('nextConfirm', that.nextConfirmForm)
                        that.areaSelectCom()
                    break
                    case 'prevStartReg':
                        that.prevStartRegForm()
                    break
                    case 'nextConfirmReg':
                        that.bindValidate('nextConfirm', that.nextConfirmForm, 'regForm2')
                        // that.nextConfirmForm()
                    break
                    /*case 'nextConfirmReg':
                        that.phoneDetect()
                    break*/
                    case 'confirmReg':
                        that.bindValidate('regConfirm', function () {
                            that.confirmRegForm(thats)
                        }, 'regForm3')
                        // that.confirmRegForm()
                    break
                    case 'confirmPrev':
                        that.confirmPrevForm()
                    break
                }
            })
        },
        bindValidate:function (bn, func) {
            var that = this;
                _form = arguments[2] || 'regForm',
                that.validate = new Validate();
                that.validate.sb({
                    form: _form,
                    sb: bn,
                    preventSubmit: false,
                    display: 'inline-block',
                    success: function(form, btn) {
                        func && func()
                    }
                })
        },
        backLoginForm: function () {
        
            $('.form-window-login').removeClass('flip-h').removeClass('flip-r')
        },
        getSmsForm: function () {
            var smsInfo = {
                    "tel":  $('[name="phone"]').val(),
                    "send_type": '04'
                },
                iptTel = $('[name="phone"]'),
                btnSendMsg = $('.r-btn'),
                reload,
                countDown = 120;
            
            // if ($.trim(iptTel.val())==='') {
            //     return
            // }

            btnSendMsg.addClass('disabled')
            btnSendMsg.attr('data-op', null)
            
            new Ajax({
                url : phoneUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : smsInfo,
                dataType: 'json',
                // Content-Type:'application/json',
                success : function (data) {
                    //console.log('tel-suc:',data)
                    
                    if (data.success==false) {
                        dialog(data.message||data.msg)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'regSub')
                        return
                    }

                    if (!!+data.code) {
                        dialog(data.msg)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'f_getSms')
                        return
                    }
                    if (data.error_response) {
                        dialog(data.error_response.msg)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'regSub')
                        return
                    }
                    // dialog(data.msg)
                    reload = setInterval(function () {
                        countDown--
                        btnSendMsg.html('('+countDown + ')重新发送<i class="icon-fb-arrow"></i>')
                        if (countDown==0) {
                            clearInterval(reload)
                            btnSendMsg.html('重新发送<i class="icon-fb-arrow"></i>')
                            btnSendMsg.removeClass('disabled')
                            btnSendMsg.attr('data-op', 'regSub')
                        }
                    },1000)
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        startRegForm: function () {
            var regInfo = {
                    "tel":  $('[name="phone"]').val(),
                    "sms_verify_code":  $('[name="phoneveri"]').val(),
                    "send_type": '04'
                };
            
            new Ajax({
                url : verifyCheckUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : regInfo,
                dataType: 'json',
                success : function (data) {
                    //console.log('start-reg:',data)
                    
                    if (data.success==false) {
                        dialog(data.message||data.msg)
                        return
                    }
                    /*if (!!+data.code) {
                        dialog(data.msg)
                        return
                    }*/
                    // dialog(data.msg)
                    $('.start-reg').fadeOut('fast',function () {
                        $('.reg2').fadeIn('fast')
                    })
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        areaSelectCom: function () {
            // areaSelect()
        },
        prevStartRegForm: function () {
            
            $('.reg2').fadeOut('fast',function () {
                $('.start-reg').fadeIn('fast')
            })
        },
        nextConfirmForm: function () {
            
            $('.reg2').fadeOut('fast',function () {
                $('.reg3').fadeIn('fast')
            })
        },
        confirmRegForm: function (dom) {
            var that = this,
                addr = $('#start1').val(),
                _area = addr.split('-')[2] || '',
                confirmInfo = 
                {
                   "name": $('[name="name"]').val(),
                   "simple_name":$('[name="account"]').val(),
                   "email":"",
                   "password":$('[name="account_pwd"]').val(),
                   "tel":$('[name="phone"]').val(),
                   "sms_verify_code":$('[name="phoneveri"]').val(),
                   "province":addr.split('-')[0],
                   "city":addr.split('-')[1],
                   "area":addr.split('-')[2],
                   "detail_address":""
                },
                trigger = dom.attr('data-op');
                /*{
                    "tel":  $('[name="phone"]').val(),
                    "sms_verify_code":  $('[name="phoneveri"]').val(),
                    "send_type": '04'
                }*/
            // dom.attr('data-op', '')
            new Ajax({
                url : confirmRegistUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : confirmInfo,
                dataType: 'json',
                'Content-Type':'application/json',
                success : function (data) {
                    // console.log('confirm-reg:',data)
                    // console.log('confirmInfo:',confirmInfo)
                    
                    if (data.code==400 || data.success==false) {
                        var _msg = /已经存在/i.test(data.msg)?'账号名称已存在':data.msg
                        dialog(_msg)
                        return
                    }

                    // 注册完成信息埋码
                    bas.__events.signup.track(confirmInfo);

                    dialog(data.msg, function () {
                        $('.reg3').fadeOut('fast',function () {
                            $('.start-reg').fadeIn('fast')
                            // dom.attr('data-op', trigger)
                            that.backLoginForm()
                        })
                    })
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        confirmPrevForm: function () {
            $('.reg3').fadeOut('fast',function () {
                $('.reg2').fadeIn('fast')
            })
        }
    });


    var forgetPwd = new $Rk.VC({
        _init: function () {
            var that = this
            $Rk.listener.on('plat', 'ready', function(token, config) {
                that._pageInit()
            });
        },
        _container: $('#forget_pwd'),
        _pageInit:function () {
            this._render()
        },
        bindValidate:function (bn, func) {
            var that = this;
                that.validate = new Validate();
                that.validate.sb({
                    form: 'forgetForm',
                    sb: bn,
                    preventSubmit: false,
                    display: 'inline-block',
                    success: function(form, btn) {
                        func && func()
                    }
                })
        },
        _render:function (data) {
            var html = $Rk.tplRender(dot, $('#j_forgetPwd').html(), data || {});
            this._container.html(html);
            this._interact(data)            
        },
        _interact:function (data) {
            var that = this
            that._container.on('click', '[data-op]', function (e) {
                var thats = $(this),
                    op = thats.data('op');
                switch(op){
                    case 'backLogin':
                        that.backLoginForm()
                    break
                    case 'f_getSms':
                        // that.bindValidate('fGetSms', that.resetSmsForm)
                        // that.resetSmsForm()
                        $.when($('#f_subBtn').click()).then(function () {
                            $('[name="f_phoneveri"]').removeClass('error')
                            $('[name="f_password"]').next('.errors')[0].outerHTML = '<p class="errors hide">DATA-ERR</p>'
                            $('[name="f_phoneveri"]').next('.errors')[0].outerHTML = '<p class="errors hide">DATA-ERR</p>'
                            !$('#phone2nd').hasClass('error') && that.resetSmsForm()
                        })
                    break
                    case 'confirmUpdate':
                        that.bindValidate('f_subBtn', that.confirmUpdateForm)
                        return
                        var isValid = true
                        $('#forgetForm input').each(function (i, m) {
                            if (!$.trim(m.value)) {
                                isValid = false
                            }
                        })
                        if (isValid) {
                            that.confirmUpdateForm()
                        }/*else{
                            dialog('输入不能为空！')
                        }*/
                    break
                }
            })
        },
        backLoginForm: function () {
        
            $('.form-window-login').removeClass('flip-r').removeClass('flip-h')
        },
        resetSmsForm:function () {
            var resetSmsInfo = {
                    "tel":  $('[name="f_phone"]').val(),
                    "send_type": '01'
                },
                iptTel = $('[name="f_phone"]'),
                btnSendMsg = $('.f-btn'),
                reload,
                countDown = 120,
                _title = '忘记密码'
            
            if ($.trim(iptTel.val())==='') {
                return
            }

            btnSendMsg.addClass('disabled')
            btnSendMsg.attr('data-op', null)
            
            new Ajax({
                url : phoneUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : resetSmsInfo,
                dataType: 'json',
                // Content-Type:'application/json',
                success : function (data) {
                    //console.log('tel-suc:',data)

                    if (data.success==false) {
                        dialog(data.message, null, _title)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'f_getSms')
                        return
                    }
                    if (data.error_response) {
                        dialog(data.error_response.msg, null, _title)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'f_getSms')
                        return
                    }
                    if (!!+data.code) {
                        dialog(data.msg, null, _title)
                        btnSendMsg.removeClass('disabled')
                        btnSendMsg.attr('data-op', 'f_getSms')
                        return
                    }
                    
                    dialog(data.msg, null, _title)
                    reload = setInterval(function () {
                        countDown--
                        btnSendMsg.html('('+countDown + ')重新发送<i class="icon-fb-arrow"></i>')
                        if (countDown==0) {
                            clearInterval(reload)
                            btnSendMsg.html('重新发送<i class="icon-fb-arrow"></i>')
                            btnSendMsg.removeClass('disabled')
                            btnSendMsg.attr('data-op', 'f_getSms')
                        }
                    },1000)
            
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        confirmUpdateForm : function (code) {

            var resetInfo = {
                "tel":  $('[name="f_phone"]').val(),
                "sms_verify_code":  $('[name="f_phoneveri"]').val(),
                "new_pwd": $('[name="f_password"]').val()
            },
            _title = '忘记密码';
            
            new Ajax({
                url : resetPwdUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : resetInfo,
                dataType: 'json',
                success : function (data) {
                    //console.log('start-reg:',data)
                    
                    if (data.success==false) {
                        dialog(data.message, null, _title)
                        return
                    }
                    if (!!+data.code) {
                        dialog(data.msg, null, _title)
                        return
                    }
                    dialog(data.msg, function () {
                        $('.forget').fadeOut('fast',function () {
                            $('.start-reg').fadeIn('fast')
                            $('.form-window-login').removeClass('flip-r')
                        })
                    }, _title)
                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        }
    });
    

/**
 * BAS ViewHomePage 埋点
 */
var oldLoad = window.onload;
oldLoad.apply(oldLoad, arguments);
bas.__events.ViewHomePage.track();

}//end of tempReady

    $Rk.plat.s(function(){
        tempReady()
    })

});
