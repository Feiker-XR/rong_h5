/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-20 14:26:54
*/
seajs.use(['Ajax','dot','tips2','migrate','bootstrap','jqui','uniform','bootstrap_fileupload','photon_select2','zclip','mousewheel','mCustomScrollbar'], 
    function(Ajax,dot,Tips,migrate,bootstrap,jqui,uniform,bootstrap_fileupload,photon_select2,zclip,mousewheel,mCustomScrollbar){

    var setModel = function() {

        var activityAddUrl = $$r.routers.data.link.activityAdd,
            activityListUrl = $$r.routers.data.link.activityList,
            playerCountUrl = $$r.routers.data.link.playerCount,
            awardListUrl = $$r.routers.data.link.awardList,
            activityDelUrl = $$r.routers.data.link.activityDel,
            activityRuleUrl = $$r.routers.data.link.activityRule,
            activityRuleAddUrl = $$r.routers.data.link.activityRuleAdd,
            imgFileUrl = $$r.routers.data.link.imgUpload,
            activityRuleDelUrl = $$r.routers.data.link.activityRuleDel,
            activityRuleEditUrl= $$r.routers.data.link.activityRuleEdit,
            activityEditUrl= $$r.routers.data.link.activityEdit,
            awardPlayerUrl= $$r.routers.data.link.awardPlayer,
            activityRuleEditDataUrl= $$r.routers.data.link.activityRuleEditData,
            awardDeliveryUrl= $$r.routers.data.link.awardDelivery,
            subscriptionUrl = $$r.routers.data.link.subscription,
            copylinkUrl= $$r.routers.data.link.copylink,
            pidUrl= $$r.routers.data.link.pid;

        var category='signin',activity_id,pageLength=10,page_num=5,page_current=1,page_size,flag=0,newActivityId,activityStatus,pageFlag=0,
        loginUrl='http://h5plus.net/portal/LoginAction-index.action',time,copyUrl='http://h5plus.net/static/comlibjs/third/zclip/ZeroClipboard.swf',pid;

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.pidRequest();
                });
                $rk.listener.on('activity', 'success', function(e, json) {
                    me.render(json);
                    me.bind();
                });
                $rk.listener.on('activity', 'change', function(e, json) {
                    me.activityListRequest();
                });
                $rk.listener.on('subscription', 'success', function(e, json) {
                    me.renderSubscription(json);
                    me.bindSubscription();
                });
            },
            container: $('#j_con_left'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_left').html(), data||{});
                this.container.html(html);
            },
            bind: function() {
                var me=this;
                //公众号列表
                $('.activityAddBtn').unbind('click').click(function(){
                    me.subscriptionRequest();
                });
                //enter确定
                $('body').keydown(function() {
                     if (event.keyCode == '13') {
                        if($('input[data_id=searchKey]:focus').length!=0){
                            $('button[data_id=searchAward]').click();
                        }else{
                            $('div[aria-hidden=false] .btn-primary').click();
                            return false;
                        }
                     }
                 });
                //左侧菜单滚动
                if( $('.panel-slider-center .panel-slider-arrow').css('position') != 'absolute'){
                    $win_hei = $(window).height();
                    $(".sidebarMenuHolder").height($win_hei-$('.activityTit').height()-$('.panel-header').height());
                }
                else{
                    $(".sidebarMenuHolder").height(300);
                }
                $(".sidebarMenuHolder").mCustomScrollbar({
                    scrollButtons:{
                        enable:true
                    },
                    advanced:{
                        updateOnBrowserResize: true,
                        updateOnContentResize:true
                    }
                });
                //新建签到活动
                $('#activityAdd .btn-primary').unbind('click').click(function(){
                    var activity_name=$('#activityAddName').val();
                    if(!activity_name){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='活动名称不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else{
                        var data={'category':category,'activity_name':activity_name,pub_id:$('#subscriptionCon').val()};
                        me.activityAddRequest(data);
                    }
                    $('#activityAdd a[data-dismiss=modal]').click();
                });
                $('#activityAdd a[data-dismiss=modal]').click(function(){
                    $('.modal-backdrop').remove();
                });
                //签到活动内容
                $('#jstree li a').unbind('click').click(function(){
                    pageFlag=0;
                    activity_id=$(this).parents('li').attr('id');
                    $('#jstree li a').removeClass('jstree-clicked');
                    $(this).addClass('jstree-clicked');
                    var data={'activity_id':activity_id};
                    $rk.listener.trigger('activityCon', 'success',data);
                }).hover(function(){
                    $(this).addClass('jstree-hovered');
                },function(){
                    $(this).removeClass('jstree-hovered');
                });
                if(flag==0){
                    flag=1;
                    $('#jstree li a:first').click();
                }
                $('#jstree li[id='+newActivityId+'] a').click();
                $('.panel-slider-arrow').off().on('click', function(){
                    $('.panel').toggleClass('retracted');
                    $('.main-content').toggleClass('contentRetracted');
                });
                //input清空
                $('a[data-dismiss=modal]').click(function(){
                    $('input[type=text]:not(#datepicker):not(#dateHistory)').val('');
                });
            },
            bindSubscription:function(){
                $("#subscriptionCon").select2({
                    dropdownCssClass: 'noSearch'
                });
            },
            renderSubscription:function(data){
                var html = $rk.tplRender(dot, $('#j_view_subscription').html(), data||{});
                this.container.find('#subscription .controls select').html(html);
            },
            subscriptionRequest:function(){
                var option = {
                    url : subscriptionUrl,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('subscription', 'success',json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityAddRequest:function(data){
                var option = {
                    url : activityAddUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            newActivityId=json.hfive_activity_activity_add_response.activity_id;
                            json.hfive_activity_activity_add_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_activity_add_response);
                            $rk.listener.trigger('activity', 'change');
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityListRequest:function(){
               var option = {
                    url : activityListUrl,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('activity', 'success', json);
                        }else{
                            var errorCode=json.error_response.code;
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                            if(errorCode=="H5APE01"){
                                var userUrl=window.location.href;
                                sessionStorage.setItem('userUrl', userUrl);
                                window.parent.location.href=loginUrl;
                            }
                        } 
                    }
                }
                new Ajax(option); 
            },
            pidRequest:function(){
                var option = {
                    url : pidUrl,
                    dataType:'json',
                    type: 'get',
                    success: function(json) {
                        if(!json.error_response){
                            if (json.success==='false') {
                                $rk.listener.trigger('tipsPhoton', 'success',json);
                                return
                            }
                            pid=json.data._id;
                            $rk.listener.trigger('activity', 'change');
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option); 
            }
        });
        var main = new $rk.VC({
            _init: function() {
                var me=this;
                $rk.listener.on('activityCon', 'success', function(e, data) {
                    var playerData={'activity_id':activity_id};
                    var copylinkData={'activity_id':activity_id,pid:pid};
                    var awardData={'activity_id':activity_id,'page_num':1,'page_size':pageLength,nickname:$('input[data_id=searchKey]').val()};
                    me.activityDetailRequest(data);
                    me.playerCountRequest(playerData);
                    me.awardListRequest(awardData);
                    me.copylinkRequest(copylinkData);
                    me.render();
                    me.bind();
                });
                $rk.listener.on('copylink', 'success', function(e, json) {
                    me.renderCopylink(json);
                });
                $rk.listener.on('playerCount', 'success', function(e, json) {
                    me.renderPlayerCount(json);
                });
                $rk.listener.on('awardList', 'success', function(e, json) {
                    me.renderAwardList(json);
                    me.bindAwardList();
                });
                $rk.listener.on('activityRule', 'success', function(e, json) {
                    me.renderActivityRule(json);
                    me.bindActivityRule();
                });
                $rk.listener.on('awardPlayer', 'success', function(e, json) {
                    me.renderAwardPlayer(json);
                });
                $rk.listener.on('tipsPhoton', 'success', function(e, json) {
                    me.renderTipsPhoton(json);
                    me.bindTipsPhoton();
                });
                $rk.listener.on('activityDetail', 'success', function(e, json) {
                    me.renderActivityDetail(json);
                });
            },
            container: $('#j_con_right'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_right').html(), data||{});
                this.container.html(html);
            },
            bind: function() {
                var me=this;
                //删除活动去掉遮罩
                $('#activityDelBox a[data-dismiss=modal]').click(function(){
                    $('.modal-backdrop').remove();
                });
                //日历
                $("#datepicker").datepicker({
                    dateFormat:'yy-mm-dd',
                    monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                    dayNamesMin:['周日','周一','周二','周三','周四','周五','周六'],
                    minDate:new Date()
                });
                //暂时存储时间
                $('#modal-dialog a[data-dismiss=modal]').click(function(){
                    if($('#modal-dialog #datepicker').length>0){
                        time=$('#modal-dialog #datepicker').datepicker({dateFormat: "yy-mm-dd"}).val();
                    }
                });
                //顶部导航
                $('ul[data_id=navTop] li:not(:last)').click(function(){
                    window.parent.location.href='http://h5plus.net/portal/index.action';
                });
                //新建奖品条目
                 $('#activityRuleAdd a[data-dismiss=modal]').unbind('click').click(function(){
                    $('input[type=text]').val('');
                    $('.radioGroup input[type=radio]:first').attr('checked','checked');
                    $('.radioGroup input[type=radio]').parent().removeClass('checked');
                    $('.radioGroup input[type=radio]:checked').parent().addClass('checked');
                    $('input[data_id=imgFile]').val('').attr('url','');
                    $('.fileupload-preview').text('');
                    $('.redBag').show();
                    $('.gift').hide();
                    $('button[data_id=activityRule]').click();
                 });
                $('span[data_id=activityRuleAdd],span[data_id=activityRuleDel]').unbind('click').click(function(){
                    $('#modal-dialog a[data-dismiss=modal]').click();
                    $('#activityRuleAdd .btn-primary').attr('data_id','activityRuleAddBtn');
                });
                $('#activityRuleAdd .btn-primary').unbind('click').click(function(){
                    var award_days=$('#activityRuleAdd #signDay').val();
                    if(!award_days){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='连续签到天数不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else if(!(/^[0-9]*$/.test(award_days))){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='连续签到天数必须是整数！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                    }else{
                        var data={'activity_id':activity_id,'award_days':award_days};
                        var index=$('#activityRuleAdd .radioGroup input[type=radio]:checked').index('#activityRuleAdd .radioGroup input[type=radio]');
                        if(index==0){
                            data.gift_type=2;
                            data.amount=$('#activityRuleAdd #radBagamount').val();
                            if(!data.amount){
                                var errorTip={};
                                errorTip.code=0;
                                errorTip.msg='现金红包不能为空！';
                                $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                                return false;
                            }else if(!(/^\d+(\.\d+)?$/.test(data.amount))){
                                var errorTip={};
                                errorTip.code=0;
                                errorTip.msg='现金红包录入格式错误！';
                                $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                                return false;
                            }else if(data.amount<0.01||data.amount>200){
                                var errorTip={};
                                errorTip.code=0;
                                errorTip.msg='请输入1-200之间的现金红包！';
                                $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                                return false;
                            }
                        }else if(index==1){
                            data.gift_type=0;
                            data.gift_name=$('#activityRuleAdd #giftName').val();
                            if(!data.gift_name){
                                var errorTip={};
                                errorTip.code=0;
                                errorTip.msg='奖品名称不能为空！';
                                $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                                return false;
                            }
                            data.gift_pic=$('input[data_id=imgFile]').attr('url');
                            if(!data.gift_pic){
                                var errorTip={};
                                errorTip.code=0;
                                errorTip.msg='图片不能为空！';
                                $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                                return false;
                            }
                        }
                        var data_id=$(this).attr('data_id');
                        if(data_id=='activityRuleAddBtn'){
                            if(!data.gift_pic){
                                data.gift_pic=$('input[data_id=imgFile]').attr('url');
                            }
                            me.activityRuleAddRequest(data);
                        }else if(data_id=='activityRuleEditBtn'){
                            data.rule_id=$('a[data_id=activityRuleEditBtn]').attr('ruleid');
                            me.activityRuleEditRequest(data);
                        }
                    }
                });
                //删除签到活动
                $('#activityDelBox .btn-primary').unbind('click').click(function(){
                    var data={'activity_id':activity_id};
                    me.activityDelRequest(data);
                    $('#activityDelBox a[data-dismiss=modal]').click();
                });
                //修改签到活动
                $('#modal-dialog .btn-primary').unbind('click').click(function(){
                    if(activityStatus=='create'){
                        var start_date=$('#modal-dialog #datepicker').datepicker({dateFormat: "yy-mm-dd"}).val();
                        if(!start_date){
                            var errorTip={};
                            errorTip.code=0;
                            errorTip.msg='活动开始时间不能为空！';
                            $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                        }else{
                            var data={'activity_id':activity_id,'start_date':start_date};
                            me.activityEditRequest(data);
                        }
                    }
                    $('#modal-dialog a[data-dismiss=modal]').click();
                });
                //配置
                $('button[data_id=activityRule1]').unbind('click').click(function(){
                    /*var data={'activity_id':activity_id};
                    if($('#modal-dialog #datepicker').length>0){
                       $('#modal-dialog #datepicker').datepicker( "setDate", new Date(time)); 
                    }else if($('#modal-dialog #dateHistory').length>0){
                        $('#modal-dialog #dateHistory').val(time);
                    }
                    me.activityRuleRequest(data);*/
                    location.href="../helanrn/helanrn/helanrn.html"; 
                });
                //删除员工
                $('#staffdelete .btn-primary').click(function(){
                    alert('删除员工')
                });
                //奖品类型
                $('.radioGroup input[type=radio]').change(function(){
                    var radioValue=$('.radioGroup input[type=radio]:checked').attr('value');
                    $('#radBagamount,#giftName').val('');
                    $('input[data_id=imgFile]').val('').attr('url','');
                    $('.fileupload-preview').text('');
                    if(radioValue=='radio1'){
                        $('.redBag').show();
                        $('.gift').hide();
                    }else if(radioValue=='radio2'){
                        $('.redBag').hide();
                        $('.gift').show();
                    }
                });
                //中奖名单搜索
                $('button[data_id=searchAward]').unbind('click').click(function(){
                    var data={activity_id:activity_id,nickname:$('input[data_id=searchKey]').val(),page_num:1,page_size:pageLength};
                    me.awardListRequest(data);
                    pageFlag=0;
                });  
                //复制链接
                /*$('button[data_id=copyLink]').zclip({
                    path: copyUrl,
                    copy: function(){
                        return $('#link').val();
          　　　 　　}
                });*/
                $('#copyLinkBox .btn').unbind('click').click(function(){
                    var bindex=$(this).parent().index();
                    $('.link1').eq(bindex).removeClass('hide').siblings().addClass('hide')
                })
                //导出报表
               $('#modal-reportForm .btn-primary').unbind('click').click(function(){
                    alert('导出报表')
                })
                //添加员工
                $('#modal-staff .btn-primary').unbind('click').click(function(){
                    if($('#staff_number').val()!='' && $('#staff_name').val()!='' && $('#staff_phone').val()!=''){
                        alert('成功')
                    }else{
                        alert('请填写全部信息');
                    }
                })
                $('#copyLinkBox .btn-primary').unbind('click').click(function(){
                    $('#copyLinkBox button[data-dismiss=modal]').click();
                });
                //radio
                $(".uniformRadio").uniform({
                    radioClass: 'uniformRadio'
                });
            },
            renderCopylink:function(data){
                var html = $rk.tplRender(dot, $('#j_view_link').html(), data||{});
                this.container.find('div[data_id=link]').html(html);
            },
            copylinkRequest:function(data){
                var option = {
                    url : copylinkUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('copylink', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            renderActivityDetail:function(data){
                var html = $rk.tplRender(dot, $('#j_view_activityDetail').html(), data||{});
                this.container.find('div[data_id=activityDetail]').html(html);
            },
            activityDetailRequest:function(data){
               var option = {
                    url : activityListUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            activityStatus=json.hfive_activity_activity_list_response.activitys.activity[0].status;
                            time=json.hfive_activity_activity_list_response.activitys.activity[0].startTime
                            if(activityStatus=='start'){
                                $('.activityDel button').attr('disabled','disabled');
                                $('#modal-dialog .ruleTime').append('<input type="text" id="dateHistory" class="span3" readonly="readonly" />');
                                $('#modal-dialog #datepicker').remove();
                            }
                            $rk.listener.trigger('activityDetail', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option); 
            },
            renderPlayerCount:function(data){
                var html = $rk.tplRender(dot, $('#j_view_playerCount').html(), data||{});
                this.container.find('div[data_id=playerCount]').html(html);
            },
            playerCountRequest:function(data){
               var option = {
                    url : playerCountUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('playerCount', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);  
            },
            renderAwardList:function(data){
                data.pageLength=pageLength;
                var html = $rk.tplRender(dot, $('#j_view_awardList').html(), data||{});
                this.container.find('div[data_id=awardList]').html(html);
            },
            bindAwardList:function(){
                var me=this;
                //中奖粉丝详情
                $('span[data_id=getPlayer]').unbind('click').click(function(){
                    var data={'award_id':$(this).parents('tr').attr('award_id')};
                    me.awardPlayerRequest(data);
                });
                //分页
                page_size=$('.awardTable').attr('page_size');
                if(pageFlag==0){
                    $('ul[data_id=pageShow] li').not(':last').not(':first').remove();
                    if(page_size!=0){
                        me.pageShow(page_num,1,page_size);
                    }else{
                        $('.prev,.next').hide();
                    }
                    pageFlag=1;
                }
                $('ul[data_id=pageShow]').off().on('click','li:not(:first):not(:last):not(.active)',function(){
                    page_current=$(this).text()-0;
                    me.pageShow(page_num,page_current,page_size);
                    $('li:contains('+page_current+')').addClass('active').siblings().removeClass('active');
                    var data={'activity_id':activity_id,'page_num':page_current,'page_size':pageLength,nickname:$('input[data_id=searchKey]').val()};
                    me.awardListRequest(data);
                });
                $('.next').unbind('click').click(function(){
                    page_current+=1;
                    if(page_current>page_size){
                        page_current=page_size;
                        $('ul[data_id=pageShow] li:last').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:last').removeClass('disabled');
                        var data={'activity_id':activity_id,'page_num':page_current,'page_size':pageLength,nickname:$('input[data_id=searchKey]').val()};
                        me.awardListRequest(data);
                    }
                    me.pageShow(page_num,page_current,page_size);
                });
                $('.prev').unbind('click').click(function(){
                    page_current-=1;
                    if(page_current<1){
                        page_current=1;
                        $('ul[data_id=pageShow] li:first').addClass('disabled');
                    }else{
                        $('ul[data_id=pageShow] li:first').removeClass('disabled');
                        var data={'activity_id':activity_id,'page_num':page_current,'page_size':pageLength,nickname:$('input[data_id=searchKey]').val()};
                        me.awardListRequest(data);
                    }
                    me.pageShow(page_num,page_current,page_size);
                });
                //发货
                $("#simpleSelectBox").select2({
                    dropdownCssClass: 'noSearch'
                });
                $('span[data_id=delivery]').unbind('click').click(function(){
                    $('#awardDelivery .btn-primary').attr('award_id',$(this).parents('tr').attr('award_id'));
                })
                $('#awardDelivery .btn-primary').unbind('click').click(function(){
                    var logistic_num=$('#logisticNum').val();
                    if(!logistic_num){
                        var errorTip={};
                        errorTip.code=0;
                        errorTip.msg='物流单号不能为空！';
                        $rk.listener.trigger('tipsPhoton', 'success',errorTip);
                        return false;
                    }
                    var data={'award_id':$(this).attr('award_id'),'logistic_name':$('#simpleSelectBox').val(),'logistic_num':logistic_num};
                    me.awardDeliveryRequest(data);
                });
            },
            awardListRequest:function(data){
                var option = {
                    url : awardListUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('awardList', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);  
            },
            renderAwardPlayer:function(data){
                var html = $rk.tplRender(dot, $('#j_view_awardPlayer').html(), data||{});
                this.container.find('#awardPlayer .modal-body').html(html);
            },
            awardPlayerRequest:function(data){
                var option = {
                    url : awardPlayerUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('awardPlayer', 'success',json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityDelRequest:function(data){
                var option = {
                    url : activityDelUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            flag=0;
                            json.hfive_activity_activity_delete_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_activity_delete_response);
                            $rk.listener.trigger('activity', 'change');
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityEditRequest:function(data){
                var me=this;
                var option = {
                    url : activityEditUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                             var data={'activity_id':activity_id};
                            me.activityDetailRequest(data);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            renderActivityRule:function(data){
                var html = $rk.tplRender(dot, $('#j_view_ruleCon').html(), data||{});
                this.container.find('.ruleCon').html(html);
            },
            bindActivityRule:function(){
                var me=this;
                //图片上传
                $('input[data_id=imgFile]').change(function(){
                    var param={};
                    param.inputName='file';
                    param._this=this;
                    param.method='POST';
                    me.imgFileRequest(param);
                });
                //删除奖品条目
                $('span[data_id=activityRuleDel]').unbind('click').click(function(){
                    $('#modal-dialog a[data-dismiss=modal]').click();
                    $('#activityRuleAdd .btn-primary').attr('data_id','activityRuleAddBtn');
                    $('#activityRuleDel .btn-primary').attr('ruleid',$(this).parent().attr('ruleid'));
                });
                $('#activityRuleDel .btn-primary').unbind('click').click(function(){
                    $('#activityRuleDel a[data-dismiss=modal]').click();
                    var data={'rule_id':$(this).attr('ruleid')};
                    me.activityRuleDelRequest(data);
                });
                //编辑奖品条目
                $('span[data_id=activityRuleEidt]').unbind('click').click(function(){
                    var data={'activity_id':activity_id,'rule_id':$(this).parent().attr('ruleId')};
                    me.activityRuleEditDataRequest(data);
                    $('#modal-dialog a[data-dismiss=modal]').click();
                    $('#activityRuleAdd .btn-primary').attr({'data_id':'activityRuleEditBtn','ruleid':$(this).parent().attr('ruleid')});
                });
                //状态限制
                if(activityStatus=='start'){
                    $('div[data_id=ruleStatus]').find('span').remove();
                }
            },
            activityRuleRequest:function(data){
                var option = {
                    url : activityRuleUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('activityRule', 'success', json);
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityRuleAddRequest:function(data){
                var option = {
                    url : activityRuleAddUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            json.hfive_activity_signin_rule_add_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_signin_rule_add_response);
                            
                            $('#activityRuleAdd a[data-dismiss=modal]').click();
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                           
                            data.rule_id=$('a[data_id=activityRuleEditBtn]').attr('ruleid');
                             //add by zxy&zzx
                            //var start_date=$('#modal-dialog #datepicker').datepicker({dateFormat: "yy-mm-dd"}).val();
 							//var data={'activity_id':activity_id,'start_date':start_date};
 							//me.activityEditRequest(data);
                         
                        } 
                    }
                }
                new Ajax(option);
            },
            imgFileRequest:function(param){
                var XMLHttpReq=null;
                if(window.ActiveXobject){
                    XMLHttpReq=new ActiveXobject('Microsofe.XMLHTTP');
                }else{
                    XMLHttpReq=new XMLHttpRequest();
                }
                var formData=new FormData();
                formData.append(param.inputName, param._this.files[0]);
                XMLHttpReq.open(param.method,imgFileUrl,true);
                XMLHttpReq.send(formData);
                XMLHttpReq.onreadystatechange=function requestCallBack(){
                    if(XMLHttpReq.readyState==4){
                        if(XMLHttpReq.status==200){
                            if(JSON.parse(XMLHttpReq.responseText).callResult){
                                $(param._this).attr('url',JSON.parse(XMLHttpReq.responseText).oss_path);
                            }else{
                                JSON.parse(XMLHttpReq.responseText).code=0;
                                $rk.listener.trigger('tipsPhoton', 'success',JSON.parse(XMLHttpReq.responseText));
                            }     
                        }
                    }
                }
            },
            activityRuleDelRequest:function(data){
                var option = {
                    url : activityRuleDelUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            json.hfive_activity_signin_rule_delete_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_signin_rule_delete_response);
                            $('button[data_id=activityRule]').click();
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityRuleEditDataRequest:function(data){
                var option = {
                    url : activityRuleEditDataUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            var rule=json.hfive_activity_signin_rule_get_response;
                           $('#activityRuleAdd .modal-header h3').text('编辑奖品条目');
                           $('#signDay').val(rule.award_days);
                           if(rule.type==2){
                                $('.radioGroup input[type=radio]:first').attr('checked','checked');
                                $('.radioGroup input[type=radio]').parent().removeClass('checked').eq(0).addClass('checked');
                                $('#radBagamount').val(rule.fixed_amount);
                                $('.redBag').show();
                                $('.gift').hide();
                           }else if(rule.type==0){
                                $('.radioGroup input[type=radio]:eq(1)').prop('checked','checked');
                                $('.radioGroup input[type=radio]').parent().removeClass('checked').eq(1).addClass('checked');
                                $('.gift .fileupload-preview').text(rule.image_url);
                                $('input[data_id=imgFile]').attr('url',rule.image_url);
                                $('#giftName').val(rule.gift_des);
                                $('.redBag').hide();
                                $('.gift').show();
                           }
                           
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                            data.rule_id=$('a[data_id=activityRuleEditBtn]').attr('ruleid');
                            //add by zxy&zzx
                            //var start_date=$('#modal-dialog #datepicker').datepicker({dateFormat: "yy-mm-dd"}).val();
 							//var data={'activity_id':activity_id,'start_date':start_date};
 							//me.activityEditRequest(data);
                        } 
                    }
                }
                new Ajax(option);
            },
            activityRuleEditRequest:function(data){
                var option = {
                    url : activityRuleEditUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            json.hfive_activity_signin_rule_update_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_signin_rule_update_response);
                            $('#activityRuleAdd a[data-dismiss=modal]').click();
                            $('button[data_id=activityRule]').click();
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            pageShow:function(page_num,page_current,page_size){
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
            },
            awardDeliveryRequest:function(data){
                var option = {
                    url : awardDeliveryUrl,
                    data:data,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $('tr[award_id='+data.award_id+']').find('span[data_id=delivery]').removeAttr('data-target').addClass('grayView');
                            json.hfive_activity_award_logistics_save_response.code=1;
                            $rk.listener.trigger('tipsPhoton', 'success',json.hfive_activity_award_logistics_save_response);
                            $('#awardDelivery a[data-dismiss=modal]').click();
                        }else{
                            json.error_response.code=0;
                            $rk.listener.trigger('tipsPhoton', 'success',json.error_response);
                        } 
                    }
                }
                new Ajax(option);
            },
            renderTipsPhoton:function(data){
                var html = $rk.tplRender(dot, $('#j_view_tipsPhoton').html(), data||{});
                $('#j_con_tipsPhoton').html(html);
            },
            bindTipsPhoton:function(){
                $('.alert').fadeOut(10000,function(){
                    $('.alert .close').click();
                });
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});
