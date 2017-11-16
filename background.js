function doStuffWithDOM(domContent) {
    console.log("I received the following DOM content:\n" + domContent);
}
chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM);
});

