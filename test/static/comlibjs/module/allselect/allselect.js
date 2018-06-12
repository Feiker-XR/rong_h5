define(function(require, exports, module) {
	var AllSelect = function(ele, options) {
		this.$ele = $(ele);
		this.item = $(document.body).find('['+ $(ele).data('item')+']');
		this.length = this.item.length;
		this.allItem = [];
		this.selectItem = [];
		this.unselectItem = [];
		this.init();
		this.bind();
	}
	$.extend(AllSelect.prototype, {
		init: function() {
			
		},
		bind: function() {
			var me = this;
			this.$ele.on('change', function(e) {
				if(me.checkSelect()) {
					me.allSelect();
				} else {
					me.unAll();
				}
			});
			this.item.on('change', function(e) {
				for(var i = 0; i < me.item.length; i++) {
					if(!$(me.item[i]).prop('checked')) {
						me.$ele.prop('checked', false);
						break;
					} else if(i == me.length - 1) {
						me.$ele.prop('checked', true);
					}
				}
				me.setSelect();
			})
		},
		setSelect: function() {
			this.selectItem = [];
			this.unselectItem = [];
			for(var i = 0; i < this.item.length; i++) {
				if($(this.item[i]).prop('checked')) {
					this.selectItem.push(this.item[i]);
				} else {
					this.unselectItem.push(this.item[i]);
				}
			}
		},
		getSelect: function(callback) {
			callback(this.selectItem);
			//return this.selectItem;
		},
		allSelect: function() {
			this.item.prop('checked', true);
			this.allItem = this.item;
			this.selectItem = this.item;
		},
		unAll: function() {
			this.item.prop('checked', false);
			this.selectItem = [];
		},
		checkSelect: function() {
			var checked;
			checked = this.$ele.prop('checked');
			return checked
		}
	});
	AllSelect.defaults = {
		
	}
	function Plugin(option,fn) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('allselect')
	      if (!data) $this.data('allselect', (data = new AllSelect(this, option)))
	      if (typeof option == 'string') data[option].call(data,fn)
	    })
	}

	$.fn.allselect = Plugin;
})