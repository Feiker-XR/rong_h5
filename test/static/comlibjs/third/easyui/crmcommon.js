/*$(document).ready(function(){  
    $(document).bind("contextmenu",function(e){   
          return true;   
    });
});*/
function openDialogL(did,dtitle) {
 	var dialogWidth = 560;
 	var dialogHeight = 550;
 	
	if(did == 'popTeamC' || did == 'popRole' || did == 'popTeamR'){
		dialogWidth = 580;
		dialogHeight = 380;
 	}
	
	$('#'+did).dialog({    
 	    title: dtitle,    
 	    width: dialogWidth,    
 	    height: dialogHeight,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

function openDialogM(did,dtitle) {
 	$('#'+did).dialog({    
 	    title: dtitle,    
 	    width: 520,    
 	    height: 550,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

function openDialogS(did,dtitle) {
	var dialogWidth = 400;
	var dialogHeight = 450;
	
	if(did == 'popSelectType' || did == 'sqepopSelectType'){
		dialogWidth = 420;
		dialogHeight = 380;
	}
	
	$('#'+did).dialog({    
 	    title: dtitle,
 	    top:10,
 	    width: dialogWidth,    
 	    height: dialogHeight,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

function openDialogSPALL(did,dtitle) {
 	$('#'+did).dialog({    
 	    title: dtitle,    
 	    width: 460,    
 	    height: 450,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

function openDialogW(did,dtitle) {
 	$('#'+did).dialog({    
 	    title: dtitle,    
 	    width: 600,    
 	    height: 350,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

function openDialogMin(did,dtitle) {
 	$('#'+did).dialog({    
 	    title: dtitle,    
 	    width: 300,    
 	    height: 250,    
 	    closed: false,    
 	    cache: false,    
 	    modal: true   
 	}); 
}

//二维码嵌入Logo  选择图片处理
var loadImageFile = (function () { 
var divId='';
var lastDivId='';
if (window.FileReader) {
	 var oPreviewImg = null, oFReader = new window.FileReader(),
	 rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

	 oFReader.onload = function (oFREvent) {

	 if (lastDivId != divId) {
		 var newPreview = document.getElementById(divId);
		 if (newPreview.lastChild && newPreview.lastChild.id == "logoImage") {
			 oPreviewImg = newPreview.lastChild;;
		 } else {
	    	 oPreviewImg = new Image();
	    	 oPreviewImg.style.width = (newPreview.offsetWidth).toString() + "px";
	    	 oPreviewImg.style.height = (newPreview.offsetHeight).toString() + "px";
	    	 newPreview.appendChild(oPreviewImg);
		 }
	 }
	 lastDivId = divId;
	 	 oPreviewImg.src = oFREvent.target.result;
	 };

	 return function (input,div,label,clear) {
		 $("#" + label).hide();
		 $("#" + div).show();
		 $("#" + clear).show();
		 divId = div;
	 var aFiles = document.getElementById(input).files;
	 if (aFiles.length === 0) { return; }
	 if (!rFilter.test(aFiles[0].type)) { alert("You must select a valid image file!"); return; }
	 oFReader.readAsDataURL(aFiles[0]);
	 };

} 
if (navigator.appName === "Microsoft Internet Explorer") {
	 return function (input,div,label,clear) {
	 alert(document.getElementById(input).value);
	 document.getElementById(div).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementById(input).value;
	 };
} 
})();

/** 
 * JQuery扩展方法，用户对JQuery EasyUI的DataGrid控件进行操作。 
 */  
$.fn.extend({  
    /** 
     * 修改DataGrid对象的默认大小，以适应页面宽度。 
     *  
     * @param heightMargin 
     *            高度对页内边距的距离。 
     * @param widthMargin 
     *            宽度对页内边距的距离。 
     * @param minHeight 
     *            最小高度。 
     * @param minWidth 
     *            最小宽度。 
     *  
     */  
	resizeDataGrid : function(heightMargin, widthMargin, minHeight, minWidth, type) {  
		if ($(this) !=null) {
			var subWidth=0;
			if (type == 'main') {
				subWidth = 7;
			} else {
				minWidth = minWidth - 17;
			}
	        var width = $(document.body).width() - widthMargin + subWidth;  
	        width = width < minWidth ? minWidth : width;  
	        $(this).datagrid('resize', {  
	            width : width  
	        });  
		}
    },
	resizeSerachPanel : function (widthMargin, minWidth) {
        var width = $(document.body).width()- widthMargin + 7;  
        width = width < minWidth ? minWidth : width;  
        $(this).panel('resize',{width:width}); 
	},
	resizeTabsPanel : function (widthMargin, minWidth) {
        var width = $(document.body).width()- widthMargin + 7;  
        width = width < minWidth ? minWidth : width;  
        $(this).tabs({
        	width:width
        });
        
        $(this).children('.tabs-panels').children('.panel').each(function(i,val){
        	$(val).css('width',width);
        	$(val).children('.panel-body').css('width',width);
        	$(val).children('.panel-body').children('.panel').css('width',width);
        	$(val).children('.panel-body').children('.panel').children('.datagrid-wrap').css('width',width-6);
        });
	},
    resizeCommonWidth : function(widthMargin, minWidth) {
        var width = $(document.body).width()- widthMargin + 7;  
        width = width < minWidth ? minWidth : width;  
        $(this).css('width',width);
    }
}); 

/**
 * 异常处理共通方法
 * @param _param
 */
function doCrmError(_param) {
	$.messager.alert('',_param.errMessage);
}

/**
 * 画面按钮显示与否   {"menuId":"${rolePrivilege.menuId}","showType":"${rolePrivilege.type}"}
 */
function crmCmnDisableBtn(btnList) {
	$.each(btnList, function(index, _btnid){
		var btnId = '#' + _btnid;
		// 该按钮无效
		//$(btnId).linkbutton('disable');
		$(btnId).hide();
	});
}

function itemInList(_item, _list){
	var haveFlg = false;
	$.each(_list, function(index, myItem){
		
		// 如果数组中包含的场合
		if (myItem == _item) {
			haveFlg = true;
			return false;
		}
	});
	
	return haveFlg;
}

function assertSessionTimeOut(XMLHttpRequest, textStatus) {
	// 通过XMLHttpRequest取得响应头，sessionstatus  
    var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");  
    if (sessionstatus == "timeout") {  
        // 这里怎么处理在你，这里跳转的登录页面  
        if(window.parent){
            window.parent.location.replace(XMLHttpRequest.getResponseHeader("redirectUrl")); 
        } else {
	        window.location.replace(XMLHttpRequest.getResponseHeader("redirectUrl"));  
	    } 
    }  
}

$(document).ready(function() {

	$.ajaxSetup({
		//发送请求前触发
		beforeSend: function (xhr, settings) {
			settings.url = rewriteUrl(settings.url);
		}
	})
	for (var i = 0;i < document.forms.length; i ++) {
		var oldSubmit;
		var form = document.forms[i];
		if(form != null && form != 'undefined'){
			form.action = rewriteUrl(form.action);
	        //备份submit函数
			form.oldSubmit = form.submit;
	        //覆盖submit函数以实现拦截
			form.submit = function (){
				this.action = rewriteUrl(this.action);
		        //掉原函数来提交
				this.oldSubmit();
			}
		}
	}
});

function rewriteUrl(url) {
	try {
		if (!jsessionid) {
			return url;
		}
		
		if (url.indexOf('jsessionid') >= 0) {
			return url;
		}
		
		var urlList = url.split("?");
		if (urlList.length == 1) {
			return url + jsessionid;
		} else {
			return urlList[0] + jsessionid + "?" + urlList[1];
		}
	} catch (e) {
		return url;
	}
}
