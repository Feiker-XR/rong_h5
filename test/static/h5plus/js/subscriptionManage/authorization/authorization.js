/* 
* @Author: Administrator
* @Date:   2015-12-31 15:07:39
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-21 10:44:08
*/
seajs.use(['Ajax','dot','socket','pnotify','bootstrap',], 
    function(Ajax,dot,socket,pnotify,bootstrap){

    var setModel = function() {

        var authorizationListUrl = $$r.routers.data.link.authorizationList,
            setsessionstoreidUrl = $$r.routers.data.link.setsessionstoreid,
            compyIdUrl = $$r.routers.data.link.compyId;
        //var nodejsUrl='rush.ruixuesoft.com:3001';
        var nodejsUrl='isvsocket.h5plus.net:3000';
        var session_id,
            hostUrl='http://'+window.location.host,
            homePage=hostUrl+'/pc/photon'+RKC.mainSuffix;

        var form = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me.render();
                    me.bind();
                    me.requestCompyId();
                    me.requestAuthorizationList();
                });
                $rk.listener.on('authorizationList', 'success', function(e, json) {
                    me.renderAuthorizationList(json);
                    me.bindAuthorizationList();
                });
                $rk.listener.on('tips', 'success', function(e, msg) {
                    $.pnotify({
                        title: '提示',
                        type: 'info',
                        text: msg
                    });
                });
            },
            container: $('#j_con_list'),
            render: function(data) {
                var html = $rk.tplRender(dot, $('#j_view_list').html(), data||{});
                this.container.html(html);
            },
            bind:function(){
                $('ul[data_id=navTop] li:first').unbind('click').click(function(){
                    window.parent.location.href=homePage;
                });
            },
            socketAbout: function() {
                var me=this;
                //连接websocket后端服务器
                var socket = io.connect('ws://'+nodejsUrl);
                socket.on('refresh', function (data) {
                    if(data.status!=null){
                        if(data.status=='success'){
                            //location.reload();
                            me.requestAuthorizationList();
                        }else{
                            $rk.listener.trigger('tips', 'success','socket调用失败！');
                        }
                    }
                });
                socket.emit('refresh', {'session_id':session_id});
            },
            bindAuthorizationList:function(){
                var me=this;
                //切换公众号
                var wx_id;
                $('div[data_id=authorizationStatus]').unbind('click').click(function(){
                    wx_id=$(this).attr('weixin_id');
                });
                $('#modal-dialog .btn-primary').unbind('click').click(function(){
                    var data={'wx_id':wx_id};
                    me.requestAuthorizationStatus(data);
                    $('a[data-dismiss=modal]').click();
                });
            },
            renderAuthorizationList:function(data){
                var html = $rk.tplRender(dot, $('#j_view_authorizationList').html(), data||{});
                this.container.find('ul[data_id=authorizationLists] li').not(':first').remove();
                this.container.find('ul[data_id=authorizationLists]').append(html);
            },
            requestAuthorizationList:function(){
                var option = {
                    url : authorizationListUrl,
                    dataType:'json',
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            $rk.listener.trigger('authorizationList', 'success',json);
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            requestAuthorizationStatus:function(data){
                var me=this;
                var option = {
                    url : setsessionstoreidUrl,
                    dataType:'json',
                    data:data,
                    type: 'post',
                    success: function(json) {
                        if(!json.error_response){
                            window.location.href=homePage;
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            },
            requestCompyId:function(){
                var me=this;
                var option = {
                    url : compyIdUrl,
                    dataType:'json',
                    type: 'get',
                    success: function(json) {
                        if(json.success){
                            var data=json.data;
                            session_id=data.session_id;
                            me.socketAbout();
                        }else{
                            $rk.listener.trigger('tips', 'success',json.error_response.msg); 
                        } 
                    }
                }
                new Ajax(option);
            }
        });
    }

    $Rk.plat.s(function(){
        setModel()
    })
});