define(function(require, exports, module) {
	var dot = require('dot');
	var selectMultiple = function(id,opt, fun){
	
		this.id =  id;
		this.opt = opt;

		//增加回调函数fun by yangtao fun 


		this.fun = fun || function(){};

		this.tpl = [
		        '<ul class="sel_l">',
	       		'{{ for(var key in it.leftData) { }}',
	        	'<li id="{{=it.leftData[key].id}}">',
	        		'{{=it.leftData[key].name}}',
	        	'</li>',
	        	'{{ } }}',
		        //'{{~it.leftData :value:index}}',
		        //'<li>{{=value}}</li>',
				//'{{~}}',
		        '</ul>',
		        '<div>',
		            '<button data="sel_l" class="ui-button">=&gt;</button>',
		            '<button data="sel_r" class="ui-button">&lt;=</button>',
		        '</div>',
		        '<ul class="sel_r">',
		        '{{ for(var key in it.rightData) { }}',
	        	'<li id="{{=it.rightData[key].id}}">',
	        		'{{=it.rightData[key].name}}',
	        	'</li>',
	        	'{{ } }}',
		        //'{{~it.rightData :value:index}}',
				//'<li>{{=value}}</li>',
				//'{{~}}',
		        '</ul>'
		].join('');
		
		this._init();
		this.bind();

	}
	$.extend(selectMultiple.prototype,{
		_init : function(){
			var selectMultipleHtml = $rk.tplRender(dot, this.tpl, this.opt);
			$('#'+this.id).attr('class','ui-select-multiple');
			$('#'+this.id).append(selectMultipleHtml);
		},
		bind: function() {
			var _this = this;
            var idStr='#'+this.id;
            $(idStr).on('click', 'li', function(e) {
            	($(this).attr('class')=='here')?$(this).removeClass('here'):$(this).addClass('here');
            });
            $(idStr).on('click', 'button', function(e) {
            	var type=$(this).attr('data');
            	var sel_t=idStr+' .'+type;
            	var sel_l=idStr+' .sel_l';
            	var sel_r=idStr+' .sel_r';
            	var data0=[],data1=[],dataTemp=[],data_0_0=[],data1_1=[],dataTemp2=[];
            	$(sel_t+' .here').each(function(e){
            		dataTemp.push($(this).text());
            		dataTemp2.push($(this).attr("id"));
            	});
            	if(dataTemp=='' && dataTemp2==''){return}
            	$(sel_l+' li').each(function(e){
            		data0.push($(this).text());
            		data_0_0.push($(this).attr("id"));

            	});
            	$(sel_r+' li').each(function(e){
            		data1.push($(this).text());
            		data1_1.push($(this).attr("id"));
            	});
            	if(type=='sel_l'){

	  				data0=minusArray(data0,dataTemp);
	  				data_0_0 = minusArray(data_0_0,dataTemp2);

	  				data1=mergeArray(data1,dataTemp);
	  				data1_1 = mergeArray(data1_1,dataTemp2);


	  			}else{
	  				data0=mergeArray(data0,dataTemp);
	  				data_0_0 = mergeArray(data_0_0,dataTemp2);

	  				data1=minusArray(data1,dataTemp);
	  				data1_1 = minusArray(data1_1,dataTemp2);
	  			}
  				var html='';

        		for(var i=0;i<data0.length;i++){
        			html+='<li id='+data_0_0[i]+'>'+data0[i]+'</li>';
        		}


        		$(sel_l).html('').html(html);
        		html='';
        		for(var i=0;i<data1.length;i++){
        			html+='<li id='+data1_1[i]+'>'+data1[i]+'</li>';
        		}
        		$(sel_r).html('').html(html);


        		//调用回调函数fun by yangtao
        		_this.fun();
            })
        },
        getData: function(type,key) {
        	var idStr='#'+this.id;
        	var sel_l=idStr+' .sel_l';
        	var sel_r=idStr+' .sel_r';
        	var data0=[],data1=[];
        	var key=(key=='name')?'name':'id';
        	$(sel_l+' li').each(function(e){
        		var val='';
        		if(key=='id'){val=$(this).attr('id');}
        		if(key=='name'){val=$(this).text();}
        		data0.push(val);
        	});
        	$(sel_r+' li').each(function(e){
        		var val='';
        		if(key=='id'){val=$(this).attr('id');}
        		if(key=='name'){val=$(this).text();}
        		data1.push(val);
        	});
        	if(type=='left'){return {'leftData':data0};}
        	if(type=='right'){return {'rightData':data1};}
        	if(type=='all'){return {'leftData':data0,'rightData':data1};}
        }
	});

	function minusArray(arr1,arr2){   //第一个数组减去第二个数组
	    if(arr2.length==0){return arr1}
	    var diff=[];
	    var str=arr2.join("&quot;&quot;");
	    for(var e in arr1){
	        if(str.indexOf(arr1[e])==-1){
	            diff.push(arr1[e]);
	        }
	    }
	    return diff;
	}

	function mergeArray(arr1, arr2) { //第一个数组合并第二个数组 并排重
		var _arr = [];
		for (var i = 0; i < arr1.length; i++) {
			_arr.push(arr1[i]);
		}
		var _dup;
		for (var i = 0; i < arr2.length; i++){
			_dup = false;
			for (var _i = 0; _i < arr1.length; _i++){
				if (arr2[i]===arr1[_i]){
					_dup = true;
					break;
				}
			}
			if (!_dup){
				_arr.push(arr2[i]);
			}
		}
		
		return _arr;
	} 

	module.exports = selectMultiple;
})