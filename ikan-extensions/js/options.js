
$(document).ready(function(){


    restore_options();

    $("#save").on("click",function(){
        save_options();
    });
    $("#t1").on("click",function(){
        test1();
    });
    $("#t2").on("click",function(){
        test2();
    });
    $("#t3").on("click",function(){
        test3();
    });
    $("#login").on("click",function(){
        login();
    });
    $("#youku").on("click",function(){
        getIKA(0);
        window.open("http://www.youku.com");
    });
    $("#tudou").on("click",function(){
        getIKA(0);
        window.open("http://www.tudou.com");
    });
    $("#iqiyi").on("click",function(){
        getIKA(1);
        window.open("http://www.iqiyi.com");
    });
    $("#qq").on("click",function(){
        getIKA(2);
        window.open("http://v.qq.com");
    });
    $("#sohu").on("click",function(){
        getIKA(3);
        window.open("http://tv.sohu.com");
    });
    $("#le").on("click",function(){
        getIKA(4);
        window.open("http://www.le.com");
    });
});
function save_options() {
    var select = document.getElementById("color");
    var color = select.children[select.selectedIndex].value;
    localStorage["favorite_color"] = color;
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}
// Restores select box state to saved value from localStorage.
function restore_options() {

    var favorite = localStorage["favorite_color"];
    if (!favorite) {
        return;
    }
    var select = document.getElementById("color");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == favorite) {
            child.selected = "true";
            break;
        }
    }
}

function test1(){
    // chrome.windows.getAll(false,function(e){
    //     console.log(e.size());
    // });
    // chrome.windows.getLastFocused(function(e){
    //     console.log(e);
    // })
}
function test2(){
    // chrome.tabs.getCurrent(function(e){
    //     console.log(e.title);
    // });
}
function test3(){
    // chrome.cookies.getAllCookieStores(function (e){
    //     console.log(e.size());
    // });
    chrome.windows.getAll(function(windows){
        console.log(windows);
        for(var i in windows){
            if(windows[i].incognito){
                console.log("wid:"+windows[i].id);
            }
        }
    });
}
function login(){

    var json = {};
    json.account = $("#account").val();
    json.password = $("#password").val();

    $.ajax({
        url : "http://115.28.176.74:8080/ikan/user/login",
        type:"post",
        data:json,
        success:function(result){
            if(result.success){
                chrome.browserAction.setIcon({path:"image/icon3.png"});
                chrome.storage.local.set({'act': result.accessToken});
                // localStorage.act = result.accessToken;
            }else{
                alert(result.message);
            }
        }
    });

}


function getIKA(type){
    var act = "";
    chrome.storage.local.get("act", function(e) {
        act = e.act;
        $.ajax({
            url : "http://115.28.176.74:8080/ikan/user/getIkanAccount",
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
                }else{
                    alert(result.message);
                }
            }
        });
    });

}

