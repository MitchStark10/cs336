$( 'form' ).submit(function( event ) {
  //don't allow the html submit
  event.preventDefault();

  var form = $( this );
  var myData = {"id": $( "#id" ).val()}

  $.ajax({
    type: 'POST',
    url: '/find_person',
    contentType: 'application/json',
    data: JSON.stringify(myData),
    dataType: 'json'
  })
  .done(function( json_string ) {
    json = JSON.parse(json_string)
    $( "p" ).empty()
    $( "body" ).append("<p>" + "Name: " + json.first + " " + json.last + "</p>")
    $( "body" ).append("<p>" + "ID: " + json.id + "</p>")
    $( "body" ).append("<p>" + "Start Date: " + json.date + "</p>")
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