/* 
* @Date:   2016-02-15 19:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-23 18:58:57
*/
var RKC = {};
//old base
RKC.seaConfig = {
    base: $$r.rootUrl,
    alias: {
        "tips": $$r.rootUrl + '/comlibjs/module/tips/1.0.1/tips.js',
        "tips2": $$r.rootUrl + '/comlibjs/module/tips/1.0.2/tips.js',
        "underscore": $$r.rootUrl + '/comlibjs/module/underscore/underscore-min.js',
        "Handlebars": $$r.rootUrl + '/comlibjs/module/handlebars/handlebars-v2.0.0.js',
        "dot": $$r.rootUrl + '/comlibjs/module/dot/dot.js',
        "Dialog": $$r.rootUrl + '/comlibjs/module/dialog/1.0.1/dialog.js',
        "selectMultiple": $$r.rootUrl + '/comlibjs/module/selectMultiple/1.0.1/selectMultiple.js',
        "Validate": $$r.rootUrl + '/comlibjs/module/validate/1.0.1/validate.js',
        "Ajax": $$r.rootUrl + '/comlibjs/module/ajax/1.0.1/ajax.js',
        "moment": $$r.rootUrl + '/comlibjs/module/moment/moment.js',
        "datepicker": $$r.rootUrl + '/comlibjs/module/datetimepicker/datetimepicker.js',
        'json2': $$r.rootUrl + '/comlibjs/module/json2/json2.js',
        'selectarea': $$r.rootUrl + '/comlibjs/module/selectarea/1.0.1/selectarea.js',
        'colorpicker': $$r.rootUrl + '/comlibjs/module/colorpicker/1.0.1/colorpicker.js',
        'formsend': $$r.rootUrl + '/comlibjs/module/formsend/1.0.1/formsend.js',
        'pagination': $$r.rootUrl + '/comlibjs/module/pagination/1.0.1/pagination.js',
        'upload': $$r.rootUrl + '/comlibjs/module/upload/1.0.1/upload.js',
        'webUpload': $$r.rootUrl + '/comlibjs/module/upload/2/webuploader.js',
        'tag': $$r.rootUrl + '/comlibjs/module/tag/1.0.1/tag.js',
        'autocomplete': $$r.rootUrl + '/comlibjs/module/autocomplete/jquery.autocomplete.js',
        'tagComplete': $$r.rootUrl + '/comlibjs/module/tagComplete/tagComplete.js',
        'drawer': $$r.rootUrl + '/comlibjs/module/drawer/drawer.js',
        'dropdown': $$r.rootUrl + '/comlibjs/module/dropdown/dropdown.js',
        'allselect': $$r.rootUrl + '/comlibjs/module/allselect/allselect.js',
        'daterangepicker': $$r.rootUrl + '/comlibjs/module/daterangepicker/daterangepicker.js',
        'qrcode': $$r.rootUrl + '/comlibjs/module/qrcode/qrcode.js',
        'intervalMath': $$r.rootUrl + '/comlibjs/module/intervalMath/intervalMath.js',
        
        "jquery183": $$r.rootUrl + '/comlibjs/v3/js/jquery.min.js',
        "jstree": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.jstree.js',
        "migrate": $$r.rootUrl + '/comlibjs/v3/js/jquery-migrate-1.2.1.js',
        "uniform": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.uniform.min.js',
        "bootstrap_fileupload": $$r.rootUrl + '/comlibjs/v3/js/plugins/bootstrap-fileupload.min.js',
        "photon_select2": $$r.rootUrl + '/comlibjs/v3/js/plugins/select2.js',
        "tagsinput": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.tagsinput.min.js',
        "mousewheel": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.mousewheel.min.js',
        'pnotify': $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.pnotify.min.js',
        "mCustomScrollbar": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.mCustomScrollbar.js',
        "dataTables": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.dataTables.min.js',
        'socket':'http://h5plus.net/socket.io/socket.io.js',
        //'socket':'http://rush.ruixuesoft.com:3001/socket.io/socket.io.js',
        // 'h5sdk': $$r.rootUrl + '/comlibjs/mobile/h5PHPApiSdk1.00.js',
        // 'h5sdk': 'http://test.h5plus.net/frontend/js/h5sdk/1.00/h5sdk1.00.js',
        "jquery.cookie": $$r.rootUrl + '/comlibjs/v3/js/plugins/jquery.cookie.js',
        'h5sdk': 'http://h5plus.net/frontend/js/h5sdk/1.00/h5sdk1.00.js',
        'jweixin': $$r.rootUrl + '/comlibjs/mobile/jweixin-1.0.0.js',
        'portalAnim': $$r.rootUrl + '/comlibjs/v3/js/portal.anim.js',
        // third part
        "zTree": $$r.rootUrl + '/comlibjs/third/ztree/jquery.ztree.all-3.5.min.js',
        "zThide": $$r.rootUrl + '/comlibjs/third/ztree/jquery.ztree.exhide-3.5.min.js',
        "zclip": $$r.rootUrl + '/comlibjs/third/zclip/jquery.zclip.min.js',
        'iscroll': $$r.rootUrl + '/comlibjs/third/iscroll.js',
        'bootstrap': $$r.rootUrl + '/comlibjs/third/bootstrap/bootstrap.js',
        'highcharts': $$r.rootUrl + '/comlibjs/third/highcharts/highcharts.js',
        'easyui': $$r.rootUrl + '/comlibjs/third/easyui/jquery.easyui.min.js',
        'easyuiCN': $$r.rootUrl + '/comlibjs/third/easyui/easyui-lang-zh_CN.js',
        'crmcommon': $$r.rootUrl + '/comlibjs/third/easyui/crmcommon.js',
        'jqui': $$r.rootUrl + '/comlibjs/third/easyui/jquery-ui.min.js',
        'liMarquee': $$r.rootUrl + '/comlibjs/third/jquery/jquery.liMarquee.js',
        "Validate2": $$r.rootUrl + '/comlibjs/third/jquery/jquery.validate.js',
        'clipboard': $$r.rootUrl + '/comlibjs/third/original/clipboard.js',
        "sortable": $$r.rootUrl + '/comlibjs/third/jquery/jquery.sortable.js',
        "dropzone": $$r.rootUrl + '/comlibjs/third/jquery/dropzone.min.js',
        'areaSelect': $$r.rootUrl + '/comlibjs/third/areaselector/area.main.js',
        'mousewheel319': $$r.rootUrl + '/comlibjs/third/jquery/jquery.mousewheel.js',
        'TweenMax': $$r.rootUrl + '/comlibjs/third/TweenMax.js',
        'ueditoConfig': $$r.rootUrl + '/comlibjs/third/ueditor1_4_3_2-src/ueditor.config.js',
        'editorApi': $$r.rootUrl + '/comlibjs/third/ueditor1_4_3_2-src/_examples/editor_api.js',
        'editorZHCN': $$r.rootUrl + '/comlibjs/third/ueditor1_4_3_2-src/lang/zh-cn/zh-cn.js',
        'webuploader': $$r.rootUrl + '/comlibjs/third/ueditor1_4_3_2-src/third-party/webuploader/webuploader.js',
        'uploadermin': $$r.rootUrl + '/comlibjs/third/diyUpload/webuploader.html5only.min.js',
        'diyUpload': $$r.rootUrl + '/comlibjs/third/diyUpload/diyUpload.js',
	//微社区
		'swiper_min':$$r.rootUrl+'/comlibjs/third/swiper/swiper.min.js',
		'query_qrcode_min':$$r.rootUrl+'/comlibjs/third/qrcode/jquery.qrcode.min.js',
		'qrcode':$$r.rootUrl+'/comlibjs/third/qrcode/qrcode.js',
		'hammer_min':$$r.rootUrl+'/comlibjs/third/hammer/hammer.min.js',
		'mobilelable':$$r.rootUrl+'/comlibjs/third/hammer/mobilelable.js',
		'commoditylable':$$r.rootUrl+'/comlibjs/third/hammer/commoditylable.js',
		'jquery_Jcrop':$$r.rootUrl+'/comlibjs/third/jcrop/jquery.Jcrop.js',
		'jquery_color':$$r.rootUrl+'/comlibjs/third/jcrop/jquery.color.js',
		'imgedit':$$r.rootUrl+'/comlibjs/third/jcrop/imgedit.js',
		'jquery_pnotify_min':$$r.rootUrl+'/comlibjs/v3/js/plugins/jquery.pnotify.min.js',
    }
}
seajs.config(RKC.seaConfig);



