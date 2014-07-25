var draggableforbgSl01 = false;
var draggableforbgSl02 = false;
var draggableforaltitudeBar = false;

var changelat;
var totalSN;
var totalWE;
var totalV;
// 经度方向变化的距离
var lngChangePos = 0;
// 纬度方向变化的距离
var latChangePos = 0;
// 高程变化的距离
var altChangePos = 0;

// 控制变化的最大幅度参数
var panMaxChange = 50;
var altMaxChange = 5;

// 当前操作的控制条对象
var currentBar = null;
var exitornot;

function addScreenOverlayChange() {
	latChangePos = bgSl01.getOverlayXY().getX();
	lngChangePos = bgSl02.getOverlayXY().getX();
	altChangePos = altitudeBar.getOverlayXY().getY();
	google.earth
			.addEventListener(
					ge.getWindow(),
					'mousedown',
					function (event) {
					    // alert(event.getClientY());
					    // alert('clicking');
					    if (exitornot) {
					        if (event.getClientX() > 25
									&& event.getClientX() < 200
									&& event.getClientY() > 573
									&& event.getClientY() < 590) {
					            // alert('1111');
					            draggableforbgSl01 = true;
					            currentBar = bgSl01;
					            totalSN = parseFloat($('sn_total').value);

					            // alert(bgSl01);
					            // 下面要写的是滑条的位置改变情况
					            var aSN;
					            if (event.getClientX() < 31) {
					                aSN = 31;
					            }
					            else if (event.getClientX() > 191) {
					                aSN = 191;
					            }
					            else {
					                aSN = event.getClientX();
					            }
					            bgSl01.getOverlayXY().setX(aSN - 4);
					            $('SNChangeValue').value = (bgSl01
										.getOverlayXY().getX() - latChangePos)
										* rangeMaxH_SN * 2 / 160;
					            $('sn_total').value = parseFloat($('SNChangeValue').value) + totalSN;
					            // alert('mm');
					            ge.getOptions().setMouseNavigationEnabled(0);

					        } else if (event.getClientX() > 25
									&& event.getClientX() < 200
									&& event.getClientY() > 513
									&& event.getClientY() < 530) {
					            draggableforbgSl02 = true;
					            currentBar = bgSl02;
					            totalWE = parseFloat($('we_total').value);
					            // 下面要写的是滑条的位置改变情况
					            var aWE;
					            if (event.getClientX() < 31) {
					                aWE = 31;
					            }
					            else if (event.getClientX() > 191) {
					                aWE = 191;
					            }
					            else {
					                aWE = event.getClientX();
					            }
					            bgSl02.getOverlayXY().setX(aWE - 4);
					            $('WEChangeValue').value = (bgSl02
										.getOverlayXY().getX() - lngChangePos)
										* rangeMaxH_WE * 2 / 160;
					            $('we_total').value = parseFloat($('WEChangeValue').value) + totalWE;
					            ge.getOptions().setMouseNavigationEnabled(0);

					        } else if (event.getClientX() > 103
									&& event.getClientX() < 120
									&& event.getClientY() > 300
									&& event.getClientY() < 480) {
					            //alert('ok');

					            //draggableforaltitudeBar = true;
					            currentBar = altitudeBar;
					            var aV;
					            if (event.getClientY() < 309) {
					                a = 309;
					            }
					            else if (event.getClientY() > 469) {
					                a = 469;
					            }
					            else {
					                a = event.getClientY();
					            }
					            totalV = parseFloat($('v_total').value);
					            altitudeBar.getOverlayXY().setY(a + 4);

					            $('newchangeValue').value = (altChangePos - altitudeBar
										.getOverlayXY().getY())
										* rangeMaxV * 2 / 160;
					            $('v_total').value = parseFloat($('newchangeValue').value) + totalV;
					            ge.getOptions().setMouseNavigationEnabled(0);
					        }
					    }
					});

					google.earth
			.addEventListener(
					ge.getWindow(),
					'mousemove',
					function (event) {
					    event.preventDefault();

					    if (currentBar) {
					        if (draggableforbgSl01 == true) {
					            // alert('moving');
					            if (event.getClientX() >25 && event.getClientX() <200 && event.getClientY() > 573 && event.getClientY() < 590) {
					                // 下面要写的是滑条的位置改变情况
					                var aSN;
					                if (event.getClientX() < 31) {
					                    aSN = 31;
					                }
					                else if (event.getClientX() > 191) {
					                    aSN = 191;
					                }
					                else {
					                    aSN = event.getClientX();
					                }
					                bgSl01.getOverlayXY().setX(aSN - 4);
					                $('SNChangeValue').value = (bgSl01
											.getOverlayXY().getX() - latChangePos)
											* rangeMaxH_SN * 2 / 160;
					                $('sn_total').value = parseFloat($('SNChangeValue').value) + totalSN;

					            }
					        }
					        if (draggableforbgSl02 == true) {
					            if (event.getClientX() > 25
										&& event.getClientX() < 200
										&& event.getClientY() > 513
										&& event.getClientY() < 530) {
					                // 下面要写的是滑条的位置改变情况
					                var aWE;
					                if (event.getClientX() < 31) {
					                    aWE = 31;
					                }
					                else if (event.getClientX() > 191) {
					                    aWE = 191;
					                }
					                else {
					                    aWE = event.getClientX();
					                }
					                bgSl02.getOverlayXY().setX(aWE - 4);
					                $('WEChangeValue').value = (bgSl02
											.getOverlayXY().getX() - lngChangePos)
											* rangeMaxH_WE * 2 / 160;
					                $('we_total').value = parseFloat($('WEChangeValue').value) + totalWE;
					            }
					        }


					        if (event.getClientX() > 103
										&& event.getClientX() < 120
										&& event.getClientY() > 300
										&& event.getClientY() < 480) {
					            // 下面要写的是滑条的位置改变情况
					            var a;
					            if (event.getClientY() < 309) {
					                a = 309;
					            }
					            else if (event.getClientY() > 469) {
					                a = 469;
					            }
					            else {
					                a = event.getClientY();
					            }
					            altitudeBar.getOverlayXY().setY( a + 4);
					            $('newchangeValue').value = (altChangePos - altitudeBar.getOverlayXY().getY()) * rangeMaxV * 2 / 160;
					            $('v_total').value = parseFloat($('newchangeValue').value) + totalV;



					        }
					    }
					});

					google.earth.addEventListener(ge.getWindow(), 'mouseup', function (event) {
					    ge.getOptions().setMouseNavigationEnabled(1);

					    exitornot = exitOrNot();
					    // alert(exitornot);
					    if (currentBar && exitornot) {
					        if (currentBar == bgSl01) {

					            var changelat = Math.round((bgSl01.getOverlayXY().getX() - latChangePos)
				* rangeMaxH_SN * 2 / 160*100)/100;
					            //$('sn_total').value = parseFloat($('sn_total').value) + changelat;
					            currentBar = null;
								//复位
					            bgSl01.getOverlayXY().setX(107);
							/*
					            window.n_activeSliderId = 2;
					            var o_sliderNew2 = window.A_SLIDERS[window.n_activeSliderId];
					            o_sliderNew2.f_setValue($('SNChangeValue').value * 1000 / rangeMaxH_SN, 1);
					            window.n_activeSliderId = null;
							*/
					            updateOptions(changelat, 0, 0);
					        } else if (currentBar == bgSl02) {
					            var changelng = Math.round((bgSl02.getOverlayXY().getX() - lngChangePos)
				* rangeMaxH_WE * 2 / 160*100)/100;
					            //$('we_total').value = parseFloat($('we_total').value) + changelng;
					            currentBar = null;
								//复位
					            bgSl02.getOverlayXY().setX(107);
								/*
					            window.n_activeSliderId = 1;
					            var o_sliderNew1 = window.A_SLIDERS[window.n_activeSliderId];
					            o_sliderNew1.f_setValue($('WEChangeValue').value * 1000 / rangeMaxH_WE, 1);
					            window.n_activeSliderId = null;
								*/
					            updateOptions(0, changelng, 0);
					        }
					        else if (currentBar == altitudeBar) {
					            //				alert('333');
					            var changealt =Math.round((altChangePos - altitudeBar.getOverlayXY().getY())
				* rangeMaxV * 2 / 160*100)/100;
					            //$('v_total').value = parseFloat($('v_total').value) + changealt;
					            currentBar = null;
								//复位
					            altitudeBar.getOverlayXY().setY(393);
								/*
                                //右随左动。更改滑动条控件的n-value值
					            window.n_activeSliderId = 0;
					            var o_sliderNew0 = window.A_SLIDERS[window.n_activeSliderId];
					            o_sliderNew0.f_setValue($('newchangeValue').value * 1000 / rangeMaxV, 1);
					            window.n_activeSliderId = null;
								*/
					            updateOptions(0, 0, changealt);
					        }
					      
					    }
					    
					});

}