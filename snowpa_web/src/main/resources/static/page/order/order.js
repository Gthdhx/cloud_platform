layui.use(['jquery', 'table', 'layer', 'form', 'util'], function () {
    var table = layui.table,
        layer = layui.layer,
        $ = layui.jquery,
        form = layui.form;


    //第一个实例
    table.render({
        elem: '#orderList',
        height: "full-120",
        id: 'orderReload',
        url: '/order/getOrderList', //数据接口
        method: 'GET',
        page: true, //开启分页,
        toolbar: '#toolbar',
        //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        defaultToolbar: ['filter', 'exports', 'print', {
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }],
        cols: [
            [ //表头
                {field: 'orderCode', title: '订单编码', width: '10%', sort: true},
                {field: 'supplier', title: '商户', width: '10%'},
                {
                    field: 'payStatus', title: '支付状态', width: '10%', templet: function (data) {
                        let payStatus = data.payStatus;
                        switch (payStatus) {
                            case 'DSK':
                                return '代收款';
                                break;
                            case 'YSK':
                                return '已收款';
                                break;
                            default:
                                return '状态异常';

                        }
                    }
                },
                {
                    field: 'payType', title: '支付方式', width: '10%', templet: function (data) {
                        let payType = data.payType;
                        switch (payType) {
                            case 'WXZF':
                                return '微信支付';
                                break;
                            default:
                                return '状态异常';

                        }
                    }
                },
                {field: 'delivery_code', title: '物流公司', width: '10%'},
                {
                    field: 'invoiceType', title: '开票类型', width: '10%', templet: function (data) {
                        let invoiceType = data.invoiceType;
                        switch (invoiceType) {
                            case 'PT':
                                return '普通发票';
                                break;
                            case 'ZZS':
                                return '增值税发票';
                                break;
                            default:
                                return '异常类型';

                        }
                    }
                },
                {
                    field: 'orderStatus', title: '订单状态', width: '10%', templet: function (data) {
                        let orderStatus = data.orderStatus;
                        switch (orderStatus) {
                            case 'DFH':
                                return '待发货';
                                break;
                            case 'DSH':
                                return '待收货';
                                break;
                            case 'DPJ':
                                return '待评价';
                                break;
                            case 'GB':
                                return '关闭';
                                break;
                            default:
                                return '状态异常';

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
            let orderCode = $('#orderCode');
            let payStatus = $('#payStatus  option:selected');
            let orderStatus = $('#orderStatus option:selected');
            //执行重载
            table.reload('orderReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "orderCode": orderCode.val(),
                    "payStatus": payStatus.val(),
                    "orderStatus": orderStatus.val()
                }
            }, 'data');
        }
    };
    //搜索
    $('#orderTable').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //重载
    $("#refresh").on('click', function () {
        location.reload();
    })


    //监听行工具事件
    table.on('tool(orderList)', function (obj) {
        data = obj.data; //获得当前行数据
        var id = data.id;
        if (obj.event === 'del') {
            layer.confirm('确认删除该数据？', function (index) {

                deleteOrder(id);
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            console.log(obj);
            console.log(data);
            if (data == null || JSON.stringify(data) === '{}') {
                layer.msg("请选择编辑商品");
                return;
            }

            editOpen(id);
        }

    });


    $("#add").on("click", function () {
        openAddOder();
    });

    //打开添加页面
    function openAddOder() {
        layer.open({
            type: 2,
            area: ['90%', '95%'],
            title: '新增订单',
            shadeClose: true,
            content: ['/order/goToOrderInsertPage'],
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

    //
    // $("#edit").on("click", function () {
    //     if (data == null || JSON.stringify(data) === '{}') {
    //         layer.msg("请选择商品");
    //         return;
    //     }
    //     var id = data.id;
    //     editOpen(id);
    // });
    //
    // function editOpen(id) {
    //     var that = this;
    //     layer.open({
    //         type: 2,
    //         area: ['50%', '50%'],
    //         title: '编辑商品',
    //         shadeClose: true,
    //         content: ['/goods/goToGoodsUpdatePage?id=' + id]
    //     });
    // }
    //
    //删除方法
    function deleteOrder(id) {
        console.log(id);
        var data = {'id': id};
        $.ajax({
            url: "/order/deleteOrder",
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




