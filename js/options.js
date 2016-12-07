$(function(){

  function save_options() {
    var cspGeneratorUrl = document.getElementById('csp-generator-url').value;
    var unsafe = document.getElementById('unsafe').checked;
    chrome.storage.sync.set({
      cspGeneratorUrl: cspGeneratorUrl,
      unsafe: unsafe
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 5000);
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
      cspGeneratorUrl: 'https://csp.4armed.io',
      unsafe: false
    }, function(items) {
      document.getElementById('csp-generator-url').value = items.cspGeneratorUrl;
      document.getElementById('unsafe').checked = items.unsafe;
    });
  }

  $('#save').click(function(event) {
      event.preventDefault();
      save_options();
  });
  $( restore_options );

});
