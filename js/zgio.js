if (document.documentElement.lang === 'zh') {
    lang_name = '中文版';
} else {
    lang_name = '英文版';
}

(function () {
    if (window.zhuge) return;
    window.zhuge = [];
    window.zhuge.methods = "_init identify track trackRevenue getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(" ");
    window.zhuge.factory = function (b) {
        return function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(b);
            window.zhuge.push(a);
            return window.zhuge;
        }
    };
    for (var i = 0; i < window.zhuge.methods.length; i++) {
        var key = window.zhuge.methods[i];
        window.zhuge[key] = window.zhuge.factory(key);
    }
    window.zhuge.load = function (b, x) {
        if (!document.getElementById("zhuge-js")) {
            var a = document.createElement("script");
            var verDate = new Date();
            var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

            a.type = "text/javascript";
            a.id = "zhuge-js";
            a.async = !0;
            a.src = 'https://zgsdk.zhugeio.com/zhuge.min.js?v=' + verStr;
            a.onerror = function () {
                window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
                    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
                        callback();
                    } else if (Object.prototype.toString.call(props) === '[object Function]') {
                        props();
                    }
                };
            };
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c);
            window.zhuge._init(b, x)
        }
    };
    window.zhuge.load('d830bd2dddd94605b2c1d0d63a9b5d6c', { //配置应用的AppKey
        superProperty: {
            //全局的事件属性(选填)
            '应用名称': '艾罗照明',
            '当前网站版本':lang_name,
        },
        adTrack: false,     //广告监测开关，默认为false
        zgsee: false,      //视屏采集开关，默认为false
        autoTrack: true, //启用全埋点采集（选填，默认false）
        singlePage: false, //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）,
        duration: false, //页面停留时长采集开关，默认为false
        debug: true
    });
})();

//设置cookies
function setZgCookie(name, value, time = "d1") {
    let strSec = getSec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strSec * 1);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

//读取cookies
function getZgCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr) {
        return (arr[2]);
    } else {
        return null;
    }
}

//删除cookies
function delZgCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getZgCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
}

