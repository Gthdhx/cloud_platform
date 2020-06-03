layui.use(['jquery','table','layer', 'form'], function(){

    var table = layui.table;

    var $=layui.jquery;


    //第一个实例
    table.render({
        elem: '#roleList',
        title: '用户数据表',
        id: 'roleReload',
        height: "auto",
        url: '/role/getRoleList', //数据接口
        method: 'GET',
        toolbar: '#toolbar',
    //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        defaultToolbar: ['filter', 'exports', 'print', {
                            title: '提示',
                            layEvent: 'LAYTABLE_TIPS',
                            icon: 'layui-icon-tips'
                            }],
        page: true, //开启分页,
        cols: [
            [ //表头
                {type: 'radio',field: 'id', title: 'ID', width:'5%', sort: true},
                {field: 'roleCode', title: '编码', width:'15%'},
                {field: 'roleName', title: '角色名称', width:'15%', sort: true},
                {field: 'roleType', title: '类型', width:'10%', sort: true},
                {field: 'status', title: '状态', width: '5%'},
                {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                {fixed: 'right', title:'操作', toolbar: '#barDemo', width:'15%'}
            ]
        ]
    });

    var $ = layui.$, active = {
        reload: function(){

            var roleName = $('#roleName');

            //执行重载
            table.reload('roleReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "roleName":roleName.val()
                }
            }, 'data');
        }
    };

    $('#roleTable').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    //监听行工具事件
    table.on('tool(roleList)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            if(data == null || JSON.stringify(data) === '{}'){
                layer.msg("请选择编辑菜单");
                return;
            }
            var id = data.id;
            editOpen(id);
        }
    });

    $("#add").on("click",function () {
        openAddUser();
    });
    //打开添加页面
    function openAddUser(){
        layer.open({
            type: 2,
            area: ['30%','50%'],
            title: '编辑菜单',
            shadeClose: true,
            content: ['/role/gotoRoleInsertPage'],
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

    function editOpen(id){
        layer.open({
            type: 2,
            area: ['35%','80%'],
            title: '编辑菜单',
            shadeClose: true,
            content: ['/role/gotoRoleUpdatePage?id='+id],
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




