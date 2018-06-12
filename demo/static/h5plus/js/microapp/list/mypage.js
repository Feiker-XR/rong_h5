



seajs.use(['Ajax','dot','pagination','tips2',"Dialog",'sortable','upload','zTree','zThide'],
    function(Ajax,dot,pagination,Tips,Dialog,sortable,upload,zTree,zThide){

           var obj = arguments, setModel = function() {

              var  getTree = $$r.routers.data.link.getTree,
                    getTable = $$r.routers.data.link.getTable,
                    delTable= $$r.routers.data.link.delTable,
                    getItem=$$r.routers.data.link.getItem,
                    editTtem=$$r.routers.data.link.editItem,
                    addItem=$$r.routers.data.link.addItem,
                    editTreeItem=$$r.routers.data.link.editTreeItem,
                  removeTreeItem=$$r.routers.data.link.removeTreeItem,
                  addTreeItem=$$r.routers.data.link.addTreeItem;

            var controltitle = new $rk.VC({
                _init: function() {
                    var me = this;
                    $rk.listener.on('plat', 'ready', function(e, c) {
                        me.loading("数据加载中");
                        me._render();
                        me._bind();
                    });

                    this.loadjs();
                    this.loadCss();
                },

                _container: $('#mypage-control-title'),
                _render: function() {
                    var html = $rk.tplRender(dot, $('#mypage-control-title-tml').html(), undefined);
                    this._container.html(html);
                },
                _bind : function(){
                    var that = this;
                    this._container.off("click");
                    this._container.on("click",'span',function(e){
                        var dataOp=this.getAttribute('data-op');
                        var siteId = $(this).attr("data-id");

                        if(dataOp=="upload"){
                            $("#addplat").show();
                        }else if(dataOp=="batchdel "){
                            //批量删除
                            var idarr=new Array();
                            var cont=0;
                            $('input:checkbox[type=checkbox]:checked').each(function(i){
                               if($(this).attr("data-id")!=undefined){
                                   idarr.push($(this).attr("data-id"))
                               }

                                cont++;
                                if(cont >=($("input[type=checkbox]:checked").length))
                                {
                                    var id= idarr.join(",");
                                    that.delete(id,that);
                                }
                            });



                        }else if(dataOp=="move"){
                            //移动到
                        }else if(dataOp=="search"){
                                if(e.target.className=="searimg"){
                                    var searstr=e.currentTarget.children[1].value;
                                    if(searstr!=""){
                                        controltable.getTableRequest(searstr);
                                    }
                                }
                        }
                        e.preventDefault();
                    })
                },
                loading: function(text) {
                    this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
                },
                loadjs:function(){

                    //document.write("<script src='./controllers.js?v="+Date.parse(new Date())+"'><\/script>");
                    //document.write("<script src='./controllers.js?v="+Date.parse(new Date())+"'><\/script>");
                    //data['comlibjs'] %>/third/easyui/easyui.css<%= data['v'] %>
                },
                loadCss:function(){
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    //使用固定域名
                    link.href = 'http://172.16.13.166:1000/comlibjs/third/easyui/easyui.css?v='+Date.parse(new Date());
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
                },
                delete: function (dataId,that) {
                    var self = this;
                    var dialog = new Dialog({
                        title: '提示',
                        content: '<p class="ui-msg ui-msg-warning">确认执行删除操作?</p>',
                        confirmFun: function (dialog,button) {
                            self.delRequest(dataId,button,that);
                            window.setTimeout(function () {
                                dialog.close();

                            }, 1000)
                        }
                    });
                    dialog.open();

                },
                delRequest: function(siteId,button,that){
                    var btn = button;
                    var self = this;
                    var tip = null;
                    var option = {
                        url : delTable,
                        data : {id :siteId},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            btn.removeClass('ui-button-disabled');
                            if (json.ruixue_hfive_core_tag_microapp_mypage_table_delete.error==true) {
                                self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                                //$(that).parent().parent().remove();
                                controltable.getTableRequest();
                                setTimeout(function () {
                                    $rk.listener.trigger('list', 'change')
                                }, 500);
                            }else{
                                self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                            }

                        },
                        beforeSend: function() {
                            btn.addClass('ui-button-disabled');
                            self.delTip = new Tips({
                                button: btn,
                                content: '<div class="ui-msg ui-msg-loading">删除中</div>'
                            });
                            self.delTip.show();
                        }
                    }
                    new Ajax(option);
                }
            });

            var controltree = new $rk.VC({
                _init: function() {
                    var me = this;
                    $rk.listener.on('plat', 'ready', function(e, c) {
                        me.loading("数据加载中");
                        me.getTreeRequest();
                        //me.formSend();
                        //me._bind();
                    });
                    $rk.listener.on('tree', 'requesting', function(act, text) {
                        me.loading(text);
                    });
                    $rk.listener.on('tree', 'success', function(act, json) {
                        me._render(json);
                        me._bind();
                    });
                    $rk.listener.on('pager', 'send', function(e, num) {
                        $rk.listener.trigger('table', 'requesting', '数据加载中');
                        me.setPage(num);
                        me.formSend();
                    });
                },
                _container: $('#wx_tree'),
                _initZtree:function(){
                    var _this=this;
                    var setting = {
                        view: {
                            dblClickExpand: false,
                            showLine: true,
                            selectedMulti: false,
                            addDiyDom: addDiyDom,
                            addHoverDom: addHoverDom,
                            removeHoverDom: removeHoverDom
                        },
                        data: {
                            simpleData: {
                                enable:true,
                                idKey: "id",
                                pIdKey: "pId",
                                rootPId: ""
                            }
                        },
                        callback: {
                            onRename: zTreeOnRename,
                            beforeClick: function(treeId, treeNode) {

                                var treeObj = $.fn.zTree.getZTreeObj("ztree");
                                var sNodes =  treeObj.getSelectedNodes();
                                if (sNodes.length > 0) {
                                    //var node = sNodes[0].getIndex();
                                }
                                //treeNode.id
                                _this.postIdTable(treeNode.id);
                                //obj.stopPropagation();
                            }
                        }
                    };


                    function zTreeOnRename(event, treeId, treeNode, isCancel){
                        _this.editTree(treeNode.name,treeNode.id);
                    }

                    function addDiyDom(treeId, treeNode) {
                        var aObj = $("#" + treeNode.tId + "_a");
                        if ($("#diyBtn_"+treeNode.id).length>0) return;
                        var editStr = "<span id='diyBtn_add_" +treeNode.id+ "' class='button add' title='添加' onfocus='this.blur();' ></span>"
                            + "<span id='diyBtn_edit_" +treeNode.id+ "' class='button edit' title='编辑' onfocus='this.blur();' ></span>"
                            + "<span id='diyBtn_remove_" +treeNode.id+ "' class='button remove' title='删除' onfocus='this.blur();' ></span>";

                        aObj.append(editStr);
                        var btn = $("#diyBtn_add_"+treeNode.id);
                        if (btn) btn.bind("click", function(obj){
                            var treeObj = $.fn.zTree.getZTreeObj("ztree");
                            _this.addTreeNote(treeObj.getNodeByTId(obj.target.parentNode.parentNode.id));
                            obj.stopPropagation();
                        });

                        var btn = $("#ztree_"+treeNode.id+"_switch");
                        if (btn) btn.bind("click", function(obj){
                            var treeObj = $.fn.zTree.getZTreeObj("ztree");
                            treeObj.expandNode(treeObj.getNodeByTId(obj.target.parentNode.parentNode.id),!treeNode.open);
                            obj.stopPropagation();
                        });

                        var btn = $("#diyBtn_edit_"+treeNode.id);
                        if (btn) btn.bind("click", function(obj){
                            var treeObj = $.fn.zTree.getZTreeObj("ztree");
                            treeObj.editName(treeObj.getNodeByTId(obj.target.parentNode.parentNode.id));



                            obj.stopPropagation();
                        });

                        var btn = $("#diyBtn_remove_"+treeNode.id);
                        if (btn) btn.bind("click", function(obj){
                            var treeObj = $.fn.zTree.getZTreeObj("ztree");
                            treeObj.removeNode(treeObj.getNodeByTId(obj.target.parentNode.parentNode.id));
                            _this.removeTree(obj.target.parentNode.parentNode.id);
                            obj.stopPropagation();
                        });
                    };

                    function addHoverDom(treeId, treeNode) {
                    };

                    function removeHoverDom(treeId, treeNode) {
                    };

                    return setting;
                },
                _render: function(data) {

                    var zNodes =new Array();
                    for(var i=0;i<data.hfive_core_tag_microapp_mypage_tree_response.data.length;i++){
                        var item={id:data.hfive_core_tag_microapp_mypage_tree_response.data[i].id, pId:data.hfive_core_tag_microapp_mypage_tree_response.data[i].pid, name:data.hfive_core_tag_microapp_mypage_tree_response.data[i].title, open:false,file:"core/standardData"};
                        zNodes.push(item);
                    }

                    var html = $rk.tplRender(dot, $('#mypage-tree-tml').html(), data.hfive_core_tag_microapp_mypage_tree_response);
                    this._container.html(html);
                    var t = $("#ztree");
                    t = $.fn.zTree.init(t,this._initZtree(), zNodes);
                },
                _bind : function(){
                    var _this = this;
                    this._container.off("click");
                    this._container.off("mouseover");  //mouseout

                    this._container.on("mouseover",'.ztree',function(e){
                        if(e.target.className=="level0"){

                        }
                        e.preventDefault();
                    });
                    //ztree_bg   ztree
                    this._container.on("click",'.ztree_bg',function(e){

                        if(e.target.className=="ztree_add_img" ){
                            var additem= [{id:12, pId:23, name:""}];
                            var zTree = $.fn.zTree.getZTreeObj("ztree");
                            newNodes = zTree.addNodes(null, additem);  //默认添加到最后
                            zTree.editName(newNodes[0]);
                            //_this.addTreeNote(note);
                        }

                          //noline_close
                        if(e.target.className=="treedata" ){
                            alert("单击数据按钮id:"+e.target.getAttribute('data-id'));
                        }

                        if(e.target.className=="button level0 switch noline_close"){
                            alert("打开子控件 按钮");
                        }

                        if(e.target.className=="button add"){
                            var note= {
                                "id": "1298",
                                "tid": "0000000006",
                                "title": "我是子节点",
                                "number": "-5",
                                "pid": "0",
                                "issystem": "0",
                                "nuclass": null,
                                "status": "1",
                                "create_time": null,
                                "create_id": null,
                                "update_id": null,
                                "update_time": null,
                                "gt_id": "0",
                                "company_id": "19",
                                "creator": "35",
                                "owner": "35",
                                "create_user_id": "35",
                                "rx_inserttime": "2015-05-27 11:48:11",
                                "update_user_id": "35",
                                "rx_updatetime": "2015-05-27 11:48:11",
                                "data_uuid": null,
                                "tpl_classfiy": "C",
                                "company_key": null
                            };
                            //alert("点击添加子按钮id:"+e.target.getAttribute('data-id'));

                            var parentnote=e.target.parentNode.nextElementSibling;

                            _this.addChildrenTree(note,parentnote);
                        }
                        if(e.target.className=="button edit"){
                            alert("点击编辑id:"+e.target.getAttribute('data-id'));
                        }
                        if(e.target.className=="button remove"){
                            alert("点击删除id:"+e.target.getAttribute('data-id'));
                        }
                        e.preventDefault();
                    })
                },
                getTreeRequest: function(){
                    var self = this;
                    var option = {
                        url : getTree,
                        dataType: 'json',
                        type: 'get',
                        success: function(json) {
                            $rk.listener.trigger('tree', 'success', json);
                        },
                        beforeSend: function() {
                        }
                    }
                    new Ajax(option);
                },

                addTree:function(obj){
                    var self = this;
                    var option = {
                        url : removeTreeItem,
                        data : obj,
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            //$rk.listener.trigger('table', 'success', json);
                        },
                        beforeSend: function() {

                        }
                    }
                    new Ajax(option);
                },
                removeTree:function(id){
                    var self = this;
                    var option = {
                        url : removeTreeItem,
                        data : {id:id},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            //$rk.listener.trigger('table', 'success', json);
                        },
                        beforeSend: function() {

                        }
                    }
                    new Ajax(option);
                },
                editTree:function(name,id){
                    var self = this;
                    var option = {
                        url : editTreeItem,
                        data : {name :name,id:id},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            //$rk.listener.trigger('table', 'success', json);
                        },
                        beforeSend: function() {

                        }
                    }
                    new Ajax(option);
                },
                postIdTable:function(id){
                    var self = this;
                    var option = {
                        url : getTable,
                        data : {id :id},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            $rk.listener.trigger('table', 'success', json);
                        },
                        beforeSend: function() {

                        }
                    }
                    new Ajax(option);
                },
                addTreeNote: function(obj){
                    /*
                    var treeNode =dot.template(document.getElementById('mypage-tree-item-tml').text);
                    $('#class').append(treeNode(obj));
                    */

                    var additem= [{id:12, pId:23, name:""}];
                    var zTree = $.fn.zTree.getZTreeObj("ztree");
                    newNodes = zTree.addNodes(obj,additem);  //默认添加到最后
                    zTree.editName(newNodes[0]);
                    this.addTree(additem);
                    //newNodes = zTree.addNodes(treeNode,newNodes);

                },
                addChildrenTree: function(obj,parentnote){
                    var childnote = dot.template(document.getElementById('mypage-tree-children-tml').text); //, undefined, def\
                    $(parentnote).append(childnote(obj));
                   // $('#class').append(childNodehtml(obj));
                    //parentnote.appendChild(childNode(obj));
                    //$('.ztree').appendChild(childNode(obj));

                },
                formSend :function(){
                },
                loading: function(text) {
                    this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
                },
                setPage: function(num) {

                }
            });

            //debugger;
            var controltable = new $rk.VC({
                _chekbox:false,
                _pagesize:10,
                _init: function() {
                    var me = this;
                    $rk.listener.on('plat', 'ready', function(e, json) {
                        me.loading("数据加载中");

                        me.getTableRequest();
                    });
                    $rk.listener.on('table', 'success', function(e, json) {
                        me._render(json);
                        me._bind();
                    });

                    $rk.listener.on('pager', 'send', function(e, num,json) {

                        $rk.listener.trigger('table', 'requesting', '数据加载中');
                        me.setPage(num);

                        $rk.listener.trigger('table', 'success', json);
                       // me.formSend();
                    });

                },
                formSend :function(){
                    var page = $('#setPage').val();
                    var me = this;
                    var option = {
                        url : getTable,
                        data : {"page" :page},
                        dataType: 'json',
                        type: 'get',
                        success: function(json) {
                            $rk.listener.trigger('table', 'success', json);
                        }
                    }
                    new Ajax(option);
                },
                setPage: function(num) {
                    $("#setPage").val(num);
                },
                _container: $('#mainarea'),  //contrtable  mainarea
                _render: function(data) {
                    var _this=this;
                    var tabletem = dot.template(document.getElementById('mypage-table-tml').text); //, undefined, def\
                    $("#contrtable").html(tabletem(data.hfive_core_tag_microapp_mypage_table_response || {}));
                },
                _bind: function(){

                    var that = this;
                    this._container.off("click");  //#mainarea contrtable
                    this._container.off("mouseover");  //#mainarea contrtable
                    this._container.off("change");  //#mainarea contrtable

                    // page 事件
                    // $(".pagination-page-list").change(function(obj){
                    //     alert("单击选择sleect 选择值id:"+ $(obj.currentTarget).val());
                    //     obj.preventDefault();
                    // });

                    // this._container.on("click",'#page',function(e){
                    //     if(e.target.className=="l-btn-empty pagination-prev"){
                    //         alert("上一页");
                    //     }
                    //     if(e.target.className=="l-btn-empty pagination-next"){
                    //         alert("下一页");
                    //     }
                    //     e.stopPropagation();
                    // });

                    // table 事件
                    this._container.on("mouseover",'.qr_view',function(e){
                        //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        //var sef=$(e.target).children();
                        ////debugger;
                        $(e.target).children().show();
                        e.stopPropagation();
                    });
                    this._container.on("mouseout",'.qr_view',function(e){
                        //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        $(e.target).children().hide();
                        e.stopPropagation();
                    });

                    this._container.on("click",'#contrtable',function(e){

                        if(e.target.className=="fontshow"){
                            open($(e.target).attr("href"));
                            //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        }
                        if(e.target.className=="backsshow"){
                            open($(e.target).attr("href"));
                            //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        }


                        if(e.target.className=="checkAll"){

                            if(that._chekbox==false){
                                $(".checkOne[type='checkbox']").each(function(obj) {
                                    $(this).prop("checked", 'true');
                                });
                                    that._chekbox=true;

                            }else{
                                $(".checkOne[type='checkbox']").each(function(obj) {
                                    $(this).removeAttr("checked");
                                });
                                that._chekbox=false;
                            }

                        }
                        if(e.target.className=="checkOne"){
                            //alert("单击的单选择复选框id:"+ $(e.target).attr("data-id"));
                        }

                        if(e.target.className=="delete_btn"){
                            //alert("单击的删除按钮id:"+ $(e.target).attr("data-id"));
                           //if($(e.target).parent().parent()[0].cells[0].children[0].checked==true){
                               that.delete($(e.target).attr("data-id"),e.target);
                          // }

                        }
                        if(e.target.className=="update_btn"){
                            //alert("单击的编辑按钮id:"+ $(e.target).attr("data-id"));
                            //open("http://127.0.0.1:1221/microapp/manage/mypageedit.html");
                            edit.editShow($(e.target).attr("data-id"));
                        }
                        e.stopPropagation();
                        //e.preventDefault();
                    })

                } ,
                delete: function (dataId,that) {
                    var self = this;
                    var dialog = new Dialog({
                        title: '提示',
                        content: '<p class="ui-msg ui-msg-warning">确认执行删除操作?</p>',
                        confirmFun: function (dialog,button) {
                            self.delRequest(dataId,button,that);
                            window.setTimeout(function () {
                                dialog.close();

                            }, 1000)
                        }
                    });
                    dialog.open();

                },
                delRequest: function(siteId,button,that){
                    var btn = button;
                    var self = this;
                    var tip = null;
                    var option = {
                        url : delTable,
                        data : {id :siteId},
                        dataType: 'json',
                        type: 'post',
                        success: function(json) {
                            btn.removeClass('ui-button-disabled');
                            if (json.ruixue_hfive_core_tag_microapp_mypage_table_delete.error==true) {
                                self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                                $(that).parent().parent().remove();
                                setTimeout(function () {
                                    $rk.listener.trigger('list', 'change');
                                }, 500);
                            }else{
                                self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                            }

                        },
                        beforeSend: function() {
                            btn.addClass('ui-button-disabled');
                            self.delTip = new Tips({
                                button: btn,
                                content: '<div class="ui-msg ui-msg-loading">删除中</div>'
                            });
                            self.delTip.show();
                        }
                    }
                    new Ajax(option);
                },
                loading: function(text) {
                    //this._container.html('<div class="ui-msg ui-msg-loading">'+text+'...</div>');
                },

                getTableRequest: function(serstr){
                    var self = this;
                    if(serstr == undefined){
                        serstr="";
                    }
                    var option = {
                        url : getTable+"&searatr="+serstr,
                        dataType: 'json',
                        type: 'get',
                        success: function(json) {
                            $rk.listener.trigger('table', 'success', json);
                        },
                        beforeSend: function() {
                        }
                    }
                      new Ajax(option);
                },
            });

        var pager = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('table', 'success', function(act, json){
                    pager._render(json);
                });
                $rk.listener.on('table', 'requesting', function(act) {
                    me.hide();
                })
            },
            _container: $('#j_con_page'),
            _render: function(json) {
                var d = json.hfive_core_tag_microapp_mypage_table_response;
                var total = d.total;
                var curpage = d.page || 1;
                if(total < 1) return;


                pager._container.pagination(total, {
                    items_per_page: d.length || 20,
                    current_page: curpage - 1,
                    num_edge_entries: 2,
                    callback: function(index, panel) {
                        var pageNum = index + 1;
                        $rk.listener.trigger('pager', 'send', pageNum);
                    }
                });

                pager._container.show();
            },
            hide: function() {
                var me = this;
                me._container.hide();
            }
        });


        var edit=new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, c) {
                    me._render();
                    me._bind();
                });
                $rk.listener.on('table', 'success', function(act, json){
                    //pager._render(json);
                });
                $rk.listener.on('table', 'requesting', function(act) {
                    //me.hide();
                });
            },
            _container: $('#editmain'),
            _render: function(json) {
                var html = $rk.tplRender(dot, $('#mypage-control-edit-tml').html(), undefined);
                this._container.html(html);
            },
            _bind: function(){
                var that = this;
                this._container.off("click");  //#mainarea contrtable

                this._container.on("click",'#dialogBody',function(e){
                    if(e.target.id=="cancel_button"){
                        //open($(e.target).attr("href"));
                        //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        that.editHide();
                    }

                    if(e.target.id=="save_button"){
                        //alert("鼠标浮动 url:"+$(e.target).attr("href"));
                        var editdata={
                            "title":$("#title").val(),
                            "author":$("#authorTextInput").val(),
                            "txt":$("#summaryTextInput").val(),
                            "id":$("#save_button").attr("data-id")
                        };
                        that.setItemfun(editdata);
                    }

                    e.stopPropagation();
                    //e.preventDefault();
                })

            } ,
            setItemfun:function(postdata){
                var  that=this;
                var option = {
                    url : getItem,
                    data : postdata,
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {

                        if (json.ruixue_hfive_core_tag_microapp_mypage_table_edit.error==true) {
                            //$(that).parent().parent().remove();
                            // $rk.listener.trigger('list', 'change')

                            that.editHide();
                        }else{
                            //self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                        }

                    },
                    beforeSend: function() {

                    }
                }
                new Ajax(option);
            },
            getItemFun:function(id){
                var option = {
                    url : getItem,
                    data : {id :id},
                    dataType: 'json',
                    type: 'post',
                    success: function(json) {
                        btn.removeClass('ui-button-disabled');
                        if (json.ruixue_hfive_core_tag_microapp_mypage_table_delete.error==true) {
                            self.delTip.setContent('<div class="ui-msg ui-msg-suc">删除成功</div>');
                            //$(that).parent().parent().remove();

                               // $rk.listener.trigger('list', 'change')

                        }else{
                            //self.delTip.setContent('<div class="ui-msg ui-msg-error">删除失败</div>');
                        }

                    },
                    beforeSend: function() {

                        btn.addClass('ui-button-disabled');
                        self.delTip = new Tips({
                            button: btn,
                            content: '<div class="ui-msg ui-msg-loading">删除中</div>'
                        });
                        self.delTip.show();
                    }
                }
                new Ajax(option);
            },
            getEditData:function(id){
                var option = {
                    url : editTtem,
                    data : {id :id},
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                        //btn.removeClass('ui-button-disabled');
                        if (json.ruixue_hfive_core_tag_microapp_mypage_table_edit.error==true) {
                            var data=json.ruixue_hfive_core_tag_microapp_mypage_table_edit;
                            $("#title").val(data.data.title);
                            $("#authorTextInput").val(data.data.author);
                            $("#summaryTextInput").val(data.data.txt);
                            $("#ldg_lockmask").show();
                            $("#editmain").show();
                            $("#save_button").attr("data-id",id);
                        }else{

                        }

                    },
                    beforeSend: function() {

                    }
                }
                new Ajax(option);
            },
            editShow:function(id){
                this.getEditData(id);

            },
            editHide:function(){
                $("#ldg_lockmask").hide();
                $("#editmain").hide();
            },
            editItemFun:function(){

            }
        });


        var adddata=new $rk.VC({
                   _init: function() {
                       var me = this;

                       $rk.listener.on('plat', 'ready', function(e, c) {
                           me._render();
                           me._bind();
                       });
                   },
                   _container: $('#addplat'),
                   _render: function(json) {
                       var _this=this;
                       var tabletem = dot.template(document.getElementById('add-data-tml').text);
                       $("#addplat").html(tabletem());
                   },
                   _bind: function(){
                       var _this=this;
                       this._container.off("click");  //#mainarea contrtable
                       this._container.on("click",'.main-view',function(e){

                           if(e.target.className=="btn btn-primary"){
                               var data={"title":$("pageName").val(),"txt":$("#pageRemark").val(),"fileBox":$("compressedPackage")};
                               _this.sumitdata(data);
                           }
                       });
                   },
                   sumitdata:function(postdata){

                       //var fileobj=new upload({"fileBox":postdata.fileBox});
                       //fileobj.initIput();
                       // fileobj.send();
                       var ster= upload({"fileBox":postdata.fileBox,"url":addItem});  //"._init()"
                       //.prototype._init=function(obj){}

                       var option = {
                           url : addItem,
                           data :postdata,
                           dataType: 'json',
                           type: 'post',
                           success: function(json) {
                               //$rk.listener.trigger('table', 'success', json);
                               alert("mypage 我提交成功了..");
                           },
                           beforeSend: function() {
                               //debugger;
                           }
                       }
                       new Ajax(option);
                   }

               });
        };



        $Rk.plat.s(function(obj){
            setModel();
        });

    });

//




