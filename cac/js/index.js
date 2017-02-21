/**
 * Created by Administrator on 2017/2/14.
 */
$(function() {
    $_area = $("area"), $_targetDate = $(".dataMap li"), timeid = [];
    cacMaps.init();
    timeid = [0, 0];
});
var cacMaps = {
    init: function() {
        cacMaps.areaEvent();
        cacMaps.closeEvent();
        $_targetDate.hover(
            function() {
                clearTimeout(timeid[0]);
                clearTimeout(timeid[1]);
            },
            function() {
                timeid[1] = setTimeout(function() {
                    $_targetDate.fadeOut("fast").removeClass("show");
                }, 300);
            }
        ).click(function(event) {
                event.stopPropagation();
            });
    },
    areaEvent: function() {
        $_area.hover(
            function(event) {
                var id = $(this).attr("id");
                cacMaps.showBox(id);
                event.stopPropagation();
            },
            function() {
                clearTimeout(timeid[0]);
                clearTimeout(timeid[1]);
                timeid[1] = setTimeout(function() {
                    $_targetDate.fadeOut("fast").removeClass("show");
                }, 300);

            }
        );
    },
    showBox: function(id) {
        clearTimeout(timeid[0]);
        clearTimeout(timeid[1]);
        timeid[0] = setTimeout(function() {
            $_targetDate = $(".dataMap").find("." + id);
            if (!$_targetDate.hasClass("show")) {
                $_targetDate.fadeIn("fast").addClass("show").siblings().fadeOut("fast").removeClass("show");
            };
        }, 300);
    },
    closeEvent: function() {
        $("body").click(function(event) {
            $_targetDate.fadeOut("fast").removeClass("show");
            event.stopPropagation();
        });
    }
};



var startNum = 0;
var finish = false;
// 滚动事件
var lazyLoadDataItem = {
    init: function() {
        if ($("#autoData li").length) {
            var $_moreBtn = $("#moreBtn");
            var len = $("#autoData li").length;
            if (startNum < 9) {
                var $_listItem = $("#autoData li:hidden").eq(0);
                if ($_listItem.length) {
                    $_listItem.fadeIn();
                    if ($_listItem.index() == (len - 1)) { //如果最后一条
                        $_moreBtn.hide();
                    }
                    startNum++;
                    lazyLoadDataItem.init();
                } else {
                    $_moreBtn.hide();
                    finish = true;
                }
            } else {
                startNum = 0;
                return false;
            }
        }
    }
};
var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    autoplay: 3000,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    paginationClickable: true
});