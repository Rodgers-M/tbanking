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

$('#loancalc').click(function(){
	var rate   			= 10;
	var loanAmount 		= parseInt($('#loanamnt').val());
	var interest 		= (rate/100) * loanAmount;
	var paymentAmount	= interest + loanAmount;
	
	console.log(paymentAmount);
	$('#pay').addClass('primary');
	document.getElementById('payment').innerHTML = paymentAmount;
});
