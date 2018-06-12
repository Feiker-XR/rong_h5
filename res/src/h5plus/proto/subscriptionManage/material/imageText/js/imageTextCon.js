//默认图片地址
var defaultImgUrl='images/imageTextMain.jpg';
//本地保存
var data=[{}];
//实例化编辑器
var ue = UE.getEditor('editor',{
	initialFrameWidth:'auto'
	,toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'seaFchreplace', 'help', 'drafts'
        ]]
	,initialFrameHeight:350
	,elementPathEnabled : false
	,maximumWords:20000
	,wordCountMsg:'{#count}/20000'
	,enableAutoSave: false
	,saveInterval: 5000000000000000000
});
ue.ready(function(){
	//编辑器增加添加正文、标题、作者、原文链接且样式有所修改
	var $body=$($('#ueditor_0')[0].contentWindow.document.body);
	$('#editor #edui1_toolbarbox').after('<div class="paddingLR60" data_id="toolMask"><div class="articleTit"><input placeholder="在这里输入图文标题" data_id="inputArticleTit"></div><div class="articleAuthor"><input placeholder="请输入图文作者" data_id="inputArticleAuthor"></div><div class="imageTextArticle"><span class="checkboxActive"><input type="checkbox" checked></span><label>添加正文</label></div></div>');
	$body.css({'padding':'14px 60px 0','margin':0,'color':'#999'});
	$('#edui1_bottombar').append('<div class="imageTextLink"><span class="checkboxActive"><input type="checkbox" checked></span><label>原文链接</label></div><div class="control-group row-fluid" data_id="inputLinkShow"><div class="controls"><input type="text" value="http://" data_id="inputLink"></div></div>').css('padding-bottom','15px');
	//设置编辑器工具栏是否可用
	$('#edui1_iframeholder').append('<p class="tips">在这里编写图文正文</p>');
	ue.setDisabled();
	$('div[data_id=toolMask]').click(function(){
		ue.setDisabled();
	});
	$body.click(function(){
		ue.setEnabled();
	});
	//多选框
	$('.imageTextArticle span').click(function(){
		if($(this).find('input').is(':checked')){
			$(this).addClass('checkboxActive');
			$('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').show();
			$('.imageTextArticle').css('border-bottom','1px solid #d2d3d4');
		}else if($('.imageTextLink span input').is(':checked')){
			$(this).removeClass('checkboxActive');
			$('#edui1_iframeholder,#edui1_elementpath,#edui1_wordcount').hide();
			$('.imageTextArticle').css('border-bottom','none');
		}else{
			//alert('添加正文和原文链接不可全部取消！');
			$.pnotify({
                        title: '提示',
                        type: 'info',
                        text: '添加正文和原文链接不可全部取消！'
                    });
			$(this).find('input').prop('checked',true);
		}
	});
	$('.imageTextLink span').click(function(){
		if($(this).find('input').is(':checked')){
			$(this).addClass('checkboxActive');
			$('div[data_id=inputLinkShow]').show();
		}else if($('.imageTextArticle span input').is(':checked')){
			$(this).removeClass('checkboxActive');
			$('div[data_id=inputLinkShow]').hide();
		}else{
			$.pnotify({
                        title: '提示',
                        type: 'info',
                        text: '添加正文和原文链接不可全部取消！'
                    });
			$(this).find('input').prop('checked',true);
		}
	});
	//左右同步更新
	$('input[data_id=inputArticleTit]').keyup(function(){
		if($('.liActive').index('.left li')==0){
			$('.liActive .imgeTextMainTit span').html($(this).val());
		}else{
			$('.liActive .imageTextSubTit').html($(this).val());
		}
	});
	//内容改变存入本地缓存
	$('input[data_id=inputArticleTit]').change(function(){
			var index=$('.liActive').index('.left ul li');
			data[index].title=$(this).val();
			console.log('title data->'+JSON.stringify(data));
	});
	$('input[data_id=inputArticleAuthor]').change(function(){
		var index=$('.liActive').index('.left ul li');
		data[index].author=$(this).val();
		console.log('author data->'+JSON.stringify(data));
	});
	$('input[data_id=inputLink]').change(function(){
		if($('.imageTextLink span input').is(':checked')){
			var index=$('.liActive').index('.left ul li');
			data[index].jump_url=$(this).val();
		}
		console.log('link data->'+JSON.stringify(data));
	});
	$('textarea[data_id=summaryImageText]').change(function(){
		var index=$('.liActive').index('.left ul li');
		data[index].summary=$(this).val();
		console.log('summary data->'+JSON.stringify(data));
	});
	$('input[data_id=fileImageText]').change(function(){
		var index=$('.liActive').index('.left ul li');
		data[index].image_url=$(this).attr('url');
		console.log('file data->'+JSON.stringify(data));
	});
	ue.addListener("blur", function (type, event) {
		var index=$('.liActive').index('.left ul li');
		var content=ue.getContent();
		if(content){
			data[index].content='';
			$('.tips').show();
		}else{
			data[index].content=ue.getContent();
		}
		console.log('content data->'+JSON.stringify(data));
	});
	ue.addListener("focus", function (type, event) {
		$('.tips').hide();
	})
	$('.tips').click(function(){
		$body.click();
	});
});
//第一个图文鼠标经过
$('.left ul li:first').hover(function(){
	if($('.left ul li').length!=1){
		$('.imageTextSubMask,.imageTextSubMaskCon',this).show();
	}
},function(){
	if($('.left ul li').length!=1){
		$('.imageTextSubMask,.imageTextSubMaskCon',this).hide();
	}
});
//滚动条
var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper',{useTransform:false});
}
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
//触发change
function changeTrigger(){
	if($(document.activeElement.outerHTML).attr('id')=='ueditor_0'){
		ue.trigger("blur");
	}else{
		$(document.activeElement).blur().change();
	}
}
//添加图文
$('.imageTextAdd').click(function(){
	changeTrigger();
	$('#edui1').find('input').val('');
	$('input[data_id=inputLink]').val('http://');
	$('textarea[data_id=summaryImageText]').val('');
	$('.tips').show();
	$('.left ul li').removeClass('liActive');
	if($('.left ul li').length>1){
		$('.left ul li:last .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
	}
	var $li=$('<li class="liActive"><a href="javascript:void(0);"><div class="paddingLeftLi"><div class="fr"><img src="images/imageTextSub.jpg" data_id="imageTextSub"></div><div class="imageTextSubTit">标题</div></div><div class="imageTextSubMask"></div><div class="imageTextSubMaskCon"><span class="imageTextUp"></span><span class="imageTextDel"></span></div></a></li>');
	$('.left ul').append($li);
	data.push({});
	myScroll.refresh();
});
//删除图文
$('.left ul').on('click','.imageTextDel',function(){
	changeTrigger();
	var $li=$(this).parents('li');
	var index=$li.index('.left ul li');
	data.splice(index,1);
	$li.remove();
	myScroll.refresh();
	return false;
	console.log('del data->'+JSON.stringify(data));
});
//编辑图文
$('.left ul').on('click','li',function(){
	changeTrigger();
	var index=$(this).index('.left ul li');
	$(this).addClass('liActive').siblings().removeClass('liActive');
	$('input[data_id=inputArticleTit]').val(data[index].title||'');
	$('input[data_id=inputArticleAuthor]').val(data[index].author||'');
	if(data[index].content){
		ue.setContent(data[index].content);
	}else{
		$('.tips').show();
	}
	$('input[data_id=inputLink]').val(data[index].jump_url||'http://');
	$('input[data_id=fileImageText]').prop('url',data[index].image_url||'');
	$('textarea[data_id=summaryImageText]').val(data[index].summary||'');
})
//移动图文
$('.left ul').on('click','.imageTextDown',function(){
	changeTrigger();
	var $li=$(this).parents('li');
	var index=$li.index('.left ul li');
	var temp=data[index];
	data[index]=data[index+1];
	data[index+1]=temp;
	if(index==0){
		$('.left ul li:eq(1)').click();
		$('.left ul li:eq(0) .imgeTextMainTit span').html(data[index].title||'');
		$('.left ul li:eq(0) img[data_id=imageTextMain]').prop('src',data[index].image_url||'images/imageTextMain.jpg');
		$('.left ul li:eq(1) .imageTextSubTit').html(data[index+1].title||'');
		$('.left ul li:eq(1) img[data_id=imageTextSub]').prop('src',data[index+1].image_url||'images/imageTextSub.jpg');
	}else if(index==$('.left ul li').length-2){
		$('.left ul li:eq('+(index+1)+')').after($li);
		$('.left ul li:eq('+(index+1)+')').click();
		$('.left ul li:eq('+($('.left ul li').length-2)+') .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
		$('.left ul li:last .imageTextSubMaskCon .imageTextDown').remove();
	}else{
		$('.left ul li:eq('+(index+1)+')').after($li);
		$('.left ul li:eq('+(index+1)+')').click();
	}
	return false;
	console.log('down data->'+JSON.stringify(data));
});
$('.left ul').on('click','.imageTextUp',function(){
	changeTrigger();
	var $li=$(this).parents('li');
	var index=$li.index('.left ul li');
	console.log('data:'+JSON.stringify(data));
	var temp=data[index];
	data[index]=data[index-1];
	data[index-1]=temp;
	console.log('data->'+JSON.stringify(data));
	if(index==1){
		$('.left ul li:eq(0)').click();
		$('.left ul li:eq(0) .imgeTextMainTit span').html(data[0].title);
		$('.left ul li:eq(0) img[data_id=imageTextMain]').prop('src',data[0].image_url||'images/imageTextMain.jpg');
		$('.left ul li:eq(1) .imageTextSubTit').html(data[index].title);
		$('.left ul li:eq(1) img[data_id=imageTextSub]').prop('src',data[index].image_url||'images/imageTextSub.jpg');
	}else if(index==$('.left ul li').length-1){
		$('.left ul li:eq('+(index-1)+')').before($li);
		$('.left ul li:eq('+(index-1)+')').click();
		$('.left ul li:eq('+($('.left ul li').length-2)+') .imageTextSubMaskCon').append('<span class="imageTextDown"></span>');
		$('.left ul li:last .imageTextSubMaskCon .imageTextDown').remove();
	}else{
		$('.left ul li:eq('+(index-1)+')').before($li);
		$('.left ul li:eq('+(index-1)+')').click();
	}
	return false;
	console.log('up data->'+JSON.stringify(data));
});
//刷新提示保存
window.onbeforeunload=function(){
	if(JSON.stringify(data[0])!='{}'){
		return "图文未保存，请点击下方的保存按钮进行保存！";
	}
}
//删除图片
$('span[data_id=imageDel]').click(function(){
	$(this).prev('img').prop('src',defaultImgUrl);
	$('.liActive img').prop('src',defaultImgUrl);
});