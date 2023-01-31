/* 
	This is where you put your p5.js Javascript code (your "sketch"). 
	
	I have filled in some demo code just to get you started in setting up a sketch,
	and creating a class. You can delete it or modify it as you see fit. 

	Please feel free to make use of the p5.js reference documentation:
		- https://p5js.org/reference/

	As well their examples:
		- https://p5js.org/examples/
	
	p5.js can be anything covered by the normal Javascript specification, plus
	whatever is included in the specifics of the p5.js specification. 
	
	If, after editing this file, you don't see your changes being implemented when
	you load it in the browser, hold down Shift and click Reload in your browser
	to force it to re-download the script code. 
	
	You can also always look at the Javascript console in your browser to see if
	there are any errors, and use console.log() to send messages to the console,
	which are useful for tracking what is and isn't running, or debugging variables.
	
	If you find the in-class discussion of the below trivially easy, here are a few
	extra challenges to try (in order of difficulty): 
		- Make it so that the text changes color ever time it bounces!
		- Make it so that a number of bouncing texts are spawned instead of one!
		-	Make it so that the moving text creates fading shadows behind it as it goes!
		- Fix the bouncing function so that it is pixel perfect (so the text can't exceed 
			the canvas bounds, no matter what its movement vector is set to)!
		- Make it so that your multiple bouncing texts bounce off of each other as well as
			the canvas bounds!
*/
console.log("sketch.js is loaded and running"); //an example of a logging function

/* Globals */
// Any variables declared here are available to all functions, because they are outside
// of the "scope" of any individual function. Any variables declared with var, let, 
// or const within a function are only available to that function. Try to use globals
// sparingly, but don't be afraid to use them if you need them!

let bouncing_circle = []; //our bouncing text object


/* setup() is run once, upon starting up the code */
function setup() {
	console.log("setup() is running");
	createCanvas(680,480); //create the canvas and specify its dimensions (in pixels)
	frameRate(60); //how many times draw() is called per second 
	
	//DEMO CODE:
	//create a new bouncingCircle() object, assign it to the global variable bouncing_circle.
	//note that we create this once, in setup(), so we can then access it in draw();
	//note that "width" is a global created by p5.js and contains width of the canvas,
	//and "height" contains the height. Feel free to chance these settings and see
	//what happens. We are, for this example, passing the settings as an object. We
	//could pass them all individually as one long string of arguments to the function,
	//but this way lets us see exactly what each of these variables are corresponding to.
	
  for(var i = 0; i < random(10, 50); i++) {
    bouncing_circle.push(new bouncingCircle({
      size: 32,
      color: color(random(255),random(255),random(255)),
      x: width/2,
      y: height/2,
      d: 10,
      vx: random(-3,3), //random() is a p5 function that returns a random float within
      vy: random(-3,3)  //the bounds of min,max passed to it.
    }));
  }
}


/* draw() is run over and over again, based on the frameRate() setting in setup() */
/* be careful about putting logging functions here -- they can flood your console! */
function draw() {
	
	background(0); //paint the canvas black -- notice what happens if you comment this line out
	for(var i in bouncing_circle) {
    bouncing_circle[i].draw(); //run the draw() function of the bouncingCircle object we created	
  }
}

//A very simple and naive implementation of a bouncing text string object
class bouncingCircle {
	
	//constructor() is what initializes the class and its variables
	constructor(args) {
		console.log("new bouncingCircle created");
		/*	For our constructor, we need to make sure the new object has the right properties.
				In this case, we are expecting the programmer to pass them as properties of an
				object called 'args'. We are now transferring the properties of the 'args' object
				to the 'this' object, so that they stick around with this object after constructor()
				finishes running. Note that if the programmer doesn't pass these properties along, it
				could create problems unless we set things up to accommodate that! (see below)
				BTW, there are more efficient/automatic ways to do this 'transferring' of properties, 
				but if you are starting out, being very deliberate and obvious is probably the best!
		*/

		/*	Note the use of the keyword 'this' below. 'this' means "whatever object this
				particular piece of code is part of. So its definition changes depending on
				what code is being written. In this case, it means the bouncingCircle object that
				has been created, so assigning a value to this.text is the same as assigning 
				it to bouncing_circle.text. The useful part about using 'this' is that if we created
				a lot of bouncingCircle objects, we wouldn't need to know their individual variable names.
		*/

		this.text = args.text;
		this.size = args.size;
		this.x = args.x;
		this.y = args.y;
    this.d = args.d;
		this.vx = args.vx;
		this.vy = args.vy;

		/* Here is an example of how to deal with the possibility that you might not
		   include a given argument -- e.g., setting defaults, so that no error is triggered. */
		if(args.color == undefined) { //any variable not declared will be "undefined"
			this.color = color(255,255,255); //since it is undefined, we give it an RGB color (255,255,255 = white)
		} else {
			this.color = args.color; //but if it is not undefined, we use what argument is provided
		}
		/* 	The above code is written in a maximally lengthy way, so the logic of it is clear.
		 	 	A more compact way to write the above, using a ternary operator, would be:
					this.color = (args.color==undefined)?color(255,255,255):args.color; 
				The ternary operator is the question mark and colon. The syntax is basically:
					condition?true:false;
				Where whatever value is supplied for `true` is returned if the condition evaluates
				to true, and if not, whatever is supplied for `false` will be returned. The only
				advantange this has to the longer version is compactness, which if you are assigning
				a lot of variables this way, can be convenient. The disadvantage is that it is
				easy to make typos and can be tough to see what's going on with them!
		*/
		
	}
	
	//now the function that I call from the main draw() loop. note that I have to call it
	//explicitly from the main draw() loop! also note that I could break this into sub-functions
	//if I wanted to -- e.g., calculating the movement different than the appearance -- which
	//for a more complicated program might be easier to keep track of.
	draw() {
		//formatting the text -- we do this each time because the program might have 
		//done other things with these settings, and we shouldn't take for granted they
		//will be what we originally set them to.
		stroke(random(255),random(255),random(255)); // trace the outline of the balls
		
			
		fill(this.color); //fill the color of the balls

		//change the location of the text by adding the vector to the current location
		this.x+=this.vx;
		this.y+=this.vy;

		//calculate whether the new text position exceeds the bounds, and if so,
		//reverse the sign of the vector (which "bounces" it). this is very simplistic and can
		//lead to situations where the text overshoots the boundary by a tiny bit if 
		//the vectors are anything but 1. it is just meant as an example.
		//Note: textWidth() is a p5 function that will calculate the pixel width of a
		//given string of text at the current font settings
		let text_width = textWidth(this.d); 
		if(this.x+text_width/2>=width) this.vx*=-1; 
		if(this.x-text_width/2<=0) this.vx*=-1;
		if(this.y-textSize()/2<=0) this.vy*=-1;
		if(this.y>=height) this.vy*=-1;
	
		//now draw the final text object at the right coordinatees
		circle(this.x, this.y, this.d);

	}
}