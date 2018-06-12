var ROP={},ROPLogConfig=window.ROPLogConfig||{serverUrl:"http://canal.ruixuesoft.com:30000/log"};!function(a){var b={ropLogs:{},serverUrl:a,config:function(a){this.serverUrl=a},getAjax:function(){var a;try{a=new XMLHttpRequest}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){return alert("您的浏览器不支持AJAX！"),!1}}}return a},add:function(a,b,c){if(!a||!b)return alert("logType and logContent are required."),!1;c||(c=(new Date).getTime()),this.ropLogs["logList"]||(this.ropLogs["logList"]=[]);var d={};return d.type=a,d.content=b,d.logTime=c,this.ropLogs["logList"].push(d),!0},clear:function(){this.ropLogs["logList"]=[]},send:function(a,b){if(!this.serverUrl)return alert("请先进行config操作"),void 0;var c=this.getAjax();c.onreadystatechange=function(){var d,e;4==c.readyState&&(200==c.status?(e=!(!window.attachEvent||window.opera),d=e?c.responseXML:c.responseText,a(d)):b(c,c.status))},c.open("post",this.serverUrl,!0),c.setRequestHeader("Content-Type","application/json"),c.send(JSON.stringify(this.ropLogs))}};window.ROP.logCollect=b}(ROPLogConfig.serverUrl);
/*
 * AMD和CMD调用前缀代码，不影响传统全局调用方式
 **/
