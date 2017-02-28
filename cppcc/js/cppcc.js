/**
 * Created by bobo on 2017/2/20.
 */
(function(){
    var SIN = Math.sin, COS = Math.cos, RAD = Math.PI/180, fps = 60;
    /*摩天轮*/
    function skyWheel(){
        var skywheel = $('#sky-wheel'),
            wheels = skywheel.children('.bo-wheel-item'),
            imgbox = $('#bo-wheel-img'),
            number = wheels.length;
        var r0 = skywheel.outerHeight(), r1 = wheels.first().outerHeight(), r = ~~((r0-r1)/2), angle = (360/number);
        var clock = 0, state = 0, _rad = 0, fade = true, opacity = 100;
        var Animation = {
            rotation:function(){
                var tick = setInterval(function(){
                    if(_rad<angle){
                        clock ++;/*动作执行部分*/
                        _rad ++;
                        setPosition(countPosition(clock));
                    }else{
                        clearInterval(tick);/*动作结束*/
                        _rad = 0;
                    }
                },1000/fps);
            },
            moveTo:function(start, end){
                for(var i = 0;i<number;i++){
                    var dx = end[i].left-start[i].left;
                    var dy = end[i].top-start[i].top;
                    var distance = Math.sqrt(dx*dx+dy*dy);
                    if(distance>1){
                        start[i].left += dx*0.1;
                        start[i].top += dy*0.1;
                    }else{
                        state++;
                    }
                }
            }
        };
        function initSkyWheel(){
            var start = [];
            imgbox.html('<img src="">');
            wheels.each(function(){
                start.push({'left':283, 'top':283});
            });
            var end = countPosition();
            moveToCircle(start, end);
        }
        function moveToCircle(start, end){
            var tick = setInterval(function(){
                if(state<number){
                    Animation.moveTo(start, end);
                    setPosition(start);
                }else{
                    clearInterval(tick);
                    //setPosition(countPosition(75));
                    //Animation.rotation();
                    wheelMove();
                }
            },1000/fps);
        }
        function setPosition(array){
            wheels.each(function(v, k){
                $(this).css('left', array[v].left).css('top', array[v].top);
                if(array[v].left>520){/*判断是否进入了focus内*/
                    $(this).addClass('on');
                }else{
                    $(this).removeClass('on');
                }
            });
        }
        function countPosition(reg){
            var pos = [], clock = reg||0;
            for(var i = 0;i<number;i++){
                pos.push({
                    'left':~~(COS((clock-angle*i)*RAD)*r+r),
                    'top':~~(SIN((clock-angle*i)*RAD)*r+r)
                });
            }
            return pos;
        }
        function wheelMove(){
            setInterval(function(){
                Animation.rotation();
                fadeOutAndIn(wheels.filter('.on'));
            }, 5000);
        }
        function imgChange(node){
            var imgUrl = node.attr('data-bo');
            var img = imgbox.children('img');
            img.attr('src', imgUrl);
        }
        function fadeOutAndIn(node){
            var img = imgbox.children('img');
            var tick = setInterval(function(){
                if(fade){
                    if(opacity>1){
                        opacity-=2;
                    }else{
                        imgChange(node);
                        fade=false;
                    }
                }else{
                    if(opacity<100){
                        opacity+=2;
                    }else{
                        clearInterval(tick);
                        fade=true;
                    }
                }
                //img[0].style.opacity = opacity/100;
                //img[0].style.filter = 'alpha(opacity='+opacity+')';
                img.css('opacity',opacity/100).css('filter','alpha(opacity='+opacity+')');
            }, 1000/fps);
        }
        initSkyWheel();
    }
    /*聊天动画*/
    function chatAnimation(){
        var chatlist = $('#chat-list'),
            showItemNum = 10,
            targetIndex = 0;
        var itemheight, chatitem;
        function initChatItem(n){
            chatitem = chatlist.children('.bo-chat-item');
            itemheight = chatitem.first().outerHeight();
            var num = n||showItemNum, height = num*itemheight;
            if(chatitem.length>num){
                chatMove();
            }else{
                chatlist.css('margin-top', (num-chatitem.length)*itemheight);
            }
        }
        function getData(){
            var url = 'http://forum.home.news.cn/api/post/thread.do?tid=140556756&ps=99999&ic=1';
            $.ajax({
                'url':url,
                'type':'get',
                'dataType':'jsonp',
                'success':function(data){
                    getDom(data);
                }
            });
            function dataToDom(data){
                var baseUrl = 'http://tpic.home.news.cn/userIcon/m/', content = data.content||'';
                return '<li class="bo-chat-item"><div class="part-l chat-img"><img src="'+baseUrl+data.userId+'"></div><div class="part-l chat-msg"><span>'+content+'</span></div></li>'
            }
            function getDom(data){
                var reply = data.replys;
                if(reply&&reply.length>0){
                    var html = '';
                    for(var i = 0;i<reply.length;i++){
                        html += dataToDom(reply[i]);
                    }
                }
                chatlist.append(html);
                initChatItem(11);
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
        function chatMove(){
            setInterval(function(){
                var num = ~~(Math.random()*4+1);
                loopMove(num);
            }, 4000);
        }
        getData();
    }

    skyWheel();
    chatAnimation();
})();