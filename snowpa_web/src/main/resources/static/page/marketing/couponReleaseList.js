layui.use(['jquery', 'table', 'layer', 'form', 'element'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        var laydate1 = layui.laydate;


        table.render({
            elem: '#couponReleaseList',
            height: "full-120",
            id: 'couponReload',
            url: '/coupon/getReleaseList', //数据接口
            method: 'GET',
            where: {
                "releaseStatus": 'Y'
            },
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
                    {field: 'id', title: 'ID', width: '5%', sort: true},
                    {field: 'couponName', title: '优惠券名称', width: '10%', sort: true},
                    {field: 'couponValue', title: '优惠券面值', width: '10%'},
                    {field: 'minPrice', title: '优惠券最低消费', width: '10%'},
                    {field: 'startTime', title: '领取开始时间', width: '10%'},
                    {field: 'endTime', title: '领取结束时间', width: '10%'},
                    {field: 'minPrice', title: '优惠券最低消费', width: '10%'},
                    {
                        field: 'unlimited', title: '是否不限量', width: '10%', templet: function (d) {
                            var unlimited = d.unlimited;
                            if (unlimited == 'Y') {
                                return '限量';
                            } else if (unlimited == 'N') {
                                return '不限量';
                            }
                        }
                    },
                    {field: 'totalCount', title: '发布数量', width: '10%'},
                    // {field: 'userType', title: '发放对象', width: '10%'},

                    {
                        field: 'status', title: '状态', width: '10%', templet: function (d) {
                            var status = d.status;
                            if (status == 'Y') {
                                return '有效';
                            } else if (status == 'N') {
                                return '无效';
                            }
                        }
                    }


                ]
            ]
        });


        $('#refresh').on('click', function () {
            table.reload('couponReload');
        });


    }
);




