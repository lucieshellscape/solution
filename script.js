$('#calendar').datepicker({
   	inline: true,
   	firstDay: 1,
    showOtherMonths: true,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    onSelect: function(dateText, inst) {
    	// clear previous people
    	$('#details ul').empty();
      	// convert date to be url safe
	    var date = $(this).val().split('/').join('-');
	    // Retreive calendar data via API
		var tmp = new Date(date).getTime();
	    if (!(tmp <= 1435147200000 || tmp >= 1445817600000)) {
	    	// Enter date into form
	      	enterDate(outputDate(date));
	      	// Query for json object
	      	var calendarEndPoint = "{{ url('/members/bookings') }}/list?day="+outputDate(date);
	      	$.getJSON(calendarEndPoint).done(function(data){
				// Display all the names of confirmed bookings
				console.log(data);
				if (data.amount > 0) {
					$.each( data.names, function( i, person ) {
						$('#details ul').append('<li>'+person+'</li');
					});
				} else {
					$('#details ul').append('<li>No bookings</li');
				}
				// Display the available number of spots
				var left = 32 - data.amount;
		    	$('#details h1 strong').html(left);
			});
	    } else {
		    // Set the available number of spots
		    $('#details h1 strong').html(0);
	    }   
	    return false;
    }
});
function outputDate(date){
    return new moment(date, 'MM-DD-YYYY').format('DD-MM-YYYY');
}