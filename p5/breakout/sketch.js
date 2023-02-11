
console.log("sketch.js is loaded and running"); //an example of a logging function

/* Globals */
// Any variables declared here are available to all functions, because they are outside
// of the "scope" of any individual function. Any variables declared with var, let, 
// or const within a function are only available to that function. Try to use globals
// sparingly, but don't be afraid to use them if you need them!

var settings = {
	blocks_across: 15,
	blocks_down: 8,
	blocks_height: 10,
	blocks_width: 40,
	block_offset_y: 100,

	ball_initial_speed: 10,
	ball_radius: 2,
	
	paddle_height: 10,
	paddle_width: 40,
	paddle_move_speed: 10,

}

var the_ball; 
var the_paddle; 
var block_layers = [];

/* setup() is run once, upon starting up the code */
function setup() {
	console.log("setup() is running");
	createCanvas(settings.blocks_across*settings.blocks_width,800); //create the canvas and specify its dimensions (in pixels)
	frameRate(60); //how many times draw() is called per second 
	
	the_paddle = new Paddle({x: width/2, y: height-settings.paddle_height*3});
	the_ball = new Ball({x: width/2, y: height/2});

	block_layers = [];
	var block_colors = ["red","red","orange","orange","green","green","yellow","yellow"];
	for(var blocks_y = 0; blocks_y < settings.blocks_down; blocks_y++) {
		block_layers[blocks_y] = []; 
		for(var blocks_x = 0; blocks_x < settings.blocks_across; blocks_x++) {

			block_layers[blocks_y].push(new Block({
				x: (settings.blocks_width/2)+settings.blocks_width*(blocks_x),
				y: ((settings.blocks_height/2)+settings.blocks_height*(blocks_y))+settings.block_offset_y,
				color: block_colors[blocks_y]
			}));
		}
	}
	console.log(block_layers);

}


/* draw() is run over and over again, based on the frameRate() setting in setup() */
/* be careful about putting logging functions here -- they can flood your console! */
function draw() {
	
	background(0); //paint the canvas black -- notice what happens if you comment this line out

	if(keyIsDown(LEFT_ARROW)) {
		if(the_paddle.x-the_paddle.width/2>0) the_paddle.x = the_paddle.x - settings.paddle_move_speed;
	}
	if(keyIsDown(RIGHT_ARROW)) {
		if(the_paddle.x+the_paddle.width/2<width) the_paddle.x = the_paddle.x + settings.paddle_move_speed;
	}	

	the_paddle.draw();
	the_ball.draw();
	for(var blocks_y = 0; blocks_y < settings.blocks_down; blocks_y++) {
		for(var blocks_x = 0; blocks_x < settings.blocks_across; blocks_x++) {
			block_layers[blocks_y][blocks_x].draw();
		}
	}	
}

class Block {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.width = settings.blocks_width;
		this.height = settings.blocks_height;
		this.color = args.color;
		this.alive = true; 
	}
	draw() {
		if(this.alive==false) return;
		stroke(0);
		strokeWeight(1);
		fill(this.color);
		rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}
}

class Ball {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		var bv = vector_from_angle_and_speed(270+random(-45,45),settings.ball_initial_speed);
		this.vx = bv.vx;
		this.vy = bv.vy;
		this.radius = settings.ball_radius;
		this.color = color("white");
	}
	draw() {
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;

		//check if we've hit a block
		for(var blocks_y = 0; blocks_y < settings.blocks_down; blocks_y++) {
			for(var blocks_x = 0; blocks_x < settings.blocks_across; blocks_x++) {
				var b = block_layers[blocks_y][blocks_x];
				if(b.alive==true) {
					if(
							(this.y+this.radius >= b.y-b.height/2) &&
							(this.y-this.radius <= b.y+b.height/2) &&
							(this.x-this.radius >= b.x-b.width/2) &&
							(this.x+this.radius <= b.x+b.width/2) 
					) {
						b.alive = false;
						this.vy = this.vy *-1;
						
					}
				}
			}
		}	
		
		//check if we've hit the paddle
		if(
				(this.y+this.radius >= the_paddle.y-the_paddle.height/2) && 
				(this.x-this.radius >= the_paddle.x-the_paddle.width/2) &&
				(this.x+this.radius <= the_paddle.x+the_paddle.width/2)
			) {
			this.vy = this.vy *-1;
		}

		if(this.x-this.radius <= 0) this.vx = this.vx * -1;
		if(this.x+this.radius >= width) this.vx = this.vx * -1;
		if(this.y-this.radius <= 0) this.vy = this.vy * -1;
		if(this.y+this.radius >= height) {
			the_ball = new Ball({x: width/2, y: height/2});
		}

		noStroke();
		fill(this.color);
		circle(this.x,this.y,this.radius*2);

	}

}

class Paddle {
	constructor(args) {
		this.x = args.x;
		this.y = args.y;
		this.width = settings.paddle_width;
		this.height = settings.paddle_height;
		this.color = color("blue");
	}
	draw() {

		noStroke();
		fill(this.color);
		rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

	}
}

 

