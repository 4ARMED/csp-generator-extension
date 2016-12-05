$(function(){
  "use strict";

	// Saves options to chrome.storage
	function saveOptions() {
		console.log('[*] saveOptions called');
		var generatedCSPHeaders = $('#generated-csp').val();
		var cspHeaderStatus = $('input[name=csp]:checked', '#csp-generator').val();
		var cspReportHeaderStatus = $('input[name=csp-report]:checked', '#csp-generator').val();

		console.log($('#generated-csp').val());
		CSP.browser.set({ 'generatedCSPHeaders': generatedCSPHeaders }, function(result){
			console.log('[*] generatedCSPHeaders:');
			console.log(result);
		});
		CSP.browser.set({ 'cspHeaderStatus': cspHeaderStatus }, function(result){
			console.log('[*] cspHeaderStatus:');
			console.log(result);
		});
		CSP.browser.set({ 'cspReportHeaderStatus': cspReportHeaderStatus }, function(result){
			console.log('[*] cspReportHeaderStatus:');
			console.log(result);
		});

		// Update status to let user know options were saved.
		$('#status').text('Options saved');
		// setTimeout(function() {
		//   $('#status').text('');
		// }, 5000);
	}

	// Restores options state using the preferences
	// stored in chrome.storage.
	function restoreOptions() {
		console.log('[*] restoreOptions called');
		CSP.browser.get('cspHeaderStatus', function(item){
			if (item.cspHeaderStatus === "true") {
				$('#csp-on').prop("checked", true);
				$('#csp-off').prop("checked", false);
				// CSP.util.setActive('on');
			} else {
				$('#csp-on').prop("checked", false);
				$('#csp-off').prop("checked", true);
				// CSP.util.setActive('off');
			}
		});
		CSP.browser.get('cspReportHeaderStatus', function(item){
			if (item.cspReportHeaderStatus === "true") {
				$('#csp-report-on').prop("checked", true);
				$('#csp-report-off').prop("checked", false);
				// CSP.util.setActive('on');
			} else {
				$('#csp-report-on').prop("checked", false);
				$('#csp-report-off').prop("checked", true);
				// CSP.util.setActive('off');
			}
		});
		CSP.browser.get('generatedCSPHeaders', function(item){
			if (item.generatedCSPHeaders) {
				$('#generated-csp').val(item.generatedCSPHeaders);
			} else {
				$('#generated-csp').val('No CSP header generated yet');
			}
		});
	}

	function sendGenerate() {
		console.log('[*] sendGenerate');
		var targetHost;
		CSP.browser.getCurrentHost(function(result){
			sleep(1000).then(() => { targetHost = result; });
		});

		chrome.runtime.sendMessage({action: "generate"}, function(response) {
			console.log('[*] sendMessage');
			var cspText = response;
			// updatePopupGeneratedCSP();
		});
	}

	// function clearGenerated() {
	// 	document.getElementById('generated-csp').value = '';
	// }

	function sleep (time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
	}

	// Event Listeners
	$('#save').click(saveOptions);
	$('#generate').click(sendGenerate);
	// $('#clear').click(clearGenerated);
	$( document ).ready(restoreOptions);

}());