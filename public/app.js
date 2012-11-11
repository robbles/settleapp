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

	// $('#contentBlock').fadeOut();
	// var settings = ich.settings(settings_data);
	// $('body').append(settings);

 	}
});

Router = new AppRouter();
Backbone.history.start();

$(document).ready(function () {


// $('#nameGroup').click(function(){
// 	return false;
// });


/// HANDLE GROUP CREATION

// add friends emails on enter
$('#addFriends').live('keypress', function (e) {
   if ( e.keyCode == 13 ){
    	$('.invitedFriends').append("<li data-email="+$('#addFriends').val()+">"+$('#addFriends').val()+ " " + "<a class='removeFriend'>x</a></li>");
    	$('#addFriends').val("");
    } else {
    	return true;
    }
    return false;
});

$('.removeFriend').live("click", function() {
	$(this).parent().remove();
});

$('#createGroup').live("click", function(){
	var groupName = $("#groupName").val();
	var emails = [];
	$('.invitedFriends li').each(function(){
   		emails.push($(this).data('email'));
	});
    
	var groupInfo = {
		name: groupName,
		invited: emails.join(',')
	}

	// send request to create group to server
	$.ajax({
	  type: 'POST',
	  url: '/groups',
	  data: groupInfo,
	  dataType: 'json',
	  succes: function(data){}
	});

  	var newGroup = ich.singleGroup(groupInfo);
	$('.yourGroups').append(newGroup);
	$('#newGroupModal').modal('hide');
	
	return false;
});


/// HANDLE EXPENSE CREATION









// Insert global App into main body
var main = ich.main(App);
$('body').append(main);

// adjust the modal for mobile devices
var adjustModal = function($modal) {
  var top;
  if ($(window).width() <= 480) {
    if ($modal.hasClass('modal-fullscreen')) {
      if ($modal.height() >= $(window).height()) {
        top = $(window).scrollTop();
      } else {
        top = $(window).scrollTop() + ($(window).height() - $modal.height()) / 2;
      }
    } else if ($modal.height() >= $(window).height() - 10) {
      top = $(window).scrollTop() + 10;
    } else {
      top = $(window).scrollTop() + ($(window).height() - $modal.height()) / 2;
    }
  } else {
    top = '50%';
    if ($modal.hasClass('modal-fullscreen')) {
      $modal.stop().animate({
          marginTop  : -($modal.outerHeight() / 2)
        , marginLeft : -($modal.outerWidth() / 2)
        , top        : top
      }, "fast");
      return;
    }
  }
  $modal.stop().animate({ 'top': top }, "fast");
};

var show = function() {
  var $modal = $(this);
  adjustModal($modal);
};

var checkShow = function() {
  $('.modal').each(function() {
    var $modal = $(this);
    if ($modal.css('display') !== 'block') return;
    adjustModal($modal);
  });
};

var modalWindowResize = function() {
  $('.modal').not('.modal-gallery').on('show', show);
  $('.modal-gallery').on('displayed', show);
  checkShow();
};

$(modalWindowResize);
$(window).resize(modalWindowResize);
$(window).scroll(checkShow);


});
