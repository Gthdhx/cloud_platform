layui.use(['jquery','table','layer', 'form'], function(){

    var table = layui.table;

    var $=layui.jquery;


    //第一个实例
    table.render({
        elem: '#userList',
        title: '用户数据表',
        id: 'userReload',
        height: "auto",
        url: '/user/getUserList', //数据接口
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
                {field: 'userCode', title: '编码', width:'15%'},
                {field: 'userName', title: '用户名称', width:'15%', sort: true},
                {field: 'userType', title: '用户类型', width:'10%', sort: true},
                {field: 'email', title: '邮箱', width:'20%', sort: true},
                {field: 'phone', title: '手机号', width:'10%'},
                {field: 'sex', title: '性别', width: '5%'},
                {field: 'status', title: '状态', width: '5%'},
                // {field: 'createTime', title: '创建时间', width: '15%', sort: true},
                {fixed: 'right', title:'操作', toolbar: '#barDemo', width:'20%'}
            ]
        ]
    });

    var $ = layui.$, active = {
        reload: function(){

            var userName = $('#userName');

            //执行重载
            table.reload('userReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "userName":userName.val()
                }
            }, 'data');
        }
    };

    $('#userTable').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    //监听行工具事件
    table.on('tool(userList)', function(obj){
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
        }else if(obj.event == 'authorize'){
            if(data == null || JSON.stringify(data) === '{}'){
                layer.msg("请选择编辑菜单");
                return;
            }
            var id = data.id;
            authorizeOpen(id);
        }
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
            content: ['/user/gotoUserInsertPage'],
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
            area: ['50%','50%'],
            title: '编辑菜单',
            shadeClose: true,
            content: ['/user/gotoUserUpdatePage?id='+id],
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

    function authorizeOpen(id) {
        layer.open({
            type: 2,
            area: ['30%','80%'],
            title: '角色授权',
            shadeClose: true,
            content: ['/user/gotoUserAuthorizePage?id='+id],
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




