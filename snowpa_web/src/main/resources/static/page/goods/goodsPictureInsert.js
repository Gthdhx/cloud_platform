layui.use(['upload', 'jquery', 'form'], function () {
    var $ = layui.jquery
    var upload = layui.upload;
    var form = layui.form;


    form.on('submit(uploadSubmit)', function (data) {
        var field = data.field;
        console.log(field);
        let pictureName = field.pictureName;
        let pictureType = field.pictureType;
        let sequence = field.sequence;
        //判断是否未填写名称和选择类型
        if (pictureName === "" && pictureType === "" && sequence === "") {
            return false;
        } else {
            $('#upload').click();
        }
    });


    //普通图片上传
    var uploadInst = upload.render({
        elem: '#upload',
        dataType: 'jsonp',  // 处理Ajax跨域问题
        url: resource+'/fileResource/upload?folder=a3', //改成您自己的上传接口
        size: 1024 * 2,//限制上传图片大小 单位KB
        before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                $('#pictures').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img" style="width: 80px; margin:10px;cursor:pointer;">')
            });
        },

        done: function (res) {
            // //如果上传失败
            if (res.result == 200) {
                goodsPictureInsert(res.object);
                $("#pictureName").val("");
                $("#sequence").val("");
            } else {
                layer.alert("上传失败", function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
            //上传成功
        },
        error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
    });

    function goodsPictureInsert(path) {
        let pictureName = $("#pictureName").val();
        let pictureType = $("#pictureType option:selected").val();
        let sequence = $('#sequence').val();
        var pictureData = {
            'path': path,
            'goodsCode': goodsCode,
            'pictureName': pictureName,
            'pictureType': pictureType,
            'sequence': sequence

        };

        console.log(pictureData);
        $.ajax({
            url: "/goods/goodsPictureInsert",
            type: 'POST',
            cache: false,
            processData: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(pictureData)
        }).done(function (result) {
            console.log(result);
            if (result.code == 0) {
                parent.layer.msg("操作成功!", {time: 1000}, function () {
                    // //重新加载父页面
                    // parent.location.reload();
                });
                return;
            } else {
                layer.alert(result.msg, function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
        });
        return false;

    }

});




