layui.use(['jquery', 'table', 'layer', 'form'], function () {

        var table = layui.table;

        var $ = layui.jquery;
        var layer=layui.layer;
        var data = {};

        //第一个实例
        table.render({
            elem: '#distributorList',
            height: "full-120",
            id: 'distributorReload',
            url: '/distributor/getDistributorList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            limit: 10,
            limits: [10, 20, 30, 40, 50],
            toolbar: '#toolbar',
            where: {
                'type': '0'
            },
            //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            defaultToolbar: ['filter', 'exports', 'print', {
                title: '提示',
                layEvent: 'LAYTABLE_TIPS',
                icon: 'layui-icon-tips'
            }],
            cols: [
                [ //表头

                    {field: 'wechatCode', title: '微信号', width: '5%'},
                    {field: 'nickname', title: '用户昵称', width: '10%'},
                    {
                        field: 'userType', title: '客户类型', width: '10%', templet: function (data) {
                            var userType = data.userType;
                            switch (userType) {
                                case 'B':
                                    return '分销员';
                                    break;
                                case 'CO':
                                    return '会员';
                                    break;
                                default:
                                    return '未知类型';
                            }
                        }
                    },
                    {
                        field: 'cashOnDelivery', title: '是否开启货到付款', width: '10%', templet: function (data) {
                            var cashOnDelivery = data.cashOnDelivery;
                            switch (cashOnDelivery) {
                                case 'N':
                                    return '未开启';
                                    break;
                                case 'Y':
                                    return '开启';
                                    break;
                                default:
                                    return '未知';
                            }
                        }
                    },
                    {field: 'quotaOnDelivery', title: '货到付款额度(元)', width: '10%'},
                    {field: 'realName', title: '真实姓名', width: '10%'},
                    {field: 'phone', title: '手机电话', width: '10%'},
                    {field: 'province', title: '所属省份', width: '10%'},
                    {field: 'city', title: '所属城市', width: '10%'},
                    {field: 'area', title: '所属地区', width: '10%'},
                    {field: 'businessScope', title: '主营范围', width: '10%'},
                    {
                        field: 'licensePhoto', title: '营业执照', width: '10%', templet: function (data) {
                            var licensePhoto = data.licensePhoto;
                            if (typeof (licensePhoto) != 'undefined') {
                                return "已上传";
                            } else {
                                return "未上传";
                            }
                        }
                    },
                    {field: 'shopCount', title: '购买次数', width: '10%'},
                    {field: 'commission', title: '佣金金额', width: '10%'},
                    {field: 'referrerCount', title: '直推人数', width: '10%'},
                    {field: 'createTime', title: '注册时间', width: '15%', sort: true},
                    {
                        field: 'status', title: '状态', width: '10%', templet: function (data) {
                            var status = data.status;
                            switch (status) {
                                case 'Y':
                                    return '正常';
                                    break;
                                case 'N':
                                    return '注销';
                                    break;
                                default:
                                    return '状态异常';
                            }
                        }
                    },
                    {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '15%'}
                ]
            ]
        });

        $("#refresh").on('click', function () {
            $('#nickname').val("");
            $('#phone').val("");
            location.reload();
        })

        //搜索重载页面
        var $ = layui.$, active = {
            reload: function () {
                var nickname = $('#nickname');
                var phone = $('#phone');
                //执行重载
                table.reload('distributorReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        "nickname": nickname.val(),
                        "phone": phone.val()
                    }
                }, 'data');
            }
        };

        $('#memberTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });


        //监听行工具事件
        table.on('tool(distributorList)', function (obj) {
                var data = obj.data; //获得当前行数据
                var id = data.id;
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

                if (layEvent === 'detail') {
                    if (data == null || JSON.stringify(data) === '{}') {
                        layer.msg("请选择查看分销员");
                        return;
                    }
                    detailOpen(id);
                } else if (layEvent === "edit") {
                    if (data == null || JSON.stringify(data) === '{}') {
                        layer.msg("请选择编辑会员");
                        return;
                    }
                    editDistributor(id);
                }
            }
        );


        //编辑商品
        function editDistributor(id) {
            layer.open({
                type: 2,
                area: ['65%', '70%'],
                title: '编辑分销员',
                shadeClose: true,
                content: ['/distributor/goToDistributorUpdatePage?id=' + id],
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


        //详情
        function detailOpen(id) {
            layer.open({
                type: 2,
                area: ['80%', '90%'],
                title: '会员详情',
                shadeClose: true,
                content: ['/distributor/goToDistributorDetailsPage?id=' + id]
            });
        }






    }
);




