/*
* @Author: zhaoxiaoyang
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-14 13:19:53
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll', '$swiper', '$dialog', '$selectArea', 'areaData'],
    function(Ajax,dot, h5sdk, IScroll, Swiper, Dialog, MobileSelectArea, areaData){

    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var getAddressUrl = $$r.routers.data.link.getAddress + h5sdk_param;
            var setAddressUrl = $$r.routers.data.link.setAddress + h5sdk_param;
            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
           	var isWeChat = RKC.mobile.isWeChat;
            var urlList = {
                    good : 'good' + RKC.mobile.mainSuffix,
                    pay : 'pay' + RKC.mobile.mainSuffix
                },
                isAddress = !!$rk.getUrlAllParam().address_id;


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
                    me._getGoods();
                });
                
                $rk.listener.on('page', 'onData', function(token, json) {
                    console.log('origin:',json)
					me._render(json)
                });
            },
            _container: $('#cont'),

            //address.get
            _getGoods: function () {
            	var that = this,
            		postParam = {
                    	// id : 111
                    	// ,error_test: true
                    },
                	option = {
                    url : getAddressUrl,
                    contentType:'application/json',
                    dataType: 'json',
                    // data : postParam,
                    type: 'post',
                    success: function(json) {
                    	if (json.error_response) {
                            // alert(json.error_response.msg)
                    		console.log(json.error_response.msg)
                    		// return
                            $rk.listener.trigger('page', 'onData', {});
                        }else{
                            var obj = {};
                            Object.getOwnPropertyNames(json).map(function(o){
                                obj = json[o]
                            });
                            $rk.listener.trigger('page', 'onData', obj);
                        }
                    },
                    beforeSend:function(){
                    	$rk.listener.trigger('page', 'loading', {});
                    }
                }
                new Ajax(option);
            },
            _render: function(data) {
                // data.addPageLink = addPageLink
            	console.log(data)
                if(data.msg == 'success'){
                    window.history.go(-1)
                }
                // !$Rk.getUrlParam('address_id') &&(data={})
                // data = !isAddress?{}:data
                data.provinceName = data.province&&areaData[data.province][0]
                data.cityName = data.city&&areaData[data.city][0]
                data.areaName = data.area&&areaData[data.area][0]
                var html = $rk.tplRender(dot, $('#j_cont').html(), data);
                this._container.html(html);
                // var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
                this._interact(data)
            },
            _interact: function(data){
                var that = this;
                var selectArea = new MobileSelectArea();
                selectArea.init({
                    trigger:$('#txt_area'),
                    data: window.location.origin + '/wap/data.json'
                    // data: $$r.rootUrl + '/comlibjs/mobile/data.json'
                    // ,value:[210000, 210200, 210211]
                    // separator:'210000,210200,210211'
                });

                $('#cont').on('click', '[data-op]', function (e) {
                    if ($(this).data('op')=='submit') {
                        // window.location.href = urlList.good
                        // return
                        that.formSend(data)
                    }
                })
            },

            //address.save
            formSend: function (data) {
                var postParam = $rk.plat.serializeObject($('#myForm')),
                    _addr = $('#txt_area').data('value')?$('#txt_area').data('value').split(','):[data.province, data.city, data.area];

                postParam.address_id = +$rk.getUrlAllParam().address_id || 0
                postParam.province = +_addr[0]
                postParam.city = +_addr[1]
                postParam.area = +_addr[2]
                // postParam.address = ''

                var option = {
                    url : setAddressUrl,
                    contentType:'application/json',
                    dataType: 'json',
                    data : JSON.stringify(postParam),
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
                        // var base_param = window.location.search.substr(1),
                        //     addressed = $Rk.getUrlParam('address_id')?'?'+base_param:'?address_id='+obj.address_id+'&'+base_param,
                        //     _param = obj.address_id?addressed:'?'+base_param;
                        var _param = '?pay_account=' +  $Rk.LSO('wemall').pay_account + '&openid='+$Rk.LSO('wemall').openid + '&id='+$Rk.LSO('wemall').order_id
                        window.location.href = urlList.pay + _param
                        // window.history.go(-1)
                        // $rk.listener.trigger('page', 'onData', obj);
                    },
                    beforeSend:function(){
                        $rk.listener.trigger('page', 'loading', {});
                    }
                }
                new Ajax(option);
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