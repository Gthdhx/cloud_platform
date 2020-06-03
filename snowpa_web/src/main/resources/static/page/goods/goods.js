layui.use(['jquery', 'table', 'layer', 'form', 'util'], function () {

    var table = layui.table;

    var $ = layui.jquery;

    var data = {};

    //第一个实例
    table.render({
        elem: '#goodsList',
        height: "full-120",
        id: 'goodsReload',
        url: '/goods/getGoodsList', //数据接口
        method: 'GET',
        page: true, //开启分页,
        limit: 10,//初始页数据条数
        limits: [10, 20, 30, 40, 50],//分页显示条数
        toolbar: '#toolbar',
        //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        defaultToolbar: ['filter', 'exports', 'print', {
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }],
        cols: [
            [ //表头
                {field: 'productCode', title: '商品编码', width: '10%', sort: true},
                {field: 'productName', title: '商品名称', width: '10%'},
                {field: 'supplierCode', title: '商户编码', width: '10%'},
                {field: 'barcode', title: '商品条码', width: '10%'},
                {field: 'costPrice', title: '成本价', width: '10%'},
                {field: 'wholesalePrice', title: '批发价', width: '10%'},
                {field: 'retailPrice', title: '零售单价', width: '10%'},
                {field: 'postage', title: '邮费', width: '10%'},
                {field: 'sort', title: '排序', width: '5%', sort: true},
                {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '10%'}
            ]
        ]
    });


    var $ = layui.$, active = {

        reload: function () {
            var goodsName = $('#goodsName');
            //执行重载
            table.reload('goodsReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "goodsName": goodsName.val()
                }
            }, 'data');
        }
    };

    $('#goodsTable').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    $("#add").on("click", function () {
        openAddGoods();
    });

    //打开添加页面
    function openAddGoods() {
        layer.open({
            type: 2,
            area: ['90%', '95%'],
            title: '添加商品',
            shadeClose: true,
            content: ['/goods/goToGoodsInsertPage'],
            btn: ['保存', '关闭'],//只是为了演示
            yes: function (index) {
                layer.getChildFrame('body', index).find('button[lay-submit]').click()
                return false;
            },
            btn2: function () {
                layer.closeAll();
            }
        });
    }


    //监听行工具事件
    table.on('tool(goodsList)', function (obj) {
        data = obj.data; //获得当前行数据
        var id = data.id;
        if (obj.event === 'del') {
            layer.confirm('确认删除该数据？', function (index) {
                deleteGoods(id);
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            if (data == null || JSON.stringify(data) === '{}') {
                layer.msg("请选择编辑商品");
                return;
            }
            editOpen(id);
        }

    });

    //编辑商品
    function editOpen(id) {
        layer.open({
            type: 2,
            area: ['90%', '95%'],
            title: '编辑商品',
            shadeClose: true,
            content: ['/goods/goToGoodsUpdatePage?id=' + id],
            btn: ['保存', '关闭'],//只是为了演示
            yes: function (index) {
                layer.getChildFrame('body', index).find('button[lay-submit]').click();
                return false;
            },
            btn2: function () {
                layer.closeAll();
            }
        });
    }

    //删除方法
    function deleteGoods(id) {
        console.log(id);
        var data = {'id': id};
        $.ajax({
            url: "/goods/deleteGoods",
            type: 'POST',
            cache: false,
            processData: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (result) {
            console.log(result);
            if (result.code == 0) {
                parent.layer.msg("操作成功!", {time: 1000}, function () {
                    //重新加载父页面
                    location.reload();
                });
                return;
            } else {
                layer.alert(result.msg, function () {
                    layer.closeAll();//关闭所有弹框
                });
            }
        });

    }

});




