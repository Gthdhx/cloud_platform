layui.config({
    base: "/js/"
}).extend({
    treeSelect: "treeSelect"
});
layui.use(['treeSelect', 'table', 'jquery', 'layer', 'form', 'element'], function () {

        var table = layui.table;

        var $ = layui.jquery;
        var element = layui.element;
        var form = layui.form;
        var treeSelect = layui.treeSelect;
        var layer = layui.layer;

        loadSectionTaskFrom();

        //加载商户
        $.ajax({
            url: '/supplier/getSupplierTreeList',
            dataType: 'json',
            type: 'get',
            success: function (data) {
                $.each(data, function (index, Supplier) {
                    $('#supplierCode').append(new Option(Supplier.name, Supplier.supplierCode));// 下拉菜单里添加元素
                });
                //设置选中值
                $("#supplierCode").find("option[value=" + goodsData.supplierCode + "]").prop("selected", true);
                //重新渲染
                layui.form.render("select");

            }

        });


        //加载商品分类
        treeSelect.render({
            // 选择器
            elem: '#categoryCode',
            // 数据
            data: '/goodsCategory/getGoodsCategoryTreeList',
            // 异步加载方式：get/post，默认get
            type: 'get',
            // 占位符
            placeholder: '请选择',
            // 是否开启搜索功能：true/false，默认false
            search: true,
            // 一些可定制的样式
            style: {
                folder: {
                    enable: true
                },
                line: {
                    enable: true
                }
            },
            // 点击回调
            click: function (d) {
                $("#categoryCode").val(d.current.categoryCode);
            },
            // 加载完成后的回调函数
            success: function (d) {
                //选中节点，根据id筛选
                treeSelect.checkNode('categoryCode', goodsData.categoryId);
                //获取zTree对象，可以调用zTree方法
                // var treeObj = treeSelect.zTree('parentCode');
                //刷新树结构
                treeSelect.refresh('categoryCode');
            }
        });


        //规格列表
        table.render({
            elem: '#specificationsList',
            title: '商品规格表',
            id: 'specificationsListReload',
            height: "auto",
            url: '/goods/getSpecificationsListList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            limit: 10,//初始页数据条数
            limits: [10, 20, 30, 40, 50],//分页显示条数
            where: {
                "goodsCode": goodsCode
            },
            cols: [
                [ //表头
                    {type: 'radio', field: 'id', title: 'ID', width: '5%', sort: true},
                    {field: 'specificationsCode', title: '规格编码', width: '15%'},
                    {field: 'specificationsName', title: '规格名称', width: '15%'},
                    {field: 'costPrice', title: '成本价(不含税)', width: '10%'},
                    {field: 'wholesalePrice', title: '批发价格(不含税)', width: '10%'},
                    {field: 'retailPrice', title: '零售单价(不含税)', width: '10%'},
                    {field: 'postage', title: '邮费', width: '10%'},
                    {field: 'sort', title: '排序', width: '5%'},
                    {fixed: 'right', title: '操作', toolbar: '#specificationsOperate', width: '20%'}
                ]
            ]
        });


        $('#specificationsTable').on('click', function () {
            var specificationsName = $("#specificationsName");
            console.log(specificationsName.val())
            //执行重载
            table.reload('specificationsListReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        "goodsCode": goodsCode,
                        "specificationsName": specificationsName.val()
                    }
                },
                'data'
            );

        });


        //添加规格
        $("#addSpecifications").on("click", function () {
            layer.open({
                type: 2,
                closeBtn: 0,
                area: ['50%', '70%'],
                title: '添加规格',
                shadeClose: true,
                content: ['/goods/gotoGoodsSpecificationsInsertPage?goodsCode=' + goodsCode],
                btn: ['保存', '关闭'],//只是为了演示
                yes: function () {
                    layer.getChildFrame('body').find('button[lay-submit]').click();

                    //延时执行 避免点击保存数据未插入 刷新页面展示数据
                    setTimeout(function () {
                        //执行重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    }, 600);

                }, btn2: function () {

                    layer.closeAll();

                    setTimeout(function () {
                        //执行重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    }, 600);
                }

            });
        });


        //监听工具栏
        table.on('tool(specificationsList)', function (obj) {
            data = obj.data; //获得当前行数据
            var id = data.id;
            if (obj.event === 'del') {
                layer.confirm('确认删除该数据？', function (index) {
                    deleteGoodsSpecifications(id);
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                if (data == null || JSON.stringify(data) === '{}') {
                    layer.msg("请选择编辑规格");
                    return;
                }
                editGoodsSpecifications(id);
            }

        });


        //编辑规格
        function editGoodsSpecifications(id) {
            layer.open({
                type: 2,
                area: ['50%', '60%'],
                title: '编辑规格',
                shadeClose: true,
                content: ['/goods/goToGoodsSpecificationsUpdatePage?id=' + id],
                btn: ['保存', '关闭'],//只是为了演示
                yes: function (index) {
                    layer.getChildFrame('body', index).find('button[lay-submit]').click();
                    setTimeout(function () {
                        //执行重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    }, 600);
                    return false;
                },
                btn2: function () {
                    layer.closeAll();

                    setTimeout(function () {
                        //执行重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    }, 600);

                }
            });
        }


        //删除规格方法
        function deleteGoodsSpecifications(id) {
            console.log(id);
            var data = {'id': id};
            console.log(data);

            $.ajax({
                url: "/goods/deleteGoodsSpecifications",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (result) {
                console.log(result);
                if (result.code == 0) {
                    parent.layer.msg("操作成功!", {time: 1000}, function () {
                        //表格重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    });
                    return;
                } else {
                    layer.alert(result.msg, function () {
                        //表格重载
                        table.reload('specificationsListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    });
                }
            });

        }


        //图片列表
        table.render({
            elem: '#goodsPictureList',
            title: '商品图片表',
            id: 'goodsPictureListReload',
            height: "auto",
            url: '/goods/getGoodsPictureList', //数据接口
            method: 'GET',
            page: true, //开启分页,
            limit: 10,//初始页数据条数
            limits: [10, 20, 30, 40, 50],//分页显示条数
            where: {
                "goodsCode": goodsCode
            },
            //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可

            cols: [
                [ //表头
                    {type: 'radio', field: 'id', title: 'ID', width: '5%', sort: true},
                    {field: 'pictureName', title: '图片名称', width: '15%'},
                    {
                        field: 'pictureType', title: '图片类型', width: '15%', templet: function (data) {
                            var pictureType = data.pictureType;
                            switch (pictureType) {
                                case "XQT":
                                    return "详情图";
                                    break;
                                case "LBT":
                                    return "轮播图";
                                    break;
                                case "ZST":
                                    return "展示图";
                                    break;
                                default :
                                    return "未知类型";
                            }
                        }
                    },
                    {field: 'sequence', title: '图片顺序', width: '10%'},
                    {fixed: 'right', title: '操作', toolbar: '#pictureOperate', width: '20%'}
                ]
            ]
        });

        $('#goodsPictureTable').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //搜索重载
        var active = {
            reload: function () {
                var pictureName = $("#pictureName");
                //执行重载
                table.reload('goodsPictureListReload', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            "goodsCode": goodsCode,
                            "pictureName": pictureName.val()
                        }
                    },
                    'data'
                )
                ;
            }
        };

        //添加图片
        $("#add").on("click", function () {
            layer.open({
                type: 2,
                closeBtn: 0,
                area: ['90%', '80%'],
                title: '添加图片',
                shadeClose: true,
                content: ['/goods/gotoGoodsPicturePage?goodsCode=' + goodsCode],
                btn: ['保存', '关闭'],//只是为了演示
                yes: function () {
                    //执行重载
                    table.reload('goodsPictureListReload', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            "goodsCode": goodsCode
                        }
                    }, 'data');
                    layer.closeAll();
                }, btn2: function () {

                    layer.closeAll();
                    setTimeout(function () {
                        //执行重载
                        table.reload('goodsPictureListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    }, 600);
                }


            });
        });


        //监听图片工具栏
        table.on('tool(goodsPictureList)', function (obj) {
            data = obj.data; //获得当前行数据
            var id = data.id;
            if (obj.event === 'del') {
                layer.confirm('确认删除该数据？', function (index) {
                    deleteGoodsPicture(id);
                    layer.close(index);
                });
            } else if (obj.event === 'view') {
                if (data == null || JSON.stringify(data) === '{}') {
                    layer.msg("请选择查看图片");
                    return;
                }

                viewGoodsPicture(id)
            }

        });


        function viewGoodsPicture() {

        }

        //删除图片
        function deleteGoodsPicture(id) {
            console.log(id);
            var data = {'id': id};
            $.ajax({
                url: "/goods/deleteGoodsPicture",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (result) {
                console.log(result);
                if (result.code == 0) {
                    parent.layer.msg("操作成功!", {time: 1000}, function () {
                        //表格重载
                        table.reload('goodsPictureListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    });
                    return;
                } else {
                    layer.alert(result.msg, function () {
                        //表格重载
                        table.reload('goodsPictureListReload', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                "goodsCode": goodsCode
                            }
                        }, 'data');
                    });
                }
            });

        }


        //修改保存商品
        form.on('submit(goodsUpdateSubmit)', function (data) {
            var field = data.field;
            field.productCode = goodsCode;
            console.log(field);
            $.ajax({
                url: "/goods/updateGoods",
                type: 'POST',
                cache: false,
                processData: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(field)
            }).done(function (result) {
                console.log(result);
                if (result.code == 0) {
                    parent.layer.msg("操作成功!", {time: 1000}, function () {
                        //重新加载父页面
                        parent.location.reload();
                    });
                    return;
                } else {
                    layer.alert(result.msg, function () {
                        layer.closeAll();//关闭所有弹框
                    });
                }
            });
            return false;
        });


    }
);


function loadSectionTaskFrom() {
    //表单赋值
    layui.form.val("dataFrm", goodsData);
}


