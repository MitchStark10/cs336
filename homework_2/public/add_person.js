$( 'form' ).submit(function( event ) {
  //don't allow the html submit
  event.preventDefault();

  var form = $( this );
  var myData = {"first_name": $( "#first" ).val(),
                  "last_name": $( "#last" ).val(),
                  "id": $( "#id" ).val(),
                  "start_date": $( "#date" ).val()}

  $.ajax({
    type: 'POST',
    url: '/add_person',
    contentType: 'application/json',
    data: JSON.stringify(myData),
    dataType: 'json'
  })
  .done(function( json_string ) {
    json = JSON.parse(json_string)
    $( "body" ).empty()
    $( "body" ).append("<p>" + "Succesfully entered: [" + json.first + " " + json.last + "] to the data" + "</p>")
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert("There was a problem:(");
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  // Code to run regardless of success or failure;
  .always(function( xhr, status ) {
  //alert( "The request is complete!" );
  });
});