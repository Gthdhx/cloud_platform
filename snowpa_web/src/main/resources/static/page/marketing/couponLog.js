layui.use(['jquery', 'table', 'layer', 'form', 'element'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        //方法渲染表格
        table.render({
            elem: '#couponLogList',
            height: "full-120",
            id: 'couponLogReload',
            url: '/couponLog/getCouponLogList', //数据接口
            method: 'GET',
            page: true, //开启分页,
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
                    {field: 'couponName', title: '优惠券名称', width: '10%', sort: true},
                    {field: 'nickname', title: '所属用户', width: '10%'},
                    {field: 'couponValue', title: '优惠券面值', width: '10%'},
                    {field: 'availableStartTime', title: '优惠券生效时间', width: '10%'},
                    {field: 'availableEndTime', title: '优惠券失效始时间', width: '15%'},
                    // {field: 'userType', title: '用户类型', width: '15%'},
                    {
                        field: 'couponType', title: '优惠券类型', width: '15%', templet: function (data) {
                            var couponType = data.couponType;
                            switch (couponType) {
                                case 'ZCJSQ':
                                    return '注册即送卷';
                                    break;
                                case 'PTHDQ':
                                    return '平台活动卷';
                                    break;
                                case 'ZCCXQ':
                                    return '专场促销卷';
                                    break;
                                case 'CJCXQ':
                                    return '厂家促销卷';
                                    break;
                                case 'QDFDQ':
                                    return '月度返点卷';
                                    break;
                                case 'TGXRFYQ':
                                    return '推广新人返佣券';
                                    break;
                                default :
                                    return '未知类型';
                            }
                        }
                    },
                    {
                        field: 'status', title: '是否可用', width: '10%', templet: function (data) {
                            var status = data.status;
                            switch (status) {
                                case 'Y':
                                    return '可用';
                                    break;
                                case 'N':
                                    return '不可用';
                                    break;
                                default :
                                    return '未知状态';

                            }
                        }
                    },
                    {
                        field: 'used', title: '是否使用', width: '10%', templet: function (data) {
                            var used = data.used;
                            switch (used) {
                                case 'Y':
                                    return '已使用';
                                    break;
                                case 'N':
                                    return '未使用';
                                    break;
                                default :
                                    return '未知状态';

                            }
                        }
                    }
                ]
            ]
        });

        //搜索重载页面
        var $ = layui.$, active = {
            reload: function () {
                var couponName = $('#couponName');

                //执行重载
                table.reload('couponLogReload', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        }
                        , where: {
                            "couponName": couponName.val()
                        }
                    },
                    'data'
                )
                ;
            }
        };

        $('#searchTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        $('#refresh').on('click', function () {
            location.reload();
        });

    }
);




