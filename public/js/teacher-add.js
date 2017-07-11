define(['jquery', 'template', 'util','datepicker','language'], function ($, template, util) {
    /*
      添加或者编辑讲师
    */
    //设置导航菜单选中
    util.setMenu('/teacher/list');
    var tcId = util.qs('tc_id', location.search);
    // console.log(tcId);
    if (tcId) {
        // alert(1);
        //编辑讲师-步骤一：根据id查询要编辑的讲师信息
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {
                tc_id: tcId
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                data.result.tc_operate = '编辑讲师';
                var html = template('teacherTpl', data.result);
                $('#teacherInfo').html(html);
                $('#addBtn').click(function () {
                    // console.log($('#addForm').serialize());
                    $.ajax({
                        type: 'post',
                        url: '/api/teacher/update',
                        data: $('#addForm').serialize(),
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                location.href = '/teacher/list';
                            }
                        }
                    });
                });
            }
        })
    } else {
        //添加讲师
        var html = template('teacherTpl', {
            tc_operate: '添加讲师',
            tc_gender: 0
        });
        $('#teacherInfo').html(html);
    }

    // 绑定表单提交事件
    $('#addBtn').click(function () {
        $.ajax({
            type: 'post',
            url: '/api/teacher/add',
            data: $('#addForm').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    location.href = '/teacher/list';
                }
            }
        });
    });

});