$(function () {
    let form = layui.form;
    let layer = layui.layer;
    const initCate = () => {
        $.ajax({
            method: 'GET',
            url: "/my/article/cates",
            success: res => {
                // console.log(res);
                if(res.status !== 0) return layer.msg("获取分类失败")
                let htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }
    initCate();
    // 初始化富文本编辑器
    initEditor();
     // 1. 初始化图片裁剪器
     var $image = $('#image')

     // 2. 裁剪选项
     var options = {
         aspectRatio: 400 / 280,
         preview: '.img-preview'
     }

     // 3. 初始化裁剪区域
    $image.cropper(options);
    $("#fileChoose").on('click', () => {
        $("#coverFile").click();
    });
    //监听上传框的change事件
    $("#coverFile").on('change', (e) => {
        let files = e.target.files;
        console.log(files);
        if (files.length <= 0) return;
        let newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    let art_state = '已发布';
    $("#btnSave2").on("click", () => {
        art_state = '草稿'
    });

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append("state", art_state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob);
                publisherArticle(fd);
            });
    });
    const publisherArticle = (fd) => {
        console.log(fd);
        $.ajax({
            method: "POST",
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: res => {
                console.log(res);
                if (res.status !== 0) return layer.msg("发布文章失败");
                layer.msg("发布文章成功");
                location.href = "/article/art_list.html";
            }
        })
    };
    
})