chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        "url": "http://www.youku.com",
        "incognito": true
    });
    chrome.tabs.query({url:"chrome-extension://"+chrome.runtime.id+"/options.html"}, function(tabs){
        if(tabs.length==0){
            window.open("options.html");
        }else{
            chrome.tabs.reload(tabs[0].id, null, function(){
                chrome.tabs.update(tabs[0].id, {selected: true});
            });
        }
    });

});