function getSec(str) {
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 === "s") {
        return str1 * 1000;
    } else if (str2 === "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 === "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

$(function () {
    //点击顶部导航栏右边4个固定按钮
    $(".ncn").on('click', function () {
        //参数筛选器/搜索框/登录/语言选择
        let type = $(this).data('etype');
        let button_type, button_name;
        switch (type) {
            case 1:
                button_type = button_name = "参数筛选器";
                break;
            case 2:
                button_type = button_name = "搜索框";
                break;
            case 3:
                button_type = button_name = "登录";
                break;
            case 4:
                button_type = button_name = "个人中心";
                break;
            case 5:
                button_type = button_name = "退出登录";
                break;
            case 6:
                button_type = button_name = "语言选择-英文";
                break;
            case 7:
                button_type = button_name = "语言选择-中文";
                break;
        }
        let data = {button_type: button_type, button_name: button_name, navigation_type: "顶部导航栏"}
        zhuge.track('navigation_click_navigation', data);
    })

    $(".zg-track").on('click', function (e) {
        e.preventDefault();
        let elem = $(this);
        let debug = Number(elem.data('edebug'));
        let url = elem.attr('href');
        if (!url || url === undefined) {
            url = elem.data('eurl');
        }
        let ename = elem.data('ename');
        if (!ename || ename === undefined) {
            if (url !== undefined) {
                window.location.href = url;
            }
            return false;
        }
        let data = {};
        try {
            let ekey = elem.data('ekey').split("||");
            let evalue = elem.data('evalue').split("||");
            ekey.forEach(function (value, index) {
                data[value] = evalue[index];
            });
        } catch (error) {
            data = {};
        }

        zhuge.track(ename, data, function () {
            if (debug === 1) {
                alert(url);
            } else {
                if (url !== undefined) {
                    window.location.href = url;
                }
            }
        });
        return false;
    })

    $("li.h-li a").on("click", function () {
        setZgCookie(pvpp_fpn, "顶部导航栏")
    })

    $("div.f-tt a").on("click", function () {
        setZgCookie(pvpp_fpn, "底部导航栏")
    })

    //播放视频
    $(".ag-play").on("click", function () {
        let video_type = $(this).parents('.ag-b').find('.ag-title').data('title');
        let video_name = $(this).parents('.ag-item').find('.ag-name').data('title');
        videoPlayVideo(video_type, video_name, "视频中心")
    })

    //视频时长
    $(".v-c,body").on('click', function () {
        videoStayDuration();
    })

    //点击下载出现下载弹窗
    $(".au-download").on('click', function () {
        documentDownloadPageSTime = Date.parse(new Date() + "");
    })
    $("body").on('click', '.au-download,.ap-download', function () {
        documentDownloadPageSTime = Date.parse(new Date() + "");
    })
    //关闭下载弹窗
    $(".yc-close").on('click', function () {
        documentDownloadPageStayDuration();
    })
    $("body").on('click', '.yc-close', function () {
        documentDownloadPageStayDuration();
    })
})


/**
 * 获取停留时长(单位:秒)
 * @param s_time 开始时间,默认页码加载完成时间
 * @returns {number}
 */
function getDwellTime(s_time = 0) {
    if (s_time <= 0) {
        s_time = dwell_s;
    }
    let dwell_e = Date.parse(new Date() + "");
    return Number((dwell_e - s_time) / 1000);
}

function zhugeDwellTime(dwell_time) {
    let duration = getDwellTime();
    dwell_time.forEach(function (value, index) {
        zhuge.track(value, {"stay_duration": duration});
    });
    console.log('记录停留时长:', duration);
}

/** 页面停留时长 **/
let dwell_time = [];
let dwell_s = Date.parse(new Date() + "");
window.onbeforeunload = function () {
    zhugeDwellTime(dwell_time);
}

//登录成功
function successfulLogin(email, data) {
    let id_data = {
        "name": data.name,
        "area": data.area,
        "register_time": data.register_time,
        "role_type": data.role_type,
        "is_passer_audit": data.is_passer_audit,
        "is_passed_verification": data.is_passed_verification,
    };
    zhuge.identify(email, id_data);
}

//离开注册
function leaveRegister() {
    let steps_numbers = 0, end_step_name = '', all_steps_name = [];
    let steps_name = ["first_name", "last_name", "email", "user_cat_id", "country", "province", "company", "password", "confirm_pass", "captcha"];
    let steps_name_cn = ["名字", "姓", "电子邮件地址", "类别", "国家", "地区", "公司", "密码", "确认密码", "验证码"];

    let now_form = $('#register_form').serializeArray();
    def_register_form.forEach(function (value, index) {
        let ii = steps_name.indexOf(value.name);
        if (Number(ii) > 0) {
            now_form.forEach(function (v, i) {
                if (value.name === v.name) {
                    if (value.value !== v.value) {
                        steps_numbers++;
                        end_step_name = steps_name_cn[ii];
                        all_steps_name.push(steps_name_cn[ii]);
                    }
                }
            })
        }
    });
    all_steps_name = all_steps_name.join(",")
    let stay_duration = getDwellTime();
    let data = {steps_numbers: steps_numbers, end_step_name: end_step_name, all_steps_name: all_steps_name, stay_duration: stay_duration}
    zhuge.track('register_leave_registerpage', data);
}

//提交注册
function resultRegister(elem_form, is_success, fail_reason) {
    function getName(elem) {
        let n = Number(elem.val());
        let name = "";
        elem.parent().find(".cm-a .cm-b").each(function () {
            if (Number($(this).attr('cid')) === n) {
                name = $(this).data('name');
            }
        });
        if (name === undefined) {
            name = "";
        }
        return name;
    }

    let account = elem_form.find('[name=email]').val();
    let role_type = getName(elem_form.find('[name=user_cat_id]'));
    let country = getName(elem_form.find('[name=country]'));
    let area = getName(elem_form.find('[name=province]'));
    let company = elem_form.find('[name=company]').val();
    is_success = (is_success === 1) ? "是" : "否";
    fail_reason = (is_success === 1) ? "" : fail_reason;
    let stay_duration = getDwellTime();
    //处理类别,国家和地区数据
    let data = {account: account, role_type: role_type, country: country, area: area, company: company, is_success: is_success, fail_reason: fail_reason, stay_duration: stay_duration};
    zhuge.track('register_submit_result', data);
}

//产品对比-查看对比数据
function productComparisonView(display, elem_parameter) {
    let numbers = Number($("#compare_number").html());
    let display_type = ['all', 'diff', 'important'];
    let display_type_name = ['对比全部', '仅显示不同', '仅显示重要参数'];
    display_type_name = display_type_name[display_type.indexOf(display)];
    let parameter_type = elem_parameter.find(".ar-tab.active").data('name');
    let data = {comparison_numbers: numbers, display_type: display_type_name, parameter_type: parameter_type}
    zhuge.track('product_comparison_view_date', data);
}


//添加对比产品来源
let comparison_from_page = 0;

//产品对比-添加对比产品
function productComparisonAdd(product_model, product_name, page = 0) {
    let numbers = Number($("#compare_number").html());
    if (page <= 0) {
        page = comparison_from_page;
    }
    let current_pagename = ['', '我的艾罗', '搜索结果列表', '产品详情页', '产品对比页'];
    let data = {
        comparison_numbers: numbers,
        current_pagename: current_pagename[page],
        product_model: product_model,
        product_name: product_name,
    }
    zhuge.track('product_comparison_add_comparison', data);
}

//添加收藏来源
let favorites_from_page = 0;
let favorites_product_name, favorites_product_code, favorites_product_model;

//产品收藏-添加收藏
function productFavoritesAdd(page = 0, product_name, code, favorites_name = [], product_model = '') {
    let current_pagename = ['', '我的艾罗', '搜索结果列表', '产品详情页'];
    if (page <= 0) {
        page = favorites_from_page;
    }
    if (!product_name) {
        product_name = favorites_product_name;
    }
    if (!code) {
        code = favorites_product_code;
    }
    if (!product_model){
        product_model = favorites_product_model;
    }
    favorites_name.forEach(function (name, i) {
        let data = {
            current_pagename: current_pagename[page],
            product_name: product_name,
            code: code,
            favorites__name: name,
            product_model: product_model
        }
        zhuge.track('favorites_add_product_comparison', data);
    });
}

//搜索-优化搜索结果
function searchRefineResult(cat_id, goods_param, shape) {
    let filter_numbers = 0;
    let filter_details = [];
    if (cat_id > 0) {
        filter_numbers++;
        filter_details.push('分类筛选器')
    }
    if (goods_param) {
        let goods_param_ids = goods_param.split('|')
        filter_numbers += goods_param_ids.length;
        $("#i_form").find('[name=param]').next().find('.cm-b').each(function () {
            let _this = $(this);
            let cid = Number(_this.attr('cid'));
            goods_param_ids.forEach(function (v, i) {
                if (Number(v) === cid) {
                    let name = _this.parents('.select').find("label.i-label").data('name');
                    if (name) {
                        filter_details.push(name + '筛选器')
                    }
                }
            })
        });
    }
    if (shape) {
        filter_numbers++;
        filter_details.push('形状筛选器')
    }
    let result_numbers = $(".refine-search-count").data('number');
    let data = {
        filter_numbers: filter_numbers,
        filter_detials: filter_details.join('、'),
        result_numbers: result_numbers
    }
    zhuge.track('search_refine_search_result', data);
}

//搜索-优化搜索结果
function searchRefineResultDetails(cat_id, goods_param, shape) {
    let filter_numbers = 0;
    let filter_name = [];
    let filter_value = [];
    cat_id = Number(cat_id);
    if (cat_id > 0) {
        filter_numbers++;
        filter_name.push('分类筛选器')
        $("#i_form").find('[name=cat_id]').next().find('.cm-b').each(function () {
            let _this = $(this);
            let cid = Number(_this.attr('cid'));
            if (cid === cat_id) {
                let value = _this.data('name');
                if (value) {
                    filter_value.push(value);
                }
            }
        });
    }
    if (goods_param) {
        let goods_param_ids = goods_param.split('|')
        filter_numbers += goods_param_ids.length;
        $("#i_form").find('[name=param]').next().find('.cm-b').each(function () {
            let _this = $(this);
            let cid = Number(_this.attr('cid'));
            goods_param_ids.forEach(function (v, i) {
                if (Number(v) === cid) {
                    let name = _this.parents('.select').find("label.i-label").data('name');
                    if (name) {
                        filter_name.push(name + '筛选器')
                    }
                    let value = _this.data('name');
                    if (value) {
                        filter_value.push(value);
                    }
                }
            })
        });
    }
    if (shape) {
        filter_numbers++;
        filter_name.push('形状筛选器')
        filter_value.push(shape);
    }
    let result_numbers = $(".refine-search-count").data('number');
    let data = {
        filter_numbers: filter_numbers,
        filter_name: filter_name.join('、'),
        filter_value: filter_value.join('、'),
        result_numbers: result_numbers
    }
    zhuge.track('search_refine_search_result_detials', data);
}

//产品-进入产品搜索页(products/index)
let product_page_type = "", product_page_name = "";
let pvpp_fpn = "productVisitProductPage.fromPageName";

function productVisitProductPage(page_type, page_name) {
    let from_page_name = getZgCookie(pvpp_fpn)
    if (!from_page_name) {
        from_page_name = "";
    }
    let data = {
        page_type: page_type,
        page_name: page_name,
        from_page_name: unescape(from_page_name),
    }
    setZgCookie(pvpp_fpn, '');
    zhuge.track('product_visit_productpage', data);
}


//产品-搜索产品结果
function productSearchResult(search_data, result_numbers = 0) {
    let filter_numbers = 0;
    search_data.forEach(function (v, i) {
        let d_name = v['name'];
        let d_value = v['value'];
        switch (d_name) {
            case "keywords":
                if (d_value) {
                    filter_numbers++;
                }
                break;
            case "is_new":
                filter_numbers++;
                break;
            case "cat_id":
                if (d_value > 0) {
                    filter_numbers++;
                }
                break;
            case "goods_filter[]":
                filter_numbers++;
                break;
        }
    });
    if (result_numbers === 0) {
        result_numbers = $("#goods_list").find(".z-items .z-item").length;
    }
    let data = {
        search_pagename: product_page_name,
        is_use_search_box: $("#goods_filter").find('input[name=keywords]').val() ? "是" : "否",
        search_key_words: $("#goods_filter").find('input[name=keywords]').val(),
        filter_numbers: filter_numbers,
        result_numbers: result_numbers,
    }
    zhuge.track('product_search_result', data);
}

//产品-搜索产品结果详情
function productSearchResultDetails(search_data, result_numbers = 0) {
    function getFilterTitleValue(vv) {
        let title, value;
        let elem_v = $("#goods_filter").find('input[value=' + vv + ']');
        let elem = elem_v.parents('.z-dl.z-type');
        if (elem.find('.z-spbox').length) {
            //数值型
            title = elem.find("dt").data('title');
            value = vv.split("_")[1];
        } else {
            //默认
            title = elem.find('.z-dt').data('title');
            value = elem_v.parent().find(".z-text").data('title');
        }
        return [title, value];
    }

    let filter_name = [];
    let filter_value = [];
    search_data.forEach(function (v, i) {
        let d_name = v['name'];
        let d_value = v['value'];
        switch (d_name) {
            case "keywords":
                if (d_value) {
                    filter_name.push("关键词筛选器");
                    filter_value.push(d_value);
                }
                break;
            case "is_new":
                filter_name.push("新品筛选器");
                d_value = (Number(d_value) === 1) ? "是" : "否"
                filter_value.push(d_value);
                break;
            case "cat_id":
                if (d_value > 0) {
                    filter_name.push("分类筛选器");
                    filter_value.push($("#goods_filter").find('.z-arr .z-el[cid=' + d_value + ']').data('title'));
                }
                break;
            case "goods_filter[]":
                let tmp = getFilterTitleValue(d_value);
                filter_name.push(tmp[0] + "筛选器");
                filter_value.push(tmp[1]);
                break;
        }
    });
    if (result_numbers === 0) {
        result_numbers = $("#goods_list").find(".z-items .z-item").length;
    }
    let data = {
        search_pagename: product_page_name,
        is_use_search_box: $("#goods_filter").find('input[name=keywords]').val() ? "是" : "否",
        search_key_words: $("#goods_filter").find('input[name=keywords]').val(),
        filter_name: filter_name.join('、'),
        filter_value: filter_value.join('、'),
        result_numbers: result_numbers,
    }
    zhuge.track('product_search_result_details', data);
}

//产品-点击查看产品
let product_from_pagename = "";
let pvppd_cp= "productVisitProductPageDetails.current_pagename";

function productClickView(elem, type, current_pagename = '') {
    let product_name, product_id, primary_type, secondary_type, power = '', ip_protection_grade = '';
    elem = $(elem);
    switch (type) {
        case 1:
            //首页的
            current_pagename = "首页";
            product_name = elem.find('.p-c-v').data("name");
            product_id = elem.find('.p-c-v').data("id");
            primary_type = elem.find('.p-c-v').data("primary");
            secondary_type = elem.find('.p-c-v').data("secondary");
            let attr = elem.find('.c-attr').html();
            attr = attr.split(" / ");
            attr.forEach(function (str, i) {
                if (str.indexOf("W") !== -1 || str.indexOf("w") !== -1) {
                    power = str
                } else {
                    ip_protection_grade = str;
                }
            })
            break;
        case 2:
            //产品筛选页
            product_name = elem.find('.p-c-v').data("name");
            product_id = elem.find('.p-c-v').data("id");
            primary_type = elem.find('.p-c-v').data("primary");
            secondary_type = elem.find('.p-c-v').data("secondary");
            elem.find('.z-power').each(function () {
                let str = $(this).find('.z-gray').html();
                if (str.indexOf("W") !== -1 || str.indexOf("w") !== -1) {
                    power = str
                } else {
                    ip_protection_grade = str;
                }
            });
            break;
        case 3:
            //搜索结果列表页
            current_pagename = "搜索结果列表页";
            product_name = elem.find('.p-c-v').data("name");
            product_id = elem.find('.p-c-v').data("id");
            primary_type = elem.find('.p-c-v').data("primary");
            secondary_type = elem.find('.p-c-v').data("secondary");
            elem.find('.k-m').each(function () {
                let str = $(this).find('.k-o').html();
                if (str.indexOf("W") !== -1 || str.indexOf("w") !== -1) {
                    power = str
                } else {
                    ip_protection_grade = str;
                }
            });
            break;
    }
    if (!current_pagename) {
        current_pagename = product_page_name;
    }
    product_from_pagename = current_pagename;
    setZgCookie(pvppd_cp,product_from_pagename,'s60')
    let data = {
        product_name: product_name,
        product_id: product_id,
        primary_type: primary_type,
        secondary_type: secondary_type,
        power: power,
        ip_protection_grade: ip_protection_grade,
        current_pagename: current_pagename,
    }
    zhuge.track('product_click_view', data);
}

//产品-进入产品详情页
function productVisitProductPageDetails() {
    let elem = $(".product-detail");
    let product_name, product_id, primary_type, secondary_type, power = '', ip_protection_grade = '';
    product_name = elem.data("name");
    product_id = elem.data("id");
    primary_type = elem.data("primary");
    secondary_type = elem.data("secondary");
    elem.find('.z-label').each(function () {
        let str = $(this).html();
        if (str.indexOf("W") !== -1 || str.indexOf("w") !== -1) {
            power = str
        } else {
            ip_protection_grade = str;
        }
    });
    product_from_pagename = unescape(getZgCookie(pvppd_cp));
    delZgCookie(pvppd_cp);
    let data = {
        product_name: product_name,
        product_id: product_id,
        primary_type: primary_type,
        secondary_type: secondary_type,
        power: power,
        ip_protection_grade: ip_protection_grade,
        from_pagename: product_from_pagename,
    }
    zhuge.track('product_visit_productpage_detials', data);
}

//产品-产品详情页停留时长
function productDetailPageDuration() {
    let elem = $(".product-detail");
    let product_name, product_id, primary_type, secondary_type;
    product_name = elem.data("name");
    product_id = elem.data("id");
    primary_type = elem.data("primary");
    secondary_type = elem.data("secondary");
    let data = {
        product_name: product_name,
        product_id: product_id,
        primary_type: primary_type,
        secondary_type: secondary_type,
        stay_duration: getDwellTime(),
    }
    zhuge.track('product__detial_page_duration', data);
}

//产品-产品详情页点击联系我们
function productDetailPageClickContactUs() {
    let elem = $(".product-detail");
    let product_name, product_id, primary_type, secondary_type;
    product_name = elem.data("name");
    product_id = elem.data("id");
    primary_type = elem.data("primary");
    secondary_type = elem.data("secondary");
    let data = {
        product_name: product_name,
        product_id: product_id,
        primary_type: primary_type,
        secondary_type: secondary_type,
    }
    zhuge.track('product_detialpage_click_contact_us', data);
}

//产品-产品详情页参数筛选
function productDetailPageSelectParameters(result_numbers) {
    let filter_numbers = 0, filter_name = [];
    $(".ap-cont .ap-col").each(function () {
        let _this = $(this);
        let is_checked = 0;
        _this.find("li.ap-li input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                is_checked = 1;
            }
        });
        if (is_checked) {
            filter_numbers++;
            filter_name.push(_this.find('.ap-name').data('title'));
        }
    })
    let data = {
        filter_numbers: filter_numbers,
        filter_name: filter_name.join('、'),
        result_numbers: Number(result_numbers),
    }
    zhuge.track('product_detialpage_select_parameters', data);
}

