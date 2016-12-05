$(function(){


  var isActive = false;

  var callback = function(details) {
    if (!isActive) {
        return;
    }

    for (var i = 0; i < details.responseHeaders.length; i++) {
      if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase() || 'content-security-policy-report-only' === details.responseHeaders[i].name.toLowerCase()) {
        details.responseHeaders[i].value = '';
      }
    }

    // Add the CSP header we want
    details.responseHeaders.push({ "name": "Content-Security-Policy-Report-Only", "value":"default-src 'none'; script-src 'none'; connect-src 'none'; font-src 'none'; img-src 'none'; style-src 'none'; frame-src 'none'; report-uri https://csp.4armed.io/report;" });

    return {
      responseHeaders: details.responseHeaders
    };
  };

  var filter = {
    urls: ["*://*/*"],
    types: ["main_frame", "sub_frame"]
  };

  chrome.webRequest.onHeadersReceived.addListener(callback, filter, ["blocking", "responseHeaders"]);

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);
      if (request.action == "generate") {
        console.log('[*] fetching policy for ' + request.host);
      }
  }
}());