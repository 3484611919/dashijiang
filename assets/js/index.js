$(function() {


    // console.log(localStorage.getItem('token') || '');

    getUserInfo(); //获取用户的信息
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' },
            function(index) {
                localStorage.removeItem('token'); //退出去以后自动清空token
                location.href = '/login.html'; //跳转
                layer.close(index);

            })

    })

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '' //后台权限需要
        // },
        // 简化到API里面去
        success: function(res) {
            console.log(res);
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败');
                console.log('请求失败');

            }
            console.log(res.message);

            // 渲染用户头像
            renderAvatar(res.data);

        },
        complete: function(res) {
            // console.log('执行了complete回调');无论失败还是成功都会回调这个函数
            if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') { //保证不能通过修改域名进入后台
                localStorage.removeItem('token');
                location = '/login.html';
                layer.msg('傻卵，你想干嘛');
            }

            console.log(res);

        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    var plc = user.user_pic;
    // console.log(plc);
    if (plc !== null) {
        //图片头像
        $('.layui-nav-img').attr('src', user.user_plc).show();
        $('.text-avatar').hide();
    } else if (plc == null) {
        //文本头像
        $('.layui-nav-img').hide();
        //取出第一个字母或者数字，中文
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }

}