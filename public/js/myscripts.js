$(document).ready(function(){

	$('#tbinfo').waypoint(function(direction){

		if(direction=="down"){

			$('nav').addClass('sticky');
		} else{
			$('nav').removeClass('sticky');
		}
	} , {
		offset: '90%;'
	});

});

$(function() {
  $('#eventTime').timepicker();
});
