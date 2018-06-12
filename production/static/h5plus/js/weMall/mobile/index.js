/*
* @Author: Administrator
* @Date:   2016-03-03 11:46:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-14 11:23:29
*/

seajs.use(['Ajax','dot', 'h5sdk', 'iscroll', '$swiper'],
    function(Ajax,dot, h5sdk, IScroll, Swiper){

    h5sdk.init()

    var tempReady = function() {
            var h5sdk_param = '&h5_access_token='+ sessionStorage['h5plusAccess-Token'] + '&pid='+($$r.urlPrefix?RKC.mobile.pid_test:RKC.mobile.pid_online);
            var pageGetUrl = $$r.routers.data.link.pageGet+h5sdk_param;
            var pageListUrl = $$r.routers.data.link.pageList+h5sdk_param;
            var addPageLink = $$r.routers.data.add;
            var editPageLink = $$r.routers.data.edit;
            var isWeChat = RKC.mobile.isWeChat;
            var urlList = {
                    home : 'home' + RKC.mobile.mainSuffix,
                    good : 'good' + RKC.mobile.mainSuffix
                };

            var wemallParamObj = {
                    store_id : $Rk.getUrlAllParam().id,
                    page_id : $Rk.getUrlAllParam().page_id
                }
            $Rk.LSO('wemall', wemallParamObj)

            // typeof function (argument) {
            var header = new $Rk.VC({
                _init: function() {
                    var me = this;
                    $Rk.listener.on('plat', 'ready', function(token, config) {
                    	RKC.mobile.resize();
    					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                        // $Rk.listener.trigger('page', 'tabList')
                        me._pageListGet()
                    });

                    $Rk.listener.on('page', 'loading', function(token, json) {
                        $('#scroller').append('<div class="cont-all"><p class="loading"></p></div>')
                        setTimeout(function () {
                            $('#scroller .cont-all').remove()
                        },500)
                    });
                    // $Rk.listener.on('page', 'tabList', function (token, json) {
                    //     me._pageListGet(json)
                    // })
                },
                _container: $('header'),
                _pageListGet:function () {
                    var that = this,
                        // ,error_test: true
                        option = {
                        url : pageListUrl,
                        contentType: 'application/json',
                        // data : postParam,
                        type: 'post',
                        success: function(json) {
                            // console.log(json)
                            if (json.error_response) {
                                alert(json.error_response.msg)
                                return
                            }
                            that._render(json.hfive_weidian_page_list_response)
                            // $Rk.listener.trigger('page', 'onData', json.hfive_weidian_page_list_response);
                        },
                        beforeSend:function(){
                            $Rk.listener.trigger('page', 'loading', {});
                        }
                    }
                    new Ajax(option)    
                },
                    
                _render: function(data) {
                	var html = $Rk.tplRender(dot, $('#j_header').html(), data || {});
                    this._container.html(html);
                    this._interact(data)
                },
                _interact: function(data){
                    var me = this,
                    	tabScroll = new IScroll('#tabList', {
    						scrollX: true, 
    						scrollY: false, 
    						// scrollbars: true,
    						click : true,
    						mouseWheel: true,
    						onScrollMove:function () { console.log('onScrollMove')},
    						onScrollStart : function () {console.log('onScrollStart')},
    						onScrollEnd : function () {console.log('onScrollEnd')}
    					 });

                    me._container.on('click', '[data-op]', function (e) {
        				var that = $(this),
                            op = that.data('op');
                        switch(op){
                            case 'tab':
                            window.location.href = urlList.home + '?id='+ that.attr('storeid') + '&page_id='+ that[0].id
                            //    var dom = that
                            //    dom.addClass('cur').siblings().removeClass('cur');
                            //    $Rk.listener.trigger('page', 'loading', {});
                            break
                        }
                    })

                }
            });


        var pageComponent = new $Rk.VC({
            _init: function() {
                var me = this;
                $Rk.listener.on('plat', 'ready', function(token, config) {
                    me._getPage();
                });
                // $Rk.listener.trigger('plat', 'ready')
                
                $Rk.listener.on('page', 'onData', function(token, json) {
                    // console.log('origin:',json)
                    // console.count(token)
					me._render(json)
                });
            },
            _container: $('#wrapper'),
            _getPage: function () {
            	var that = this,
            		postParam = JSON.stringify({"page_id":+$Rk.getUrlAllParam().page_id}),
                	// ,error_test: true
                	option = {
                    url : pageGetUrl,
                    contentType: 'application/json',
                    data : postParam,
                    type: 'post',
                    success: function(json) {
                    		// console.log(json)
                        if (json.error_response) {
                    		alert(json.error_response.msg)
                    		return
                    		var dialog,
                    		opt = {
				            	title: '错误信息',
				                content: json.error_response.msg,
				                width: window.innerWidth - 40,
				                confirmFun: function(dialog) {
				                	console.log(dialog)
				                	dialog.close()
					            }
							}
							dialog = new Dialog(opt);
							dialog.open()
                    		return
                    	}

                        $Rk.listener.trigger('page', 'onData', json.hfive_weidian_page_get_response);
                    },
                    beforeSend:function(){
                    	$Rk.listener.trigger('page', 'loading', {});
                    }
                }
                new Ajax(option);
            },
            _render: function(data) {
                if (data.error_response) {
                   alert(data.error_response.msg)
                   return
                }

            	document.title = data.page_name
            	$('.top-row .title').text(data.page_name)
                data.addPageLink = addPageLink
                var page_info = data.page_info
                try{
                    page_info = JSON.parse(data.page_info)
                    page_info.forEach(function (m, i) {
                        if(!m.type) {
                            m.type = 'goods'
                            if(!m.style) m.style = '0'
                        }
                    })
                }catch(e){
                    console.log(new Error(e))
                    alert('不是一个合法的json格式')
                    page_info = {}
                    return
                }
                if (!page_info.length) {
                    alert('后台没有数据')
                }

            	console.log('page_info=',page_info)
                var html = $Rk.tplRender(dot, $('#j_page_com').html(), page_info || {});
                this._container.html(html);

                var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
                this._interact(data)
            },
            _interact: function(data){
                var me = this;
                var mySwiper = new Swiper('.swiper-container',{
                    pagination: '.pagination',
                    paginationClickable: true,
                    mode: 'horizontal',
                    autoplay: 2000
                })

                // data-op="gotoDetail"
                me._container.on('click', '[data-op]', function (e) {
                    var that = $(this),
                        op = that.data('op')
                    switch(op){
                        case 'gotoDetail' : 
                        me.detailFunc(that)
                        break
                    }
                })
            },
            detailFunc: function (that) {
                window.location.href = urlList.good + '?id=' + that.attr('id')
            }
        });


        //  var sildeScroll = new IScroll('#slider', {
		// 	scrollX: true,
		// 	scrollY: false,
		// 	momentum: false,
		// 	snap: true,
		// 	snapSpeed: 400,
		// 	keyBindings: true,
		// 	indicators: {
		// 		el: document.getElementById('indicator'),
		// 		resize: true
		// 	}
		// });
		// /* start auto-scrolling */
		// myInterval = setInterval(autoScroll, 3000);
		// function autoScroll() {
		// 	  var currPage = sildeScroll.currentPage.pageX + 1;
		// 	  if(currPage == sildeScroll.pages.length-1) {
		// 	    sildeScroll.goToPage(0, 0, 400);
		// 	  } else {
		// 	    sildeScroll.goToPage(currPage, 0, 400);
		// 	  }
		// 	}
		// sildeScroll.on('beforeScrollStart', function() {
		//   clearInterval(myInterval);
		// });

        var footer = new $Rk.VC({
            _init: function() {
                var me = this;
                $Rk.listener.on('plat', 'ready', function(token, config) {
                	me._render(config)
                });
            },
            _container: $('footer'),
            _render: function(data) {
                data.addPageLink = addPageLink
                data.mainSuffix = RKC.mobile.mainSuffix;
                var html = $Rk.tplRender(dot, $('#j_footer').html(), data || {});
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
                        window.location.href = 'cart' + RKC.mobile.mainSuffix + '?id='+$Rk.LSO('wemall').store_id
                        break
                        case 'uc' :
                        window.location.href = 'ucenter' + RKC.mobile.mainSuffix + '?id='+$Rk.LSO('wemall').store_id
                        break
                    }
                })
            }
        });
    }

    // h5sdk.ready($Rk.plat.s(tempReady))
    $Rk.plat.s(function () {
        h5sdk.ready(function () {
            tempReady()
        })
    })

});