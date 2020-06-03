layui.use(['jquery', 'table', 'layer', 'form'], function () {

        var table = layui.table;

        var $ = layui.jquery;

        var data = {};

        //第一个实例
        table.render({
            elem: '#categoryList',
            height: "full-120",
            id: 'categoryReload',
            url: '/goodsCategory/getGoodsCategoryList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            cols: [
                [ //表头
                    {type: 'radio', field: 'id', title: 'ID', width: '5%', sort: true},
                    {field: 'categoryName', title: '分类名称', width: '14%'},
                    {field: 'categoryCode', title: '分类编码', width: '14%', sort: true},
                    {field: 'parentCode', title: '上级分类编码', width: '14%'},
                    {field: 'sort', title: '排序', width: '14%', sort: true},
                    {field: 'createTime', title: '创建时间', width: '16%'}
                ]
            ]
        });


        var $ = layui.$, active = {
            reload: function () {
                var categoryName = $('#categoryName');

                console.log(categoryName.val());
                //执行重载
                table.reload('categoryReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        "categoryName": categoryName.val()
                    }
                }, 'data');
            }
        };


        //搜索按钮点击事件
        $('#categoryTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //监听行工具事件
        table.on('radio(categoryList)', function (obj) {
            data = obj.data; //获得当前行数据
        });

        //新增按钮点击事件
        $("#add").on("click", function () {
            openAddCategory();
        });

        //打开添加页面
        function openAddCategory() {
            layer.open({
                type: 2,
                area: ['30%', '60%'],
                title: '编辑分类',
                shadeClose: true,
                content: ['/goodsCategory/goToGoodsCategoryInsertPage'],
                btn: ['保存', '关闭'],//只是为了演示
                yes: function (index, addOpen) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }

        //编辑按钮点击事件
        $("#edit").on("click", function () {
            if (data == null || JSON.stringify(data) === '{}') {
                layer.msg("请选择编辑分类");
                return;
            }
            var id = data.id;
            editOpen(id);
        });


        //编辑分类
        function editOpen(id) {
            layer.open({
                type: 2,
                area: ['30%', '60%'],
                title: '编辑分类',
                shadeClose: true,
                content: ['/goodsCategory/goTGoodsCategoryUpdatePage?id=' + id],
                btn: ['保存', '关闭'],//只是为了演示
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click()
                    return false;
                },
                btn2: function () {
                    layer.closeAll();
                }
            });
        }

        //删除分类
        $("#del").on("click", function () {
            if (data == null || JSON.stringify(data) === '{}') {
                layer.msg("请选择删除分类");
                return;
            }
            var id = data.id;
            deleteCategory(id);
        });

        //删除方法
        function deleteCategory(id) {
            layer.confirm('确认删除?', {icon: 3, title: '提示'}, function (index) {
                var dataId = {'id': id};
                console.log(dataId);
                $.ajax({
                    url: "/goodsCategory/deleteGoodsCategory",
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
                layer.close(index);
            });
        }
    }
);




