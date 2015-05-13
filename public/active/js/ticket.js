$(function () {
    //select美化
    Select.init({
        selector: 'select'
    });
    $("#input_type").change(function () {
        var val = $(this).val();
        if (val == 1) {
            location.href = rootUrl + "/active/ticket/";
        } else if (val == 2) {
            location.href = rootUrl + "/active/ticket/offline_convert/";
        }
    });
});