//产品-点击相关产品
function productClickRelateProduct(elem, current_pagename, current_page_product_type) {
    elem = $(elem);
    let data = {
        current_pagename: current_pagename,
        current_page_product_type: current_page_product_type,
        relate_product_name: elem.data('title'),
        product_type: elem.data('type'),
    }
    zhuge.track('product_click_relate_product', data);
}

//视频-点击播放视频
function videoPlayVideo(video_type, video_name, current_pagename) {
    let data = {
        video_type: video_type,
        video_name: video_name,
        current_pagename: current_pagename,
    }
    //console.log('点击播放视频',data)
    zhuge.track('video_play_video', data);
    //播放时长参数
    videoStayDurationData = {
        video_type: video_type,
        video_name: video_name,
        stay_duration: Date.parse(new Date() + ""),
        current_pagename: current_pagename,
    }
}

//视频-视频播放时长
let videoStayDurationData = {};

function videoStayDuration() {
    if (videoStayDurationData.stay_duration) {
        videoStayDurationData.stay_duration = getDwellTime(videoStayDurationData.stay_duration);
        //console.log("视频播放时长:", videoStayDurationData);
        zhuge.track('video_stay_duration', videoStayDurationData);
    }
    videoStayDurationData = {};
}

//文档-点击下载目录文档
function documentDownloadDirectoryDocument(document_type, document_name, is_success) {
    let fail_reason = "";
    if (Number(is_success) === 1) {
        is_success = "是";
    } else {
        is_success = "否";
        fail_reason = "请先登录"
    }
    let data = {
        document_type: document_type,
        document_name: document_name,
        is_success: is_success,
        fail_reason: fail_reason,
    }
    zhuge.track('document_download_directory_document', data);
}

