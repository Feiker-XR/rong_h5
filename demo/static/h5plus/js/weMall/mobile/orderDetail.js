/*
* @Author: Administrator
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-07 15:57:53
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll', '$swiper'],
    function(Ajax,dot, h5sdk, IScroll, Swiper){

    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var getOrderDetail = $$r.routers.data.link.getDetail + h5sdk_param;
            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
           	var isWeChat = RKC.mobile.isWeChat;

        var header = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(token, config) {
                	RKC.mobile.resize();
					// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					me._render(config)
                });

                // if (/Android/ig.test(window.navigator.userAgent)) {
                //     $('#cont').css('margin-top', '3.2rem')
                // }

                $rk.listener.on('page', 'loading', function(token, json) {
                	$('#scroller').append('<div class="cont-all"><p class="loading"></p></div>')
                	setTimeout(function () {
                		$('#scroller .cont-all').remove()
                	},500)
                });
            },
            _container: $('header'),
            _render: function(data) {
            	var html = $rk.tplRender(dot, $('#j_header').html(), data || {});
                this._container.html(html);
                this._interact(data)
            },
            _interact: function(data){
            }
        });

        var pageComponent = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(token, config) {
                    me._getDetails();
                });
                
                $rk.listener.on('page', 'onData', function(token, json) {
                    console.log('origin:',json)
					me._render(json)
                });
            },
            _container: $('#cont'),
            //order.get
            _getDetails: function () {
            	var that = this,
            		postParam = JSON.stringify({
                                            order_id : +$rk.getUrlAllParam().order_id
                                            // ,error_test: true
                                        }),
                	option = {
                    url : getOrderDetail,
                    contentType:'application/json',
                    dataType: 'json',
                    data : postParam,
                    type: 'post',
                    success: function(json) {
                    	if (json.error_response) {
                    		alert(json.error_response.msg)
                    		return
                    	}

                        var obj = {};
                        Object.getOwnPropertyNames(json).map(function(o){
                            obj = json[o]
                        });
                        
                        $rk.listener.trigger('page', 'onData', obj);
                    },
                    beforeSend:function(){
                    	$rk.listener.trigger('page', 'loading', {});
                    }
                }
                new Ajax(option);
            },
            _render: function(data) {
                data.addPageLink = addPageLink
            	console.log(data)
                var html = $rk.tplRender(dot, $('#j_cont').html(), data || {});
                this._container.html(html);
                // var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
                this._interact(data)
            },
            _interact: function(data){
                $('#cont').on('click', '[data-op]', function (e) {
                    if ($(this).data('op')=='test') {
                    }
                })
            }
        });

        /*var footer = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(token, config) {
                	me._render(config)
                });
            },
            _container: $('footer'),
            _render: function(data) {
                data.addPageLink = addPageLink
                var html = $rk.tplRender(dot, $('#j_footer').html(), data || {});
                this._container.html(html);
                this._interact()
            },
            _interact: function(){
                this._container.on('click', '[data-op]', function (e) {
                    var op = $(this).data('op')
                    switch(op){
                        case 'home' :
                        window.location.href = 'home' + RKC.mobile.mainSuffix + '?id=49&page_id=1'
                        break
                        case 'group' :
                        alert('开发中，敬请期待。')
                        return
                        window.location.href = 'group' + RKC.mobile.mainSuffix
                        break
                        case 'cart' :
                        window.location.href = 'cart' + RKC.mobile.mainSuffix
                        break
                        case 'uc' :
                        window.location.href = 'ucenter' + RKC.mobile.mainSuffix
                        break
                    }
                })
            }
        });*/
    }

    $Rk.plat.s(function () {
        h5sdk.ready(function () {
            tempReady()
        })
    })
});