;define(function(require, exports, module){

var portalAnimClass = function () {

	this.animInit = function () {
		var miaov = {};

		miaov.init = function(){

			miaov.resize(); //设置每一屏的高度和top值
			miaov.loading(); //loading
			miaov.indexTabClick();
		}
		miaov.mousewheelOFF=true;
		miaov.oldNow=0;
		bas.__events.ViewScreenPage.begin(0);
		// loading
		miaov.loading=function(){
			/*loading...*/
				(function(){
					var iNow = 0;
					var arr = [
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/bj00.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/bj01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/bj02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/bobo.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/dotted.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon03.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon04.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon05.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon06.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon07.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon08.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon09.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon10.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon11.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon12.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene1/icon13.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/cloud01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/cloud02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/cloud03.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon03.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon04.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon05.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon06.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon07.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene2/icon08.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene3/bj00.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene3/icon01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene3/icon02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene3/icon03.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene3/icon04.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/bj01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon01.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon02.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon03.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon04.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon05.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon06.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon07.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon08.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon09.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon10.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon11.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon12.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon13.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon14.png',
					$$r.rootUrl + '/h5plus/img/portalAnim/scene4/icon15.png'
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

		// 右侧选项卡
		
		miaov.indexTab=function(index){
			$('.indexTab img').attr('src',$$r.rootUrl + '/h5plus/img/portalAnim/scene5/noSelect.png');
			$('.indexTab img').eq(index).attr('src',$$r.rootUrl + '/h5plus/img/portalAnim/scene5/select.png');
		}

		miaov.indexTabClick=function(){
			$('.indexTab li').off().click(function(){
				miaov.animate($(this).index());
			})
		}

		//登录注册	
		miaov.loginAlert=function(){
			//注册
			$('.navigation>.login, .navigation>.register').on('click',function(){
				var that = $(this)
				
				$('.loginAlert').css({'zIndex':999991})
				$.when($('.loginAlert').css({'opacity':1})).then(function () {
					$('.loginAlert').css({
						'WebkitTransform':'scale(1)',
						'MozTransform':'scale(1)',
						'MsTransform':'scale(1)',
						'transform':'scale(1)'
					})
					$('.mask').show(400);
				})
				// $('.loginAlert').html($('#contAll').html())
				$.when($('.loginAlert').append($('#contAll'))).then(function () {
					$('body .form-centering-wrapper input').val('')
					// $('.form-window-login').addClass('flip-h')
		   //          $('.form-window-login-logo.back').removeClass('hide')
		   //          $('.form-window-login-logo.forget').addClass('hide')
		            $('.reg2, .reg3').fadeOut('fast',function () {
		                $('.start-reg').fadeIn('fast')
		            })
				})

				$('#contAll').show()

				setTimeout(function () {
					if(that.hasClass('register')){
						$('.form-window-login').addClass('flip-h')
			            $('.form-window-login-logo.back').removeClass('hide')
			            $('.form-window-login-logo.forget').addClass('hide')

			            //注册启动埋码
			            bas.__events.RegistUserButtonClick.track();
					}else{
						$('.form-window-login').removeClass('flip-h')
					}
				},500)
			});
			$('.closeAlert').on('click',function(){
				$('.mask').hide();
				$('.loginAlert').css({
					'WebkitTransform':'scale(5)',
					'MozTransform':'scale(5)',
					'MsTransform':'scale(5)',
					'transform':'scale(5)',
					'opacity':0,'zIndex':-1
				});
			})
		}

		miaov.animate=function(index){

			// console.log(index);

			if(index<0 || index>4)return;

			if(!miaov.mousewheelOFF)return;

			miaov.mousewheelOFF=false;

			var $active=$('.scene.active');

			miaov.oldNow=$active.index();

			//滚屏埋码
			bas.__events.ViewScreenPage.end(miaov.oldNow);
			bas.__events.ViewScreenPage.begin(index);

			if(index>miaov.oldNow){
				//鼠标向上滑动
				$('.wrapper .scene').eq(index).addClass('active');
				$active.removeClass('active').css('top',-$(window).height());

			}else if(index<miaov.oldNow){
				//鼠标向下滑动
				$('.wrapper .scene').eq(index).addClass('active');
				$active.removeClass('active').css('top',$(window).height());
			}

			$active.prevAll().css('top',-$(window).height());
			$active.nextAll().css('top',$(window).height());

			$('.scene.active').css('top','0px');

			// console.log($('.scene.active').get(0));

			$('.scene.active').off().on('transitionend webkitTransitionend',function(){
				miaov.indexTab($('.scene.active').index());
				switch ($('.scene.active').index())
					{
					case 0:
					  miaov.run1();   //运动1
					  break;
					case 1:
					  miaov.run2();   //运动2
					  break;
					case 2:
					  miaov.run3();   //运动3
					  break;
					case 3:
					  miaov.run4();   //运动4
					  break;
					case 4:
					  miaov.run5();   //运动5
					  break;
					}	
			})

			setTimeout(function(){
				miaov.mousewheelOFF=true;
			},2000);
		}



		miaov.mousewheel=function(delta){
			if(delta > 0){	
				miaov.animate($('.scene.active').index()-1);
			}else if(delta < 0){
				miaov.animate($('.scene.active').index()+1);
			}
		}


		miaov.resize=function(){
			$('.scene').css({'height':$(window).height(),'top':$(window).height()});
			$('body').css('height',$(window).height());
			$('#loading').css('height',$(window).height());
			$('.scene.active').css({'top':0});

			$(window).resize(function(){
				$('.scene').css({'height':$(window).height(),'top':$(window).height()});
				$('body').css('height',$(window).height());
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

				$('.scene1').css('backgroundImage','url('+$$r.rootUrl+'/h5plus/img/portalAnim/scene1/bj0'+index_+'.png)');
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
							$('.scene3').find('div[class^=round]');
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

			// 
			$('.ljzz').click(function(){
				$('.register').click();
			})
	  }
  
	$(document).ready( miaov.init );

  }

};

module.exports = portalAnimClass;

});