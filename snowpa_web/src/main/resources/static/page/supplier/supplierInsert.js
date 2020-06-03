layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['jquery', 'layer', 'form', "upload", "element"], function () {

    var $ = layui.jquery;
    var element = layui.element;
    var layer = layui.layer;
    var upload = layui.upload;
    var form = layui.form;


    //加载商户
    $.ajax({
        url: '/user/getUserTreeList',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            $.each(data, function (index, User) {
                $('#userCode').append(new Option(User.name, User.userCode));// 下拉菜单里添加元素
            });
            layui.form.render("select");
            //重新渲染 固定写法
        }
    });


    //拖拽上传
    var uploadInst = upload.render({
        elem: '#logoImg',
        dataType: 'jsonp',// 处理Ajax跨域问题
        url: 'http://127.0.0.1:8102/fileResource/upload?folder=a3',//改成您自己的上传接口
        size: 1024 * 2,//限制上传图片大小 单位KB
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }, done: function (res) {
            //上传成功
            if (res.result == 200) {
                layer.alert("上传成功", function () {

                    $("#logo").val(res.object);//打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台
                    var picturesText = $('#picturesText');
                    picturesText.html('<span style="color: #21ff3d;">上传成功!!!</span>');
                    layer.closeAll();//关闭所有弹框
                    let val = $("#logo").val();
                    console.log('图片路径' + val);
                });
            } else {
                // //如果上传失败
                layer.alert("上传失败", function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
        },
        error: function () {
            //演示失败状态，并实现重传
            var picturesText = $('#picturesText');
            picturesText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            picturesText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });
    element.init();


    //监听提交
    form.on('submit(supplierAddSubmit)', function (data) {
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




