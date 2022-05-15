$(function () {
    let layer = layui.layer
    const initArtCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取文章列表失败');
                console.log(res);
                console.log(res.data);
                let htmlStr = template("tpl-cate", res);
                $("tbody").html(htmlStr);
            }
        })
    };
    initArtCate();
    let indexAdd = null;
    $("#btnAdd").on("click", () => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html(),
        });
    });
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg("新增文章失败");
                initArtCate();
                layer.close(indexAdd);
            }
        })
    });
    //给修改按钮绑定点击事件通过事件委托
    let indexEdit = null;
    let form = layui.form;
    $("tbody").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-edit").html(),
        });
        let id = $(this).attr("data-Id");
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: res => {
                console.log(res);
                form.val("form-edit", res.data);

            }
        })
    });

    //给修改文章弹出层添加提交事件，通过事件委托
    $(document).on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg("更新文章失败");
                layer.msg("更新文章成功");
                layer.close(indexEdit);
                initArtCate();
            }
        })
    });
    //给删除按钮添加点击事件，通过事件委托
    $("tbody").on("click", ".btn-delete", function (e) {
        e.preventDefault();
        let id = $(this).attr("data-id");
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg("删除分类失败");
                    layer.msg("删除分类成功");
                    layer.close(index);
                    initArtCate();
                }
           })
        });
    })
})