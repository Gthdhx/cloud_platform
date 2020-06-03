layui.use(['jquery', 'table', 'layer', 'form'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        //第一个实例
        table.render({
            elem: '#distributorCheckList',
            height: "full-120",
            id: 'distributorReload',
            url: '/distributorCheck/getDistributorCheckList', //数据接口
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
                    {field: 'wechatCode', title: '微信号', width: '5%'},
                    {field: 'nickname', title: '用户昵称', width: '10%'},
                    {
                        title: '所属地区', width: '10%', templet: function (d) {
                            var province = d.province;
                            var city = d.city;
                            var area = d.area;
                            var result = "";
                            if (typeof (province) != "undefined") {
                                result += '<span>' + province + '</span>';
                            }
                            if (typeof (city) != "undefined") {
                                result += '<span>' + city + '</span>';
                            }
                            if (typeof (area) != "undefined") {
                                result += '<span>' + area + '</span>';
                            }
                            return result;
                        }
                    },
                    {field: 'detailAddress', title: '详细地址', width: '10%'},
                    {field: 'linkman', title: '联系人', width: '10%'},
                    {field: 'checkPhone', title: '联系电话', width: '10%'},
                    {
                        field: 'licensePhoto', title: '营业执照', width: '10%', templet: function (d) {
                            var licensePhoto = d.licensePhoto;
                            if (typeof (licensePhoto) == "undefined") {
                                return "未上传";
                            } else {
                                return "已上传";
                            }

                        }
                    },
                    {field: 'businessScope', title: '主要营业范围', width: '10%'},
                    {
                        field: 'checkStatus', title: '状态', width: '10%', templet: function (d) {
                            var checkStatus = d.checkStatus;
                            switch (checkStatus) {
                                case 'DSH':
                                    return "待审核";
                                    break;
                                case 'SHWTG':
                                    return "审核未通过";
                                    break;
                                case 'SHTG':
                                    return "审核通过";
                                    break;
                                default:
                                    return "未知状态";
                            }

                        }
                    },
                    {field: 'referrerName', title: '推荐人', width: '10%'},
                    {field: 'referrerTime', title: '提交时间', width: '15%', sort: true},
                    {field: 'checker', title: '审核人', width: '15%'},
                    {field: 'checkTime', title: '审核时间', width: '15%', sort: true},
                    {field: 'remake', title: '审核备注', width: '15%'},
                    {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '5%'}

                ]
            ]
        });

        $("#refresh").on('click', function () {
            $('#nickname').val("");
            $("#phone").val("");
            location.reload();
        })

        //搜索重载页面
        var $ = layui.$, active = {
            reload: function () {
                var nickname = $('#nickname');
                var phone = $("#phone");

                //执行重载
                table.reload('distributorReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        'nickname': nickname.val(),
                        'phone': phone.val()
                    }
                }, 'data');
            }
        };

        $('#memberTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });


        //监听行工具事件
        table.on('tool(distributorCheckList)', function (obj) {
                var data = obj.data; //获得当前行数据
                var checkId = data.checkId;
             console.log(data);
                console.log(checkId);
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

                if (layEvent === 'check') {
                    if (data == null || JSON.stringify(data) === '{}') {
                        layer.msg("请选择查看分销员");
                        return;
                    }

                    checkOpen(checkId);
                }

            }
        );


        //详情
        function checkOpen(checkId) {
            layer.open({
                type: 2,
                area: ['30%', '45%'],
                title: '分销员审核',
                shadeClose: true,
                content: ['/distributorCheck/goToDistributorCheckCheckPage?checkId=' + checkId],
                btn: ['保存', '关闭'],//弹窗按钮
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }


    }
);




