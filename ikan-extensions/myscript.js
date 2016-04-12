var ikan_account = "";
var ikan_pwd = "";
var incognito = false;



chrome.storage.local.get("ikanincognito", function(e) {
    incognito = e.ikanincognito;
    if(incognito){
        chrome.storage.local.get("ikan", function(e) {
            var ikan = eval("("+ e.ikan +")");
            ikan_account = ikan.account;
            ikan_pwd = ikan.password;
            writeAccpwd();
        });

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            var ikan = request;
            ikan_account = ikan.account;
            ikan_pwd = ikan.password;
            writeAccpwd();
        });
    }
});


function writeAccpwd(){

    var hostname = location.hostname;

    //pc端 节点
    if(hostname.match("youku")){
        //youku
        $("#passport").val(ikan_account);
        $("#password").val(ikan_pwd);
        $(document).on("focus",".form_input form_input_l",function(){
            $("#passport").val(ikan_account);
            $("#password").val(ikan_pwd);
        })
    }else if(hostname.match("iqiyi")){
        //iqiyi
        $("input[data-loginbox-elem='emailInput']").val(ikan_account);
        $("input[data-loginbox-elem='passwdInput']").val(ikan_pwd);
        $(document).on("focus",".in-txt",function(){
            $("input[data-loginbox-elem='emailInput']").val(ikan_account);
            $("input[data-loginbox-elem='passwdInput']").val(ikan_pwd);
        })

    }else if(hostname.match("tudou")){
        //tudou
        $("#loginname").val(ikan_account);
        $("#password1").val(ikan_pwd);
        $(document).on("focus",".loginname,.password",function(){
            $("#loginname").val(ikan_account);
            $("#password1").val(ikan_pwd);
        })

    }else if(hostname.match("qq")){
        //qq
        $("#u").val(ikan_account);
        $("#p").val(ikan_pwd);
        $(document).on("focus",".inputstyle",function(){
            $("#u").val(ikan_account);
            $("#p").val(ikan_pwd);
        })

    }else if(hostname.match("sohu")){
        //sohu
        $("input[name='email']").val(ikan_account);
        $("input[name='password']").val(ikan_pwd);
        $(document).on("focus",".input-holder",function(){
            $("input[name='email']").val(ikan_account);
            $("input[name='password']").val(ikan_pwd);
        })
    }else if(hostname.match("le")){
        //letv
        $("#loginname").val(ikan_account);
        $("#password1").val(ikan_pwd);
        $(document).on("focus",".login-input",function(){
            $("#loginname").val(ikan_account);
            $("#password").val(ikan_pwd);
        })
    }

}