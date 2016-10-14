window.setMode('dev', false);

(function (w, $) {
    $(document).ready(function () {
        var $aticleSections = $('.aticle-section'); // 新闻块，用于事件代理

        $aticleSections.each(function (index, el) {
            $(el).on('click', '.btn-more', function (event) {
                event.preventDefault();
                var $more = $(this),
                    $ul = $more .prev('ul');

                $.ajax({
                    url: "hotspot",
                    data: "a=1&b=2",
                    beforeSend: function() {
                        $more.text('加载中...');
                    },
                    success: function (data) {

                        $more.text('查看更多');
                        $ul.append($(data));
                    },
                    error: function () {
                        alert('error');
                    },
                    complete: function () {
                        // alert('complete');
                    }
                });
            });
        });
    });
})(window, jQuery);
