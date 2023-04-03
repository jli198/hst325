//useful conversions
var mi2km = 1.60934;
var mi2m = 1609.34;
var km2ft = 3280.84;
var m2ft = 3.28084;
var ft2m = 0.3048;
var ft2km = 0.0003048;
var ft2mi = 0.000189394;
var m2mi = 0.000621371;
var mi2ft = 5280;
var km2mi = 0.621371;
var m2km = 1/1000;
var km2m = 1000;
var rad2deg = 180/Math.PI;
var deg2rad = Math.PI/180;

// 'improve' Math.round() to support a second argument
var _round = Math.round;
Math.round = function(number, decimals /* optional, default 0 */) {
  if (arguments.length == 1)
    return _round(number);
  var multiplier = Math.pow(10, decimals);
  return _round(number * multiplier) / multiplier;
}

/* Adds commas to a number string */
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

/* Verbose translation of kt depending on units */
function ktOrMt(kt,shortform = false,comma = false,pluralize=false) {
	var yield;
	var unit;
	if(kt>=1000) {
		yield = kt/1000;
		unit = (shortform?"Mt":"megaton");
	} else if (kt<1) {
		yield = kt*1000;
		unit = (shortform?"t":"ton");
	} else {
		yield = kt;
		unit = (shortform?"kt":"kiloton");
	}
	if(yield!=1 && pluralize==true && shortform == false) {
		unit+="s";
	}
	if(comma) yield = addCommas(yield);
	return yield+" "+unit;
}



//simple linear interpolation -- returns x3 for a given y3
function lerp(x1,y1,x2,y2,y3) {
	if(y2==y1) {
		return false; //division by zero avoidance
	} else {
		return ((y2-y3) * x1 + (y3-y1) * x2)/(y2-y1);
	}
}