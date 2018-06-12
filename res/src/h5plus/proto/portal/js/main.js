var miaov = {};

miaov.init = function(){

	miaov.resize(); //设置每一屏的高度和top值
	miaov.loading(); //loading
	
}

window.onload=window.onresize=function(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/16+'px';   
};


$(document).ready( miaov.init );

miaov.mousewheelOFF=true;

// loading
miaov.loading=function(){
	/*loading...*/
		(function(){
			var iNow = 0;
			var arr = [
			'./images/scene1/bj00.png',
			'./images/scene1/bj01.png',
			'./images/scene1/bj02.png',
			'./images/scene1/bobo.png',
			'./images/scene1/dotted.png',
			'./images/scene1/icon01.png',
			'./images/scene1/icon02.png',
			'./images/scene1/icon03.png',
			'./images/scene1/icon04.png',
			'./images/scene1/icon05.png',
			'./images/scene1/icon06.png',
			'./images/scene1/icon07.png',
			'./images/scene1/icon08.png',
			'./images/scene1/icon09.png',
			'./images/scene1/icon10.png',
			'./images/scene1/icon11.png',
			'./images/scene1/icon12.png',
			'./images/scene1/icon13.png',
			'./images/scene2/cloud01.png',
			'./images/scene2/cloud02.png',
			'./images/scene2/cloud03.png',
			'./images/scene2/icon02.png',
			'./images/scene2/icon03.png',
			'./images/scene2/icon04.png',
			'./images/scene2/icon05.png',
			'./images/scene2/icon06.png',
			'./images/scene2/icon07.png',
			'./images/scene2/icon08.png',
			'./images/scene3/bj00.png',
			'./images/scene3/icon01.png',
			'./images/scene3/icon02.png',
			'./images/scene3/icon03.png',
			'./images/scene3/icon04.png',
			'./images/scene4/bj01.png',
			'./images/scene4/icon01.png',
			'./images/scene4/icon02.png',
			'./images/scene4/icon03.png',
			'./images/scene4/icon04.png',
			'./images/scene4/icon05.png',
			'./images/scene4/icon06.png',
			'./images/scene4/icon07.png',
			'./images/scene4/icon08.png',
			'./images/scene4/icon09.png',
			'./images/scene4/icon10.png',
			'./images/scene4/icon11.png',
			'./images/scene4/icon12.png',
			'./images/scene4/icon13.png',
			'./images/scene4/icon14.png',
			'./images/scene4/icon15.png'
			];
			// for(var i=0;i<77;i++){
			// 	arr.push('http://www.zhinengshe.com/works/3525/img/'+i+'.jpg');
			// }
			var bBtn = true;
			var iNum = 0;
			var timer = null;
			var timer2 = null;
			timer = setInterval(function(){
				if(bBtn){
					$('#loadingMain .img1').animate({top:10},200);
					$('#loadingMain .img2').animate({top:10},200);
					$('#loadingMain .img3').animate({top:10},200);
					$('#loadingMain .img4').animate({top:10},200);
				}
				else{
					$('#loadingMain .img1').animate({top:5},200);
					$('#loadingMain .img2').animate({top:5},200);
					$('#loadingMain .img3').animate({top:5},200);
					$('#loadingMain .img4').animate({top:5},200);
				}
		
				bBtn = !bBtn;
				
			},200);
			
			timer2 = setInterval(function(){
				
				iNum-=15;

				$('#loadingMain .img2').css('transform','rotate('+ iNum +'deg)');
			},30);
			$.each(arr,function(i,elems){
				(function(i){
					var yImg = new Image();
					
					yImg.onload = function(){
						iNow++;
						
						var number = parseInt(iNow/arr.length * 100);
						$('#loadingMain .img4').html( number + '%');
						
						if(iNow== arr.length){
							clearInterval(timer);
							clearInterval(timer2);

							$('#loadingMain').hide();
							$('.wrapper').show();
							$('.navigation').show();
							miaov.loginAlert();

							setTimeout(function(){
								miaov.run1();   //运动1
							},1000)

							
						}
					};
					
					yImg.error = function(){
						$('#c1').css('display','none');
						$('#test2').css('display','block');
					};
					  
					yImg.src = elems;
				})(i);
			});	
		})();
		/*loadingEnd...*/
}

//登录注册	
miaov.loginAlert=function(){
	$('.navigation>.login').on('click',function(){
		$('.mask').show();
		$('.loginAlert').css({'WebkitTransform':'scale(1)','opacity':1,'zIndex':2});
	});
	$('.closeAlert').on('click',function(){
		$('.mask').hide();
		$('.loginAlert').css({'WebkitTransform':'scale(5)','opacity':0,'zIndex':-1});
	})
}