// 全局命名空间
Rky = window.Rky || {};

RKC.mainSuffix = window.location.port === '1221'?'':'.html'


/**
 * [themeConfig description]
 * @type {Object}
 */
RKC.themes = ['Photon', 'Ace', 'Bootstrap', 'Metronic', 'Superadmin']
var isPto = /photon|dashboard/g.test(window.location.href),
    isEnroll = window.location.pathname=='/',
    isOldPortal = !1/*/jsessionid/g.test(window.location.href) */,
    ptoStr = isPto/*||window.location.pathname=='/'*/?'Photon':'';
RKC.themes.forEach(function (m, i) {
    if(ptoStr === m){
        var theme = 'the'+ m
        RKC.themeName = m.toLowerCase()
        RKC.themeConfig = {
            base : $$r.rootUrl,
            alias : {}
        }
        // RKC.themeConfig.alias[theme] = $$r.rootUrl + '/comlibjs/third/theme_' + RKC.themeName + '/js/config.js'
        var partialPath = '/comlibjs/v3/js/'
        RKC.themeConfig.alias = {
            "jquery183UI": $$r.rootUrl + partialPath + 'plugins/jquery-ui.min.js'
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
            // ,"additional-methods.min": $$r.rootUrl + partialPath + 'plugins/additional-methods.min.js'
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
        }
        seajs.config(RKC.themeConfig);
        // $.noConflict();
        // seajs.use([theme])
    }
})





/**
 *  配置项
 *
 */
