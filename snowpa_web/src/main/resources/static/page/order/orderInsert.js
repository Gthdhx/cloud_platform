layui.use(['jquery', 'layer', 'form'], function () {

    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer;


    //监听提交
    form.on('submit(orderAddSubmit)', function (data) {
        var field = data.field;
        console.log(field);
        $.ajax({
            url: "/supplier/insertSupplier",
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




