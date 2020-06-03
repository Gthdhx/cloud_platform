layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form', 'laydate'], function () {

        var $ = layui.jquery;
        var laydate = layui.laydate;
        var form = layui.form;


        var availableStartTime = couponData.availableStartTime;

        laydate.render({
            elem: '#availableStartTime',
            type: 'datetime',
            value: availableStartTime //参数即为：2018-07-20 00:00:00 的时间戳
        });


        var availableEndTime = couponData.availableEndTime;

        laydate.render({
            elem: '#availableEndTime',
            type: 'datetime',
            value: availableEndTime
        });


        //加载优惠券类型
        $.ajax({
            url: '/tree/getDictionaryTreeList?tableName=sc_coupon&fieldName=coupon_type',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $.each(data, function (index, couponType) {
                    $('#couponType').append(new Option(couponType.name, couponType.id));// 下拉菜单里添加元素
                });

                //设置选中值
                $("#couponType").find("option[value=" + couponData.couponType + "]").prop("selected", true);
                //重新渲染
                layui.form.render("select");

            }

        });


        loadSectionTaskFrom();

        //监听提交

        form.on('submit(couponEditSubmit)', function (data) {
            var field = data.field;
            $.ajax({
                url: "/coupon/updateCoupon",
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

    }
);

function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", couponData);
}




