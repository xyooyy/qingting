var t;
$(document).ready(function () {
    $(".dropmenu").on('mouseenter', function () {
        $(this).addClass("hover");
    }).on('mouseleave', function () {
        var that = this;
        t = setTimeout(function () {
            $(that).removeClass('hover')
        }, 100)
    })
    $(".dropmenu-bd").on('mouseenter', function () {
        clearTimeout(t)
        t = null;
    }).on('mouseleave', function () {
        $(this).parent().add('hover')
    })
});