/*
* @Author: Administrator
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-14 11:21:52
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll'],
    function(Ajax,dot, h5sdk, IScroll){

    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var cartGetUrl = $$r.routers.data.link.cartList + h5sdk_param;
            var cartSaveUrl = $$r.routers.data.link.cartSave + h5sdk_param;
            var cartOrderAddUrl = $$r.routers.data.link.cartOrderAdd + h5sdk_param;
            var orderFootUrl = $$r.routers.data.link.orderFoot + h5sdk_param;

            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
           	var isWeChat = RKC.mobile.isWeChat;
            var cacheCart = [];
            var cacheOrder = [];
            var urlList = {
                    good : 'good' + RKC.mobile.mainSuffix,
                    pay : 'pay' + RKC.mobile.mainSuffix
                };



        var header = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(token, config) {
                	RKC.mobile.resize();
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
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
                    me._getCart();
                });
                
                $rk.listener.on('page', 'onData', function(token, json) {
                    console.log('origin:',json)
					me._render(json)
                });
            },
            _container: $('#cont'),
            _getCart: function () {
            	var that = this,
            		postParam = JSON.stringify({
                                            id : +$rk.getUrlAllParam().id
                                            // ,error_test: true
                                        }),
                	option = {
                    url : cartGetUrl,
                    dataType: 'json',
                    contentType:'application/json',
                    // data : postParam,
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
                        // cacheCart = obj
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
                var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
                this._interact(data)
            },
            _interact: function(data){
                var self = this,
                    acc = 0;
                $('section.cart').on('click', 'aside, img', function (e) {
                    var cur = e.target,
                        _pro_id = $(this).parent().get(0).id || 0;
                    if('i' === cur.tagName.toLowerCase()) return
                    window.location.href = urlList.good + '?id=' + _pro_id
                })

                $('.bottom-bar .sum').on('touchstart', function (e) {
                    e.preventDefault()
                })
                $('section.cart > i, .bottom-bar .sum i').on('touchstart', function (e) {
                    var that = $(this)
                    that.toggleClass('checked')
                    if(that.parent().hasClass('sum')){
                        if(that.hasClass('checked')){
                            $('section.cart > i').addClass('checked')
                        }else{
                            $('section.cart > i').removeClass('checked')
                        }
                    }
                    getTotal()
                })
                
                $('section.cart .num').on('click', function (e) {
                    var num_box = $(this).find('span'),
                        number = +num_box.text()
                    if(e.target.textContent==='-'){
                        if (number==1) return
                        number--
                    }else{
                        number++
                    }
                    num_box.text(number)

                    if($(this).parents('section').find('.checked').length != 0){
                        getTotal()
                    }
                })

                function getTotal() {
                    acc = 0
                    var count_list = $('.checked').parents('section').find('.price');
                    count_list.each(function (i, m) {
                        var numb = +$(m).parents('aside').find('.num span').text()
                        acc += +m.textContent * numb
                    })
                    ;(count_list.length == 0) && (acc = 0)
                    $('.pay').text(acc)
                }

                //delegate
                this._container.on('click', '[data-op]', function (e) {
                    var that = $(this),
                        op = that.data('op')
                    switch(op){
                        case 'pay':
                        self.payMethod()
                        break
                    }
                })
            },
            payMethod: function () {


                // if(!+$('.size_number').text()) {
                //     alert('请选择商品数量')
                //     return
                // }
                /*var products = [{
                                    "product_id": +cacheData.id || 1,    //int型,必须,【商品id】
                                    "pro_num": +$('.size_number').text()||1,    //int型,【商品数量】
                                    "pro_price": +cacheData.price,    //float型,【价格】
                                    "sku_id": 1,    //int型,【规格id】
                                    "sku_data": ""    //string型,【规格信息】
                                }]
                var cartSaveParam = JSON.stringify(products)
                //cart.save
                new Ajax({
                    url : cartSaveUrl,
                    data : cartSaveParam,
                    contentType:'application/json',
                    dataType: 'json',
                    type : 'post',
                    success:function (data) {
                        if (data.error_response) {
                            alert(data.error_response.msg)
                            return
                        };
                        window.location.href = urlList.cart
                    },
                    beforeSend:function () {
                    },
                    fail:function (xhr, state) {
                    }
                })*/
                $('.com.cart').each(function (i, m) {
                    var m = $(m)
                    cacheCart.push({
                        // "product_id": +m.attr('id'),    //int型,必须,【商品id】
                        cart_id:+m.data('cartid'),
                        "pro_num": +m.find('.num span').text()    //int型,【商品数量】
                        // "pro_price": +m.find('.price').text(),    //float型,【价格】
                        // "sku_id": +m.data('skuid')    //int型,【规格id】
                        // "sku_data": ""    //string型,【规格信息】
                    })
                })

                //cart.save
                new Ajax({
                    url : cartSaveUrl,
                    data : JSON.stringify(cacheCart),
                    contentType:'application/json',
                    dataType: 'json',
                    type : 'post',
                    success:function (data) {
                        if (data.error_response) {
                            alert(data.error_response.msg)
                            return
                        };
                        var count_list = $('.checked').parents('section').find('.price');
                        cacheOrder = []
                        count_list.each(function (i, m) {
                            cacheOrder.push({
                                id:+$(m).parents('section').data('cartid')
                            })
                        })

                        if (!cacheOrder.length) {
                            alert('请勾选结算商品！')
                            return
                        }

                        //cart.addorder
                        new Ajax({
                            url : cartOrderAddUrl,
                            data : JSON.stringify(cacheOrder),
                            contentType:'application/json',
                            dataType: 'json',
                            type : 'post',
                            success:function (data) {
                                if (data.error_response) {
                                    alert(data.error_response.msg)
                                    return
                                };
                                data = data.hfive_weidian_cart_addorder_response
                                var _parm = '?id=' + data.order_id + '&order_no=' + data.order_no
                                // window.location.href= urlList.pay + _parm
                                //pay.geturl
                                new Ajax({
                                    url : orderFootUrl,
                                    data : JSON.stringify({
                                                "order_id": +data.order_id    //int型,必须,【订单id】
                                            }),
                                    contentType:'application/json',
                                    dataType: 'json',
                                    type : 'post',
                                    success:function (data) {
                                        if (data.error_response) {
                                            alert(data.error_response.msg)
                                            return
                                        };
                                        var parm = '?'
                                        window.location.href = data.hfive_weidian_pay_geturl_response
                                    },
                                    beforeSend:function () {
                                    },
                                    fail:function (xhr, state) {
                                    }
                                })                                
                            },
                            beforeSend:function () {
                            },
                            fail:function (xhr, state) {
                            }
                        })
                    },
                    beforeSend:function () {
                    },
                    fail:function (xhr, state) {
                    }

                })
            }
        });

        var footer = new $rk.VC({
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
                        window.location.href = 'home' + RKC.mobile.mainSuffix + '?id='+$Rk.LSO('wemall').store_id +'&page_id=' + $Rk.LSO('wemall').page_id
                        break
                        case 'group' :
                        alert('开发中，敬请期待。')
                        return
                        window.location.href = 'group' + RKC.mobile.mainSuffix
                        break
                        case 'cart' :
                        window.location.reload()
                        break
                        case 'uc' :
                        window.location.href = 'ucenter' + RKC.mobile.mainSuffix + '?id='+$Rk.LSO('wemall').store_id
                        break
                    }
                })
            }
        });
    }

    $Rk.plat.s(function () {
        h5sdk.ready(function () {
            tempReady()
        })
    })
});