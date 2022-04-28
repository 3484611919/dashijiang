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
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        var datas = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()

        }
        $.post('/api/reguser', datas, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录!')
        })
    })
    $('#form-login').submit(function(e) {
        e.preventDefault();
        // console.log($(this).serialize());

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })

    })
})