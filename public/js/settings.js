define(['jquery', 'template', 'util', 'uploadify','region'], function ($, template, util) {
    util.setMenu('/index/index');
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            var html = template('settingsTpl', data.result);
            $("#settingsInfo").html(html);
            //处理文件上传
            $('#upfile').uploadify({
                width: 120,
                height: 120,
                buttonText: '',
                fileObjName: 'tc_avatar',
                swf: '/public/assets/uploads/uploadify.swf',
                uploader: '/api/uploader/avatar',
                onUploadSuccess: function (a, b, c) {
                    //修改图片地址
                    console.log(b);
                    $('#settingsInfo img').attr('src', b.result.path);
                }
            });
            //处理省市区三级联动
            $('#region').region({
                url:'/public/assets/jquery-region/region.json'
            });
        }
    });
});