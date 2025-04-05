$(document).ready(function() {
    function lazy() {
        var w = $(window)
        $("[data-src]").each(function () {
            var a = $(this)
            if (!a.attr("done") && (w.scrollTop() + w.height()*1.5 > a.offset().top)) {
                a.attr("done","done")
                var src = a.attr("data-src")
                console.log(a[0].nodeName)
                if(a[0].nodeName =='IMG'){
                    a.attr("src", src)
                }else{
                    console.log(123)
                    a.css("backgroundImage","url("+src+")")
                }
            }
        })
    }
    $(window).scroll(lazy)
    lazy()

    if($(window).width()<=1200){
        $(".swiper-no-swiping").removeClass("swiper-no-swiping")
    }

    $(window).scroll(function(e){
        var hh = $(window).height()
        var a = $(this).scrollTop()
        $(".teaser,.lter,.rter").each(function(){
            var b = $(this).offset().top
            if(b-a<hh*0.99 && b-a>-hh){
                var el = $(this)
                el.addClass("is-visible")
                setTimeout(function(){
                    el.removeClass("is-visible teaser lter rter").addClass("after") //如果原先有transition属性，为防冲突去掉这些类
                },2000)
            }else{
                // $(this).removeClass("is-visible")
            }
        })
    })
    $(window).on("load",function(){
        $(window).trigger("scroll")
    })
    
    $('input, textarea').placeholder();
    var hd = $("header")
    $(window).scroll(function(){
        if($(this).scrollTop()>0){
            hd.addClass("red")
        }else{
            hd.removeClass("red")
        }
    })
    $(".h-menu").click(function(){
        hd.addClass("show-menu")
    })
    $(".h-opa").click(function(){
        hd.removeClass("show-menu show-search")
    })
    hd.on("mouseenter",function(){
        $(this).addClass("red")
    })
    hd.on("mouseleave",function(){
        if($(window).scrollTop()==0){
            $(this).removeClass("red")
        }
    })
    $(".h-sub").each(function(){
        var li = $(this).parents(".h-li")
        li.addClass("has-sub")
        var x = li.find(".h-a").offset().left
        $(this).css("left",x)
        if($(this).find(".h-th").length){
            $(this).addClass("has-th")
        }else{
            $(this).addClass("no-th")
        }
    })
    $(".has-sub").mouseenter(function(e){
        if($(window).width()>1200){
            var x = $(this).find(".h-a").offset().left
            $(this).find(".h-sub").css("left",x)
            $(this).find(".h-box").stop().slideDown(300,function(){
                var ha = $(this).find(".h-sub-a")
                if(ha.length){
                    ha.eq(0).trigger("mouseenter")
                }
            })
        }
    })
    $(".has-sub").mouseleave(function(){
        if($(window).width()>1200){
            $(this).find(".h-box").stop().slideUp(300)
        }
    })
    $(".has-sub").click(function(e){
        if($(window).width()<=1200){
            e.preventDefault();
            if($(this).hasClass("show")){
                $(this).removeClass("show")
                $(this).find(".h-box").slideUp(300)
            }else{
                $(this).addClass("show")
                $(this).find(".h-box").slideDown(300)
            }
        }
    })
    $(".h-box").click(function(e){
        e.stopPropagation()
    })
    $(".h-sub-a").on("mouseenter",function(e){
        
        e.stopPropagation()
        if($(window).width()>1200){
            var sub = $(this).parents(".h-box")
            sub.css("height",'auto')
            var li = $(this).parents(".h-sub-li")
            li.addClass("active").siblings().removeClass("active")
            var th = li.find(".h-th")
            if(th.length){
                var h = th.outerHeight()
                var h0 = sub.outerHeight()
                if(h>h0){
                    sub.css("height",h)
                }
            }
        }
    })
    $(".h-a,.h-sub-a").click(function(e){
        e.stopPropagation()
    })
    $(".h-th").parents(".h-sub-li").addClass("has-thd")
    $(".has-thd").click(function(e){
        if($(window).width()<=1200){
            e.preventDefault();
            if($(this).hasClass("show")){
                $(this).removeClass("show")
                $(this).find(".h-th").slideUp(300)
            }else{
                $(this).addClass("show")
                $(this).find(".h-th").slideDown(300)
            }
        }
    })

    // $(".h-search").click(function(){
    //     $("header").addClass("show-search")
    //     setTimeout(function(){
    //         $(".h-text").focus();
    //     },300)
    // })

    var t1 = 0;
    var t2 = 0;
    var timer = null;
    document.onscroll = function() {
        $(".rs-a").addClass("opa")
        clearTimeout(timer);
        timer = setTimeout(isScrollEnd, 500);
        t1 = document.documentElement.scrollTop || document.body.scrollTop;
    }
    function isScrollEnd() {
        t2 = document.documentElement.scrollTop || document.body.scrollTop;
        if(t2 == t1){
            $(".rs-a").removeClass("opa")
        }
    }
    //展开导航
    $("#backTop").click(function(){
        if($(window).width()>800){
            $("html,body").animate({
                scrollTop:0
            },500,function(){});
        }else{
            var rsa = $(".rs-a")
            if(rsa.hasClass("show")){
                rsa.removeClass("show")
            }else{
                rsa.addClass("show")
            }
        }
    })
    $(".f-sa").on("mouseenter",function(){
        changeC($(this).children("img")[0],"#cc0606")
    })
    $(".f-sa").on("mouseleave",function(){
        changeC($(this).children("img")[0],"#ffffff")
    })

    $("video").attr("controlsList","nodownload")

    //点击打开视频
    $("[v-src]").click(function(e){
        e.stopPropagation()
        $(".v-a").addClass("show")
        var src = $(this).attr("v-src")
        if(src.indexOf(".mp4")!=-1){
            $("#v2").attr("src",src)
            $("#v2").css("display","block")
            $("#v1").css("display","none")
            $("#v2")[0].play()
        }else{
            $("#v1").attr("src",src)
            $("#v1").css("display","block")
            $("#v2").css("display","none")
        }
    })
    //关闭视频
    $(".v-c,body").click(function(){
        if($("#v2").length){
            $(".v-a").removeClass("show")
            $("#v2")[0].pause()
            $("#v1").attr("src","")
            //  $("#v2").attr("src","") 这句不要加，加了在uc浏览器会关闭不了视频
        }
    })
    $(".v-a").click(function(e){
        e.stopPropagation()
    })

    //自定义滚动条
    $(window).load(function(){
        if($(".diy").mCustomScrollbar){
            $(".diy").mCustomScrollbar({
                autoDraggerLength: true
            })
        }
        if($(".az-f").mCustomScrollbar){
            $(".az-f").mCustomScrollbar({
                autoDraggerLength: true
            })
        }
    })

    //鼠标超过10秒没操作就弹出底部的弹窗
    var today = new Date().toLocaleDateString()
    var lastday = localStorage.getItem("today")
    var fpcd = 10
    var sss = setInterval(function(){
        fpcd--
        if(fpcd==0){
            if(today != lastday){
                $("#fpOuter").addClass("show")
                localStorage.setItem("today",today)
                clearInterval(sss)
            }
        }
    },1000)
    $("body").on("mouseover",function(){
        fpcd=10
    })
    $(window).on("scroll",function(){
        fpcd=10
    })

    //文字既可以选中又可以点击跳链接
    var mouseDown = false
    var hasMove = false
    $(".u-list").on("mousedown",".u-text2",function(){
        mouseDown = true
    })
    $(".u-list").on("mousemove",".u-text2",function(){
        if(mouseDown){
            hasMove = true
        }
    })
    $(".u-list").on("click",".u-text2",function(e){
        if(hasMove){
            e.preventDefault()
        }else{
            $(this).siblings("a")[0].click()
        }
        mouseDown = false
        hasMove = false
    })

    $(".p-text2,.y-text").on("mousedown",function(){
        mouseDown = true
    })
    $(".p-text2,.y-text").on("mousemove",function(){
        if(mouseDown){
            hasMove = true
        }
    })
    $(".p-text2,.y-text").on("click",function(e){
        if(hasMove){
            e.preventDefault()
        }else{
            $(this).siblings("a")[0].click()
        }
        mouseDown = false
        hasMove = false
    })

    $(".f-item .f-tit").click(function(e){
        if($(window).width()<=500){
            e.preventDefault()
            var item = $(this).parents(".f-item")
            if(item.hasClass("show")){
                item.removeClass("show")
                $(this).siblings(".f-ul").slideUp(300)
            }else{
                item.addClass("show")
                $(this).siblings(".f-ul").slideDown(300)
            }
        }
    })

    $("#goTop").click(function(){
        $("html,body").animate({
            scrollTop:0
        },500,function(){});
    })

    setWmArrow()
    function setWmArrow(){
        if($(window).width()<=500 && $(".wm-item").length>1){
            $(".wm-arrow").removeClass("hide")
        }else if($(".wm-item").length<=3){
            $(".wm-arrow").addClass("hide")
        }
    }
    $(window).resize(setWmArrow)
    

})
//改变图标颜色
function changeC(img,color){
    if($(window).width()<=1100){
        return
    }
    if(img.complete){
        startC(img,color)
    }else{
        img.onload = function(){
            startC(img,color)
        }
    }
}
function startC(img,color){
    var c=document.createElement("canvas")
    c.width = img.width
    c.height = img.height
    var ctx=c.getContext("2d")
    ctx.drawImage(img,0,0,img.width,img.height)
    var imgD = ctx.getImageData(0,0,img.width,img.height)
    var dt = imgD.data
    var n = dt.length
    for(var i=0;i<n;i+=4){
        dt[i]=parseInt(color.slice(1,3),16)
        dt[i+1]=parseInt(color.slice(3,5),16)
        dt[i+2]=parseInt(color.slice(5,7),16)
    }
    ctx.putImageData(imgD,0,0)
    img.src=c.toDataURL("image/png")
    img.onload = function(){}
}