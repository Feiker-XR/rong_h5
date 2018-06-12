define(RKC.seaConfig.alias.dialog,['../autocomplete/jquery.autocomplete.js','../json2/json2.js'],function(require, exports, module) {
	var autocomplete = require('autocomplete');
	var json2 = require('json2');
	
	var TagComplete = function(options) {
		var defaults = {
			inputClass: 'tab',
			limit:0,
			afteradd: function() {},
			afterdel: function() {}
		};
		$.extend(options, $.extend(defaults, options));
		this.opt = options;
		this.init();
	}
	$.extend(TagComplete.prototype,{
		init: function() {
			var select = {}, me = this;
			var opt = this.opt;
			if(opt.box.find('[type=hidden]').length == 0) { 
				var input = $('<input class="ui-input tag-input" type="text" />');
				var btn = $('<a href="" data-op="add" class="ui-button tag-add-btn">添加</a>');
				var error = $('<p class="ui-msg ui-msg-error le-hint hide"></p>');
				var leWord = $('<div class="text-group"></div>');
				var listInput = $('<input type=hidden data-err="请选择标签" data-user="require" name='+ this.opt.inputClass +' />');
				var tab = '<span class="ui-tag-item item" data-op="del" data-name="&name&" data-id="&id&">&name&<i class="close-icon"></i></span>';
				leWord.append(listInput);
				this.opt.box.append(input).append(btn).append(error).append(leWord);
			} else {
				var input = opt.box.find('.tag-input');
				var btn = opt.box.find('.tag-add-btn');
				var leWord = opt.box.find('.text-group');
				var error = opt.box.find('.ui-msg-error');
				var listInput = opt.box.find('[type=hidden]');
			}
			var tab = '<span class="ui-tag-item item" data-op="del" data-name="&name&" data-id="&id&">&name&<i class="close-icon"></i></span>';
			input.autocomplete({
                url: this.opt.url
            }).result(function(e, obj) {
            	select = obj;
            })
			this.opt.box.on('click', '[data-op]' ,function(e) {
				e.preventDefault();
				var op = $(this).data('op');
				var ids;
				switch(op) {
					case 'add':
						ids = me.getIdList();
						if(opt.limit > 0 && ids.length >= opt.limit){
							opt.limitError ? opt.limitError.call(me) : me.limitError();
							return;
						}
						if(!select.id || me.indexof(ids, select.id) != -1) {
							input.val('');
							return;
						}
						var inner = tab.replace(/&id&/g, select.id)
						.replace(/&name&/g, select.name);
						leWord.append(inner);
						select = {};
						input.val('');
						var ids = me.getIdList();
						listInput.val( JSON.stringify(ids) ).trigger('change');
						me.opt.afteradd(me.getItemData());
						break;
					case 'del':
					$(this).remove();
					ids = me.getIdList();
					ids = ids.length == 0 ? '' : JSON.stringify(ids);
					listInput.val(ids).trigger('change');
					me.opt.afterdel(me.getItemData());
					break;
				}
				
			});
		},
		limitError:function(){
			alert("不能继续添加乐词了！");
		},
		getIdList: function() {
			var list = this.opt.box.find('.text-group .item');
			var ids = [];
			$.each(list, function(i, v) {
				ids.push($(this).data('id'));
			});
			return ids;
		},
		getItemData: function() {
			var list = this.opt.box.find('.text-group .item');
			var data = [];
			$.each(list, function(i, v) {
				data.push({
					id: $(this).data('id'),
					name: $(this).data('name')
				});
			});
			return data;
		},
		indexof: function(arr, item, index) {
			var n = arr.length, i = index || 0;
			if(i < 0)
				i += n;
			for(; i < n; i++) {
				if(arr[i] === item)
				return i;
			}
			return -1;
		}

	})

	module.exports = TagComplete;
})