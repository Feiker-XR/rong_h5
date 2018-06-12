/* 
* @Date:   2016-01-22 09:25:10
* @Last Modified by:   Administrator
* @Last Modified time: 2016-04-29 13:22:59
*/

'use strict';
seajs.use(['dot', 'Ajax', 'zTree'], function(dot, Ajax) {
    
    var D = [], 
        configT = []

    var page = {
        resizeTimer: null,
        _init: function() {
            page._resize();
        },
        _resize: function() {

            $(window).on('resize', function() {
                clearTimeout(page.resizeTimer);
                page.resizeTimer = setTimeout(function() {
                    
                    page.resizeCall()
                }, 500);
            })
        },
        resizeCall : function(){
            $rk.listener.trigger('index.page', 'resize');
        }
    }

    page._init();


    var mTree = {
        clickTreeNode: function(treeNode) {

            var isConfig = false

            configT.forEach(function (m, i) {
                if(m == treeNode.furl){
                    isConfig = true
                    return
                }
            })

            if(treeNode.children){
                return
            }
            
            if((treeNode.furl === '' || !isConfig)&&(treeNode.furl == '')){
                alert('还没有绑定,请联系系统管理员!')
                return
            }

            //点击树派发 tab.click
            $rk.listener.trigger('index.tree', 'click', treeNode);
        }
    }
    var mTab = {
        _curTid: 'home',
        _init: function() {
            this.listener();
            this.bind();
        },
        listener: function() {
            //点击接收 树得.click
            $rk.listener.on('index.tree', 'click', function(fun, opt) {
                mTab.addTab(opt);
            });
            $rk.listener.on('index.tab', 'add', function(fun, opt) {
                mTab.setTabWidth('add');
            });
            $rk.listener.on('index.tab', 'remove', function(fun, opt) {
                mTab.setTabWidth('remove');
            });
            $rk.listener.on('index.tab', 'select', function(fun, opt) {
                mTab.setTabWidth('select');
            });
            $rk.listener.on('index.page', 'resize',function() {
                // alert(1)
                mTab.setTabWidth('resize');
            });
        },
        setTabWidth: function(type) {

            var tabBox = $('#j_tab_box');
            var rbox = $('#j_wrap');
            var tabBox_w = tabBox.outerWidth();
            var rbox_w = rbox.width();
            var li_w = 0; //表示除了选中的li的w
            var set = function() {
                var lis = tabBox.find('li').not('.selected').find('i');
                li_w = rbox_w - tabBox.find('li.selected').outerWidth() - 20;
                var len = lis.length; //所有litab ＋ home tag
                // alert(li_w)

                lis.width(li_w / len - 21);
            }
            var reset = function() {
                var lis = tabBox.find('li').find('i');

                lis.width('auto')
            }
            if (type == 'add') {
                if (tabBox_w > rbox_w) {
                    set();
                }
            }
            if (type == 'remove') {
                reset();
                tabBox_w = tabBox.outerWidth();
                rbox_w = rbox.width();
                if (tabBox_w > rbox_w) {
                    set();
                }

            }
            if (type == 'select' || type == 'resize') {
                //console.log(1)
                reset();
                tabBox_w = tabBox.outerWidth();
                rbox_w = rbox.width();
                if (tabBox_w > rbox_w) {
                    // dd(1)
                    set();
                }

            }

        },
        reloadIframe: function(dom) {
            var fname = 'name_' + dom.data('fname');
            window.frames[fname].location.reload();
        },
        //添加一个tab 到tab区域
        addTab: function(opt) {
            //表示有被选中的
            // if ($('#j_tab_box').find('li.selected').length) {
            //     mTab._curTid = $('#j_tab_box').find('li.selected').data('tid');

            // }

            if ($('#mTab_' + opt.id).length) {
                if (opt.id != mTab._curTid) {
                    mTab.select(opt.id);
                }

                return;
            }
            if (mTab._curTid) {

                $('#mTab_' + mTab._curTid).removeClass('selected');
                $('#mIframe_' + mTab._curTid).hide();
                $('#mTab_' + mTab._curTid).find('b').hide();
            }
            mTab._curTid = opt.id;
            mTab.add(opt);
        },
        select: function(id) {
            if (mTab._curTid) {
                $('#mTab_' + mTab._curTid).removeClass('selected');
                $('#mIframe_' + mTab._curTid).hide();
                $('#mTab_' + mTab._curTid).find('b').hide();
                $('#mTab_' + id).addClass('selected');
                $('#mIframe_' + id).show();
                mTab._curTid = id;
                var tit = $('#mTab_' + mTab._curTid).data('name');
                document.title = tit || '我的主页 ';
                $('#mTab_' + id).find('b').show();
                $rk.listener.trigger('index.tab', 'select');
            }
        },
        add: function(opt) {
            var reload = '<b data-fname={{=it.id}} style="display:none"></b>';
            var _tmp = '<li id="mTab_{{=it.id}}" class="selected"\
             data-tid="{{=it.id}}" data-name="{{=it.name}}" title="{{=it.name}}"><i>{{=it.name}}</i>\
             <span></span>' + reload + '</li>';
            var tabHtml = $rk.tplRender(dot, _tmp, opt);
            $('#j_tab_box').append(tabHtml);
            document.title = $('#mTab_' + mTab._curTid).data('name');

            $('#mTab_' + mTab._curTid).find('b').show();
            //添加完成派发 add事件
            $rk.listener.trigger('index.tab', 'add', opt);

        },
        remove: function(dom) {
            var li = dom.parent();
            var id = li.data('tid');
            var tid = li.prev().data('tid') || li.next().data('tid');


            // if (tid == undefined) {

            //     return false
            // } else {
            if (li.hasClass('selected')) {
                mTab.select(tid);
            }
            // }
            $('#mTab_' + id).remove();
            $('#mIframe_' + id).remove();

            $rk.listener.trigger('index.tab', 'remove');

        },
        bind: function() {
            $('#j_tab').on('click', 'li', function(e) {
                var myTid = $(this).data('tid');
                if (mTab._curTid == myTid) {
                    return;
                } else {
                    mTab.select(myTid);
                }
            })
            $('#j_tab').on('click', 'span', function(e) {
                e.stopPropagation();
                mTab.remove($(this));
            })
            $('#j_tab').on('click', 'b', function(e) {
                e.stopPropagation();
                mTab.reloadIframe($(this));
            })
        }
    }
    var mIframe = {
        listener: function() {
            $rk.listener.on('index.tab', 'add', function(fun, opt) {
                mIframe.addIframe(opt);
            });
        },
        addIframe: function(opt) {
            console.log(window.location.origin+opt.furl)
            var id = opt.id,
                furl = opt.furl;
            var _tmp = '<div class="j_iframe_item" id="mIframe_{{=it.id}}" ><iframe frameborder="0"  src="{{=it.furl}}"  name="name_{{=it.id}}"></iframe></div>';
            var frameHtml = $rk.tplRender(dot, _tmp, opt);
            $('#j_frame').append(frameHtml);
        }
    }
    var P = function() {
        var me = this;
        this.treeData = D;
        this.treeSetting = {
            callback: {
                onClick: function(event, treeId, treeNode, clickFlag) {
                    mTree.clickTreeNode(treeNode);
                }
            }
        };
        this._init();
    }

    P.prototype = {
        setHeight: function() {
            var h = $('body').height() - $('#j_header').height();

            $('#j_sidebar').height(h);
            $('#j_wrap').height(h);
            $('#j_frame').height(h - 32);
            // $('#j_frame .j_iframe_item').height(h - 32);
        },
        bindResize: function() {
            var me = this;
            $(window).resize(function() {
                setTimeout(function() {
                    me.setHeight();
                }, 200);
            });
        },
        setTree: function(data, isT) {

            $.fn.zTree.init($("#j_tree_index"), this.treeSetting, data);

        },

        _init: function() {
            if(/photon/i.test(window.location.href)) return
            
            return
            var me = this;
            this.setHeight();
            this.bindResize();
            

            var treeUrl = 'http://test.h5plus.net/pc/v3/'===location.href?'/static/comlibjs/v3/js/showtree.js':'/site/showtree';
            new Ajax({
                url: treeUrl,
                success: function(json) {

                    if (json && json.errno === 10000 && json.data) {
                        me.setTree(json.data)

                        configT = json.config

                        mTab._init();
                        mIframe.listener()
                    } else {
                        $('#mIframe_home').append('<p style="color: red; line-height:30px;">您当前没有系统使用权限，请联系管理员为您开通所需权限</p>');
                    }

                },
                beforeSend: function() {

                },
                dataType: 'json'
            });
        }
    };
    new P();
});
