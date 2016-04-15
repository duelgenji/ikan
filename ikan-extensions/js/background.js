chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({url:"chrome-extension://"+chrome.runtime.id+"/options.html"}, function(tabs){
        if(tabs.length==0){
            chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
                if (isAllowedAccess){
                    chrome.windows.create({
                        "url": "chrome-extension://"+chrome.runtime.id+"/options.html",
                        "incognito": true
                    });
                    return; // Great, we've got access
                }else{
                    // alert for a quick demonstration, please create your own user-friendly UI
                    alert('请在即将打开的页面,勾选ikan插件的\"在隐身模式下启用\"');

                    chrome.tabs.create({
                        url: 'chrome://extensions/?id=' + chrome.runtime.id
                    });
                }
            });
        }else{
            chrome.tabs.reload(tabs[0].id, null, function(){
                chrome.tabs.update(tabs[0].id, {selected: true});
            });
        }
    });
});

chrome.tabs.onUpdated.addListener(function(tabId){
    chrome.tabs.get(tabId, function(tab){
        var u = tab.url;
        if((u.match("youku") || u.match("tudou") || u.match("iqiyi") || u.match("qq") || u.match("le") || u.match("sohu"))&& tab.incognito){
            chrome.storage.local.set({'ikanincognito': true});
        }else{
            chrome.storage.local.set({'ikanincognito': false});
        }
    })
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var u = tab.url;
        if((u.match("youku") || u.match("tudou") || u.match("iqiyi") || u.match("qq") || u.match("le") || u.match("sohu"))&& tab.incognito){
            chrome.storage.local.set({'ikanincognito': true});
        }else{
            chrome.storage.local.set({'ikanincognito': false});
        }
    })
});

chrome.windows.onFocusChanged.addListener(function(windowId){
    chrome.windows.get(windowId, null, function(window){
        if(window.incognito){
            chrome.storage.local.set({'ikanincognito': true});
        }else{
            chrome.storage.local.set({'ikanincognito': false});
        }
    });
});


chrome.bookmarks.getTree(function(results){

    console.log(results);


});