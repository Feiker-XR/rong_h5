/* 
* @Author: zhaoxiaoyang
* @Date:   2016-02-19 14:29:49
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-24 17:27:19
*/

'use strict';

/**
 * Config
 * Theme Photon
 */

;void function () {


	var partialPath = '/comlibjs/third/theme_superadmin/js/'
	RKC.superadminConfig = {
		base: $$r.rootUrl,
		alias:{
			'jquery110': $$r.rootUrl + partialPath + 'jquery.min.js'
			,'jqueryUI': $$r.rootUrl + partialPath + 'jquery-ui.min.js'
			,'jqueryEase': $$r.rootUrl + partialPath + 'jquery.easing.1.3.js'
			// ,'bootstrap': $$r.rootUrl + partialPath + 'bootstrap.min.js'
			,'sPlot': $$r.rootUrl + partialPath + 'charts/jquery.flot.js'
			,'sPlotTime': $$r.rootUrl + partialPath + 'charts/jquery.flot.time.js'
			,'sPlotAnim': $$r.rootUrl + partialPath + 'charts/jquery.flot.animator.min.js'
			,'sPlotResize': $$r.rootUrl + partialPath + 'charts/jquery.flot.resize.min.js'
			,'sparkline': $$r.rootUrl + partialPath + 'sparkline.min.js'
			,'easypiechart': $$r.rootUrl + partialPath + 'easypiechart.js'
			,'charts': $$r.rootUrl + partialPath + 'charts.js'
			,'jvectormap': $$r.rootUrl + partialPath + 'maps/jvectormap.min.js'
			,'usa': $$r.rootUrl + partialPath + 'maps/usa.js'
			,'icheck': $$r.rootUrl + partialPath + 'icheck.js'
			,'scrolls': $$r.rootUrl + partialPath + 'scroll.min.js'
			,'calendars': $$r.rootUrl + partialPath + 'calendar.min.js'
			,'feeds': $$r.rootUrl + partialPath + 'feeds.min.js'
			,'functions': $$r.rootUrl + partialPath + 'functions.js'
			,'dashboard': $$r.rootUrl + partialPath + 'dashboard.js'
		}
	}
	seajs.config(RKC.superadminConfig)
	seajs.use(['dashboard'
		,'jqueryEase'
		,'bootstrap'
		,'sPlot'
		,'sPlotTime'
		,'sPlotAnim'
		,'sPlotResize'
		,'sparkline'
		,'easypiechart'
		,'charts'
		,'jvectormap'
		,'usa'
		,'icheck'
		,'scrolls'
		,'calendars'
		,'feeds'
		,'functions'
	])

}();