(function(global, factory) {
    if(typeof define === 'function' && (define.amd || define.cmd)) {
        define(function(require) {
            return factory(require);
        });
    } else {
        factory(global, true);
    }
}(this, function(require, ifglobal) {
    //测试数据专区
    var Config = {
//         测试版用配置
        host: window.location.protocol + '//test.h5plus.net',
        wxjssdk_url : window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
        component_appid: 'wxe1d1bbc0cda53aa3',
//         正式版用配置
//        host: window.location.protocol + '//h5plus.net',
//        wxjssdk_url : window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
//        component_appid: 'wx2aeb95ce677f8e7e',
        hierarchy_2rd : '::'
    };
    var RMR_Log_Config = {
    	errLogCode: 'f1ee2cb3-8b19-4ba7-a244-ce6237c20128'
    };
    var h5_sdk = {},
        locationQueryStr = (window.location.href.split('?')[1])?(window.location.href.split('?')[1]):(''),
        locationHref = window.location.href;
    var getReg = /^get$/i, postReg = /^post$/i, deleteReg = /^delete$/i;
    var sessionStorageAttrNames = {openid: 'h5sdk_openid', accessToken: 'h5plusAccess-Token', refreshToken: 'Refresh-Token', expireTime: 'Expires-In', state: 'Token-State'};
    var invalidURLRedirect = null;
    var UTIL = {};
    var AjaxCall = null;
    var extend = null;
    var clipParamURL = function(hrefTmp) {
        hrefTmp = hrefTmp.replace(/#[^&]*/g, '');
    	hrefTmp = hrefTmp.replace(/([\?&])((openid=[^&]*)|(account=[^&]*)|(sign=[^&]*)|(nick=[^&]*)|(h5auth_code=[^&]*)|(timestamp=[^&]*))/g,'$1').replace(/&+/,'&').replace('?&','?').replace(/&$/,'').replace(/\?$/,'');
        return hrefTmp;
    };
    var OpenIDReadyWatcher = (function() {
        function Construct() {
            this.instantiated = false;
            this.ready = function() {
                var tmpFn = null;
                this.instantiated = true;
                while ((tmpFn = this.callbackQueue.shift())) {
                    tmpFn();
                }
            };
            this.callbackQueue = [];
            this.clear = function() {
                this.callbackFn = [];
            };
            this.push = function(callbackFn) {
            	if(!UTIL.isFunction(callbackFn)) return;
                if (this.instantiated === true) {
                    callbackFn();
                } else {
                    this.callbackQueue.push(callbackFn);
                }
            };
        };
        return new Construct();
    })();
    //用于从浏览器url中取得参数并封装成json的方法
    var urlParamsToJson = function(urlstr) {
        var obj = {};
        if (urlstr) {
            var strArr = urlstr.split('&');
            for (var i = 0; i < strArr.length; i++) {
                var temArr = strArr[i].split('=');
                obj[temArr[0]] = temArr[1];
            }
            return obj;
        } else {
            return {};
        }
    };
    var urlJSON = urlParamsToJson(locationQueryStr);
    /* ROP User Track部分代码    */
    var ROP_UT = function(){};
    ROP_UT.send = function(typeCode, logStr, sendSuccFn, sendErrorFn) {
        if(!sendSuccFn) sendSuccFn = function(){};
        if(!sendErrorFn) sendErrorFn = function(){};

        var result = ROP.logCollect.add(typeCode, logStr);
        if (result) {
            ROP.logCollect.send(sendSuccFn, sendErrorFn);
            ROP.logCollect.clear();
        }
    };
    var exceptionCodeArr = [/^S40$/, /^S3[0-9]$/, /^H5ATI/, /^H5ATE/];
    (function() {
        extend = function() {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !UTIL.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (;i < length; i++ ) {
                if((options = arguments[i]) != null) {
                    for ( name in options ) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (UTIL.isPlainObject(copy) || (copyIsArray = UTIL.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && UTIL.isArray(src) ? src : [];
                            } else {
                                clone = src && UTIL.isPlainObject(src) ? src : {};
                            }
                            target[ name ] = extend(deep,clone,copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        UTIL.inRegArray = function(elem, array, i){
			var len;
			if (array) {
				len = array.length;
				i = i ? i < 0 ? Math.max(0,len + i) : i : 0;
				for (;i < len;i++) {
					if (i in array && array[i].test(elem)) {
						return true;
					}
				}
			}
			return false;
        };
		UTIL.tokenTimer = null;
        UTIL.alertDebugger = function() {
        	if(!UTIL.debug_mode) return;
    		var tmpArr = [];
    		var args = arguments;
    		tmpArr = tmpArr.slice.call(args, 0);
    		for (var ind=0,len=tmpArr.length,resArr=[];ind<len;ind++) {
    			if(typeof(tmpArr[ind]) === 'string') {
    				resArr.push(tmpArr[ind]);
    			}
    		}
    		alert(resArr.join('\n'));
        };
        UTIL.objectToFlatQryStr = function(targetObj) {
        	var paramArr = [];
            for(var tmpAttr in targetObj) {
                if(typeof(targetObj[tmpAttr]) == 'object') {
                	UTIL.objectToFlatQryStr(targetObj[tmpAttr]);
                } else if(typeof(targetObj[tmpAttr]) == 'function'){

                } else {
                    paramArr.push(tmpAttr + '=' + targetObj[tmpAttr]);
                }
            }
            return paramArr.join('&');
        };
        UTIL.isPlainObject = function(obj) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval) {
				return false;
            }
            // Not own constructor property must be Object
            if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            var key;
            for (key in obj) {}
            return key === undefined || hasOwnProperty.call(obj, key);
        };
        UTIL.isArray = function(inputArr) {
            return Object.prototype.toString.call(inputArr) === '[object Array]';
        };
        /* 动态加载script标签的方法 */
        UTIL.loadScript = function(src, callback) {
            var el = document.createElement('script'), loaded = false;
            /* IE<9 不支持 onload所以也需要引用onreadystatechange,
            IE9 支持两种形式加载事件所以使用loaded防止运行两次*/
            el.onload = el.onreadystatechange = function(){
                if(!loaded && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')){
                    loaded = true;
                    if(typeof callback === 'function'){
                        callback();
                    }
                }
            };
            el.src = src;
            document.head.appendChild(el);
        };
        UTIL.isFunction = function(func) {
            return (typeof(func) == 'function');
        };
        UTIL.isObject = function(obj) {
            return (Object.prototype.toString.call(obj) === '[object Object]');
        };
        UTIL.getOpenid = function() {
            return sessionStorage.getItem(sessionStorageAttrNames.openid);
        };
        UTIL.simpleMixin = function (toObj, fromObj) {
            if(!UTIL.isObject(toObj) && !UTIL.isObject(fromObj)) {
                return toObj;
            }
            function simpleMixinExtend(toObjTmp, fromObjTmp) {
                for(var iObj in fromObjTmp) {
                    if(!UTIL.isObject(fromObjTmp[iObj])) {
                        toObjTmp[iObj] = fromObjTmp[iObj];
                    } else {
                        if(typeof(toObjTmp[iObj]) == 'undefined') {
                            toObjTmp[iObj] = {};
                            simpleMixinExtend(toObjTmp[iObj], fromObjTmp[iObj]);
                        }
                    }
                }
                return toObjTmp;
            };
            simpleMixinExtend(toObj, fromObj);
        };
        UTIL.mangoRespObjWrap = function(resObj) {
            return resObj;/* return {code: resObj.code,data: resObj.data}; */
        };
        UTIL.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','getNetworkType','openLocation','getLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','scanQRCode','chooseWXPay','openProductSpecificView','addCard','chooseCard','openCard'];
        UTIL.debug_mode = false;
        UTIL.hfive = /^(ruixue\.hfive)/;
        UTIL.external = /^(ruixue\.external)/;
        UTIL.htools = /^(ruixue\.tools)/;
        UTIL.ropAPINametoRespName = function(methodName) {
            var responseName = methodName.replace(/^ruixue\./, '');
            var responseNameAttr = responseName.split('.');
            responseNameAttr.push('response');
            //产生类似  hfive_weixin_pubid_get_response 这样的结果, rop api返回的json结构和其api名称有一定联系
            return responseNameAttr.join("_");
        };
        UTIL.ropRespObjFromCertainHierarchy = function(methodName, respObj) {
            // var attrName = UTIL.ropAPINametoRespName(methodName);
            // return (respObj[attrName])?(respObj[attrName]):(respObj);
            if (respObj.error_response) {
                return respObj;
            } else {
                for (i in respObj) {
                    return respObj[i];
                }
            }
        };
        UTIL.ajax = function(optionsObj) {
        	var dataStr = '';
        	var paramDataObj = optionsObj.data?optionsObj.data: {};
        	var url = optionsObj.url;
        	var success;
        	var error;
        	var method = optionsObj.method;
        	var contentType = optionsObj.contentType;
			var type = optionsObj.type;
            var tmpAccTk = UTIL.getStorage('accessToken');
            if(optionsObj.data) {
    			tmpAccTk?(optionsObj.data.h5_access_token=tmpAccTk):'';
            }
            var tmpObj = {
                url: Config.host + '/auth-template/api/',
                dataType: 'json',
                async: true,
                cache: false,
                contentType : 'application/x-www-form-urlencoded;charset=utf-8',
                success: function(){},
                error: function(){}
            };
            extend(tmpObj, optionsObj);
            if(/auth-template\/api/.test(tmpObj.url) && method) {
            	//上面两个条件method和/auth-template/api应该一同成立
            	//如果是api调用, 则默认请求type是post
                tmpObj.type = 'POST';
            	if(UTIL.htools.test(method)) {
                	tmpObj.contentType = 'application/json;charset=utf-8';
                	dataStr = JSON.stringify(paramDataObj);
                } else {
                	dataStr = UTIL.objectToFlatQryStr(paramDataObj);
                }
            } else {
            	//如果是非api调用, 则目前默认type是post
                tmpObj.type = 'POST';
				if(type) {
					tmpObj.type = type;
				}
            	dataStr = UTIL.objectToFlatQryStr(paramDataObj);
            }
            (function(){
                success = tmpObj.success;
                error = tmpObj.error;
            	delete tmpObj.method;
            	delete tmpObj.url;
            	delete tmpObj.data;
            	delete tmpObj.error;
            	delete tmpObj.success;
            })();
            if(getReg.test(tmpObj.type)) {
            	//应该没有都get请求了以后, rop上面的api
                AjaxCall(url,
                		dataStr,
                        success,
                        error,
                        tmpObj);
            } else if(postReg.test(tmpObj.type)) {
                AjaxCall(url,
                		dataStr,
                        success,
                        error,
                        tmpObj);
            } else if(deleteReg.test(tmpObj.type)) {
                AjaxCall(url,
                		dataStr,
                        success,
                        error,
                        tmpObj);
            }
        };
		UTIL.getStorage = function(inputKey) {
			return sessionStorage.getItem(sessionStorageAttrNames[inputKey]);
		};
		UTIL.setStorage = function(inputKey, value) {
			sessionStorage.setItem(sessionStorageAttrNames[inputKey], value);
		};
		UTIL.trackXHRError = function(optionsObj) {
			var pageURL = optionsObj.pageURL;
			var postURL = optionsObj.postURL;
			var params = optionsObj.params;
			var errCode = optionsObj.errCode;
			var errMsg = optionsObj.errMsg;
			var startTime = optionsObj.startTime;
			var endTime = optionsObj.endTime;
			var utParamArr = [];
		    utParamArr.push('api_exist_url' + Config.hierarchy_2rd + pageURL);
			utParamArr.push('api_post_url' + Config.hierarchy_2rd + postURL);
			utParamArr.push('api_post_paras' + Config.hierarchy_2rd + params);
			utParamArr.push('api_post_errcode' + Config.hierarchy_2rd + errCode);
			utParamArr.push('api_post_errmsg' + Config.hierarchy_2rd + errMsg);
			utParamArr.push('api_post_time' + Config.hierarchy_2rd + startTime);
			utParamArr.push('api_return_time' + Config.hierarchy_2rd + endTime);
			var typeCode = RMR_Log_Config.errLogCode;
			ROP_UT.send(typeCode, utParamArr.join(',,'), function(){}, function() {});
		};
    })();
	/*(function(win) {
		'use strict';
		var path = Config.host;
		var doc = document,
			query = 'querySelectorAll',
			claname = 'getElementsByClassName',
			S = function(s) {
				return doc[query](s);
			};
		//默认配置
		var config = {
			type: 0,
			shade: true,
			shadeClose: true,
			fixed: true,
			anim: true
		};
		var mready = {
			extend: function(obj) {
				var newobj = JSON.parse(JSON.stringify(config));
				for (var i in obj) {
					newobj[i] = obj[i];
				}
				return newobj;
			},
			timer: {},
			end: {}
		};
		var index = 0,
			classs = ['layermbox'],
			Layer = function(options) {
				var that = this;
				that.config = mready.extend(options);
				that.view();
			};
		Layer.prototype.view = function() {
			var that = this,
				config = that.config,
				layerbox = doc.createElement('div');

			that.id = layerbox.id = classs[0] + index;
			layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
			layerbox.setAttribute('index', index);

			var title = (function() {
				var titype = typeof config.title === 'object';
				return config.title ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3><button class="layermend"></button>' : '';
			}());

			var button = (function() {
				var btns = (config.btn || []).length,
					btndom;
				if (btns === 0 || !config.btn) {
					return '';
				}
				btndom = '<span type="1">' + config.btn[0] + '</span>'
				if (btns === 2) {
					btndom = '<span type="0">' + config.btn[1] + '</span>' + btndom;
				}
				return '<div class="layermbtn">' + btndom + '</div>';
			}());

			if (!config.fixed) {
				config.top = config.hasOwnProperty('top') ? config.top : 100;
				config.style = config.style || '';
				config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px';
			}

			if (config.type === 2) {
				config.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (config.content || '') + '</div>';
			}

			layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="laymshade"></div>' : '') + '<div class="layermmain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>' + '<div class="section">' + '<div class="layermchild ' + (config.className ? config.className : '') + ' ' + ((!config.type && !config.shade) ? 'layermborder ' : '') + (config.anim ? 'layermanim' : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' + title + '<div class="layermcont">' + config.content + '</div>' + button + '</div>' + '</div>' + '</div>';

			if (!config.type || config.type === 2) {
				var dialogs = doc[claname](classs[0] + config.type),
					dialen = dialogs.length;
				if (dialen >= 1) {
					layer.close(dialogs[0].getAttribute('index'))
				}
			}

			document.body.appendChild(layerbox);
			var elem = that.elem = S('#' + that.id)[0];
			setTimeout(function() {
				try {
					elem.className = elem.className + ' layermshow';
				} catch (e) {
					return;
				}
				config.success && config.success(elem);
			}, 1);

			that.index = index++;
			that.action(config, elem);
		};
		Layer.prototype.action = function(config, elem) {
			var that = this;
			//自动关闭
			if (config.time) {
				mready.timer[that.index] = setTimeout(function() {
					layer.close(that.index);
				}, config.time * 1000);
			}
			//关闭按钮
			if (config.title) {
				elem[claname]('layermend')[0].onclick = function() {
					config.cancel && config.cancel();
					layer.close(that.index);
				};
			}
			//确认取消
			if (config.btn) {
				var btns = elem[claname]('layermbtn')[0].children,
					btnlen = btns.length;
				for (var ii = 0; ii < btnlen; ii++) {
					btns[ii].onclick = function() {
						var type = this.getAttribute('type');
						if (type == 0) {
							config.no && config.no();
							layer.close(that.index);
						} else {
							config.yes ? config.yes(that.index) : layer.close(that.index);
						}
					};
				}
			}
			//点遮罩关闭
			//在安卓三星中，型号Grand2（未测试其他，不过不支持多点触控的手机 这个问题应该普遍存在）；初始化时设置config中type:1 并且style中width小于clientWidth
			//该情况下 安卓三星touch点击 会导致同页面其他layer无法显示 原因就是遮罩层的影响。
			//解决方式 或者验证Android处理ShadeClose:false (或者提示用户自己处理);
			if (config.shade && config.shadeClose) {
				var shade = elem[claname]('laymshade')[0];
				shade.onclick = function() {
					layer.close(that.index, config.end);
				};
				shade.ontouchmove = function() {
					layer.close(that.index, config.end);
				};
			}
			config.end && (mready.end[that.index] = config.end);
		};
		var layer = {
			v: '1.5',
			index: index,
			//核心方法
			open: function(options) {
				var o = new Layer(options || {});
				return o.index;
			},
			close: function(index) {
				var ibox = S('#' + classs[0] + index)[0];
				if (!ibox) return;
				ibox.innerHTML = '';
				doc.body.removeChild(ibox);
				clearTimeout(mready.timer[index]);
				delete mready.timer[index];
				typeof mready.end[index] === 'function' && mready.end[index]();
				delete mready.end[index];
			},
			//关闭所有layer层
			closeAll: function() {
				var boxs = doc[claname](classs[0]);
				for (var i = 0, len = boxs.length; i < len; i++) {
					layer.close((boxs[0].getAttribute('index') | 0));
				}
			}
		};
		win.layer = layer;
		win.layer.loadStyle = function() {
			//插入css
			document.head.appendChild((function() {
				var link = doc.createElement('link');
				link.href = path + '/frontend/js/h5sdk/css/layer.m.css';
				link.type = 'text/css';
				link.rel = 'styleSheet'
				link.id = 'layermcss';
				return link;
			}()));
		};
	})(h5_sdk);*/
    (function(){
    	ifValidOpenid = function(pid, account, open_id, auth_code, timestamp, sign) {
    		var state = UTIL.getStorage('state');
    		UTIL.setStorage('state', null);
			UTIL.ajax({
				async: false,
	    		url : Config.host + '/auth-template/login/weixin?pid=' + pid,
	    		data: {
	    			openid : open_id,
	    			h5auth_code : auth_code,
	                timestamp: timestamp,
	                sign : sign,
					state: state
	            },
	            success: function(respObj) {
					//sessionStorage中无openid，url有openid，直接将openid存入sessionStorage
					var redirectHref = clipParamURL(locationHref);
	            	if(respObj.success === true) {
						UTIL.setStorage('accessToken', respObj.data.access_token);
						UTIL.setStorage('refreshToken', respObj.data.refresh_token);
						UTIL.setStorage('expireTime', respObj.data.expires_in);
						UTIL.setStorage('openid', respObj.data.open_id);
						window.location.href = redirectHref;
	            	} else {
	            		//重新跳转只是为了防止用户非法进入该页面,这时候url中的各种参数与本地的state数据不匹配.
            			invalidURLRedirect(pid, account);
            			//window.location.href = redirectHref;
					}
	            },
	            error: function(res) {
	            	alert('网络有点忙乱.亲, 待会尝试吧.');
				}
	    	});
    	};
    	invalidURLRedirect = function(pid, account, scope) {
    		var Scope = (scope == 1 || scope == 0)?(scope):(0);
    		var viewUrl = encodeURIComponent(clipParamURL(locationHref));
    	    UTIL.ajax({
				async: false,
	    		url : Config.host + '/auth-template/login/weixin?pid=' + pid,
	    		data: {
	    			module_url : viewUrl,
	                component_appid: Config.component_appid,
	                weixin_id : account,
	                remark : '获取正确的openid',
                    Scope: Scope
	            },
	            success: function(respObj) {
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
    })();
    (function() {
        AjaxCall = function(url, paramStr, succFnResp, errorFnResp, requestParamObj) {
            var ifCache = requestParamObj.cache;
            var ifAsync = requestParamObj.async;
            var postOrGet = requestParamObj.type;
            var timeout = requestParamObj.timeout;
            var contentType = requestParamObj.contentType;
            //var paramArr = [];
            var timeoutTimer = null;
            var retryCnt = 0;
            var xhrStartTime = new Date().getTime();
            function RequestHTTP(burl, postOrGet, bXML, paramStr, succFnRes, errorFnRes) {
                var http_request = false;
                UTIL.alertDebugger(burl, postOrGet, paramStr);
                function doHttpRequest() {
                    if (window.XMLHttpRequest) {
                        http_request = new XMLHttpRequest();
                        if (http_request.overrideMimeType) {
                            http_request.overrideMimeType('text/xml');
                        }
                    } else if (window.ActiveXObject) {
                        try {
                            http_request = new ActiveXObject("Msxml2.XMLHTTP");
                        } catch(e) {
                            try {
                                http_request = new ActiveXObject("Microsoft.XMLHTTP");
                            } catch(e) {}
                        }
                    }
                    if (!http_request) {
                        alert('无法初始化http请求对象');
                        return false;
                    }
                    http_request.onreadystatechange = handleStateChange;
                    http_request.open(postOrGet, burl, ifAsync);
                    http_request.setRequestHeader("Content-Type", contentType);
                    if (postReg.test(postOrGet)) {
                        if(paramStr) {
                            http_request.send(paramStr);
                        } else {
                            http_request.send(null);
                        }
                    } else if(getReg.test(postOrGet) || deleteReg.test(postOrGet)) {
                    	http_request.send(null);
                    }
                    if (ifAsync && timeout > 0) {
                        timeoutTimer = setTimeout(function () {
                            http_request.abort('timeout');
                            clearTimeout(timeoutTimer);
                            errorFnRes({err_code: 506, err_msg: '访问超时'});
                        }, timeout);
                    }
                };

                function handleStateChange() {
                    if (http_request.readyState == 4 && http_request.status == 200) {
                        clearTimeout(timeoutTimer);
						var content;
                        if (bXML) {
                            content = http_request.responseXML;
                        } else {
                            content = http_request.responseText;
                            UTIL.alertDebugger(content, "回调类型:" + typeof(succFnRes));
                            var json = null;
                            try{
                                json = JSON.parse(content);
                            } catch(e){
                            	if (UTIL.debug_mode) {
                            		alert('链接: ' + burl + ', 返回的json格式不正确:' + e.message);
                                }
                                throw new Error(e.message);
                            }
                            succFnRes(json);
                            if((json && json.error_response) || !json) {
                            	UTIL.trackXHRError({
                            		pageURL: locationHref,
                            		postURL: burl,
                            		params: paramStr,
                            		errCode: (json?json.error_response.code:''),
                            		errMsg : (json?json.error_response.msg:''),
                            		startTime : xhrStartTime,
                            		endTime : new Date().getTime()
                            	});
                            }
                        }
                    }  else if(http_request.readyState == 4) {
                        if(http_request.status >= 400) {
                            errorFnRes();
                        } else if(http_request.status >= 500) {
                            errorFnRes();
                        }
                    }
                };
                doHttpRequest();
            };

            var param = '';
            var isXML = false; //false:html or true:xml
            var isCache = false; //false:no-cache or true:cache
            /* if (postReg.test(postOrGet)) {*/
            	RequestHTTP(url, postOrGet, isXML, paramStr, succFnResp, errorFnResp);
            /*} else if(getReg.test(postOrGet) || deleteReg.test(postOrGet)) {
                if(paramArr.length == 0) {
					RequestHTTP(url, postOrGet, isXML, paramStr, succFnResp, errorFnResp);
				} else {
					RequestHTTP(url, postOrGet, isXML, paramStr, succFnResp, errorFnResp);
				}
            }*/
        };
    })();

    var openidFromURL = urlJSON.openid;
    var openidFromSess = UTIL.getStorage('openid');
    var SERVICE = {
		refreshToken: function() {
			UTIL.ajax({
				type: 'GET',
				url: Config.host + '/auth-template/token/refresh/' + UTIL.getStorage('accessToken') + '/' + UTIL.getStorage('refreshToken') + '/' + UTIL.getStorage('expireTime'),
				success: function(tokenResObj) {
					if(tokenResObj.success === true) {
						UTIL.setStorage('accessToken', tokenResObj.data.access_token);
						UTIL.setStorage('refreshToken', tokenResObj.data.refresh_token);
						UTIL.setStorage('expireTime', tokenResObj.data.expires_in);
						var timeInterval = parseInt(tokenResObj.data.expires_in) * 1000;
						UTIL.tokenTimer = setTimeout(function() {
							SERVICE.refreshToken();
						}, timeInterval); //timeInterval
					} else {
						var chose = window.confirm("用户认证过期, 页面将刷新重新认证. 请确认");
						if(chose) {
							var redirectHref = clipParamURL(locationHref);
							//如果下面代码, 执行代表服务器端h5auth_code或者rop的timestamp过期失效了.
	            			window.location.href = redirectHref;
						}
					}
				},
				error: function() {
					alert('网络有点忙碌.请待会尝试.');
				}
			});
		},
    	ifValidAccessOpenidURL : function(){
    		var urlJSONObj = urlJSON;
    		if(urlJSONObj.openid && urlJSONObj.h5auth_code && urlJSONObj.timestamp && urlJSONObj.sign) {
    			return true;
    		}
    		return false;
    	},
        pageParamValid: function() {
            if(!UTIL.getOpenid()) {
                alert("openid没有写入sessionStorage");
                return false;
            }
            return true;
        },
        getPublicID: function(pid, request_url, account, succFn, errorFn) {
            var methodName = 'ruixue.hfive.weixin.pubid.get';
            request_url = encodeURIComponent(request_url);
            UTIL.ajax({
                url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
                data: {
                    'request_url': request_url,
                    'wx_id': account
                },
                success: function (respObj) {
                    var resObj = UTIL.ropRespObjFromCertainHierarchy(methodName, respObj);
                    if (resObj.result_success == true) {
                        succFn(resObj.wxinfos.wxinfo[0]);
                    } else {
                        errorFn({'err_code': 'S25', 'err_msg': '未查询到结果'});
                    }
                },
                error: function(resObj) {
                    errorFn(resObj['error_response']);
                }
            });
        },
        wxconfig: function(appid, timestamp, nonceStr, signature, debug) {
            ifWXConfigured = true;
            //设置微信SDK配置
            wx.config({
                debug: debug,
                appId: appid,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: UTIL.jsApiList
            });
        }
    };
    // 分享轨迹, 对页面分享进行记录
    var sharedTrack = function(account, ToUserName, sharedType, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.insertrkylinsharedata';
        var openid = UTIL.getOpenid();
        if(SERVICE.pageParamValid() === false) {
            return;
        }
        var time = parseInt(new Date().getTime() / 1000);
        var sharing_url = window.location.href;
        var param = {};
        param.data = {
            "weixin_id": account,
            "ToUserName": ToUserName,
            "CreateTime": time,
            "url": sharing_url,
            "detail": "分享",
            "FromUserName": openid,
            "Type": sharedType
        };
        UTIL.ajax({
            type: 'POST',
            url: Config.host + '/auth-template/api/?method=' + methodName,
            data: param,
            success: function (resObj) {
                if(succFn) succFn(UTIL.mangoRespObjWrap(resObj));
            },
            error: function(res) {
                if(errorFn) errorFn(res);
            }
        });
    };
    // 1 从页面url中取得参数并转换为json的方法是
    h5_sdk.pageURLParamToJson = function() {
        return urlParamsToJson(locationQueryStr);
    };

    h5_sdk.getOpenid = function() {
        return UTIL.getOpenid();
    };

    //获取所有的url参数
    h5_sdk.getUrlParams = h5_sdk.pageURLParamToJson;

    //获取某个url参数
    h5_sdk.getUrlParam = function (name) {
		return h5_sdk.getUrlParams()[name];
    }

    // 2. 判断页面url中openid是否有效的方法
    h5_sdk.init = function(pid, account, scope) {
    	var redirectHref = locationHref;
        var openidFromSess = UTIL.getStorage('openid');
    	if(openidFromSess) {
			//SERVICE.refreshToken();
            //当sessionStorage中已经有了openid，什么都不做
			OpenIDReadyWatcher.ready();
        } else if (SERVICE.ifValidAccessOpenidURL()) {
			var urlJSONObj = urlJSON;
			ifValidOpenid(pid, account, urlJSON.openid, urlJSONObj.h5auth_code, urlJSONObj.timestamp, urlJSONObj.sign);
			/*
			redirectHref = clipParamURL(redirectHref);
			sessionStorage.setItem(sessionStorageAttrNames.openid, urlJSON.openid);
			window.location.href = redirectHref;
			*/
        } else {
            //sessionStorage中无openid，url中也无openid，跳转页面获取openid
        	invalidURLRedirect(pid, account, scope);
        }
        /*if(!window.wx){UTIL.loadScript(Config.wxjssdk_url,function(){if(window.wx){getWXConfiged(pid,account,function(){},function(){});}});}*/
    };
    // 3. 通用api调用方式
    h5_sdk.callAPIByName = function(pid, methodName, paramObj, succFn, errorFn, inputConfigObj) {
        var jsonResponseWrap = null, optionsObj = {};
        UTIL.simpleMixin(optionsObj, inputConfigObj);
        if(UTIL.htools.test(methodName)) {
            //tools(mango)相应api返回的json进行封装
            jsonResponseWrap = UTIL.mangoRespObjWrap;
        } else {
            //hfive, external等非mango db相应api返回的json进行封装
            jsonResponseWrap = function(resObj) {
                return UTIL.ropRespObjFromCertainHierarchy(methodName, resObj);
            };
        }
		
        //if(UTIL.htools.test(methodName)) {
            UTIL.simpleMixin(optionsObj, {
            	method: methodName,
                url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
                data: paramObj,
                success: function(res) {
                    //对返回的json进行封装
                    var resTmp = jsonResponseWrap(res);
                    if(resTmp.error_response) {
                    	if(UTIL.inRegArray(resTmp.error_response.code, exceptionCodeArr)) {
                    		alert('当前排队人数较多, 请稍后重试.');
                    		return;
                    	}
                    }
                    succFn(resTmp);
                },
                error: function(error) {
                    //对返回的json进行封装
                    if(errorFn) errorFn(error);
                }
            });
        //} else {
            /*UTIL.simpleMixin(optionsObj, {
            	method: methodName,
                url: Config.host + '/auth-template/api/?method=' + methodName +"&pid=" + pid + (tmpAccTk?('&h5_access_token=' + tmpAccTk):''),
                data: paramObj,
                success: function(res) {
                    //对返回的json进行封装
                    succFn(jsonResponseWrap(res));
                },
                error: function(error) {
                    //对返回的json进行封装
                    if(errorFn) errorFn(error);
                }
            });*/
        //}
        UTIL.ajax(optionsObj);
    };


    // 4. 封装get public id方法
    var ifWXConfigured = false;
    h5_sdk.getPubid = function(pid, account, succFn, errorFn) {
        //分享本页面url
        var request_url = window.location.href.indexOf('#') < 0 ? window.location.href : window.location.href.split('#')[0];
        if(!errorFn) {
            errorFn = function(){};
        }
        SERVICE.getPublicID(pid, request_url, account, succFn, errorFn);
    };
    var getWXConfiged = function(pid, account, succCallFn, errorCallFn) {
        var succFn = function(succResObj) {
            var pubId = succResObj.pub_id;
            var appId = succResObj.app_id;
            var component_appid = succResObj.component_appid;
            var timestamp = succResObj.timestamp;
            var nonceStr = succResObj.noncestr;
            var signature = succResObj.signature;
            if(!appId || !timestamp || !nonceStr || !signature) {
                alert("公众号唯一标识、签名的时间戳、签名随机串和签名缺失");
                return;
            }
            SERVICE.wxconfig(appId, timestamp, nonceStr, signature, UTIL.debug_mode);
            succCallFn();
        };
        h5_sdk.getPubid(pid, account, succFn, errorCallFn);
    };

    // 6. 是否已经关注公众号
    h5_sdk.wxIfFollowing = function(pid, openid, succFn, errorFn) {
        var methodName = 'ruixue.hfive.weixin.attention.judge';
        UTIL.ajax({
            url: Config.host + '/auth-template/api/?method=' + methodName,
            data: {
                'pid': pid,
                'open_id': openid
            },
            success: function (res) {
                if(succFn) succFn(UTIL.ropRespObjFromCertainHierarchy(methodName, res));
            },
            error: function(){
            	if(errorFn) errorFn();
            }
        });
    };
    h5_sdk.wxIfFollow = function(pid, account, succFn, errorFn) {
        var methodName = 'ruixue.external.weixin.userdetailinfo.get';
        var paramObj = {
        	weixin_account : account,
        	open_id : h5_sdk.getOpenid(),
        	component_appid : Config.component_appid
        };
        h5_sdk.callAPIByName(pid, methodName, paramObj, function(result) {
        	if(result.wxuserinfo && result.wxuserinfo.subscribe === '1') {
        		succFn({"result_success": true, "result_msg": "true"});
        	} else {
        		succFn({"result_success": true, "result_msg": "false"});
        	}
        }, errorFn);
    };

    // 7. 设置分享给好友并添加分享轨迹
    h5_sdk.wxShareToFriend = function(pid, account, inputObj) {
        var title, desc, link, picURL, msgSourceOpenid, succFn, errorFn;
        title = inputObj.title;
        desc = inputObj.desc;
        picURL = inputObj.imgSrc;
        succFn = inputObj.success;
        errorFn = inputObj.error;
        link = inputObj.url?inputObj:locationHref;
        
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
                h5_sdk.trackShare(pid, account, activityId, desc, msgSourceOpenid, 'friend');
            },
            fail: function (error) {
                errorFn(error);
            }
        });
    };


    // 8. 设置分享到朋友圈
    h5_sdk.wxShareToTimeline = function(pid, account, inputObj) {
        var title, link, picURL, succFn, errorFn;
        title = inputObj.title;
        link = inputObj.url?inputObj:locationHref;
        picURL = inputObj.imgSrc;
        succFn = inputObj.success;
        errorFn = inputObj.error;
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
                //h5_sdk.trackShare(pid, account, activityId, null, msgSourceOpenid, 'community');
            },
            fail: function (error) {
                errorFn(error);
            }
        });
    };
    h5_sdk.ready = function(readyCallback) {
    	OpenIDReadyWatcher.push(readyCallback);
    };
    h5_sdk.mongodbFindPagingApi = function(pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbfindpagingapi';
        var inputConfigObj = {
            type: 'POST'
        };
        h5_sdk.callAPIByName(pid, methodName, paramObj, succFn, errorFn, inputConfigObj);
    };

    h5_sdk.mongodbFindoneApi = function(pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbfindoneapi';
        var inputConfigObj = {
            type: 'GET'
        };
        h5_sdk.callAPIByName(pid, methodName, paramObj, succFn, errorFn, inputConfigObj);
    };

    h5_sdk.mongodbInsertapi = function(pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbinsertapi';
        var inputConfigObj = {
            type: 'POST'
        };
        h5_sdk.callAPIByName(pid, methodName, paramObj, succFn, errorFn, inputConfigObj);
    };

    h5_sdk.mongodbEditApi = function(pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbeditapi';
        var jsonResponseWrap = null, optionsObj = {type: 'POST'};
        //tools(mango)相应api返回的json进行封装
        jsonResponseWrap = UTIL.mangoRespObjWrap;
        UTIL.simpleMixin(optionsObj, {
            url: Config.host + '/auth-template/api/?method=' + methodName +"&pid=" + pid,
            data: paramObj,
            success: function(res) {
                //对返回的json进行封装
                succFn(jsonResponseWrap(res));
            },
            error: function(error) {
                //对返回的json进行封装
                if(errorFn) errorFn(error);
            }
        });
        UTIL.ajax(optionsObj);
    };

    h5_sdk.mongodbCountingApi = function (pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbcountingapi';
        var inputConfigObj = {
            type: 'POST'
        }
        h5_sdk.callAPIByName(pid, methodName, paramObj, succFn, errorFn, inputConfigObj);
    }

    h5_sdk.mongodbDeleteApi = function(pid, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.api.mongodbdeleteapi';
        var jsonResponseWrap = null, optionsObj = {type: 'DELETE'};
        //tools(mango)相应api返回的json进行封装
        jsonResponseWrap = UTIL.mangoRespObjWrap;
        UTIL.simpleMixin(optionsObj, {
        	method: methodName,
            url: Config.host + '/auth-template/api/?method=' + methodName +"&pid=" + pid,
            data: paramObj,
            success: function(res) {
                //对返回的json进行封装
                succFn(jsonResponseWrap(res));
            },
            error: function(error) {
                //对返回的json进行封装
                if(errorFn) errorFn(error);
            }
        });
        UTIL.ajax(optionsObj);
    };

    h5_sdk.wxUploadImage = function(pid, accountValue, succUploadFn, errorFn, previeModeObj) {
        previeModeObj = previeModeObj || {};
        var jsonResponseWrap = function(method, resObj) {
            return UTIL.ropRespObjFromCertainHierarchy(method, resObj);
        };
        var tmpUpload = function() {
            var methodName = 'ruixue.hfive.weixin.api.media.uploadtocosbymediaid';
            wx.chooseImage({
                success: function (resChooseImage) {
                    var localIdImg = resChooseImage.localIds[0];
                    previeModeObj.src = localIdImg;
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
                                    'weixin_id': accountValue,
                                    'media_id': mediaId,
                                    'pid': pid
                                },
                                success: function (resObj) {
                                    succUploadFn(jsonResponseWrap(methodName, resObj));
                                },
                                error: function (respObj) {
                                    errorFn({
                                        code: respObj.code,
                                        msg: respObj.msg
                                    });
                                }
                            });
                        },
                        fail: function (err) {
                            //alert(JSON.stringify(err));
                            errorFn(errorObj);
                        }
                    });
                },
                fail: function(errorObj){
                    //alert(JSON.stringify(errorObj));
                    errorFn(errorObj);
                }
            });
        };
        if(ifWXConfigured === true) {
            tmpUpload();
        } else {
            getWXConfiged(pid, account, function(){
                wx.ready(function(){
                    ifWXConfigured = true;
                    tmpUpload();
                });
            }, errorFn);
        }
    };

    h5_sdk.wxRead = function(rdpid, rdaccount, rddetailStr, succRdFn, errorRdFn) {
        var rdopenid = h5_sdk.getOpenid();
        var methodName = 'ruixue.tools.api.insertrkylinclickdata';
        var time = parseInt(new Date().getTime() / 1000);
        var paramObj = {
            data: {
                "pid" : rdpid,
                "weixin_id": rdaccount,
                "openid": rdopenid,
                "CreateTime": time,
                "url": locationHref,
                "detail": rddetailStr
            }
        };
        var optionsObj = {type: 'POST'};
        var jsonResponseWrap = UTIL.mangoRespObjWrap;
        UTIL.simpleMixin(optionsObj, {
            url: Config.host + '/auth-template/api/?method=' + methodName,
            data: paramObj,
            success: function(res) {
                //对返回的json进行封装
                if(succRdFn) succRdFn(jsonResponseWrap(res));
            },
            error: function(error) {
                //对返回的json进行封装
                if(errorFn) errorRdFn(error);
            }
        });
        UTIL.ajax(optionsObj);
    };

    /* 埋点点击 */
    h5_sdk.trackClick = function(utpid, utaccount, utActivityId, utButtonDetail) {
        var utUrl = locationHref;
        var utParamArr = [];
        utParamArr.push('weixin_id' + Config.hierarchy_2rd + utaccount);
        utParamArr.push('openId' + Config.hierarchy_2rd + h5_sdk.getOpenid());
        utParamArr.push('CreateTime' + Config.hierarchy_2rd + new Date().getTime());
        utParamArr.push('buttonDetail' + Config.hierarchy_2rd + utButtonDetail);
        utParamArr.push('activityId' + Config.hierarchy_2rd + utActivityId);
        utParamArr.push('url' + Config.hierarchy_2rd + encodeURIComponent(utUrl));
        var typeCode = '4d56ed6a-a8ef-4fec-af07-13a34de9061a';
        ROP_UT.send(typeCode, utParamArr.join(',,'), function(res){}, function(err) {console.log("点击埋点记录失败, 请联系平台管理员");});
    };
    /* 埋点阅读 */
    h5_sdk.trackRead = function(utpid, uraccount, urActivityId, urShareDetail, urFromUserName) {
        var urUrl = locationHref;
        var utParamArr = [];
        if(!urFromUserName) urFromUserName = null;
        utParamArr.push('weixin_id' + Config.hierarchy_2rd + uraccount);
        utParamArr.push('reader' + Config.hierarchy_2rd + h5_sdk.getOpenid());
        utParamArr.push('CreateTime' + Config.hierarchy_2rd + new Date().getTime());
        utParamArr.push('url' + Config.hierarchy_2rd + encodeURIComponent(urUrl));
        utParamArr.push('detail' + Config.hierarchy_2rd + urShareDetail);
        utParamArr.push('activity_id' + Config.hierarchy_2rd + urActivityId);
        utParamArr.push('FromUserName' + Config.hierarchy_2rd + urFromUserName);
        var typeCode = 'f41b2ffe-679b-4a32-87aa-de5077ad56cd';
        ROP_UT.send(typeCode, utParamArr.join(',,'), function(res){}, function(err) {console.log("阅读埋点记录失败, 请联系平台管理员");});
    };
    /* 埋点分享 */
    /*h5_sdk.trackShare = function(tspid, tsaccount, tsActivityId, tsDetail, tsFromUserName, tsToUsername) {
        var tsurl = locationHref;
        var utParamArr = [];
        var splitter = '::';
        if(!tsFromUserName) tsFromUserName = null;
        if(!(tsToUsername === 'friend' || tsToUsername === 'community')) {
            return;
        }
        utParamArr.push('weixin_id' + Config.hierarchy_2rd + tsaccount);
        utParamArr.push('ToUserName' + Config.hierarchy_2rd + tsToUsername);
        utParamArr.push('CreateTime' + Config.hierarchy_2rd + new Date().getTime());
        utParamArr.push('url' + Config.hierarchy_2rd + encodeURIComponent(tsurl));
        utParamArr.push('detail' + Config.hierarchy_2rd + tsDetail);
        utParamArr.push('FromUserName' + Config.hierarchy_2rd + tsFromUserName);
        utParamArr.push('activity_id' + Config.hierarchy_2rd + tsActivityId);
        var typeCode = '37da273e-c11e-4d35-b831-ab663bde3477';
        ROP_UT.send(typeCode, utParamArr.join(',,'), function(res){}, function(err) {console.log("分享埋点记录失败, 请联系平台管理员");});
    }*/

    if(ifglobal) {
        require.h5sdk = h5_sdk;
    }
    return h5_sdk;
}));