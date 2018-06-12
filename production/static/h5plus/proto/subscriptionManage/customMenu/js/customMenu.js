//遮罩的高度
$('.mask').height($(document).height());
//介绍编辑区调用
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
//设置一级菜单
function addCustomMenu1(selector){
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu1Txt').val());
	});
}
$('#addCustomMenu1').click(function(){
	$('.addCustomMenu1Con').prop('title','添加一级菜单');
	h5Plus.popbox('.addCustomMenu1Con',addCustomMenu1);
});
//编辑一级菜单
function editCustomMenu1(selector){
	$(selector).find('.customMenu1Txt').val('1234');
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu1Txt').val());
	});
}
$('.customMenu1Edit').click(function(){
	$('.addCustomMenu1Con').prop('title','编辑一级菜单');
	h5Plus.popbox('.addCustomMenu1Con',editCustomMenu1);
});
//设置二级菜单
function addCustomMenu2(selector){
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu2Txt').val());
	});
}
function addCustomMenu2Tip(selector){
	$(selector).find('.certain').click(function(){
		h5Plus.popbox('.addCustomMenu2Con',addCustomMenu2);
	});
}
$('.customMenu2Add').click(function(){
	$('.addCustomMenu2Con').prop('title','添加二级菜单');
	if ($(this).parents('li').find('ul').length) {
		h5Plus.popbox('.addCustomMenu2Con',addCustomMenu2);
	}else{
		h5Plus.popbox('.addCustomMenu2ConTip',addCustomMenu2Tip);
	}
});
//编辑二级菜单
function editCustomMenu2(selector){
	$(selector).find('.customMenu2Txt').val('5678');
	$(selector).find('.certain').click(function(){
		alert($(selector).find('.customMenu2Txt').val());
	});
}
$('.customMenu2Edit').click(function(){
	$('.addCustomMenu2Con').prop('title','编辑二级菜单');
	h5Plus.popbox('.addCustomMenu2Con',editCustomMenu2);
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