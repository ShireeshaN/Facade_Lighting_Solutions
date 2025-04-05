//追加地址参数（参数不存在则追加，参数存在则修改）
/**
 *参数  _name:参数名     _value:参数值
 @ps    此函数默认使用的url模式为普通模式，在使用thinkphp等支持pathinfo url地址模式的框架时，请填写上第三个参数'/'
 @ps2   2014/5/26 增加有子目录的pathinfo地址的支持(制作英文版可以会用到)，第四个参数为子目录，如："/en"
 @例如  js_aup('p','3','/','/en');
 */
function js_aup(_name, _value) {
    var delimter = arguments[2] || '&';
    var subcatalog = arguments[3] || '';
    var just_return = arguments[4] || false;
    var location_search = arguments[5] || location.search;
    var newurl = '';
    if (delimter == '/') { //pathinfo模式
        var query_string = location.pathname.replace(subcatalog, '');
        var arr = query_string.split('/');
        var paremters_obj = {};
        for (var i = 4; i < arr.length; i += 2) {
            paremters_obj[arr[i]] = arr[i + 1];
        }
        if (_value === null) {
            delete(paremters_obj[_name]);
        } else {
            paremters_obj[_name] = _value;
        }
        for (var key in paremters_obj) {
            newurl += key + '/' + paremters_obj[key] + '/';
        }
        newurl = subcatalog + '/' + arr[1] + '/' + arr[2] + '/' + arr[3] + '/' + newurl.substr(0, newurl.length - 1);
    } else { //普通模式
        var paramters = location_search.getQuery();
        if (paramters == false) {
            newurl = '?' + _name + '=' + _value;
        } else {
            if (_value === null) {
                delete(paramters[_name]);
            } else {
                paramters[_name] = _value;
            }
            for (var key in paramters) {
                newurl += key + '=' + paramters[key] + '&';
            }
            newurl = '?' + newurl.substr(0, newurl.length - 1);
        }
    }

    if (newurl == '?') {
        newurl = document.url || location.href;
        newurl = newurl.replace(location.search, '');
    }
    if (just_return) {
        return newurl;
    } else {
        location.href = newurl;
    }
}

//多选的追加地址参数函数  Create By TuJia @2014/10/27
/**
 *参数  _name:参数名     _value:参数值
 */
function js_aup2(_name, _value) {
    var the_value = location.search.getQuery(_name) || '';//获取地址参数
    var value_arr = the_value ? the_value.split(',') : [];//转换成数组
    if (value_arr.find(_value) < 0) { //不存在，追加
        value_arr.push(_value);
        the_value = value_arr.join(',');
    }
    js_aup(_name, the_value);
}


//交换的追加地址参数函数  Create By TuJia @2014/10/27
/**
 *功能  存在则去除，不存在就添加
 *参数  _name:参数名     _value:参数值
 */
function js_aup3(_name, _value, just_return, location_search) {
    var the_value = location.search.getQuery(_name) || '';//获取地址参数
    if (the_value == '') return false;
    if (the_value) _value = null;

    if (just_return) {
        return js_aup(_name, _value, '', '', true, location_search);
    } else {
        js_aup(_name, _value);
    }
}


//取消多选地址参数  Create By TuJia @2014/11/9
/**
 *功能  js_aup2对应的取消函数
 *参数  _name:参数名     _value:参数值
 */
function js_aup4(_name, _value) {
    var the_value = location.search.getQuery(_name) || '';//获取地址参数
    if (the_value == _value) {//只剩下唯一值
        js_aup3(_name, _value);
        return false;
    }
    var value_arr = the_value ? the_value.split(',') : [];//转换成数组
    var _index = value_arr.find(_value);
    if (_index < 0) {//不存在，追加
        value_arr.push(_value);
    } else {
        value_arr.remove(_index);
    }
    the_value = value_arr.join(',');
    js_aup(_name, the_value);
}


//追加多个参数
function js_aup5(param) {
    var newurl = '';
    for (var i = 0, len = param.length; i < len; i++) {
        newurl = js_aup(param[i]['_name'], param[i]['_value'], '&', '', true, newurl);
    }
    location.href = newurl;
}


//删除某个参数再追加
function js_aup6(_name, _value, _cancel, ajax_return) {
    var ajax_return = ajax_return || false
    var location_search = js_aup3(_cancel, '', true);
    js_aup(_name, _value, '', '', ajax_return, location_search);
}


