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

var settings = {
	canvasWidth: 1000,
	canvasHeight: 800,
	numberOfAtoms: 1000,
	radiusAtoms: 5,
	radiusNeutrons: 1,
	numberOfNeutronsPerFission: 2,
  fissionProbability: 10,
	neutronSpeed: 5,
	neutronLife: 10,
	initialNeutrons: 1,
	enrichment: 80,
	explosionRadius: 10,
	explosionMaxLife: 5,
	explosionMinRadius: 1,
	diskDiameter: 500
}

var atoms = [];
var neutrons = []; 
var explosions = [];

function preload() {
  sound = loadSound("vine-boom.mp3");
}

/* setup() is run once, upon starting up the code */
function setup() {
	console.log("setup() is running");
	createCanvas(settings.canvasWidth,settings.canvasHeight); //create the canvas and specify its dimensions (in pixels)
	frameRate(60); //how many times draw() is called per second 

	addSettingsTable(settings);

	atoms = [];
	neutrons = [];
	explosions = [];

	for(var i = 0; i<settings.numberOfAtoms; i++) {
		var position = diskPointPicking(width/2,height/2,settings.diskDiameter);

		if(random(0,100)<settings.enrichment) {
			var atomType = 0;
		}
    else if(random(0, 100)<settings.fissionProbability) { // set some atoms to be primed to be fissioned
      var atomType = 3;
    }
    else {
			var atomType = 1;
		}
		atoms.push(new Atom({
			radius: settings.radiusAtoms,
			x: position.x,
			y: position.y,
			type: atomType
		})
		)
	}
	for(var i = 0; i<settings.initialNeutrons; i++) {
		neutrons.push(new Neutron({
				x: width/2,
				y: height/2
			})
		) 
	}
}

/* draw() is run over and over again, based on the frameRate() setting in setup() */
/* be careful about putting logging functions here -- they can flood your console! */
function draw() {
	
	background(0); //paint the canvas black -- notice what happens if you comment this line out

	for(var i in neutrons) {
		neutrons[i].draw(); // run the draw() function
	}

	for(var i in atoms) {
		atoms[i].draw(); //run the draw() function 
	}

	for(var i in explosions) {
		explosions[i].draw(); //run the draw() function 
	}

	atoms = cleanupObjects(atoms,"alive",true);
	neutrons = cleanupObjects(neutrons,"alive",true);
	explosions = cleanupObjects(explosions,"alive",true);

}

class Atom {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.vx = 0;
		this.vy = 0;
		this.radius = args.radius; 
		this.alive = true; 
		this.type = args.type;
	}

	draw() {
		if(this.alive == false) return; 
		this.x=this.x+this.vx;
		this.y=this.y+this.vy;
		if(this.type==0) {
			stroke("blue");
			fill("navy");
		} 
    else if(this.type==1) {
			stroke("red");
			fill("brown");		
		} 
    else if(this.type==2) {
			stroke("brown");
			fill("purple");
		}
    else if (this.type==3) {  // if an atom is fission ready, it will initiate the fission submethod below 
      this.fission();
    }
		circle(this.x,this.y,this.radius*2);
	}

	fission() {
		this.alive = false;
		for(var i = 0; i<settings.numberOfNeutronsPerFission; i++) {
			neutrons.push(new Neutron({x:this.x, y:this.y}));
		}
		explosions.push(new Explosion({x: this.x, y: this.y}));
	}
}

class Neutron {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		var nv = vector_from_angle_and_speed(random(0,359),settings.neutronSpeed);
		this.vx = nv.vx;
		this.vy = nv.vy;
		this.life = settings.neutronLife;
		this.radius = settings.radiusNeutrons; 
		this.alive = true; 
	}

	draw() {

		if(this.alive == false) return; 
		this.life = this.life - 1;

		if(this.life<=0) this.alive = false;
		if(this.alive == false) return; 

		this.x=this.x+this.vx;
		this.y=this.y+this.vy;

		for(var i in atoms) {
			if(atoms[i].alive) {
				if(circlesTouching(this, atoms[i])) {
					this.alive = false;
					if(atoms[i].type==0) {
						atoms[i].fission();
            sound.play();                     // play vine-boom.mp3 when each neutron hits. much less annoying than in fission() method
					} 
          else {
						atoms[i].type = 2;
					}
				}
			}
		}
		if(this.alive == false) return; 

		stroke("silver");
		fill("white");
		circle(this.x,this.y,this.radius*2);
	}
}

class Explosion {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.maxLife = settings.explosionMaxLife;
		this.life = this.maxLife;
		this.radius = settings.explosionMinRadius;
		this.alive = true;
	}
	draw() {
		if(this.alive == false) return;
		this.life = this.life-1;
		if(this.life<=0) this.alive = false;
		if(this.alive == false) return;
		var lifePercent = this.life/this.maxLife;
		this.radius = lerp(settings.explosionMinRadius,settings.explosionRadius,lifePercent);
		
		noStroke();
		fill("white");
		circle(this.x,this.y,this.radius*2);
	}
}