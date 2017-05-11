$(document).ready(function(){

	$('#tbinfo').waypoint(function(direction){

		if(direction=="down"){

			$('nav').addClass('sticky');
		} else{
			$('nav').removeClass('sticky');
		}
	} , {
		offset: '50%;'
	});

});

$(function() {
  $('#eventTime').timepicker();
});

$('.close-button').closest('[data-closable]').fadeOut(8000);