;(function() {

    // 组件列表配置
    var aliasModuleList = [
        "upload:1.0.1:uploadify"                        // 上传组件
        ,"upload:1.0.1:upload:upload2"                  // 上传组件
        ,"dialog:1.0.1:dialog:dialog2"                  // 对话框
        ,"go:1.0.1:go:go2"                              // ajax
        ,"audio:1.0.1"                                  // 音频
        ,"muplayer:0.9.2"                               // 以seajs的方式重新封装了下百度音乐播放内核
        ,"muplayer:0.9.2:player"                        // 百度音乐播放内核
        ,"selection:1.0.1"                              // 下拉框联动组件
        ,"selector:1.0.1"                               // 模拟下拉框
        ,"calendar:1.0.1"                               // 日期组件
        ,"cutpicture:1.0.1"                             // 裁截图片
        ,"page:1.0.1"                                   // 分页
        ,"dropdown:1.0.1:dropdown:dropdown2"            // 下拉框
        ,"tips:1.0.1:tips:tips3"                        // 提示框
        ,"validation:1.0.1:validation:validation2"      // 表单验证
    ]
    // 扩展组件
     , aliasExtList = [
        // "formsend:1.0.1"
        ,"send:1.0.1"
    ]
    // 业务相关
     , aliasLeList = [
        "uploader:1.0.1"                                // 结合线上接口的上传组件
        ,"cut:1.0.1"                                    // 裁图组件
    ]

    // 默认静态资源的基础路径
      , defaultStaticPath = $$r.rootUrl + "/res/src"
    // 模块的文件夹
      , moduleFolder = "/comlibjs/"
    // 扩展模块的文件夹
      , extFolder = "/ext/"
    // 业务相关模块的文件夹
      , rkFolder = "/rk/"
    // 模块和扩展模块的路径模板
      , modulePathTpl = "{module}/js/{version}/{filename}.js"

      , staticPath = window.Rky && window.Rky.staticPath || window.staticPath || defaultStaticPath
    // 模块的路径
      , modulePath = staticPath + moduleFolder
    // 模块的路径
      , extPath = staticPath + extFolder
    // 模块的路径
      , rkPath = staticPath + rkFolder;

    // 配置项目的静态资源基础路径
    Rky.STATICPATH = staticPath;

    // 设置Sea.js 的配置 for mobile
    Rky.seaConfig2 = {

        // Sea.js 的基础路径
        base: modulePath
        
        // 别名配置
        ,alias: {}

        // 文件编码
        ,charset: 'utf-8'
    }
    Rky.seaConfig = Rky.seaConfig || {};
    Rky.seaConfig.alias = {};

    // set模块设置
    setAliasConfig(aliasModuleList, modulePath, Rky.seaConfig);
    setAliasConfig(aliasModuleList, modulePath, Rky.seaConfig2);
    // set扩展模块设置
    setAliasConfig(aliasExtList, extPath, Rky.seaConfig);
    setAliasConfig(aliasExtList, extPath, Rky.seaConfig2);
    // set业务相关模块的文件夹设置
    setAliasConfig(aliasLeList, rkPath, Rky.seaConfig);
    setAliasConfig(aliasLeList, rkPath, Rky.seaConfig2);

    // 设置
    seajs.config(Rky.seaConfig2);

    // 为兼容添加映射关系
    Rky.seaConfig.alias["upload"] = Rky.seaConfig.alias.upload2;
    Rky.seaConfig.alias["ajax"] = Rky.seaConfig.alias.ajax2;
    Rky.seaConfig.alias["dropdown"] = Rky.seaConfig.alias.dropdown2;
    Rky.seaConfig.alias["tips"] = Rky.seaConfig.alias.tips3;
    Rky.seaConfig.alias["validation"] = Rky.seaConfig.alias.validation2;
    Rky.seaConfig.alias["dialog"] = Rky.seaConfig.alias.dialog2;
    
    function setAliasConfig(data, path, configObj){
        $.each(data,function(index, item){
            if($.trim(item) == "") return true
            var items = item.split(":");
            var fullPath = path + modulePathTpl.replace(/{(\w+)}/g, function(a, b){
                if(b == "module"){
                    return items[0] || "";
                }else if(b == "filename"){
                    return items[2] || items[0] || "";
                }else{
                    return items[1] || "";
                }
            });

            configObj.alias[items[3] || items[2] || items[0] || ""] = fullPath;
        });
    }
})();









