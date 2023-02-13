import { Loader } from "phaser"; // This is necessary if we want to show a loading screen


/*
 *	Preloads all assets, and shows progress as it loads them. Anything loaded here doesn't
 *  need to be loaded later.
 */

export default class Preloader extends Phaser.Scene {
	constructor (){
			super("Preloader"); //this is the key so Phaser knows what scene this is
	}
	//if we needed to run something immediately on loading, we'd put it here
	init() {
		console.log('Preloader');
	}

	preload () {
		//load image asset json file, so we know which images to load
		this.load.json('images', 'images.json');
	}

	create () {
		//this is where the size of the game is stored
		var width = this.sys.game.scale.baseSize.width;
		var height = this.sys.game.scale.baseSize.height;

		//text format
		var fmt = {
			fontFamily:"Courier New",
			fontSize: "18pt",
			color:"#d0d0d0",
			align:'center'
		};

		//create a new text object at center of screen
		this.loadText = this.add.text(width/2, height/2, 'Loading... 0%', fmt).setOrigin(0.5,0.5);

		//get the images JSON file that was preloaded, load into a variable
		var images = this.cache.json.get('images');

		//set the assets directory
		var assets_dir = "assets";
		this.load.setPath(assets_dir);

		//add all images from the JSON file into the Phaser loader
		for(var i in images) {
			this.load.image(images[i]);
		}

		//create event to run whenever an asset has been loaded
		this.load.on("progress",function(progress) {
			//note that when we are in a function, "this" means the loader
			//so we have to use this.scene to reference the original scene
			//that we referenced with "this" before. phew!
			this.scene.loadText.setText("Loading... "+Math.round(progress*100+1)+"%");
		})

		//create an event to run when all assets loaded
		this.load.on('complete', function () {
			this.scene.loadText.destroy();
			this.scene.scene.start("MainScene"); //now start scene MainScene
		})

		//having told it what to do, start the loader!
		this.load.start();

	}
}
