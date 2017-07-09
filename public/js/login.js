define(['jquery', 'cookie'], function ($) {
    $('#btn').click(function () {
        $.ajax({
            type: "post",
            // /api代表http://api.studyit.com /api反向代理
            url: "/api/login",
            //用表单序列化必须添加name属性
            data: $('#loginForm').serialize(),
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    // console.log(data);
                    //应该把data中的用户信息保存到cookie中即可实现页面数据共享
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // /表示根目录 location.href 只能使用get请求，没法使用post请求
                    location.href = "/index/index";
                }
            }
        });
        return false;

    });
});