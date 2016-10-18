"use strict";

$( document ).ready(function () {
	$("#get-data").click(
		function() {
			$.ajax({
				url: "/hello",
				type: "GET",
				data: {
					name: "lab7"
				}
			})
			.done(function( json_string ) {
				const json = JSON.parse(json_string)
     			$( "body" ).append("<p>" + json.message + "</p>")
  			})
  			// Code to run if the request fails; the raw request and
  			// status codes are passed to the function
  			.fail(function( xhr, status, errorThrown ) {
    			alert( "Sorry, there was a problem!" );
    			console.log( "Error: " + errorThrown );
    			console.log( "Status: " + status );
    			console.dir( xhr );
  			})
  			// Code to run regardless of success or failure;
  			.always(function( xhr, status ) {
    		alert( "The request is complete!" );
  			});
		})
})