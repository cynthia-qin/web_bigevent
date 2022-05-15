$(function () {
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
   //定义一个查询参数对象
    let q = {
        pagenum: 1, //文章的页码值，默认显示第一页
        pagesize: 2,//每页默认显示的文章数量，默认显示两条文章数据
        cate_id: '', //文章分类的id默认为空
        state:'', //文章的状态，默认为空
    }
    const initTable = () => {
        $.ajax({
            method: 'GET',
            url:'/my/article/list',
            data: q,
            success: res => {
                if (res.status !== 0) return layer.msg("获取文章列表失败");
                let htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
                renderPage(res.total)
            }
        })
    };
    initTable();
    //过滤器
    template.defaults.imports.dateFormate = (date) => {
        const dt = new Date(date);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        let d = dt.getDate();
        let h = dt.getHours();
        let mm = dt.getMinutes();
        let ss = dt.getSeconds();
        let arr = [y, m, d, h, mm, ss].map((val) => {
            return val < 10 ? '0' + val : val;
        })
        return arr.slice(0, 3).join('-') + ' ' + arr.slice(3).join(":");
    };
    //获取文章分类
    const initCate = () => {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg("获取分类失败");
                console.log(res);
                let htmlStr = template("tpl-cate", res);
                console.log(htmlStr);
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    };
    initCate();

    //根据筛选结果渲染文章列表
    $("#form-search").on("submit", (e) => {
        e.preventDefault();
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    });
    const renderPage = (total) => {
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: (obj, first) => {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) initTable();
            }
        });
    };

    //监听删除按钮点击事件，使用事件委托
    $("tbody").on("click", ".btn-delete", function () {
        let id = $(this).attr("data-id");
        let len = $(".btn-delete").length;
        layer.confirm('确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg("删除文章失败");
                    layer.msg("删除文章成功");
                    if (len === 1) {
                     q.pagenum = q.pagenum =1 ? q.pagenum : q.pagenum--;
                    }
                    initTable();

                }
            })

            layer.close(index);
        });
    })

})

