/* 
* @Author: Administrator
* @Date:   2015-12-23 11:50:21
* @Last Modified by:   Administrator
* @Last Modified time: 2016-01-04 18:25:39
*/
seajs.use(['jqui', 'Ajax', 'dot', 'Validate', 'formsend', 'upload','Dialog', 'bootstrap', 'Ztree'], 
    function(jqui,Ajax,dot,Validate,formsend,Upload,Dialog,bootstrap,Ztree) {

    var setModel = function() {

        var previousUrl = $$r.routers.data.previous,
            //addDetailUrl = $$r.routers.data.link.addDetail,
            editDetailUrl = $$r.routers.data.link.editDetail,
            isAdd = !$rk.getUrlAllParam().id,  // true create
            editId = $rk.getUrlAllParam().id || -1;

            $( "#tabs" ).tabs();

            var editForm = new $rk.VC({
               _init: function() {
                   var me = this;
                   $rk.listener.on('plat', 'ready', function(e, json) {
                       // me._render(json);
                       me._operation();
                   });
               },
               _container: $('#j_con_form'),
               _render: function(data) {
                  
               },
               _operation: function () {
                   var me = this;
                   me._container.on('click','[data-op]',function(e){
                        var op = $(this).data('op');
                        switch (op) {
                           case 'sel_modal':
                                me.sel_modal($(this));
                                break;
                            case 'selSubmit':
                                 me.selSubmit($(this));
                                 break;
                            case 'selCancel':
                                 me.selCancel($(this));
                                 break;
                        }
                    });
               },
               sel_modal:function(dom){
                var me = this; 
                    dom.attr('data-toggle','modal');
                    // 加载树结构
               },
               selSubmit:function(dom){
                    $('#j_close').click();
               },
               selCancel:function(dom){
                    
               }
            });

       /* var title = new $rk.VC({
            _init: function() {
                var me = this;
                $rk.listener.on('plat', 'ready', function(e, json) {
                    me._render(json);
                });
            },
            _container: $('#j_con_title'),
            _render: function(data) {
                data.title = isAdd ? '新建粉丝标签': '编辑粉丝标签'
                var html = $rk.tplRender(dot, $('#j_view_title').html(), data || {});
                this._container.html(html);
            }
        });*/

        /*var editForm = new $rk.VC({
            _init: function() {
                var me = this;
                
                $rk.listener.on('plat', 'ready', function(act, json) {
                    // me.getSuggestHot(json);
                    if (!isAdd) {  // false   edit
                        me.getEditDetail()
                    }else{
                        me._render(json);
                        me.setValidate();
                    }
                    if(me.siteId){
                        me.initRequest();
                    }
                    

                });
                $rk.listener.on('m.form', 'ready', function(act, json) {
                    me._bindUpload(json);
                });

            },
            getSuggestHot:function(json){
                var me = this;
                new Ajax({
                    url: suggestHotUrl,
                    type:'get',
                    dataType:'json',
                    success:function(json){
                        if($rk.ajaxSuccess(json)) {
                            me.hot = json.data.suggestHot;
                        }
                    }
                })
            },

            getEditDetail: function () {
                var me = this;
                if (true) {
                    me._render($rk.getUrlAllParam());
                    me.setValidate();                    
                }else{
                    new Ajax({
                        url:getDetailUrl,
                        type:'get',
                        dataType:'json',
                        data : {id : editId},
                        success:function(data){
                            if (data.errno > 10000) {
                                alert(data.errmsg || '后台服务错误。')
                                return
                            }
                            if($rk.ajaxSuccess(data)) {
                                me._render(data);
                                me.setValidate();
                            }
                        }
                    })
                }
            },

            _bindUpload: function(data) {

                var me =this;

                $('.j_upload').each(function (i, m) {
                    var imgOpt = {
                        img : {
                            className : 'img-size img-size-8',
                            original_w : 45,
                            original_h : 45
                        }
                    }
                    var opt = {
                        label : '选择图标',
                        fileBox : $(m),
                        upbox : $(m).parents('.le_box_t').find('.j_upload_show'),
                        defaultImg:"",
                        img : imgOpt.img,
                        m : {
                            Upload : Upload
                        },
                        upUrl : $$r.upload[1],
                        beforeItemSend : function(){

                        },
                        upSuccess : function(json){
                            me.imgurl = json.url;
                            me._container.find('.hideInput').val(me.imgurl);
                            setTimeout(function() {
                                $('.ui-up-progress').hide();
                            }, 500);
                            me.hideInputChange();
                        }
                    }
                    if(isAdd){
                        $('.j_upload_show').html($Rk.ext.up.getItemHtml(imgOpt));
                    }
                    $Rk.ext.up.bindUpload(opt);
                })
            },
            _container: $('#j_con_form'),
            _render: function(json) {
                var me = this;
                $rk.listener.trigger('m.form', 'ready', json);
            },

            setValidate: function() {
                var me = this;
                me.validate = new Validate();
                me.validate.sb({
                    display: 'inline-block',
                    form: 'j_edit_form',
                    sb: 'j_save',
                    success: function(form, btn) {
                        me.formsend();
                    },
                    error : function(){
                        console.log('err');
                    }
                })
            },
            hideInputChange : function(){
                if($("input[name='siteLogo']").val()!=""){
                    $("#siteHide").hide();
                }
            },
            formsend: function() {
                var me = this;
                var dt = $rk.plat.serializeObject( $('#j_edit_form') );
                dt.id = editId
                new formsend({
                    tipText: '保存中',
                    data: dt,
                    form: $('#j_edit_form'),
                    submit: $('#j_save'),
                    tipText:"保存中",
                    success:function(data){
                        console.log(data)
                        window.location.href = previousUrl
                    }
                })
            },
            siteId : $rk.getUrlAllParam().siteId,
            initRequest: function(){
                var me = this;
                var option = {
                    url : getDetailUrl,
                    data : {"siteId" :this.siteId},
                    dataType: 'json',
                    type: 'get',
                    success: function(json) {
                       me._render(json);
                        $Rk.ext.up.setPic({
                            "upbox":$('#j_upload_show'),
                            "imgUrl":json.data.siteLogo
                        });

                        me.setValidate();

                     },
                    error : function(){
                        console.log('err');
                    }
                }
                new Ajax(option);
            }
        })*/
    }

    $rk.plat.s(function () {
        setModel()
    })

});
