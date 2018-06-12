/*
 * @class res  无
 * @Description 图片剪切工具 组件
 * @singleton
 * @createTime 2016-03-18
 * @updateTime 2016-03-18
 * @author 韩充满
 * @version 1.0
 */


(function(win){
	var imgWidth=0;
	var imgHeight=0;
	var imgWidth=0;
	var imgHeight=0;
	var bgOpton=0;
	var recz=0;
	var image;
	function init(){
			var jcrop_api;
			// Grab some information about the preview pane
			$preview = $('#preview-pane'),
				$pcnt = $('#preview-pane .preview-container'),
				$pimg = $('#preview-pane .preview-container img'),

				xsize = $pcnt.width(),
				ysize = $pcnt.height();
				
			$('#target').Jcrop({
				bgOpacity: 0.5,
				bgColor: '#000000',
				addClass: 'jcrop-dark',
				onChange: updatePreview,
				onSelect: updatePreview,
				onRelease:onFunRelease,
				aspectRatio: 602/400,
				minSize:[150,100]
			},function(){
				// Use the API to get the real image size
				var bounds = this.getBounds();
				boundx = bounds[0];
				boundy = bounds[1];
				jcrop_api = this;
					jcrop_api.setSelect([176, 115, 176 + 250, 115 + 170]);
					jcrop_api.setOptions({
						bgFade: true//是否使用背景过渡效果
					});
			});
			
			function onFunRelease(obj){
//				jcrop_api.setOptions({
//					bgOpacity: 0.5,
//					bgColor: '#000000',
//					addClass: 'jcrop-dark',
//					onChange: updatePreview,
//					onSelect: updatePreview,
//					onRelease:onFunRelease,
//					aspectRatio: 602/400,
//					minSize:[150,100]
//				});
				recz= this.getBounds();
				bgOpton=  this.getOptions();
			};
//显示在右侧小视图窗口的方法
			function updatePreview(c)
			{
				if (parseInt(c.w) > 0)
				{
					var rx = xsize / c.w;
					var ry = ysize / c.h;
//					
					$pimg.css({
						width: Math.round(rx * boundx) + 'px',
						height: Math.round(ry * boundy) + 'px',
						marginLeft: '-' + Math.round(rx * c.x) + 'px',
						marginTop: '-' + Math.round(ry * c.y) + 'px'
					});
					imgWidth=Math.round(rx * boundx);
					imgHeight=Math.round(ry * boundy);
				}
			};
			$('#anim_buttons .btn-group').append(
//				create_btn('Bye!').click(function(e){
//					$(e.target).addClass('active');
//					jcrop_api.animateTo(
//						[300,200,300,200],
//						function(){
//							this.release();
//							$(e.target).closest('.btn-group').find('.active').removeClass('active');
//						}
//					);
//					return false;
//				})
			);
	}
//---------------------------------------------------------
	function imgload(obj){
		$("#target").attr("crossOrigin","Anonymous");
		var img = new Image();
      img.onload = function () {

        var iw =img.width; //img.width;
        var ih =img.height; //img.height;
        console.log(iw)

		if(iw>600 && ih>400){
				$.pnotify({
			            title: "添加图片",
			        	text: "'请选择宽高不超过600*400的图片'",
			            type: 'info',
			    delay: '5000'
			}); 
				    $(".ui-pnotify-history-container").hide();
//			alert('请选择宽高不超过600*400的图片')
			return
		}

		
		$("#target").attr("src",obj);init();
		$("#target").css({"display":"block","visibility":"visible"});
      };
      img.src = obj;

	}


	function swschImg(){

		var strIMg=document.getElementById("imgSave");
		var target=document.getElementById("target");
		$('#target').Jcrop({
			onChange: updatePreview,
			onSelect: updatePreview,
			onRelease:onFunRelease,
			aspectRatio: xsize / ysize,
			minSize:[xsize/2,ysize/2]
		},function(){
			// Use the API to get the real image size
			var bounds = this.getBounds();
			boundx = bounds[0];
			boundy = bounds[1];
			// Store the API in the jcrop_api variable
			jcrop_api = this;
			// Move the preview into the jcrop container for css positioning
			$preview.appendTo(jcrop_api.ui.holder);
		});
		function onFunRelease(obj){
			recz= this.getBounds();
			bgOpton=  this.getOptions();
		};

		function updatePreview(c)
		{
			if (parseInt(c.w) > 0)
			{
				var rx = xsize / c.w;
				var ry = ysize / c.h;

				$pimg.css({
					width: Math.round(rx * boundx) + 'px',
					height: Math.round(ry * boundy) + 'px',
					marginLeft: '-' + Math.round(rx * c.x) + 'px',
					marginTop: '-' + Math.round(ry * c.y) + 'px'
				});
				imgWidth=Math.round(rx * boundx);
				imgHeight=Math.round(ry * boundy);
			}
		};
	}


	/**
	 * 将以base64的图片url数据转换为Blob
	 * @param urlData
	 *            用url方式表示的base64图片数据
	 */
	function convertBase64UrlToBlob(urlData){

		var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

		//处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}

		return new Blob( [ab] , {type : 'image/png'});
	}


	function  postBinData(urlstr,imgs,suc, errfun,path,parame,uploading,id,beforeSend,completefun){
		//var urlStr=config.res.serAddr+path+"?",
		var urlStr=urlstr;
			fd = new FormData(),
			xhr = new XMLHttpRequest();
		var _this=this;
		fd.append("file",convertBase64UrlToBlob(imgs));
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if(suc instanceof Function){
					suc(xhr.responseText);
				}
			}
		}
		xhr.upload.onprogress = function(evt) {
			per = Math.floor(100 * evt.loaded /evt.total);
			if(uploading instanceof Function){
				uploading(per);
			}
		};
		xhr.open("post", urlStr);
		xhr.send(fd);
	}


	function saveImg(par,fun){
		//可视区域的宽度
		var widthStr= $(".jcrop-holder").children().css("width");
		var hightStr= $(".jcrop-holder").children().css("height");
		//可视区域左侧偏移距离
		var ofxStr=$(".jcrop-holder").children().css("left");//不需要
		var ofyStr=$(".jcrop-holder").children().css("top");//不需要
		var width= parseInt(widthStr);
		var height= parseInt(hightStr);
		var ofx=Math.abs(parseInt(ofxStr));
		var ofy= Math.abs(parseInt(ofyStr));
		var imgSrc=  $("#target")[0].src;
		var conterx =document.getElementById("canImg");
		var context = conterx.getContext('2d');
		var img= document.getElementById("target"); //var stesrs =$("#target");//new Image();  //img= document.getElementById("target")
		//img.crossOrigin = "Anonymous";
		img.onload = function(obj) {

		};
		img.onerror = function(obj) {
		};
		var image_=new Image();
		image_.src=imgSrc;
		//img.src = imgSrc;  //有这句会出问题
		//img.crossOrigin = "Anonymous";
		//img.crossoriginNew="anonymous use-credentials"
		var imgWidth= parseInt(image_.width);
		var imgHeight=parseInt(image_.height);
		var imgStyWidth= parseInt(img.style.width);
		var imgStyHeight= parseInt(img.style.height);
		var widthRatio=imgWidth/imgStyWidth;//要用原图的尺寸来计算
		var heightRatio=imgHeight/imgStyHeight;
		
		conterx.width =width*widthRatio;
		conterx.height = height*heightRatio;
		//image.crossOrigin = "*";
		//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		//剪切图像，并在画布上定位被剪切的部分：
		context.drawImage(img,ofx*widthRatio,ofy*heightRatio,width,height,0,0,width,height); //,0,0,width,height
		//context.drawImage(img,0,0,width,height,0,0,width,height);
		//image = conterx.toDataURL("image/png").replace("image/png", "image/octet-stream"); //存在图片跨域的问题
		image = conterx.toDataURL("image/png");//.replace("image/png", "image/octet-stream"); //存在图片跨域的问题
		par.topic_img_base64=image;
		if(fun!= undefined){
			fun(par);
		}
	}

	win.load=imgload;
	win.saveimg=saveImg;

})(window);