var $Rk = $rk = {
    // 记录所有通用url 比如上传 tag等
    url: {
        upload: '/uploadPicture'
    },
    //hash
    hash: {
        set: function(hashValue) {
            window.location.hash = hashValue;
        },
        get: function() {
            return window.location.hash.replace(/#/, '');
        }
    },
    extend: function(Sublass, BassClass) {
        var F = function() {};
        F.prototype = BassClass.prototype;
        Sublass.prototype = new F();
        Sublass.prototype.constructor = Sublass;
    },
    GUIDS: {},
    GUIDSNUM: 1,
    BassClass: function() {
        this.guid = $Rk.GUIDSNUM;
        $Rk.GUIDS[$Rk.GUIDSNUM] = this;
        $Rk.GUIDSNUM++;
    },

    reload: function() {
        setTimeout(function() {
            location.href = location.href;
        }, 1000)
    },
    //ajax成功code
    //
    //
    scode: 10000,
    /**
     * [parseTree 解析树为指定格式]
     * @param  {[type]} treedata [原始树的数据]
     * @param  {[type]} field    [根据指定字段返回新数据]
     * @param  {[boolen]} checked    [是否检测选中的]
     * @return {[type]}          [description]
     */
    parseTree: function(treedata, field, checked) {
        var T = treedata;
        var D = [];

        var fun = function(parent, data) {

            for (var key in field) {
                parent[key] = data[key];
            }
            setChild(parent, data);
        }
        var setChild = function(parent, data) {
            if (data.children) {
                parent.children = [];
                for (var j = 0; j < data.children.length; j++) {
                    var d = data.children[j];
                    if (checked) {
                        if (d.checked == true) {
                            var o = getChildData(d);
                            parent.children.push(o);
                            setChild(o, d);
                        }
                    } else {
                        var o = getChildData(d);
                        parent.children.push(o);
                        setChild(o, d);
                    }
                }
            }
        }
        var getChildData = function(data) {
            var o = {}
            for (var key in field) {
                o[key] = data[key];
            }

            return o
        }
        for (var i = 0; i < T.length; i++) {
            var itData = T[i];
            if (checked) {
                if (itData.checked == true) {
                    var level0 = {};
                    fun(level0, itData);
                    D.push(level0)
                }
            } else {
                var level0 = {};
                fun(level0, itData);
                D.push(level0)
            }
        }

        return D;
    },
    /**
     * 取url参数
     *
     */
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    /**
     * 取得所有参数
     * return json
     */
    getUrlAllParam: function() {
        var obj = {};
        var r = window.location.search.substr(1);
        if (r == '') return obj;
        var arr = r.split('&');
        for (var i = 0; i < arr.length; i++) {
            var t = arr[i].split('=');
            if (t[0] in obj) {

            } else {
                obj[t[0]] = decodeURIComponent(t[1]);
            }
        }
        return obj;
    },
    alertDialog: function(Dialog, t, time) {
        var dialog = new Dialog({
            title: '提示',
            content: t,
            isButton: false,
            width: 200
        })
        dialog.open();
        if (time) {
            setTimeout(function() {
                dialog.close()
            }, time)
        }
        return dialog;
    },
    /*
     * upload fileSize by zhangtonglai 添加上传文件返回文件大小 单位 MB KB
     */
    fileSize: function(size) {
        var str = '';
        if (size > 1024 * 1024) {
            str = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        } else {
            str = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
        }
        return str;
    },
    /**
     * [showDialogTip dialog提示 比如保存数据成功后,需要跳转到....]
     * @param  {[type]} Dialog [Dialog对象]
     * @param  {[type]} D      [数据]
     * @param  {[type]} content      [提示信息]
     * @return {[type]}        [description]
     */
    showDialogTip: function(Dialog, D, content) {
        var dialog = new Dialog({
            title: '操作信息',
            content: content || '操作成功,即将跳转到首页...',
            isButton: false,
            width: 200
        })
        dialog.open();
        setTimeout(function() {
            location.href = D.data.url || location.href;
        }, 500)
    },
    dataTotimestamp: function(datastring) {
        //时间转化为时间戳(秒)，2014/11/22 10:34:34 下午 to 1416666874
        var reg1 = /上午/g;
        var reg2 = /下午/g;
        var reg;
        var param = 0;
        if (reg2.test(datastring)) {
            param = 12;
            reg = reg2;
        } else if (reg1.test(datastring)) {
            reg = reg1;
        } else {
            reg = '';
            param = 12;
        }
        var tempStr = datastring.replace(reg, '');
        var tempStr, arr;
        if (tempStr.indexOf('-') != -1) {
            tempStr = tempStr.replace(/:/g, '-').replace(/\s/, '-');
            arr = tempStr.split('-');
        } else if (tempStr.indexOf('/') != -1) {
            tempStr = tempStr.replace(/:/g, '/').replace(/\s/, '/');
            arr = tempStr.split('/');

        }
        var minutes = new Date(Date.UTC(
            arr[0],
            arr[1] - 1,
            arr[2],
            arr[3] = parseInt(arr[3] - 8) + param,
            arr[4] || 0,
            arr[5] || 0
        ));
        return parseInt(minutes.getTime() / 1000);
    },
    getDateByFormat: function(sourceDate, format) {
        //sourceDate为 new Date(timestamp) timestamp为毫秒值
        var o = {
            "M+": sourceDate.getMonth() + 1, //月份
            "d+": sourceDate.getDate(), //日
            "h+": sourceDate.getHours() % 12 == 0 ? 12 : sourceDate.getHours() % 12, //小时
            "H+": sourceDate.getHours(), //小时
            "m+": sourceDate.getMinutes(), //分
            "s+": sourceDate.getSeconds(), //秒
            "q+": Math.floor((sourceDate.getMonth() + 3) / 3), //季度
            "S": sourceDate.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (sourceDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[sourceDate.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }

        return format;
    },
    ajaxSuccess: function(json) {
        if (json && json.errno === $rk.scode) {
            return true
        }
        return false;
    },
    ajaxFail: function(json, op, type) {
        var fail = function() {
            op.tip.close();
            op.button.removeClass('ui-button-disabled');
            op.button.removeClass('disabled');
        }
        if (type && type == 'alert') {
            fail();
            alert(json.error);
            return;
        }
        if (op.tip) {
            op.tip.setContent('<div class="ui-msg ui-msg-error">' + json.error + '</div>')
        }
        setTimeout(function() {
            fail();
        }, 1000)
    },
    zIndex: {
        highest: 100000
    },
    /**
     * [$rk.getJsonLen 算json格式对象 有多少个key  类似数组的length]
     * @param  {[Object]} json [JSON]
     * @return {[Number]}      [json的length]
     */
    getJsonLen: function(json) {
        var num = 0;
        for (var key in json) {
            num++
        }
        return num
    },
    encodeTextVal: function(str) {
        var reg = /\n/g;
        while (reg.test(str)) {
            str = str.replace(reg, "<br>");
        }
        return str;
    },
    decodeTextVal: function(str) {
        var reg = /<br>/g;
        while (reg.test(str)) {
            str = str.replace(reg, "\n");
        }
        return str;
    },
    html2Escape: function(sHtml) {
        return sHtml.replace(/<>/g, function(c) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;'
            }[c];
        });
    },
    //整体页面状态
    plat: {
        ready: function() {
            $('#j_plat').show();
            $('#j_plat_state').hide();
            $rk.listener.trigger('plat', 'ready', $$r.routers);
        },
        loading: function() {
            // $('#j_plat_state').html('<p class="ui-msg ui-msg-loading">页面初始化......</p>')
            if ($rk.hash.get()) {
                // alert($rk.hash.get())
                $rk.plat.ready();
                
            } else {
                $rk.plat.ready();
            }

        },

        init: function() {
            $rk.plat.loading(); //表示平台数据已经准备好了
            $rk.listener.on('plat', 'hash', function(act, hashData) {
                $rk.hash.set(hashData);
            });
        },
        /**
         * [模版渲染器: 通过监听html5 postMessage方式获取字符串模版]
         * @param  {Function} callback
         * @param  {[type]}   src      [需要获取字符串或对象的文件路径]
         */
        s : function(callback,src){
            // console.log("RKC:::",RKC.themeName)
            isEnroll && (RKC.themeName = 'login');
            src = src || $('#j_portal').get(0) ? 
                         $('#j_portal').attr('src').split('?v')[0].replace(/\.js$/,'.html').replace('common/index', RKC.themeName):
                         $('#j_js').get(0)? 
                         $('#j_js').attr('src').split('?v')[0].replace(/\.js$/,'.html'):'';
            
            $Rk.plat._createIFrame(src,function(){
                document.getElementById('j_iframe').contentWindow.postMessage('gethtml','*');
                window.addEventListener('message',function(e){
                    // right template
                    $('#j_p').html(e.data.html);
                    callback();
                    $Rk.plat.init();
                })
            })
        },
        /**
         * [创建 iframe]
         * @param  {[type]}   src      [iframe 路径]
         * @param  {Function} callback
         * @return {document.body}
         */
        _createIFrame : function(src,callback){
            var frm = document.createElement("iframe");
            
            frm.src = src;
            frm.id = 'j_iframe';
            frm.setAttribute('style',"width:0;height:0;border:0")
            frm.onload = function(){
                callback();
            }
            frm.onerror = function(){
            }

            // return document.body.appendChild(frm)
            $(document).ready(function(){ 
                $('body').append(frm)
            });
        },
        /**
         * [form表单数据转Object/JSON  eg: $.fn.serialize, $.fn.serializeArray]
         * @param  {[type]} form [description]
         * @return {[type]}      [description]
         */
        serializeObject : function(form) {
           var o = {},
               formObj = form.serializeArray();
           $.each(formObj, function() {
               if (o[this.name]) {    
                   if (!o[this.name].push) {    
                       o[this.name] = [o[this.name]]   
                   }
                   o[this.name].push(this.value || '')   
               } else {
                   o[this.name] = this.value || ''   
               }
           })
           return o
        },
        /**
         * [Dialog组件排版扩展]
         */
        dialogAlignExt : function(dom) {
          dom.parents('.ui-dialog').addClass('hide')
          setTimeout(function () {
            dom.parents('.ui-dialog').removeClass('hide')
            dom.parents('.ui-dialog').css({
              'margin-top':'auto',
              'margin-left':'auto',
               'transform': 'translate(-50%, -50%)',
               'top': '50%',
               'left': '50%',
               'margin': 'auto'
            })
          },200)
        }
    },

    plat2 : {
        /**
         * [创建script]
         * @param  {[type]}   src      [js 路径]
         * @param  {Function} callback
         * @return {document.body}
         */
        loadjs : function(src,callback, type){
            var js = document.createElement("script");
            js.type = type || "text/html";
            js.src = src;
            js.id = 'j_views';
            js.onload = function(){
                callback && callback();
            }
            return document.body.appendChild(js);
        },

        loadcss : function (src, callback) {
            var css = document.createElement('link')
            css.rel = 'stylesheet'
            css.type = 'text/css'
            css.href = src

            css.onload = function () {
                callback && callback()
            }
            return document.head.appendChild(css)
        }
    },
    openWindow: function(url) {
        if (window === window.top) {
            window.open(url)
        } else {
            parent.open(url)
        }
    }
};
/* sp表示单页面操作的统一管理对象 
     * D 存放常量
     * p 存放变量
     * _total 表示 Panel的数量
     * itemReady 表示每一个Panel 加载成功
     * ready 表示sp 所有的Panel 加载成功
     * 
*/   
$Rk.sp = {
    D: {},
    P: {},
    _total: 0,
    itemReady: function() {
        $Rk.sp._total++;
        if ($Rk.sp._total === $Rk.sp.total) {
            $Rk.sp.ready();
        }
    },
    ready: function(Ajax) {
        $rk.plat.init(Ajax);
    }
};
//平台
$Rk.BassPlat = function() {
    this._init(this);
}
$Rk.BassPlat.prototype = {}

//设置每个VC
$Rk.VC = function(op) {
    var that = this
    $.fn.extend&&$.fn.extend(that, op)||$.extend(that, op);
    $Rk.BassPlat.call(that);
}
$Rk.extend($Rk.VC, $Rk.BassPlat);
/**
 * [Panel op]  必须包含_container _init
 */

/* Panel 表示每一个单页面应用的每一个Panel  
     * Show 方法表示现实当前的Panel 
     * hide 方法表示隐藏当前的Panel
     * _container Panel容器  必填
     * _init 表示初始化方法  必填
*/ 
$Rk.Panel = function(op) {
    $Rk.BassClass.call(this);
    $.fn.extend(this, op);
    this._init(this);
}
$Rk.extend($Rk.Panel, $Rk.BassClass);
$Rk.Panel.prototype = {
    _setCurPanel: function() {
        $Rk.Panel.curPanelId = this.guid;
    },
    show: function() {

        if ($Rk.Panel.curPanelId == this.guid) {
            return
        } else {
            try {
                $Rk.GUIDS[$Rk.Panel.curPanelId].hide();
            } catch (e) {}

            this._setCurPanel();
            this._container.show();
        }
    },
    hide: function() {
        this._container.hide()
    }
}

//扩展方法
$Rk.ext = {
    up: {
        getItemHtml: function(opt) {

            var w = opt.img.css_w;
            var h = opt.img.css_h;
            var ww = opt.img.original_w;
            var hh = opt.img.original_h;
            var className = opt.img.className;
            if (className) {
                var html = [
                    '<div class="ui-up-item ' + className + '">',
                    '<div class="ui-up-text">' + ww + 'x' + hh + '</div>',
                    '<div class="ui-up-img" ></div>',
                    '<div class="ui-up-mask"></div>',
                    '<div class="ui-up-progress"><p></p></div>',
                    '</div>'
                ].join('');

            } else {
                var html = [
                    '<div class="ui-up-item"  style="width:' + w + 'px;height:' + h + 'px">',
                    '<div class="ui-up-text">' + ww + 'x' + hh + '</div>',
                    '<div class="ui-up-img" style="width:' + w + 'px;height:' + h + 'px"></div>',
                    '<div class="ui-up-mask"></div>',
                    '<div class="ui-up-progress"><p></p></div>',
                    '</div>'
                ].join('')
            }

            return html;
        },
        getUpDialogHtml: function(opt) {
            var w = opt.img.css_w;
            var h = opt.img.css_h;
            var ww = opt.img.original_w;
            var hh = opt.img.original_h;
            var html = [
                '<div style="height:300px">',
                '<div id="j_up_bt"></div>',
                '<div class="ui-up-box mt10">',
                '<div id="j_up_box" >' + $Rk.ext.up.getItemHtml(opt) + '</div>',
                '</div>',
                '<div class="tr mt10"><div class="rel">',
                '<input type="button" class="ui-button ui-button-disabled" value="确定" id="j_up_confirm" data-user-op="userConfirm"></div>',
                '<input type="button" class="ui-button j_op" value="取消" data-dialog-op="cancel" style="margin-left:10px" />',
                '</div>',
                '</div>'
            ].join('');
            return html;
        },
        setPic: function(op) {
            var box = op.upbox;
            var url = op.imgUrl;
            var img = '<img src="' + url + '"  />';
            box.find('.ui-up-img').html(img);
        },
        bindUpload: function(opt) {
            opt = opt || {};
            var Upload = opt.m.Upload;
            var w = opt.img.css_w;
            var h = opt.img.css_h;
            // var ww = opt.img.original_w;
            // var hh = opt.img.original_h;
            var up_box = opt.upbox;
            var upSuccess = opt.upSuccess || function() {};
            var beforeItemSend = opt.beforeItemSend || function() {};
            var extendData = opt.extendData || {};
            var setProgress = function(progress) {
                var p = parseInt(progress * 100) + '%';
                up_box.find('.ui-up-progress').show();
                up_box.find('.ui-up-progress p').width(p).html(p);
            }
            var fail = function() {
                up_box.find('.ui-up-progress p').html('上传失败');
            }
            var suc = function() {
                up_box.find('.ui-up-progress p').html('上传成功');
            }

            var up = new Upload({
                url: opt.upUrl,
                fileBox: opt.fileBox || $('#j_up_bt'),
                label: opt.label || '上传壁纸',
                progress: function(loaded, total, upkey) {
                    var progress = loaded / total;


                    if (progress == 1) {
                        progress = 0.99;

                    }
                    setProgress(progress);
                },
                beforeItemSend: function(key) {
                    beforeItemSend(key)
                },
                extendData: extendData,
                fileQueued: function(files) {

                    var callback = function(){
                        up_box.find('.ui-up-img').html('');
                        $('#j_up_confirm').addClass('ui-button-disabled');
                        up_box.find('.ui-up-progress').hide();
                        up_box.find('.ui-up-progress p').width('0')
                        //文件上传
                        up.send();
                    }
                    //限制图片宽高by lixiaofeng
                    if(opt.limitWidth && opt.limitHeight){
                        $.each(files, function(index, file){

                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function() {
                                $Rk.attemptAccessImg(this.result, {
                                    success:function(path, img){
                                        
                                        if(img.width == opt.limitWidth && img.height ==  opt.limitHeight) {
                                            callback();
                                            $('.upload_error').hide();
                                        }else {
                                            $('.upload_error').html('图片尺寸不正确').show();
                                        }
                                    }
                                })
                            }
                        });
                    }else{
                        callback();
                    }
                },

                successItem: function(json, upkey) {
                    $Rk.ext.up.setPic({
                        upbox: up_box,
                        imgUrl: json.data.thumbnail || json.data.url
                    })

                    $('#j_up_confirm').removeClass('ui-button-disabled');
                    $Rk.listener.trigger('ext.up', 'successItem', json)
                    upSuccess(json.data);
                    suc(1);
                    // console.log(json);
                    // alert('上传成功 通过json可以拿到数据')
                },
                failItem: function() {
                    fail();
                },
                //文件类型
                accept: {
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }

            });
        }
    }
}

$Rk.ext.ajaxDialog = function() {}
$Rk.ext.upDialog = {
    _data: {
        thumbnail: ''
    },
    reset: function() {

    },

    init: function(opt) {
        var tip = null;
        var Dialog = opt.m.Dialog;
        var Tips = opt.m.Tips;
        var Go = opt.m.Go;
        //当前页面的 上传窗口
        var dialog = new Dialog({
            title: opt.title || '',
            content: $Rk.ext.up.getUpDialogHtml(opt),
            width: 600,
            isButton: false,
            closeFun: function() {},
            // model: 'hide',
            userConfirm: function(dom) {
                if (dom.hasClass('ui-button-disabled')) {
                    return false
                } else {
                    var data = $.extend(opt.data, {
                        thumbnail: $Rk.ext.upDialog._data.thumbnail
                    })

                    new Ajax({
                        url: opt.confirmUrl,
                        data: data,
                        type: 'post',
                        success: function(json) {
                            if ($rk.ajaxSuccess(json)) {
                                tip.setContent('<div class="ui-msg ui-msg-suc">提交成功</div>');

                                setTimeout(function() {
                                    dialog.close();
                                    tip.hide();
                                    opt.callback($Rk.ext.upDialog._data.thumbnail)
                                }, 500)
                            } else {
                                $rk.ajaxFail(json, {
                                    button: dom,
                                    tip: tip
                                })
                            }
                        },
                        beforeSend: function() {
                            dom.addClass('ui-button-disabled')
                            tip = new Tips({
                                button: dom,
                                content: '<div class="ui-msg ui-msg-loading">提交中</div>'
                            })
                            tip.show();
                        },
                        dataType: 'json'
                    })
                }
            },
            afterOpen: function(me) {
                opt.upbox = $('#j_up_box');
                $Rk.ext.up.bindUpload(opt)
            }
        })
        dialog.open();



    }

}

//静态方法
$Rk.Panel.curPanelId = -1;

/**
 * [封装模版引擎]
 * @dot  {[dot]} dot : dot 对象
 * @param  {[string]} html : 模版
 * @param  {[type]} opt : 模版数据
 * @return {[type]}
 */
$Rk.tplRender = function(dot, tpl, opt) {
    var tempFn = dot.template(tpl);
    var html = tempFn(opt);
    return html;
};



/**
 * [side navigator]
 * @return {undefined}
 */
seajs.use(['Ajax', 'dot'], function (Ajax, dot) {
    
// void function () {
    // var sideNavUrl = $$r.routers.data.link.sideNav;
    var sideNavUrl = /*$$r.test +*/ '/auth-portal/api/?method=' + 'ruixue.hfive.portal.menu.tree';
    var logoutUrl = $$r.test + '/auth-portal/logout'
    var pathUserInfoUrl = $$r.test + '/auth-portal/userinfo'
    var BackEndResponse = function (res) {
                            var errorInfo = window.confirm(res)
                            if(errorInfo){
                                window.location.href = window.location.origin
                            }
                        }
    // var pathUserInfoUrl = $$r.pathUserInfo
    var dataRender = function () {

            this.init = function () {
                new Ajax({
                    url: sideNavUrl,
                    type : 'post',
                    dataType: 'json',
                    xhrFields: { withCredentials : true },
                    success: function(json) {
                        
                        // if (json && (json.error_response||json.code==500) || !json.success) {
                        if (json.code && json.code!=0 || ('success' in json)&&!json.success) {
                            json.error_response && json.error_response.msg && BackEndResponse(json.error_response.msg)
                            ;(json.code==500) && BackEndResponse(json.msg)
                            // window.location.href = window.location.origin
                            return
                        };

                        // if (json && json.errno === 10000 && json.data) {
                            
                        domRender(json.data, ['leftNav'])

                        // } else {
                        //     alert("您当前没有系统使用权限，请联系管理员为您开通所需权限")
                        // }
                    },
                    beforeSend: function() {

                    }
                });
            }
            this.init()
        },

        domRender = function (data, domArr) {
            var classes = ["home", "list_nested", "chart_alt", "book_alt2", "book_alt3", "hash", "new_window", "map_pin_stroke", "book_alt", "bolt", "info", "key_stroke", "loger_out"];

            data&&data.forEach(function (m, i) {
                m.class = classes[i]
            })
            // logform
                var logoutFunc = function () {
                    var logForm = function () {
                        this.logout = function (url, callback) {
                            $.ajax({
                                url : url,
                                type : 'post',
                                dataType: 'json',
                                xhrFields: { withCredentials : true },
                                success:function (json) {
                                    // console.log(json)
                                    
                                    if (json && (json.error_response||json.code==500)) {
                                        json.error_response && json.error_response.msg && BackEndResponse(json.error_response.msg)
                                        ;(json.code==500) && BackEndResponse(json.msg)
                                        // window.location.href = window.location.origin
                                        return
                                    };
                                    callback && callback()
                                },
                                error:function () {
                                    console.log(arguments)
                                }
                            })
                        }
                        this.userInfo = function (url) {
                            RKC.ajaxUserInfo = $.ajax({
                                url : url,
                                type : 'post',
                                dataType: 'json',
                                xhrFields: { withCredentials : true },
                                success:function (json) {
                                    // console.log(json)
                                    RKC.userinfo = json
                                    if (json && (json.error_response||json.code==500)) {
                                        json.error_response && json.error_response.msg && BackEndResponse(json.error_response.msg)
                                        ;(json.code==500) && BackEndResponse(json.msg)
                                        // window.location.href = window.location.origin
                                        return
                                    };
                                },
                                error:function () {
                                    console.log(arguments)
                                }
                            })
                        }
                    },
                    lf = new logForm;
                    lf.userInfo(pathUserInfoUrl)
                    $('#sideNav .nav-logout a').on('click', function () {
                        lf.logout(logoutUrl, function () {
                            window.location.href = window.location.origin
                        })
                    })
                }

            // domArr.forEach(function (m ,i) {
                    RKC.ajaxMenuTree = $.ajax({
                        url : $$r.rootUrl +'/h5plus/js/_g/sidenav.tpl',
                        success:function (htm) {
                            var m = domArr[0],
                                cont = '#'+m,
                                html = $rk.tplRender(dot, htm, data || {}) || '';
                            var dup = setInterval(function () {
                                var container = $(cont)
                                // console.count('container:')
                                if(html && container.length){
                                    clearInterval(dup)
                                    container.append(html)
                                    logoutFunc()
                                }
                            },100)
                        },
                        error:function (argument) {
                            console.log(arguments)
                        }
                    })

        };

    // window.location.origin + '/portal/menu?t=' + (+new Date)
    if (!isEnroll && !isOldPortal) {
        new dataRender()
    };
    // domRender({}, ['topRight','contTitle'])
// }();
});



/**
 * 全局广播通知;
 * 严格的区分了频道与事件的概念
 * @example
 * A模块内监听'com.myTest'频道下的say事件
 * $rk.listener.on('com.myTest', 'say', function(d){alert(d);});
 *
 * B模块内触发'com.myTest'频道下的say事件
 * $rk.listener.trigger('com.myTest', 'say', 'Hello World!');
 */
;(function() {
    var EXECTIME = 50, //连续执行时间，防止密集运算
        DELAY = 25;

    var that = {},
        timer = '',
        slice = [].slice,
        channelList = {}; //用于保存被注册过所有频道
    /**
     * 通知监听
     * @param {String} channel 频道名
     * @param {String} type 事件类型
     * @param {Function} callback 事件响应
     * @param {Object} context 上下文环境
     */
    var on = function(channel, type, callback, context) {
        var curChannel = channelList[channel];
        if (!curChannel) {
            curChannel = channelList[channel] = {};
        }
        curChannel[type] = curChannel[type] || [];
        curChannel[type].push({
            'func': callback,
            'context': context || that
        });
    };

    /**
     * 通知监听, 执行一次后销毁
     * @param  {[type]}   channel  [description]
     * @param  {[type]}   type     [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   context  [description]
     * @return {[type]}            [description]
     */
    var once = function(channel, type, callback, context) {
        var _once = function() {
            that.off(channel, type, _once);
            return callback.apply(context || that, arguments);
        };
        on(channel, type, _once, context);
    };

    /**
     * 事件触发
     * @param {String} channel
     * @param {String} type
     * @param {Object} data 要传递给相应函数的实参
     */
    var trigger = function(channel, type, data) {
        if (channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
            var taskList = channelList[channel][type];
            var curHandlers = [];
            for (var i = taskList.length; i--;) {
                curHandlers.push({
                    'handler': taskList[i],
                    'args': slice.call(arguments, 1)
                });
            }
            (function() {
                var start = +new Date();
                do {
                    var curTask = curHandlers.shift(),
                        handler = curTask.handler;
                    try {
                        handler.func.apply(handler.context, curTask.args);
                    } catch (exp) {}
                } while (curHandlers.length && (+new Date() - start < EXECTIME));
                if (curHandlers.length > 0) {
                    setTimeout(arguments.callee, DELAY);
                }
            })();
        }
    };

    /**
     * 事件监听移除
     * @param {String} channel 频道名
     * @param {String} type 事件类型
     * @param {Function} callback 要移除的事件响应函数句柄
     */
    var off = function(channel, type, callback, context) {
        context = context || that;
        if (channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
            var taskList = channelList[channel][type];
            var handler;
            for (var i = taskList.length; i--;) {
                handler = taskList[i];
                if (handler.func === callback && handler.context === context) {
                    taskList.splice(i, 1);
                }
            }
        }
    };

    that.on = on;
    that.once = once;
    that.trigger = trigger;
    that.off = off;

    $Rk.listener = $Rk.listener || that;
})();



/**
 * 埋点代码
 */
(function(para) {
  var p = para.sdk_url,
    n = para.name,
    w = this,
    d = w.document,
    s = 'script',
    x = null,
    y = null;
  w['bassdk201603'] = n;
  w[n] = w[n] || function(a) {
    return function() {
      (w[n]._q = w[n]._q || []).push([a, arguments]);
    }
  };
  var ifs = ['track', 'quick', 'register', 'registerOnce', 'registerSession', 'registerSessionOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'userIdentify'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    y.parentNode.insertBefore(x, y);
    w[n]._t = 1 * new Date();
    w[n].para = para;
  }
})({
  sdk_url: 'http://bas.ruixuesoft.com/sdk/bas-data.1.0.0.js',
  name: 'bas',
  server_url: 'http://monitor.ruixuesoft.com/monitor/services/monitor/send',
  topic_u: 'h5plus_user',
  topic_e: 'h5plus_event'
});


/**
 * Bas埋点常用API使用说明：
 * 注册用户（登录场景同样适用）场景：
 *  //userId为注册完成后生成的用户Id
 *  //bas.trackSignup是为了更新以前只有cookie_id的数据，将其对应的userId补全
    bas.trackSignup(userId, 'signUp', {
        ReferrerUrl: document.referrer,
        FromUrl: '',
        userName: userInfo.userName,
        companyName: userInfo.companyName,
        telephone: userInfo.tel,
        email: userInfo.email
    });
    //bas.userIdentify是为了将本地的cookie_id赋值为userId。
    bas.userIdentify(userId, true);

    
    topic设置为**_user，是为了收集注册用户的数据
    properties.topic = 'bas_rongcapital_users';
    bas.track('signUp', properties);
      
 */

;
(function() {
  var bas = window.bas || {};
  bas.__events = {

    ViewScreenPage: {
      begin: function(index) {
        this.beginDate = new Date();
        this.stayposition = index;
      },
      end: function() {
        this.endDate = new Date();
        this.stayposition = this.stayposition || 0;
        this.stayTime = (this.endDate.getTime() - this.beginDate.getTime()) / 1000;
        bas.track('ViewScreenPage', {
          staytime: this.stayTime,
          stayposition: this.stayposition
        })
      }
    },
    ViewHomePage: {
      startTime: new Date(),
      track: function() {
        this.endDate = new Date();
        this.pageloadingtime = (this.endDate.getTime() - this.startTime.getTime()) / 1000;
        bas.track('ViewHomePage', {
          pageloadingtime: this.pageloadingtime
        })
      }
    },
    RegistUserButtonClick: {
      track: function(userInfo) {
        bas.track('RegistUserButtonClick', {})
      }
    },
    signup: {
      track: function(userInfo) {
        var propertys = {
          topic: 'h5plus_user',
          $id: userInfo.userId || userInfo.tel,
          $name: userInfo.name||'',
          $province: userInfo.province||'',
          $city: userInfo.city||'',
          telephone: userInfo.tel||'',
          simple_name: userInfo.simple_name||'',
          email: userInfo.email||''
        };
        bas.track('ComplateButtonClick', propertys);
        bas.trackSignup(propertys.$id, 'ComplateButtonClick', {});
        bas.userIdentify(propertys.$id, true);
      }
    }
  }
})();