//文档-点击下载产品文档
let download_from_page = 0;

function documentDownloadProductDocument(downData, page = 0) {
    let current_pagename = ['', '我的艾罗', '搜索结果列表', '产品详情页'];
    if (page <= 0) {
        page = download_from_page;
    }
    let download_numbers = 0;
    let document_specifications = [];
    let specifications = ['IES', 'CAD', 'II', 'GSS']
    let specifications_name = ['IES', 'CAD', '安装说明书', '通用规格书']
    let attr = downData.document_specifications.split(",");
    if (!downData.down_info){
        return false;
    }
    attr.forEach(function (str, i) {
        let index = specifications.indexOf(str);
        if (index !== -1) {
            document_specifications.push(specifications_name[index])
            download_numbers++;
        }
        let document_name = '';
        downData.down_info.forEach(function (v, i) {
            let index = v['key'].indexOf(str);
            if (index !== -1) {
                document_name = v['name_ext'];
            }
        })
        //文档-点击下载产品文档详情
        let c_data = {
            product_name: downData.product_name,
            document_name: document_name,
            is_success: downData.is_success,
            fail_reason: downData.fail_reason,
            document_specifications: specifications_name[index],
            current_pagename: current_pagename[page],
            document_source: "官网下载",
        }
        zhuge.track('document_download_product_document_detial', c_data);
    })

    let data = {
        product_name: downData.product_name,
        document_name: downData.document_name,
        is_success: downData.is_success,
        fail_reason: downData.fail_reason,
        download_numbers: download_numbers,
        document_specifications: document_specifications.join('，'),
        current_pagename: current_pagename[page],
        document_source: "官网下载",
    }
    zhuge.track('document_download_product_document', data);
}

