! function(window, document){
    /*
     手机版跳转
     */
    var _ua=window.navigator.userAgent.toLowerCase(),
        isMobile=_ua.indexOf("mobile")!==-1?true:false
        ;
    if(isMobile) window.location.href="http://www.xinhuanet.com/politics/2017lh/mobile.htm";
}(window, document)

!function(window, document){
    /*
     顶部手机推广swiper
     */
    (function(){
        var mobile_ext=new Swiper(".mobile-extision-swiper",{
            loop:true,
            slidesPerView : 2
        });
        $(".mobile-extision-left").on('click', function(e){
            e.preventDefault();
            mobile_ext.swipePrev();
        })
        $(".mobile-extision-right").on('click', function(e){
            e.preventDefault();
            mobile_ext.swipeNext();
        })
    })((function(){
        /*
         顶部手机推广 日历 按日期开启
         .mobile-extision-swiperBox-off  关闭的class
         */
        var date=new Date(),
            _month=date.getMonth()+1,
            item_day=document.querySelectorAll(".mobile-extision-num"),
            item_tit=document.querySelectorAll(".mobile-extision-tit a"),
            items=document.querySelectorAll(".mobile-extision-slide-wrap"),
            today=date.getDate(),
            i=0,
            len=item_tit.length,
            tempDay=0
            ;
        if(_month>3) return;
        for(;i<len;i++){
            // console.log(item_day[i]);
            if((item_day[i].innerHTML-0)>today){
                items[i].setAttribute("class",items[i].getAttribute("class")+" mobile-extision-swiperBox-off");
            }
        }
    })())



    /*
     直播自定义滚动条
     */
    function setScroll(){
        $(".live-list-items").slimScroll({
            height: "155px",
            alwaysVisible: false,
            size:"5px",
            distance:"5px"
        });
    }
    setScroll();
    /*
     大图swiper
     */
    var big_pic_swiper=new Swiper(".live-pic-swiper",{
        loop:true,
        slidesPerView : 1,
        pagination:".live-pic-pagation",
        autoPlay:4500
    });
    $(".live-pic-arrow-left").on('click', function(e){
        e.preventDefault();
        big_pic_swiper.swipePrev();
    })
    $(".live-pic-arrow-right").on('click', function(e){
        e.preventDefault();
        big_pic_swiper.swipeNext();
    })
    /*
     头条学习进行时tab
     */
    $(".news-summary-middle-tab-tit-item").on("click",function(){
        $(".news-summary-middle-tab-tit-item").removeClass("news-summary-middle-tab-tit-on");
        $(".news-summary-middle-tab-cont ul").hide();
        $(this).addClass("news-summary-middle-tab-tit-on");
        $(".news-summary-middle-tab-cont ul").eq($(this).index()).show();
    })
    /*
     1区选项卡 news-summary-hasSubTit:before
     */
    $(".live-xxjxs-head-txt").on("click",function(){
        $(".live-xxjxs-head-txt").removeClass("live-xxjxs-tab-on");
        $(".live-xxjxs-cont-box").hide();
        $(this).addClass("live-xxjxs-tab-on");
        $(".live-xxjxs-cont-box").eq($(this).index()).show();
    })
    var ul_items=$(".news-summary-middle-tab-cont").find("li")
        ;
    ul_items.each(function(){
        var temp=$(this).attr("data-subtit"),
            data_tit=temp?$.trim(temp):null;
        //console.log(data_tit);
        if(!!data_tit&&data_tit.length>1) {
            $(this).addClass("news-summary-hasSubTit")
        }
    })

}(window, document)


