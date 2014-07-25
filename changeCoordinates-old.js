//更新ge中所有对象的坐标
function updateOptions(deltaLat,deltaLng,deltaAlt) 
{
     var time1 = new Date();

 // 下面测试移动KML几何要素的功能... 
  var i=null;

  var deltaLat1=0;
  var deltaLng1=0;
  var deltaAlt1=0;

  var pi_value = Math.PI;   
  var radius_earth= 6371004;

  var elementNum=0;

  statusID=1;
  

  //处理Point要素
  var points = ge.getElementsByType('KmlPoint');
  processProgress = 0;
  elementNum = points.getLength();
  for ( i = 0; i < points.getLength(); i++) 
  {
     var pointi = points.item(i);

     // alert(pointi.getType());
     
     if (elementNum > 0 )
     {
       processProgress=i*100.0/elementNum;
      }


     //该点最初的坐标
     var lati= pointi.getLatitude();
     var lngi= pointi.getLongitude();
     var alti= pointi.getAltitude();
     

     //该点坐标变化量
     deltaLat1= (deltaLat*180)/(pi_value*(radius_earth + alti) );
     deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
     deltaAlt1 = deltaAlt;
     var newlati = lati + deltaLat1;
     var newlngi = lngi + deltaLng1;
     
     //判断新坐标的纬度值
     if (newlati > 90) {
         newlati = 90;
     }
     else if (newlati < -90) {
         newlati = -90;
     }
     //判断新坐标的经度值
     if (newlngi > 180) {
         newlngi = newlngi - 360;
     }
     else if (newlngi < -180) {
     newlngi = newlati + 360;
     }
     //修改为新坐标
   pointi.setLatLngAlt(newlati, newlngi, alti + deltaAlt1); 
  } 

  //处理LineString要素和LinearRing要素
  var linestrings = ge.getElementsByType('KmlLineString');
  processProgress = 0;
  elementNum = linestrings.getLength();

  for ( i = 0; i < linestrings.getLength(); i++) 
  {
     var pointi = null;
     var pointCoordArray=null;

     if (elementNum > 0 )
     {
       processProgress=i*100.0/elementNum;
      }

      pointi= linestrings.item(i);
      // if (i<2){ alert(pointi.getType());}
      // if (i<2){ alert("线段");}
      // alert("线段");

      pointCoordArray = pointi.getCoordinates ();
      // alert(pointCoordArray.getType());

      for (var j=0;j < pointCoordArray.getLength(); j++)
      {
            var pointCoord = pointCoordArray.get(j );

             //该点最初的坐标
             var lati= pointCoord.getLatitude();
             var lngi= pointCoord.getLongitude();
             var alti= pointCoord.getAltitude();
             
             //该点坐标变化量
             deltaLat1= (deltaLat*180)/(pi_value*(radius_earth + alti) );
             deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
             deltaAlt1 = deltaAlt;
             var newlati = lati + deltaLat1;
             var newlngi = lngi + deltaLng1;

             //判断新坐标的纬度值
             if (newlati > 90) {
                 newlati = 90;
             }
             else if (newlati < -90) {
                 newlati = -90;
             }
             //判断新坐标的经度值
             if (newlngi > 180) {
                 newlngi = newlngi - 360;
             }
             else if (newlngi < -180) {
                 newlngi = newlati + 360;
             }

              //修改为新坐标
             pointCoordArray.setLatLngAlt(j, newlati, newlngi, alti + deltaAlt1);
      }

  } 


//处理 LinearRing 要素:由于KmlLinearRing派生自LineString，前面已经处理了LineString，此处不需要处理KmlLinearRing了。
//  var linestrings = ge.getElementsByType('KmlLinearRing');
//  for ( i = 0; i < linestrings.getLength(); i++) 
//  {
//      var pointi = null;
//      var pointCoordArray=null;
//
//      pointi= linestrings.item(i);
//      if (i<2){ alert(pointi.getType());}
//
//      pointCoordArray = pointi.getCoordinates ();
//      if (i<2){ alert(pointCoordArray.getType());}
//
//      for (var j=0;j < pointCoordArray.getLength(); j++)
//      {
//          var pointCoord = pointCoordArray.get(j );
//
//            //该点最初的坐标
//           var lati= pointCoord.getLatitude();
//           var lngi= pointCoord.getLongitude();
//           var alti= pointCoord.getAltitude();
//
//           //修改为新坐标
//          pointCoordArray.setLatLngAlt(j, lati+deltaLat, lngi+deltaLng,alti+deltaAlt);
//   }
//
// } 

//处理 Polygon要素：由于用 <LinearRing>来定义<Polygon>的内外边界，前面已经处理了KmlLinearRing，此处不需要处理Polygon了。


//处理Model要素
  var points = ge.getElementsByType('KmlModel');
  processProgress = 0;
  elementNum = points.getLength();

  for ( i = 0; i < points.getLength(); i++) 
  {
      var pointi = points.item(i);
      // alert(pointi.getType());

      var pointLoc=null;
      pointLoc = pointi.getLocation();

      if (elementNum > 0 )
     {
       processProgress=i*100.0/elementNum;
      }

      //该模型最初的坐标
      var lati= pointLoc.getLatitude();
      var lngi= pointLoc.getLongitude();
      var alti= pointLoc.getAltitude();
     
    //该模型坐标变化量
      deltaLat1= (deltaLat*180)/(pi_value*(radius_earth + alti) );
      deltaLng1= (deltaLng*180)/(pi_value*(radius_earth + alti)* Math.cos(lati * pi_value/180.0 ));
      deltaAlt1 = deltaAlt;
      var newlati = lati + deltaLat1;
      var newlngi = lngi + deltaLng1;

      //判断新坐标的纬度值
      if (newlati > 90) {
          newlati = 90;
      }
      else if (newlati < -90) {
          newlati = -90;
      }
      //判断新坐标的经度值
      if (newlngi > 180) {
          newlngi = newlngi - 360;
      }
      else if (newlngi < -180) {
          newlngi = newlati + 360;
      }
      
      //修改为新坐标
      pointLoc.setLatLngAlt(newlati, newlngi,alti+deltaAlt1); 
  } 
  	var time2 = new Date();
//  	alert(time2.getTime() - time1.getTime());
 // alert('finished');
//处理MultiGeometry要素:MultiGeometry是与同一KML地图项关联的0个或多个基本几何要素（<Point>、 <LineString>、 <LinearString>、<Polygon>或<Model>）的集合
// 前面已经处理了基本几何要素，此处不需要处理MultiGeometry了。

  statusID=0;
}