//文档-文档下载页停留时长
let documentDownloadPageSTime = 0;

function documentDownloadPageStayDuration() {
    let elem = $(".product-detail");
    if (documentDownloadPageSTime > 0) {
        let product_name = "";
        if (elem.length > 0) {
            product_name = elem.data('name');
        }
        let data = {
            product_name: product_name,
            stay_duration: getDwellTime(documentDownloadPageSTime)
        }
        zhuge.track('document_downloadpage_stay_duration', data);
    }
    documentDownloadPageSTime = 0;
}

//项目图库-进入项目图库主页
function projectsVisitProjects(from_page_name = '') {
    let hash = window.location.hash;
    if (!from_page_name) {
        if (hash.indexOf("top") !== -1) {
            from_page_name = "首页顶部导航栏";
        } else if (hash.indexOf("bottom") !== -1) {
            from_page_name = "首页底部导航栏";
        }
    }
    zhuge.track('projects_visit_projects', {from_page_name: from_page_name});
}

//项目图库-使用筛选项
function projectsUseFilter() {
    let filter_key = ['hotel', 'cat', 'app'];
    let filter_value = ['酒店品牌', '产品列表', '应用区域'];
    let filter_name = [];
    $("#waF").find('.wa-one').each(function () {
        let elem = $(this);
        filter_key.forEach(function (v, i) {
            if (elem.attr('class').indexOf(v) !== -1) {
                filter_name.push(filter_value[i]);
            }
        })
    });
    filter_name = Array.from(new Set(filter_name))
    let result_numbers = $("#project_result_count").val();
    let data = {
        filter_name: filter_name.join('，'),
        result_numbers: Number(result_numbers)
    }
    zhuge.track('projects_use_filter', data);
}

