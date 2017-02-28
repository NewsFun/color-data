$(function(){
    var curUrl = window.location.href;
    var url = "http://api.home.news.cn/wx/jsapi.do?mpId=367&url=" + encodeURIComponent(curUrl);
    var link = curUrl;
    var shareInfo = window.shareInfo;
    shareInfo.title = shareInfo.title||document.title;
    shareInfo.desc = shareInfo.desc||'你问我答！汇聚你我声音一起上两会~';
    shareInfo.link = shareInfo.link||curUrl;
    shareInfo.img = shareInfo.img||'';
    ajaxP(url, function(e){
        var appId = e.content.appId;
        var nonceStr = e.content.nonceStr;
        var signature = e.content.signature;
        var timestamp = e.content.timestamp;
        wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function(){
            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: shareInfo.title,
                link: shareInfo.link,
                imgUrl: shareInfo.img
            });
            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: shareInfo.title,
                desc:shareInfo.desc,
                link: shareInfo.link,
                imgUrl: shareInfo.img,
                type: 'link'
            });
        });
    });
});
$(function() {
    window.followTag=true;
    var url = window.location.search.substring(1).split('=');
    var openid = url[1];
    if(openid == null){
        //location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2094ab6ecab995d2&redirect_uri=http%3A%2F%2Fapi.home.news.cn%2Fwx%2Foauth%2Fcb%2FtoIndexWithOpenid%2F367.do&response_type=code&scope=snsapi_base&state="+encodeURIComponent(window.location.href);+"#wechat_redirect";
    }else{
        var url = "http://api.home.news.cn/wx/isSubscribe?appId=wx2094ab6ecab995d2&openId="+openid;
        $.get(url, function(data){
            if(data.code == 0){
                window.followTag=false;
            }
        }, "jsonp");
    }
    //评论
    window.comment=new XhComment({container:'#comment-body',commentSize:20,template:{container:null},callback:function(xhCom){
        xhCom.el.commentContent.on('focus',function(){
            if(!window.followTag){
                alert("请先关注新华网微信！");
                location.href = "http://hd.xuan.news.cn/view/zt/mars/guanzhu.html";
            }
        });
        xhCom.el.list.addClass('swiper-no-swiping');
    }});

    /*
     new Swiper('.swiper-container', {
     direction: 'vertical',
     paginationClickable: true
     });
     */
    initPage();
});
function ajaxP(url, fn){
    $.ajax({
        type: "GET",
        async: false,
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonp1",
        success: fn,
        error: function(msg){
            console.log(msg);
        }
    });
}
function initPage(){
    new Swiper('.swiper-second', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        freeMode: true
    });

    $('.next-page').on('click', function(){
        $('html').removeClass('screen-full');
        //$('.page1').slideUp();
        $('.page1').hide();
    });
    var billitem = $('.bo-bill .swiper-slide').length;
    if(billitem>1){
        new Swiper('.bo-bill',{
            paginationClickable: true
        });
    }
}