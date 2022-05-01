$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({ //定义规则
        nickname: [/^[\S]{1,6}$/, '昵称必须1-6位,不能有空格'],
        emails: [/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, '邮箱格式不正确']
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || '' //后台权限需要
            // },
            // 简化到API里面去
            success: function(res) {
                if (res.code !== 0) {
                    return layui.layer.msg('获取用户信息失败');
                    console.log('请求失败');
                }
                // console.log(res);
                //注意这个命令 这里快速渲染了表单的值
                form.val('formUserInfo', res.data)
                    // console.log($('.layui-form [name=id]').val());可以提取出来id值

            }
        })
    }
    $('#btnReset').on('click', function() {
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        var datas = {
            id: $('.layui-form [name=id]').val(),
            username: $('.layui-form [name=username]').val(),
            nickname: $('.layui-form [name=nickname]').val(),
            email: $('.layui-form [name=email]').val()
        }
        console.log(datas);


        // 发起ajax请求 获取输入框里面的所有值
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: {
                id: $('.layui-form [name=id]').val(),
                username: $('.layui-form [name=username]').val(),
                nickname: $('.layui-form [name=nickname]').val(),
                email: $('.layui-form [name=email]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    layer.msg('修改信息失败');

                }
                layer.msg(res.message);
                window.parent.getUserInfo()

            }
        })
    })


})