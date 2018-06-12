

(function(win){
    var topiccount = 0;
    var wehcatid = 0;
    var topicid=0;
    var component_appid=0;
    var wxname="";
    var defimage="/static/h5plus/img/wechatBBS/mobilefront/defimage.png";
    $(document).ready(function(obj) {
            //alert('映射');
            wxapi();

        init(obj);
        square_panel.init();

    });

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

        console.log("==scrollTop==:" + scrollTop + ":windowHeight:" + windowHeight + ":scrollHeight:" + scrollHeight);

        var a = $('.ui-page-active').attr('ident');
        if (a == 'page-find') {
            //$("#topic0 .topic_content .err-popup").click();
            //  $("#topic0 .topic_content .err-popup").trigger("click");
            //
            /*
             for (var i = 0; i < topiccount; i++) {

             if (($("#topic" + i).offset().top <= scrollTop) && (scrollTop <= ($("#topic" + i).offset().top + $("#topic0")[0].getClientRects()[0].height))) {
             //console.log("==============================读取id topic"+i+"div 信息");
             $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-a").css({
             "background-image": "url(" + $("#topic" + i).attr("head-ioc") + ")"
             });

             $("#page-find  .ui-header  .ui-navbar .ui-grid-b .ui-block-b").text($("#topic" + i).attr("author-name"));
             $("#topic-head-find").attr("topic-id", $("#topic" + i).attr("topic-id"));
             $("#topic-head-find").attr("wehcat-id", wehcatid);


             break;
             }
             }
             */
        }

        if (scrollTop == 0) {
            //console.log("-------我到顶了-------");
            var a = $('.ui-page-active').attr('ident');
            if (a == 'page-find') {
                h5sdk.wxOpenidReady(function(openid) {
                    window.openid = openid;
                    square_panel.init();

                });
            }
        }
        var num = 1;
        console.log(scrollTop + windowHeight);
        console.log(scrollHeight);
        if (scrollTop + windowHeight == scrollHeight) {
            console.log("-------我到底了-------");
            //var ssefse=$("#collection-popup");
            //$("#collection-popup").popup("popup");
            console.log(a);
            var a = $('.ui-page-active').attr('ident');
            if (a == 'page-find') {

                if (square_panel._curalbum != null) {
                    square_panel.getdata();
                } else if (square_panel._curautor != null) {
                    square_panel.getauthordata();
                }

                //

            } else if (a == 'page-square') {
                // page_square._getfinddata({
                //     'page_num': num++,
                //     'page_size': 10,
                //     'wechat_id': wehcatid
                // });
            } else if (a == 'page-personal-core') {

            }
            //$(this).scrollTop(windowHeight-(windowHeight-40));  //滑动块 反弹的效果
        }
    };

    function init (obj){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            noSwiping : true
        });

        //解决一个问题
        $(function(){
            //var $ul=$("#lazyLoadWrap").find("ul");
            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                //console.log("==============================scroll:"+scrollTop+":#topic0:"+$("#topic0").offset().top+"::"+$("#topic1").offset().top);
                //console.log("==============================getClientRects().height:"+$("#topic0")[0].getClientRects()[0].height);
                /*
                 for(var i=0;i<1;i++){
                 if(($("#topic"+i).offset().top<=scrollTop) && (scrollTop<=($("#topic"+i).offset().top+$("#topic0")[0].getClientRects()[0].height))){
                 console.log("==============================读取id topic"+i+"div 信息");
                 break;
                 }
                 }
                 */

                if(scrollTop + windowHeight == scrollHeight){
                    console.log("------------------我到底了-----------------------------------------------");
                }
            });
        });
        wehcatid = getRequest("wehcat_id");
        //wehcatid = "gh_e611846d32ee";
        //configuration.account = "gh_e611846d32ee";
        //configuration.pid ="55cbf3a3986a9b483376f279";  //obj.data._id;
        //configuration.componentAppid=obj.data.company_key;
        //初始化h5sdk
        //h5sdk.wxOpenidInit(configuration.pid,configuration.account);


    }

    /**
     * @Description  错误处理函数
     * @createTime 2013-10-08
     * @updateTime 2013-10-08
     * @author 韩充满
     * @version 1.0
     */
    var err_fun=function(par){
            alert(par);
    }
    /**
     * @Description  正确处理函数
     * @createTime 2016-04-13
     * @updateTime 2016-04-13
     * @author 韩充满
     * @version 1.0
     */
    var suc_fun=function(par){
        alert("这是正确处理函数");
    }


    /**
     * @Description  广场面板
     * @createTime 2016-04-13
     * @updateTime 2016-04-13
     * @author 韩充满
     * @version 1.0
     */
    var square_panel={
        swiper:null,
        _curalbum: 0,
        _curautor: null,
        _isCollection:false,  //true 收藏  false关注
        _ised:false,           // true 已收藏 已关注  false 未收藏 未关注
        _isscrolf:true,
        init:function (){
            var obj= request.QueryString("topicid");
            topicid=obj
            cacheos.init();
            if(obj != undefined){
                this._getdata(obj);
                cacheos.setdata("keyvalue",obj);
            }else{
                    var objkey= cacheos.getdata("keyvalue");
                    if(objkey != undefined){
                        topicobj=JSON.parse(objkey);
                        this._getdata(topicobj);
                    }
            }

        },

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
            });
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
        _getdata:function(tocpicid){
            var _this=this;

            _this._findtopic(tocpicid);

            return ;
            //json.topics.topic[i] JSON.parse(strJSON);
            var topicobj= cacheos.getdata(tocpicid);
            topicobj=JSON.parse(topicobj);
            if(topicobj != undefined){

                var arr=new Array();
                arr.push(topicobj);
                var obj={"hfive_community_square_topic_findpaging_response":{"topics":{"topic":arr},"total":1}};
                //_this._rendtopic(obj["hfive_community_square_topic_findpaging_response"]);
            }else{
                console.warn("story not data");
            }


            /*
            reque({"topic_id":tocpicid},requeurl.findegc,function(obj){

                if(obj["hfive_community_square_topic_findpaging_response"] != undefined){
                    _this._rendtopic(obj["hfive_community_square_topic_findpaging_response"]);
                }else if(obj["error_response"] != undefined){
                    err_fun(obj["error_response"]);
                }else{
                    err_fun({"error_response":"服务器未返回错误信息"});
                }

            });
            */
        },
        _getwood:function(tocpicid){

            reque({"topic_id":tocpicid},requeurl.getwood,function(obj){

                if(obj["hfive_community_square_topicproduct_findlist_response"] != undefined){
                    if(obj["hfive_community_square_topicproduct_findlist_response"].products != undefined){
                        var htmlstr="";
                        //topic0    "#"+tocpicid+"

                        $("#topic0 .commodity .woodcount").html("("+obj["hfive_community_square_topicproduct_findlist_response"].products.product.length+")");
                        for(var i=0;i<obj["hfive_community_square_topicproduct_findlist_response"].products.product.length;i++){
                            var url=obj["hfive_community_square_topicproduct_findlist_response"].products.product[i].commodity_pic_url;


                            var precollectionimg=defimage;

                            if(url==null ){
                            }else if( url==undefined ){
                            }else if(url==""){
                            }else{precollectionimg=url;}


                            htmlstr+='<div class="woods">  \
                                <div class="wood" style="background-image:url('+precollectionimg+');"></div>  \
                                <div class="woodname">'+obj["hfive_community_square_topicproduct_findlist_response"].products.product[i].commodity_name+'</div>  \
                                </div>';
                        }

                        $("#topic0 .commodity .relevant-wood").html(htmlstr);

                    }

                }else if(obj["error_response"] != undefined){
                    err_fun(obj["error_response"]);
                }else{
                    err_fun({"error_response":"服务器未返回错误信息"});
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

            });

        },

        _findtopic:function(topicid){
            var _this=this;
            reque({"topic_id":topicid},requeurl.lookuptopic,function(obj){
                var arr=new Array();
                var topicobj=obj["hfive_community_square_topic_findone_response"];
                arr.push(topicobj);
                //var obj={"hfive_community_square_topic_findpaging_response":{"topics":{"topic":arr},"total":1}};
                var obj={"topics":{"topic":arr},"total":1};
                _this._rendtopic(obj);


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
            if(jsondata.ised==true){
                $("#topic-head-find").html("<span></span>关注");
            }else if(jsondata.ised==false){
                $("#topic-head-find").html("已关注");
            }
        },

        _rendtopic: function(json, _f) {
            //<a href='#collection-popup' data-rel='popup' class='ui-btn' data-transition='slideup'  ><span  ><img class='fun-share' data-id='"+json.topics.topic[i].topic_id+"' src='/h5plus/img/wechatBBS/mobilefront/fenxiang.png' alt='placeholder+image'></span><span class='fun-share' data-id='"+json.topics.topic[i].topic_id+"' >分享</span></a>
            //swiper-no-swiping
           var _this=this;
            _this._sethead({
                "headioc": "",
                "authorname": "",
                "topicid": "124",
                "wehcatid": wehcatid,
                "ised":true
            });

            var topichtml = "",
                _this = this;
            _this._count = json.total;
            if (json.topics != undefined) {
                topiccount = json.topics.topic.length;
                for (var i = 0; i < json.topics.topic.length; i++) {
                    if (i == 0) {
                        var flag=true;
                        if(json.topics.topic[i].author_follow_yn=="N"){
                            flag=true;
                        }else if(json.topics.topic[i].author_follow_yn=="Y"){
                            flag=false;
                        }
                        var headimp="/static/h5plus/img/wechatBBS/mobilefront/fenxianghead.jpg";
                        if(json.topics.topic[i].author_head != undefined && json.topics.topic[i].author_head != null && json.topics.topic[i].author_head != ''  ){
                            headimp=json.topics.topic[i].author_head;
                        }
                        _this._sethead({
                            "headioc": json.topics.topic[i].author_head,
                            "authorname": json.topics.topic[i].author_name,
                            "topicid": json.topics.topic[i].topic_id,
                            "wehcatid": wehcatid,
                            "ised":flag
                        });
                    }

                    topichtml += "<div id='topic" + i + "'  class='topic'  topic-id='" + json.topics.topic[i].topic_id + "' head-ioc='" + json.topics.topic[i].author_head + "'  author-name='" + json.topics.topic[i].author_name + "'> \
                     <div class='topic_head'>  \
                     <div class='swiper-container'> \
                     <div class='swiper-wrapper'>";
                    if(json.topics.topic[i].topic_imgs != undefined) {
                        for (var j = 0; j < json.topics.topic[i].topic_imgs.topic_img.length; j++) {
                            topichtml += '<div class="swiper-slide "> <img src="' + json.topics.topic[i].topic_imgs.topic_img[j].img_url + '" /></div>';
                            //fro 标签
                            if (json.topics.topic[i].topic_imgs.topic_img[j].img_tags != undefined) {
                                topichtml += ' <div class="lable-class"> ';
                                for (var L = 0; L < json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag.length; L++) {
                                    topichtml += '<div class="lablesty" data-url="' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_page_url + '" style="margin-left: ' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].point_left + 'px;margin-top:' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].point_top + 'px;" data-url="' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_url + '"><div class="lablepoint"><div class="lablepointspmall"></div></div><div class="woodssty">' + json.topics.topic[i].topic_imgs.topic_img[j].img_tags.img_tag[L].commodity_name + '</div></div> ';
                                }
                                topichtml += ' </div> ';
                            }
                        }
                    }else{
                        console.error("json.topics.topic[i].topic_imgs","json.topics.topic[i].topic_imgs error");
                    }

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
                        <a href='#' data-rel='popup' class='ui-btn already-collection' data-transition='slideup'  style='display: none;'  ><span><img style='width:16px;height: 16px; padding-bottom: 6px;' class='fun-share' data-id='" + json.topics.topic[i].topic_id + "' src='/static/h5plus/img/wechatBBS/mobilefront/share.png' alt='placeholder+image'></span><span style='display: inline-block;width: 26px !important;height: 20px;' class='fun-share' data-id='" + json.topics.topic[i].topic_id + "' >分享</span></a> \
                        </div> \
                        <div>  \
                        </div> \
                          </div> \
                        <div><p>" + json.topics.topic[i].topic_body + "</p></div> \
                    </div>\
                        <div><div style='background-color: #f5f5f5; height: 3px;'><div class='borderStyle'></div><div class='borderStyle' style='margin: -11px !important;width: 1080px;'></div></div></div>\
                        <div class='topic_comment'> \
                    <p style='margin-bottom: 23px;'><b>点评</b><span class='remarkcount'>(231)</span>: <span class='comment' data-id='" + i + "' topic-id='" + json.topics.topic[i].topic_id + "' topic-id-id='topic"+i+"' style='font-size: 13px;' >写评论</span></p>  \
                    <textarea class='ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow comment-content' style='height: 60px;display:none; '></textarea>  \
                    <div class='topic_Info'>  \
                        </div>  \
                        ";


                    var boomhtml = '<div class="borderStyle"></div>\
                        <div class="selectAll" data-id="topic' + i + '" topic-id="' + json.topics.topic[i].topic_id + '">\
                        <p>查看全部</p>\
                        </div>\
                        <img class="fenxiangjt" src="/static/h5plus/img/wechatBBS/mobilefront/gongxiang.png" style="display: none;" alt="">\
                        <div class="divZZ" style="display: none;"  data-id="topic' + i + '">\
                        </div> \
                         <div class="alertList" > \
                          </div> \
                        </div> \
                            <div class="borderStyle"></div>\
                            <div class="commodity">\
                              <div><span>相关商品</span><span class="woodcount">(0)</span></div> \
                             <div class="relevant-wood">\
                             </div> \
                            </div>\
                        </div>';
                    topichtml += boomhtml;

                    _this._gettopicomment("topic" + i, json.topics.topic[i].topic_id, 1, _this._pagesize);

                    _this._gettopicount("topic" + i, json.topics.topic[i].topic_id);

                    _this._getwood(json.topics.topic[i].topic_id);
                _this._bind();

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

        }, //fun over

        _createtioc: function(obj) {
            var _this=this;
            var topic=obj.topieid;
            var topic_id=obj.topic_id;
            reque(obj, requeurl.createtopic, function(obj) {

                if (obj["hfive_community_square_topiccomment_create_response"] != undefined) {
                    //suc_fun(obj["hfive_community_square_topiccomment_create_response"]);
                    _this._gettopicomment(topic,topic_id,1, _this._pagesize);
                    _this._gettopicount(topic,topic_id);
                } else if (obj["error_response"] != undefined) {
                    //err_fun(obj["error_response"].error_response=" 请输入评论信息！");
                } else {
                    err_fun({
                        "error_response": "服务器未返回错误信息"
                    });
                }


            });
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
        _gettopicomment:function(topicid,id){
            var _this=this;
            reque({"topic_id":id,"page_num":1,"page_size":20},requeurl.getcomment,function(obj){
                if(obj["hfive_community_square_topiccomment_findpaging_response"] != undefined){

                    var showcommen="";
                    var allcomment="";
                    var jsondata=obj["hfive_community_square_topiccomment_findpaging_response"];

                    if(jsondata.comments != undefined)
                    for(var i=0;i<jsondata.comments.comment.length;i++){
                       if( i <2){
                            //调用评论函数
                           showcommen+='  <div class="wx_info"> \
                            <P class="wx_headImg"><img height="38px" width="38px" src="'+jsondata.comments.comment[i].head_url+'" alt="placeholder+image"></P> \
                            <span class="wx_Name">'+jsondata.comments.comment[i].nickname+'</span> \
                            <div class="wx_none"></div> \
                            <div class="wx_plContent"> \
                            <p>'+jsondata.comments.comment[i].comment_content+'</p> \
                            </div> \
                            </div>';
                       }
                        //所有评论展示
                        allcomment+='  <div class="alert_content"> \
                        <P class="alert_wxhead"> \
                        <img height="38px" width="38px" src="'+jsondata.comments.comment[i].head_url+'" alt="placeholder+image"> \
                        </P> \
                        <span>'+jsondata.comments.comment[i].nickname+'</span> \
                        <div></div> \
                        <div> \
                        <p>'+jsondata.comments.comment[i].comment_content+'</p> \
                        </div> \
                        </div>';
                    }

                    $("#"+topicid+" .topic_comment .topic_Info").html(showcommen);
                    $("#"+topicid+" .topic_comment .alertList").html(allcomment);


                }else if(obj["error_response"] != undefined){
                    err_fun(obj["error_response"]);

                }else{

                    err_fun({"error_response":"服务器未返回错误信息"});
                }


            });
        },
        _bind:function(){
            var _this=this;
            $("#page-find").unbind("click");
            $("#page-find").click(function(obj){


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

                if($(obj.target).attr("class")=="fun-share"){
                    var topicid=$(obj.target).attr("data-id");
                    event.stopPropagation();
                }

                if ($(obj.target).attr("class") == "comment") {
                    var pageid = "topic" + $(obj.target).attr("data-id");
                    var topicid = $(obj.target).attr("topic-id");
                    if ($(obj.target).text() == "写评论") {
                        $(obj.target).text("发布");
                        $("#" + pageid + " .topic_comment .comment-content").val("");
                        $("#" + pageid + " .topic_comment .comment-content").show();
                    } else {
                        $(obj.target).text("写评论");
                        $("#" + pageid + " .topic_comment .comment-content").hide();
                        var topieid= $(obj.target).attr("topic-id-id");
                        _this._createtioc({
                            "topic_id": topicid,
                            "comment_content": $("#" + pageid + " .topic_comment .comment-content").val(),
                            "topieid":topieid
                        });
                    }

                }

                if ($(obj.target.offsetParent).attr("class") == "lablesty") {
                    var url = $(obj.target.offsetParent).attr("data-url");
                    window.location = url;
                }


            });
            //
        },
        _gettopicount:function(topicid,id){
            var _this=this;

            reque({"topic_id":id},requeurl.gettopiccount,function(obj){

                if(obj["hfive_community_square_topiccomment_count_response"] != undefined){
                    $("#"+topicid+" .topic_comment .remarkcount").html("("+obj["hfive_community_square_topiccomment_count_response"].count+")");
                }else if(obj["error_response"] != undefined){
                    err_fun(obj["error_response"]);
                }else{
                    err_fun({"error_response":"服务器未返回错误信息"});
                }
            });
        }

    }


    wehcatid = request.QueryString("wehcat_id");
    configuration.account = request.QueryString("wehcat_id");
    configuration.pid = request.QueryString("pid"); //obj.data._id;
    component_appid= request.QueryString("component_appid");
    wxname=request.QueryString("wxname");
    wxname=decodeURIComponent(wxname,"utf-8");
    //configuration.componentAppid=obj.data.company_key;
    //初始化h5sdk
    h5sdk.wxOpenidInit(configuration.pid, configuration.account);

    //  h5sdk.mtsGetProjectPath() + '/haibao/browse.html?poster_path='+poster_path_s,
    //'http://oss-cn-hangzhou.aliyuncs.com/h5plus/mts/pic/friend_share_20160420100445666.jpg'




    function wxapi(){
        //http://test.h5plus.net/static/h5plus/js/wechatBBS/mobilefront/mobilephone.html?
        h5sdk.wxOpenidReady(function(openid) {
            h5sdk.wxInit(configuration.pid, configuration.account, function() {
                h5sdk.wxShareToFriend('掌上社区',
                    "http://"+wxSharepath+"/static/h5plus/js/wechatBBS/mobilefront/share.html?topicid="+topicid+"&wehcat_id="+wehcatid+"&pid="+configuration.pid+"&component_appid="+component_appid,
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
                    "http://"+wxSharepath+"/static/h5plus/js/wechatBBS/mobilefront/share.html?topicid="+topicid+"&wehcat_id="+wehcatid+"&pid="+configuration.pid+"&component_appid="+component_appid,
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

        var par={"component_appid":component_appid,"Account":configuration.account,"SceneId":"20001","SceneType":"0","ExpireSeconds":"5000"}
        reque(par, requeurl.getwxrecodeimg, function(obj) {
            //obj["external_weixin_qrcode_get_response"].qrcode_url
            $("#orcodescan").show();
            $("#orcodeimg").show();
            $("#wxqrcodeimg").attr("src",obj["external_weixin_qrcode_get_response"].qrcode_url);
            //二维码
        });
        //ruixue.external.weixin.qrcode.get
    }

    h5sdk.wxOpenidReady(function(openid) {
        window.openid = openid;
        h5sdk.wxIfFollowing(configuration.pid, configuration.account,window.openid,function(sucobj){
            if(sucobj["hfive_weixin_attention_judge_response"].result_msg=="true"){  //已关注
                //showfollowqrcode();
            }else{  //未关注
                showfollowqrcode();
            }

        },function(errobj){
            showfollowqrcode();
        })
    });




})(window);

