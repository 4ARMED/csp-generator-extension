var CSP = CSP || {};

CSP.browser = {
  getCurrentHost: function(callback) {
    chrome.tabs.query({active:true},function(tabs){
        var pageUrl = CSP.util.parseURL(tabs[0].url);
        callback(pageUrl);
    });
  },
  set: function(obj, callback) {
  	chrome.storage.sync.set(obj, function(result){
  		callback(result);
  	});
  },
  get: function(key, callback) {
  	chrome.storage.sync.get(key, function(item){
  		callback(item);
  	});
  },
  setIcon: function(state) {
    var details = {
        path: "images/popup-" + state + ".png"
    };
    chrome.browserAction.setIcon(details);
  }
}


CSP.util = {
  parseURL: function(url) {
  	console.log('[*] parseURL: ');
  	console.log(url);
    var hack = document.createElement('a');
    hack.href = url;
    return encodeURIComponent(hack.host);
  },
  updateStatus: function(text) {
    $('#status').text(text).addClass('alert alert-success');
    setTimeout(function() {
      $('#status').text('').removeClass('alert alert-success');
    }, 3000);
  }
}