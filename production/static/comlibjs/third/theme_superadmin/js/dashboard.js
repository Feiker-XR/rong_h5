/* 
* @Author: zhaoxiaoyang
* @Date:   2016-02-17 17:45:10
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-24 17:26:57
*/

'use strict';

seajs.use(['dot', 'Ajax'
	// ,'jqueryEase'
	// ,'bootstrap'
	// ,'sPlot'
	// ,'sPlotTime'
	// ,'sPlotAnim'
	// ,'sPlotResize'
	// ,'sparkline'
	// ,'easypiechart'
	// ,'charts'
	// ,'jvectormap'
	// ,'usa'
	// ,'icheck'
	// ,'scrolls'
	// ,'calendars'
	// ,'feeds'
	// ,'functions'
	], function(dot, Ajax) {

var tempReady = function () {

	/**
	 * [data model]
	 */
    var contList = ['contFansData', 'contFansTrend', 'contFansActive', 'contBroadcast', 
    			   'contSales', 'contCustomMenu', 'contWechatMsg', 'contQrcode'],
    	
    	dataRender = function (url, callback) {

	    	this.init = function () {
	    		new Ajax({
	                url: url,
	                success: function(json) {

	                    if (!0) {
	                    	
                    		callback && callback(json)

	                    } else {
	                        alert("您当前没有系统使用权限，请联系管理员为您开通所需权限")
	                    }
	                },
                    beforeSend: function() {

                    },
                    fail: function (xhr, state) {
                        
                    },
	                dataType: 'json'
	            });
	    	}
	    	this.init()
	    },

	    domRender = function (data, domArr) {

	    	domArr.forEach(function (m ,i) {

	            var js = $('#j_'+m),
	            	cont = $('#'+m),
	            	html = $rk.tplRender(dot, js.html(), data || {});
	            cont.append(html);

	    	})

	    };

    // new dataRender('/site/showtree', function (json) {
    //     domRender(json.data, ['leftNav'])
    // })
    // domRender({}, ['topRight','contTitle'])




    /**
     * [interact]
     */

	
}

    $Rk.plat.s(function(){
        tempReady()
    })

});
