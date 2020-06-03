layui.use(['jquery','table','layer', 'form'], function(){

    var table = layui.table;

    var $=layui.jquery;

    var data = {};

    //第一个实例
    table.render({
        elem: '#menuList',
        height: "auto",
        id: 'menuReload',
        url: '/menu/getMenuList', //数据接口
        method: 'GET',
        page: false, //开启分页,
        cols: [
            [ //表头
                {type: 'radio',field: 'id', title: 'ID', width:'5%', sort: true},
                {field: 'menuCode', title: '菜单编码', width:'10%'},
                {field: 'menuName', title: '菜单名称', width:'10%', sort: true},
                {field: 'parentName', title: '上级菜单', width:'10%'},
                {field: 'sort', title: '排序', width: '10%', sort: true},
                {field: 'icon', title: '图标', width: '5%'},
                {field: 'path', title: '路由地址', width: '15%'},
                {field: 'menuLevel', title: '菜单等级', width: '10%', sort: true},
                {field: 'createTime', title: '创建时间', width: '15%', sort: true}
            ]
        ]
    });

    var $ = layui.$, active = {
        reload: function(){
            var menuName = $('#menuName');
            //执行重载
            table.reload('menuReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "menuName":menuName.val()
                }
            }, 'data');
        }
    };

    $('#menuTable').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //监听行工具事件
    table.on('radio(menuList)', function(obj){
        data = obj.data; //获得当前行数据
    });

    $("#add").on("click",function () {
        openAddUser();
    });
    //打开添加页面
    function openAddUser(){
        layer.open({
            type: 2,
            area: ['50%','50%'],
            title: '编辑菜单',
            shadeClose: true,
            content: ['/menu/gotoMenuInsertPage'],
            btn: ['保存', '关闭'],//只是为了演示
            yes: function (index, addOpen) {
                layer.getChildFrame('body', index).find('button[lay-submit]').click()
                return false;
            },
            btn2: function(){
                layer.closeAll();
            }
        });
    }

    $("#edit").on("click",function () {
        if(data == null || JSON.stringify(data) === '{}'){
            layer.msg("请选择编辑菜单");
            return;
        }
        var id = data.id;
        editOpen(id);
    });

    function editOpen(id){
        layer.open({
            type: 2,
            area: ['50%','50%'],
            title: '编辑菜单',
            shadeClose: true,
            content: ['/menu/gotoMenuUpdatePage?id='+id],
            btn: ['保存', '关闭'],//只是为了演示
            yes: function (index, addOpen) {
                layer.getChildFrame('body', index).find('button[lay-submit]').click()
                return false;
            },
            btn2: function(){
                layer.closeAll();
            }
        });
    }

});




