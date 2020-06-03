layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form', 'laydate'], function () {
    var treeSelect = layui.treeSelect;
    var $ = layui.jquery;
    var form = layui.form;
    var laydate = layui.laydate;


    treeSelect.render({
        // 选择器
        elem: '#couponType',
        // 数据
        data: '/tree/getDictionaryTreeList?tableName=sc_coupon&fieldName=coupon_type',
        // 异步加载方式：get/post，默认get
        type: 'GET',
        // 占位符
        placeholder: '请选择',
        // 是否开启搜索功能：true/false，默认false
        search: true,
        // 一些可定制的样式
        style: {
            folder: {
                enable: true
            },
            line: {
                enable: true
            }
        },
        // 点击回调
        click: function (d) {
            console.log(d);
            $("#couponType").val(d.current.value);
        },
        // 加载完成后的回调函数
        success: function (d) {
            // 刷新树结构
            treeSelect.refresh('couponType');
        }
    });
    //下拉树结束


    laydate.render({
        elem: '#availableStartTime',
        type: 'datetime'
    });

    laydate.render({
        elem: '#availableEndTime',
        type: 'datetime'

    });
    //监听提交

    form.on('submit(couponAddSubmit)', function (data) {
        var field = data.field;
        console.log(field);
        $.ajax({
            url: "/coupon/insertCoupon",
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




