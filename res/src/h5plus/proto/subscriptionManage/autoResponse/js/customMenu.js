//遮罩的高度
$('.mask').height($(document).height());
//编辑区调用
KindEditor.ready(function(K) {
	window.editor = K.create('#editor_id',{
		items : [
			 'emoticons','link', 'unlink'
		],
		uploadJson:'',
		urlType:'domain',
		afterBlur:function(){
			this.sync();
		},
		afterCreate:function(){
			this.sync();
		},
		afterChange:function(){
			this.sync();
		}
	});
});
//确定取消
$('.save').click(function(){
	h5Plus.tips(1,'正确');
});
$('.release').click(function(){
	h5Plus.tips(0,'错误');
});
//设置回复规则
function addCustomMenu1(selector){
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu1Txt').val());
	});
}
$('#addCustomMenu1').click(function(){
	$('.addCustomMenu1Con').prop('title','新增回复规则');
	h5Plus.popbox('.addCustomMenu1Con',addCustomMenu1);
});
//编辑回复规则
function editCustomMenu1(selector){
	$(selector).find('.customMenu1Txt').val('1234');
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu1Txt').val());
	});
}
$('.customMenu1Edit').click(function(){
	$('.addCustomMenu1Con').prop('title','编辑回复规则');
	h5Plus.popbox('.addCustomMenu1Con',editCustomMenu1);
});
//删除回复规则
function delCustomMenu1(selector){
	$(selector).find('.certain').click(function(){
		alert('已删除！');
	});
}
$('.customMenu1Delete').click(function(){
	h5Plus.popbox('.delCustomMenu1Con',delCustomMenu1);
});
//选择编辑内容
$('#customMenuConChoose').change(function(){
	if($(this).val()=='text'){
		$('#textEidt').show();
		$('.link,.imageText').hide();
	}else if($(this).val()=='image'){
		$('.imageText').show();
		$('#textEidt,.link').hide();
	}else if ($(this).val()=='link') {
		$('.link').show();
		$('#textEidt,.imageText').hide();
	};
})
//选择内外部链接
$('.linkTit input[type=radio]').click(function(){
	if ($('#linkInner').is(':checked')) {
		$('.linkInnerCon').show();
		$('.linkOuterCon').hide();
	}else if($('#linkOuter').is(':checked')){
		$('.linkInnerCon').hide();
		$('.linkOuterCon').show();
	};
})
//选择图文取消
$('.imageTextShut,.imageTextChooseCancel').click(function(){
	$('.imageTextChoose').hide();
});
//选择图片
$('.imageTextAdd').click(function(){
	$('.imageTextChoose').show();
})
//选中图文
$('.imageTextChooseImg').click(function(){
	$(this).addClass('imageTextChooseActive').append('<div class="imageTextchooseIcon"></div>').siblings().removeClass('imageTextChooseActive').find('.imageTextchooseIcon').remove();
});
//选择图文确定
$('.imageTextChooseCertain').click(function(){
	var imageTextChooseActive=$('.imageTextChooseCon .imageTextChooseActive .imageTextchooseIcon').remove();
	imageTextChooseActive=$('.imageTextChooseCon .imageTextChooseActive').removeClass('imageTextChooseActive').prop('outerHTML');
	$('.imageText>.imageTextChooseImg').remove();
	$('.imageText').append(imageTextChooseActive);
	$('.imageTextChoose,.imageTextAdd').hide();
});
//重新选择图文
$('.imageText').on('click','.imageTextChooseImg',function(){
	$('.imageTextAdd').click();
});
//图文鼠标经过
$('.imageTextChooseImg').hover(function(){
	if(!$(this).hasClass('imageTextChooseActive')){
		$(this).addClass('imageTextChooseHover').siblings().removeClass('imageTextChooseHover');
	}
},function(){
	if(!$(this).hasClass('imageTextChooseActive')){
		$(this).removeClass('imageTextChooseHover');
	}
});
//添加关键词
function addkeyWord(selector){
	$(selector).find('.certain').click(function(){
		$('.keywordConTipWrap').append('<span class="keyword">'+$(selector).find('.keywordTxt').val()+'<span class="delKeyword"></span></span>');
	});
}
$('.addKeyword').click(function(){
	h5Plus.popbox('.addKeywordBox',addkeyWord);
});
//删除关键词
$('.keywordConTipWrap').on('click','.delKeyword',function(){
	$(this).parents('.keyword').remove();
});