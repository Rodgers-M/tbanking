$(document).ready(function(){

	$('#topnav').waypoint(function(direction){

		if(direction=="down"){

			$('#topnav>ul').addClass('sticky');
		} else{
			$('#topnav>ul').removeClass('sticky');
		}
	} , {
		offset: '0.1%;'
	});
});

$(function() {
  $('#eventTime').timepicker();
});

$('.close-button').closest('[data-closable]').fadeOut(8000);

