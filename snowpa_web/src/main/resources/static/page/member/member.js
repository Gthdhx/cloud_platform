layui.use(['jquery', 'table', 'layer', 'form'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        //第一个实例
        table.render({
            elem: '#memberList',
            height: "full-120",
            id: 'memberReload',
            url: '/member/getMemberList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            toolbar: '#toolbar',
            where: {},
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
                    {field: 'referrerName', title: '推荐人', width: '10%'},

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

        //重置页面
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
                table.reload('memberReload', {
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

        //点击搜索
        $('#memberTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });


        //监听行工具事件
        table.on('tool(memberList)', function (obj) {
                var data = obj.data; //获得当前行数据
                var id = data.id;
                var userCode = data.userCode;
                var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
                if (layEvent === 'change') {// 详情按钮
                    layer.confirm('确认转换为分销员？', function (index) {
                        changeMember(userCode);
                        layer.close(index);
                    })
                } else if (layEvent === 'edit') {//编辑按钮
                    if (data == null || JSON.stringify(data) === '{}') {
                        layer.msg("请选择编辑会员");
                        return;
                    }
                    editOpen(id);

                } else if (layEvent === "details") {// 详情按钮
                    if (data == null || JSON.stringify(data) === '{}') {
                        layer.msg("请选择会员");
                        return;
                    }
                    detailsOpen(id);
                }
            }
        );


        //编辑
        function editOpen(id) {
            layer.open({
                type: 2,
                area: ['45%', '50%'],
                title: '编辑会员',
                shadeClose: true,
                content: ['/member/goToMemberUpdatePage?id=' + id],
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

        //详情
        function detailsOpen(id) {
            layer.open({
                type: 2,
                area: ['65%', '70%'],
                title: '会员详情',
                shadeClose: true,
                skin: 'layui-bg-gray',//设置弹窗背景色
                content: ['/member/goToMemberDetailsPage?id=' + id]
            });
        }

        //转化为分销员
        function changeMember(userCode) {
            $.ajax({
                url: "/member/changeMember",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({"userCode": userCode})
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

        //删除方法
        function deleteMember(id) {
            $.ajax({
                url: "/member/deleteMember",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(id)
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


        //
        // //新增按钮点击事件
        // $("#add").on("click", function () {
        //     openAddSupplier();
        // });
        //
        // //打开添加页面
        // function openAddSupplier() {
        //     layer.open({
        //         type: 2,
        //         area: ['50%', '50%'],
        //         title: '编辑商户',
        //         shadeClose: true,
        //         content: ['/supplier/goToSupplierInsertPage']
        //     });
        // }
        //
        //
        //


    }
);




