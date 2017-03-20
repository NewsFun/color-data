/**
 * Created by Administrator on 2015/3/30.
 */
(function(bo){
    /*常量*/
    var SIN = Math.sin, COS = Math.cos, RAD = Math.PI/180,container = $('#container'), fps = 60, contentbox = $('#data-box'), stage = $('#stage');
    /*全局变量*/
    var items = container.children('.piece'),
        w = container.width(),
        h = container.height(),
        first = items.first(),
        width = first.width(),
        height = first.height();
    var len = items.length,
        r = (w-width)/2,
        radstep = 360/len,
        center = {x:r, y:(h-height)/2},
        _rad = 0,
        clock = 0,
        _number = 2,
        _click = false,
        animateFinish = true;
    var config = {n:len, r:r, a:1, b:0.58, center:center, clock:clock};
    function _point(x, y){
        this.x = x;
        this.y = y;
    }
    function countCircle(param){
        if(!param||param.n<2) return;
        var num = 360/param.n, arr = [], rot = param.rot||0, clock = param.clock||0;
        for(var i = 0;i<param.n;i++){
            var x = COS((num*i-rot-clock)*RAD)*param.r*param.a+param.center.x;
            var y = SIN((num*i-rot-clock)*RAD)*param.r*param.b+param.center.y;
            arr.push(new _point(x, y));
        }
        return arr;
    }
    function render(arr){
        items.each(function(k, v){
            $(this).css({
                "left":~~(arr[k].x),
                "top":~~(arr[k].y),
                "z-index":~~(arr[k].y),
                "transform":'translateZ('+~~(arr[k].y-h/2)*4+'px)',
                "-webkit-transform":'translateZ('+~~(arr[k].y-h/2)*4+'px)'
            });
        });
    }
    function countPosition(reg){
        config.clock = reg;
        return countCircle(config);
    }
    function rotation(rotate){
        animateFinish = false;
        var tick = setInterval(function(){
            if(_rad<radstep){
                rotate?clock--:clock++;/*动作执行部分*/
                _rad ++;
                render(countPosition(clock));
            }else{
                clearInterval(tick);/*动作结束*/
                _rad = 0;
                animateCallback(rotate);
                //callback&&callback();
            }
        },1000/fps);
    }
    function stageEvent(){
        if(!animateFinish) return;
        stage.on('click', function(e){
            _click = true;
            var id = e.target.id;
            switch (id){
                case 'more':break;
                case 'prev':rotation(true);break;
                case 'next':rotation();break;
                default :break;
            }
        });
    }
    function animateCallback(rotate){
        animateFinish = true;
        getName(rotate);
    }
    function getName(rotate){
        rotate?_number--:_number++;
        if(_number<0) _number += len;
        _number = _number%len;
        var name = items.eq(_number).data('name');
        showContent(name);
    }
    function showContent(name){
        var dataitem = contentbox.children('.data-item');
        dataitem.each(function(){
            $(this).data('name') == name?$(this).show():$(this).hide();
        });
        _click = false;
    }
    function initPage(){
        stageEvent();
        render(countCircle(config));
        showContent('mp');
        setInterval(function(){
            if(_click) return;
            rotation();
        },4000);
        new Swiper('.bo-swiper',{
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay:3000
        });
    }
    initPage();
})();
