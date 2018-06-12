/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-03-28 17:50:35
*/
seajs.use(['Ajax','dot','jweixin', 'h5sdk'], 
    function(Ajax,dot, jweixin, h5sdk){

    var URL_pid = $rk.getUrlAllParam().pid || $$r.routers.h5sdk.pid,
        URL_account = $rk.getUrlAllParam().pub_id || $$r.routers.h5sdk.account;

   h5sdk.init(URL_pid,URL_account);

    var tempReady = function() {

        var open_id = h5sdk.getOpenid() || '3e5fe546e23044819f63161faccb';
        var chestListUrl = $$r.routers.data.link.chestList;     //宝箱列表API
		    var signAddUrl = $$r.routers.data.link.signAdd;         //签到API
        var playerUrl = $$r.routers.data.link.player_info;      //个人签到活动信息API
        var signAddUrl = $$r.routers.data.link.signAdd;      //签到api
        var weixinUrl = $$r.routers.data.link.weixin;       //微信信息

        // var common = {
        //     pid: $$r.routers.h5sdk.pid, 
        //     account: $$r.routers.h5sdk.account,
        //     open_id: open_id,
        //     activity_id : $$r.routers.login.activity_id,
        //     uid: $$r.routers.login.uid
        // };

		       
        var interactIndex={};
 
        interactIndex.init=function(){

            localStorage.uid= $rk.getUrlAllParam().uid || 3;   //uid
            localStorage.activity_id= $rk.getUrlAllParam().activity_id || 98;  //activeid
            localStorage.account=URL_account;  //account
            localStorage.open_id=open_id;       //openid
            localStorage.pid=URL_pid; //pid
            localStorage.indexUrl=window.location.href;
 
            this.uid=localStorage.uid;  //uid
            this.activity_id=localStorage.activity_id; //活动id
            
            this.company_key='ff8080814d8922fe014d8e18c9fd0004';//company_key

            interactIndex.bindEvents();//所有事件

            interactIndex.signAddInterface();//签到

        }

        //签到
        interactIndex.signAddInterface=function(){

           new Ajax({
                      url : signAddUrl,
                      data : {'pid':localStorage.pid,'activity_id':interactIndex.activity_id},
                      type : 'get',
                      dataType: 'json',
                      success: function(json){
                          // if (json.error_response) {
                          //     alert(json.error_response.msg)
                          //     return
                          // }
                          interactIndex.signMapInterface();
                      },
                      beforeSend:function(){
                            }
                   });

        }

        //个人签到信息地图接口
        interactIndex.signMapInterface=function(){

           new Ajax({
                      url : playerUrl,
                      data : {'pid':localStorage.pid,'activity_id':interactIndex.activity_id},
                      type : 'get',
                      dataType: 'json',
                      success: function(json) {
                            if(json.error_response){
                              alert(json.error_response.msg)
                              return
                            }

                            var data=json.hfive_activity_signin_player_info_get_response;
                            interactIndex.continuous_days=data.continuous_days==0?1:data.continuous_days;//把连续签到天数挂到全局上;
                            interactIndex.signMap(data.activity_days);//签到地图
                            interactIndex.signDay(interactIndex.continuous_days);//现在签到的天数
                            interactIndex.awardInterface();//宝箱列表接口

                            $('#display_time>span').html(interactIndex.continuous_days);

                            console.log(json);
                      },
                      beforeSend:function(){
                            }
                   });

        }

        //宝箱列表接口
        
        interactIndex.awardInterface=function(){
          // alert(interactIndex.activity_id);
          new Ajax({
                      url : chestListUrl,
                      data : {'pid':localStorage.pid,'activity_id':interactIndex.activity_id},
                      type : 'get',
                      dataType: 'json',
                      success: function(json) {

                        if(json.error_response){
                          alert(json.error_response.msg)
                          return
                        }
 
                      var _res = json.hfive_activity_signin_player_gift_list_response,
                           _total = _res.total,
                           data = _res.playergifts.playergift;
                      if (_total===0) {
                          alert('当前没有签到数据，请刷新重试');
                        }
                       interactIndex.awardArry=data;
                        // alert(JSON.stringify(data));
                         for(var i=0;i<data.length;i++){
                            var arr;
                            if(data[i].remain_days>=1){
                              arr=data[i].remain_days;
                            }else if(data[i].remain_days==0 && data[i].status=='send'){
                              arr=data[i].award_time;
                              arr=arr.split(' ');
                            }else if(data[i].remain_days == 0 && data[i].status=='award'){
                              arr='开启';
                            }

                            interactIndex.chestPosition(interactIndex.continuous_days,data[i].award_days,data[i].status != 'award',arr,i);
                         }

                         //设置右边宝箱点击按钮是否为灰色
                         if(data.length<=3){$('#awardR').addClass('awardR1')}
                      },
                      beforeSend:function(){
                      }
                   });

        }

        //所有事件  
        interactIndex.bindEvents=function(){
             interactIndex.bindAward();//底部宝箱点击
        }

        //底部宝箱点击
        interactIndex.bindAward=function(){
            //底部还差几天得到宝箱右按钮
            $('#awardR').on('touchstart',function(){
                var $awardCV=$('.awardC:visible');

                if($awardCV.index() == $('.awardC:last').index())return;

                if($awardCV.next().index() == $('.awardC:last').index()){
                    $('#awardR').addClass('awardR1');                  
                }

                $('.awardC').removeClass('on');
                $awardCV.next().addClass('on');
                $('#awardL').removeClass('awardL1');

             })

            //底部还差几天得到宝箱左按钮
             $('#awardL').on('touchstart',function(){
                 var $awardCV=$('.awardC:visible');

                if($awardCV.index() == $('.awardC:first').index())return;

                if($awardCV.prev().index() == $('.awardC:first').index()){
                    $('#awardL').addClass('awardL1');                  
                }

                $('.awardC').removeClass('on');
                $awardCV.prev().addClass('on');
                $('#awardR').removeClass('awardR1');  

             })
        }

        //签到地图
        interactIndex.signMap=function(index){  

          var weekNum=Math.ceil(index/7);
          var str='<div class="ping" week="1">'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                    +'<div class="qian"></div>'
                  +'</div>';

          for(var i=2;i<=weekNum;i++){
              
              if(i%2 == 0){
                str+='<div class="shuR"></div>'
                      +'<div class="ping" week="'+i+'">'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                      +'</div>'
              }else if(i%2 == 1){
                 str+='<div class="shuL"></div>'
                      +'<div class="ping" week="'+i+'">'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                        +'<div class="qian"></div>'
                      +'</div>' 
              }
          }


          $('#centent').html(str);
          
          new Ajax({
                      url : weixinUrl,
                      data : {'component_appid':$rk.getUrlAllParam().component_appid,'weixin_account':localStorage.account,'open_id':localStorage.open_id,'pid':localStorage.pid},
                      type : 'get',
                      dataType: 'json',
                      success: function(json) {

                        if (json.error_response) {
                            alert(json.error_response.msg)
                        }
                        // alert(JSON.stringify(json));
                        if(json.error_response){
                          touxiang($$r.rootUrl +'/h5plus/img/active/sign/tou.png');
                          return
                        }  
                        
                        touxiang(json.external_weixin_userdetailinfo_get_response.wxuserinfo.head_image_url);
                      },
                      error:function(res){
                         alert(res); 
                      },      
                      beforeSend:function(){
                            }
                   });




        }

        //插入头像
        function touxiang(url){

          if(interactIndex.continuous_days>7){
            $('#centent').append(
            '<div class="portrait">'
             +'<div><div class="jiao"></div><img src="'+url+'" alt=""></div>'
            +'</div>');
          }else{
            $('.da1').append(
            '<div class="portrait">'
             +'<div><div class="jiao"></div><img src="'+url+'" alt=""></div>'
            +'</div>');
          }  

          //头像位置
            var headT=$('.qian:eq('+(interactIndex.continuous_days-1)+')').offset().top-$('.portrait').height()-$('.qian:eq('+interactIndex.continuous_days+')').height()/2-$('#centent').offset().top;
            var headL=$('.qian:eq('+(interactIndex.continuous_days-1)+')').offset().left+$('.qian:eq('+(interactIndex.continuous_days-1)+')').width()/2-$('.portrait').width()/2-$('#centent').offset().left;

            if(interactIndex.continuous_days<=7){
              headT+=30;
              headL+=15;
            };

            $('.portrait').css({top:headT,left:headL});

        }


        //查看详情
        interactIndex.details=function(){

          $('.kaiqi').on('touchstart',function(){
             // alert($(this).attr('index'));
              localStorage.awardName=interactIndex.awardArry[$(this).attr('index')].name;
              localStorage.gift_id=interactIndex.awardArry[$(this).attr('index')].gift_id;
              localStorage.gift_des=interactIndex.awardArry[$(this).attr('index')].gift_des;

              if(interactIndex.awardArry[$(this).index()].type == 0){
                localStorage.weixin_img=interactIndex.awardArry[$(this).attr('index')].image_url.replace('-internal','');
              }else{
                localStorage.weixin_img=$$r.rootUrl +'/h5plus/img/active/sign/hongbao.png';
              }

              location.href="succeed.html";
          })

        }

        //宝箱签到天数
        interactIndex.signDay=function(index){

            //钱数
            for(var i=0;i<index;i++){
              $('.qian:eq('+i+')').addClass('on');
            }

        }

        //未开启宝箱的html
        interactIndex.baoxiang1=function(time){
          var Time;

           if(time == '开启'){
            Time='<div class="state1">'+time+'</div>';
          }else{
            Time='<div class="state1">还差'+time+'天</div>';
          }

          return '<div class="awardC1">'
                  +'<img src="'+ $$r.rootUrl +'/h5plus/img/active/sign/baoxiang.png" alt="">'
                  +Time
                +'</div>';
        }

        interactIndex.baoxiang2=function(time){

          var Time;

          if(time == '开启'){
            Time='<div class="state1">'+time+'</div>';
          }else{
            Time='<div class="state1">还差'+time+'天</div>';
          }

          return '<div class="awardC">'
                      +'<div class="awardC1">'
                      +'<img src="'+ $$r.rootUrl +'/h5plus/img/active/sign/baoxiang.png" alt="">'
                      +'<div class="state1">'+Time+'</div>'
                      +'</div>'
                  +'</div>';
        }

        //开启宝箱的html
        interactIndex.kaiqi1=function(time,num){
          return '<div class="awardC1">'
                  +'<img src="'+ $$r.rootUrl +'/h5plus/img/active/sign/kaiqi.png" alt="" class="kaiqi" index='+num+'>'
                  +'<div class="state">已领取</div>'
                  +'<div class="time">'+time[0]+'<br>'+time[1]+'</div>'
                +'</div>';
        }

        interactIndex.kaiqi2=function(time,num){
          return '<div class="awardC">'
                    +'<div class="awardC1">'
                    +'<img src="'+ $$r.rootUrl +'/h5plus/img/active/sign/kaiqi.png" alt="" class="kaiqi" index='+num+'>'
                    +'<div class="state">已领取</div>'
                    +'<div class="time">'+time[0]+'<br>'+time[1]+'</div>'
                    +'</div>'
                  +'</div>';
        }


        //宝箱位置
        interactIndex.chestPosition=function(signNum,chestNum,state,time,num){
          
          if(signNum>=chestNum){ 

            if($('.awardC .awardC1').length%3 != 0 || $('.awardC .awardC1').length == 0){
              
              if(state == true){
              
                $('.awardC:last').append(interactIndex.kaiqi1(time,num));
                
              }else if(state == false){
               
                $('.awardC:last').append(interactIndex.baoxiang1(time));
              }

            }else{

              if(state == true){
                $('.awardZ').append(interactIndex.kaiqi2(time,num));
              }else if(state == false){
                $('.awardZ').append(interactIndex.baoxiang2(time));
              }
            
            } 

            if(state == false){
               //地图上未奖宝箱的位置
               if(Math.ceil(chestNum/7)%2 == 0){
                 var index_=$('.qian:eq('+(chestNum-1)+')').parent().index('.ping');
                 $('.ping:eq('+index_+')').find('.qian:eq('+(7-(chestNum%7))+')').addClass('jiang');
               }else{
                $('.qian:eq('+(chestNum-1)+')').addClass('jiang');
              }
            }else if(state){
               //地图上中奖宝箱的位置
              if(Math.ceil(chestNum/7)%2 == 0){
                   var index_=$('.qian:eq('+(chestNum-1)+')').parent().index('.ping');
                   $('.ping:eq('+index_+')').find('.qian:eq('+(7-(chestNum%7))+')').addClass('jiang1');
               }else{
                $('.qian:eq('+(chestNum-1)+')').addClass('jiang1');
              }
            }

          }else if(signNum<chestNum){

              if($('.awardC .awardC1').length%3 != 0 || $('.awardC .awardC1').length == 0){

                  $('.awardC:last').append(interactIndex.baoxiang1(time));
                
                }else{

                  $('.awardZ').append(interactIndex.baoxiang2(time));
              
                }

              //地图上未奖宝箱的位置
              if(Math.ceil(chestNum/7)%2 == 0){
                   var index_=$('.qian:eq('+(chestNum-1)+')').parent().index('.ping');
                   $('.ping:eq('+index_+')').find('.qian:eq('+(7-(chestNum%7))+')').addClass('jiang');
               }else{
                $('.qian:eq('+(chestNum-1)+')').addClass('jiang');
              }
                 
          }


          if(state == false && signNum >= chestNum){            
              //添加宝箱点击事件
              $('.awardC1:last').on('touchstart',function(){

                 localStorage.awardName=interactIndex.awardArry[$(this).index()].name;
                 localStorage.awardType=interactIndex.awardArry[$(this).index()].type;
                 localStorage.gift_id=interactIndex.awardArry[$(this).index()].gift_id;
                 localStorage.gift_des=interactIndex.awardArry[$(this).index()].gift_des;
                 location.href="treasure.html";

              })

              $('.qian:eq('+(chestNum-1)+')').on('touchstart',function(){

                  localStorage.awardName=interactIndex.awardArry[$(this).index()].name;
                  localStorage.awardType=interactIndex.awardArry[$(this).index()].type;
                  localStorage.gift_id=interactIndex.awardArry[$(this).index()].gift_id;
                  localStorage.gift_des=interactIndex.awardArry[$(this).index()].gift_des;
                  location.href="treasure.html";

              })//地图上中奖表箱的位置

            }

            interactIndex.details();//查看详情

      }


        interactIndex.init();

    }

    h5sdk.ready(function(){
      $Rk.plat.s(function(){
        tempReady();
      })
    })
    
});  