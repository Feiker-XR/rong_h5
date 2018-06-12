//分页
var pageLength=10,page_num=5,page_current=1,pageFlag=0,page_size=20;
if(pageFlag==0){
	$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
	if(page_size!=0){
		pageShow(page_num,1,page_size);
	}else{
		$('.prev,.next').hide();
	}
	pageFlag=1;
}
$('ul[data_id=pageShow]').off().on('click','li:not(:first):not(:last):not(.active)',function(){
	page_current=$(this).text()-0;
	pageShow(page_num,page_current,page_size);
	$('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
});
$('.next').unbind('click').click(function(){
	page_current+=1;
	if(page_current>page_size){
		page_current=page_size;
		$('ul[data_id=pageShow] li:last').addClass('disabled');
	}else{
		$('ul[data_id=pageShow] li:last').removeClass('disabled');
	}
	pageShow(page_num,page_current,page_size);
});
$('.prev').unbind('click').click(function(){
	page_current-=1;
	if(page_current<1){
		page_current=1;
		$('ul[data_id=pageShow] li:first').addClass('disabled');
	}else{
		$('ul[data_id=pageShow] li:first').removeClass('disabled');
	}
	pageShow(page_num,page_current,page_size);
});
function pageShow(page_num,page_current,page_size){
	var page_end,page_range,page_start=1;
	if(page_size<=page_num){
		page_end=page_size;
	}else{
		page_range=Math.ceil(page_num/2)-1;
		page_end=page_current+page_range;
		if(page_end>page_num){
			if(page_end>page_size){
				page_end=page_size;
			}
			page_start=page_end-page_num+1;          
		}else{
			page_end=page_num;
			page_start=1;
		}   
	}
	var page='';
	for(var i=page_start;i<=page_end;i++){
			page+='<li><a href="javascript:void(0);">'+i+'</a></li>';
	}
	$('ul[data_id=pageShow] li').not(':last').not(':first').remove();
	$('ul[data_id=pageShow] li:first').after(page);
	if(page_current==1){
		$('ul[data_id=pageShow] li:first').addClass('disabled');
	}else{
		$('ul[data_id=pageShow] li:first').removeClass('disabled');
	}
	if(page_current==page_size){
		$('ul[data_id=pageShow] li:last').addClass('disabled');
	}else{
		$('ul[data_id=pageShow] li:last').removeClass('disabled');
	}
	$('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
}