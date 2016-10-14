(function (w, $) {

    var Ajax = {
        // 模拟$.ajax
        ajax: function (obj) {
            var data = {};

            // 解析请求参数
            obj.data.split('&').forEach(function (ele) {
                var prop = ele.split('=')[0],
                    val = ele.split('=')[1];
                data[prop] = val;
            });

            obj.beforeSend && obj.beforeSend();

            // 模拟异步
            setTimeout(function () {
                if (!w.error) {
                    var data = w.data[obj.url];
                    if (obj.dataFilter){
                        data = obj.dataFilter(data);
                    }
                    obj.success(data);
                } else {
                    obj.error && obj.error();
                }

                obj.complete && obj.complete();

            }, 1000);
        },
        // 模拟$.getJSON
        getJSON: function (url, data, cb) {
            setTimeout(function () {
                cb(w.data[url]);
            }, 1000);
        },
    };
    // 设置开发模式
    w.setMode = function (mode, isError) {

        if (mode === 'dev') {
            for (var prop in Ajax) {
                if (Ajax.hasOwnProperty(prop)) {
                    $[prop] = Ajax[prop];
                }
            }
        }

        w.error = !!isError;

    };
    // 设置数据
    w.data = {
        'hotspot': ["<li>",
                    "<div class=\"aticle-img\">",
                    "<a href=\"\"><img src=\"http://imgsrc.baidu.com/forum/w%3D580/sign=a418fbfeb8014a90813e46b599763971/a8ec8a13632762d04d0ce0f3a1ec08fa513dc648.jpg\" alt=\"\"></a>",
                    "</div>",
                    "<h3><a href=\"\">坚定不移创新创新再创新 加快创新型国家建设步伐</a></h3>",
                    "<p>6月9日，中国科学院第十七次院士大会、中国工程院第十二次院士大会在北京人民大会堂隆重开幕。中共中央总书记、国家主席、中央军委主席习近平出席会议并发表重要讲话。 <a href=\"\">[详细]</a> </p>",
                    "<div class=\"aticle-info\"> <span class=\"aticle-time\">2016-03-17 14:35:45 </span> <span class=\"aticle-author\">责任编辑：<span>张琨</span></span> <span class=\"aticle-source\">来源：<span>新华网</span></span>",
                    "</div>",
                    "</li>"].join("")
    };
})(window, jQuery);
