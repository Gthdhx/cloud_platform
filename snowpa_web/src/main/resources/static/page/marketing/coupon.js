layui.use(['jquery', 'table', 'layer', 'form', 'element'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        var laydate1 = layui.laydate;


        table.render({
            elem: '#couponList',
            height: "full-120",
            id: 'couponReload',
            url: '/coupon/getCouponList', //数据接口
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
                    {field: 'couponName', title: '优惠券名称', width: '10%'},
                    {field: 'couponValue', title: '优惠券面值', width: '10%'},
                    {field: 'minPrice', title: '优惠券最低消费', width: '10%'},
                    {field: 'availableStartTime', title: '优惠券生效时间', width: '15%'},
                    {field: 'availableEndTime', title: '优惠券失效时间', width: '15%'},
                    {
                        field: 'releaseStatus', title: '发布状态', width: '10%', templet: function (d) {
                            var releaseStatus = d.releaseStatus;
                            switch (releaseStatus) {
                                case 'Y':
                                    return '已发布';
                                    break;
                                case 'N':
                                    return '未发布';
                                    break;
                                default:
                                    return '未知状态'
                            }

                        }
                    },
                    {
                        field: 'status', title: '状态', width: '10%', templet: function (d) {
                            var status = d.status;
                            switch (status) {
                                case 'Y':
                                    return '有效';
                                    break;
                                case 'N':
                                    return '无效';
                                    break;
                                default:
                                    return '未知状态'
                            }
                        }
                    },
                    {field: 'sort', title: '排序', width: '10%', sort: true},
                    {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                    {fixed: 'right', width: '15%', align: 'center', toolbar: '#barEdit'}

                ]
            ]
        });


        //新增按钮点击事件
        $("#add").on("click", function () {
            openAddCoupon();
        });

        //打开添加页面
        function openAddCoupon() {
            layer.open({
                offset: 'auto',
                type: 2,
                area: ['45%', '60%'],
                title: '编辑优惠券',
                shadeClose: true,
                btnAlign: 'r',
                content: ['/coupon/goToCouponInsertPage'],
                btn: ['保存', '关闭'],
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }


        table.on('tool(couponList)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var id = data.id;
            if (layEvent === 'edit') { //编辑
                editOpen(id);
            } else if (layEvent === 'del') { //删除
                layer.confirm('真的删除行么', function (index) {
                    deleteCoupon(id);
                    layer.close(index);
                })
            } else if (layEvent === 'release') { //发布
                releaseOpen(id);
            }
        });

        //编辑优惠券
        function editOpen(id) {
            layer.open({
                type: 2,
                area: ['45%', '60%'],
                title: '编辑优惠券',
                shadeClose: true,
                content: ['/coupon/goToCouponUpdatePage?id=' + id],
                btn: ['保存', '关闭'],
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }

        //发布优惠券
        function releaseOpen(id) {
            layer.open({
                offset: 'auto',
                type: 2,
                area: ['30%', '70%'],
                title: '编辑优惠券',
                shadeClose: true,
                content: ['/coupon/goToCouponReleasePage?id=' + id],
                btn: ['保存', '关闭'],
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }


        //删除方法
        function deleteCoupon(id) {
            var dataId = {'id': id}
            $.ajax({
                url: "/coupon/deleteCoupon",
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
        };


    }
);




