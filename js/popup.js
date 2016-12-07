$(function(){

	var defaultCSPHeader = "default-src 'none'; script-src 'none'; connect-src 'none'; font-src 'none'; img-src 'none'; style-src 'none'; frame-src 'none'; report-uri https://csp.4armed.io/report;";

	// Enable/disable interception
	function setCSPHeaders() {
		var cspHeaderStatus = $('input[name=csp]:checked', '#csp-generator').val();

		CSP.browser.set({ 'cspHeaderStatus': cspHeaderStatus }, function(result){

		});

		// Tell the background.js the current CSP status
		sendCSPStatus(cspHeaderStatus);
	}

	// Saves options to chrome.storage
	function saveOptions() {
		console.log('[*] saveOptions called');
		var generatedCSPHeaders = $('#generated-csp').val();
		var cspHeaderStatus = $('input[name=csp]:checked', '#csp-generator').val();

		CSP.browser.set({ 'generatedCSPHeaders': generatedCSPHeaders }, function(result){

		});
		CSP.browser.set({ 'cspHeaderStatus': cspHeaderStatus }, function(result){

		});

		// Update status to let user know options were saved.
		CSP.util.updateStatus('Options saved');
	}

	// Restores options state using the preferences
	// stored in chrome.storage.
	function restoreOptions() {
		CSP.browser.get('cspHeaderStatus', function(item){
			if (item.cspHeaderStatus) {
				$('#'+item.cspHeaderStatus).prop("checked", true);
				if (item.cspHeaderStatus == 'csp-off') {
				    CSP.browser.setIcon('off');
				} else {
					CSP.browser.setIcon('on');
				}
			}
		});

		CSP.browser.get('generatedCSPHeaders', function(item){
			if (item.generatedCSPHeaders) {
				$('#generated-csp').val(item.generatedCSPHeaders);
			} else {
				$('#generated-csp').val(defaultCSPHeader);
			}
		});

		$('#save').prop('disabled', true).addClass('btn-disabled');
	}

	function sendGenerate() {
		console.log('[*] sendGenerate');
		CSP.browser.getCurrentHost(function(result){
			var message = { action: "generate", host: result };
			chrome.runtime.sendMessage(message, function(response) {
				console.log('[*] Fly my pretties!');
			});
		});
	}

	function sendCSPStatus(status) {
		console.log('[*] sendCSPStatus');
		CSP.browser.get('generatedCSPHeaders', function(item){
			chrome.runtime.sendMessage({ action: status, csp: item.generatedCSPHeaders }, function(response) {
				console.log('[*] Unleash the Kraken!');
			});
		});
	}

	chrome.runtime.onMessage.addListener(function(request, sender){
		if (request.policy) {
			$('#generated-csp').val(request.policy);
		}
	})

	// Event Listeners
	$('#save').click(function(event) {
		event.preventDefault();
		saveOptions();
		setCSPHeaders();
		$('#save').prop('disabled', true).addClass('btn-disabled');
	});
	$('#generate').click(function(event) {
		event.preventDefault();
		sendGenerate();
		$('#save').prop('disabled', false).removeClass('btn-disabled');
	});
	$('#generated-csp').on('change keyup paste', function() {
		$('#save').prop('disabled', false).removeClass('btn-disabled');
	});
	$('#reset').click(function(event) {
		event.preventDefault();
		$('#generated-csp').val(defaultCSPHeader);
		$('#save').prop('disabled', false).removeClass('btn-disabled');
		CSP.util.updateStatus('CSP Reset. Remember to save.');
	});
	$('input[name=csp]').change(function(event) {
		event.preventDefault();
		setCSPHeaders();
	});
	$( restoreOptions ); 

});