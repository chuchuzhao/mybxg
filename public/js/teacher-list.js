define(['jquery','template','bootstrap'],function($,template){
    /*
    讲师管理
    */
    //调用接口，获取数据，渲染界面
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            // console.log(data);
            var html=template('teacherTpl',{list:data.result});
            console.log(html);
            $('#teacherInfo').html(html);
        }
    })
});