! function(window, document) {
    //两会访谈
    (function(sl) {
        var talking_swiper = new Swiper(".meeting-talking-swiper", {
            "loop": true,
            "loopedSlides": sl || 8,
            "slidesPerView": 1,
            "autoplay":4500
        })
        $(".meeting-talking-left").on('click', function(e){
            e.preventDefault();
            talking_swiper.swipePrev();
        })
        $(".meeting-talking-right").on('click', function(e){
            e.preventDefault();
            talking_swiper.swipeNext();
        })
    })((function() {
        var box = document.querySelector(".meeting-talking-swiper"),
            l = box.querySelectorAll(".swiper-slide").length;
        return l
    })())

    var viweWidth = document.documentElement.offsetWidth,
        viewCenterX = viweWidth / 2, //中心点
        width_pureWidth=120,
        width_item = 132, //单个未展开总宽度120+6+6
        pre_width_item = 6, //每组第一个元素左侧空隙
        pre_expand_width = 265, //展开元素的宽度
        unit_width = pre_expand_width + width_item, //含展开宽度部分的全部宽度385
        offset_right_hover = pre_expand_width - width_item,
        isMoving = false,
        items = $(".meeting-talking-swiper .item"),
        len_items = items.length,
        old_index = 0,
        new_index = 0,
        half_num=4,
        expand_total_width=385,
        ani_dur=600
        ;

    function rePos() {
        items.each(function() {
            $(this).stop(true, false).animate({ "width": width_pureWidth, "left": $(this).index() * width_item + pre_width_item },ani_dur);
            $(this).find(".item-cont").stop(true, false).animate({ "width": 0 },ani_dur);
        }).eq(0).stop(true, false).animate({ "width": width_pureWidth, "left": pre_width_item },ani_dur);

    }
    function rePosInit() {
        items.each(function() {
            $(this).css({ "width": width_pureWidth, "left": $(this).index() * width_item + pre_width_item });
            $(this).find(".item-cont").css({ "width": 0 });
        }).eq(0).css({ "width": width_pureWidth, "left": pre_width_item });

    }

    rePosInit();

    function fn1() {
        var i = $(this).index(),
            offset = Math.floor($(this).index() * width_item + pre_width_item - unit_width + offset_right_hover);
        if (event.pageX >= viewCenterX && i > half_num) {
            // console.log("right in ",$(this).index());
            for (; i > 0; i--) {
                items.eq(i - 1).stop(true, false).animate({
                    "left": (i * width_item + pre_width_item - unit_width)
                }, ani_dur,"linear")
            } //for

            $(this).find(".item-tit").css({ "float": "right" });
            $(this).stop(true, false).animate({ "left": offset, "width": expand_total_width }, ani_dur,"linear");
            $(this).find(".item-cont").stop(true, false).animate({ "width": pre_expand_width-20 },ani_dur);



        } else if (event.pageX < viewCenterX || i == 4) {
            for (; i < len_items - 1; i++) {
                items.eq(i + 1).stop(true, false).animate({
                    "left": i * width_item + pre_width_item + unit_width
                },ani_dur)
            } //for
            $(this).stop(true, false).animate({ "width": expand_total_width },ani_dur);
            $(this).find(".item-cont").stop(true, false).animate({ "width": pre_expand_width-20 },ani_dur);
        }
        $(this).addClass("item-on");
    }

    function fn2() {
        $(this).removeClass("item-on");
        rePos();
    }
    // $(".box").on("mouseenter", ".item", fn1);

    // $(".box").on("mouseleave", ".item", fn2);
}(window, document)

!function(window, document){
    /*
     部长之声
     */
    var defaultExpand=3,
        currentExpand=3,
        oldExpand=3,
        $_box=$(".minister-voice-cont"),
        $_item=$(".item",$_box),
        $_tit=$(".tit",$_box),
        $_cont=$(".cont",$_box),
        $_overflow=$(".over-flow",$_box),
        isMoving=false,
        ani_time=300
        ;

    function fn1(){
        if(isMoving||currentExpand===$(this).index()) return;
        currentExpand=$(this).index();
        isMoving=true,
            width_short=160,
            width_long=520

        $_overflow.eq(oldExpand).stop(true,false).animate({"opacity":"0"},(ani_time/2));
        $(this).stop(true,false).animate({"width":width_long},ani_time,function(){
            isMoving=false;
            oldExpand=$(this).index();
            // $(this).removeClass("overflow-visible");
            $(this).addClass("overflow-visible");
            $_overflow.eq(currentExpand).stop(true,false).animate({"opacity":"1"},ani_time);
        });

        $_item.eq(oldExpand).stop(true,false).animate({"width":width_short},ani_time,function(){
            // $(this).removeClass("overflow-visible");
        });

        $_cont.eq(currentExpand).show().stop(true,false).animate({"left":0,"width":width_long},ani_time,function(){

        });
        $_cont.eq(oldExpand).stop(true,false).animate({"left":width_short,"width":"0"},ani_time,function(){
            $(this).hide();
        });

        $_tit.eq(currentExpand).stop(true,false).animate({"width":0},ani_time,function(){
            $(this).hide();
        });
        $_tit.eq(oldExpand).show().stop(true,false).animate({"width":width_short},ani_time);
    }

    $_box.on("click",".item",fn1);
}(window, document)

