/*
* @Author: Administrator
* @Date:   2016-04-27 17:52:06
* @Last Modified by:   tusm
* @Last Modified time: 2016-04-28 10:49:22
* @description: 
*   
	h5sdk封装及扩展微信jssdk的方法：

	wx jssdk: (jweixin-1.0.0.js) 2,4,5b;
	*:rop;

	*1： wx.config : http://open.ruixuesoft.com/api/ApiMethod-970ddf55-037f-4fd4-be43-a1c24ded294c.html
	2： 分享：h5sdk.wxShareToTimeline
	    	 h5sdk.wxShareToFriend
	*3a： php>init;ready; java>wxOpenidInit;wxOpenidReady
	4： 图片上传h5sdk.wxUploadImage
	5b： 支付：h5sdk.wxpay (phph5sdk) > callPHPAPIByName
	*6: invalidURLRedirect(:为了获取openid) http://open.ruixuesoft.com/api/ApiMethod-6e370e4a-0d81-4829-9ccc-775ef9b6bf8f.html
	*7: rop: getUserDetail : http://open.ruixuesoft.com/api/ApiMethod-59c17243-447b-4c00-ba75-e0e861367573.html

	改版开发为：
	jssdk + ropApi + h5config;
*
*/
{
	pid : {
		h5account : 'h5ruixue',
		appkey : 'appkey',
		appsecret : 'appsecret'
	},
	weixin_id : 'weixin_id',
	component_appid : 'component_appid',
	appid : 'appid',
	pubid : 'pubid'
}