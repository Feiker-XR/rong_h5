define(function(require, exports, module) {
	var dot = require('dot');
	var tips = function(opt){
		$Rk.BassClass.call(this);
		this.id  =opt.id;
		this.opt = opt;
		this.opt.guid = this.guid;
        console.log(this.guid);
		this.timeoutId='';
		this.type='';
		this.time=(opt.time==undefined)?1000:opt.time;
		this.tpl = [
				'<div id="j_tips_{{=it.guid}}" class="ui-tip-position" style="display:none">',
		            '<div class="ui-tip">',
		                '<div id="j_tips_content_{{=it.guid}}">{{=it.content}}</div>',
		                '<span id="j_tips_arrow_{{=it.guid}}" class="poptip-arrow ui-tip-bottom"><em>◆</em><i>◆</i></span>',
		                '<a href="javascript:void(0);" id="j_tips_close_{{=it.guid}}" class="ui-tip-close">x</a>',
		            '</div>',
		        '</div>'
		].join('');
		this._init();
	}
	$Rk.extend(tips, $Rk.BassClass);
	$.extend(tips.prototype,{
		_init : function(){
	
		},
		bind: function() {
			var me = this;
        	$('#j_tips_close_' + this.guid).on('click',function(){
        		me.close();
        	});
        	if(this.type=='hover'){me.tipsHover();}
        },
        addDom:function(){
        	var tipsHtml = $rk.tplRender(dot, this.tpl, this.opt);
			$('#'+this.id).after(tipsHtml);
			var idStr='#j_tips_' + this.guid;
			var t=$('#'+this.id).height()+$(idStr).height();
			$(idStr).css({top:'-'+t+'px',left:'0px'});
        },
        open: function() {
        	var idStr='#j_tips_' + this.guid;
        	if($(idStr).length){$(idStr).fadeIn();return;}
            this.addDom();
            $(idStr).fadeIn();
			this.bind();
        },
        close: function() {
            $('#j_tips_' + this.guid).fadeOut();
        },
        click: function() {
        	var me = this;
        	this.type ='click'
        	$('#'+this.id).on('click',function(){
        		me.open();
        	});
        },
        hover: function() {
        	var me = this;
        	this.type ='hover'
        	$('#'+this.id).hover(function(){
        		window.clearTimeout(me.timeoutId);
        		me.open();
        	},function(){
				me.timeoutId=window.setTimeout(function(){me.close();}, me.time);
        	});
        },
        tipsHover: function() {
        	var me = this;
        	$('#j_tips_' + this.guid).hover(function(){
        		window.clearTimeout(me.timeoutId);
        		me.open();
        	},function(){
				me.timeoutId=window.setTimeout(function(){me.close();}, me.time);
        	});
        },
        setValue:function(val){
        	$('#j_tips_content_' + this.guid).html('');
        	$('#j_tips_content_' + this.guid).html(val);
        }
	});

	module.exports = tips;
})