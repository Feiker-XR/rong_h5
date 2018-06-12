define(function(require, exports, module) {
	var IntervalMath = function(o) {
		//此插件适合页面中有写好的html标签
		var opt = $.extend({}, IntervalMath.defaults,{
			val1Data: '',
			val2Data: '',
			select1Data: '',
			select2Data: '',
			box: '',
			nameInput: ''
		}, o);
		var select1, select2, val1, val2, parent, select1Val = '[', select2Val = ']', val1Val, val2Val, saveInput;
		var creatEle = function() {
			parent = $(opt.box);
			if(opt.select1Data !== '') {
				select1 = findEle(parent, 'select', opt.select1Data, {
					options: [{
						name: '大于等于',
						id: '['
					}, {
						name: '大于',
						id: '('
					}]
				});
			}
			val1 = findEle(parent, 'input.text', opt.val1Data);
			val2 = findEle(parent, 'input.text', opt.val2Data);
			if(opt.select2Data !== '') {
				select2 = findEle(parent, 'select', opt.select2Data, {
					options: [{
						name: '小于等于',
						id: ']'
					}, {
						name: '小于',
						id: ')'
					}]
				});
			}
			saveInput = findEle(parent, 'input.hidden', 'saveInput');
			saveInput.attr('name', opt.nameInput);
			bind();
		};
		var findEle = function(parent, type, DataName, opt) {
			var ele = parent.find('[data-ele='+DataName+']');
			if(ele.length > 0) {
				if(DataName == 'saveInput') {
					var data = ele.val();
					setValue(data);
				}
				return ele
			};
			var nodeType = type.split('.')[0];
			var inputType = $.type(type.split('.')[1]) !== 'undefined' ? type.split('.')[1] : 'undefined';
			var ele = nodeType ? $('<'+nodeType+'/>').attr({type: inputType}) : $('div');
			if($.type(DataName) == 'string') ele.addClass('ui-input');
			parent.append(ele);
			return ele;
		}
		var bind = function() {
			parent.on('change', 'select', function(e) {
				e.preventDefault();
				saveInput.val(getValue());
			})
			parent.on('blur', 'input', function(e) {
				e.preventDefault();
				saveInput.val(getValue());
			});
		}
		var getValue = function() {
			var str = '';
			select1Val = select1 ? select1.val() : select1Val;
			select2Val = select2 ? select2.val() : select2Val;
			val1Val = val1.val();
			val2Val = val2.val();
			if(val1Val != '' && val2Val != '') {
				str += select1Val + val1Val +'-'+ val2Val + select2Val;
			}
			return str;
		};
		var setValue = function(str) {
			var reg = /([\[|\(])(\w+)\-(\w+)([\]|\)])/;
			if(!reg.test(str)) return;
			var matchArr = $.trim(str).match(reg);
			if(matchArr[1] == '(') {
				if(select1) {
					select1.val('(');
				}
			} else if(matchArr[1] == '[') {
				if(select1) {
					select1.val('[')
				}
			}
			if(matchArr[4] == ')') {
				if(select2) {
					select2.val(')');
				}
			} else if(matchArr[4] ==']') {
				if(select2) {
					select2.val(']');
				}
			}
			val1.val(matchArr[2]);
			val2.val(matchArr[3]);

		};
		creatEle();
	};
	IntervalMath.defaults = {

	};
	module.exports = IntervalMath;
});