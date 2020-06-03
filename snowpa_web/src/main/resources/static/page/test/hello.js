layui.use(['jquery','table','layer', 'form'], function(){

    var table = layui.table;

    var $=layui.jquery;

    var data = {};

    //第一个实例
    table.render({
        elem: '#topicList',
        id: 'topicReload',
        height: "auto",
        url: '/test/topicList', //数据接口
        method: 'GET',
        page: true, //开启分页,
        cols: [
            [ //表头
                {field: 'topicContent', title: '题目', width:'50%', sort: true},
                {field: 'answer', title: '答案', width:'50%'}
            ]
        ]
    });

    var $ = layui.$, active = {
        reload: function(){

            var topicContent = $('#topicContent');

            //执行重载
            table.reload('topicReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    "topicContent":topicContent.val()
                }
            }, 'data');
        }
    };

    $('#topicTable').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('#tTable').on('click', function(){
        $('#topicContent').val("");
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});




