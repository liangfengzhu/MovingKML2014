
var clickType;
var totalV1=0;
var totalSN1=0;
var totalWE1=0;
var e_input;

function slider(a_init, a_tpl) {

    //a_tpl["n_value"] = 50;
	this.f_setValue  = f_sliderSetValue;
	this.f_getPos    = f_sliderGetPos;

	// register in the global collection	
	if (!window.A_SLIDERS)
		window.A_SLIDERS = [];
	var n_id = this.n_id = window.A_SLIDERS.length;
	//alert(n_id);
	window.A_SLIDERS[n_id] = this;

	// save config parameters in the slider object
	var s_key;
	if (a_tpl)
		for (s_key in a_tpl)
			this[s_key] = a_tpl[s_key];
	for (s_key in a_init)
		this[s_key] = a_init[s_key];

	this.n_pix2value = this.n_pathLength / (this.n_maxValue - this.n_minValue);
	if (this.n_value == null)
		this.n_value = this.n_minValue;

	// generate the control's HTML
	document.write(
		'<div style="width:' + this.n_controlWidth + 'px;height:' + this.n_controlHeight + 'px;border:0; background-image:url(' + this.s_imgControl + ')" id="sl' + n_id + 'base">' +
		'<img src="' + this.s_imgSlider + '" width="' + this.n_sliderWidth + '" height="' + this.n_sliderHeight + '" border="0" style="position:relative;left:' + this.n_pathLeft + 'px;top:' + this.n_pathTop + 'px;z-index:' + this.n_zIndex + ';cursor:pointer;visibility:hidden;" name="sl' + n_id + 'slider" id="sl' + n_id + 'slider" onmousedown="return f_sliderMouseDown(' + n_id + ')" /></div>'
	);

	this.e_base   = get_element('sl' + n_id + 'base');
	this.e_slider = get_element('sl' + n_id + 'slider');

	if (document.addEventListener) {
		this.e_slider.addEventListener("touchstart", function (e_event) { f_sliderMouseDown(n_id, e_event) },  false);
		document.addEventListener("touchmove", f_sliderMouseMove,  false);
		document.addEventListener("touchend", f_sliderMouseUp,  false);
	}

	
	// safely hook document/window events
	if (!window.f_savedMouseMove && document.onmousemove != f_sliderMouseMove) {
		window.f_savedMouseMove = document.onmousemove;
		document.onmousemove = f_sliderMouseMove;
	}
	if (!window.f_savedMouseUp && document.onmouseup != f_sliderMouseUp) {
		window.f_savedMouseUp = document.onmouseup;
		document.onmouseup = f_sliderMouseUp;
	}

	// preset to the value in the input box if available
	var e_input = this.s_form == null
		? get_element(this.s_name)
		: document.forms[this.s_form]
			? document.forms[this.s_form].elements[this.s_name]
			: null;
	this.f_setValue(e_input && e_input.value != '' ? e_input.value : null, 1);
	this.e_slider.style.visibility = 'visible';
}

