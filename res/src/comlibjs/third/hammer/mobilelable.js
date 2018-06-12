/**
 * @class res  无
 * @Description 移动 标签
 * @singleton
 * @createTime 2016-03-11
 * @updateTime 2016-03-11
 * @author 韩充满
 * @version 1.0
 */


var mlable=function(win,_id,start_x,start_y,box,frmobj){

    var _labelobj="";
    var _start_x=0;
    var _start_y=0;
    var _mc;
    var _beginx=0;
    var _frm_left=0;
    var _frm_right=0;
    var _frm_top=0;
    var _frm_bottom=0;
    var _block_width=0;
    var _block_height=0;
    var _ticking = false;
    var children;
    var childrenb;
    var mobileid;
    var _frmobj;
    var transform={};
    var _fxnormal=true; //横向正常区域
    var _fynormal=true; //纵向正常区域
    var _xendpos=0; //标签横向的位置
    var _yendpos=0; //标签纵向的位置


    mlable.prototype._start_x=0;
    mlable.prototype._start_y=0;

    function init(_id,startx,starty,box,obj){
        _frmobj=obj;
        mobileid=_id;
        _labelobj=document.querySelector(_id);
        children=_labelobj.children[0];
        childrenb=_labelobj.children[1];
        _mc = new Hammer.Manager(_labelobj);
        _mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        _mc.add(new Hammer.Swipe()).recognizeWith(_mc.get('pan'));
        _mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(_mc.get('pan'));
        _mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([_mc.get('pan'), _mc.get('rotate')]);
        _mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        _mc.add(new Hammer.Tap());
        _mc.on("panstart panmove",onPan);
        _start_x=startx;
        _start_y=starty;
        _block_width=box.width;
        _block_height=box.height;


        _frm_right=parseInt(obj.offsetWidth);
        _frm_bottom=parseInt(obj.offsetHeight);

        _mc.on("panend",function(obj) {
            _start_x = _start_x + obj.deltaX;
            _start_y = _start_y + obj.deltaY;
            _xendpos= _start_x; 
            _yendpos= _start_y; 
            return;
        });

        _xendpos= _start_x;
        _yendpos= _start_y;
        _mc.on("rotatestart rotatemove", onRotate);
        _mc.on("pinchstart pinchmove", onPinch);
        //mc.on("swipe", onSwipe);
        _mc.on("tap", onTap);
        _mc.on("doubletap", onDoubleTap);

        resetElement();
    }


    mlable.prototype.getpos=function(_mobileid){


        //var sfes=$(mobileid);
        var styletr=$(_mobileid)[0].style.transform;
        var regRule = /translate(Y|\dd)?\(\s*(\w+\s*,)?\s*([^,]+)(\s*,[^)]+)?\s*\)/;
        reg = regRule.exec(styletr);

        //_xendpos= _start_x; //标签横向的位置
        //_yendpos= _start_y; //标签纵向的位置
        
        if(styletr != ""){
        	$(_mobileid)[0].style.transform="translate3d(4px, -1px, 0px) scale(1, 1) rotate3d(0, 0, 0, 0deg);";
        	 _xendpos=parseInt(reg[2]);
        	_yendpos=parseInt(reg[3]);
        }else{
        	_xendpos=this._start_x;
        	_yendpos=this._start_y;
        }
        
       
        return {x:_xendpos,y:_yendpos};
    }

    function onPan(ev) {

        _labelobj.className = '';

        transform.translate = {
            x: _start_x + ev.deltaX,
            y: _start_y + ev.deltaY
        };
       // _xendpos= _start_x + ev.deltaX; //标签横向的位置
       // _yendpos= _start_y + ev.deltaY; //标签纵向的位置
        console.log("id:"+mobileid+"=_xendpos:"+_xendpos+":_yendpos:"+_yendpos);


        //console.log("=========================================================");
        //console.log("mobi 数据上 id:"+mobileid+":"+":ev.deltaX:"+ev.deltaX+":ev.deltaY:"+ev.deltaY+":_frm_right:"+_frm_right+":_frm_bottom:"+_frm_bottom);
        //console.log("mobi 数据中 id:"+mobileid+":_start_x:"+_start_x+":_start_y:"+_start_y);
        //console.log("mobi 数据下 id:"+mobileid+":"+":x:"+transform.translate.x+":y:"+transform.translate.y+":_block_width:"+_block_width+":_block_height:"+_block_height);
        //console.log("=========================================================");


        _frm_right=parseInt(_frmobj.offsetWidth);
        _frm_bottom=parseInt(_frmobj.offsetHeight);



        if((transform.translate.x+_block_width) >=_frm_right){
            var value=transform.translate.x+_block_width;
            var valuele=(transform.translate.x+_block_width)-_frm_right;

            if(_beginx==0){
                _beginx=valuele;
            }else{
                if(_beginx<=valuele){

                    transform.ry=1;
                    transform.angle=-180;

                    children.style.opacity=0;
                    children.style.msOpacity=0;
                    children.style.webkitOpacity=0;
                    children.style.mozOpacity=0;
                    children.style.oOpacity=0;
                    children.style.khtmlOpacity=0;

                    childrenb.style.msOpacity=1;
                    childrenb.style.msOpacity=1;
                    childrenb.style.webkitOpacity=1;
                    childrenb.style.mozOpacity=1;
                    childrenb.style.oOpacity=1;
                    childrenb.style.khtmlOpacity=1;

                }
                _beginx=valuele;
            }

            if(transform.translate.x >=_frm_right){
                _fxnormal=false;
            }else{
                _fxnormal=true;
                requestElementUpdate();
            }
            _ticking = false;
        }else if(transform.angle==-180){
                        transform.ry=0;
                        transform.angle=0;

                        children.style.opacity=1;
                        children.style.msOpacity=1;
                        children.style.webkitOpacity=1;
                        children.style.mozOpacity=1;
                        children.style.oOpacity=1;
                        children.style.khtmlOpacity=1;

                        childrenb.style.opacity=0;
                        childrenb.style.msOpacity=0;
                        childrenb.style.webkitOpacity=0;
                        childrenb.style.mozOpacity=0;
                        childrenb.style.oOpacity=0;
                        childrenb.style.khtmlOpacity=0;
                        _ticking = false;
                        _fxnormal=true;
                        requestElementUpdate();
                        //console.warn("(transform.translate.x-_block_width)<=_frm_left:退出:X"+transform.translate.x+":_block_width:"+_block_width);
        }else if(transform.translate.x <=_frm_left) {
                        _fxnormal=false;
        }else{
            //正常状态
            //console.warn("=========right  return========== ---1::transform.translate.x::"+transform.translate.x);
            //console.log("=========横推 正常区域内");
            _fxnormal=true;
            if(_fynormal==true) {
                requestElementUpdate();
            }
        }

        if(transform.translate.y <=_frm_top){
            _ticking = false;
            _fynormal=false;
        }else if((transform.translate.y+_block_height) >=_frm_bottom){
            _ticking = false;
            _fynormal=false;
        }else{
            //console.log("=========纵向推 正常区域内");
            _fynormal=true;
            if(_fxnormal){
                requestElementUpdate();
            }

        }


    }
    function updateElementTransform() {

        var value = [
            'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
            'scale(' + transform.scale + ', ' + transform.scale + ')',
            'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
        ];
        value = value.join(" ");
        _labelobj.style.webkitTransform = value;
        _labelobj.style.mozTransform = value;
        _labelobj.style.transform = value;
        _labelobj.style.transformOrigin="0px 0px 0px";
        _labelobj.style.msTransformOrigin="0px 0px 0px";
        _labelobj.style.webkitTransformOrigin="0px 0px 0px";
        _labelobj.style.mozTransformOrigin="0px 0px 0px";
        _labelobj.style.oTransformOrigin="0px 0px 0px";
        _ticking = false;
    }

    function onPinch(ev) {
        if(ev.type == 'pinchstart') {
            initScale = transform.scale || 1;
        }
        el.className = '';
        transform.scale = initScale * ev.scale;

        requestElementUpdate();
        logEvent(ev.type);
    }

    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window,'requestAnimationFrame')] || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function onRotate(ev) {
        if(ev.type == 'rotatestart') {
            initAngle = transform.angle || 0;
        }

        _labelobj.className = '';
        transform.rz = 1;
        transform.angle = initAngle + ev.rotation;
        requestElementUpdate();
    }

    function requestElementUpdate() {

        if(!_ticking) {
            reqAnimationFrame(updateElementTransform);
            _ticking = true;
        }
    }

    function onSwipe(ev) {
        var angle = 50;
        transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 300);
        requestElementUpdate();
    }

    function onTap(ev) {
        transform.rx = 1;
        transform.angle = 25;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 200);
        requestElementUpdate();
    }

    function onDoubleTap(ev) {
        transform.rx = 1;
        transform.angle = 80;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 500);
        requestElementUpdate();
    }
    function resetElement() {
        _labelobj.className = 'animate';
        transform = {
            translate: { x:_start_x, y: _start_y},
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        requestElementUpdate();
    }

    init(_id,start_x,start_y,box,frmobj);
};