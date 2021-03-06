define(['jquery', 'template', 'util', 'datepicker', 'language', 'validate','form'], function ($, template, util) {
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
                // $('#addBtn').click(function () {
                // console.log($('#addForm').serialize());
                // $.ajax({
                //     type: 'post',
                //     url: '/api/teacher/update',
                //     data: $('#addForm').serialize(),
                //     dataType: 'json',
                //     success: function (data) {
                //         if (data.code == 200) {
                //             location.href = '/teacher/list';
                //         }
                //     }
                // });
                //  });
                submitForm('/api/teacher/update');
            }
        });
    } else {
        //添加讲师
        var html = template('teacherTpl', {
            tc_operate: '添加讲师',
            tc_gender: 0
        });
        $('#teacherInfo').html(html);

        submitForm('/api/teacher/add');

    }

    // 实现表单提交
    // function submitForm(url) {
    //     $('#addForm').validate({
    //         sendFrom: false,
    //         valid: function () {
    //             $('#addForm').ajaxSubmit({
    //                 type: 'post',
    //                 url: url,
    //                 dataType: 'json',
    //                 // data : $('#addForm').serialize(),
    //                 success: function (data) {
    //                     //console.log(data);
    //                     if (data.code == 200) {
    //                         location.href = '/teacher/list';
    //                     }
    //                 }
    //             });
    //         },
    //         description:{
    //             tc_name:{
    //                 required:'用户名不能为空'
    //             },
    //             tc_pass:{
    //                 required:'密码不能为空',
    //                 pattern:'密码只能是6位数字'
    //             },
    //             tc_join_date:{
    //                 required:'入职日期必须选择'
    //             }
    //         }

    //     });
    // };


    function submitForm(url){
    $('#addForm').validate({
      sendForm : false,
      valid : function(){
        // 提交表单
        // submitForm('/api/teacher/add');
        $('#addForm').ajaxSubmit({
          type : 'post',
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.href = '/teacher/list';
            }
          }
        });
      },
      description : {
        tc_name : {
          required : '用户名不能为空'
        },
        tc_pass : {
          required : '密码不能为空',
          pattern : '密码只能是6位数字'
        },
        tc_join_date : {
          required : '入职日期必须选择'
        }
      }
    });
  }


});