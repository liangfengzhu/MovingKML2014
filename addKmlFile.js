var networkLink;
var href;
var link;
function addFile() {
	Reset();
    $('v_total').value = 0;
    $('we_total').value = 0;
    $('sn_total').value = 0;
    href = document.getElementById('loadKml').value;
    if (exitOrNot()) {
        //存在已有的KML，清除
        ge.getFeatures().removeChild(networkLink);
    } 
    addKmlFromUrl(href);
}

function Reset() {
    document.getElementById('range').value = 1000;
    document.getElementById('v_total').value = 0;
    document.getElementById('newchangeValue').value = 0;
    document.getElementById('WEMax').value = 1000;
    document.getElementById('WEChangeValue').value = 0;
    document.getElementById('we_total').value = 0;
    document.getElementById('SNMax').value = 1000;
    document.getElementById('SNChangeValue').value = 0;
    document.getElementById('sn_total').value = 0;
    altitudeBar.getOverlayXY().setY(393);
    bgSl01.getOverlayXY().setX(107);
    bgSl02.getOverlayXY().setX(107);

    window.n_activeSliderId = 0;
    var o_sliderNew00 = window.A_SLIDERS[window.n_activeSliderId];
    o_sliderNew00.f_setValue($('newchangeValue').value, 1);
    window.n_activeSliderId = null;

    window.n_activeSliderId = 1;
    o_sliderNew00 = window.A_SLIDERS[window.n_activeSliderId];
    o_sliderNew00.f_setValue($('WEChangeValue').value, 1);
    window.n_activeSliderId = null;

    window.n_activeSliderId = 2;
    o_sliderNew00 = window.A_SLIDERS[window.n_activeSliderId];
    o_sliderNew00.f_setValue($('SNChangeValue').value, 1);
    window.n_activeSliderId = null;
}

function addKmlFromUrl(href1) {
//	google.earth.fetchKml(ge, href1, kmlFinishedLoading);
	link = ge.createLink('');
	link.setHref(href1);
	networkLink = ge.createNetworkLink('');
	networkLink.set(link, true, true);
	ge.getFeatures().appendChild(networkLink);
}


// 判断web GE中是否存在kml对象

function exitOrNot() {
	if (ge.getElementsByType('KmlPoint').getLength() != 0
			|| ge.getElementsByType('KmlLineString').getLength() != 0 
			|| ge.getElementsByType('KmlModel').getLength() != 0
			) {
//		alert(ge.getElementsByType('KmlPoint').getLength());
		return true;
	} else {
		return false;
	}
}

function $(id)
{
	return document.getElementById(id);
}


