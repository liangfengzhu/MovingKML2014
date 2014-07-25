function changeAllKmlAlt(changeSize)
{
//	alert('do it');
	//获取改变高程的滑条值和最大幅度
//	var selectIndex  = $('range').selectedIndex;
//	//返回选中的值
//	var range =$('range').options[selectIndex].value;
	var range = $('range').value;
//	alert(range.constructor);
//	var changeSize = $('newchangeValue').value;
//	alert( parseFloat(range.trim())/10*100);
//	var deltaAlt =(parseFloat(range.trim())/10)*changeSize/100;
//	alert(deltaAlt);



	deltaAlt = changeSize;
	updateOptions(0,0,deltaAlt) ;//原有代码
}

function changeAllKmlLat(changeSize)
{
//	var selectIndex  = $('parameterforlonalt').selectedIndex;
//  返回选中的值
//	var range =$('parameterforlonalt').options[selectIndex].value;
//	var changeSize = $('altitudeChange').value;
//  var changesize  = ChangeSize;
//	var range = $('parameterforlonalt').value;
//	var deltaLat =(parseFloat(range.trim())/10)*changeSize/100;
//	alert(deltaLat);
	deltaLat = changeSize;
	updateOptions(deltaLat,0,0) ;
}

function changeAllKmlLon(changeSize)
{
//	var selectIndex  = $('parameterforlonalt').selectedIndex;
//  返回选中的值
//	var range =$('parameterforlonalt').options[selectIndex].value;
//	var changeSize = $('altitudeChange').value;
//	var range = $('parameterforlonalt').value;
//  var changesize  =ChangeSize;
//	var deltaLng =(parseFloat(range.trim())/10)*changeSize/100;
//	alert(deltaLng);
	deltaLng = changeSize;
	updateOptions(0,deltaLng,0) ;
}