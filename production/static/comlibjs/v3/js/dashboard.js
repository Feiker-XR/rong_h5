/* 
* @Author: zhaoxiaoyang
* @Date:   2016-04-27 17:45:10
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-20 18:43:46
*/

// 'use strict';
seajs.use(['dot', 'Ajax', 'Dialog', 'socket'
        ,'jquery183'
        ,'jquery183UI'
        ,"bootstrap.min"
        ,"modernizr.custom"
        ,"jquery.pnotify.min"
        ,"less-1.3.1.min"
        ,"xbreadcrumbs"
        ,"jquery.maskedinput-1.3.min"
        ,"jquery.autotab-1.1b"
        ,"charCount"
        ,"jquery.textareaCounter"
        ,"elrte.min"
        ,"elrte.en"
        ,"select2"
        ,"jquery.dataTables.min"
        ,"jquery.validate.min"
        // ,"additional-methods.min"
        ,"jquery.form"
        ,"jquery.metadata"
        ,"jquery.mockjax"
        ,"jquery.uniform.min"
        ,"jquery.tagsinput.min"
        ,"jquery.rating.pack"
        ,"farbtastic"
        ,"jquery.timeentry.min"
        ,"jquery.jstree"
        // ,"dataTables.bootstrap"
        ,"jquery.mousewheel.min"
        ,"jquery.mCustomScrollbar"
        ,"jquery.flot"
        // ,"jquery.flot.pie"
        // ,"jquery.flot.resize"
        // ,"jquery.flot.stack"
        // ,"raphael.2.1.0.min"
        ,"justgage.1.0.1.min"
        ,"jquery.qrcode.min"
        ,"jquery.clock"
        ,"jquery.countdown"
        ,"jquery.jqtweet"
        ,"jquery.cookie"
        // ,"jquery-picklist.min"
        ,"bootstrap-fileupload.min"
        ,"prettify"
        ,"bootstrapSwitch"
        ,"mfupload"
        // ,"common"
    ], function(dot, Ajax, Dialog, socket) {

var tempReady = function () {

    var wechatUrl = $$r.routers.data.link.wechatAccount;
    var socketIO = 'isvsocket.h5plus.net:3000';
    var dialog = function () {
                    var cont = arguments[0],
                        callback = arguments[1],
                        title = arguments[2] || '提示',
                        isButton = arguments[3],
                        isClose = arguments[4],
                        dig = new Dialog({
                        title: title,
                        content: cont,
                        isButton: isButton,
                        isClose: isClose,
                        confirmFun: function (dialog,button) {
                            callback && callback()
                            dialog.close();
                        }
                    });
                    dig.open()
                    return dig
                };
    var digger = 'Dialog';

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
        _container: $('#topRight'),
        _pageInit:function () {
            this._render()
        },
        _render: function(data) {
            var html = $Rk.tplRender(dot, $('#j_topRight').html(), data || {});
            this._container.html(html);
            this._interact(data)
        },
        onDomContentLoaded: function () {
            // new portalAnim().animInit()
            var that = this
            that.getWeChatAccount()

            //publisher
            $rk.listener.on('tips', 'success', function (token, str) {
                dialog(str, function () {}, '公众号授权提示', false, false)
            })
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
                    case 'wechatHandler':
                    that.gotoWechatAuth()
                    break
                }
            })
        },
        getWeChatAccount: function () {
            var postInfo = {};
            var that = this;
            
            new Ajax({
                url : wechatUrl,
                type : 'post',
                xhrFields: { withCredentials : true },
                data : postInfo,
                dataType: 'json',
                // Content-Type:'application/json',
                success : function (data) {
                    //console.log('suc:',data)
                    if (data.error_response) {
                        dialog(data.error_response.msg, function () {
                            window.location.href = $$r.origin
                        })
                        return
                    }
                    // if (!0) {
                    if (!data.hfive_wechat_account_check_response.is_pub_contain) {
                        var bindWechatTemplate = '<div style="text-align:center;">\
                                                  <h4>立即绑定微信公众号！</h4>\
                                                  <a href="http://h5plus.net/auth-portal/module/redirect?module_name=wechatauth" target="_blank" class="btn-wehchat">\
                                                  <i class="icon-fb"></i>微信公众号登录授权<i class="icon-fb-arrow"></i></a>\
                                                  <div>\
                                                    关于微信登录授权：商家通过微信公众号登录授权给系统平台，<br />\
                                                    将在平台的帮助下完成公众号运营业务。<br />\
                                                    QQ群咨询: 535070746    电话咨询：0411－39759286\
                                                  </div>\
                                              </div>\
                                             ';
                        digger = dialog(bindWechatTemplate, function () {
                            // that._interact()
                        }, '公众号授权提示', false, false)
                            setTimeout(function () {
                                RKC.ajaxMenuTree.success(function () {
                                        that.socketListener()
                                })
                            },1000)
                    }

                },
                error : function (argument) {
                    console.log('err:',argument)
                }
            })
        },
        socketListener: function() {
                var me=this,
                    socket = io.connect('ws://'+socketIO);
                RKC.ajaxUserInfo.then(function () {
                    var sessionId = RKC.userinfo.data.session_id;
                    socket.on('refresh', function (data) {
                        if(data.status!=null){
                            if(data.status=='success'){
                                digger.close()
                            }else{
                                $rk.listener.trigger('tips', 'success','socket调用失败！');
                            }
                        }
                    });
                    socket.emit('refresh', {'session_id':sessionId});
                })
            },
        gotoWechatAuth: function () {
            // var _url = RKC.mainSuffix
            // window.location.href = 'http://h5plus.net/H5PlusISV/index.php/Business/WeixinAuth/auth?company_id=19&company_key=ff8080814d8922fe014d8e18c9fd0004&user_id=32&session_id=5941c5041a854bf8aeb3e973b5f8aec5'
        }
    })

