layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form', 'upload', 'element'], function () {

    var $ = layui.jquery;
    var element = layui.element;
    var form = layui.form;
    var upload = layui.upload;

    loadSectionTaskFrom();

    initProvince();
    initCity();
    initArea();
    //初始化完成统一渲染
    setTimeout(function () {
        layui.form.render("select");
    }, 500);

    //监听省份下拉框 选中加载城市下拉框数据
    form.on('select(provinceCode)', function (data) {
        $.ajax({
            url: '/region/getRegionTreeList?parentCode=' + data.value,
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //清除就城市选项
                $('#cityCode').html("");
                $('#cityCode').append(new Option('请选择城市', ""));
                //清除地区选项
                $('#areaCode').html("");
                $('#areaCode').append(new Option('请选择区域', ""));
                $.each(data, function (index, city) {
                    $('#cityCode').append(new Option(city.regionName, city.regionCode));// 下拉菜单里添加元素
                });
                //重新渲染
                $("#cityCode").val("");
                $("#areaCode").val("");
                layui.form.render("select");
            }
        });

    });
    //监听城市下拉框 选中加载地区下拉框数据
    form.on('select(cityCode)', function (data) {
        $.ajax({
            url: '/region/getRegionTreeList?parentCode=' + data.value,
            dataType: 'json',
            type: 'get',
            success: function (data) {
                //清除旧地区选项
                $('#areaCode').html("");
                $('#areaCode').append(new Option('请选择区域', ""));
                $.each(data, function (index, area) {
                    $('#areaCode').append(new Option(area.regionName, area.regionCode));// 下拉菜单里添加元素
                });
                $("#areaCode").val("");
                //重新渲染
                layui.form.render("select");
            }
        });

    });


    //拖拽上传
    var uploadInst = upload.render({
        elem: '#licenseImg',
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
                    $("#licensePhoto").val(res.object);//打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台
                    var picturesText = $('#picturesText');
                    picturesText.html('<span style="color: #21ff3d;">上传成功!!!</span>');
                    layer.closeAll();//关闭所有弹框
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

    form.on('submit(distributionUpdateSubmit)', function (data) {
        var field = data.field;
        $.ajax({
            url: "/distributor/updateDistributor",
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



    //初始化省份并选中值
    function initProvince() {
        $.ajax({
            url: '/region/getRegionTreeList?regionType=province',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $.each(data, function (index, province) {
                    $('#provinceCode').append(new Option(province.regionName, province.regionCode));// 下拉菜单里添加元素
                });
                //设置选中值
                $("#provinceCode").find("option[value=" + distributorData.provinceCode + "]").prop("selected", true);
                //重新渲染

            }
        });
    }


//初始化市 根据省份加载市 设置选中市
    function initCity() {
        $.ajax({
            url: '/region/getRegionTreeList?parentCode=' + distributorData.provinceCode,
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $.each(data, function (index, city) {
                    $('#cityCode').append(new Option(city.regionName, city.regionCode));// 下拉菜单里添加元素
                });
                //设置选中值
                $("#cityCode").find("option[value=" + distributorData.cityCode + "]").prop("selected", true);
                //重新渲染

            }
        });
    }

//初始化区 根据所选市加载区 设置选中区
    function initArea() {
        $.ajax({
            url: '/region/getRegionTreeList?parentCode=' + distributorData.cityCode,
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $.each(data, function (index, area) {
                    $('#areaCode').append(new Option(area.regionName, area.regionCode));// 下拉菜单里添加元素
                });
                //设置选中值
                $("#areaCode").find("option[value=" + distributorData.areaCode + "]").prop("selected", true);
                //重新渲染

            }
        });
    }

});

function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", distributorData);
}




