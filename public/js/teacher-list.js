define(['jquery', 'template', 'bootstrap'], function ($, template) {
    /*
    讲师管理
    */
    //调用接口，获取数据，渲染界面
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var html = template('teacherTpl', {
                list: data.result
            });
            // console.log(html);
            $('#teacherInfo').html(html);
            //实现讲师启用和注销
            $('#teacherInfo').find('.switch-btn').click(function(){
                var td = $(this).closest('td'); //获取相邻父元素
                var tcId = td.attr('data-tcId');
                var tcStatus=td.attr('data-tcStatus');
                var that=this;
                $.ajax({
                    type:"post",
                    url:"/api/teacher/handle",
                    data:{tc_id:tcId,tc_status:tcStatus},
                    success:function(data){
                        // console.log(data);
                        td.attr('data-tcStatus',data.result.tc_status);
                        if(data.result.tc_status==0){
                            $(that).text('注销');
                        }else {
                            $(that).text('启用');
                        }

                    }
                });
            });
            //实现讲师信息预览
            $('#teacherInfo').find('.preview').click(function () {
                var td = $(this).closest('td'); //获取相邻父元素
                var tcId = td.attr('data-tcId');
                //获取详细信息
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {
                        tc_id: tcId
                    },
                    dataType: 'json',
                    success: function (data) {
                        var html = template('modalTpl', data.result);
                        // console.log(html);
                        $('#modalInfo').html(html);
                        $('#teacherModal').modal();
                    }

                });
            })
        }
    });
});