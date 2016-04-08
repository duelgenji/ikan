console.log("chrome-extension://"+chrome.runtime.id+"/options.html");
chrome.tabs.query({url:"chrome-extension://"+chrome.runtime.id+"/options.html"}, function(tabs){
    if(tabs.length==0){
        window.open("options.html");
    }else{
        chrome.tabs.reload(tabs[0].id, null, function(){
        });
    }
});
