layui.use(['jquery', 'form', 'layer'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;
    //规格新增提交
    form.on('submit(specificationsAddSubmit)', function (data) {
        var field = data.field;
        field.goodsCode = goodsCode;
        var status = "false";
        $.ajax({
            url: "/goods/insertGoodsSpecifications",
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
                    console.log("保存成功执行关闭方法");
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);//关闭当前页
                });
                return;
            } else {
                layer.alert(result.msg, function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
        });
        return status;
    });


});




