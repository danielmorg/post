 $("a").bind('click', function (e) {
	e.preventDefault();
	var nextPage = $(e.target.hash);
	$("#pages .current").removeClass("current");
	nextPage.addClass("current");
} ); 

   // ******************************************************************** 
   // *********************** MAPA *************************************** 
   // ********************************************************************    

      var defaultPos = new google.maps.LatLng (41.4025054,2.1946747);
	  
      function initGeolocation() {
        if (navigator && navigator.geolocation) {
			var options = {maximumAge: 300000, enableHighAccuracy:true, timeout: 5000};
			alert("dentro del si");				
			navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        } else {
			MuestraMapa(defaultPos);
			alert("dentro del no");			
/*			console.log("Geolocation is not supported");*/
        }
      }
     
      function errorCallback(error) {
			alert("dentro del error");			  
			MuestraMapa(defaultPos);
	  	  	console.log("Error: " + error.code + " " + error.message);
			}

      function successCallback(position) {
		alert("dentro del success");			  
	    MuestraMapa(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      } 


       //FUNCIO DIBUIXAR MAPA
       function MuestraMapa(latlng) {

			var map_options = {
              zoom: 16,
              center: latlng,
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP};

			var map_container = document.getElementById('map');
		alert("el map container");			
			var map = new google.maps.Map(map_container, map_options);
		alert("el map");
		
 /*           var marker = new google.maps.Marker({
               position: latlng,
               map: map,
               draggable: true,
               title: "Estic aquí...",
               animation: google.maps.Animation.DROP
             });
                    
			var infowindow = new google.maps.InfoWindow({
                position: latlng,
                content: "<p>Mi casa</p>"
             });
					
             google.maps.event.addListener(marker, "click", function() {
                   infowindow.open(map,marker);
             });
*/
        }// Fin muestra mapa	

		
   // ******************************************************************** 
   // *********************** FUTBOL MENSAJES **************************** 
   // ********************************************************************    
		
var FutbolMensajes = (function() {

  var APP = {
    applicationId: "b2bLbDDZ7kUGfV178YX0CXu6RuO18WreMB7ff098",
    javascriptId: "bKxtYWywQHlWE0KmA4rdIUUoALuZmmLQ975zaRVU"
  };
 
   //## initialize *******************************************************  
  function initialize() {
    Parse.initialize(APP.applicationId, APP.javascriptId);
  }

   //## mostrarNotas *****************************************************  
  function clearErrors() { 
    $("#error-messages").html("").hide();
  }
  
  function dar_formato(listamensajes) {  
	var template = $('#messages-template').html();  
	var info = Mustache.to_html(template,listamensajes );
	$('#paginamensajes').html(info); 
   };
				
  function mostrarNotas() {
    var MensajeObject = Parse.Object.extend("messages");
    var query = new Parse.Query(MensajeObject);

    clearErrors();
	query.descending("createdAt");
	query.find({
	  success: function(results) {
	  console.log(results);
		var listamensajes = JSON.parse(JSON.stringify(results));
		console.log(listamensajes);
		dar_formato(listamensajes);		
	  },
	  error: function(error) {
		console.log("Error: " + error.code + " " + error.message);
	  }
	});
  }

   //## addNotas ********************************************************* 
	function logError(object, error) {
		$("#error-messages").html("Error en email o password").show();  
	}   
   
   function addNotas(form) {
    var text = form.note.value;
    var NoteObject = Parse.Object.extend("messages");
    var note = new NoteObject();
	note.set("game","1Sep2015U1U4");
	note.set("sender","ddanielmor@hotmail.com");
	note.set("text",text);	
   note.save(null, { success: mostrarNotas, error: logError });
  }
  
  //## PUBLIC METHODS
  return {
    initialize: initialize,
	mostrarNotas : mostrarNotas,
	addNotas : addNotas	
  };
})();

FutbolMensajes.initialize();
