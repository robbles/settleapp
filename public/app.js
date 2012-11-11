var AppRouter = Backbone.Router.extend({
  routes: {
    "":                                             "dashboard",
    "home":                                         "dashboard",
    "settings":                                      "settings",

  },

  // current_view session variable should be the name of the template
  dashboard: function() {
  	console.log('dashboard called');
  },

  profile: function () {

  }
});

Router = new AppRouter();
Backbone.history.start({pushState: false});

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

	var main = ich.main(application_data);

	$('body').append(main);

});


// ajax callback with /expenses
// 


// var user = ich.user(user_data_object)
