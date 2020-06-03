layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form', 'laydate'], function () {

    var $ = layui.jquery;
    var laydate = layui.laydate;

    var form = layui.form;
    loadSectionTaskFrom();

    laydate.render({
        elem: '#startTime',
        type: 'datetime'
    });

    laydate.render({
        elem: '#endTime',
        type: 'datetime'

    });

    form.on('radio(unlimited)', function (data) {
        var value = data.value;
        console.log(value);
        if (value === 'Y') {
            $("input[name='totalCount']").removeAttr("disabled");
            $("input[name='totalCount']").attr('value', '');
        } else if (value === 'N') {
            $("input[name='totalCount']").attr("disabled", "disabled");
            $("input[name='totalCount']").attr('value', 0);
        }
    });

    //监听提交

    form.on('submit(couponReleaseSubmit)', function (data) {
        var field = data.field;
        $.ajax({
            url: "/coupon/releaseCoupon",
            type: 'POST',
            cache: false,
            processData: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(field)
        }).done(function (result) {
            console.log(result);
            if (result.code == 0) {
                parent.layer.msg("操作成功!", {time: 1000}, function () {
                    //重新加载父页面
                    parent.location.reload();
                });
                return;
            } else {
                layer.alert(result.msg, function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
        });
        return false;
    });

});

function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", couponData);
}




