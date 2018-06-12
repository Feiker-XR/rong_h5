/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-03-26 16:12:19
*/
seajs.use(['Ajax'], 
    function(Ajax){

  window.onload=window.onresize=function(){
   document.documentElement.style.fontSize=document.documentElement.clientWidth/16+'px';
  };

    var tempReady = function() {

        var queryUrl = $$r.routers.data.link.query;
        var addUrl = $$r.routers.data.link.add;
        var receiveUrl = $$r.routers.data.link.receive;

        var uid=3;

        var getsiteUrl = $$r.routers.data.link.getsite;
        $('.next').on('click',function(){  
            	if($('#user').val()!="" && $('#phone').val()!="" && $('#site').val()!=""){
            		var phoneNum_JY=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
					var phoneNum=$("#phone").val();

					if(phoneNum_JY.test(phoneNum)==false){ 
						alert('请输入正确手机号');
						$('#phone').focus();		
						return false;
					}

            		function interact(){

			             updateRess(uid);
                           
					}

					interact();
                    
            	}else{ 
            		alert("三项都是必写项");
            	}
        });

       

        $('.close').on('touchstart',function(){
            window.location.href=localStorage.indexUrl;
        })


        //获取收货人地址
        getAddress(uid);
        function getAddress(uid){
            if(!uid)return;
                     var option = {
                                url : queryUrl,
                                data:{'pid':localStorage.pid},
                                dataType: 'json',
                                type: 'get',
                                success: function(json) {

                                    if (json.error_response) {
                                        alert(json.error_response.msg)
                                        return
                                    }
                                    
                                    var data=json.hfive_activity_award_address_query_response;

                                    localStorage.address_id=data.address_id;



                                    $('#user').val(data.name);
                                    $('#phone').val(data.mobile);
                                    $('#site').val(data.address);
                                    
                                },
                                beforeSend:function(){
                                }
                            }
                            new Ajax(option);

        }

        //更新收货地址
        function updateRess(uid){

            var data;

            if(localStorage.address_id){
                data={'uid':uid,
                      'company_key':'ff8080814d8922fe014d8e18c9fd0004',
                      'address_id':Number(localStorage.address_id),
                      'name':$('#user').val(),
                      'mobile':$('#phone').val(),
                      'address':$('#site').val()
                    }
            }else{
                data={'uid':uid,
                      'company_key':'ff8080814d8922fe014d8e18c9fd0004',
                      'name':$('#user').val(),
                      'mobile':$('#phone').val(),
                      'address':$('#site').val()
                    }
            }      

            var option = {
                                url : addUrl,
                                data:data,
                                dataType: 'json',
                                type: 'get',
                                success: function(json) {

                                    if (json.error_response) {
                                        alert(json.error_response.msg)
                                        return
                                    }
                                    
                                    var data=json.hfive_activity_award_address_add_response;

                                    if(data.message == '处理成功!'){
                                        Award();
                                    }else{
                                        alert('领取失败!');
                                    }
                                    
                                },
                                beforeSend:function(){
                                }
                            }
                            new Ajax(option);
        }

        //领取奖金
        function Award(){

            var option = {
                url : receiveUrl,
                data:{'pid':localStorage.pid,'activity_id':localStorage.activity_id,'gift_id':localStorage.gift_id},
                dataType: 'json',
                type: 'get',
                success: function(json) {

                    if (json.error_response) {
                        alert(json.error_response.msg)
                        return
                    }
                    
                    if(json.hfive_activity_award_entity_receive_response.message == '领取成功'){

                        localStorage.receive_time=json.hfive_activity_award_entity_receive_response.receive_time;
                        localStorage.weixin_img=json.hfive_activity_award_entity_receive_response.image_url.replace('-internal
','');
                        window.location.href="succeed.html";
                    }
                    
                    
                },
                beforeSend:function(){
                }
            }

            new Ajax(option);                     
        }ds

    }

    $Rk.plat.s(function(){
        tempReady()
    })
});