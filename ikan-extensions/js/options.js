
var baseUrl = "http://115.28.176.74:8080/ikan/";
// var baseUrl = "http://172.16.76.19:8080/";

$(document).ready(function(){

    checkLoginStatus();

    $("#login").on("click",function(){
        login();
    });
    $("#logout").on("click",function(){
        logout();
    });

    $("#youku").on("click",function(){
        getIKA(0,"http://www.youku.com");
    });
    $("#tudou").on("click",function(){
        getIKA(0,"http://www.tudou.com");
    });
    $("#iqiyi").on("click",function(){
        getIKA(1,"http://www.iqiyi.com");
    });
    $("#qq").on("click",function(){
        getIKA(2,"http://v.qq.com");
    });
    $("#sohu").on("click",function(){
        getIKA(3,"http://tv.sohu.com");
    });
    $("#le").on("click",function(){
        getIKA(4,"http://www.le.com");
    });


    $("#account,#password").on("keydown",function(event) {
        if(event.keyCode==13){
            $("#login").click();
        }
    });


});

function checkLoginStatus(){
    chrome.storage.local.get("act", function(e) {
        var act = e.act;
        if(act){
            chrome.browserAction.setIcon({path:"image/icon3.png"});
            switchLogin(act);
        }
    });
}

function login(){
    var json = {};
    json.account = $("#account").val();
    json.password = $("#password").val();

    $.ajax({
        url : baseUrl + "user/login",
        type:"post",
        data:json,
        success:function(result){
            if(result.success){
                chrome.browserAction.setIcon({path:"image/icon3.png"});
                chrome.storage.local.set({'act': result});
                // localStorage.act = result.accessToken;
                switchLogin(result);

            }else{
                alert(result.message);
            }
        }
    });
}


function logout(){
    chrome.storage.local.get("act", function(e) {
        var act = e.act.accessToken;
        $.ajax({
            url : baseUrl+"user/logout",
            type:"post",
            headers: {accessToken: act },
            success:function(result){
                if(result.success){
                    chrome.browserAction.setIcon({path:"image/icons.png"});
                    chrome.storage.local.set({'act': null});
                    switchLogin(result,true);
                }else{
                    alert(result.message);
                }
            }
        });
    });

}

function switchLogin(obj,t){
    if(t){
        $(".step1").show();
        $(".step2").hide();
    }else{
        $("#name").html(obj.name);
        $(".step1").hide();
        $(".step2").show();
    }
}

function getIKA(type,url){
    var act = "";
    chrome.storage.local.get("act", function(e) {
        act = e.act.accessToken;
        $.ajax({
            url : baseUrl+"user/getIkanAccount",
            type:"post",
            data:{"website":type},
            headers: {accessToken: act },
            success:function(result){
                if(result.success){
                    chrome.browserAction.setIcon({path:"image/icon2.png"});
                    chrome.storage.local.set({'ikan': JSON.stringify(result)});
                    chrome.tabs.query({url:["*://*.youku.com/*","*://*.le.com/*","*://*.qq.com/*","*://*.sohu.com/*","*://*.tudou.com/*","*://*.iqiyi.com/*"]}, function(tabs){
                        chrome.tabs.sendMessage(tabs[0].id,result, function(response) {});
                    });
                    window.open(url);
                }else{
                    alert(result.message);
                    chrome.browserAction.setIcon({path:"image/icons.png"});
                    chrome.storage.local.set({'act': null});
                    switchLogin(result,true);
                }
            }
        });
    });

}

