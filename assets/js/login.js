$(function () {
    //点击去注册账号的链接
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //传入的参数value是密码确认框的值
            //pwd是密码输入框的值
            let pwd = $(".reg-box [name='password']").val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })
    //监听表单注册事件
    $("#form-reg").on("submit", (e) => {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $("#form-reg [name=username]").val(),
            password: $("#form-reg [name=password]").val(),
        },
            res => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录!');
                $("#link_login").click();
        }
        )
    })

    //监听表单登录事件
    $("#form-login").submit(function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: '/api/login',
            data,
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("登录成功");
                console.log(res.token);
                localStorage.setItem("token", res.token);
                location.href ="/index.html";
            }
        })
    })
})