//项目图库-进入项目图库主页
function projectsVisitProjectDetail(project_name, from_page_name = '') {
    let hash = window.location.hash;
    if (!from_page_name) {
        if (hash.indexOf("top") !== -1) {
            from_page_name = "顶部导航栏";
        } else if (hash.indexOf("bottom") !== -1) {
            from_page_name = "底部导航栏";
        } else if (hash.indexOf("index") !== -1) {
            from_page_name = "项目图库主页";
        } else {
            from_page_name = unescape(getZgCookie('projects_form_page'));
            setZgCookie('projects_form_page', '', 's1');
            if (from_page_name === project_name) {
                from_page_name = ''
            }
        }
    }
    let data = {
        from_click: from_page_name,
        project_name: project_name
    }
    projects_detail_stay_duration_data = {
        from_click: from_page_name,
        project_name: project_name
    }
    zhuge.track('projects_visit_project_detial', data);
}

//项目图库-项目详情页停留时长
let projects_detail_stay_duration_data = {};

function projectsProjectsDetailStayDuration() {
    let stay_data = projects_detail_stay_duration_data;
    if (stay_data.project_name) {
        let data = {
            from_click: stay_data.from_click,
            project_name: stay_data.project_name,
            stay_duration: getDwellTime()
        }
        zhuge.track('projects_projects_detial_stay_duration', data);
    }
}

