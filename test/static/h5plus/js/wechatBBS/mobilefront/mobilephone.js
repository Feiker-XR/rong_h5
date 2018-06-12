(function(win) {
    var topiccount = 0;
    var wehcatid = 0;
    var component_appid=0;
    var wxname="";
    var albumobj={"head":"","name":""};  //专辑头像和昵称
    var prenum=1;
    var defimage="/static/h5plus/img/wechatBBS/mobilefront/defimage.png";
    var page_square_isinit=true;


    $(document).ready(function(obj) {

        //alert('映射');

        wxapi();
    });

    function init(obj) {




        //解决一个问题
        $(function() {
            //var $ul=$("#lazyLoadWrap").find("ul");
            //$(window).on('scroll', windowscroll);
            $(document).on('scroll', windowscroll);
        });


        /*
         reque({"ab":"sef"},requeurl.findegc,function(obj){
         ;
         });
         */

    }


    function windowscroll(){

                    console.log("===========scroll============");

                    if(square_panel._isscrolf==false){
                        $ (this).scrollTop (0)
                        return;
                    }
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    //console.log("==============================scroll:"+scrollTop+":#topic0:"+$("#topic0").offset().top+"::"+$("#topic1").offset().top);
                    //console.log("==============================getClientRects().height:"+$("#topic0")[0].getClientRects()[0].height);



                    var a = $('.ui-page-active').attr('ident');
                    if (a == 'page-find') {
                        //$("#topic0 .topic_content .err-popup").click();
                        //  $("#topic0 .topic_content .err-popup").trigger("click");
                        //
                        if(square_panel._isCollection==false){
                             for (var i = 0; i < topiccount; i++) {
                                 if (($("#topic" + i+square_panel._pagenum).offset().top <= scrollTop) && (scrollTop <= ($("#topic" + i+square_panel._pagenum).offset().top + $("#topic01")[0].getClientRects()[0].height))) {
                                 //console.log("==============================读取id topic"+i+"div 信息");

                                     //console.log("这个话题是否关注:"+$("#topic" + i+$("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-a").css());



                                         $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-a").css({
                                         "background-image": "url(" + $("#topic" + i+square_panel._pagenum).attr("head-ioc") + ")"
                                 });

                                     //console.log("这个话题是否关注:"+   $("#topic-head-find").attr("ised-f")+":tocidi:"+$("#topic-head-find").attr("topic-id")+":url地址:"+$("#topic" + i+square_panel._pagenum).attr("head-ioc"));
                                     var isflollow=$("#topic" + i+square_panel._pagenum).attr("is-follow");

                                     if( isflollow=="false"||isflollow==false){
                                         $("#topic-head-find").html("<span></span>关注");
                                     }else if( isflollow=="true" || isflollow==true){
                                         $("#topic-head-find").html("已关注");
                                     }


                                     $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-b").text($("#topic" + i+square_panel._pagenum).attr("author-name"));
                                 $("#topic-head-find").attr("topic-id", $("#topic" + i+square_panel._pagenum).attr("topic-id"));
                                 $("#topic-head-find").attr("wehcat-id", wehcatid);


                                 break;
                                 }
                             }
                        }  //square_panel._isCollection==false

                    }

                    if (scrollTop == 0) {
                        //console.log("-------我到顶了-------");
                        var a = $('.ui-page-active').attr('ident');
                        if (a == 'page-find') {
                            h5sdk.wxOpenidReady(function(openid) {
                                window.openid = openid;
                                //square_panel.init();

                            });
                        }
                    }
                    var num = 1;
                    //console.log(scrollTop + windowHeight);
                    //console.log(scrollHeight);
                    console.log("==scrollTop==:" + scrollTop + ":windowHeight:" + windowHeight + ":scrollHeight:" + scrollHeight+":document.body.scrollTop:"+document.body.scrollTop+":windows height:"+$(window).height());
                   // if (scrollTop + windowHeight == scrollHeight) {
                        if (scrollTop + $(window).height() == scrollHeight) {

                        console.log("-------我到底了-------");

                        var a = $('.ui-page-active').attr('ident');
                        if (a == 'page-find') {

                            if (square_panel._curalbum != null) {
                                square_panel.getdata();
                            } else if (square_panel._curautor != null) {
                                square_panel.getauthordata();
                            }

                            //

                        } else if (a == 'page-square') {
                            page_square_isinit=false;
                            prenum++;
                             page_square._getfinddata({
                                'page_num': prenum,
                                 'page_size': 30,
                                 'wechat_id': wehcatid
                             });
                        } else if (a == 'page-personal-core') {

                        }
                        //$(this).scrollTop(windowHeight-(windowHeight-40));  //滑动块 反弹的效果
                    }
    };

    /**
     * @Description  错误处理函数
     * @createTime 2013-10-08
     * @updateTime 2013-10-08
     * @author 韩充满
     * @version 1.0
     */

    var err_fun = function(par) {
            alert("这是错误处理函数");

            //$("#collection-popup").popup("popup"); //打开
            //$("#collection-popup").popup("close");  //关闭

        }
        /**
         * @Description  正确处理函数
         * @createTime 2016-04-13
         * @updateTime 2016-04-13
         * @author 韩充满
         * @version 1.0
         */
    var suc_fun = function(par) {
        //alert("这是正确处理函数");
        //$("#collection-popup").popup("popup");
    }

    /**
     * @Description  发现面板
     * @createTime 2013-10-08
     * @updateTime 2013-10-08
     * @author 韩充满
     * @version 1.0
     */




    /**
     
     * [page_square 发现专辑]
     * @type {Object}
     */
    var page_square = {
        init: function(num, size) {
            var dataJson = {
                'page_num': 1,
                'page_size': 30,
                'wechat_id': wehcatid
            };
            prenum=1;
            page_square_isinit=true;
            this._getfinddata(dataJson);

        },
        _collectSpecial:function (data,divflows,divflowf){
            var _this=this;
            reque(data,requeurl.collectSpecial,function (obj){
                if (obj.hfive_community_found_album_collect_response) {
                   //收藏成功
                   //alert(obj.hfive_community_found_album_collect_response.message);

                    divflows.html("已收藏 <input type='button' value='已收藏'>");
                    divflowf.attr('iscollect','Y');

                    page_personal_core.init();
                    //divflows.a
                }
                if (obj.error_response) {

                    alert(obj.error_response.msg);
                }
            });
        },
        _uncollectSpecial:function (data,divflows,divflowf){
            var _this=this;
            reque(data,requeurl.unsquareCollection,function (obj){
                if (obj.hfive_community_found_album_cancelcollect_response) {
                    //收藏成功
                    //alert(obj.hfive_community_found_album_collect_response.message);
                    divflows.html("+收藏 <input type='button' value='+收藏'>");
                    divflowf.attr('iscollect','N');

                    page_personal_core.init();

                }
                if (obj.error_response) {

                    alert(obj.error_response.msg);
                }
            });
        },
        _getfinddata: function(data) {
            var _this = this;

            reque(data, requeurl.pageSquare, function(obj) {
                if (obj.hfive_community_found_album_findpaging_response) {

                     _this._rend(obj);
                }

            });
        },
        _rend: function(json) {
            var _this=this;
            var data = json.hfive_community_found_album_findpaging_response.albums.album;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                if(data[i].author_type==1){
                    data[i].author_name="小编";

                }

                var precollectionimg=defimage;
                if(data[i].album_pic_url==null ){
                }else if( data[i].album_pic_url==undefined ){
                }else if(data[i].album_pic_url==""){
                }else{precollectionimg=data[i].album_pic_url;}

               // if(data[i].album_collect_yn=="Y"){
                    //收藏
               // }else{

                    //为收藏
               // }

                html += '<div class="ui-block-a" style="text-align: right;"><img id=albumimg'+data[i].album_id+' src="' + precollectionimg + '" alt=""></div></div>';
                html += '<div class="ui-block-b" >';
                html += '<div class="ui-bar ui-bar-a"><a href="#page-find" data-transition="slide" style="border-right-width: 0px; text-decoration: none;color:black;display: block;width: 156px;font-size: 16px !important; margin: -11px -16px !important; padding: .7em 1em !important; background-color:white;     text-align: left !important; " albumId="' + data[i].album_id + '" isCollect="'+data[i].album_collect_yn+'" class="album-fun square_href"><div class="album_content" ><div id="albumname'+data[i].album_id+'" class="aggregate_name">' + data[i].album_name + '</div><div class="producer"><span>制作人:</span><span>' + data[i].author_name + '</span></div><div class="ui-btn ui-input-btn ui-corner-all ui-shadow ui-flowc" style="height: 20px !important;">' + (data[i].album_collect_yn == 'Y' ? '已收藏' : '+收藏') + '<input type="button" value="+收藏"></div></div>';
                html += '</div></a>';
                html += '</div>';
            }
            if(page_square_isinit==true){
                $('#page-square .ui-content .ui-grid-a').html(html);
            }else{
                $('#page-square .ui-content .ui-grid-a').append(html);
            }


            //album-fun  square_href
            $('.album-fun').on('click', function() {
                //标识是否是收藏或已收藏：0 收藏，1已收藏
                //var ic='1';
                //if ($(this).attr('isCollect')=='Y') {
                //    ic='0';
                //}
                //Y 是已收藏  显示 已收藏 N 为收藏 显示 收藏
                albumobj.head=$('#albumimg'+$(this).attr('albumId')).attr("src");
                albumobj.name=$("#albumname"+$(this).attr('albumId')).text();

                square_panel.getsquaretopic($(this).attr('albumId'),$(this).attr('isCollect'));
            });
            //点击收藏按钮
            //.ui-flowc
            //.ui-shadow
            $('.ui-flowc').on('click', function(event) {
                var dataJson={
                    'album_id':$(this).parent().parent().attr('albumId')
                };
                var divflows=$(this);
                var divflowf=$(this).parent().parent();

                if(divflowf.attr('iscollect')=='N') {
                    _this._collectSpecial(dataJson,  divflows,divflowf);
                }else if(divflowf.attr('iscollect')=='Y'){
                    _this._uncollectSpecial(dataJson, divflows,divflowf);
                }
                return false;
            });
        },
        find: function() {

        }
    };
    /**
     * [page_personal_core 个人中心]
     * @type {Object}
     */
    var page_personal_core = {
        init: function() {
            var dataJson = {
                'author_id': ''
            };

            //调用的 作者话题的api
            this._getfinddata(dataJson);

            var dataBrand = {
                'open_id': ''
            };

            //个人收藏专辑列表
            this._getBrandHead(dataBrand);

            this._getUserInfor();


        },

        _getUserInfor:function(){
            var _this = this;
            reque({"component_appid":component_appid,"weixin_account":wehcatid}, requeurl.getcuruser, function(obj) {
                if (obj.external_weixin_userdetailinfo_get_response) { //personalCollect hfive_community_personal_album_findlist_response
                    var usrinfro=obj["external_weixin_userdetailinfo_get_response"].wxuserinfo;
                    //usrinfro.nick_name
                    //usrinfro.head_image_url;
                    //debugger;
                    if(usrinfro != undefined){
                        //需要头像+个人昵称
                        $("#wx_name_per").html("<div style='background-image: url("+usrinfro.head_image_url+")'></div><div>"+usrinfro.nick_name+"</div>");
                        wxname=usrinfro.nick_name;
                        //<div></div>
                        //<div>微信昵称</div>
                    }
                }else{
                    alert(obj.error_response.msg);
                }

            });
        },

         //调用的 作者话题的api
        _getfinddata: function(data) {
            var _this = this;
            reque(data, requeurl.brandHead, function(obj) {

                if (obj.hfive_community_personal_authorfollow_findlist_response) { //personalCollect hfive_community_personal_album_findlist_response
                    _this._rend(obj);
                }else{
                    alert(obj.error_response.msg);
                }
            });
        },
        //个人收藏专辑列表
        _getBrandHead: function(data) {
            var _this = this;
            reque(data, requeurl.personalCollect, function(obj) {
                if (obj.hfive_community_personal_albumcollect_findlist_response) {
                    _this._rendOne(obj);
                }else{
                    alert(obj.error_response.msg);
                }
            });
        },
         //调用的 作者话题的api
        _rend: function(json) {
            var _this=this;
            //hfive_community_personal_album_findlist_response
            var data = json.hfive_community_personal_authorfollow_findlist_response.authors.author;
             $('.brand_num').text('(' + data.length + ')');
                var html = '';
                for (var i = 0; i < data.length; i++) {

                    if(data[i].topic_count<0){
                        data[i].topic_count=0;
                    }

                    var precollectionimg=defimage;
                    if(data[i].album_pic_url==null ){
                    }else if( data[i].album_pic_url==undefined ){
                    }else if(data[i].album_pic_url==""){
                    }else{precollectionimg=data[i].album_pic_url;}

                    html += '<div class="ui-bar ui-bar-a"><a href="#page-find" data-transition="slide" style="display: block;width: 100%;height: 79px;font-size: 16px !important; margin: -11px -16px !important; padding: .7em 1em !important; background-color:white;     text-align: left !important; " class="square_href author-fun" authorId="'+data[i].author_id+'">';
                    html += '<div>';
                    html += '<img src="' + precollectionimg + '" alt=""></div><div class="collect_content"><div style=""><div>' + data[i].author_name + '</div><div style=""> <span>话题:' + data[i].topic_count + '</span>&nbsp;&nbsp;<span>粉丝:'+data[i].fans_count+'</span> </div></div><div></div></div>';
                    html += '</div>';
                    html += '</a></div>';
                }
             $('#slideUpAuthor').html(html);
            //slideUpAuthor
            //.square_href
             $('.author-fun').on('click', function(obj) {
                    // console.log('个人中心作者传参：',$(this).attr('authorId'));

                    square_panel.getautortopiclist($(this).attr('authorId'));
              });
            _this._shrinkhidebar();

        },
        _shrinkhidebar:function(){
            //touchstart touchsend
            $("#flowhead").unbind( "touchstart");

            var _flowF=true;  //合
            var _autoF=true;  //合

            $('#flowhead').on('touchstart', function(obj) {
                $('#slideUpTest').slideToggle(400);
                if(_flowF==true){
                    $('#flowimg').css({"transform":"rotate(0deg)"});
                    _flowF=false;
                }else{
                    _flowF=true;
                    $('#flowimg').css({"transform":"rotate(180deg)"});
                }

            });


            $('#slideUpTest').slideToggle(400);
            $('#flowimg').css({"transform":"rotate(-180deg)"});
            $('#autoimg').css({"transform":"rotate(-180deg)"});

            $("#authorhead").unbind( "touchstart" );
            $('#authorhead').on('touchstart', function() {
                $('#slideUpAuthor').slideToggle(400);
                if(_autoF==true){
                    $('#autoimg').css({"transform":"rotate(0deg)"});
                    _autoF=false;
                }else{
                    _autoF=true;
                    $('#autoimg').css({"transform":"rotate(180deg)"});
                }
            });
            $('#slideUpAuthor').slideToggle(400);

        },

        _shrinkhide:function(){
            //touchstart touchsend
                    $("#slideud").unbind( "touchstart");

                    var _flowF=true;  //合
                    var _autoF=true;  //合

                    $('#slideud').on('touchstart', function(obj) {
                        $('#slideUpTest').slideToggle(400);
                        if(_flowF==true){
                            $('#flowimg').css({"transform":"rotate(0deg)"});
                            _flowF=false;
                        }else{
                            _flowF=true;
                            $('#flowimg').css({"transform":"rotate(180deg)"});
                        }

                    });


                    $('#slideUpTest').slideToggle(400);
                    $('#flowimg').css({"transform":"rotate(-180deg)"});
                    $('#autoimg').css({"transform":"rotate(-180deg)"});

                    $("#slideUpDown").unbind( "touchstart" );
                    $('#slideUpDown').on('touchstart', function() {
                        $('#slideUpAuthor').slideToggle(400);
                        if(_autoF==true){
                            $('#autoimg').css({"transform":"rotate(0deg)"});
                            _autoF=false;
                        }else{
                            _autoF=true;
                            $('#autoimg').css({"transform":"rotate(180deg)"});
                        }
                    });
                    $('#slideUpAuthor').slideToggle(400);

        },

        //个人收藏专辑列表
        _rendOne: function(json){
            if (json.hfive_community_personal_albumcollect_findlist_response.albums != null) {
                var data = json.hfive_community_personal_albumcollect_findlist_response.albums.album;
                $('.collect_num').text('(' + data.length + ')');
                var html = '';
                for (var i = 0; i < data.length; i++) {

                    if(data[i].topic_count<0){
                        data[i].topic_count=0;
                    }

                    //defimage
                    var precollectionimg=defimage;
                    if(data[i].album_pic_url==null ){
                    }else if( data[i].album_pic_url==undefined ){
                    }else if(data[i].album_pic_url==""){
                    }else{precollectionimg=data[i].album_pic_url;}



                    html += '<div class="ui-bar ui-bar-a"><a href="#page-find" data-transition="slide" style="text-decoration: none;color:block;display: block;width: 100%;height: 79px;font-size: 16px !important; margin: -11px -16px !important; padding: .7em 1em !important; background-color:white;     text-align: left !important; " class=" pre-album-fun square_href" albumId="' + data[i].album_id + '">';
                    html += '<div>';
                    html += '<img id="pre-albumimg'+data[i].album_id+'"+ src="' + precollectionimg + '" alt=""></div><div class="collect_content"><div style=""><div id="pre-albumname'+data[i].album_id+'"  >' + data[i].album_name + '</div><div style=""> <span>话题:' + data[i].topic_count + '</span>&nbsp;&nbsp;<span style="display: none;">品牌:3</span> </div></div><div></div></div>';
                    html += '</div>';
                    html += '</a></div>';
                }

                $('#slideUpTest').html(html);
                
                $('.pre-album-fun').on('click', function() {
                    // console.log('个人中心收藏传参：',$(this).attr('albumId'));

                    albumobj.head=$('#pre-albumimg'+$(this).attr('albumId')).attr("src");
                    albumobj.name=$("#pre-albumname"+$(this).attr('albumId')).text();

                    square_panel.getsquaretopic($(this).attr('albumId'),'true'); //1  0
                });
            } else {
                console.warn("json.hfive_community_personal_authorfollow_findlist_response.authors 数据 为空！！");
            }

        },
        find: function() {

        }
    };


    /**
     * @Description  广场面板
     * @createTime 2016-04-13
     * @updateTime 2016-04-13
     * @author 韩充满
     * @version 1.0
     */
    var square_panel = {
        swiper: null,
        _pagenum: 1,
        _pagesize: 30,
        _f: true,
        _count: 1,
        _curtopcid: 0,
        _curid: 0,
        _commentcount: 1,
        _disf: true,
        _curalbum: 0,
        _curautor: null,
        _isCollection:false,  //true 收藏  false关注
        _ised:false,           // true 已收藏 已关注  false 未收藏 未关注
        _isscrolf:true,
        _isinit:true,              //初始化
        scrollfun: function() {
            var pagenum = 1,
                _this = this;
            $(".alertList").scroll(function(obj) {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(this)[0].scrollHeight;
                var windowHeight = $(this).height();
                console.log("==windowHeight====:" + windowHeight + ":scrollHeight-scrollTop:" + (scrollHeight - scrollTop));
                if ((scrollHeight - scrollTop) == windowHeight) { //-10
                    console.log("=====alertList此处调用翻页=====");
                    if (_this._disf == true) {
                        _this._disf = false;
                        var pagecount = parseInt(_this._commentcount / _this._pagesize);
                        if ((_this._commentcount % _this._pagesize) > 0) {
                            pagecount++;
                        }
                        pagenum++;
                        if (pagenum > pagecount) {
                            pagenum = pagecount;
                            return;
                        }
                        _this._gettopicomment(_this._curtopcid, _this._curid, pagenum, _this._pagesize, function() {
                            _this._disf = true;
                        });
                    }

                    //$(this).scrollTop(windowHeight-(windowHeight-40));  //滑动块 反弹的效果
                    obj.stopPropagation();
                }
                obj.stopPropagation();
            });
        },
        init: function() {
            //alert_content
            //alert("init");
            this._isinit=true;

            this._getdata(1, this._pagesize);

            $("#find-header").show();
            $("#find-footer").show();
            //this._gettopicount("sef",23);

        },

        setalbumhead:function(){
            var albumhead='<div data-role="navbar" data-iconpos="bottom" class="ui-navbar" role="navigation"> \
                <ul class="ui-grid-b"> \
                <div data-iconpos="bottom" data-position="left" class="portrait ui-block-a"></div> \
                <div data-iconpos="bottom" data-position="left" class="nickname ui-block-b"></div> \
            <div style="float: right;padding-right: 25px;" class="ui-block-c"> \
            <!--  data-role="button" class="bnt" --> \
                <a href="#" id="topic-head-find" class="topic-head ui-link ui-btn" data-transition="slideup" data-id="123" topic-id="123334" wehcat-id="gh_e611846d32ee" fun-follow="follow" style="float: right;">+关注</a> <!-- page-input-method --> \
                </div> \
                </ul> \
                </div>'

        },

        setauthorhead:function(){
            var authorhead='<div data-role="navbar" data-iconpos="bottom" class="ui-navbar" role="navigation"> \
                <ul class="ui-grid-b"> \
                <div data-iconpos="bottom" data-position="left" class="portrait ui-block-a"></div> \
                <div data-iconpos="bottom" data-position="left" class="nickname ui-block-b">1微信昵称</div> \
            <div style="float: right;padding-right: 25px;" class="ui-block-c"> \
            <!--  data-role="button" class="bnt" --> \
                <a href="#" id="topic-head-find" class="topic-head ui-link ui-btn" data-transition="slideup" data-id="123" topic-id="123334" wehcat-id="gh_e611846d32ee" fun-follow="follow" style="float: right;">+关注</a> <!-- page-input-method --> \
                </div> \
                </ul> \
                </div>'
        },

        /*
         * 获取广场话题列表 其它模块调用
         * @type {Var} 无
         * @function _getdata
         * @memberof square_panel.prototype
         * @albumid {Object}  专辑id
         * @private
         * @return
         */
        getsquaretopic: function(albumid,_fl) {
            var isf=false;
            this._curalbum = albumid;
            this._curautor = null;
            this._isCollection=true;
            this._pagenum=1;
            this._count=1,
            this._isinit=false;

            $(".data-square").html("");
            this._getdata(1, this._pagesize,undefined,albumid);
            //专辑 为收藏

            if(_fl=='Y'){
                $("#topic-head-find").html('已收藏');
                $("#topic-head-find").attr('ised-f','true');
                isf=true;
            }else{
                $("#topic-head-find").html('<span></span>收藏');
                $("#topic-head-find").attr('ised-f','false');
                isf=false;
            }

            this._sethead({
                "headioc": albumobj.head,
                "authorname":albumobj.name,
                "topicid": albumid,
                "wehcatid": wehcatid,
                "ised":isf
            });


            /*
            if(_fl=='Y'){
                this._ised=false;
                $("#topic-head-find").html('<span></span>收藏');
                $("#topic-head-find").attr('ised-f','true');
            }else{
                this._ised=true;
                $("#topic-head-find").html('已收藏');
                $("#topic-head-find").attr('ised-f','false');
            }
            */
            //_fl ‘0’ 收藏  ‘1’ 已收藏
        },
        /*
         * 获取作者话题列表
         * @type {Var} 无
         * @function _getdata
         * @memberof square_panel.prototype
         * @albumid {Object}  专辑id
         * @private
         * @return
         */
        getautortopiclist: function(authorid) {
            this._curalbum = null;
            this._curautor = authorid;
            this._isinit=false;
            this._pagenum=1;
            this._count=1,

            $(".data-square").html("");
            this.getauthordata();


            this._isCollection=false;

            this._ised=true;
            $("#topic-head-find").html('已关注');
            $("#topic-head-find").attr('ised-f','false');



        },

        _getautortopiclist: function(pagenum, pagesize, fun, _curauthorid) {
            this._curautor = _curauthorid;
            this._curalbum = null;
            var _this=this;
            var par = {
                "page_num": pagenum,
                "page_size": pagesize,
                "author_id": _curauthorid
            }
            reque(par, requeurl.getautortopic, function(obj) {
                var resp="hfive_community_personal_authortopic_findpaging_response";

                if (obj[resp] != undefined) {
                    if (pagenum > 1) {
                        _this._rendtopic(obj[resp], true);
                    } else {
                        _this._rendtopic(obj[resp], false);
                    }

                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }

                if (fun != undefined) {
                    fun();
                }

            });
        },

        getdata: function() {
            var _this = this;

            if (this._f == true) {
                this._f = false;
                var pagecount = parseInt(this._count / this._pagesize);
                if ((this._count % this._pagesize) > 0) {
                    pagecount++;
                }
                this._pagenum++;
                if (this._pagenum > pagecount) {
                    this._pagenum = pagecount;
                    return;
                }
                this._getdata(_this._pagenum, _this._pagesize, function() {
                    _this._f = true;
                }, _this._curalbum);

            }
        },
        getauthordata: function() {
            var _this = this;

            //if (this._f == true) {
            //    this._f = false;
                var pagecount = parseInt(this._count / this._pagesize);
                if ((this._count % this._pagesize) > 0) {
                    pagecount++;
                }else{
                    this._pagenum++;
                }


                if (this._pagenum > pagecount) {
                    this._pagenum = pagecount;
                    return;
                }

                this._getautortopiclist(_this._pagenum, _this._pagesize, function() {

                  //  _this._f = true;
                }, _this._curautor);

          //  }
        },

        /**
         * 获取广场话题列表
         * @type {Var} 无
         * @function _getdata
         * @memberof square_panel.prototype
         * @param {Object}  json
         * @private
         * @return
         */
        _getdata: function(pagenum, pagesize, fun, _curalbum) {
            var _this = this;
            var par;

            if (_curalbum != null && _curalbum != 0) {
                par = {
                    "page_num": pagenum,
                    "page_size": pagesize,
                    "album_id": _curalbum
                }
            } else {
                par = {
                    "page_num": pagenum,
                    "page_size": pagesize
                }
            }

            reque(par, requeurl.findegc, function(obj) {
                if (obj["hfive_community_square_topic_findpaging_response"] != undefined) {
                    if (pagenum > 1) {
                        _this._rendtopic(obj["hfive_community_square_topic_findpaging_response"], true);
                    } else {
                        _this._rendtopic(obj["hfive_community_square_topic_findpaging_response"], false);
                    }

                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }

                if (fun != undefined) {
                    fun();
                }

            });

        },
        _sethead: function(jsondata) {

            $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-a").css({
                "background-image": "url(" + jsondata.headioc + ")"
            });
            $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-b").text(jsondata.authorname);

           // $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-c .topic-head").attr("topic-id", jsondata.topicid);
            //$("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-c .topic-head").attr("wehcat-id", jsondata.wehcatid);
            $("#topic-head-find").attr("topic-id", jsondata.topicid);
            $("#topic-head-find").attr("wehcat-id", jsondata.wehcatid);
            $("#topic-head-find").attr("data-id", this._curalbum);
            $("#topic-head-find").attr("ised-f",jsondata.ised);

            if(this._isCollection==true){

                /*
                if(jsondata.ised==true){
                    $("#topic-head-find").html("<span></span>收藏");
                }else if(jsondata.ised==false){
                    $("#topic-head-find").html("已收藏");
                }
                */
            }else{
                if(jsondata.ised==true){
                    $("#topic-head-find").html("<span></span>关注");
                }else if(jsondata.ised==false){
                    $("#topic-head-find").html("已关注");
                }
            }
            $("#topic-head-find").show();
        },
        _rendtopic: function(json, _f) {

            //<a href='#collection-popup' data-rel='popup' class='ui-btn' data-transition='slideup'  ><span  ><img class='fun-share' data-id='"+json.topics.topic[i].topic_id+"' src='/h5plus/img/wechatBBS/mobilefront/fenxiang.png' alt='placeholder+image'></span><span class='fun-share' data-id='"+json.topics.topic[i].topic_id+"' >分享</span></a>
            //swiper-no-swiping
            var topichtml = "",_f=true,
                _this = this,
                imgsarr=null,
                totic=null;

            cacheos.clearcache();

            if(_this._isCollection==true){  //收藏
                /*
                if(_this._ised==false){
                    _f=true;
                }else{
                    _f=false;
                }
                _this._sethead({
                    "headioc": albumobj.head,
                    "authorname":albumobj.name,
                    "topicid": "124",
                    "wehcatid": wehcatid,
                    "ised":_f
                });
                */
            }else{

                if(_this._ised==false){
                    _f=true;
                }else{
                    _f=false;
                }
                _this._sethead({
                    "headioc": "",
                    "authorname": "",
                    "topicid": "124",
                    "wehcatid": wehcatid,
                    "ised":_f
                });
            }



            _this._count = json.total;
            if (json.topics != undefined) {
                totic=json.topics;
                topiccount = json.topics.topic.length;
                for (var i = 0; i < json.topics.topic.length; i++) {
                  if(_this._isCollection==false){
                            if (i == 0) {
                                var flag=true;
                                if(json.topics.topic[i].author_follow_yn=="N"){
                                    flag=true;
                                }else if(json.topics.topic[i].author_follow_yn=="Y"){
                                    flag=false;
                                }

                                _this._sethead({
                                    "headioc": json.topics.topic[i].author_head,
                                    "authorname": json.topics.topic[i].author_name,
                                    "topicid": json.topics.topic[i].topic_id,
                                    "wehcatid": wehcatid,
                                    "ised":flag
                                });
                            }
                  }


                    //保存缓存
                    cacheos.setdata(json.topics.topic[i].topic_id, JSON.stringify(json.topics.topic[i]));

                    var isflag=true;
                    if(json.topics.topic[i].author_follow_yn=="N"){
                        isflag=false;
                    }else{
                        isflag=true;
                    }

                    topichtml += "<div id='topic" + i +_this._pagenum+"'  class='topic'  is-follow='"+isflag+"' topic-id='" + json.topics.topic[i].topic_id + "' head-ioc='" + json.topics.topic[i].author_head + "'  author-name='" + json.topics.topic[i].author_name + "'> \
                     <div class='topic_head'>  \
                     <div class='swiper-container'> \
                     <div class='swiper-wrapper'>";
                    if (json.topics.topic[i].topic_imgs != undefined) {

                        imgsarr=json.topics.topic[i].topic_imgs.topic_img;


                        for (var j = 0; j < json.topics.topic[i].topic_imgs.topic_img.length; j++) {
                            topichtml += '<div class="swiper-slide "> <img id="img'+json.topics.topic[i].topic_imgs.topic_img[j].img_id+'" src="' + json.topics.topic[i].topic_imgs.topic_img[j].img_url + '" /></div>';
                            //fro 标签
                            if (json.topics.topic[i].topic_imgs.topic_img[j].img_tags != undefined) {
                                topichtml += ' <div class="lable-class"> ';
                                for (var L = 0; L < json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag.length; L++) {
                                    topichtml += '<div id="woodlable'+json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].tag_id+'"   class="lablesty" data-url="' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_page_url + '" style="margin-left: ' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].point_left + 'px;margin-top:' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].point_top + 'px;" data-url="' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_url + '"><div class="lablepoint"><div class="lablepointspmall"></div></div> <div class="woodssty">' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_name + '</div></div> ';
                                }
                                topichtml += ' </div> ';
                            }
                        }



                    } else {
                        console.error("json.topics.topic[i].topic_imgs", "json.topics.topic[i].topic_imgs error");
                    }

                    //static/h5plus/img/wechatBBS/mobilefront/fenxiang.png
                    topichtml += "</div> \
                     <div class='swiper-pagination'></div> \
                     </div>  \
                     </div> \
                      <div class='topic_content'> \
                       <div>  \
                         <div >\
                        <span>" + json.topics.topic[i].topic_title + "</span>  \
                        </div>  \
                        <div> \
                        <a href='#' data-rel='popup' class='ui-btn bnt-collection' data-transition='slideup' style='display: none;'  ><span><img  data-id='" + json.topics.topic[i].topic_id + "' src='/static/h5plus/img/wechatBBS/mobilefront/collection.png' alt='placeholder+image'></span><span class='fun-collection' data-id='" + json.topics.topic[i].topic_id + "' >收藏</span></a> \
                        <a href='#' data-rel='popup' class='ui-btn already-collection' data-transition='slideup'  ><span><img style='width:16px;height: 16px; padding-bottom: 0px;' class='fun-share'  topic-id='topic" + i +_this._pagenum+ "' data-id='" + json.topics.topic[i].topic_id + "' src='/static/h5plus/img/wechatBBS/mobilefront/share.png' alt='placeholder+image'></span><span class='fun-share' style='font-family: fzlt;font-size: 13px;display: inline-block;width: 26px !important;' topic-id='topic" + i +_this._pagenum+ "'  data-id='" + json.topics.topic[i].topic_id + "' >分享</span></a> \
                        </div> \
                        <div>  \
                        <a href='#collection-popup' data-rel='popup' data-transition='turn'  data-role='button' class='ui-link ui-btn ui-shadow ui-corner-all err-popup collection-bnt'>收藏</a>  \
                        </div> \
                          </div> \
                        <div><p> <span style='width: 25px;display:inline-block;'></span> <span style='word-break: break-all;word-wrap: break-word;'>" + json.topics.topic[i].topic_body + "</span></p></div> \
                    </div>\
                        <div><div style='background-color: #f5f5f5; height: 3px;'><div class='borderStyle'></div><div class='borderStyle' style='margin: -11px !important;width: 1080px;'></div></div></div>\
                        <div class='topic_comment'> \
                    <p style='margin-bottom: 23px;'><b>点评</b><span class='remarkcount'>(231)</span> <span class='comment' data-id='" + i +_this._pagenum+ "' topic-id='" + json.topics.topic[i].topic_id + "' topic-id-id='topic" + i +_this._pagenum+ "' ><label class='comment-tabel' data-id='" + i+_this._pagenum + "' topic-id='" + json.topics.topic[i].topic_id + "' topic-id-id='topic" + i+_this._pagenum + "' style='font-size: 13px;'>写评论</label ></span></p>  \
                    <textarea class='ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow comment-content' style='height: 60px;display:none; '></textarea>  \
                    <div class='topic_Info'>  \
                        </div>  \
                        ";


                    var boomhtml = '<div class="borderStyle"></div>\
                        <div class="selectAll" data-id="topic' + i+_this._pagenum + '" topic-id="' + json.topics.topic[i].topic_id + '">\
                        <p>查看全部点评</p>\
                        </div>\
                        <img class="fenxiangjt" src="/static/h5plus/img/wechatBBS/mobilefront/gongxiang.png" alt="">\
                        <div class="divZZ" data-id="topic' + i +_this._pagenum+ '">\
                        </div> \
                         <div class="alertList" > \
                          </div> \
                        </div> </div>';
                    topichtml += boomhtml;

                    _this._gettopicomment("topic" + i+_this._pagenum, json.topics.topic[i].topic_id, 1, _this._pagesize);

                    _this._gettopicount("topic" + i+_this._pagenum, json.topics.topic[i].topic_id);

                }



            } //if(json.topics != undefined){




                if(topiccount==0){
                    $(".data-square").html(topichtml);
                }else
                if (_f == true) {
                    $(".data-square").append(topichtml);
                } else {
                    $(".data-square").html(topichtml);
                }



            _this.swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                noSwiping: true
            });

            _this.scrollfun();

                _this._setlablepos(totic);

            $("#find-header").show();
            $("#find-footer").show();


        }, //fun over

        _setlablepos:function(topics){
            var h=200,w=100,
                hratio =h/200,
                wratio=100/314,
                lableleft= 0,
                labletop=0;

            if(topics !=null)
            for (var i = 0; i < topics.topic.length; i++) {
                if (topics.topic[i].topic_imgs != undefined) {

                    var imgs=topics.topic[i].topic_imgs.topic_img;
                    if(imgs != null){
                        for (var j = 0; j < imgs.length; j++) {
                            //fro 标签

                            w=$("#img"+imgs[j].img_id).width();

                            wratio=w/314;
                            if (imgs[j].img_tags != undefined) {
                                for (var L = 0; L < imgs[j].img_tags.img_tag.length; L++) {
                                    lableleft=imgs[j].img_tags.img_tag[L].point_left*wratio;
                                    lableleft=lableleft+26; //远点的宽度
                                    labletop=imgs[j].img_tags.img_tag[L].point_top;
                                    console.log("imgwidth:"+w);
                                    console.log("#img"+imgs[j].img_id+"left:"+imgs[j].img_tags.img_tag[L].point_left+":point_top:"+labletop+":lableleft:"+lableleft+":labletop:"+labletop);
                                    $("#woodlable"+imgs[j].img_tags.img_tag[L].tag_id).css({"margin-left":lableleft,"margin-top":labletop});


                                }

                            }
                        }
                    } //if(imgs != null){
                }
            }


        },

        /**
         * 获取广场话题列表
         * @type {Var} 无
         * @function _gettopicomment
         * @memberof square_panel.prototype
         * @param {Object}  json
         * @private
         * @return
         */
        _gettopicomment: function(topicid, id, pagenum, pagesize, fun) {
            var _this = this;

            reque({
                "topic_id": id,
                "page_num": pagenum,
                "page_size": pagesize
            }, requeurl.getcomment, function(obj) {
                if (obj["hfive_community_square_topiccomment_findpaging_response"] != undefined) {

                    var showcommen = "";
                    var allcomment = "";
                    var jsondata = obj["hfive_community_square_topiccomment_findpaging_response"];
                    _this._commentcount = jsondata.total;
                    if (jsondata.comments != undefined)
                        for (var i = 0; i < jsondata.comments.comment.length; i++) {
                            if (i < 2) {
                                //调用评论函数
                                showcommen += '  <div class="wx_info"> \
                            <P class="wx_headImg"><img height="38px" width="38px" src="' + jsondata.comments.comment[i].head_url + '" alt="placeholder+image"></P> \
                            <span class="wx_Name">' + jsondata.comments.comment[i].nickname + '</span> \
                            <div class="wx_none"></div> \
                            <div class="wx_plContent"> \
                            <p>' + jsondata.comments.comment[i].comment_content + '</p> \
                            </div> \
                            </div>';
                            }
                            //所有评论展示
                            allcomment += '  <div class="alert_content"> \
                        <P class="alert_wxhead"> \
                        <img height="38px" width="38px" src="' + jsondata.comments.comment[i].head_url + '" alt="placeholder+image"> \
                        </P> \
                        <span>' + jsondata.comments.comment[i].nickname + '</span> \
                        <div></div> \
                        <div> \
                        <p>' + jsondata.comments.comment[i].comment_content + '</p> \
                        </div> \
                        </div>';
                        }

                    $("#" + topicid + " .topic_comment .topic_Info").html(showcommen);
                    if (pagenum > 1) {
                        $("#" + topicid + " .topic_comment .alertList").append(allcomment);
                    } else {
                        $("#" + topicid + " .topic_comment .alertList").html(allcomment);
                    }


                    _this._bind();

                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }
                if (fun != undefined) {
                    fun();
                }

            });
        },
        _gettopicount: function(topicid, id) {
            var _this = this;

            reque({
                "topic_id": id
            }, requeurl.gettopiccount, function(obj) {

                if (obj["hfive_community_square_topiccomment_count_response"] != undefined) {
                    $("#" + topicid +" .topic_comment .remarkcount").html("(" + obj["hfive_community_square_topiccomment_count_response"].count + ")");
                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }
            });
        },
        _followauthor: function(par) {
            var _this = this;

            reque(par, requeurl.autorsfollow, function(obj) {

                if (obj["hfive_community_square_topicauthor_follow_response"] != undefined) {
                    //suc_fun(obj["hfive_community_square_topicauthor_follow_response"]);

                    $("#topic-head-find").html("已关注");
                    $("#topic-head-find").attr("ised-f",false);

                    page_personal_core.init();

                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                    $("#topic-head-find").attr("ised-f",true);
                    $("#topic-head-find").html("<span></span>关注");
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                    $("#topic-head-find").attr("ised-f",true);
                    $("#topic-head-find").html("<span></span>关注");
                    page_personal_core.init();
                }


            });
        },
        _unfollowauthor:function(par){

            var _this = this;

            reque(par, requeurl.unsquarefollow, function(obj) {

                if (obj["hfive_community_square_topicauthor_cancelfollow_response"] != undefined) {
                    //suc_fun(obj["hfive_community_square_topicauthor_cancelfollow_response"]);
                    $("#topic-head-find").attr("ised-f",true);
                    $("#topic-head-find").html("<span></span>关注");
                    page_personal_core.init();
                } else if (obj["error_response"] != undefined) {
                    err_fun(obj["error_response"]);
                    $("#topic-head-find").attr("ised-f",false);
                    $("#topic-head-find").html("已关注");

                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                    $("#topic-head-find").attr("ised-f",false);
                    $("#topic-head-find").html("已关注");
                }

                page_personal_core.init();

            });

        },
        _headaction:function(par,urlstr,_isflow){

            reque(par, urlstr, function(obj) {
                if(_isflow==true){
                    if (obj["hfive_community_found_album_collect_response"] != undefined) {
                        //suc_fun(obj["hfive_community_found_album_collect_response"]);
                        $("#topic-head-find").text('已收藏');
                        $("#topic-head-find").attr('ised-f','true');
                        page_personal_core.init();
                        page_square.init();
                    } else if (obj["error_response"] != undefined) {
                        err_fun(obj["error_response"]);
                    } else {
                        err_fun({
                            "error_response": "服务器未返回错误信息"
                        });
                    }
                }else{

                    if (obj["hfive_community_found_album_cancelcollect_response"] != undefined) {
                        //suc_fun(obj["hfive_community_found_album_cancelcollect_response"]);
                        $("#topic-head-find").html('<span></span>收藏');
                        $("#topic-head-find").attr('ised-f','false');
                        page_personal_core.init();
                        page_square.init();
                    } else if (obj["error_response"] != undefined) {
                        err_fun(obj["error_response"]);
                    } else {
                        err_fun({
                            "error_response": "服务器未返回错误信息"
                        });
                    }
                }

            });
        },
        _createtioc: function(obj) {
            var _this = this;
            var topic = obj.topieid;
            var topic_id = obj.topic_id;
            reque(obj, requeurl.createtopic, function(obj) {

                if (obj["hfive_community_square_topiccomment_create_response"] != undefined) {
                    //suc_fun(obj["hfive_community_square_topiccomment_create_response"]);


                    _this._gettopicomment(topic, topic_id, 1, _this._pagesize);
                    _this._gettopicount(topic,topic_id);


                } else if (obj["error_response"] != undefined) {
                    //obj["error_response"].error_response=
                    //alert(" 请输入正确的评论信息！");
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }


            });
        },
        _bind: function() {
            var _this = this;

            $("#page-find").unbind("click");


            $("#upsquaredb").unbind("click");
            $("#upsquaredb").click(function(obj) {
                square_panel._isCollection=false;
                square_panel._ised=true;
                square_panel.init();
                //obj.stopPropagation();
            });

            $("#page-find").click(function(obj) {




                if ($(obj.target.parentElement).attr("class") == "selectAll") {

                    var pageid = $(obj.target.parentElement).attr("data-id");
                    var topicid = $(obj.target.parentElement).attr("topic-id");
                    var divZZ="#" + pageid + " .topic_comment .divZZ";
                    var alertList="#" + pageid + " .topic_comment .alertList";
                    _this._curtopcid = pageid;


                    $(window).off('scroll', windowscroll);
                   $('body').css({overflow:'hidden', position: 'fixed', width:'100%'});

                    $(divZZ).show();
                    $(alertList).show();
                    
                    //$(document).bind("touchmove",function(e){
                    //
                    //    if($(alertList)[0] === e.target || $.contains( $(alertList)[0], e.target)){
                    //
                    //    }else{
                    //        e.preventDefault();
                    //    }
                    //
                    //});

                    //$(window).unbind('scroll');

                }

                if ($(obj.target).attr("fun-follow") == "follow") {
                    var userid = $(obj.target).attr("wehcat-id");
                    var topicid = $(obj.target).attr("topic-id");
                    var albumidid = $(obj.target).attr("data-id");
                    var isedf = $(obj.target).attr("ised-f");
                    if(_this._isCollection==true){ // 收藏

                        // 估计时候 后端 逻辑改变 导致的 看到此代码和后端的逻辑是相反
                        /*
                        if(isedf == "true"){  // 未收藏
                            _this._headaction({"album_id":albumidid},requeurl.squareCollection,true);     //调用收藏
                        }else if(isedf == "false"){ // 已收藏
                            _this._headaction({"album_id":albumidid},requeurl.unsquareCollection,false);   //调用收藏
                        }
                        */
                        if(isedf == "false"){  // 未收藏  显示 收藏
                            _this._headaction({"album_id":albumidid},requeurl.squareCollection,true);     //调用收藏
                        }else if(isedf == "true"){ // 已收藏  显示 已收藏
                            _this._headaction({"album_id":albumidid},requeurl.unsquareCollection,false);   //调用收藏
                        }

                    }else if(_this._isCollection==false){ // 关注

                        if(isedf=="true"){  //未关注调用关注
                            _this._followauthor({
                                "wechat_id": userid,
                                "topic_id": topicid
                            });
                        }else if(isedf=="false"){
                            _this._unfollowauthor({
                                "wechat_id": userid,
                                "topic_id": topicid
                            });
                        }
                        //调用 关注


                    }
                    //_this._headaction

                }

                if ($(obj.target).attr("class") == "divZZ") {

                    var pageid = $(obj.target).attr("data-id");
                    $("#" + pageid + " .topic_comment .divZZ").hide();
                    $("#" + pageid + " .topic_comment .alertList").hide();

                    $('body').css({overflow:'', position: '', width:''});
                    $(window).off('scroll', windowscroll);
                    $(divZZ).hide();
                    $(alertList).hide();
                    //$(document).unbind("touchmove");
                   // $("#" + pageid + " .topic_comment .alertList").unbind("touchmove", function(e){

                        // if(e.target.className=="divZZ"){
                        //e.preventDefault();
                        //e.stopPropagation();
                        // }

                  //  }, false);


                    //windowscroll();

                    //$("#" + pageid + " .topic_comment .alertList").unbind("touchmove");
                }

                if ($(obj.target).attr("class") == "fun-share") {
                    var topicid = $(obj.target).attr("data-id");
                    var topic_id = $(obj.target).attr("topic-id");
                    event.stopPropagation();


                    $("#find-header").hide();
                    $("#find-footer").hide();


                    $("#" + topic_id + " .topic_comment .divZZ").click(function(obj){

                        window.location = "/static/h5plus/js/wechatBBS/mobilefront/share.html?topicid=" + topicid+"&wehcat_id="+wehcatid+"&pid="+configuration.pid+"&component_appid="+component_appid+"&wxname="+wxname;  //编码


                    });
                    $("#find-header").show();
                    $("#find-footer").show();

                    $("#" + topic_id + " .topic_comment .divZZ").show();
                    $("#" + topic_id + " .topic_comment .fenxiangjt").show();




                    //window.location = "/static/h5plus/js/wechatBBS/mobilefront/share.html?topicid=" + topicid;
                    //fun-share
                    //document.removeEventListener("touchmove");
                }

                if ($(obj.target).attr("class") == "comment" || $(obj.target).attr("class") == "comment-tabel") {
                    var pageid = "topic" + $(obj.target).attr("data-id");
                    var topicid = $(obj.target).attr("topic-id");

                    if ($(obj.target).text() == "写评论") {
                        $(obj.target).text("发布");
                        $("#" + pageid + " .topic_comment .comment-content").val("");
                        $("#" + pageid + " .topic_comment .comment-content").show();
                    } else {
                        $(obj.target).text("写评论");
                        $("#" + pageid + " .topic_comment .comment-content").hide();
                        //_this._gettopicomment("topic" + i, json.topics.topic[i].topic_id, 1, _this._pagesize);
                        var topieid = $(obj.target).attr("topic-id-id");

                        _this._createtioc({
                            "topic_id": topicid,
                            "comment_content": $("#" + pageid + " .topic_comment .comment-content").val(),
                            "topieid": topieid
                        });
                    }

                }

                if ($(obj.target.offsetParent).attr("class") == "lablesty") {
                    var url = $(obj.target.offsetParent).attr("data-url");
                    window.location = url;
                }


            });

        }
    }

    wehcatid = getRequest("wehcat_id");
    configuration.account = getRequest("wehcat_id");
    configuration.pid = getRequest("pid"); //obj.data._id;
    component_appid= getRequest("component_appid");

    //h5sdk.config({debug_mode: true});
    //configuration.componentAppid=obj.data.company_key;
    //初始化h5sdk
    h5sdk.wxOpenidInit(configuration.pid, configuration.account);

    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
       // find_panel.init();
    });
    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
       // find_panel.init(1, 5);
    });
    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        page_square.init();
    });
    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        page_personal_core.init();
    });

    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        init();
    });



    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        square_panel.init();
    });


    //http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/friend_share_20160420100445666.jpg
    ///static/h5plus/img/wechatBBS/mobilefront/tou.png
    function wxapi(){
        //http://test.h5plus.net/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?
        h5sdk.wxOpenidReady(function(openid) {

            h5sdk.wxInit(configuration.pid, configuration.account, function() {
                    h5sdk.wxShareToFriend('掌上社区',
                        "http://"+wxSharepath+"/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?wehcat_id="+wehcatid+"&pid="+configuration.pid+"&component_appid="+component_appid,
                        'http://'+wxSharepath+'/static/h5plus/img/wechatBBS/mobilefront/tou.png',
                        '人人都是生活的意见领袖，'+wxname+'向你推荐掌上社区!',
                        function(){
                            h5sdk.logShare('friend');
                            console.log('分享成功, 别忘记点个攒');
                        },
                        function() {
                            console.log('用户最后时刻放弃了分享');
                        }
                    );

                //tou
                    h5sdk.wxShareToTimeline('人人都是生活的意见领袖，'+wxname+'向你推荐掌上社区!',
                        "http://"+wxSharepath+"/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?wehcat_id="+wehcatid+"&pid="+configuration.pid+"&component_appid="+component_appid,
                        'http://'+wxSharepath+'/static/h5plus/img/wechatBBS/mobilefront/tou.png',
                        function(){
                            h5sdk.logShare('timeline');
                            console.log('分享成功, 别忘记点个攒');
                        },
                        function() {
                            console.log('用户最后时刻放弃了分享');
                        }
                    );
            });
        });




    }


    function showfollowqrcode(){
        $("#find-header").hide();
        $("#find-footer").hide();
        $('body').css({overflow:'hidden', position: 'fixed', width:'100%'});
        //$(".orcodescan").on("click",function(e){

       // })

        //component_appid	varchar	必须			应用ID
        //Account	varchar	必须	ruixue		微信帐号
        //SceneId	varchar	必须	20001		场景值ID
        //SceneType	varchar	必须	0		二维码类型 0 临时，1 永久
        //ExpireSeconds

        var par={"component_appid":component_appid,"Account":configuration.account,"SceneId":"20001","SceneType":"0","ExpireSeconds":"5000"};

        reque(par, requeurl.getwxrecodeimg, function(obj) {
            //obj["external_weixin_qrcode_get_response"].qrcode_url
            $(".orcodescan").show();
            $(".orcodeimg").show();
            $("#wxqrcodeimg").attr("src",obj["external_weixin_qrcode_get_response"].qrcode_url);

            //$("#wxqrcodeimg").attr("src","https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1463891080&di=452e6c3c0bffed37966f2bccb4b5ebc0&src=http://d.hiphotos.baidu.com/image/pic/item/562c11dfa9ec8a13f075f10cf303918fa1ecc0eb.jpg");
            //alert( JSON.stringify($("#wxqrcodeimg")));
            //
            //二维码
        });
        //ruixue.external.weixin.qrcode.get
    }

    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        h5sdk.wxIfFollowing(configuration.pid, configuration.account,window.openid,function(sucobj){
            if(sucobj["hfive_weixin_attention_judge_response"].result_msg=="true"){  //已关注
                //showfollowqrcode();
                $("#find-header").show();
                $("#find-footer").show();
                $(".orcodescan").hide();
                $(".orcodeimg").hide();
            }else{  //未关注
                showfollowqrcode();
            }

        },function(errobj){
            showfollowqrcode();
        })
    });




    //});


})(window);