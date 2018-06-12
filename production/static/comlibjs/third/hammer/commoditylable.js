/**
 * @class res  无
 * @Description 完成商品 标签 创建 删除 拖动 功能
 * @singleton
 * @createTime 2016-03-11
 * @updateTime 2016-03-11
 * @author 韩充满
 * @version 1.0
 */
//import，export

//import (mobilelable.js)

(function(win){
    var _frm_top=0;
    var _frm_bottom=0;
    var _frm_height=0;
    var _frm_width=0;
    var START_X = 0;
    var START_Y =0;
    var _frm_id="";
    var _from_obj="";
    var initScale = 1;
    var initAngle = 0;
    var count=0;
    var _box={"height":200,"width":200};
    var _frmid={};
    var _pos={x:0,y:0};
    var _posarr={};
    var _lables={};

    function randomnum(min,max){
        var range = max - min;
        var rand = Math.random();
        var num = min + Math.round(rand * range);
        return num;
    }
    function init(_id,boxid,htmlstr,boxsize,tagid){
        _frm_id=_id;

        _box.width=boxsize.width;
        _box.height=boxsize.height;

        _from_obj=document.querySelector(_frm_id);//获取文档中 id="demo" 的第一个元素	
        _frm_height=parseInt(_from_obj.offsetHeight);
        _frm_width=parseInt(_from_obj.offsetWidth);



        //START_X = randomnum(0,(_frm_width-_box.width));
        //START_Y = randomnum(0,(_frm_height-_box.height));
        var pos={x:0,y:0};

        if(_frmid[_frm_id]!=undefined){
            _frmid[_frm_id]++;
        }else{
            _frmid[_frm_id]=0;
        }

        if(_frmid[_frm_id]==0){
            pos.x=START_X+_frmid[_frm_id]*_box.width;
        }else{
            pos.x=START_X+(_frmid[_frm_id]*_box.width-_frmid[_frm_id]*100);
        }

        START_X=pos.x;


        var divbox= document.createElement("div");
        divbox.setAttribute("id",boxid);
        divbox.setAttribute("data-id",tagid);
        
        //divbox.style.background = "#42d692";
        divbox.style.width = _box.width+"px";
        divbox.style.height = _box.height+"px";
        divbox.style.marginTop=pos.y+"px";
        divbox.style.marginLeft=pos.x+"px";
        //divblock.style.backgroundImage="url(image/bgred.jpg)";
        var childrendiv= document.createElement("div");
        childrendiv.setAttribute("id",boxid+"c");
        childrendiv.style.width = _box.width+"px";
        childrendiv.style.height = _box.height+"px";
        childrendiv.textContent = "hcm+hcm";  //更新内容
        childrendiv.innerHTML=htmlstr;
        divbox.appendChild(childrendiv);

        var childrendivback= document.createElement("div");
        childrendivback.setAttribute("id",boxid+"cb");
        childrendivback.style.width = _box.width+"px";
        childrendivback.style.height = _box.height+"px";
        childrendivback.style.position="absolute";
        childrendivback.style.marginTop="-"+_box.height+"px";
        childrendivback.style.mozTransform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.webkitTransform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.transform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.opacity=0;
        childrendivback.style.msOpacity=0;
        childrendivback.style.webkitOpacity=0;
        childrendivback.style.mozOpacity=0;
        childrendivback.style.oOpacity=0;
        childrendivback.style.khtmlOpacity=0;
        childrendivback.textContent = "hcm+hcm";  //更新内容
        childrendivback.innerHTML=htmlstr;
        divbox.appendChild(childrendivback);
        _from_obj.appendChild(divbox);
        //var aa= new mlable(win,"#"+boxid,START_X,START_Y,_box,_from_obj);
        _lables[boxid]=new mlable(win,"#"+boxid,START_X,START_Y,_box,_from_obj);
        
           _lables[boxid]._xendpos=START_X; //标签横向的位置
          _lables[boxid]._yendpos=START_Y; //标签纵向的位置
        //aa.getpos(); //返回标签的位置
        count++;
    }

    function setinit(_id,boxid,htmlstr,boxsize,_pos,tagid,commodity_id){
        _frm_id=_id;
        _box.width=boxsize.width;
        _box.height=boxsize.height;
        _from_obj=document.querySelector(_frm_id);
        _frm_height=parseInt(_from_obj.offsetHeight);
        _frm_width=parseInt(_from_obj.offsetWidth);
        START_X=_pos.x;
        START_Y=_pos.y;


        var divbox= document.createElement("div");
        divbox.setAttribute("id",boxid);
        divbox.setAttribute("data-id",tagid);
        divbox.setAttribute("goodsID",commodity_id);
        //divbox.style.background = "#42d692";
        divbox.style.width = _box.width+"px";
        divbox.style.height = _box.height+"px";
//      divbox.style.marginTop=_pos.y+"px";
        //divbox.style.marginLeft=pos.x+"px";
        //divblock.style.backgroundImage="url(image/bgred.jpg)";
        var childrendiv= document.createElement("div");
        childrendiv.setAttribute("id",boxid+"c");
        childrendiv.style.width = _box.width+"px";
        childrendiv.style.height = _box.height+"px";
        childrendiv.textContent = "hcm+hcm";  //更新内容
        childrendiv.innerHTML
        childrendiv.innerHTML=htmlstr;
        divbox.appendChild(childrendiv);

        var childrendivback= document.createElement("div");
        childrendivback.setAttribute("id",boxid+"cb");
        childrendivback.style.width = _box.width+"px";
        childrendivback.style.height = _box.height+"px";
        childrendivback.style.position="absolute";
        childrendivback.style.marginTop="-"+_box.height+"px";
        childrendivback.style.mozTransform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.webkitTransform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.transform="rotate3d(0, 1, 0, -180deg)";
        childrendivback.style.opacity=0;
        childrendivback.style.msOpacity=0;
        childrendivback.style.webkitOpacity=0;
        childrendivback.style.mozOpacity=0;
        childrendivback.style.oOpacity=0;
        childrendivback.style.khtmlOpacity=0;
        childrendivback.textContent = "hcm+hcm";  //更新内容
        childrendivback.innerHTML=htmlstr;
        divbox.appendChild(childrendivback);
        _from_obj.appendChild(divbox);
        //var aa= new mlable(win,"#"+boxid,START_X,START_Y,_box,_from_obj);
        //_lables[boxid]=new mlable(win,"#"+boxid,START_X,START_Y,_box,_from_obj);
        _lables[boxid]=new mlable(win,"#"+boxid,START_X,START_Y,_box,_from_obj);
        //aa.getpos(); //返回标签的位置
        count++;
    }

    function getpostions(){
        for(var i in _lables){
        	console.log("i::"+i);
            var boxobj=document.querySelector("#"+i);
            //var id=boxobj.getAttribute("data-id");

            var id=$(boxobj).attr("data-id");

            if(id==undefined||id=="undefined"||id==null||id==""||id=="null"){
            }else{
            	_posarr[id]=_lables[i].getpos("#"+i);
            }
        }
        return _posarr;
    }

    function clear_latble(){
        for(var i in _frmid){
            document.querySelector(i).innerHTML="";
        }
        START_X=0;
        _frmid={};
    }

    function create_table(){

    }
    function clear_label(){
        _lables=[];
    }
    win.cteatelable=init;
    win.cteatesetlable=setinit;
    win.clearlable=clear_latble;
    win.getposarr=getpostions;
    win.clear_label=clear_label;

}(window));