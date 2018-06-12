var h5Plus={};
h5Plus.tips=function(label,tip){
	$('.tipsWrap').remove();
	var $tips=$('<div class="tipsWrap">'+
					'<div class="tips tipsSuccess">'+
						'<span class="tipsLabel"></span>'+
						'<span>'+tip+'</span>'+
					'</div>'+
				'</div>');
	if (label) {
		$tips.find('.tips').removeClass('tipsFail').addClass('tipsSuccess');
	}else{
		$tips.find('.tips').removeClass("tipsSuccess").addClass('tipsFail');
	};
	$('body').append($tips);
	$tips.fadeOut(4000);
};
h5Plus.popbox=function(selectorCon,callBackCertain){
	$('.popBox').remove();
	var $popBox=$('<div class="popBox">'+
					'<div class="popBoxTit">'+
						'<span id="title"></span>'+
						'<span class="shut">X</span>'+
					'</div>'+
					'<div class="popBoxConWrap">'+
						'<div class="popBoxCon">'+
						'</div>'+
						'<div class="popBoxBtnWrap">'+
							'<input type="button" value="确定" class="button certain">'+
							'<input type="button" value="取消" class="button cancel">'+
						'</div>'+
					'</div>'+
				'</div>');
	$popBox.find('#title').text($(selectorCon).prop('title'));
	$popBox.find('.popBoxCon').html($(selectorCon).html()).show().prop('class',$(selectorCon).prop('class'));
	$('.mask').show();
	$('body').append($popBox);
	$popBox.css('margin-top',-$popBox.height()/2+'px');
	$('.shut,.certain,.cancel').click(function(){
		$('.popBox').remove();
		$('.mask').hide();
	});
	callBackCertain($popBox);
}