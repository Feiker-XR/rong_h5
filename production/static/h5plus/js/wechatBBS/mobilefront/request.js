(function(win) {
  //F:\hcm\sln\project\h5plus-solution\res>
  //npm  install gulp-less --save-dev
    //var path="http://test.h5plus.net/auth-template/api/?method=";
    //var wxSharepath="test.h5plus.net";
    //http://h5plus.net/
    var path="http://h5plus.net/auth-template/api/?method=";
    var wxSharepath="h5plus.net";

    function reque(par, urlstr, suc, befor, rqtype) {

        h5sdk.wxOpenidReady(function(openid) {
            window.openid=openid;
            jqajx(par, urlstr, suc, befor, rqtype);

        });
    }

    function jqajx(par, urlstr, suc, befor, rqtype){

        //ruixue.hfive.community.personal.authorfollow.findlist
        //str.indexOf(tag)!=-1

        //console.log(urlstr+":请求api:"+urlstr+":urlstr.indexOf:"+urlstr.indexOf("ruixue.hfive.community.personal.authorfollow.findlist"));
        /*
        var idprto=urlstr.indexOf("ruixue.hfive.community.personal.authorfollow.findlist");

        if(idprto==-1){
            par.open_id=window.openid;
        }else{
            par={};
        }
        */


        var parobj = JSON.stringify(par);

        urlstr = urlstr + "&searatr=&t=" + Date.parse(new Date())+ '&pid='+configuration.pid;
        var rqty = "post";
        if (rqtype != undefined) {
            rqty = rqtype;
        }

        $.ajax({
        url:urlstr,// 跳转到 action
        xhrFields:{
           withCredentials:true
        },
            dataType: 'json',
            type: rqty,
            data: parobj,
            contentType: 'application/json',
        success:function(data) {
            if (suc != undefined) {
                suc(data);
            }
        },
       error : function(err) {

         }
        });


    }

    function callh5sdk(apistr,jsonpar,sucfun,errfun){
        h5sdk.callAPIByName(configuration.pid,apistr,jsonpar, function (res){
            console.log(res);

        });


        /*
        h5sdk.callAPIByName(configuration.pid,
            apistr,
            jsonpar,
            sucfun,
            errfun
        );
        */
    }



    var request = {
        QueryString : function(val) {
            var uri = window.location.search;
            var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
            return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
        },
        QueryStrings : function() {
            var uri = window.location.search;
            var re = /\w*\=([^\&\?]*)/ig;
            var retval=[];
            while ((arr = re.exec(uri)) != null)
                retval.push(arr[0]);
            return retval;
        },
        setQuery : function(val1, val2) {
            var a = this.QueryStrings();
            var retval = "";
            var seted = false;
            var re = new RegExp("^" +val1+ "\=([^\&\?]*)$", "ig");
            for(var i=0; i<a.length; i++) {
                if (re.test(a[i])) {
                    seted = true;
                    a[i] = val1 +"="+ val2;
                }
            }
            retval = a.join("&");
            return "?" +retval+ (seted ? "" : (retval ? "&" : "") +val1+ "=" +val2);
        }
    }

    function getRequest(obj) {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest[obj];
    }

    win.reque = reque;
    win.getRequest=getRequest;

    win.path=path;
    win.wxSharepath=wxSharepath;
    win.request=request;
    win.configuration = {
        pid: 'xxxxxxxx', 
        account : 'xxxxxxx',
        componentAppid: 'xxxxxxxx'
    };
    //172.16.13.88   localhost
    //var path = 'http://172.16.13.172:1221/auth-template/api/?method=';


    //var path = 'http://172.16.13.205:1221/auth-template/api/?method=';

    //hfive_community_personal_albumcollect_findlist_response
    //
    win.requeurl = {
        "findegc": path + "ruixue.hfive.community.square.topic.findpaging",
        "pageSquare": path + 'ruixue.hfive.community.found.album.findpaging',
        'personalCollect': path + 'ruixue.hfive.community.personal.albumcollect.findlist',
        'brandHead': path + 'ruixue.hfive.community.personal.authorfollow.findlist',
        "gettopiccount": path + "ruixue.hfive.community.square.topiccomment.count",
        "getcomment": path + "ruixue.hfive.community.square.topiccomment.findpaging",
        "createtopic":path + "ruixue.hfive.community.square.topiccomment.create",
        "autorsfollow":path + "ruixue.hfive.community.square.topicauthor.follow",
        "getwood":path + "ruixue.hfive.community.square.topicproduct.findlist",
        "getapppid":path + "ruixue.tools.api.generatepid",
        "getautortopic":path +"ruixue.hfive.community.personal.authortopic.findpaging",
        'collectSpecial':path + "ruixue.hfive.community.found.album.collect",
        'squareCollection':path + "ruixue.hfive.community.found.album.collect",
        'unsquareCollection':path + "ruixue.hfive.community.found.album.cancelcollect",
        'squarefollow':path + "ruixue.hfive.community.square.topicauthor.follow",
        'unsquarefollow':path + "ruixue.hfive.community.square.topicauthor.cancelfollow",
        'getcuruser':path +"ruixue.external.weixin.userdetailinfo.get",
        'lookuptopic':path +"ruixue.hfive.community.square.topic.findone",
        'getwxrecodeimg':path +"ruixue.external.weixin.qrcode.get"

        //"<Collectionpersona></Collectionpersona>l":path+"ruixue.hfive.community.personal.albumcollect.findlist"
        //ruixue.hfive.community.personal.authorfollow.findlist
        //wk 上没有 后期会补上
    };


    var h5_cache={
        init:function(){
            if(window.localStorage){
            }else{
                console.warn("警告","不支持h5_localStorage");
            }
        },
        clearcache:function(){
            localStorage.clear();
        },
        removedata:function(key){
            localStorage.removeItem(key);
        },
        getdata:function(key){
           return localStorage.getItem(key);
        },
        setdata:function(key,vlu){
            localStorage.setItem(key,vlu);
        }

    };

    win.cacheos=h5_cache;
//



    /** Ajax组件
     *
     *  @constructs Ajax
     *  @param  {Object}    opts            [*]参数
     *  @param  {Function}  opts.url        [*]请求的URL
     *  @param  {Function}  opts.beforeSend [*]请求前回调
     *  @param  {Function}  opts.success    [*]请求成功的回调函数
     *  @param  {Function}  opts.error      [*]出错时回调,如404
     *  @param  {Function}  opts.type       请求方式,默认值get
     *  @param  {Function}  opts.data       请求附带的数据
     *  @param  {String}    opts.dataType   返回数据类型,默认是json
     *  @return {Ajax}        Ajax的实例
     *  @eg.
     var go = new Ajax({
                url:"/"
                ,beforeSend:function(){}
                ,success:function(){}
                ,error:function(){}
                ,type:"post"
                ,data:{"test":1}
                ,dataType:"json"
            });
     */
    var statusMap = {
        0: '未初始化,还没有调用open/send方法(or后端跨域请求错误)',
        1: '（载入）已调用send方法，正在发送请求',
        2: '（载入完成）send方法执行完成，已经接收到全部响应内容',
        3: '（交互）正在解析响应内容',
        4: '（完成）响应内容解析完成，可以在客户端调用',
        100: 'Continue 初始的请求已经接受，客户端应当继续发送请求的其余部分',
        101: 'Switching Protocols 服务器将遵从客户的请求转换到另外一种协议',
        200: '服务端返回正常',
        201: 'Created 服务器已经创建了文档，Location头给出了它的URL',
        202: 'Accepted 已经接受请求，但处理尚未完成',
        203: 'Non-Authoritative Information文档正常返回，因为使用文档拷贝一些应答头可能错误',
        204: 'No Content没有新文档，浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新',
        205: 'Reset Content 没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容',
        206: 'Partial Content 客户发送了一个带有Range头的GET请求，服务器完成了它',
        300: 'Multiple Choices客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明',
        301: 'Moved Permanently客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL',
        302: '类似于301，但新的URL应该被视为临时性的替代',
        303: '如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取',
        304: 'Not Modified 客户端有缓冲的文档并发出了一个条件性的请求If-Modified-Since。服务器告诉客户，原来缓冲的文档还可以继续使用',
        305: 'Use Proxy 客户请求的文档应该通过Location头所指明的代理服务器提取',
        307: ' - Temporary Redirect 和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码：当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。（HTTP 1.1新） ',
        400: ' - Bad Request 请求出现语法错误。 ',
        401: ' - Unauthorized 访问被拒绝，客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。IIS 定义了许多不同的 401 错误，它们指明更为具体的错误原因。这些具体的错误代码在浏览器中显示，但不在 IIS 日志中显示： ',
        401.1: ' - 登录失败。 ',
        401.2: ' - 服务器配置导致登录失败。 ',
        401.3: ' - 由于 ACL 对资源的限制而未获得授权。 ',
        401.4: ' - 筛选器授权失败。 ',
        401.5: ' - ISAPI/CGI 应用程序授权失败。 ',
        401.7: ' – 访问被 Web 服务器上的 URL 授权策略拒绝。这个错误代码为 IIS 6.0 所专用。 ',
        403: ' - Forbidden 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。禁止访问：IIS 定义了许多不同的 403 错误，它们指明更为具体的错误原因： ',
        403.1: ' - 执行访问被禁止。 ',
        403.2: ' - 读访问被禁止。 ',
        403.3: ' - 写访问被禁止。 ',
        403.4: ' - 要求 SSL。 ',
        403.5: ' - 要求 SSL 128。 ',
        403.6: ' - IP 地址被拒绝。 ',
        403.7: ' - 要求客户端证书。 ',
        403.8: ' - 站点访问被拒绝。 ',
        403.9: ' - 用户数过多。 ',
        403.10: ' - 配置无效。 ',
        403.11: ' - 密码更改。 ',
        403.12: ' - 拒绝访问映射表。 ',
        403.13: ' - 客户端证书被吊销。 ',
        403.14: ' - 拒绝目录列表。 ',
        403.15: ' - 超出客户端访问许可。 ',
        403.16: ' - 客户端证书不受信任或无效。 ',
        403.17: ' - 客户端证书已过期或尚未生效。 ',
        403.18: ' - 在当前的应用程序池中不能执行所请求的 URL。这个错误代码为 IIS 6.0 所专用。 ',
        403.19: ' - 不能为这个应用程序池中的客户端执行 CGI。这个错误代码为 IIS 6.0 所专用。 ',
        403.20: ' - Passport 登录失败。这个错误代码为 IIS 6.0 所专用。 ',
        404: ' - Not Found 无法找到指定位置的资源。这也是一个常用的应答。 ',
        404.0: ' -（无） – 没有找到文件或目录。 ',
        404.1: ' - 无法在所请求的端口上访问 Web 站点。 ',
        404.2: ' - Web 服务扩展锁定策略阻止本请求。 ',
        404.3: ' - MIME 映射策略阻止本请求。 ',
        405: ' - Method Not Allowed 请求方法（GET、POST、HEAD、Delete、PUT、TRACE等）对指定的资源不适用，用来访问本页面的 HTTP 谓词不被允许（方法不被允许）（HTTP 1.1新） ',
        406: ' - Not Acceptable 指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容，客户端浏览器不接受所请求页面的 MIME 类型（HTTP 1.1新）。 ',
        407: ' - Proxy Authentication Required 要求进行代理身份验证，类似于401，表示客户必须先经过代理服务器的授权。（HTTP 1.1新） ',
        408: ' - Request Timeout 在服务器许可的等待时间内，客户一直没有发出任何请求。客户可以在以后重复同一请求。（HTTP 1.1新） ',
        409: ' - Conflict 通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。（HTTP 1.1新） ',
        410: ' - Gone 所请求的文档已经不再可用，而且服务器不知道应该重定向到哪一个地址。它和404的不同在于，返回407表示文档永久地离开了指定的位置，而404表示由于未知的原因文档不可用。（HTTP 1.1新） ',
        411: ' - Length Required 服务器不能处理请求，除非客户发送一个Content-Length头。（HTTP 1.1新） ',
        412: ' - Precondition Failed 请求头中指定的一些前提条件失败（HTTP 1.1新）。 ',
        413: ' – Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头（HTTP 1.1新）。 ',
        414: ' - Request URI Too Long URI太长（HTTP 1.1新）。 ',
        415: ' – 不支持的媒体类型。 ',
        416: ' – Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头。（HTTP 1.1新） ',
        417: ' – 执行失败。 ',
        423: ' – 锁定的错误。 ',
        500: ' - Internal Server Error 服务器遇到了意料不到的情况，不能完成客户的请求。 ',
        500.12: ' - 应用程序正忙于在 Web 服务器上重新启动。 ',
        500.13: ' - Web 服务器太忙。 ',
        500.15: ' - 不允许直接请求 Global.asa。 ',
        500.16: ' – UNC 授权凭据不正确。这个错误代码为 IIS 6.0 所专用。 ',
        500.18: ' – URL 授权存储不能打开。这个错误代码为 IIS 6.0 所专用。 ',
        500.100: ' - 内部 ASP 错误。 ',
        501: ' - Not Implemented 服务器不支持实现请求所需要的功能，页眉值指定了未实现的配置。例如，客户发出了一个服务器不支持的PUT请求。 ',
        502: ' - Bad Gateway 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答。 亦说Web 服务器用作网关或代理服务器时收到了无效响应。 ',
        502.1: ' - CGI 应用程序超时。 ',
        502.2: ' - CGI 应用程序出错。 ',
        503: ' - Service Unavailable 服务不可用，服务器由于维护或者负载过重未能应答。例如，Servlet可能在数据库连接池已满的情况下返回503。服务器返回503时可以提供一个Retry-After头。这个错误代码为 IIS 6.0 所专用。',
        504: ' - Gateway Timeout 网关超时，由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。（HTTP 1.1新） 。 ',
        505: ' - HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本。'
    }

    var Ajax = function(opt) {

        var data = opt.data;
        opt.dataType = opt.dataType || "json";

        if (!(opt.type == "post")) { //get请求加时间戳
            var t = new Date().getTime();
            if (typeof(opt.data) == 'string') {
                opt.data = opt.data + '&t=' + t; //字符串参数
            } else {
                $.extend(opt.data, {
                    t: t
                })
            }


        }
        /*针对于超时问题统一处理，页面刷新 by chenyiqi*/
        var success = opt.success;
        var error = opt.error || function(status, text) {
            alert(statusMap[status] + '\n\n参考信息：' + (text || 'N/A') + '\n\n')
        };
        var beforeSend = opt.beforeSend || function() {};
        opt.success = function(json) {
            if (json.errno == 302) {
                window.location.reload();
            } else {
                success(json);
            }
        };
        opt.beforeSend = function() {
            beforeSend();
        };
        opt.error = function(json) {
            // console.log(json)
            error(json.status, json.statusText);
            if (json.responseJSON && (json.responseJSON.errno == 302) && json.status == 302) {
                window.location.reload();
            }
        };
        opt.complete = function() {}
        this.ajax = $.ajax(opt);
    }
    $.extend(Ajax.prototype, {

        abort: function() {
            this.ajax.abort()
        },
        _init: function() {

        }
    })

})(window);