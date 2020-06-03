layui.use(["jquery", "form", "layer", "element", 'table'], function () {

        var $ = layui.jquery;
        var layer = layui.layer;
        var table = layui.table;


        var data = {};

        //第一个实例
        table.render({
            elem: '#bulletinList',
            height: "full-120",
            id: 'bulletinReload',
            url: '/bulletin/getBulletinList', //数据接口
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
                    {field: 'bulletinCode', title: '公告编码', width: '10%'},
                    {
                        field: 'type', title: '公告类型', width: '10%', templet: function (data) {
                            var type = data.type;
                            switch (type) {
                                case 'GG':
                                    return "广告";
                                    break;
                                default:
                                    return "未知类型";
                            }
                        }
                    },
                    {field: 'title', title: '公告标题', width: '10%'},
                    {field: 'content', title: '公告内容', width: '10%'},
                    {
                        field: 'ifShow', title: '是否展示', width: '10%', templet: function (data) {
                            var ifShow = data.ifShow;
                            switch (ifShow) {
                                case 'Y':
                                    return "展示";
                                    break;
                                case 'N':
                                    return "隐藏";
                                    break;
                                default:
                                    return "异常状态";
                            }
                        }
                    },
                    {field: 'sort', title: '排序', width: '10%', sort: true},
                    {field: 'createTime', title: '创建时间', width: '10%', sort: true},
                    {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '10%'}
                ]
            ]
        });


        var $ = layui.$, active = {
            reload: function () {
                var title = $('#title');
                //执行重载
                table.reload('bulletinReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        "title": title.val()
                    }
                }, 'data');
            }
        };


        //搜索按钮点击事件
        $('#searchTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });


        //监听行工具事件
        table.on('tool(bulletinList)', function (obj) {
            data = obj.data; //获得当前行数据
            var id = data.id;
            if (obj.event === 'del') {
                layer.confirm('确认删除该数据？', function (index) {
                    deleteBulletin(id);
                    layer.close(index);
                });
            } else if (obj.event === "edit") {
                if (data == null || JSON.stringify(data) === '{}') {
                    layer.msg("请选择编辑公告");
                    return;
                }
                editBulletin(id);
            }

        });

        //编辑公告
        function editBulletin(id) {
            layer.open({
                type: 2,
                area: ['50%', '81%'],
                title: '编辑公告',
                shadeClose: true,
                content: ['/bulletin/goToBulletinUpdatePage?id=' + id],
                btn: ['保存', '关闭'],//弹窗按钮
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click();
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }


        //删除公告
        function deleteBulletin(id) {
            var dataId={"id":id};
            $.ajax({
                url: "/bulletin/deleteBulletin",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(dataId)
            }).done(function (result) {
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


        //新增按钮点击事件
        $("#add").on("click", function () {
            openAddBulletin();
        });

        //打开添加页面
        function openAddBulletin() {
            layer.open({
                type: 2,
                area: ['50%', '81%'],
                title: '新增公告',
                shadeClose: true,
                content: ['/bulletin/goToBulletinInsertPage'],
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

        $('#refresh').on('click', function () {
            location.reload();
            $('#title').val("");
        });


    }
);




