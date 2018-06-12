/*
* @Author: Administrator
* @Date:   2016-05-11 18:43:23
* @Last Modified by:   Administrator
* @Last Modified time: 2016-05-11 18:46:40
*/

define(function(require, exports, module) {
	var MenuList = function(ele, options) {
		this.$ele = $(ele);
		this.item = $(document.body).find('['+ $(ele).data('item')+']');
		this.length = this.item.length;
		this.allItem = [];
		this.selectItem = [];
		this.unselectItem = [];
		this.init();
		this.bind();
	}
	$.extend(MenuList.prototype, {
		init: function() {
			
		},
		bind: function() {
			var me = this;
			this.$ele.on('change', function(e) {
				if(me.checkMenu()) {
					me.menuList();
				} else {
					me.unAll();
				}
			});
		},
		setMenu: function() {
			this.selectItem = [];
			this.unselectItem = [];
			
		},
		getMenu: function(callback) {
			callback(this.selectItem);
			//return this.selectItem;
		},
		menuList: function() {
			this.allItem = this.item;
			this.selectItem = this.item;
		},
		unAll: function() {
			this.selectItem = [];
		},
		checkMenu: function() {
		}
	});
	MenuList.defaults = {
		
	}
	function Plugin(option,fn) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('allselect')
	      if (!data) $this.data('allselect', (data = new MenuList(this, option)))
	      if (typeof option == 'string') data[option].call(data,fn)
	    })
	}

	$.fn.allselect = Plugin;
});