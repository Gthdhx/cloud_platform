layui.use(['jquery', 'layer', 'form'], function () {

    var $ = layui.jquery;
    var form = layui.form;


    //加载商户
    $.ajax({
        url: '/supplier/getSupplierTreeList',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            $.each(data, function (index, Supplier) {
                $('#supplierCode').append(new Option(Supplier.name, Supplier.supplierCode));// 下拉菜单里添加元素
            });
            layui.form.render("select");
            //重新渲染 固定写法
        }
    });


    //监听提交
    form.on('submit(supplierLogisticsAddSubmit)', function (data) {
        var field = data.field;
        console.log(field);
        $.ajax({
            url: "/supplierLogistics/insertSupplierLogistics",
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




