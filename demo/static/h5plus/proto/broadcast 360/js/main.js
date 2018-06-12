var miaov = {};

miaov.init = function(){
	miaov.clickModal()//点击弹出层
}

window.onload=window.onresize=function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/16+'px';   
};

miaov.clickModal=function(){
	$('.tweet').click(function(){
		$(this).hide();
		$('.screen').show();
	})

	$('.screenBtn').click(function(){
		$('.screen').hide();
		$('.screenFans').show();
	})

	$('.closeBtn').click(function(){
		$('#radioModal').modal('hide');
	})

	// 第三层删选粉丝点击返回和确定
	$('.btnScreenFans>div').click(function(){
		$('.screen').show();
		$('.screenFans').hide();
		//调接口
	})

	// <!-- 第二层编辑推文 -->
	$('.btnScreen>div').click(function(){
		$('.tweet').show();
		$('.screen').hide();
		//调接口
	})

	$('.choiceBtn').click(function(){
		$('.teletext').show();
		$('.screen').hide();
	})

	// 第三层选择图文
	$('.btnTeletext>div').click(function(){
		$('.teletext').hide();
		$('.screen').show();
		//调接口
	})





	//图文内容选择
	$(function(){
          var oLength=$('.indexClass>li').length;
          $('.indexClass').css('width',oLength*148.75-63.75+'px');
        
          var x=0;
           

          $('.indexClassRight').click(function(){

            var w=446.25;
            x=x-(x%w)-w;
            move(1000);
          })

          $('.indexClassLeft').click(function(){
            var w=446.25;
            x=x-(x%w)+w;
            move(1000);
          })


          function move(time){
            var oWidth=$('.indexClassFather').width()-$('.indexClass').width();

            if(x>0){
                x=0;
              }else if(x<oWidth){
                x=oWidth;
              }

             if(time){
                $('.indexClass').animate({'left':x+'px'});
             }else{
                 $('.indexClass').css('left',x+'px');
             }
          }


          $('.indexClass li').click(function(){
          	$('.indexClass li').removeClass('active');
          	$(this).addClass('active');
          })

        })

	
}

$(function(){miaov.init()});