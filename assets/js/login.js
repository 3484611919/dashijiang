$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,不能有空格'],
        repwd: function() {
            var pwd = $('.reg-box [name=password]').val();
            var repwd = $('.reg-box [name=repassword]').val();
            if (repwd !== pwd) {
                return '两次密码不一致!'
            }
            // console.log('一致');


        }
    })
    $('#form-reg').on('submit', function(e) { //注册
        e.preventDefault();
        var datas = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
            repassword: $('#form-reg [name=repassword]').val()

        }
        $.post('/api/reg', datas, function(res) {
            if (res.code !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录!')
            console.log(res.message);
            $('#link-login').click();


        })
    })
    $('#form-login').submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize()); //也可以这么提交 也可以按照下面的方法提交

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: $('#form-login [name=username]').val(),
                password: $('#form-login [name=password]').val()

            },
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('登录失败!,')
                }
                console.log(res);

                layer.msg('登录成功!');
                localStorage.setItem('token', res.token) //获取token值
                location.href = '/index.html' //登录成功后跳转到后台主页
            }
        })

    })
})