var AppRouter = Backbone.Router.extend({
  routes: {
    "":                                              "dashboard",
    "home":                                         "dashboard",
    "settings":                                      "settings"
  },

  // current_view session variable should be the name of the template
  dashboard: function() {
  	console.log('dashboard called');

  },

  settings: function () {
	// fetch the settings data  	
  	settings_data = { 
  		email: "andreimpop@gmail.com"
  	}

  	$('#contentBlock').fadeOut();
	var settings = ich.settings(settings_data);
	$('body').append(settings);

 	}
});

Router = new AppRouter();
Backbone.history.start();

$(document).ready(function () {

  	application_data = {
		applicationName: "xpense",
		username: "Andrei Pop",
		email: "andreimpop@gmail.com",
		avatarURL: "http://bizzthemes.com/wp-content/uploads/2011/04/facebookAvatar_w_50.png",
		groups: [
			{
			_id: "12343242",
			name: "Roommates",
			owed: 70,
			members: []
			},
			{
			_id: "1daflkdjj",
			name: "Lab Group",
			owed: 10.25,
			members: []
			}
		],
		amountOwing: 80.25
	};
  	var main = ich.main(application_data);
	$('body').append(main);


	expenses = 
	[
	{
		title: "hookers & blow",
		total: "$500",
		contributors: [{name:"andrei pop", paid:false}, {name:"joe", paid:true}, {name:"fred", paid:false}]
	}, 
	{
		title: "rent",
		total: "$1200",
		contributors: [{name:"andrei pop", paid:true}, {name:"joe", paid:true}, {name:"fred", paid:false}]
	}
	];

});