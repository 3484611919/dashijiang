$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnUpload').on('click', function() {
        $('#file').click()
    })
    $('#file').on('change', function(e) { //监听文件的改变
            // console.log(e.delegateTarget.files);
            var fileList = e.delegateTarget.files
            if (fileList.length === 0) {
                return layer.msg('请上传图片！')
            }
            //拿到用户选择文件
            var file = e.delegateTarget.files[0]
                //把文件转换为路径
            var imgURL = URL.createObjectURL(file)
                // console.log(imgURL);
                // 初始化裁剪区域
            $image
            // 销毁旧的裁剪区域
                .cropper('destroy')
                // 重新设置图片路径
                .attr('src', imgURL)
                // 重新初始化裁剪区域
                .cropper(options)
        })
        // 点击确定按钮
    $('#btnQ').on('click', function() {
        // 拿到用户裁剪后的头像
        var dataUrl = $image
            .cropper('getCroppedCanvas', {
                // 创建一个画布
                width: 100,
                height: 100
            })
            .toDataURL('/image/png') //把画布的内容转换为
            // base64格式的字符串
            // 调用接口，把头像上传服务器
        $.ajax({
            method: 'PATCH',
            url: '/my/update/avatar',
            data: {
                avatar: dataUrl
            },
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('上传头像失败！')
                }
                layer.msg('头像更换成功')
                window.parent.getUserInfo()
            }
        })
    })

})