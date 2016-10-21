/**
 * Created by Administrator on 2016/10/17.
 */
$(document).ready(function(){
    function Home(){
        this.init = function(){
            this.initHeader();
            this.initFooter();
        }
    }
    Home.prototype = {
        initHeader:function(){
            var header = '<div id="top" class="header bg_db"><div class="bg_white"><div class="w_1200 unfix"><div class="logo">' +
                '<a href="http://www.xinhuanet.com"><img src="http://www.xinhuanet.com/video/xhsp/zgzgdh/img/logo.png"></a></div><ul class="inline">' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/index.htm">首页</a></li>' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/dhjj.htm">大会简介</a></li>' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/nyjb.htm">拟邀嘉宾</a></li>' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/ltjj.htm">论坛聚焦</a></li>' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/chzc.htm">参会注册</a></li>' +
                '<li><a target="_blank" href="http://www.xinhuanet.com/video/xbsp/zgzgdh/chzc.htm">媒体注册</a></li></ul></div></div></div>';
            $('body').prepend(header);
        },
        initFooter:function(){
            var footer = '<div class="footer bg_db"><div class="line"></div><div class="w_800"><div class="h2"><div>' +
                '<span>主办单位：新华网股份有限公司&nbsp;&nbsp;</span><span>南京市经济和信息化委员会&nbsp;&nbsp;</span>' +
                '<span>联合主办：清华大学智能技术与系统国家重点实验室</span></div><div><span>承办单位：新华网融媒体未来研究院&nbsp;&nbsp;</span>' +
                '<span>新华网移动互联网产品创新研发基地&nbsp;&nbsp;</span><span>江宁经济技术开发区</span></div><div>' +
                '<span>支持单位：中科院沈阳自动化研究所机器人学国家重点实验室&nbsp;&nbsp;</span><span>国家机器人标准化总体组&nbsp;&nbsp;</span>' +
                '<span>清华大学全球产业研究院</span></div></div><div class="copyright">' +
                '<div><a>关于我们</a>|<a>江苏分社简介</a>|<a>广告服务</a>|<a>网站导航</a>|<a>联系我们</a>|<a>人员名单</a></div>' +
                '<div><span>Copyright&nbsp;©&nbsp;2001-2013&nbsp;js.xinhuanet.com</span><span>All Rights Reserved</span><span>制作单位:新华网江苏频道</span></div>' +
                '<div><span>电话：(025)84783450</span><span>传真：(025)84783450</span></div></div></div><div class="to_top"><a href="#top"></a></div></div>';
            $('body').append(footer);
        }
    };
    new Home().init();
});