// console.log(jq18.fn.jquery)
    /**
     * [data model]
     */
    // var contList = ['contFansData', 'contFansTrend', 'contFansActive', 'contBroadcast', 
    //                'contSales', 'contCustomMenu', 'contWechatMsg', 'contQrcode']

    // $$r.photon = !0;

    	
    // 	dataRender = function (url) {

	   //  	this.init = function () {
	   //  		new Ajax({
	   //              url: url,
	   //              success: function(json) {

	   //                  if (json && json.errno === 10000 && json.data) {
	                    	
	   //                  	domRender(json.data, ['leftNav'])

	   //                  } else {
	   //                      alert("您当前没有系统使用权限，请联系管理员为您开通所需权限")
	   //                  }
	   //              },
	   //              beforeSend: function() {

	   //              },
	   //              dataType: 'json'
	   //          });
	   //  	}
	   //  	this.init()
	   //  },

	   //  domRender = function (data, domArr) {

	   //  	domArr.forEach(function (m ,i) {

	   //          var js = $('#j_'+m),
	   //          	cont = $('#'+m),
	   //          	html = $rk.tplRender(dot, js.html(), data || {});
	   //          cont.append(html);

	   //  	})

	   //  };
    // // new dataRender('http://test.h5plus.net/static/comlibjs/v3/js/showtree.js')
    // new dataRender(window.location.origin + '/site/showtree')
    // domRender({}, ['topRight','contTitle'])
    // domRender({}, contList)




    /**
     * [interact]
     */
    setTimeout(function(){$('.bar').css('width', '10rem')},1000)
    var widgetsLoaded = widgetsLoaded || {};
    return
    if (widgetsLoaded['overall-earnings-graph']) return;
    widgetsLoaded['overall-earnings-graph'] = true;
    var data = [];
    for( var i = 0; i < 3; i++) {
        data[i] = { label: "&nbsp;Series&nbsp;"+(i+1), data: Math.floor(Math.random()*100)+1 }
    }
    var donut = $("#donut").get(0)?$("#donut"): $('<div id="donut" style="width:260px;height:133px;"></div>')
    $.plot(donut, data, {
        colors: ["#aad5f5", "#008fde", '#c6d695'],
        legend: { backgroundOpacity: 0 }, 
        series: {
            pie: { 
                innerRadius: 0.5,
                show: true
            }
        }
    });
    $(".overall-earnings-graph select").select2();

    if (widgetsLoaded['overall-views-graph']) return;
    widgetsLoaded['overall-views-graph'] = true;
    var d1 = [];
    for (var i = 0; i <= 30; i += 1)
        d1.push([i, parseInt(Math.random() * 30)]);
    var d2 = [];
    for (var i = 0; i <= 30; i += 1)
        d2.push([i, parseInt(Math.random() * 30)]);
    var ph = $("#placeholder").get(0) ?$("#placeholder"): $('<div id="placeholder" style="width:260px;height:133px;"></div>')
    $.plot(ph, [ d1, d2 ], {
        grid: { show: true, borderWidth: 0.2 },
        xaxis: { show: true, ticks: 0 },
        yaxis: { show: true, ticks: 8, color: '#bbb'},
        colors: ["#aad5f5", "#008fde"],
        series: {
            stack: 0,
            fill: 1,
            bars: { show: true, barWidth: 0.9, lineWidth: 0, fill: 1 }
        }
    });

    $(".overall-views-graph select").select2();

    if (widgetsLoaded['realtime-data-graph']) return;
    widgetsLoaded['realtime-data-graph'] = true;

    var data = [], totalPoints = 15;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 20 - 10;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }
    var updateInterval = 600;
    var options = {
        series: {   shadowSize: 0, 
            lines: { show: true, fill:true, fillColor: { colors: [{opacity: 0.25}, {opacity: 0}] } }, 
            points: { show: true, radius: 2, color: '#008fde' }
        },
        grid: { show: true, borderWidth: 0.2 },
        xaxis: { show: true, ticks: 0 },
        yaxis: { show: true, min: 0, max: 100, ticks:8, color: '#bbb'},
        colors: ["#aad5f5"]
    };
    var realtime = $("#realtime").get(0) ?$("#realtime"): $('<div id="realtime" style="width:260px;height:133px;"></div>')
    var plot = $.plot(realtime, [ getRandomData() ], options);
    function update() {
        plot.setData([ getRandomData() ]);
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();

    $(".realtime-data-graph select").select2();

	//ready
    $(".widget-general-stats select").select2();

    if (widgetsLoaded['widget-latest-users']) return;
    widgetsLoaded['widget-latest-users'] = true;
    
    $('.widget-latest-users li').each(function () {
        var thisUserName = $('span', this).text();
        var thisImgSrc = $('img', this).attr('src');
        var tooltipTemp = $('.widget-tip-template').clone(true, true);
        
        $('.user-name', tooltipTemp).text(thisUserName);
        $('.avatar-big', tooltipTemp).attr('src', thisImgSrc);

        $('img', this).tooltip({
            placement: 'top',
            html: true,
            trigger: 'manual',
            title: tooltipTemp.html()
        });
    });

    var hoverUsersTimeout, $activeQL;
    $('.widget-latest-users li').hover(function () {
        if (!$(this).find('.tooltip').length){
            $activeQL = $(this);
            clearTimeout(hoverUsersTimeout);
            hoverUsersTimeout = setTimeout(function() {
                $activeQL.find('img').tooltip('show');
            }, 500);
        }
    }, function () {
        $('.widget-latest-users li').find('img').tooltip('hide');
        clearTimeout(hoverUsersTimeout);
    });

    $(".widget-latest-users select").select2();

    if (widgetsLoaded['task-completion']) return;
    widgetsLoaded['task-completion'] = true;
    setTimeout(function() {
        var target = parseInt($('.processed-pct .bar').attr('data-target'));
        $('.processed-pct .bar').attr('style', 'width: ' + target + '%');
    }, 1000);

    $(".task-completion select").select2();

    if (widgetsLoaded['tweet-widget']) return;
    widgetsLoaded['tweet-widget'] = true;

    jqtweet.loadTweets({
        user: 'envato',
        numTweets: 1
    });

    $(".tweet-widget select").select2();

    if (widgetsLoaded['qr-code-generation']) return;
    widgetsLoaded['qr-code-generation'] = true;

    $('#qrcode').qrcode({
        text: "http://themeforest.net",
        render  : "table",
        width       : 128,
        height      : 128
    });

    $(".qr-code-generation select").select2();
    $("#multiFilter").select2();

            var isDragActive = false;
            // Quicklaunch Widget
            $( "#sortable" ).sortable({
                cancel: '#sortable li:last-child',
                start: function(event, ui) {
                    isDragActive = true;
                    $('.dashboard-quick-launch li img').tooltip('hide');
                },
                stop: function(event, ui) {
                    isDragActive = false;
                },
                containment: 'parent',
                tolerance: 'pointer'
            });

            // Make widgets sortable
            $( "#photon_widgets" ).sortable({
                cancel: '.blank-widget, .flip-it',
                placeholder: 'dashboard-widget-placeholder',
                start: function(event, ui) {
                    isDragActive = true;
                    $('.widget-holder').addClass('noPerspective');
                    $('.dashboard-quick-launch li img').tooltip('hide');
                },
                stop: function(event, ui) {
                    isDragActive = false;
                    $('.widget-holder').removeClass('noPerspective');
                },
                tolerance: 'pointer'
            });


            $('.dashboard-quick-launch li img').not('.dashboard-quick-launch li:last-child').tooltip({
                placement: 'top',
                html: true,
                trigger: 'manual',
                title: '<a href="javascript:;"><span class="left">Edit</span></a><a href="javascript:;"><span class="right">Delete</span></a>'
            });


            var hoverTimeout;
            $('.dashboard-quick-launch li').hover(function () {
                if (!$(this).find('.tooltip').length){
                    $activeQL = $(this);
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(function() {
                        if (isDragActive) return;
                        $activeQL.find('img').tooltip('show');
                    }, 1000);
                }
            }, function () {
                clearTimeout(hoverTimeout);
                $('.dashboard-quick-launch li').find('img').tooltip('hide');
            });
            setTimeout(function(){
                $.pnotify({
                    title: '我是推送消息1',
                    type: 'info',
                    text: '我是推送消息1 我是推送消息1 我是推送消息1'
                });
            }, 2000);
            setTimeout(function(){
                $.pnotify({
                    title: '我是推送消息2',
                    type: 'info',
                    text: ' 我是推送消息1 我是推送消息1 我是推送消息1 '
                });
            }, 7000);
            var firstHover = true;
            $('.dashboard-quick-launch li').hover(function(){
                if (firstHover) {
                    firstHover = false;
                    setTimeout(function(){
                        $.pnotify({
                            title: '我是推送消息3',
                            type: 'info',
                            text: '我是推送消息1 我是推送消息1 我是推送消息1 我是推送消息1 '
                        });
                    }, 400);
                }
            });

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
    $('.user-sub-menu-container').on('click', function(){
        $(this).toggleClass('active-user-menu');
    });
    $('.user-sub-menu .light').on('click', function(){
        if ($('body').is('.light-version')) return;
        $('body').addClass('light-version');
        setTimeout(function() {
            $.cookie('themeColor', 'light', {
                expires: 7,
                path: '/'
            });
        }, 1500);
    });
    $('.user-sub-menu .dark').on('click', function(){
        if ($('body').is('.light-version')) {
            $('body').removeClass('light-version');
            $.cookie('themeColor', 'dark', {
                expires: 7,
                path: '/'
            });
        }
    });
	
}//end of tempReady

    $Rk.plat.s(function(){
        tempReady()
    })

});
