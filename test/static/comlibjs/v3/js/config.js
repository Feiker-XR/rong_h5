/* 
* @Author: zhaoxiaoyang
* @Date:   2016-02-19 14:29:49
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-29 13:18:09
*/

'use strict';

/**
 * Config
 * Theme Photon
 */

;void function () {

return

	var partialPath = '/comlibjs/v3/js/'
	RKC.photonConfig = {
		base: $$r.rootUrl,
		alias:{
			"jquery183": $$r.rootUrl + partialPath + 'plugins/jquery.min.js'
			,"jquery183UI": $$r.rootUrl + partialPath + 'plugins/jquery-ui.min.js'
			,"bootstrap.min": $$r.rootUrl + partialPath + '/bootstrap/bootstrap.min.js'
			,"modernizr.custom": $$r.rootUrl + partialPath + 'plugins/modernizr.custom.js'
			,"jquery.pnotify.min": $$r.rootUrl + partialPath + 'plugins/jquery.pnotify.min.js'
			,"less-1.3.1.min": $$r.rootUrl + partialPath + 'plugins/less-1.3.1.min.js'
			,"xbreadcrumbs": $$r.rootUrl + partialPath + 'plugins/xbreadcrumbs.js'
			,"jquery.maskedinput-1.3.min": $$r.rootUrl + partialPath + 'plugins/jquery.maskedinput-1.3.min.js'
			,"jquery.autotab-1.1b": $$r.rootUrl + partialPath + 'plugins/jquery.autotab-1.1b.js'
			,"charCount": $$r.rootUrl + partialPath + 'plugins/charCount.js'
			,"jquery.textareaCounter": $$r.rootUrl + partialPath + 'plugins/jquery.textareaCounter.js'
			,"elrte.min": $$r.rootUrl + partialPath + 'plugins/elrte.min.js'
			,"elrte.en": $$r.rootUrl + partialPath + 'plugins/elrte.en.js'
			,"select2": $$r.rootUrl + partialPath + 'plugins/select2.js'
			,"jquery-picklist.min": $$r.rootUrl + partialPath + 'plugins/jquery-picklist.min.js'
			,"jquery.validate.min": $$r.rootUrl + partialPath + 'plugins/jquery.validate.min.js'
			,"additional-methods.min": $$r.rootUrl + partialPath + 'plugins/additional-methods.min.js'
			,"jquery.form": $$r.rootUrl + partialPath + 'plugins/jquery.form.js'
			,"jquery.metadata": $$r.rootUrl + partialPath + 'plugins/jquery.metadata.js'
			,"jquery.mockjax": $$r.rootUrl + partialPath + 'plugins/jquery.mockjax.js'
			,"jquery.uniform.min": $$r.rootUrl + partialPath + 'plugins/jquery.uniform.min.js'
			,"jquery.tagsinput.min": $$r.rootUrl + partialPath + 'plugins/jquery.tagsinput.min.js'
			,"jquery.rating.pack": $$r.rootUrl + partialPath + 'plugins/jquery.rating.pack.js'
			,"farbtastic": $$r.rootUrl + partialPath + 'plugins/farbtastic.js'
			,"jquery.timeentry.min": $$r.rootUrl + partialPath + 'plugins/jquery.timeentry.min.js'
			,"jquery.dataTables.min": $$r.rootUrl + partialPath + 'plugins/jquery.dataTables.min.js'
			,"jquery.jstree": $$r.rootUrl + partialPath + 'plugins/jquery.jstree.js'
			,"dataTables.bootstrap": $$r.rootUrl + partialPath + 'plugins/dataTables.bootstrap.js'
			,"jquery.mousewheel.min": $$r.rootUrl + partialPath + 'plugins/jquery.mousewheel.min.js'
			,"jquery.mCustomScrollbar": $$r.rootUrl + partialPath + 'plugins/jquery.mCustomScrollbar.js'
			,"jquery.flot": $$r.rootUrl + partialPath + 'plugins/jquery.flot.js'
			,"jquery.flot.stack": $$r.rootUrl + partialPath + 'plugins/jquery.flot.stack.js'
			,"jquery.flot.pie": $$r.rootUrl + partialPath + 'plugins/jquery.flot.pie.js'
			,"jquery.flot.resize": $$r.rootUrl + partialPath + 'plugins/jquery.flot.resize.js'
			,"raphael.2.1.0.min": $$r.rootUrl + partialPath + 'plugins/raphael.2.1.0.min.js'
			,"justgage.1.0.1.min": $$r.rootUrl + partialPath + 'plugins/justgage.1.0.1.min.js'
			,"jquery.qrcode.min": $$r.rootUrl + partialPath + 'plugins/jquery.qrcode.min.js'
			,"jquery.clock": $$r.rootUrl + partialPath + 'plugins/jquery.clock.js'
			,"jquery.countdown": $$r.rootUrl + partialPath + 'plugins/jquery.countdown.js'
			,"jquery.jqtweet": $$r.rootUrl + partialPath + 'plugins/jquery.jqtweet.js'
			,"jquery.cookie": $$r.rootUrl + partialPath + 'plugins/jquery.cookie.js'
			,"bootstrap-fileupload.min": $$r.rootUrl + partialPath + 'plugins/bootstrap-fileupload.min.js'
			,"prettify": $$r.rootUrl + partialPath + 'plugins/prettify/prettify.js'
			,"bootstrapSwitch": $$r.rootUrl + partialPath + 'plugins/bootstrapSwitch.js'
			,"mfupload": $$r.rootUrl + partialPath + 'plugins/mfupload.js'
	        ,"common": $$r.rootUrl + partialPath + 'common.js'
			// ,"dashboard": $$r.rootUrl + partialPath + 'dashboard.js'
		}
	}
	seajs.config(RKC.photonConfig)
	// seajs.use([
		// 'jquery183'
		// ,'jquery183UI'
		// ,"bootstrap.min"
		// ,"modernizr.custom"
		// ,"jquery.pnotify.min"
		// ,"less-1.3.1.min"
		// ,"xbreadcrumbs"
		// ,"jquery.maskedinput-1.3.min"
		// ,"jquery.autotab-1.1b"
		// ,"charCount"
		// ,"jquery.textareaCounter"
		// ,"elrte.min"
		// ,"elrte.en"
		// ,"select2"
		// ,"jquery.dataTables.min"
		// ,"jquery.validate.min"
		// ,"additional-methods.min"
		// ,"jquery.form"
		// ,"jquery.metadata"
		// ,"jquery.mockjax"
		// ,"jquery.uniform.min"
		// ,"jquery.tagsinput.min"
		// ,"jquery.rating.pack"
		// ,"farbtastic"
		// ,"jquery.timeentry.min"
		// ,"jquery.jstree"
		// ,"dataTables.bootstrap"
		// ,"jquery.mousewheel.min"
		// ,"jquery.mCustomScrollbar"
		// ,"jquery.flot"
		// ,"jquery.flot.pie"
		// ,"jquery.flot.resize"
		// ,"jquery.flot.stack"
		// ,"raphael.2.1.0.min"
		// ,"justgage.1.0.1.min"
		// ,"jquery.qrcode.min"
		// ,"jquery.clock"
		// ,"jquery.countdown"
		// ,"jquery.jqtweet"
		// ,"jquery.cookie"
		// ,"jquery-picklist.min"
		// ,"bootstrap-fileupload.min"
		// ,"prettify"
		// ,"bootstrapSwitch"
		// ,"mfupload"
		// "common"
		// ,"dashboard"
		// ])

}();