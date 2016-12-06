$(function(){

	console.log('[*] page loaded');

	// Saves options to chrome.storage
	function saveOptions() {
		console.log('[*] saveOptions called');
		var generatedCSPHeaders = $('#generated-csp').val();
		var cspHeaderStatus = $('input[name=csp]:checked', '#csp-generator').val();

		console.log($('#generated-csp').val());
		CSP.browser.set({ 'generatedCSPHeaders': generatedCSPHeaders }, function(result){
			console.log('[*] generatedCSPHeaders:');
			console.log(result);
		});
		CSP.browser.set({ 'cspHeaderStatus': cspHeaderStatus }, function(result){
			console.log('[*] cspHeaderStatus:');
			console.log(result);
		});

		// Update status to let user know options were saved.
		$('#status').text('Options saved');
		setTimeout(function() {
		  $('#status').text('');
		}, 5000);
	}

	// Restores options state using the preferences
	// stored in chrome.storage.
	function restoreOptions() {
		console.log('[*] restoreOptions called');
		CSP.browser.get('cspHeaderStatus', function(item){
			if (item.cspHeaderStatus) {
				$('#'+item.cspHeaderStatus).prop("checked", true);
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
		CSP.browser.getCurrentHost(function(result){
			var message = { action: "generate", host: result };
			chrome.runtime.sendMessage(message, function(response) {
				console.log('[*] Fly my pretties!');
			});
		});
	}

	function clearGenerated() {
		$('#generated-csp').val('');
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
	});
	$('#generate').click(function(event) {
		event.preventDefault();
		sendGenerate();
	});
	$('#clear').click(function(event) {
		event.preventDefault();
		clearGenerated();
	});
	$( restoreOptions ); 

});