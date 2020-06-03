layui.use(["jquery", "form", "layer", "element", 'table'], function () {

        var $ = layui.jquery;
        var layer = layui.layer;
        var table = layui.table;


        var data = {};

        //第一个实例
        table.render({
            elem: '#supplierList',
            height: "full-120",
            id: 'supplierReload',
            url: '/supplier/getSupplierList', //数据接口
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
                    {field: 'supplierCode', title: '商户编码', width: '10%'},
                    {field: 'supplierName', title: '商户名称', width: '10%', sort: true},
                    {field: 'linkman', title: '联系人', width: '10%'},
                    {field: 'phone', title: '联系电话', width: '10%'},
                    {field: 'supplierAddress', title: '联系地址', width: '10%'},
                    {field: 'commonTaxRate', title: '普票税率', width: '10%', sort: true},
                    {field: 'incrementTaxRate', title: '增值税率', width: '10%', sort: true},
                    {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                    {fixed: 'right', title: '操作', toolbar: '#barDemo', width: '10%'}
                ]
            ]
        });


        var $ = layui.$, active = {
            reload: function () {
                var supplierName = $('#supplierName');
                var linkman = $('#linkman');
                //执行重载
                table.reload('supplierReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        "supplierName": supplierName.val(),
                        "linkman": linkman.val()
                    }
                }, 'data');
            }
        };

        //搜索按钮点击事件
        $('#supplierTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //监听行工具事件
        table.on('tool(supplierList)', function (obj) {
            data = obj.data; //获得当前行数据
            var id = data.id;
            if (obj.event === 'del') {
                layer.confirm('确认删除该数据？', function (index) {

                    deleteSupplier(id);
                    layer.close(index);
                });
            } else if (obj.event === "edit") {
                if (data == null || JSON.stringify(data) === '{}') {
                    layer.msg("请选择编辑菜单");
                    return;
                }
                editOpen(id);
            }

        });

        //编辑商户
        function editOpen(id) {
            layer.open({
                type: 2,
                area: ['50%', '81%'],
                title: '编辑商户',
                shadeClose: true,
                content: ['/supplier/goToSupplierUpdatePage?id=' + id],
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


        //删除商户
        function deleteSupplier(id) {
            var dataId={"id":id};
            $.ajax({
                url: "/supplier/deleteSupplier",
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
            openAddSupplier();
        });

        //打开添加页面
        function openAddSupplier() {
            layer.open({
                type: 2,
                area: ['50%', '81%'],
                title: '新增商户',
                shadeClose: true,
                content: ['/supplier/goToSupplierInsertPage'],
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
            $('#supplierName').val("");
            $('#linkman').val("");
        });


    }
);