!function(window, document){
    /*
     两会报告
     */
    var report_item=$(".report-item"),
        report_item_len=report_item.length,
        report_tit_width=$(".report-item").eq(0).find(".report-tit")[0].offsetWidth,
        report_expand=984,
        report_item_width=1026,
        report_i=0,
        defaule_Expand=report_i,
        offset=2,
        report_ani_dur=300
        ;
    for(;report_i<report_item_len;report_i++){
        report_item.eq(report_i+1).css({"left":report_i*report_tit_width+report_item_width+report_i*offset});
        report_item.eq(report_i).attr("data-isExpand","");
    }
    report_item.eq(0).css({"left":0});
    report_item.eq(0).attr("data-isexpand",1);
    report_item.eq(0).addClass("report-item-on");



    function report_change(j){
        if(isNaN(j)) return;
        report_item.eq(defaule_Expand).removeClass("report-item-on");
        report_item.eq(j).addClass("report-item-on");
        defaule_Expand=j;
    }



    function fn1(){
        var thisParent=$(this).parent(),
            thisCont=thisParent.find(".report-cont"),
            i=thisParent.index(),
            isExplanded=!!($(this).parent().attr("data-isexpand")),
            j=i
            ;
        // console.log(typeof isExplanded,isExplanded,$(this).parent().attr("data-isexpand"));
        if(isExplanded){
            // logs("已展开");
            for(;i<report_item_len-1;i++){
                report_item.eq(i+1).stop(true,false).animate({"left":i*report_tit_width+report_item_width+i*offset},report_ani_dur,function(){$(this).attr("data-isexpand","");});
            }
            // report_item.eq(defaule_Expand).stop(true,false).animate({"width":0});
        }else{
            // logs("没展开");
            for(;i>=0;i--){
                report_item.eq(i).stop(true,false).animate({"left":i*report_tit_width+i*offset},report_ani_dur,function(){$(this).attr("data-isexpand",1);});
            }
            // thisCont.stop(true,false).animate({"width":report_expand});
        }//if
        report_change(j);
    }//fn



    $(".report-sfq").on("click",".report-tit",fn1);
}(window, document)

!function(window, document){
    /*
     头部滚动新闻
     */
    function bindEv(obj,evName,fn,cap){
        var _cap=cap||false;
        if(window.addEventListener){
            obj.addEventListener(evName,fn,_cap);
        }else{
            obj.attachEvent("on"+evName,fn,_cap);
        }
    }
    function fireEv(obj,evName,fn,cap){
        var _cap=cap||false;
        if(window.removeEventListener){
            obj.removeEventListener(evName,fn,_cap);
        }else{
            obj.detachEvent("on"+evName,fn,_cap);
        }
    }
    //滚动新闻----------------------------
    var list=document.querySelector(".scroll-item"),//ul
        list_item=document.querySelectorAll(".scroll-items"),//li
        list_item_len=list_item.length,
        isSupportTransform=("transform" in document.documentElement.style||"webkitTransform" in document.documentElement.style||"mozTransform" in document.documentElement.style||"msTransform" in document.documentElement.style),
        timer=null,
        i=0,
        j=0,
        n=0,
        offset_n=1,
        arr=[],
        offsetMargin=0,
        list_width=0,
        sp_time=30;

    function initWidth(){
        var i=0;
        for(;i<list_item_len;i++){
            !function(i){
                list_item[i].index=i;
                arr.push(list_item[i].offsetWidth);
                list_width+=arr[i];
            }(i);
        }//for
        list.innerHTML+=list.innerHTML;
        list.style.width=list_width*2+"px";
        setTimer();
    }

    function cleanTimer(){
        if(timer){
            clearInterval(timer);
            timer=null;
        }
    }
    function setTimer(){
        cleanTimer();
        timer=setInterval(tmpTimer,sp_time);
    }

    function tmpTimer(){
        n+=offset_n;
        if(n>=list_width){
            n=0;
        }
        render();
    }

    function listMouseOver(ev){
        var e=ev||window.event,
            _target=e.target||e.srcElement;
        if(_target.nodeName.toLowerCase()=="li"||_target.nodeName.toLowerCase()=="a"){
            cleanTimer();
        }
    }
    function listMouseLeave(){
        setTimer();
    }
    function render(){
        if(isSupportTransform){
            list.style.transform="translate3d("+(-n)+"px,0,0)";
            list.style.webkitTransform="translate3d("+(-n)+"px,0,0)";
            list.style.mozTransform="translate3d("+(-n)+"px,0,0)";
            list.style.msTransform="translate3d("+(-n)+"px,0,0)";
        }else{
            list.style.left=-n+"px";
        }
    }
    initWidth();
    bindEv(list,"mouseover",listMouseOver);
    bindEv(list,"mouseleave",listMouseLeave);
}(window, document)



