function checkEmail(email) {
    if (email) {
        $('.g-tip').hide();
    }else{
        $('.g-tip').text('Please enter a valid email address').show();
        return false;
    }
    let emailReg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    if (!emailReg.test(email)) {
        $('.g-tip').text('Mailbox format error').show();
        $('#email').addClass('red');
        return false;
    }else{
        $('.g-tip').hide();
        $('#email').removeClass('red');
        return true;
    }
}

function sendResetCode(email) {
    let index = layer.load(2);
    //ajax请求edit_pass_send_email   参数email发送重置密码验证码
    $.ajax({
        type: "post",
        url: "/User/edit_pass_send_email",
        dataType: 'json',
        data:{email:email,is_ajax:1},
        success: function(data){
            layer.open({
                content: data.msg,
                skin: 'msg',
                time:3000,
                btn:"OK"
            });
            layer.close(index);
        }
    });
    return false;
}

function sendResetRegisterCode(email) {
    let index = layer.load(2);
    //ajax请求edit_pass_send_email   参数email发送重置密码验证码
    $.ajax({
        type: "post",
        url: "/User/do_register_repeat_send_email",
        dataType: 'json',
        data:{email:email,is_ajax:1},
        success: function(data){
            layer.open({
                content: data.msg,
                skin: 'msg',
                time:3000,
                btn:"OK"
            });
            layer.close(index);
        }
    });
    return false;
}

function emailSubscribe() {
    let email = $('#newsletter_email').val();
    let company = $('#newsletter_company').val();
    let last_name = $('#newsletter_last_name').val();
    let first_name = $('#newsletter_first_name').val();
    // if(!checkEmail(email)){
    //     layer.open({
    //         title:'Message',
    //         content: 'Incorrect email format!',
    //         skin: 'msg',
    //         time:3000
    //     });
    //     return false;
    // }
    let index = layer.load(2);
    if (email) {
        $.ajax({
            type: "post",
            url: "/Index/email_subscribe",
            dataType: 'json',
            data:{email:email,company:company,last_name:last_name,first_name:first_name},
            success: function(data){
                layer.open({
                    content: data.message,
                    skin: 'msg',
                    time:3000,
                    btn:"OK"
                });
                layer.close(index);
            }
        })
    }else{
        layer.open({
            content: 'Please enter your email !',
            skin: 'msg',
            time: 3000,
            btn:"OK"
        });
    }
    layer.close(index);
    return false;
}