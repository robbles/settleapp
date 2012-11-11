$(document).ready(function () {

	var app = false;

	if(app.user) {
		$('body').append(ich.loginProcess());
	} else {
		$('body').append(ich.fbLogin());		
	}

	// handle facebook login click
	$('#fbLogin').click(function() {

		console.log('fb fired');
		// do the client side FB stuff here

		// client side animation once FB returns 
		$('.login-fb').slideUp('slow', function() {
			window.location.replace('/auth/facebook');
			$('.login-name').slideDown();
		});
	});

	//
	$('#nameGroup').click(function() {
		
		// client side animation for naming your first team		
		$('.login-name').slideUp('slow', function() {
			$('.login-invite').slideDown();
		});

	});

});

/// if(app.user) --> display name nameGroup
/// else --> send to FB login