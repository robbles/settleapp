$(document).ready(function () {

	// // G+
	//   (function() {
	//     var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	//     po.src = 'https://apis.google.com/js/plusone.js';
	//     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	//   })();	


	// // TWITTER
	// !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");


	// // FB
	// (function(d, s, id) {
	//   var js, fjs = d.getElementsByTagName(s)[0];
	//   if (d.getElementById(id)) return;
	//   js = d.createElement(s); js.id = id;
	//   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=200536266748566";
	//   fjs.parentNode.insertBefore(js, fjs);
	// }(document, 'script', 'facebook-jssdk'));


	$('body').append(ich.fbLogin());		

	// handle facebook login click
	$('#fbLogin').click(function() {
		// client side animation once FB returns 
		$('.login-fb').slideUp('slow', function() {
			window.location.replace('/auth/facebook');
		});
	});

});
