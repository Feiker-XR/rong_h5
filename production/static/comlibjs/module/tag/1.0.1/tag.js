define(RKC.seaConfig.alias.tag,['../../tips/1.0.2/tips','../../ajax/1.0.1/ajax','../../selectarea/1.0.1/selectarea'],function(require, exports, module) {
	var dot = require('dot');
	var Ajax = require('Ajax');
	var SelectArea = require('selectarea');
	var tag = function(opt, element) {
		this.opt = $.extend({
			m_link: '',
			l_link: '',
			param:{
				id: 'id'
			},
			onsubmit: function() {},
			afterAdd: function() {},
			afterRemove: function() {},
			afterSetDefaultRag: function() {},
			m_tpl: '<dl data-act="requireList" id="level0"><dt>&nbsp;</dt>\
					<dd>\
					{{~it.data :value:index}}\
					<p data-op="req" data-id="{{=value.id}}">{{=value.name}}</p>\
					{{~}}\
					</dd>\
					</dl><dl \
					data-act="left" id="level1">\
		                <dt>所有角色</dt>\
		                <dd></dd>\
		            </dl><dl \
		            data-act="right"  id="level2">\
		                <dt>已选角色</dt>\
		                <dd id="sortable" class="ui-sortable"></dd>\
		            </dl>',
	        l_tpl: '<dd>\
	                    {{~it :value:index}}\
	                        <p {{? value.selected }}class="on"{{?}} data-id="{{=value.id}}" data-jid="{{=value.id}}"><span data-op="del" class="hide">删除</span><span data-op="add" class="hide">添加</span><b>{{=value.name}}</b></p>\
	                    {{~}}\
	                </dd>',
	        r_tpl:  '{{~it :value:index}}\
	                    {{? value.selected }}\
	                    <p data-id="{{=value.id}}" data-jid="{{=value.id}}"><span data-op="del" class="hide">删除</span><b>{{=value.name}}</b></p>\
	                    {{?}}\
	                {{~}}'
		}, opt);
		this.select = opt.select;
		this.currentItem = null;
		this.data = this.opt.data;
		this.selectedItem = {};
		this.init();
	}
	$.extend(tag.prototype, {
		init: function() {
			this.renderframe(this.data);
			this.bind();
		},
		repeat: function() {

		},
		bind: function() {
			var me = this;
			var rqLable = $('[data-act=requireList]');
			var lpool = $('[data-act=left]');
			var rpool = $('[data-act=right]');
			var url = '/wallpaper/tag/getlist';
			me.currentItem = rqLable.find('.on');
			rqLable.on('click', '[data-op]', function(e) {
				var op = $(this).data('op');
				var id = $(this).data(me.opt.param.id);
				if(!$(this).hasClass('on')) {
					me.currentItem && me.currentItem.removeClass('on');
					me.currentItem = $(this);
					me.currentItem.addClass('on');
					me.require({
						url: url,
						data: {
							id: id
						}
					})
				} else {
					return;
				}
			});
			this.select.on('click', '[data-op=sb]', function(e) {
				e.preventDefault();
				var op = $(this).data('op');
				switch(op) {
					case 'sb':
						var data = me.getdata();
						me.opt.onsubmit(data);
					break;
				}
			});
			$(document.body).on('outputData', 
			function() {
				var data = me.getdata();	
            	me.opt.onsubmit(data);
            });
            $(document.body).on('delItem', 
			function(e, id) {
				me.delSelectLabel(id);
            });
		},
		initdata: function(json) {
			var me = this;
			this.setDefaultTag(this.opt.tags);
			$.each(json.data, function(i, v) {
				if(v['selected'] == true) {
					me.require({
						url: '/tag/getlist',
						data: {
							id: v[me.opt.param.id]
						}
					})
				}
			})
		},
		require: function(obj) {
			var me = this;
			this.showmask();
			new Ajax({
				data: obj.data || {},
                type: 'get',
                url: obj.url,
                beforeSend: function() {
                    
                },
                success: function(json) {
                	var selectedArr = [];
                	var filterSelectenArr = [];
                    if ($rk.ajaxSuccess(json)) {
                    	$.each(json.data, function(i, v) {
                    		if(v['selected'] == true){
                    			selectedArr.push(v);
                    			var obj = me.filter(selectedArr);
                    			me.selectedItem = obj.selectedItem;
                    			filterSelectenArr = obj.arr;
                    		}
                    	})
                    	me.hidemask(function() {
                    		me.renderLlevel(json.data);
                 			me.renderRlevel(filterSelectenArr);
                    	});
                 		
                    }else{
                      //数据返回错误  
                    }
                },
                dataType: 'json'
			})
		},
		filter: function(arr) {
			var selectedItem = this.selectedItem,temparr=[],me=this;
			for(var i = 0; i < arr.length; i++) {
				if(!selectedItem[arr[i][me.opt.param.id]]) {
					selectedItem[arr[i][me.opt.param.id]] = arr[i];
					arr[i]['selected'] = true;
					temparr.push(arr[i]);
				} 
			}
			return {
				arr: temparr,
				selectedItem: selectedItem
			};
			
		},
		setDefaultTag: function(arr) {
			var obj = this.filter(arr);
			this.renderRlevel(obj.arr);
			this.opt.afterSetDefaultRag();
		},
		setselect: function(arr) {
			var me = this;
			var selectedItem = me.selectedItem;
			$.each(arr, function(i, v) {
				if(!!selectedItem[v[me.opt.param.id]]) {
					v['selected'] = true;
				}
			})
		},
		renderLlevel: function(json) {
			var me = this;
			var lpool = $('[data-act=left]');
			me.setselect(json);
			var html_l = $rk.tplRender(dot, me.opt.l_tpl, json);
			lpool.find('dd').remove().end().append(html_l);
		},
		renderRlevel: function(json) {
			var me = this;
			var rpool = $('[data-act=right]');
			var html_r = $rk.tplRender(dot, me.opt.r_tpl, json);
			rpool.find('dd').append(html_r);
		},
		initselectarea: function() {
			var me = this;
			var lpool = $('[data-act=left]');
			var rpool = $('[data-act=right]');
			new SelectArea({
				box: me.select,
				lbox: lpool,
        		rbox: rpool,
				field: {
					id: 1,
					name : 1
				},
				afterAdd: function(dom) {
					var obj = {
						id: dom.data('id'),
						selected: true,
						name: dom.find('b').text()
					};
            		me.selectedItem[obj.id] = obj;
            		me.opt.afterAdd();
				},
				afterRemove: function(dom) {
					var id = dom.data('id');
					delete me.selectedItem[id];
				}
			});
		},
		getdata: function() {
			var me = this;
			var returnJson = {};
			var poolR = $('[data-act=right]');
			var item = poolR.find('dd');
			var json = {list: []};
			$.each(item.children(), function(i, v) {
				var id = $(this).data(me.opt.param.id);
				json.list.push(me.selectedItem[id]);
			});
			return json;
		},
		renderframe: function(json) {
			var html = $rk.tplRender(dot, this.opt.m_tpl, json);
			this.select.html(html);
			this.initdata(this.data);
			this.initselectarea();
			this.createmask();
		},
		delSelectLabel: function(id) {
			delete this.selectedItem[id];
			var ele = this.select.find('[data-act=right] [data-id='+ id +']');
			ele.remove();
		},
		showmask: function() {
			this.$mask.fadeIn('slow');
			this.$loading.fadeIn('slow');
		},
		hidemask: function(fun) {
			this.$mask.fadeOut(10, function() {
				fun();
			});
			this.$loading.fadeOut(10);
		},
		createmask: function() {
			var mask = '<div class="ui-mask"></div>';
			var loading = '<p class="ui-msg ui-msg-loading">loading</p>';
			this.$mask = $(mask);
			this.$loading = $(loading);
			this.$mask.hide();
			this.$loading.hide();
			this.select.append(this.$mask).append(this.$loading);
		}

	});
	tag.get
	module.exports = tag;
})