function f_sliderSetValue (n_value, b_noInputCheck) {
	if (n_value == null)
		n_value = this.n_value == null ? this.n_minValue : this.n_value;
	if (isNaN(n_value))
		return false;
	// round to closest multiple if step is specified
	if (this.n_step)
	    n_value = Math.round((n_value - this.n_minValue) / this.n_step * 1e5)  * this.n_step/ 1e5 + this.n_minValue;
	// smooth out the result
	if (n_value % 1)
		n_value = Math.round(n_value * 1e5) / 1e5;

	if (n_value < this.n_minValue)
		n_value = this.n_minValue;
	if (n_value > this.n_maxValue)
		n_value = this.n_maxValue;

	this.n_value = n_value;

	// move the slider
	if (this.b_vertical)
		{
		this.e_slider.style.top  = (this.n_pathTop + this.n_pathLength - Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';
		}
	else
		{
		this.e_slider.style.left = (this.n_pathLeft + Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';
		}
	// save new value
	//var e_input;
	if (this.s_form == null) {
		e_input = get_element(this.s_name);
		if (!e_input)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with ID='" + this.s_name + "'.");
	}
	else {
		var e_form = document.forms[this.s_form];
		if (!e_form)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the form with NAME='" + this.s_form + "'.");
		e_input = e_form.elements[this.s_name];
		if (!e_input)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with NAME='" + this.s_name + "'.");
	}
	if(this.s_name == 'newchangeValue')
		{
		    rangeMaxV = parseFloat($('range').value);
		    e_input.value = Math.round(parseFloat(n_value) * rangeMaxV / 1000*100)/100;
			$('v_total').value = parseFloat(e_input.value) + totalV1;
		} else if(this.s_name == 'WEChangeValue')
		{
		    rangeMaxH_WE = parseFloat($('WEMax').value);
		    e_input.value = Math.round(parseFloat(n_value)*rangeMaxH_WE/1000*100)/100;
			$('we_total').value = parseFloat(e_input.value) + totalWE1;
		}else if(this.s_name == 'SNChangeValue')
			{
			    rangeMaxH_SN = parseFloat($('SNMax').value);
			    e_input.value = Math.round(parseFloat(n_value)*rangeMaxH_SN/1000*100)/100;
				$('sn_total').value = parseFloat(e_input.value) + totalSN1;
			}
}

// get absolute position of the element in the document
function f_sliderGetPos (b_vertical, b_base) {
	var n_pos = 0,
		s_coord = (b_vertical ? 'Top' : 'Left');
	var o_elem = o_elem2 = b_base ? this.e_base : this.e_slider;
	
	while (o_elem) {
		n_pos += o_elem["offset" + s_coord];
		o_elem = o_elem.offsetParent;
	}
	o_elem = o_elem2;

	var n_offset;
	while (o_elem.tagName != "BODY") {
		n_offset = o_elem["scroll" + s_coord];
		if (n_offset)
			n_pos -= o_elem["scroll" + s_coord];
		o_elem = o_elem.parentNode;
	}
	return n_pos;
}

function f_sliderMouseDown (n_id, e_event) {
	//alert(window.A_SLIDERS[n_id]);
//	提示单击的是哪个滑条

    totalV1 = parseFloat($('v_total').value);
    totalSN1 = parseFloat($('sn_total').value);
    totalWE1 = parseFloat($('we_total').value);

	clickType = window.A_SLIDERS[n_id].s_name;
//	alert(clickType);
	window.n_activeSliderId = n_id;
	//alert(n_id);
	f_sliderSaveTouch(e_event);

	var o_slider = A_SLIDERS[n_id];
	window.n_mouseOffset = o_slider.b_vertical
		? window.n_mouseY - o_slider.n_sliderHeight / 2 - o_slider.f_getPos(1, 1) - parseInt(o_slider.e_slider.style.top)
		: window.n_mouseX - o_slider.n_sliderWidth  / 2 - o_slider.f_getPos(0, 1) - parseInt(o_slider.e_slider.style.left);

	return false;
}

/**
 * @param e_event
 * @param b_watching
 * @returns
 */
function f_sliderMouseUp (e_event, b_watching) {
	if (window.n_activeSliderId != null) {
		var o_slider = window.A_SLIDERS[window.n_activeSliderId];
		o_slider.f_setValue(o_slider.n_minValue + (o_slider.b_vertical
			? (o_slider.n_pathLength - parseInt(o_slider.e_slider.style.top) + o_slider.n_pathTop)
			: (parseInt(o_slider.e_slider.style.left) - o_slider.n_pathLeft)) / o_slider.n_pix2value);
		
		
		
		if (b_watching)	return;

		window.n_activeSliderId = null;
		window.n_mouseOffset = null;
		
		if(clickType !=null  )
		{
			if( clickType=='newchangeValue')
				{
//				alert('do it');
//				alert($(clickType).value);
//				$('test').value = $(clickType).value;
				var c = parseFloat($(clickType).value.trim());
				//$('v_total').value = parseFloat($('v_total').value) + c;
				//				alert(c);
				/*
				//添加左随右动代码竖直方向
				var initPosV = 393; // 竖直方向滑块的初始位置的Y值
				var newPosV = 393 - 160 * c / (2 * rangeMaxV);
				//alert(initPosV);
				altitudeBar.getOverlayXY().setY(newPosV);
				*/
				//changeAllKmlAlt(c);
				clickType = null;
				//复位
				var vtotal = $('v_total').value;
				var v = $('newchangeValue').value;
				window.n_activeSliderId = 0;
				var os_slider = window.A_SLIDERS[window.n_activeSliderId];
				o_slider.f_setValue(0, 1);
				window.n_activeSliderId = null;
				$('v_total').value = vtotal;
				$('newchangeValue').value = v;
				//移动KML
				changeAllKmlAlt(c);
				}
			
			if(clickType=='WEChangeValue')
				{
//					alert('longitudeChange');
					var c = parseFloat($(clickType).value.trim());
//					alert(c);
					//$('we_total').value = parseFloat($('we_total').value) + c;
					/*		
					//东西方向滑动条左随右动
					//var initbgSl02 = bgSl02.getOverlayXY().getX();获得东西方向滑块的初始X值=107
					var PosWE = 107 + 160 * c / (2 * rangeMaxH_WE);
					//alert(PosWE);
					bgSl02.getOverlayXY().setX(PosWE);
					*/
					//changeAllKmlLon(c);
                    
					clickType = null;
					//复位
					var WEtotal = $('we_total').value;
					var WE = $('WEChangeValue').value;
					window.n_activeSliderId = 1;
					var os_slider = window.A_SLIDERS[window.n_activeSliderId];
					o_slider.f_setValue(0, 1);
					window.n_activeSliderId = null;
					$('we_total').value = WEtotal;
					$('WEChangeValue').value = WE;
                    //移动KML
					changeAllKmlLon(c);
				}
			
			if(clickType=='SNChangeValue')
				{
//				alert('altitudeChange');

				var c = parseFloat($(clickType).value.trim());

				//alert(c);
				//$('sn_total').value = parseFloat($('sn_total').value) + c;
				/*
				//南北方向滑动条左随右动
				var initbgSl101 = 107; //南北移动滑块的初始位置
				var PosNS = 107 + 160 * c / (2 * rangeMaxH_SN);
				bgSl01.getOverlayXY().setX(PosNS);
				*/
				//changeAllKmlLat(c);
				
				clickType = null;
				//复位
				var SNtotal = $('sn_total').value;
				var SN = $('SNChangeValue').value;
				window.n_activeSliderId = 2;
				var os_slider = window.A_SLIDERS[window.n_activeSliderId];
				o_slider.f_setValue(0, 1);
				window.n_activeSliderId = null;
				$('sn_total').value = SNtotal;
				$('SNChangeValue').value = SN;
				//移动KML
				changeAllKmlLat(c);
				}
		}else
			{
				clickType=null;
			}

	}
	if (window.f_savedMouseUp)
		return window.f_savedMouseUp(e_event);
}

function f_sliderMouseMove (e_event) {

	if (!e_event && window.event) e_event = window.event;

	// save mouse coordinates
	if (e_event) {
		window.n_mouseX = e_event.clientX + f_scrollLeft();
		window.n_mouseY = e_event.clientY + f_scrollTop();
	}

	// check if in drag mode
	if (window.n_activeSliderId != null) {

		f_sliderSaveTouch(e_event);
		var o_slider = window.A_SLIDERS[window.n_activeSliderId];

		var n_pxOffset;
		if (o_slider.b_vertical) {
			var n_sliderTop = window.n_mouseY - o_slider.n_sliderHeight / 2 - o_slider.f_getPos(1, 1) - window.n_mouseOffset;
			// limit the slider movement
			if (n_sliderTop < o_slider.n_pathTop)
				n_sliderTop = o_slider.n_pathTop;
			var n_pxMax = o_slider.n_pathTop + o_slider.n_pathLength;
			if (n_sliderTop > n_pxMax)
				n_sliderTop = n_pxMax;
			o_slider.e_slider.style.top = n_sliderTop + 'px';
			n_pxOffset = o_slider.n_pathLength - n_sliderTop + o_slider.n_pathTop;
		}
		else {
			var n_sliderLeft = window.n_mouseX - o_slider.n_sliderWidth / 2 - o_slider.f_getPos(0, 1) - window.n_mouseOffset;
			// limit the slider movement
			if (n_sliderLeft < o_slider.n_pathLeft)
				n_sliderLeft = o_slider.n_pathLeft;
			var n_pxMax = o_slider.n_pathLeft + o_slider.n_pathLength;
			if (n_sliderLeft > n_pxMax)
				n_sliderLeft = n_pxMax;

			o_slider.e_slider.style.left = n_sliderLeft + 'px';
			n_pxOffset = n_sliderLeft - o_slider.n_pathLeft;

		}
		if (o_slider.b_watch)
			 f_sliderMouseUp(e_event, 1);

		return false;
	}
	
	if (window.f_savedMouseMove)
		return window.f_savedMouseMove(e_event);
}

function f_sliderSaveTouch (e_event) {
	if (!e_event || !e_event.touches) return;
	e_event.preventDefault();
	var e_touch = e_event.touches[0] || e_event.changedTouches[0];
	window.n_mouseX = e_touch.pageX;
	window.n_mouseY = e_touch.pageY;
}

// get the scroller positions of the page
function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_sliderError (n_id, s_message) {
	alert("Slider #" + n_id + " Error:\n" + s_message);
	window.n_activeSliderId = null;
}

get_element = document.all ?
	function (s_id) { return document.all[s_id] } :
	function (s_id) { return document.getElementById(s_id) };

