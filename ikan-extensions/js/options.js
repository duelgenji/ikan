
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
    $("#t4").on("click",function(){
        test4();
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
}
function test4(){

    var json = {};
    json.account = $("#account").val();
    json.password = $("#password").val();

    $.ajax({
        url : "http://172.16.76.19:8080/user/iklogin",
        type:"post",
        data:json,
        success:function(result){
            if(result.success){
                chrome.browserAction.setIcon({path:"image/icon2.png"});
                chrome.storage.local.set({'ikan': JSON.stringify(result)});
                chrome.tabs.query({url:["*://*.youku.com/*","*://*.le.com/*","*://*.qq.com/*","*://*.sohu.com/*","*://*.tudou.com/*","*://*.iqiyi.com/*"]}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id,result, function(response) {});
                });
            }else{
                alert("login fail!");
            }
        }
    });

}


