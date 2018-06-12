define(function(require, exports, module){
	var Drawer = function(option) {
		this.opt = {};
		option && $.extend(this.opt, Drawer.defaults, option);
		this.init();
	};
	Drawer.defaults = {
		width: 680,
		zIndex: 1000,
		speed: 400/680,
		title: '默认标题',
		content: "内容",
		afterOpen: function() {},
		tpl: '<div class="drawer drawer-@id@">\
		<div class="drawer-title">\
		<h3 class="title"></h3>\
		<span class="drawer-close-btn">X</div>\
		<div class="drawer-content"></div>\
		</div>'
	};
	$.extend(Drawer.prototype, {
		init: function() {
			var opt = this.opt;
			$rk.BassClass.call(this);
			opt.tpl = opt.tpl.replace(/@id@/, this.guid);
			var tempDiv = $('<div/>').append(opt.tpl);
			this.drawer = tempDiv.find('.drawer-' + this.guid);
			this.title = this.drawer.find('.drawer-title .title');
			this.closeBtn = this.drawer.find('.drawer-close-btn');
			this.content = this.drawer.find('.drawer-content');
			this.doc = $(document.body);
			this.win = $(window);
			this.doc.append(this.drawer);
			this.mask();
			this.setDefaultStyle();
			this.setTitle(opt.title);
			this.setContent(opt.content);
			this.bind();

		},
		open: function() {
			var opt = this.opt;
			var timeout, me = this;
			this.doc.addClass('drawerPosition');
			this.resize();
			opt.afterOpen();
			this.showMask();
			this.drawer.show();
			this.drawer.animate({
				right: 0
			}, opt.speed * opt.width);
			this.win.on('resize', function() {
				clearTimeout(timeout);
				timeout = setTimeout($.proxy(me.resize, me), 80);
			});
		},
		setDefaultStyle: function() {
			var opt = this.opt;
			var client = this.getClient();
			this.drawer.css({
				position: 'absolute',
				zIndex: opt.zIndex,
				width: opt.width,
				height: client.winH,
				top: client.sTop,
				display: 'none'
			});
			this.drawer.css({
				right: -this.drawer.outerWidth()
			});
		},
		close: function() {
			var opt = this.opt;
			this.doc.removeClass('drawerPosition');
			this.win.off('resize');
			this.hideMask();
			this.drawer.hide();
			this.drawer.animate({
				right: -this.drawer.outerWidth()
			}, opt.speed * opt.width);
		},
		resize: function() {
			var me = this;
			var client = me.getClient();
			me.drawer.animate({
				height: client.winH,
				top: client.sTop
			}, 10)
			this.mask.animate({
				height: client.winH,
				top: client.sTop
			}, 10)
		},
		getClient: function() {
			var winH = $(window).height();
			var winW = $(window).width();
			var scrollTop = $(window).scrollTop();
			return {
				winW: winW,
				winH: winH,
				sTop: scrollTop
			};
		},

		setTitle: function(title) {
			this.title.html(title);
		},
		setContent: function(content) {
			this.content.html(content);
		},
		bind: function() {
			var me = this;
			this.closeBtn.on('click', function(e) {
				e.preventDefault();
				me.close();
			});
		},
		mask: function() {
			var opt = this.opt;
			this.mask = $('<div class="drawer-mask"></div>').css({
				display: 'none',
				zIndex: opt.zIndex++
			});
			this.doc.append(this.mask);
		},
		showMask: function() {
			var me = this;
			var client = me.getClient();
			this.mask.fadeIn('slow');
			this.mask.css({
				height: client.winH,
				top: client.sTop
			})
		},
		hideMask: function() {
			this.mask.fadeOut('slow');
		}
	})
	module.exports = Drawer;
})