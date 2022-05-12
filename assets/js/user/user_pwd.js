$(function () {
    let form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value === $(" [name=oldPwd]").val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            //传入的参数value是密码确认框的值
            if (value !== $(" [name=newPwd]").val()) {
                return '两次密码不一致';
            }
        }
    });
    //监听表单
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serialize() );
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg("更新密码失败");
                layui.layer.msg("更新密码成功");
                $(".layui-form")[0].reset();
            }
        })
    })
})