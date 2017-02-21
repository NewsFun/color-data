/**
 * Created by bobo on 2017/2/20.
 */
(function(global){
    /*聊天动画*/
    var chatlist = $('#chat-list'),
        chatitem = chatlist.children('.bo-chat-item'),
        itemheight = chatitem.first().outerHeight(),
        showItemNum = 10,
        targetIndex = 0,
        fps = 60;
    function initItem(n){
        var num = n||showItemNum,
            height = num*itemheight;
        chatlist.css('height', height);
        if(chatitem.length<num){
            chatlist.css('margin-top', (num-chatitem.length)*itemheight);
        }else{
            randomMove();
        }
    }
    function bubbling(n, callback){
        var num = n||1;
        function animate(){
            var top = 0;
            var mt = chatlist.css('margin-top');
            var margintop = parseInt(mt, 10);
            var tick = setInterval(function(){
                if(top<itemheight){
                    top += 2;/*动作执行部分*/
                    chatlist.css('margin-top', margintop-top);
                }else{
                    clearInterval(tick);/*动作结束*/
                    --num;
                    if(num>0){
                        setTimeout(animate, 100);
                    }else{
                        callback&&callback();/*动画结束回调*/
                    }
                }
            },1000/fps);
        }
        animate();
    }
    function loopMove(n){
        targetIndex += n;
        chatitem = chatlist.children('.bo-chat-item');/*获取新的li列表*/
        var len = chatitem.length;
        var delta = len-targetIndex;
        if(delta>showItemNum){
            bubbling(n);
        }else{
            var data = chatitem.slice(0, targetIndex), copydata = data.clone(true);
            chatlist.append(copydata);
            bubbling(n, function(){
                data.appendTo(chatlist);/*重新排序，状态初始化*/
                copydata.remove();
                chatlist.css('margin-top', 0);
                targetIndex = 0;
            });
        }
        //chatitem.eq(n).addClass('move-target');
    }
    function randomMove(){
        setInterval(function(){
            var num = ~~(Math.random()*4+1);
            loopMove(num);
        }, 5000);
    }
    randomMove();
    /*摩天轮*/
    var skywheel = $('#sky-wheel'),
        wheels = skywheel.children('.bo-wheel-item'),
        number = wheels.length;
    var SIN = Math.sin, COS = Math.cos, RAD = Math.PI/180;
    var r0 = skywheel.outerHeight(), r1 = wheels.first().outerHeight(), r = ~~((r0-r1)/2), angle = (360/number);
    function initSkyWheel(){

    }
    function setPosition(array){
        wheels.each(function(v, k){
            $(this).css('left', array[v].left).css('top', array[v].top);
        });
    }
    function calculate(reg){
        var pos = [], clock = reg||0;
        for(var i = 0;i<number;i++){
            pos.push({
                'left':~~(COS((clock-angle*i)*RAD)*r+r),
                'top':~~(SIN((clock-angle*i)*RAD)*r+r)
            });
        }
        return pos;
    }
    function rotation(){
        function animate(){
            var rad = 0;
            var tick = setInterval(function(){
                if(rad<angle){
                    rad ++;/*动作执行部分*/
                    calculate(rad);
                }else{
                    clearInterval(tick);/*动作结束*/
                }
            },1000/fps);
        }
        animate();
    }
    setPosition();
    rotation();

})(this);