/*
* @Author: Administrator
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-11 18:59:04
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll', '$swiper', 'areaData', 'jweixin'],
    function(Ajax,dot, h5sdk, IScroll, Swiper, areaData, jweixin){

    window.jweixin = jweixin
    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var footGetUrl = $$r.routers.data.link.getFoot + h5sdk_param;
            var orderPayUrl = $$r.routers.data.link.orderPay + h5sdk_param;
            var getAddressUrl = $$r.routers.data.link.getAddress + h5sdk_param;
            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
           	var isWeChat = RKC.mobile.isWeChat;
            var cacheData = {};
            var urlList = {
                    address : 'address' + RKC.mobile.mainSuffix,
                    paysuccess : 'paysuccess' + RKC.mobile.mainSuffix
                },
                isAddress = false,
                accountObj = $Rk.LSO('wemall');
            accountObj.pay_account = $Rk.getUrlAllParam().pay_account
            accountObj.openid = $Rk.getUrlAllParam().openid
            accountObj.order_id = $Rk.getUrlAllParam().id
            $Rk.LSO('wemall', accountObj)

        var header = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(token, config) {
                	RKC.mobile.resize();
					// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					me._render(config)
                });

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
                    // if (!$('.com p.title span').get(0)) {
                        me._getGoods();
                    // }
                });
                
                $rk.listener.on('page', 'onData', function(token, json) {
                    console.log('origin:',json)
					me._render(json)
                });
            },
            _container: $('#cont'),
            //order.get
            _getGoods: function () {
            // accountObj.openid = $Rk.getUrlAllParam().openid
            	var that = this,
            		postParam = JSON.stringify({
                                            order_id : +$rk.getUrlAllParam().id
                                            // ,error_test: true
                                        }),
                	option = {
                    url : footGetUrl,
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
                        cacheData.obj = obj
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
                cacheData.order_no = data.order_no
                cacheData.order_id = data.order_id
            	console.log(data)
                var self = this,
                    html = $rk.tplRender(dot, $('#j_cont').html(), data || {});
                self._container.html(html);
                // var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
                
                //address.get
                new Ajax({
                    url : getAddressUrl,
                    // data : {},
                    contentType:'application/json',
                    dataType: 'json',
                    type : 'post',
                    success:function (data) {
                        if (data.error_response) {
                            console.log(data.error_response.msg)
                            self._interact(cacheData.obj)
                            return
                        };
                        var obj = {};
                        Object.getOwnPropertyNames(data).map(function(o){ obj = data[o] });
                        
                        if (obj.address_id) {
                            isAddress = true
                            $('.address .loc span').text('[修改地址]')
                            $('.address .info span').removeClass('red')
                            $('.address .info p:eq(0)').css('text-align', 'left')
                            $('.address .info p:eq(1)').attr('data-op', '')
                            $('.address .info p:eq(1)').text('姓名：'+obj.name + ' ' + obj.tel)
                            $('.address .info span').text(areaData[obj.province][0] + areaData[obj.city][0] + areaData[obj.area][0])
                            $('.address .loc span').on('click', function (e) {
                                var _param = '?address_id='+obj.address_id;
                                // window.location.href = urlList.address + _param + '&'+window.location.search.substr(1) + '&store_id=' + cacheData.obj.store_id
                                window.location.href = urlList.address + _param + '&'+$rk.setUrlParam('id', cacheData.obj.store_id)
                            })
                        }
                        cacheData.address_id = obj.address_id || 0
                        self._interact(obj)
                    },
                    beforeSend:function () {
                    },
                    fail:function (xhr, state) {
                    }
                })
            },

            _interact: function(data){
                var self = this;
                
                $('#cont').on('click', '[data-op]', function (e) {
                    var op = $(this).data('op');
                    switch(op){
                        // console.log('将调用微信支付接口。')
                        case 'pay':
                        self.orderPay()

                        break
                        case 'address':
                        var _param = isAddress?'?address_id='+data.address_id+ '&':'?'
                        window.location.href = urlList.address + _param + $rk.setUrlParam('id', cacheData.obj.store_id)
                        break
                    }
                })
            },
            orderPay: function () {
                if(!isAddress){
                            alert('请填写收货地址！')
                            return
                        }

                        //order.pay
                        /*new Ajax({
                            url : orderPayUrl,
                            data : JSON.stringify({
                                        order_no : cacheData.order_no,
                                        address_id: +$rk.getUrlAllParam().addressid || +data.address_id,    //int型,必须,【收货地址id】
                                        payopenid: $rk.getUrlAllParam().openid || "0"    //string型,必须,【open_id】
                                    }),
                            contentType:'application/json',
                            dataType: 'json',
                            type : 'post',
                            success:function (data) {
                                if (data.error_response) {
                                    alert(data.error_response.msg)
                                    return
                                };
                                data = data.hfive_weidian_order_pay_response
                                var _parm = '?order_id=' + cacheData.order_id + '&order_no=' + cacheData.order_no + '&id=' + cacheData.order_id
                                window.location.href = urlList.paysuccess + _parm
                            },
                            beforeSend:function () {
                            },
                            fail:function (xhr, state) {
                            }
                        })*/

                        var openid = h5sdk.getOpenid();
                        //需要使用openid机制的，都写在ready里边
                        h5sdk.callPHPAPIByName(pid, 'ruixue.hfive.weidian.order.pay', {
                                                            "order_no": cacheData.order_no,
                                                            "address_id": +$rk.getUrlAllParam().addressid || +cacheData.address_id,    //int型,必须,【收货地址id】,
                                                            "payopenid": openid
                                                        },
                                function (succObj) {
                                    console.log(openid + "调用成功，返回===" + JSON.stringify(succObj));
                                    //去支付
                                    var _parm = '?order_id=' + cacheData.order_id + '&order_no=' + cacheData.order_no + '&id=' + cacheData.order_id
                                    var rightUrl = urlList.paysuccess + _parm;
                                    h5sdk.wxpay(pid, 'gh_e611846d32ee', succObj.timeStamp, succObj.nonceStr,
                                        succObj.package, succObj.paySign, rightUrl, 'http://h5plus.net');
                                },
                                function (errorObj) {
                                    alert("调用失败，返回===" + JSON.stringify(errorObj));
                                }   
                        );
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