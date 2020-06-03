layui.use(['jquery', 'table', 'layer', 'form', 'laypage'], function () {

    var table = layui.table;
    var laypage = layui.laypage;
    var $ = layui.jquery;

    var data = {};

    table.render({
        elem: '#supplierLogisticsList',
        height: "full-120",
        id: 'supplierLogisticsReload',
        url: '/supplierLogistics/getSupplierLogisticsList', //数据接口
        method: 'GET',
        page: true,
        limit: 10,//初始页数据条数
        limits: [10, 20, 30, 40, 50],//分页显示条数
        toolbar:
            '#toolbar',
        //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        defaultToolbar:
            ['filter', 'exports', 'print', {
                title: '提示',
                layEvent: 'LAYTABLE_TIPS',
                icon: 'layui-icon-tips'
            }],
        cols:
            [
                [ //表头
                    {field: 'supplierName', title: '商户名称', width: '10%'},
                    {field: 'logisticsCode', title: '物流公司编号', width: '20%'},
                    {field: 'logisticsName', title: '物流公司名称', width: '10%'},
                    {
                        field: 'logisticsType', title: '物流类型', width: '10%', templet: function (data) {
                            var logisticsType = data.logisticsType;
                            switch (logisticsType) {
                                case 'KD':
                                    return "快递";
                                    break;
                                case 'HY':
                                    return "货运";
                                    break;
                                default:
                                    return "未知类型";
                            }
                        }
                    },
                    {field: 'sort', title: '排序', width: '10%'},
                    {
                        field: 'status', title: '状态', width: '15%', templet: function (data) {
                            var status = data.status;
                            switch (status) {
                                case 'Y':
                                    return "启用";
                                    break;
                                case 'N':
                                    return "禁用";
                                    break;
                                default:
                                    return "异常状态";
                            }
                        }
                    },
                    {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                    {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '10%'}
                ]
            ]

    });


    var $ = layui.$, active = {
        reload: function () {
            var logisticsName = $('#logisticsName');
            var supplierName = $('#supplierName');
            //执行重载
            table.reload('supplierLogisticsReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "logisticsName": logisticsName.val(),
                    "supplierName": supplierName.val()
                }
            }, 'data');
        }
    };


    //搜索按钮点击事件
    $('#Table').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //新增按钮点击事件
    $("#add").on("click", function () {
        openAddSupplierLogistics();
    });

    //打开添加页面
    function openAddSupplierLogistics() {
        layer.open({
            type: 2,
            area: ['30%', '50%'],
            title: '新增物流',
            shadeClose: true,
            content: ['/supplierLogistics/goToSupplierLogisticsInsertPage'],
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


    //监听行工具事件
    table.on('tool(supplierLogisticsList)', function (obj) {
        data = obj.data; //获得当前行数据
        var id = data.id;
        if (obj.event === 'del') {
            layer.confirm('确认删除该数据？', function (index) {
                deleteSupplierLogistics(id);
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            if (data == null || JSON.stringify(data) === '{}') {
                layer.msg("请选择编辑物流");
                return;
            }
            editOpen(id);
        }

    });


    //编辑物流
    function editOpen(id) {
        layer.open({
            type: 2,
            area: ['30%', '60%'],
            title: '编辑物流',
            shadeClose: true,
            content: ['/supplierLogistics/goToSupplierLogisticsUpdatePage?id=' + id],
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
    function deleteSupplierLogistics(id) {
        var dataId = {'id': id};
        layer.confirm('确认删除?', {icon: 3, title: '提示'}, function (index) {
            $.ajax({
                url: "/supplierLogistics/deleteSupplierLogistics",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(dataId)
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
            layer.close(index);
        });
    }

    $('#refresh').on('click', function () {
        location.reload();
        $('#logisticsName').val("");
        $('#supplierName').val("");
    });
});





