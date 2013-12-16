$( document ).ready( 
	function() {
		$("#logout").bind( "click", function() {
		  	//window.location = "index.php";
		  	$.ajax({ type: "GET",
		  			 url: "functions.php",
		  			 data: {function: "logout"} }).done(function(data){console.log(window.location.replace(data))});
	 	});
	}
)

$( document ).ready( 			
	function() {		
		$('#mess_container').hide();		
		$("#add_btn").bind( "click", function() {			  	
			var name_val = $('#name_txt').val();
			var message_val = $('#message_ta').val();
			var pid =  $('#mess_inputs').val();
			// make ajax call to logout
			$.ajax({
				type: "GET",
			  	url: "functions.php",
			  	data: {function: "add", name: name_val, message: message_val, pid: pid}
			}).done(function(data) {
				//clear the messages from DOM
				clearMessages();
				//and load them again
				getMessages(pid);
			});		  
	  });
	}
)

// Called when we click on a producer link - gets the id for the producer 
function changeProducer(pid) {			
// Clear and update the hidden stuff
$( "#mess_inputs").val(pid);
$( "#mess_p_mess").text("");
// get all the stuff for the producers
// make ajax call to functions.php with teh data
$.ajax({
	type: "GET",
  	url: "functions.php",
  	data: {function: "producers", pid: pid}
}).done(function(data) { // called when the AJAX call is ready
	var j = JSON.parse(data);	
	$("#mess_p_headline").text("Meddelande till " +j.name +", " +j.city);	
	if(j.url !== "") {		
		$("#mess_p_kontakt").text("Länk till deras hemsida " +j.url);
	}
	else {
		$("#mess_p_kontakt").text("Producenten har ingen webbsida");
	}
	if(j.imageURL !== "") {
		$("#p_img_link").attr("href", j.imageURL); 
		$("#p_img").attr("src", j.imageURL); 
	}
	else {
		$("#p_img_link").attr("href", "#"); 
		$("#p_img").attr("src", "img/noimg.jpg"); 
	}
});
//get messages for this producer
getMessages(pid);
}

// Get all the messages for the producer through functions.php
function getMessages(pid) {
$.ajax({
	type: "GET",
	url: "functions.php",
	data: {function: "getMessage", serial: pid},
	timeout: 2000
}).done(function(data) {
	var j = JSON.parse(data);
	//For every comment append it out to the dom
	for (var i = 0; i < j.length; i++) {
		$( "#mess_p_mess" ).append( "<p class='message_container'>" +j[i].message +"<br />Skrivet av: " +j[i].name +"</p>");        
	}	
});    
// show the div if its unvisible
$("#mess_container").show("slow");
}

//remove all messages in DOM
function clearMessages() {
	$(".message_container").remove();
}