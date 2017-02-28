$(function(){
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
	var curUrl = window.location.href;
	var url = "http://api.home.news.cn/wx/jsapi.do?callback=jsonp1&mpId=367&url=" + encodeURIComponent(curUrl);
	var link = curUrl;
	var shareInfo = window.shareInfo;
	shareInfo.title = shareInfo.title||document.title;
	shareInfo.desc = shareInfo.desc||'你问我答！汇聚你我声音一起上两会~';
	shareInfo.link = shareInfo.link||curUrl.split('?')[0];
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
			wx.onMenuShareTimeline({
				title: shareInfo.title,
				link: shareInfo.link,
				imgUrl: shareInfo.img
			});
			wx.onMenuShareAppMessage({
				title: shareInfo.title, 
				desc:shareInfo.desc, 
				link: shareInfo.link,
				imgUrl: shareInfo.img,
				type: 'link'
			});
		});
	});
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
				alert("请先关注新华网微信！");
				location.href = "http://hd.xuan.news.cn/view/zt/mars/guanzhu.html";
			}
		}, "jsonp");
	}
	window.comment=new XhComment({container:'#comment-body',commentSize:20,template:{container:null}});
    initPage();
});
function initPage(){
    new Swiper('.swiper-second', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        centeredSlides: true,
        paginationClickable: true,
        freeMode: true
    });

    $('.next-page').on('click', function(){
        $('html').removeClass('screen-full');
        $('.page1').height($(window).height()).slideUp();
        //$('.page1').hide();
    });
    var billitem = $('.bo-bill .swiper-slide').length;
    if(billitem>1){
        new Swiper('.bo-bill',{
            paginationClickable: true
        });
    }
}