miaov.mousewheel=function(delta){
	
	var oldNum=$('.scene.active').index()+1;

	if(oldNum>5 || oldNum<1)return;

	if(!$('.scene.active').hasClass('oldActive'))return;

	if(delta > 0){
		//鼠标向上滑动
		if(oldNum <= 1)return;
		oldNum-=1;
		$('.scene.active').css({'top':$(window).height()});
	}else if(delta<0){
		if(oldNum == 5)return;
		if($('.scene.active').css('top') != '0px')return;
		oldNum+=1;
		//鼠标向下滑动
		$('.scene.active').removeClass('active').next().addClass('active').css({'top':0});
	}

	$('.scene.active').off().on('transitionend webkitTransitionend',function(){

		if(delta>0){
			$('.scene.active').removeClass('active').prev().addClass('active');
		}

		switch (oldNum)
			{
			case 1:
			  miaov.run1();   //运动1
			  break;
			case 2:
			  miaov.run2();   //运动2
			  break;
			case 3:
			  miaov.run3();   //运动3
			  break;
			case 4:
			  miaov.run4();   //运动4
			  break;
			case 5:
			  miaov.run5();   //运动5
			  break;
			}
	})
}


miaov.resize=function(){
	$('.scene').css({'height':$(window).height(),'top':$(window).height()});
	$('#loading').css('height',$(window).height());
	$('.scene.active').css({'top':0});

	$(window).resize(function(){
		$('.scene').css({'height':$(window).height(),'top':$(window).height()});
		$('.scene.active').css({'top':0});
	})

	$('.wrapper').off().on('mousewheel',function(ev,delta){
		miaov.mousewheel(delta);
	});
}
miaov.run1=function(){

	var n=0;

	$('.nav .icon>img').mouseover(function(){
		var className=$(this).parent().next().next().attr('class');
		var t = new TimelineMax();
		var index_=$(this).parents('li').index();

		$(this).addClass('bounceIn');

		t.to('.'+className,1,{opacity:1,onComplete:function(){
			$('.'+className).nextAll().addClass('a-bounce');
		}});

		$('.scene1').css('backgroundImage','url(./images/scene1/bj0'+index_+'.png)');
	});

	$('.nav .trigger').on('webkitAnimationEnd animationend',function(){
		n++;
		next();
	});

	if(!$('.scene1').hasClass('oldActive')){
		next();
	}
	

	function next(){
		$('.nav .icon>img').eq(n).mouseover();
	}

	$('.nav .triggerLast').on('webkitAnimationEnd animationend',function(){
		setTimeout(function(){
			$('.scene1').addClass('oldActive')
		},1000);
	});
	

	$('.nav .icon>img').on('webkitAnimationEnd animationend',function(){
		$(this).removeClass('bounceIn');
	});

}
miaov.run2=function(){
	$('.scene2 .content').addClass('active').on('animationend webkitAnimationEnd',function(){
		$('.scene2 .icon').addClass('active').on('webkitAnimationEnd animationend',function(){
			$('.scene2').find('div[class^=cloud]').addClass('active');
			setTimeout(function(){
				$('.scene2').addClass('oldActive')
			},1000);
		});
	});
}
miaov.run3=function(){
	$('.scene3 .wxgb360').addClass('active').on('animationend webkitAnimationEnd',function(){
		$('.scene3 .round01').addClass('active').on('animationend webkitAnimationEnd',function(){
			$('.scene3 .round02').addClass('active').on('animationend webkitAnimationEnd',function(){
				$('.scene3 .round03').addClass('active').on('animationend webkitAnimationEnd',function(){
					$('.scene3').find('div[class^=round]').addClass('activeRotate');
					$('.scene3 .wxgb360').addClass('activeyb');
					setTimeout(function(){
						$('.scene3').addClass('oldActive')
					},1000);
				});
			});
		})
	})
}
miaov.run4=function(){
		var $liChild = $('.scene4 .actives');

		$('.scene4 .earth').addClass('active');
		
		for(var i=0;i<$liChild.length;i++){
			(function(index){
				setTimeout(function(){
					$liChild.eq(index).removeClass('actives').css({'transform':'rotate(720deg)','opacity':'1'});
				},200*index);
			})(i);
		}

		setTimeout(function(){
			$('.scene4').addClass('oldActive');
		},3400)

		$liChild.eq(12).on('transitionend webkitTransitionend',function(){
			for(var i=0;i<$liChild.length;i++){
				(function(index){
					setTimeout(function(){
						$liChild.eq(index).addClass('flash');
					},2000*index);
				})(i);
			}
		})

		/*鼠标滑动取消闪烁效果*/
		$liChild.each(function(i,elem){
			$(elem).hover(function(){
				$(this).removeClass('flash');
			},function(){
				$(this).addClass('flash');
			})
		})
}

miaov.run5=function(){
	$('.scene5 .title').addClass('active');
	$('.scene5 .title').on('animationend webkitAnimationEnd',function(){
		$('.scene5 .topBottom').addClass('active').on('animationend webkitAnimationEnd',function(){
			$('.scene5').find('div[class^=icon]').each(function(i,elem){
				(function(index){
					setTimeout(function(){
						$(elem).addClass('actives');
					},index*200);
				})(i)

				$(elem).hover(function(){	
					var class_=$(this).attr('index');
					$(this).removeClass(class_).addClass(class_+'_');
				},function(){
					var class_=$(this).attr('index');
					$(this).addClass(class_).removeClass(class_+'_');
				})

			}) 

			setTimeout(function(){
				$('.scene5').addClass('oldActive');
			},3400)

		});
	})
}