//删除多个参数
function js_aup7() {
    var len = arguments.length;
    var location_search = '';
    for (var i = 0; i < len; i++) {
        if (location.search.getQuery(arguments[i]) == undefined) continue;
        location_search = js_aup3(arguments[i], '', true, location_search);
    }
    location.href = location_search;
}

//获取字符串里的参数
//例如:var id = location.search.getQuery('id');
/**
 *参数  _name:参数名（选填，不填返回所有参数)
 */
String.prototype.getQuery = function () {
    var url = this;
    var offset = url.indexOf('?');
    if (offset == -1) return false;
    offset += 1;
    url = url.substr(offset);
    var arr = url.split('&');
    var args = new Object();
    arr.forEach(function (_this) {
        var arr2 = _this.split('=');
        args[arr2[0]] = UrlDecode(arr2[1]);
    });

    var _name = arguments[0] || null;
    return _name ? args[_name] : args;
}

//js版本 urldecode
function UrlDecode(zipStr) {
    var uzipStr = "";
    for (var i = 0; i < zipStr.length; i++) {
        var chr = zipStr.charAt(i);
        if (chr == "+") {
            uzipStr += " ";
        } else if (chr == "%") {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                i += 8;
            } else {
                uzipStr += AsciiToString(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }

    return uzipStr;
}

function StringToAscii(str) {
    return str.charCodeAt(0).toString(16);
}

function AsciiToString(asccode) {
    return String.fromCharCode(asccode);
}


//添加/取消产品到对比库
function add_compare_products(user_id, goods_id, goods_child_id, obj ,async_type) {
    var async_type = async_type || true
    layer.load(1);
    var result = 1;
    $.ajax({
        url: "/product/add_compare_products.html",
        type: "post",
        dataType: 'json',
        async:async_type,
        data: {goods_id: goods_id, goods_child_id: goods_child_id},
        success: function (res) {
            layer.closeAll();
            if (res.code == 401) {
                //401错误代码,弹出登录窗口
                open_login();
            }
            if (res.code == 200) {
                if (res.data.status == 1) {
                    $(obj).addClass('active');
                    open_compare(user_id)
                } else {
                    $(obj).removeClass('active');
                }
                result = 2;
                update_compare_number(res.data.number);
                for (let i = 0; i < res.data.goods_list.length; i++) {
                    let goods = res.data.goods_list[i];
                    productComparisonAdd(goods.param_info.param_name, goods.goods_child.goods_name);
                }
            }
            layer.msg(res.message);
        }, error: function () {
            layer.closeAll();
            console.log("请求失败,请重试尝试!")
        }
    });
    return result;
}

//修改对比库的数量
function update_compare_number(number) {
    $("#compare_number").html(number);
    $("#av_num").html("(" + number + ")");
}

//打开下面的对比库弹框
function open_compare(user_id) {
    layer.load(1);
    $.ajax({
        url: "/product/get_compare_products",
        type: "post",
        dataType: 'json',
        data: {user_id: user_id},
        success: function (res) {
            layer.closeAll();
            if (res.code == 401) {
                //401错误代码,弹出登录窗口
                layer.msg(res.msg);
                open_login();
            }
            if (res.code == 1) {
                var html = res.data.html;
                $("#compare_list").html(html);
                if (!$("#compare_list .av-a").hasClass('show')) {
                    $("#compare_list .av-a").addClass("show");
                }
                update_compare_number(res.data.compare_number)
            } else {
                layer.msg(res.msg);
            }
        }, error: function () {
            layer.closeAll();
            console.log("请求失败,请重试尝试!")
        }
    });
}

function clear_comparison() {
    layer.load(1);
    $.ajax({
        url: "/product/clear_comparison",
        type: "post",
        dataType: 'json',
        success: function (res) {
            layer.closeAll();
            if (res.code == 401) {
                //401错误代码,弹出登录窗口
                open_login();
            }
            layer.msg(res.message);
            if (res.code == 200) {
                $(".ap-add").removeClass('active');
                $("#compare_list .av-a").removeClass("show");
                $("#compare_list").html('');
            }
        }, error: function () {
            layer.closeAll();
            console.log("请求失败,请重试尝试!")
        }
    });
}

function open_creat_spec_sheet(goods_id,id) {
    $("#spec_goods_id").val(goods_id);
    $("#spec_goods_child_id").val(id);
    $("#ze_spec").addClass("show")
}