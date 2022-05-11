$.ajaxPrefilter(options => {
    //设置统一根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //给所有需要权限访问的接口设置同一headers配置项
    if (options.url.indexOf('/my/') !== -1) {
         options.headers = {
             Authorization: localStorage.getItem("token") || ''
         }
    }
    //设置全局同一挂载complete 函数
    options.complete = function (res) {
        //无论失败还是成功都一定会调用的回调函数
            if (res.responseJSON.status !== 0 && res.responseJSON.message !== '获取用户基本信息成功') {
                //强制清空给token
                localStorage.removeItem("token");
                //强制前往登录页面
                location.href = "/login.html";
            }
   }
})