! function(window, document,fns){
    /*
     两会图片
     */
    var $box=$(".meeting-pic-swiper"),
        box=document.querySelector(".meeting-pic-swiper"),
        insideage_left=$(".meeting-pic-insideage-left"),
        insideage_right=$(".meeting-pic-insideage-right"),
        insideage_item=$(".meeting-pic-insideage-item"),
        insdepage_box=$(".meeting-pic-insideage")
        ;


    (function (obj){
        // console.log(obj);
        var meeting_pic=new Swiper(".meeting-pic-swiper",{
                "loop":true,
                "noSwiping":true,
                "onSlideChangeEnd":cb_end
            }),
            len=obj.length||0,
            slide_index=0,
            next_index=1,
            pre_index=len-1
            ;
        function cb_end(){
            insideage_left.find(".meeting-pic-insideage-item-tit").html(obj[pre_index].tit);
            insideage_right.find(".meeting-pic-insideage-item-tit").html(obj[next_index].tit);

            insideage_left.find(".meeting-pic-insideage-item-pic img").attr("src",obj[pre_index].img);
            insideage_right.find(".meeting-pic-insideage-item-pic img").attr("src",obj[next_index].img);
        }
        cb_end();
        insideage_left.on('click', function(e){
            e.preventDefault();
            meeting_pic.swipePrev();
            if((pre_index-1<0)){
                pre_index=len-1
            }else{
                pre_index=pre_index-1;
            }
            next_index=(pre_index+2)%len;
            // console.log("p: "+(pre_index),"n: "+(next_index));
        });
        insideage_right.on('click', function(e){
            e.preventDefault();
            meeting_pic.swipeNext();
            next_index++;
            next_index=next_index%len;
            pre_index++;
            pre_index=pre_index%len;
            // console.log("n: "+(next_index),"p: "+(pre_index));
        });
        function showPageArrow(){
            insideage_item.stop(true,false).animate({
                "opacity":1
            })
        }
        function hidePageArrow(){
            insideage_item.stop(true,false).animate({
                "opacity":0
            })
        }
        $box.on("mouseleave",hidePageArrow);
        $box.on("mouseenter",showPageArrow);
    })((function(){
        var box=document.querySelector(".meeting-pic-swiper"),
            items=box.querySelectorAll(".swiper-slide"),
            i=0,
            len=items.length,
            json={},
            arr=[]
            ;
        for(;i<len;i++){
            items[i].querySelector(".num").innerHTML=(i+1)+"/"+len;
            items[i].setAttribute("data-index_",i);
            arr.push({
                "tit":items[i].querySelector(".meeting-pic-swiper-tit").innerHTML,
                "img":items[i].querySelector("img").src
            })
        }
        return arr
    })())
}(window, document)


/*
 小语种tab
 */
!function(window, document){
    /*
     .editions-tab-on
     */
    var editions_a=$(".editions-tab-tit-anchor"),
        editions_item=$(".editions-item")
        ;

    function switchItem(){
        var i=$(this).index()
            ;
        editions_a.removeClass("editions-tab-on");
        $(this).addClass("editions-tab-on");
        editions_item.addClass("hide");
        editions_item.eq(i).removeClass("hide");
    }
    editions_a.on("click",switchItem);



}(window, document)


/**
 * Created by bobo on 2017/2/28.
 */
