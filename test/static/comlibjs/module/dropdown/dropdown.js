define(function(require, exports, module) {
	var Dropdown = function(ele, options) {
		$.extend(options, $.extend(Dropdown.defaults, options));
		this.opt = options;
		this.open = false;
		this.$element = $(ele);
		this.init();
	};
	$.extend(Dropdown.prototype, {
		init: function() {
			var opt = this.opt;
			this.bind();
		},
		bind: function() {
			var opt = this.opt;
			var me = this;
			if(opt.events === 'click') {
				$(opt.menu).on('click', function(e) {
					e.stopPropagation();
				})
				this.$element.on('click', function(e){
					e.preventDefault();
					console.log($(this).hasClass('open'));
					if($(this).hasClass('open')) return;
					me.docEvent();
				})
				
			} else {
				var el = [me.$element, $(opt.menu)];
				$.each(el, function() {
					$(this).on('mouseenter',function(e) {
						e.preventDefault();
						clearTimeout(me.timeout);
						me.toggleMenu();
					}).on('mouseleave', function(e) {
						e.preventDefault();
						clearTimeout(me.timeout);
						me.toggleMenu();
					})
				});
			}
			
		},
		docEvent: function() {
			var me = this;
			$(document).on('click.bs.dropdown.data-api', function(e) {
				if($(e.target).hasClass('open')) {
					return;
				} else if( e.target == me.$element[0] ) {
					me.clear();
					me.toggleMenu();
				} else {
					me.clear();
				}
			})
		},
		toggleMenu: function() {
			var opt = this.opt;
			var me = this;
			this.setPosition();
			this.setMenuSize();
			if(this.open) {
				this.timeout = setTimeout(function() {
						$(opt.menu).hide();
						me.$element.removeClass('open');
					}, 200);
				me.open = false;
			} else {
			
				this.timeout = setTimeout(function() {
							me.$element.addClass('open');
							$(opt.menu).show();
						}, 200);
				me.open = true;
			}
			if(opt.events == 'click') {
				me.docEvent();
			}
			
		},
		clear:function() {
			this.open = false;
			$('[data-menu="dropdown"]').hide();
			$('[data-toggle="dropdown"]').removeClass('open');
			if($('[data-toggle="dropdown"]').length < 1 ) 
				throw new Error('页面缺少属性data-toggle的标签');
			$(document).off('click.bs.dropdown.data-api');
		},
		setPosition: function() {
			var opt = this.opt;
			var x = this.$element.offset().left;
            var y = this.$element.offset().top;
            var h = this.$element.outerHeight();
            var menuW = $(opt.menu).width();
            var menuH = $(opt.menu).height();
            var winW = $(window).width();
            var winH = $(window).height();
            if(x + menuW > winW ) {
            	x = winW - menuW;
            } else if( x + menuW < 0) {
            	x = 10;
            }
            if(y + menuH > winH) {
            	y = winH - menuH;
            } else if( y + menuH < 0) {
            	y = 10;
            }
            $(opt.menu).css({
            	position: 'absolute',
            	left: x,
            	top: y + h
            })
		},
		setMenuSize: function() {
			var opt = this.opt;
			console.log(opt.width);
			$(opt.menu).width(opt.width);
		}
	})

	Dropdown.defaults = {
		events: '',
		width: 20
	}
	function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('dropdown')
	      if (!data) $this.data('dropdown', (data = new Dropdown(this, option)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	}

	$.fn.dropdown = Plugin;
})