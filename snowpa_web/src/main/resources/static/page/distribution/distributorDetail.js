layui.use(['jquery', 'table', 'layer', 'form', 'util'], function () {
        var util = layui.util;
        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        loadSectionTaskFrom();


        var userCode = distributorDetail.userCode;


        //推荐分销员列表
        table.render({
            elem: '#distributorList',
            height: "auto",
            id: 'distributorReload',
            url: '/distributor/getRelevanceMemberList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            where: {
                'userCode': userCode,
                'userType': 'B'
            },
            //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            defaultToolbar: ['filter', 'exports', 'print', {
                title: '提示',
                layEvent: 'LAYTABLE_TIPS',
                icon: 'layui-icon-tips'
            }],
            cols: [
                [ //表头

                    {field: 'wechatCode', title: '微信号', width: '10%'},
                    {field: 'nickname', title: '用户昵称', width: '10%'},
                    {
                        field: 'createTime', title: '推荐时间', width: '15%', templet: function (d) {
                            var createTime = d.createTime;
                            if (createTime != null) {
                                return util.toDateString(createTime, "yyyy-MM-dd HH:mm:ss");
                            }

                        }, sort: true
                    }
                ]
            ]
        });
        //推荐会员
        table.render({
            elem: '#memberList',
            height: "auto",
            id: 'memberReload',
            url: '/distributor/getRelevanceMemberList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            where: {
                'userCode': userCode,
                'userType': 'CO'
            },
            //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            defaultToolbar: ['filter', 'exports', 'print', {
                title: '提示',
                layEvent: 'LAYTABLE_TIPS',
                icon: 'layui-icon-tips'
            }],
            cols: [
                [ //表头

                    {field: 'wechatCode', title: '微信号', width: '10%'},
                    {field: 'nickname', title: '用户昵称', width: '10%'},
                    {
                        field: 'createTime', title: '推荐时间', width: '15%', templet: function (data) {
                            var createTime = data.createTime;
                            if (typeof (createTime) != "undefined") {
                                return util.toDateString(createTime, "yyyy-MM-dd HH:mm:ss");
                            }

                        }, sort: true
                    }
                ]
            ]
        });

        //收货地址
        table.render({
            elem: '#addressList',
            height: "auto",
            id: 'addressReload',
            url: '/distributor/getDistributorAddressList', //数据接口
            method: 'GET',
            where: {
                'userCode': userCode

            },
            page: true, //开启分页,
            //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            defaultToolbar: ['filter', 'exports', 'print', {
                title: '提示',
                layEvent: 'LAYTABLE_TIPS',
                icon: 'layui-icon-tips'
            }],
            cols: [
                [ //表头

                    {field: 'consignee', title: '收货人', width: '10%'},
                    {field: 'phone', title: '电话号码', width: '10%'},
                    {field: 'receiveAddress', title: '收货地址', width: '40%'},
                    {
                        field: 'type', title: '地址类型', width: '10%', templet: function (data) {
                            var type = data.type;
                            switch (type) {
                                case 0:
                                    return '非默认地址';
                                    break;
                                case 1:
                                    return '默认地址';
                                    break;
                                default:
                                    return '未知类型';
                            }
                        }
                    }
                ]
            ]
        });


    }
);

function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", distributorDetail);
}



