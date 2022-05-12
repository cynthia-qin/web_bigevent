$(function () {
    let form = layui.form;
    form.verify({
        nickname: val => {
            if (val.length > 2) {
                return '昵称的长度必须在1~6个字符之间'
            }
        }
    });

    //获取用户的信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: res => {
                // console.log(res);
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
                //调用form.val()方法
                form.val("formUserInfo", res.data);
            }
        })
    }
    initUserInfo();

    //重置表单数据
    $("#btnReset").on("click", function (e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });
    $(".layui-form").on("submit", function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起请求
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layui.layer.msg('更新用户信息失败');
                layui.layer.msg('更新用户信息成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})