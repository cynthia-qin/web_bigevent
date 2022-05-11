$(function () {
    getUserInfo();
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空本地存储的身份验证信息
            localStorage.removeItem("token");
            //返回登录页面
            location.href = "/login.html";
            layer.close(index);
        });
    })
 })

//获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: res => {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg("获取用户信息失败");
            renderAvatar(res.data);
        },
       
    })
}
//渲染用户头像
function renderAvatar(user) {
    let uname = user.nickname || user.username;
    let first = uname[0].toUpperCase();
    $("#welcome").html('欢迎&nbsp;&nbsp' + uname);
    if (user.user_pic != null) {
        $(".text-avatar").hide();
        $(".layui-nav-img").prop("src", user.user_pic).show();
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").html(first).show();
    }
}