~function($){
    var SIN = Math.sin, COS = Math.cos, RAD = Math.PI/180, fps = 60;
    /*摩天轮*/
    function skyWheel(){
        var skywheel = $('#sky-wheel'),
            wheels = skywheel.children('.bo-wheel-item'),
            imgbox = $('.bo-wheel-img'),//////////////////////////////////////////////////////////
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
            imgbox.html('<img src="'+wheels.eq(0).attr("data-bo")+'">');/////////////////////////////////
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
}(jQuery);

/*
 iframe test
 */
!function(){
    return;
    var s=0
        ;
    window.onscroll=function(){
        s=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        console.log(s);
    }
    /*
     图片延迟：
     .news-summary-left img
     .news-summary-right img
     swiper :http://www.swiper.com.cn/api/Images/2015/0308/213.html
     .meeting-live-cont img
     .meeting-segment-cont img
     .meeting-video-cont img
     .meeting-report-cont img
     .editions-tab-cont img
     .meeting-local-cont img
     .past-cont img
     .coop-cont img
     */
}()






!function(window){
    /*
     两会视频 发稿时间
     */
    var items=document.querySelectorAll(".meeting-video-time"),
        i=0,
        len=items.length
        ;
    ///////////////////////
    //时间转换
    var dateDiff = function (hisTime, nowTime) {
        hisTime = new Date(hisTime.replace(/-/g, "/")).getTime();
        var now = nowTime ? nowTime : new Date().getTime(),
            diffValue = now - hisTime,
            result = '',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,
            _year = diffValue / year,
            _month = diffValue / month,
            _week = diffValue / (7 * day),
            _day = diffValue / day,
            _hour = diffValue / hour,
            _min = diffValue / minute;
        if (_year >= 1) result = parseInt(_year) + "年前";
        else if (_month >= 1) result = parseInt(_month) + "个月前";
        else if (_week >= 1) result = parseInt(_week) + "周前";
        else if (_day >= 1) result = parseInt(_day) + "天前";
        else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
        else if (_min >= 5) result = parseInt(_min) + "分钟前";
        else result = "刚刚";
        return result;
    }

    /////////
    for(;i<len;i++){
        items[i].innerHTML=dateDiff(items[i].innerHTML);
    }
}(window)















//二维码
!function(){
    //二维码
    (function(){
        var $f = $(".c-wx");
        $(".f-wx").on("mouseover",function(){
            $(".c-wx").fadeIn();
        }).on("mouseout",function(){
            $(".c-wx").fadeOut();
        })
    })();
}()


!function(window, document){
    /*
     导航选中状态.nav-on-hover
     */
    /*var _ua=window.navigator.userAgent.toLowerCase(),
     page_name=window.location.pathname.substr(1),
     nav_items=document.querySelectorAll(".nav-item"),
     len=nav_items.length,
     i=0,
     tempName=false
     ;
     function setNavHover(i){
     nav_items[i].setAttribute("class",nav_items[i].getAttribute("class")+" nav-on-hover");
     }
     if(page_name===""){
     setNavHover(0);
     return;
     }
     for(;i<len;i++){
     tempName=nav_items[i].getAttribute("class").indexOf(page_name)!==-1;
     if(tempName){
     setNavHover(i);
     return;
     }
     }
     setNavHover(0);*/

    function SetHoverBg(obj){
        this._ua=window.navigator.userAgent.toLowerCase();
        this.page_name=window.location.pathname.substr(1);
        this.nav_items=document.querySelectorAll(".nav-item");
        this.len=this.nav_items.length;
        this.i=0;
        this.tempName=false
        ;
        if(this.page_name===""){
            this.setNavHover(0);
            return;
        }
        for(;this.i<this.len-1;this.i++){
            this.tempName=this.nav_items[this.i].getAttribute("class").indexOf(this.page_name)!==-1;
            if(this.tempName){
                this.setNavHover(this.i);
                return;
            }
        }
        this.setNavHover(0);
    }

    SetHoverBg.prototype={
        "constructor":SetHoverBg,
        "setNavHover":function (_i){
            this.nav_items[_i].setAttribute("class",this.nav_items[_i].getAttribute("class")+" nav-on-hover");
        }
    }
    var renderHoverBg=new SetHoverBg();
}(window, document)



