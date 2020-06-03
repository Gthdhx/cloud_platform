layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form'], function () {

    var $ = layui.jquery;


    loadSectionTaskFrom();

    //监听提交
    var form = layui.form;
    form.on('submit(checkSubmit)', function (data) {
        var field = data.field;
        $.ajax({
            url: "/distributorCheck/commitCheck",
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
    layui.form.val("dataFrm", checkData);
}




