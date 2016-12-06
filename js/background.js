var isActive = false;
var cspHeaders;

var callback = function(details) {
  if (!isActive) {
      return;
  }

  for (var i = 0; i < details.responseHeaders.length; i++) {
    if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase() || 'content-security-policy-report-only' === details.responseHeaders[i].name.toLowerCase()) {
      details.responseHeaders[i].value = '';
    }
  }

  console.log('[*] Adding CSP headers:');
  console.log(cspHeaders);

  // Add the CSP header we want
  details.responseHeaders.push(cspHeaders);

  return {
    responseHeaders: details.responseHeaders
  };
};

var filter = {
  urls: ["*://*/*"],
  types: ["main_frame", "sub_frame"]
};

chrome.webRequest.onHeadersReceived.addListener(callback, filter, ["blocking", "responseHeaders"]);

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "generate") {
    console.log('[*] fetching policy for ' + request.host);
    $.get('https://csp.4armed.io/policy/' + request.host, function(data){
      console.log(data);
      chrome.runtime.sendMessage(data);
    })
  } else if (request.action == "csp-on") {
    console.log('[*] enabling Content-Security-Policy');
    isActive = true;
    cspHeaders = { name: "Content-Security-Policy", value: request.csp };
    CSP.browser.setIcon('on');
  } else if (request.action == "csp-report-on") {
    console.log('[*] enabling Content-Security-Policy-Report-Only');
    isActive = true;
    cspHeaders = { "name": "Content-Security-Policy-Report-Only", "value": request.csp };
    CSP.browser.setIcon('on');
  } else if (request.action == "csp-off") {
    console.log('[*] disabling CSP');
    isActive = false;
    CSP.browser.setIcon('off');
  }
});