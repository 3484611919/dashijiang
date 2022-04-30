$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3008' + option.url;
    // console.log(option.url);
    if (option.url.indexOf('/my/') !== -1) { //注意这个命令的用法
        option.headers = {
            Authorization: localStorage.getItem('token') || '' //把之前存的token拿出来
        }
    }
})