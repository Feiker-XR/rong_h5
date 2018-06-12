(function(global, doc){
    //测试数据专区
    var Config = {
        // 测试版用配置
//        host: window.location.protocol + '//test.h5plus.net',
//        wxjssdk_url : window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
//        component_appid: 'wxe1d1bbc0cda53aa3',
        // 正式版用配置
        host: window.location.protocol + '//h5plus.net',
        wxjssdk_url : window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
        component_appid: 'wx2aeb95ce677f8e7e',
        hierarchy_2rd : '::'
    };
    global.h5_Config = Config;
})(window, document);
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
//  (function(global, doc) {
    var Config = window.h5_Config;
    delete window.h5_Config;
    var sessionStorageAttrNames = {
        openid: 'h5sdk_openid', 
//      accessToken: 'h5plusAccess-Token',  
//      refreshToken: 'Refresh-Token', 
//      expireTime: 'Expires-In', 
        state: 'Token-State'
    };
    var h5_sdk = {},
        locationHref = window.location.href,
        locationQueryStr = (locationHref.split('?')[1])?(locationHref.split('?')[1]):('');
    //移除url中部分重要的参数
    var clipParamURL = function(hrefTmp) {
        hrefTmp = hrefTmp.replace(/#[^&]*/g, '');
        hrefTmp = hrefTmp.replace(/([\?&])((country=[^&]*)|(city=[^&]*)|(province=[^&]*)|(headimgurl=[^&]*)|(sex=[^&]*)|(openid=[^&]*)|(account=[^&]*)|(sign=[^&]*)|(nick=[^&]*)|(h5auth_code=[^&]*)|(timestamp=[^&]*))/g,'$1').replace(/&+/,'&').replace('?&','?').replace(/&$/,'').replace(/\?$/,'');
        return hrefTmp;
    };
    var extend, urlJSON;
    var responseHub = {
        //锟斤拷锟斤拷系统锟斤拷锟斤拷锟斤拷锟斤拷识
        ropExceptionFlag: /^S/i,
        ropApiTransfer: function(response, succFn, errorFn) {
            if(response.error_response && this.ropExceptionFlag.test(response.error_response.code)) {
                //系统锟斤拷锟斤拷锟斤拷
                errorFn(response);
            } else {
                //业锟今级达拷锟斤拷
                succFn(response);
            }
        },
        mongoTransfer: function(response, succFn, errorFn) {
            if(response.error_response && this.ropExceptionFlag.test(response.error_response.code)) {
                //系统锟斤拷锟斤拷锟斤拷
                errorFn(response);
            } else if(response.error_response) {
                //业锟今级达拷锟斤拷
                succFn(response);
            } else {
                if(response.code == '0') {
                    succFn(response);
                } else {
                    //nodejs系统锟斤拷锟斤拷锟斤拷锟?
                    errorFn(response);
                }
            }
        },
        validate: function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
            if(!pid || typeof(pid) != 'string') {
                alert("公众号pid没有传入");
                return false;
            } else if(!dbName || typeof(dbName) != 'string') {
                alert("数据库名称没有传入");
                return false;
            } else if(!dbTableName || typeof(dbTableName) != 'string') {
                alert("表名称没有传入");
                return false;
            } else if(!paramObj || typeof(paramObj) != 'object') {
                alert("数据查询参数必须是js对象");
                return false;
            } else if(succFn != undefined && typeof(succFn) != 'function') {
                alert("请求成功回调函数必须是js函数");
                return false;
            } else if(errorFn != undefined && typeof(errorFn) != 'function') {
                alert("请求失败回调函数必须是js函数");
                return false;
            }
            return true;
        }
    };
    (function() {
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
        urlJSON = urlParamsToJson(locationQueryStr);
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
    })();
    var UTIL = {};
    (function(){
        var getReg = /^get$/i, postReg = /^post$/i, deleteReg = /^delete$/i;
        var contentTypeJSON = /application\/json/i, contentTypeWWForm = /x-www-form-urlencoded/i;
        UTIL.isFunction = function(func) {
            return (typeof(func) == 'function');
        };
        UTIL.isObject = function(obj) {
            return (Object.prototype.toString.call(obj) === '[object Object]');
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
        UTIL.getOpenid = function() {
            return sessionStorage.getItem(sessionStorageAttrNames.openid);
        };
        UTIL.mangoRespObjWrap = function(resObj) {
            return resObj;/* return {code: resObj.code,data: resObj.data}; */
        };
        UTIL.jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','getNetworkType','openLocation','getLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','scanQRCode','chooseWXPay','openProductSpecificView','addCard','chooseCard','openCard'];
        UTIL.debug_mode = false;
        UTIL.hfive = /^(ruixue\.hfive)/;
        UTIL.external = /^(ruixue\.external)/;
        UTIL.htools = /^(ruixue\.tools)/;
        UTIL.ropRespObjFromCertainHierarchy = function(methodName, respObj) {
            if (respObj.error_response) {
                return respObj;
            } else {
                for (i in respObj) {
                    return respObj[i];
                }
            }
        };
        UTIL.getStorage = function(inputKey) {
            return sessionStorage.getItem(sessionStorageAttrNames[inputKey]);
        };
        UTIL.setStorage = function(inputKey, value) {
            sessionStorage.setItem(sessionStorageAttrNames[inputKey], value);
        };
        /*UTIL.trackXHRError = function(optionsObj) {
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
        };*/
        var AjaxCall = function(burl, paramStr, succFnResp, errorFnResp, requestParamObj) {
            var efdef = h5_sdk.Deferred();
            
            var ifCache = requestParamObj.cache;
            var ifAsync = requestParamObj.async;
            var postOrGet = requestParamObj.type;
            var timeout = requestParamObj.timeout;
            var dataType = requestParamObj.dataType;
            var contentType = requestParamObj.contentType;

            var timeoutTimer = null;
            var param = '';
            var isXML = false;
            var isCache = false;
            var http_request = false;

            function doHttpRequest() {
                if (window.XMLHttpRequest) {
                    http_request = new XMLHttpRequest();
                    if (http_request.overrideMimeType) {
                        http_request.overrideMimeType('text/xml');
                    }
                } else if (window.ActiveXObject) {
                    try {
                        http_request = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        try {
                            http_request = new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (e) {}
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
                    if (paramStr) {
                        http_request.send(paramStr);
                    } else {
                        http_request.send(null);
                    }
                } else if (getReg.test(postOrGet) || deleteReg.test(postOrGet)) {
                    http_request.send(null);
                }
                if (ifAsync && timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        http_request.abort('timeout');
                        clearTimeout(timeoutTimer);
                        errorFnRes({
                            err_code: 506,
                            err_msg: '访问超时'
                        });
                    }, timeout);
                }
                return efdef.promise(http_request);
            };

            function handleStateChange() {
                if (http_request.readyState == 4 && http_request.status == 200) {
                    clearTimeout(timeoutTimer);
                    var content;
                    content = http_request.responseText;
                    try {
                        if(dataType === 'json') {
                            content = eval('(' + content + ')');
                        }                        
                    } catch (e) {
                        if (UTIL.debug_mode) {
                            alert('链接: ' + burl + ', 返回的json格式不正确:' + e.message);
                        }
                        throw new Error(e.message);
                    }
                    succFnResp(content);
                    efdef.resolve();
                } else if (http_request.readyState == 4) {
                    efdef.reject();
                    if (http_request.status >= 400) {
                        errorFnResp();
                    } else if (http_request.status >= 500) {
                        errorFnResp();
                    }
                }
            };
            return doHttpRequest();
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
                //后台auth-template需要的一个参数h5_access_token在参数请求中
                tmpAccTk?(optionsObj.data.h5_access_token=tmpAccTk):'';
            }
            var tmpObj = {
                type: 'POST',
                url: Config.host + '/auth-template/api/',
                dataType: 'json',
                async: true,
                cache: false,
                contentType : 'application/x-www-form-urlencoded;charset=utf-8',
                success: function(){},
                error: function(){}
            };
            extend(tmpObj, optionsObj);
            /*if(/auth-template\/api/.test(tmpObj.url) && method) {
                //上面两个条件method和/auth-template/api应该一同成立
                //如果是api调用, 则默认请求type是post
                if(UTIL.htools.test(method)) {
                    tmpObj.contentType = 'application/json;charset=utf-8';
                    dataStr = JSON.stringify(paramDataObj);
                } else {
                    dataStr = UTIL.objectToFlatQryStr(paramDataObj);
                }
            } else */
            //{
                //如果是非api调用, 则目前默认type是post
                if(contentTypeJSON.test(tmpObj.contentType)) {
                    dataStr = JSON.stringify(paramDataObj);
                } else {
                    dataStr = UTIL.objectToFlatQryStr(paramDataObj);
                }
            //}
            (function(){
                success = tmpObj.success;
                error = tmpObj.error;
                delete tmpObj.method;
                delete tmpObj.url;
                delete tmpObj.data;
                delete tmpObj.error;
                delete tmpObj.success;
            })();
            if (getReg.test(tmpObj.type) && dataStr !== '') {
                if (url.indexOf('?') === -1) {
                    url += '?';
                }
                if (url.lastIndexOf('?') === (url.length - 1)) {
                    url += dataStr;
                } else {
                    url += '&' + dataStr;
                }
                dataStr = '';
            }
            return AjaxCall(url, dataStr, success, error, tmpObj);
        };
    })();
    (function() {
        var toString = Object.prototype.toString, class2type = {};
        var type = function( obj ) {
            return obj == null ?
                String( obj ) :
                class2type[ toString.call(obj) ] || "object";
        };
        "Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(item, index) {
            class2type[ "[object " + item + "]" ] = item.toLowerCase();
        });
        UTIL.type = type;
        var pather = function(by) {
            var pathName = window.location.pathname;
            pathName = pathName.split('\/');
            return window.location.protocol + '//' + window.location.host + pathName.slice(0, by).join('\/');
        };
        UTIL.mts = {
            sandbox: {
                flag: /(.*)(\.sandbox\.minisite\.h5plus\.net)$/i,
                getPath: function() {
                    return pather(4);
                }
            },
            prod: {
                flag: /(.*)(\.minisite\.h5plus\.net)$/i,
                getPath: function() {
                    return pather(6);
                }
            }
        };
    })();
    (function(){
        // String to Object flags format cache
        var flagsCache = {};
        // Convert String-formatted flags into Object-formatted ones and store in cache
        function createFlags( flags ) {
            var object = flagsCache[ flags ] = {},
                i, length;
            flags = flags.split( /\s+/ );
            for ( i = 0, length = flags.length; i < length; i++ ) {
                object[ flags[i] ] = true;
            }
            return object;
        };
        var Callbacks = function( flags ) {
            // Convert flags from String-formatted to Object-formatted
            // (we check in cache first)
            flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};
            var // Actual callback list
                list = [],
                // Stack of fire calls for repeatable lists
                stack = [],
                // Last fire value (for non-forgettable lists)
                memory,
                // Flag to know if list was already fired
                fired,
                // Flag to know if list is currently firing
                firing,
                // First callback to fire (used internally by add and fireWith)
                firingStart,
                // End of the loop when firing
                firingLength,
                // Index of currently firing callback (modified by remove if needed)
                firingIndex,
                // Add one or several callbacks to the list
                add = function( args ) {
                    var i,
                        length,
                        elem,
                        type,
                        actual;
                    for ( i = 0, length = args.length; i < length; i++ ) {
                        elem = args[ i ];
                        type = UTIL.type( elem );
                        if ( type === "array" ) {
                            // Inspect recursively
                            add( elem );
                        } else if ( type === "function" ) {
                            // Add if not in unique mode and callback is not in
                            if ( !flags.unique || !self.has( elem ) ) {
                                list.push( elem );
                            }
                        }
                    }
                },
                // Fire callbacks
                fire = function( context, args ) {
                    args = args || [];
                    memory = !flags.memory || [ context, args ];
                    fired = true;
                    firing = true;
                    firingIndex = firingStart || 0;
                    firingStart = 0;
                    firingLength = list.length;
                    for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                        if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
                            memory = true; // Mark as halted
                            break;
                        }
                    }
                    firing = false;
                    if ( list ) {
                        if ( !flags.once ) {
                            if ( stack && stack.length ) {
                                memory = stack.shift();
                                self.fireWith( memory[ 0 ], memory[ 1 ] );
                            }
                        } else if ( memory === true ) {
                            self.disable();
                        } else {
                            list = [];
                        }
                    }
                },
                // Actual Callbacks object
                self = {
                    // Add a callback or a collection of callbacks to the list
                    add: function() {
                        if ( list ) {
                            var length = list.length;
                            add( arguments );
                            // Do we need to add the callbacks to the
                            // current firing batch?
                            if ( firing ) {
                                firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away, unless previous
                            // firing was halted (stopOnFalse)
                            } else if ( memory && memory !== true ) {
                                firingStart = length;
                                fire( memory[ 0 ], memory[ 1 ] );
                            }
                        }
                        return this;
                    },
                    // Remove a callback from the list
                    remove: function() {
                        if ( list ) {
                            var args = arguments,
                                argIndex = 0,
                                argLength = args.length;
                            for ( ; argIndex < argLength ; argIndex++ ) {
                                for ( var i = 0; i < list.length; i++ ) {
                                    if ( args[ argIndex ] === list[ i ] ) {
                                        // Handle firingIndex and firingLength
                                        if ( firing ) {
                                            if ( i <= firingLength ) {
                                                firingLength--;
                                                if ( i <= firingIndex ) {
                                                    firingIndex--;
                                                }
                                            }
                                        }
                                        // Remove the element
                                        list.splice( i--, 1 );
                                        // If we have some unicity property then
                                        // we only need to do this once
                                        if ( flags.unique ) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        return this;
                    },
                    // Control if a given callback is in the list
                    has: function( fn ) {
                        if ( list ) {
                            var i = 0,
                                length = list.length;
                            for ( ; i < length; i++ ) {
                                if ( fn === list[ i ] ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    // Remove all callbacks from the list
                    empty: function() {
                        list = [];
                        return this;
                    },
                    // Have the list do nothing anymore
                    disable: function() {
                        list = stack = memory = undefined;
                        return this;
                    },
                    // Is it disabled?
                    disabled: function() {
                        return !list;
                    },
                    // Lock the list in its current state
                    lock: function() {
                        stack = undefined;
                        if ( !memory || memory === true ) {
                            self.disable();
                        }
                        return this;
                    },
                    // Is it locked?
                    locked: function() {
                        return !stack;
                    },
                    // Call all callbacks with the given context and arguments
                    fireWith: function( context, args ) {
                        if ( stack ) {
                            if ( firing ) {
                                if ( !flags.once ) {
                                    stack.push( [ context, args ] );
                                }
                            } else if ( !( flags.once && memory ) ) {
                                fire( context, args );
                            }
                        }
                        return this;
                    },
                    // Call all the callbacks with the given arguments
                    fire: function() {
                        self.fireWith( this, arguments );
                        return this;
                    },
                    // To know if the callbacks have already been called at least once
                    fired: function() {
                        return !!fired;
                    }
                };

            return self;
        };
        // Static reference to slice
        var sliceDeferred = [].slice;

        extend(h5_sdk, {
            Deferred: function( func ) {
                var doneList = Callbacks( "once memory" ),
                    failList = Callbacks( "once memory" ),
                    progressList = Callbacks( "memory" ),
                    state = "pending",
                    lists = {
                        resolve: doneList,
                        reject: failList,
                        notify: progressList
                    },
                    promise = {
                        done: doneList.add,
                        fail: failList.add,
                        progress: progressList.add,

                        state: function() {
                            return state;
                        },

                        // Deprecated
                        isResolved: doneList.fired,
                        isRejected: failList.fired,

                        then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
                            deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
                            return this;
                        },
                        always: function() {
                            deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
                            return this;
                        },
                        /*pipe: function( fnDone, fnFail, fnProgress ) {
                            return jQuery.Deferred(function( newDefer ) {
                                jQuery.each( {
                                    done: [ fnDone, "resolve" ],
                                    fail: [ fnFail, "reject" ],
                                    progress: [ fnProgress, "notify" ]
                                }, function( handler, data ) {
                                    var fn = data[ 0 ],
                                        action = data[ 1 ],
                                        returned;
                                    if ( jQuery.isFunction( fn ) ) {
                                        deferred[ handler ](function() {
                                            returned = fn.apply( this, arguments );
                                            if ( returned && jQuery.isFunction( returned.promise ) ) {
                                                returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
                                            } else {
                                                newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                            }
                                        });
                                    } else {
                                        deferred[ handler ]( newDefer[ action ] );
                                    }
                                });
                            }).promise();
                        },*/
                        // Get a promise for this deferred
                        // If obj is provided, the promise aspect is added to the object
                        promise: function( obj ) {
                            if ( obj == null ) {
                                obj = promise;
                            } else {
                                for ( var key in promise ) {
                                    obj[ key ] = promise[ key ];
                                }
                            }
                            return obj;
                        }
                    },
                    deferred = promise.promise({}),
                    key;

                for ( key in lists ) {
                    deferred[ key ] = lists[ key ].fire;
                    deferred[ key + "With" ] = lists[ key ].fireWith;
                }

                // Handle state
                deferred.done( function() {
                    state = "resolved";
                }, failList.disable, progressList.lock ).fail( function() {
                    state = "rejected";
                }, doneList.disable, progressList.lock );

                // Call given func if any
                if ( func ) {
                    func.call( deferred, deferred );
                }

                // All done!
                return deferred;
            },

            // Deferred helper
            when: function( firstParam ) {
                var args = sliceDeferred.call( arguments, 0 ),
                    i = 0,
                    length = args.length,
                    pValues = new Array( length ),
                    count = length,
                    pCount = length,
                    deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
                        firstParam :
                        jQuery.Deferred(),
                    promise = deferred.promise();
                function resolveFunc( i ) {
                    return function( value ) {
                        args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
                        if ( !( --count ) ) {
                            deferred.resolveWith( deferred, args );
                        }
                    };
                }
                function progressFunc( i ) {
                    return function( value ) {
                        pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
                        deferred.notifyWith( promise, pValues );
                    };
                }
                if ( length > 1 ) {
                    for ( ; i < length; i++ ) {
                        if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
                            args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
                        } else {
                            --count;
                        }
                    }
                    if ( !count ) {
                        deferred.resolveWith( deferred, args );
                    }
                } else if ( deferred !== firstParam ) {
                    deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
                }
                return promise;
            }
        });
    })();
    // ROP RMR log 记录
    /*var ROP_UT = {};
    (function() {
        var ajax = UTIL.ajax;
        var storageConfig = {
            string : {
                'separator_1st': ',,',
                'separator_2nd': '::'
            }
        };
        var serverUrl = "http://canal.ruixuesoft.com:30000/log";
        var logeObj = {
            ropLogs: {},
            serverUrl: serverUrl,
            config: function(a) {
                this.serverUrl = a
            },
            add: function(a, b, c) {
                if (!a || !b) return alert("logType and logContent are required."), !1;
                c || (c = (new Date).getTime()), this.ropLogs["logList"] || (this.ropLogs["logList"] = []);
                var d = {};
                return d.type = a, d.content = b, d.logTime = c, this.ropLogs["logList"].push(d), !0;
            },
            clear: function() {
                this.ropLogs["logList"] = []
            },
            send: function(successFn, errorFn) {
                if (!this.serverUrl) return alert("请先进行config操作");
                var jsonLogObj = this.ropLogs["logList"];
                ajax({
                    type: "POST",
                    url: serverUrl,
                    contentType: 'application/json',
                    data: {
                        logList: jsonLogObj
                    },
                    success: successFn,
                    error: errorFn
                });
            }
        };
        var toString = Object.prototype.toString;
        var send = function(typeCode, logStr, sendSuccFn, sendErrFn) {
            var result = logeObj.add(typeCode, logStr);
            if (result) {
                logeObj.send(sendSuccFn, sendErrFn);
                logeObj.clear();
            }
        };
        //typecode, json格式的参数, 成功回调, 失败回调
        var rmrLogHandler = function(typeCode, logInJSONForm, sendSuccFn, sendErrFn) {
            var cloudArr = [];
            if(toString.call(logInJSONForm)==='[object Array]') {
                for(var indexer = 0, len = logInJSONForm.length; indexer < len; indexer++) {
                    for(var tmp in logInJSONForm[indexer]) {
                        cloudArr.push(tmp + storageConfig.string.separator_2nd + logInJSONForm[indexer][tmp]);
                    }
                }
            } else if(toString.call(logInJSONForm) === '[object Object]') {
                for(var tmp in logInJSONForm) {
                    cloudArr.push(tmp + storageConfig.string.separator_2nd + logInJSONForm[tmp]);
                }
            } else {
                return;
            }
            !sendSuccFn && (sendSuccFn = function() {});
            !sendErrFn && (sendErrFn = function() {});
            send(typeCode, cloudArr.join(storageConfig.string.separator_1st), sendSuccFn, sendErrFn);
        };
        h5_sdk.rmrSend = ROP_UT.send = rmrLogHandler;
    })();*/

    var invalidURLRedirect, ifValidOpenid;
    //业务api部分
    (function(){
        ifValidOpenid = function(pid, account, open_id, auth_code, timestamp, sign) {
            var state = UTIL.getStorage('state');
            UTIL.setStorage('state', null);
            UTIL.ajax({
                type: 'POST',
                async: false,
                //contentType: 'application/json',
                //该接口只能用www-form类型传递参数
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
                    //alert("ifValidOpenid:" + JSON.stringify(respObj) + "\nopen_id:" + open_id + "\nauth_code:" + auth_code + "\ntimestamp:" + timestamp + "\nsign:" + sign + "\nstate:" + state);
                    //alert("ifValidOpenid:" + locationHref);
                    if(respObj.success === true) {
                        //UTIL.setStorage('accessToken', respObj.data.access_token);
                        //UTIL.setStorage('refreshToken', respObj.data.refresh_token);
                        //UTIL.setStorage('expireTime', respObj.data.expires_in);
                        UTIL.setStorage('openid', open_id);
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
    })();
    var SERVICE = {
        /*refreshToken: function() {
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
        },*/
        ifValidAccessOpenidURL : function(){
            var urlJSONObj = urlJSON;
            //alert(JSON.stringify(urlJSONObj));
            if(urlJSONObj.openid && urlJSONObj.h5auth_code && urlJSONObj.timestamp && urlJSONObj.sign) {
                return true;
            }
            return false;
        },
/*
        pageParamValid: function() {
            if(!UTIL.getOpenid()) {
                alert("openid没有写入sessionStorage");
                return false;
            }
            return true;
        },
*/
        getPublicID: function(pid, request_url, account, succFn, errorFn) {
            var methodName = 'ruixue.hfive.weixin.pubid.get';
            request_url = encodeURIComponent(request_url);
            UTIL.ajax({
                type: 'POST',
                url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
                data: {
                    'request_url': request_url,
                    'wx_id': account
                },
                success: function (respObj) {
                    responseHub.ropApiTransfer(respObj, function(succResObj) {
                        succResObj = UTIL.ropRespObjFromCertainHierarchy('ruixue.hfive.weixin.pubid.get', succResObj);
                        succFn(succResObj.wxinfos?(succResObj.wxinfos.wxinfo[0]):(succResObj));
                    }, errorFn);
                    /*var resObj = UTIL.ropRespObjFromCertainHierarchy(methodName, respObj);
                    if (resObj.result_success == true) {
                        succFn(resObj.wxinfos.wxinfo[0]);
                    } else {
                        errorFn({'err_code': 'S25', 'err_msg': '未查询到结果'});
                    }*/
                },
                error: function() {
                    errorFn();
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

    var OpenIDReadyWatcher = (function() {
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
    // 1 从页面url中取得参数并转换为json的方法是
    /*h5_sdk.pageURLParamToJson = function() {
        return UTIL.clone(urlJSON);
    };*/
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 配置h5sdk调试的方法
     * @method config
     * @param {object} optionsObj js object，支持参数包括debug_mode(决定是否进入微信jssdk调试模式)
     */
    h5_sdk.config = function(optionsObj) {
        var options = {
            debug_mode: false,
            host: Config.host
        };
        if(UTIL.isObject(optionsObj)) extend(options, optionsObj);
        Config.host = options.host;
        Config.component_appid = options.componentAppid;
        Config.component_appid = options.appid;
        extend(UTIL, options);
    };
    /**
     * @deprecated
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 设置请求的component app id的方法
     * @method setComponentAppId
     * @param  {string} newAppId 新的h5plus帐号对应的component app id
     */
    h5_sdk.setComponentAppId = function(newAppId) {
        Config.component_appid = newAppId;
    };
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 初始化微信用户openid后,获得微信用户openid的方法
     * @method wxOpenid
     */
    h5_sdk.wxOpenid = function() {
        return UTIL.getOpenid();
    };

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
    h5_sdk.wxOpenidInit = function(pid, account, scope) {
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
    };
    h5_sdk.wxOpenidInit.inited = false;

    //1.0 分页查询数据
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法对页面托管服务对应的数据库中数据进行分页查询
     * @method searchDataByPaging
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {object} paramObj 筛选数据的过滤条件,没有过滤条件请传入null或者{}
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.searchDataByPaging = function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.findpaging';
        var optionsObj = {};
        var paramsObj = {condition:{}};
        if(!errorFn) errorFn = function(){};
        (!paramObj)?(paramObj={}):('');
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        extend(paramsObj.condition, paramObj);
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                //锟皆凤拷锟截碉拷json锟斤拷锟叫凤拷装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };
    //1.1 查询单条
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法查询页面托管服务对应的数据库中数据的详情
     * @method searchDataById
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {string} valueId 数据的id
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.searchDataById = function(pid, dbName, dbTableName, valueId, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.findone';
        var optionsObj = {};
        var paramObj = {};
        if(!errorFn) errorFn = function(){};
        paramObj.database_name = dbName;
        paramObj.dbtable_name = dbTableName;
        paramObj.id = valueId;
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramObj,
            success: function(result) {
                //锟皆凤拷锟截碉拷json锟斤拷锟叫凤拷装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };
    //1.2 查询数量
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法查询页面托管服务对应的数据库中数据的数量
     * @method searchDataWithCount
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {object} paramObj 筛选查询的过滤条件,没有过滤条件,请传入null或者{}
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.searchDataWithCount = function (pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.findcount';
        var optionsObj = {};
        var paramsObj = {condition:{}};
        if(!errorFn) errorFn = function(){};
        (!paramObj)?(paramObj={}):('');
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        extend(paramsObj.condition, paramObj);
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };

    //2.0 插入
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法插入单条数据到页面托管服务对应的数据库中
     * @method batchInsertData
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {object} paramObj js object,包含要插入数据的所有属性
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.insertData = function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.insert';
        var optionsObj = {};
        var paramsObj = {data:{}};
        if(!errorFn) errorFn = function() {};
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        extend(paramsObj.data, paramObj);
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };
    //2.1 批量插入
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法批量插入数据到页面托管服务对应的数据库中
     * @method batchInsertData
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {Array} paramObj 数组,元素为js object,包含要插入数据的所有的属性
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.batchInsertData = function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.bulkinsert';
        var optionsObj = {};
        var paramsObj = {data:null};
        if(!errorFn) errorFn = function(){};
        if(!UTIL.isArray(paramObj)) {
            alert('传入参数必须是数组');
            return;
        }
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        paramsObj.data = paramObj;
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                //锟皆凤拷锟截碉拷json锟斤拷锟叫凤拷装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };

    //3.0 更新
    /*h5_sdk.saveDataById = function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.update';
        var optionsObj = {};
        var paramsObj = {data:{}};
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        paramsObj.id = paramObj.id;
        delete paramObj.id;
        extend(paramsObj.data, paramObj);
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                //对返回的json进行封装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn({});
            }
        });
        UTIL.ajax(optionsObj);
    };*/
    //3.1 更新指定字段
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法更新页面托管服务对应的数据库中的数据
     * @method updateDataById
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {object} paramObj 要更新的数据的属性,必须包含数据的id,且传入哪些属性就更新哪些属性的值
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.updateDataById = function(pid, dbName, dbTableName, paramObj, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.dataupdate';
        var optionsObj = {};
        var paramsObj = {data:{}};
        if(!errorFn) errorFn = function(){};
        paramsObj.database_name = dbName;
        paramsObj.dbtable_name = dbTableName;
        paramsObj.id = paramObj.id;
        delete paramObj.id;
        extend(paramsObj.data, paramObj);
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramsObj,
            success: function(result) {
                //对返回的json进行封装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };

    //4.1  删除
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法移除页面托管服务对应的数据库中的数据
     * @method deleteDataById
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} dbName 对应数据库的名称
     * @param  {string} dbTableName 数据库表名称
     * @param  {string} valueId 数据的id
     * @param  {function} succFn 请求的成功回调
     * @param  {function} errorFn 请求的失败回调(允许不传入)
     */
    h5_sdk.deleteDataById = function(pid, dbName, dbTableName, valueId, succFn, errorFn) {
        var methodName = 'ruixue.tools.mts.api.delete';
        var optionsObj = {};
        var paramObj = {};
        if(!errorFn) errorFn = function(){};
        paramObj.database_name = dbName;
        paramObj.dbtable_name = dbTableName;
        paramObj.id = valueId;
        extend(optionsObj, {
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramObj,
            success: function(result) {
                //对返回的json进行封装
                responseHub.mongoTransfer(result, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };
    //数据库操作部分 - end


    // 3. 通用api调用方式
    /*var exceptionCodeArr = [/^S40$/, /^S3[0-9]$/, /^H5ATI/, /^H5ATE/];*/
    /*var exceptionCodeArr = [/^S/];*/
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 通过该方法调用ROP平台上已授权给h5plus账户的所有api
     * @method callAPIByName
     * @tutorial callAPIByName
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} methodName api的名称
     * @param  {object} paramObj 包含所有传入参数的js object
     * @param  {function} succFn 请求调用的成功回调,回调返回值结果请ROP api说明
     * @param  {function} errorFn 请求调用的失败回调
     * @param  {object} inputConfigObj 请求的选定配置项,目前支持的选择项目包括:async(值只能为true或false), type(值只能为get或者post),dataType(请求对应的响应结构),contentType(请求传参结构,可为application/x-www-form-urlencoded或者application/json)
     */
    h5_sdk.callAPIByName = function(pid, methodName, paramObj, succFn, errorFn, inputConfigObj) {
        var optionsObj = {};
        extend(optionsObj, inputConfigObj);
        if(!succFn) succFn = function(){};
        if(!errorFn) errorFn = function(){};
        extend(optionsObj, {
            url: Config.host + '/auth-template/api/?pid=' + pid + '&method=' + methodName,
            data: paramObj,
            success: function(res) {
                responseHub.ropApiTransfer(res, succFn, errorFn);
            },
            error: function() {
                errorFn();
            }
        });
        UTIL.ajax(optionsObj);
    };

    // 4. 封装get public id方法
    var ifWXConfigured = false;
    var getPubid = function(pid, account, succFn, errorFn) {
        //分享本页面url
        var request_url = window.location.href.indexOf('#') < 0 ? window.location.href : window.location.href.split('#')[0];
        if(!errorFn) {
            errorFn = function(){};
        }
        SERVICE.getPublicID(pid, request_url, account, succFn, errorFn);
    };
    var getWXConfigured = function(pid, account, succCallFn, errorCallFn) {
        if(!errorCallFn) errorCallFn = function() {};
        var succFn = function(succResObj) {
            var pubId = succResObj.pub_id;
            var appId = succResObj.app_id;
            var component_appid = succResObj.component_appid;
            var timestamp = succResObj.timestamp;
            var nonceStr = succResObj.noncestr;
            var signature = succResObj.signature;
            if(!appId || !timestamp || !nonceStr || !signature) {
                //alert("公众号唯一标识、签名的时间戳、签名随机串和签名缺失");
                return;
            }
            SERVICE.wxconfig(appId, timestamp, nonceStr, signature, UTIL.debug_mode);
            if(!succCallFn) succCallFn = function(){};
            wx.ready(succCallFn);
        };
        getPubid(pid, account, succFn, errorCallFn);
    };
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 注册微信各个功能接口的方法,允许使用微信的分享、转发、二维码扫描、微信支付、相片上传等功能。
     * @method wxInit
     * @tutorial wxInit
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} account 公众号weixin_id
     * @param  {function} readyFn 注册微信各个功能接口的回调函数,在回调函数内捕获微信的分享、转发、二维码扫描、微信支付、相片上传等功能。
     */
    h5_sdk.wxInit = function(pid, account, readyFn) {
        //判断是否加载了微信官方的jssdk
        if(!window.wx){
            UTIL.loadScript(Config.wxjssdk_url, function(){
                getWXConfigured(pid, account, readyFn);
            });
        } else {
            getWXConfigured(pid, account, readyFn);
        }
    };
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description 获得用户是否实时的关注当前公众号的方法
     * @method wxIfFollowing
     * @param  {string} pid h5plus帐号的pid
     * @param  {string} account 公众号weixin_id
     * @param  {string} openid 微信用户的openid
     * @param  {function} succFn 获得是否关注api的成功回调,回调返回值结果请参考 <a target="_blank" href="http://open.ruixuesoft.com/api/ApiMethod-59c17243-447b-4c00-ba75-e0e861367573.html">用户详细信息获取</a>
     * @param  {function} errorFn 调用api失败的回调
     */
    h5_sdk.wxIfFollowing = function(pid, account, open_id, succFn, errorFn) {
        var methodName = 'ruixue.external.weixin.userdetailinfo.get';
        var paramObj = {
            weixin_account : account,
            open_id : open_id,
            component_appid : Config.component_appid
        };
        if(!succFn) succFn = function(){};
        if(!errorFn) errorFn = function(){};
        h5_sdk.callAPIByName(pid, methodName, paramObj, function(result) {
            succFn(result);
        }, function(result){
            errorFn(result);
        });
    };

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
    h5_sdk.wxShareToFriend = function(title, link, picURL, desc, succFn, errorFn) {
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
    };

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
    h5_sdk.wxShareToTimeline = function(title, link, picURL, succFn, errorFn) {
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
    };
    /**
     * @author 小兆 <lizhaolong@rkylin.com.cn>
     * @description openid获得并准备就绪的方法
     * @method wxOpenidReady
     * @tutorial wxOpenid
     * @param  {function} openid准备就绪的回调
     */
    h5_sdk.wxOpenidReady = function(readyCallback) {
        OpenIDReadyWatcher.push(readyCallback);
    };

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
    h5_sdk.wxUploadImage = function(pid, account, succFn, previewModeObj) {
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
    };

    h5_sdk.mtsGetProjectPath = function() {
        var host = window.location.host;
        if(UTIL.mts.sandbox.flag.test(host)) {
            return UTIL.mts.sandbox.getPath();
        } else if(UTIL.mts.prod.flag.test(host)) {
            return UTIL.mts.prod.getPath();
        }
    };

    /* 埋点分享 不应该分享出去 */
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
        ROP_UT.send(typeCode, utParamArr.join(',,'), function(res){}, function(err) {});
    };*/
    window.h5sdk = h5_sdk;
    return h5_sdk;
}));