layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'jquery', 'layer', 'form', 'table'], function () {

    var $ = layui.jquery;
    var table = layui.table;

    loadSectionTaskFrom();


    var userCode = memberDetail.userCode;


    //收货地址
    table.render({
        elem: '#addressList',
        height: "auto",
        id: 'addressReload',
        url: '/member/getMemberAddressList',
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

});

function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", memberDetail);
}




