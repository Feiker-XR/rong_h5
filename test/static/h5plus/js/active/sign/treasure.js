/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-03-15 12:54:45
*/
seajs.use(['Ajax','dot','jweixin', 'h5sdk'], 
    function(Ajax,dot, jweixin, h5sdk){

    var tempReady = function() {
        setTimeout(function(){
			$('#wei').animate({'top':'30%'},400,function(){
				$('#wei').addClass('hide');
				$('#centent').removeClass('hide');
			});
		},500)
        var open_id = h5sdk.getOpenid() || '3e5fe546e23044819f63161faccb5271';
        var receiveUrl = $$r.routers.data.link.receive;  //领取实物奖奖励API
        var common = {
            pid: $$r.routers.h5sdk.pid,
            account: $$r.routers.h5sdk.account,
            open_id: open_id
        };
        
		function interact(){
            $('#div span').html(localStorage.awardName);


            

                $('.next').on("click",function(){



                    if(localStorage.awardType == 0){
                         //需要填写收货地址
                          
                        window.location.href='get.html';
                       }else{
                         //不需要填写收货地址
                         
                         localStorage.weixin_img='http://resource.h5plus.net/2016/03/28/56f8f833d860e.png';

                         new Ajax({
                              url : receiveUrl,
                              data : {'pid':localStorage.pid,'activity_id':localStorage.activity_id,'gift_id':localStorage.gift_id},
                              type : 'get',
                              dataType: 'json',
                              success: function(json) {
                                    if(json.error_response){
                                      alert(json.error_response.msg)
                                      return
                                    }

                                    if(json.hfive_activity_award_redenvelope_receive_response.message == '领取成功'){
                                        window.location.href='succeed.html';
                                    }

                                    },
                              beforeSend:function(){
                                    }
                           });

                        
                       } 

    	        })

		}
        
		interact();
    }

    $Rk.plat.s(function(){
        tempReady()
    })
});