//JavaScript code for moving multiple KML geometry elements
function updateOptions(deltaLat,deltaLng,deltaAlt) 
{
    // deltaLat - The movement distance (in meters) along the latitudinal (east-west) direction
    // deltaLng - The movement distance (in meters) along the longitudinal (north-south) direction
    // deltaAlt - The movement distance (in meters) along the vertical direction

  var i=null;
  var pi_value= Math.PI; //Pi
  var radius_earth=6378137; //The equatorial radius
  var c_distance=10001965.729; //The distance from the equator to a pole
  var deltaLat1=0;
  var deltaLng1=0;
  var deltaAlt1=0;

  var elementNum=0;
   statusID=1;
  
  //Move points
  var points = ge.getElementsByType('KmlPoint');//Get all points
  processProgress = 0;
  elementNum = points.getLength();
  for ( i = 0; i < points.getLength(); i++) {
     var pointi = points.item(i);
  
     if (elementNum > 0 )
     {
       processProgress=i*100.0/elementNum;
      }


     //The initial 3D coordinates of a point
     var lati= pointi.getLatitude();
     var lngi= pointi.getLongitude();
     var alti= pointi.getAltitude();
     

     //Calculate the offsets of 3D coordinates according to the movement distances
     deltaLat1= (deltaLat*180)/(2*c_distance+pi_value*alti);
     deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
     deltaAlt1 = deltaAlt;

     var newlati = lati + deltaLat1;
     var newlngi = lngi + deltaLng1;
     
     if (newlati > 90) {
         newlati = 90;
     }
     if (newlati < -90) {
         newlati = -90;
     }
     
     if (newlngi > 180) {
         newlngi = newlngi - 360;
     }
     if (newlngi < -180) {
         newlngi = newlati + 360;
     }

     //Adjust the location of the point using the offsets
     pointi.setLatLngAlt(newlati, newlngi, alti + deltaAlt1); 
  } 

  //Handle line strings, linear rings and polygons
  var linestrings = ge.getElementsByType('KmlLineString');//Get all line strings, also including linear rings and polygons
  processProgress = 0;
  elementNum = linestrings.getLength();
  for ( i = 0; i < linestrings.getLength(); i++)  {
     var pointi = null;
     var pointCoordArray=null;

     if (elementNum > 0 )
     {
       processProgress=i*100.0/elementNum;
      }

      pointi= linestrings.item(i);
      pointCoordArray = pointi.getCoordinates ();     
      for (var j=0;j < pointCoordArray.getLength(); j++)
      {
            var pointCoord = pointCoordArray.get(j );

             //The initial 3D coordinates of a point
             var lati= pointCoord.getLatitude();
             var lngi= pointCoord.getLongitude();
             var alti= pointCoord.getAltitude();
             
             //Calculate the offsets of 3D coordinates
             deltaLat1= (deltaLat*180)/(2*c_distance+pi_value*alti);
             deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
             deltaAlt1 = deltaAlt;

             var newlati = lati + deltaLat1;
             var newlngi = lngi + deltaLng1;

             
             if (newlati > 90) {
                 newlati = 90;
             }
             if (newlati < -90) {
                 newlati = -90;
             }
             
             if (newlngi > 180) {
                 newlngi = newlngi - 360;
             }
             if (newlngi < -180) {
                 newlngi = newlati + 360;
             }

             //Adjust the location of the point using the offsets
             pointCoordArray.setLatLngAlt(j, newlati, newlngi, alti + deltaAlt1);
      }

  } 

 //Move 3D models
  var models = ge.getElementsByType('KmlModel'); //Get all 3D models
  processProgress = 0;
  elementNum = models.getLength();

  for ( i = 0; i < models.getLength(); i++)  {
      var modeli = models.item(i);
      var modelLoc=null;
      modelLoc = modeli.getLocation();

      if (elementNum > 0 )
      {
       processProgress=i*100.0/elementNum;
      }

      //The initial placement of a model
      var lati= modelLoc.getLatitude();
      var lngi= modelLoc.getLongitude();
      var alti= modelLoc.getAltitude();
     
      //Calculate the offsets of 3D coordinates
      deltaLat1= (deltaLat*180)/(2*c_distance+pi_value*alti);
      deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
      deltaAlt1 = deltaAlt;

      var newlati = lati + deltaLat1;
      var newlngi = lngi + deltaLng1;

      
      if (newlati > 90) {
          newlati = 90;
      }
      if (newlati < -90) {
          newlati = -90;
      }
      
      if (newlngi > 180) {
          newlngi = newlngi - 360;
      }
      if (newlngi < -180) {
          newlngi = newlati + 360;
      }
      
     //Adjust the location of the model using the offsets
      modelLoc.setLatLngAlt(newlati, newlngi,alti+deltaAlt1); 
  } 
  	

  statusID=0;
}