//订阅讯息-提交订阅讯息
function subscribeSubmitSubscribe(obj) {
    let type = $(this).parents('.fp-outer').length;
    let _form = $(obj).parents('form');
    let from_page = '';
    if (type) {
        from_page = "底部弹窗";
    } else {
        from_page = "底部导航栏";
    }
    let data = {
        company: _form.find('input[name=company]').val(),
        email: _form.find('input[name=email]').val(),
        from_page: from_page,
    }
    zhuge.track('subscribe_submit_subscribe', data);
}

//服务支持-进入支持页
function servicesVisitServices(page) {
    let page_name = ['技术支持页', '现场服务页'];
    let from_page_name = '';
    let hash = window.location.hash;
    if (!from_page_name) {
        if (hash.indexOf("top") !== -1) {
            from_page_name = "顶部导航栏";
        } else if (hash.indexOf("bottom") !== -1) {
            from_page_name = "底部导航栏";
        }
    }
    let data = {
        page_name: page_name[page],
        from_page_name: from_page_name,
    }
    zhuge.track('services_visit_services', data);
}

//关于艾罗-进入页面
function aboutAeroVisitAboutAero(page) {
    let page_name = ['关于艾罗', '公司历程', '资质证书', '加入艾罗'];
    let from_page_name = '';
    let hash = window.location.hash;
    if (!from_page_name) {
        if (hash.indexOf("top") !== -1) {
            from_page_name = "顶部导航栏";
        } else if (hash.indexOf("bottom") !== -1) {
            from_page_name = "底部导航栏";
        }
    }
    let data = {
        page_name: page_name[page],
        from_page_name: from_page_name,
    }
    zhuge.track('aboutaero_visit_aboutaero', data);
}


//联系我们-提交留资信息
function contactUs(_form, current_pagename = '') {
    if (!current_pagename) {
        current_pagename = $(".zg-current-page").val();
    }
    let data = {
        company: _form.find('input[name=company]').val(),
        project_name: _form.find('input[name=project_name]').val(),
        email: _form.find('input[name=email]').val(),
        current_pagename: current_pagename,
    }
    console.log('联系我们', data)
    zhuge.track('contact_us', data);
}