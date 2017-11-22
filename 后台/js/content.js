//侧栏跟随浏览器
$(function () {
    if ($(".left-nav_side").length > 0) {
        var offset = $(".left-nav_side").offset();
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            //如果距离顶部的距离小于浏览器滚动的距离，则添加fixed属性。
            if (offset.top < scrollTop) $(".left-nav_side").addClass("left-nav");
            //否则清除fixed属性
            else $(".left-nav_side").removeClass("left-nav");
        });
    }
});
