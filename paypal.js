function runPayPal(payer, email, memo, currencyCode, callback) {
var request = require('request');
body = JSON.stringify(
  {actionType: "PAY",
  senderEmail: payer,
  receiverList: { receiver: email},
  currencyCode: currencyCode,
  feesPayer: "SENDER",// Or EACHRECEIVER
  memo: memo,
  cancelUrl: "http://cancelurl",
  returnUrl: "http://returnUrl",
  ipnNotificationUrl: "http://rewardsden.com/test/paypal.php",
  requestEnvelope: {
    errorLanguage: "en_US" }
  })

 request.post({
        headers: {
			//"X-PAYPAL-SECURITY-USERID": "paypal_api1.rewardsden.com", 
			//"X-PAYPAL-SECURITY-PASSWORD": "BZF3JETJ4228EFGE", 
			//"X-PAYPAL-SECURITY-SIGNATURE": "ALw9p6j8ZfQycKnxhh7GRvg.osqHAUCih8LTvjpcRMD89u46EsOIp4lb", 
			//"X-PAYPAL-REQUEST-DATA-FORMAT": "JSON", 
			//"X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON", 
			//"X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T", 
			//"Content-Type": "application/json"
			"X-PAYPAL-SECURITY-USERID": "this_1352606875_biz_api1.rewardsden.com", 
			"X-PAYPAL-SECURITY-PASSWORD": "1352606937", 
			"X-PAYPAL-SECURITY-SIGNATURE": "AblB1JL7WJ.6Wg4IloHwlQL4mF5eA9.xmrCZSpqJ2wJSGF0q-ogs2HBV", 
			"X-PAYPAL-REQUEST-DATA-FORMAT": "JSON", 
			"X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON", 
			"X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T", 
			"Content-Type": "application/json"
        },
        url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay',
         body: body
         }, function(error, response, body){
          	callback(body);
    	});
    	
} // Close runPayPal

// Setup temp info
var email 		 = [];
var payer 		 = "josh_1352593612_per@rewardsden.com";
var memo 		 = "We can put a quick note here that the payer will see";
var currancyCode = "USD";
email.push({email: 'tyrone_1352591447_per@rewardsden.com', amount: '1.00'});
email.push({email: 'anothe_1352593405_per@rewardsden.com', amount: '4.00'});

// Get the payKey and Status from paypal
/*
runPayPal(payer, email, memo, currancyCode, function(callback) {
	// This runs once the call back comes back from the function... 
	var json			= callback;
	var obj 			= JSON.parse(json);
	var payKey 			= obj.payKey;
	var status 			= obj.paymentExecStatus;
	
	if(status == "CREATED") {
		var payLink = "https://www.sandbox.paypal.com/webscr&cmd=_ap-payment&paykey="+ payKey;
		console.log(payLink);
	} else {
		// there was an error running the function / with paypal
		console.log("Woops! Error with paypal function");
	}
	
});// close the calling of runPayPal
*/

// ############################################
// Below is the code for the IPN
// ############################################

// Will need to get the post var and convert to json
// don't think we'll need to wrap it in a function.. we can detect the url 

// Might need to rework this once we get the actual post object
var fromPayPal = [{
    "action_type": "PAY",
    "ipn_notification_url": "http: //rewardsden.com/test/paypal.php",
    "charset": "windows-1252",
    "transaction_type": "AdaptivePaymentPAY",
    "notify_version": "UNVERSIONED",
    "cancel_url": "http: //cancelurl",
    "verify_sign": "AFcWxV21C7fd0v3bYYYRCpSSRl31A8sy6wfLbhn3zRmQqx17rRdwDLGD",
    "sender_email": "josh_1352593612_per@rewardsden.com",
    "fees_payer": "SENDER",
    "return_url": "http: //returnUrl",
    "memo": "We can put a quick note here that the payer will see",
    "pay_key": "AP-8K3185867S1681226",
    "status": "COMPLETED",
    "test_ipn": 1,
    "payment_request_date": "SatNov1022: 06: 12PST2012"
}];
var obj = JSON.stringify(fromPayPal);


if(obj.status == "COMPLETED") {
// Look up user/transaction via the payKey
// Update transaction recrod to paid and log the pay_key number
	
}













