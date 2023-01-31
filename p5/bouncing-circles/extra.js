/* 
	These are some functions I have found useful. They are nothing special, 
	but they solve annoying programming tasks and may save you the time to look up
	solutions to them. 
*/

/* 
 * This function will take a giving object and make an interactive
 * table that the user can use to manipulate their values.
 * If "Apply settings" is clicked, will run setup() again.
 */
var settings_table_settings;
function addSettingsTable(settings,attach_to="body") {
	if(document.getElementById("settings")) return false; //don't create more than one
	settings_table_settings = settings;
	var o = "<table id='settings_table'>";
	for(var i in Object.keys(settings)) {
		let key = Object.keys(settings)[i];
		o+="<tr><td>";
		o+=key.replaceAll("_"," ")+": ";
		o+="</td><td>";
		console.log(key,typeof settings[key]);
		switch(typeof settings[key]) {
			case "boolean":
				o+="<input type='checkbox' key='"+key+"' id='settings_"+key+"' class='settings_input settings_input_checkbox' "+(settings[key]?"checked ":"")+">";
			break;
			case "number": 
			o+="<input type='text' key='"+key+"' id='settings_"+key+"' class='settings_input settings_input_number' value='"+settings[key]+"'>";
			break;
			default:
				o+="<input type='text' key='"+key+"' id='settings_"+key+"' class='settings_input settings_input_"+(typeof settings[key])+"' value='"+settings[key]+"'>";
			break;
		}
		o+="</td>";
		o+="</tr>";
	}
	o+="</table>";
	o+="<button onclick='apply_settings()'>Apply</button>";
	var d = document.createElement("div");
	d.id = "settings";
	d.innerHTML = o;
	document.querySelector(attach_to).appendChild(d);
}
function apply_settings() {
	for(var i in Object.keys(settings_table_settings)) {
		let key = Object.keys(settings_table_settings)[i];
		switch(typeof settings_table_settings[key]) {
			case "boolean":
				var val = document.getElementById('settings_'+key).checked; //checkbox checked
			break;
			case "number":
				var val = +(document.getElementById('settings_'+key).value); //coerce to number
			break;
			default: 
				var val = (document.getElementById('settings_'+key).value); //don't change
			break;
		}
		settings_table_settings[key] = val;
	}
	setup();
}

/* 
 * A very simple function that checks if two circular objects are touching.
 * It will check the objects for three properties: x, y, and radius. 
 * x and y are the center points of the circle with the supplied radius.
 * Will return 'true' if they are touching/overlapping, 'false' if they are not.
 */ 
function circlesTouching(object1, object2) { 
	let mx = object2.x-object1.x;
	let my = object2.y-object1.y;
	let mdist = sqrt(mx*mx + my*my);
	if(mdist<=(object2.radius + object1.radius)){
		return true;
	} else {
		return false;
	}
}


/* 
 * This function will cause two circular objects, each with movement vectors (vx,vy),
 * to reflect or bounce off of each other. It does this by calculating the angles
 * along which they are touching, and then changing the vectors to the inverse
 * of those. It requires that each object supplied have the following properties:
 * x,y (center coordinates), vx,vy (movement vectors), radius (circle radius).
 */
function circlesReflect(object1, object2) {
	let mx = object2.x-object1.x;
	let my = object2.y-object1.y;
	let mangle = atan2(my,mx);
	
	let targetX = object1.x + cos(mangle)*((object1.radius>object2.radius?object1.radius:object2.radius)*2);
	let targetY = object1.y + sin(mangle)*((object1.radius>object2.radius?object1.radius:object2.radius)*2);
	let ax = (targetX - object2.x);
	let ay = (targetY - object2.y);
	object1.vx-=ax;
	object1.vy-=ay;
	object2.vx+=ax;
	object2.vy+=ay;
}

/* 
 * This function will return 'true' if a mouse click is within the bounds of a circular
 * object as defined by its x,y (center position) and radius properties. To work, this
 * requires that a global variable called mouseClick be declared, and set to 'true'
 * in the mouseClicked() function. It also will require mouseClick to be set to 'false'
 * at the end of every draw() cycle to work.
 */
function circleClicked(object) {
	if(mouseClick) {
		let mx = mouseRealX()-object.x; 
		let my = mouseRealY()-object.y;
		let mdist = sqrt(mx*mx + my*my);    
		if(mdist<=object.radius) return true;
	}
	return false;
}

/*
 * This function will return the correct mouse X location on the Canvas within a window.
 */
function mouseRealX() {
	return mouseX-(window.scrollX);
}
/*
 * This function will return the correct mouse Y location on the Canvas within a window.
 */
function mouseRealY() {
	return mouseY-(window.scrollY);
}


/*
	This is function is an implementation of the Disk Point Picking algorithm, 
	which will distribute points randomly over a given circular disk. To use it,
	give it the coordinates of your disk (two central position coordinates, and the
	diameter of the disk), and it will return two random coordinates within the disk that,
	if you generate a lot of them, will be evenly distributed along the surface.
	It will return an object with the new coordinates as property x and y.
	For more on Disk Point Picking, see: https://mathworld.wolfram.com/DiskPointPicking.html
*/
function diskPointPicking(diskCenterX,diskCenterY,diskDiameter) {
	let a = random(0,1);
	let b = random(0,1);
	if(b<a) { //swap a/b
		var c = a;
		a = b;
		b = c;
	}
	let x = b*(diskDiameter/2)*cos(2*PI*a/b)+(diskCenterX);
	let y = b*(diskDiameter/2)*sin(2*PI*a/b)+(diskCenterY);
	return {'x':x,'y':y};
}

/* 
	This function will translate a given angle (in degrees) and speed 
	into a movement vector (vx,vy) in whatever units the speed unit is in.
	Returns an object with properties vx and vy.
*/
function vector_from_angle_and_speed(angle_degrees,speed) {
	return {'vx':  cos(radians(angle_degrees)) * speed, 'vy': -(sin(radians(angle_degrees)) * speed)};
}

/* 
	This function will check each object in an array of objects for a supplied property
	and return a new array of the same objects where the property is a supplied value. So it will
	weed out any objects that are not 'alive', for example.
*/
function cleanupObjects(object_array,property_name,property_value = true) {
	let new_arr = [];
	for(var i in object_array) {
		if(object_array[i][property_name]==property_value) new_arr.push(object_array[i]);
	}
	return new_arr;
}

console.log('extra.js loaded'); //useful for debugging, to see load order