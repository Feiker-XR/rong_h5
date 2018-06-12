/*
* @Author: Administrator
* @Date:   2016-04-27 17:52:06
* @Last Modified by:   tusm
* @Last Modified time: 2016-04-28 16:02:29
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

;define(function(require, exports, module) {

var UTIL = {},
	OpenIDReadyWatcher = (function() {
        function Construct() {
            this.instantiated = false;
            this.ready = function() {
                var tmpFn = null;
                this.instantiated = true;
                while ((tmpFn = this.callbackQueue.shift())) {
                    tmpFn(h5_sdk.wxOpenid());
                }
            };
            this.callbackQueue = [];
            this.clear = function() {
                this.callbackFn = [];
            };
            this.push = function(callbackFn) {
                if(!UTIL.isFunction(callbackFn)) return;
                if (this.instantiated === true) {
                    callbackFn(h5_sdk.wxOpenid());
                } else {
                    this.callbackQueue.push(callbackFn);
                }
            };
        };
        return new Construct();
    })();

var invalidURLRedirect = function(pid, account, scope) {
            var Scoper = (scope == 1 || scope == 0)?(scope):(0);
            var viewUrl = encodeURIComponent(clipParamURL(locationHref));
            UTIL.ajax({
                type: 'POST',
                async: false,
                //contentType: 'application/json',
                //该接口只能用www-form类型传递参数
                url : Config.host + '/auth-template/login/weixin?pid=' + pid,
                data: {
                    module_url : viewUrl,
                    component_appid: Config.component_appid,
                    weixin_id : account,
                    remark : '获取正确的openid',
                    Scope: Scoper,
                    error_flag: 1
                },
                success: function(respObj) {
                    //alert("invalidURLRedirect:" + JSON.stringify(respObj));
                    if(respObj.success === true) {
                        UTIL.setStorage('state', respObj.data.state);
                        window.location.href = respObj.data.redirect_url;
                    } else {
                        var chose = window.confirm('微信浏览器加载用户信息过程中超时, 请确认是否刷新页面重试');
                        if(chose) {
                            window.location.href = clipParamURL(locationHref);
                        }
                    }
                },
                error: function(res) {
                    alert('网络有点忙乱.亲, 待会尝试吧!');
                }
            });
        };

var h5wx = {
	/*//获取某个url参数
    h5_sdk.getUrlParam = function (name) {
        return h5_sdk.getUrlParams()[name];
    };*/

    // 2. 判断页面url中openid是否有效的方法
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 初始化微信用户的openid并注册微信端请求调用身份token的方法
     * @method wxOpenidInit
     * @tutorial wxOpenid
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} account 公众号weixin_id
     * @param  {number} scope 值为0或1。0代表非完整授权(待废弃微信授权将全部使用完整授权)，1代表完整授权
     */
    init : function(pid, account, scope) {
        //为了防止重复调用wxOpenidInit方法
        if(!h5_sdk.wxOpenidInit.inited) h5_sdk.wxOpenidInit.inited = true;
        var openidFromSess = UTIL.getStorage('openid');
        if(openidFromSess) {
            //alert('openidFromSess');
            //SERVICE.refreshToken();
            //当sessionStorage中已经有了openid，什么都不做
            OpenIDReadyWatcher.ready();
        } else if (SERVICE.ifValidAccessOpenidURL()) {
            //alert('正在验证openid合法性');
            var urlJSONObj = urlJSON;
            ifValidOpenid(pid, account, urlJSON.openid, urlJSONObj.h5auth_code, urlJSONObj.timestamp, urlJSONObj.sign);
        } else {
            //alert('invalidURLRedirect\n' + locationHref);
            //sessionStorage中无openid，url中也无openid，跳转页面获取openid
            invalidURLRedirect(pid, account, scope);
        }
    },
    /**
     * @description openid获得并准备就绪的方法
     * @method wxOpenidReady
     * @tutorial wxOpenid
     * @param  {function} openid准备就绪的回调
     */
    ready : function(readyCallback) {
        OpenIDReadyWatcher.push(readyCallback);
    },
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 微信接口，分享消息到朋友圈的方法
     * @method wxShareToTimeline
     * @param  {string} title 要分享消息的title
     * @param  {string} link 要分享消息的链接
     * @param  {string} picURL 要分享消息对应的图标(允许为空字符串)
     * @param  {function} succFn 分享消息的成功回调(允许不传入)
     * @param  {function} errorFn 分享消息的失败回调(允许不传入)
     */
    share : function(title, link, picURL, succFn, errorFn) {
/*
        var title, link, picURL, succFn, errorFn, msgSourceOpenid;
        title = inputObj.title;
        link = locationHref;
        picURL = inputObj.imgSrc;
        succFn = inputObj.success;
        errorFn = inputObj.error;
*/
        if(!UTIL.isFunction(succFn)) {
            succFn = function(){};
        }
        if(!UTIL.isFunction(errorFn)) {
            errorFn = function(){};
        }
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: picURL,
            success: function () {
                succFn();
                /* h5_sdk.trackShare(pid, account, activityId, null, msgSourceOpenid, 'community'); */
            },
            cancel: function (error) {
                errorFn(error);
            }
        });
    },
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 微信接口，分享消息到朋友圈的方法
     * @method wxShareToFriend
     * @param  {string} title 要分享消息的title
     * @param  {string} link 要分享消息的链接
     * @param  {string} picURL 要分享消息对应的图标(允许为空字符串)
     * @param  {string} desc 要分享消息对应的留言描述
     * @param  {function} succFn 分享消息的成功回调(允许不传入)
     * @param  {function} errorFn 分享消息的失败回调(允许不传入)
     */
    wxShareToFriend : function(title, link, picURL, desc, succFn, errorFn) {
        /*
        var title, desc, link, picURL, msgSourceOpenid, succFn, errorFn;
        title = inputObj.title;
        desc = inputObj.desc;
        picURL = inputObj.imgSrc;
        succFn = inputObj.success;
        errorFn = inputObj.error;
        var link = locationHref;
        */
        if(!UTIL.isFunction(succFn)) {
            succFn = function(){};
        }
        if(!UTIL.isFunction(errorFn)) {
            errorFn = function(){};
        }
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: picURL,
            success: function () {
                succFn();
                //h5_sdk.trackShare(pid, account, activityId, desc, msgSourceOpenid, 'friend');
            },
            cancel: function (error) {
                errorFn(error);
            }
        });
    },
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 允许用户上传图片到h5plus服务器并在回调中得到图片在h5plus服务器的地址
     * @method wxUploadImage
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} account 公众号weixin_id
     * @param  {function} succFn 获得图片地址成功的回调,回调返回值结果请参考 <a target="_blank" href="http://open.ruixuesoft.com/api/ApiMethod-23a556ef-48e0-438d-b35b-0e93ff2fc407.html">根据media_id获取素材并上传到cos</a>
     * @param  {function} errorFn 调用api失败的回调
     * @tutorial wxUploadImage
     */
    wxUploadImage : function(pid, account, succFn, previewModeObj) {
        previewModeObj = previewModeObj || {};
        var options = {
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera']
        };
        extend(options, previewModeObj);
        var methodName = 'ruixue.hfive.weixin.api.media.uploadtocosbymediaid';
        wx.chooseImage({
            count: options.count,
            sizeType: options.sizeType,
            sourceType: options.sourceType,
            success: function (resChooseImage) {
                var localIdImg = resChooseImage.localIds[0];
                previewModeObj.src = localIdImg;
                //上传图片
                wx.uploadImage({
                    localId: localIdImg,
                    isShowProgressTips: 1,
                    success: function (res) {
                        var mediaId = res.serverId;
                        UTIL.ajax({
                            type: 'GET',
                            url: Config.host + '/auth-template/api/?method=' + methodName,
                            dataType: 'json',
                            cache: false,
                            async: false,
                            data: {
                                'weixin_id': account,
                                'media_id': mediaId,
                                'pid': pid
                            },
                            success: function(resObj) {
                                responseHub.ropApiTransfer(resObj, succFn, function(){});
                                //succUploadFn(resObj);
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * 支付接口
     */
     callPayAPIByName: function (pid, methodName, paramObj, succFn, errorFn, inputConfigObj) {
        var jsonResponseWrap = null, optionsObj = {};
        UTIL.simpleMixin(optionsObj, inputConfigObj);
        if (UTIL.htools.test(methodName)) {
            //tools(mango)相应api返回的json进行封装
            jsonResponseWrap = UTIL.mangoRespObjWrap;
        } else {
            //hfive, external等非mango db相应api返回的json进行封装
            jsonResponseWrap = function (resObj) {
                return UTIL.ropRespObjFromCertainHierarchy(methodName, resObj);
            };
        }
        //jxj
        var tmpAccTk = UTIL.getStorage('accessToken');
        //jxj
        //if(UTIL.htools.test(methodName)) {
        UTIL.simpleMixin(optionsObj, {
            method: methodName,
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName + (tmpAccTk ? ('&h5_access_token=' + tmpAccTk) : ''),
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(paramObj),
            dataType: "json",
            success: function (res) {
                //对返回的json进行封装
                var resTmp = jsonResponseWrap(res);
                if (resTmp.error_response) {
                    if (UTIL.inRegArray(resTmp.error_response.code, exceptionCodeArr)) {
                        console.log(arguments)
                        alert('当前排队人数较多, 请稍后重试.');
                        return;
                    }
                }
                succFn(resTmp);
            },
            error: function (error) {
                //对返回的json进行封装
                if (errorFn) errorFn(error);
            }
        });

        UTIL.ajax(optionsObj);
    },
    /**
     * 获取用户详情
     */
    getUserDetail : function () {
    	
    }
};



module.exports = h5wx;
});