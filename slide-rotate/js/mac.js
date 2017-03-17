/**
 * Created by bobo on 2017/3/15.
 */
(function(global){
    var SIN = Math.sin, COS = Math.cos, RAD = Math.PI/180, fps = 60;
    function _point(x, y){
        this.x = x;
        this.y = y;
    }
    global.Bo = {
        /**
         * @module Math：椭圆坐标算法
         * @param {Object} param n:生成点个数,r:圆的半径,a:x轴缩放比,b:y轴缩放比,rot:偏移量,center:圆心
         * */
        countCircle:function(param){
            if(!param||param.n<2) return;
            var num = 360/param.n, arr = [], rot = param.rot||0, clock = param.clock||0;
            for(var i = 0;i<param.n;i++){
                var x = COS((num*i-rot-clock)*RAD)*param.r*param.a+param.center.x;
                var y = SIN((num*i-rot-clock)*RAD)*param.r*param.b+param.center.y;
                arr.push(new _point(x, y));
            }
            return arr;
        }
    };
})(window);