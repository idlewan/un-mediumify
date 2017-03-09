function mediumDetector(response) {
    var is_medium = false;
    var csp_header_idx = -1;

    var headers = response.responseHeaders;
    var len = headers.length
    for (var i = 0; i < len; i++) {
        if (headers[i].name == "x-powered-by" && headers[i].value == "Medium") {
            is_medium = true;
        }
        if (headers[i].name == "Content-Security-Policy") {
            csp_header_idx = i;
        }
    }
    if (is_medium) {
        var new_csp = {name: "Content-Security-Policy", value: "script-src 'none';"};
        if (csp_header_idx < 0) {
            headers.push(new_csp);
        } else {
            headers[csp_header_idx] = new_csp;
        }
        var tab_id = response.tabId;
        browser.pageAction.show(tab_id);
    }
    return {responseHeaders: headers};
}

browser.webRequest.onHeadersReceived.addListener(
    mediumDetector,
    {urls: ["<all_urls>"],
     types:["main_frame", "sub_frame"]},
    ["blocking", "responseHeaders"]
);

browser.pageAction.onClicked.addListener(function () {
    browser.tabs.executeScript({file: "/medium_fixer.js"});
});
