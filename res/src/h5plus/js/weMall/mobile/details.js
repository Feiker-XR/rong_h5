/*
* @Author: Administrator
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-11 18:07:57
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll', '$swiper'],
    function(Ajax,dot, h5sdk, IScroll, Swiper){

    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var pageGetUrl = $$r.routers.data.link.pageGet + h5sdk_param;
            var orderAddUrl = $$r.routers.data.link.orderAdd + h5sdk_param;
            var cartAddUrl = $$r.routers.data.link.cartAdd + h5sdk_param;
            var orderFootUrl = $$r.routers.data.link.orderFoot + h5sdk_param;
            var cartSaveUrl = $$r.routers.data.link.cartSave + h5sdk_param;
            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
            var isWeChat = RKC.mobile.isWeChat,
                urlList = {
                    cart : 'cart' + RKC.mobile.mainSuffix
                },
                cacheData = {},
                orderInfo = {},
                cacheCart = {},
                curAddedCart = 0,
                skuArr = [];

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
                    me._getDetails();
                });
                
                $rk.listener.on('page', 'onData', function(token, json) {
                    console.log('origin:',json)
					me._render(json)
                });
            },
            _container: $('#cont'),
            _getDetails: function () {
            	var that = this,
            		postParam = JSON.stringify({
                    	id : +$rk.getUrlAllParam().id
                        // ,store_id: 1
                    	// ,error_test: true
                    }),
                	option = {
                    url : pageGetUrl,
                    data : postParam,
                    type: 'post',
                    contentType: 'application/json',
                    dataType: 'json',
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

                if(!data.images.length){
                    data.images.push({
                        image : $$r.rootUrl+'/h5plus/img/weMall/mobile/bg_default1.png'
                    })
                }
                cacheData = data
                var html = $rk.tplRender(dot, $('#j_cont').html(), data || {});
                this._container.html(html);
                this._interact(data)
            },
            _interact: function(data){
                var CommodityAmount = 1,
                    pages = $(".swiper-slide"),
                    pageNum = 0,
                    self = this,
                    mySwiper = new Swiper('.swiper-container',{
                        pagination: '.pagination',
                        paginationClickable: true,
                        mode: 'horizontal',
                        autoplay: 2000,
                        width: window.innerWidth+100
                    });

                self._container.on('click', '[data-op]', function (e) {
                    var op = $(this).data('op')
                    switch(op){
                        case 'buy' :
                        self.buyOrderFoot( CommodityAmount )
                        break
                        case 'orderConfirm' :
                        self.orderConfirmFunc()
                        break
                        case 'addcart' :
                        self.addCartFunc()
                        break
                        case 'gotoCart' :
                        self.gotoCartFunc()
                        break
                    }
                })
                // $('.purchase,.join').on('click',function () {
                // })
            },
            buyOrderFoot: function ( CommodityAmount ) {
                $('.shade_wrap').show();
                $('.size_number').html( CommodityAmount );

                $('.commodityimg_close').on('click',function () {   //close pop
                    var guigeone_li = $('.guigeone li,.guigetwo li')
                    $('.shade_wrap').hide();
                    guigeone_li.find('img').hide().removeClass('opt');
                })
                $('.guigeone li').on('click',function () {  //choose type
                    var curr = $(this).parent().find('li')
                    curr.find('img').hide();
                    curr.removeClass('opt');
                    $(this).addClass('opt').find('img').show();
                })
                $('.addnum').on('click',function () { //num++
                    $('.size_number').html( ++CommodityAmount );
                    $('.car_icon span').text($('.size_number').text())
                })
                $('.removenum').on('click',function () {//num--
                    if( CommodityAmount != 1 ){
                        $('.size_number').html( --CommodityAmount );
                        $('.car_icon span').text($('.size_number').text())
                    }
                })
                
            },
            setPostProp:function (choose,invaliArr) {
                $('.guigeone').each(function (i, m) {
                    var that = $(m);
                    // if (!choose) {
                    //     var pid =that.data('ppid'),
                    //         vid =that.find('li:eq(0)').data('pvid');
                    // }
                    if(!that.find('.opt').length && invaliArr){
                        invaliArr[i] = that.find('h1').text().replace('：','')
                        choose = false
                        return
                    }
                    var pid = that.data('ppid'),
                        vid = !that.find('.opt').length?that.find('li:eq(0)').data('pvid'):that.find('.opt').data('pvid');
                    skuArr[i] = pid+':'+vid
                })

                return !!choose
            },
            orderConfirmFunc: function () {
                var invaliArr = [],
                    isValid = true;
                if(!this.setPostProp(isValid,invaliArr)) {
                    alert('请选择' + invaliArr.join(' ') + '！')
                    return
                }

                var orderParam = JSON.stringify({
                                        "type": 0,    //int型,【订单类型,可以不传,默认为0.订单类型包括 0普通 1代付 2送礼 3分销】
                                        "proId": +cacheData.id,    //int型,必须,【商品id】
                                        "quantity": +$('.size_number').text(),    //int型,必须,数值范围(X ≥ 1),【购买的数量】
                                        "properties": skuArr.join(';'),    //int型,【如果该商品有sku时，那么必须填】
                                        "activityId": 0,    //int型,【活动id】
                                        "custom": "",    //string型,【买家留言】
                                        "bak": ""    //string型,【备注】
                                    });

                //order.add
                new Ajax({
                    url : orderAddUrl,
                    data : orderParam,
                    contentType:'application/json',
                    dataType: 'json',
                    type : 'post',
                    success:function (data) {
                        if (data.error_response) {
                            alert(data.error_response.msg)
                            return
                        };
                        orderInfo = data.hfive_weidian_order_add_response
                        
                        //pay.geturl
                        new Ajax({
                            url : orderFootUrl,
                            data : JSON.stringify({
                                        "order_id": +orderInfo.order_id    //int型,必须,【订单id】
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
            addCartFunc: function () {
                this.setPostProp()

                var cartAddParam = JSON.stringify({
                                        "product_id": +cacheData.id,    //int型,必须,【商品id】
                                        "pro_num": 1,    //int型,【商品数量】
                                        "pro_price": +cacheData.price,    //float型,【价格】
                                        "properties": skuArr.join(';'),    //int型,【如果该商品有sku时，那么必须填】
                                        "sku_data": ""    //string型,【规格信息】
                                        // "sku_id": 1,    //int型,【规格id】
                                    })
                //cart.add
                new Ajax({
                    url : cartAddUrl,
                    data : cartAddParam,
                    contentType:'application/json',
                    dataType: 'json',
                    type : 'post',
                    success:function (data) {
                        if (data.error_response) {
                            alert(data.error_response.msg)
                            return
                        };
                        alert('添加购物车成功！')
                        curAddedCart++
                        $('.car_icon span').text(curAddedCart)
                        $('.size_number').text(curAddedCart)
                    },
                    beforeSend:function () {
                    },
                    fail:function (xhr, state) {
                    }
                })
            },
            gotoCartFunc: function () {
                window.location.href = urlList.cart + '?id='+$Rk.LSO('wemall').store_id
                /*if(!+$('.size_number').text()) {
                    alert('请选择商品数量')
                    return
                }
                var products = [{
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