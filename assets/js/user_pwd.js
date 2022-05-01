$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,不能有空格'],
        newpwd: function() {
            //获取原密码
            var pwd = $('.layui-form [name=old_pwd]').val();
            var newpwd = $('.layui-form [name=new_pwd]').val();
            if (newpwd === pwd) {
                return '两次密码不能一样'
            }
            // console.log('一致');
        },
        repwd: function() {
            var newpwd1 = $('.layui-form [name=new_pwd]').val();
            var repwd1 = $('.layui-form [name=re_pwd]').val();
            if (repwd1 !== newpwd1) {
                return '确认密码必须要和新密码一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        var data = {
            oldPwd: $('.layui-form [name=old_pwd]').val(),
            newPwd: $('.layui-form [name=new_pwd]').val(),
            rePwd: $('.layui-form [name=re_pwd]').val()
        }
        console.log(data);

        $.ajax({
            url: '/my/updatepwd',
            method: 'PATCH',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.code == 0) {
                    //更新密码成功
                    layer.msg(res.message);
                    //成功以后重置表单
                    $('.layui-form')[0].reset();
                } else if (res.code == 1) {
                    //原密码错误
                    return layer.msg(res.message);
                }
                // console.log(res.message);
            }
        })
    })
})