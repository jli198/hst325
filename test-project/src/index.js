import Phaser from 'phaser'; //loads Phaser library

/* now we import all of the different "scenes"...*/
import Preloader from './scenes/Preloader.js'; //Loads assets
import MainScene from './scenes/MainScene.js'; //Loads our 'main' scene 

/* the config object gives some basic info to Phaser */
const config = {
	type: Phaser.AUTO,
	parent: 'phaser',
	width: 640, /* width, in pixels, of the game */
	height: 360, /* height, in pixels, of the game */
	pixelArt: true, /* these settings make it so it isn't blurry */
	antialias: false, 
	roundPixels: true, /* if your pixel art seems 'warped' make sure this is true! */ 
	scene: [Preloader,MainScene], /* this tells it where to start */
};

/* this now creates and starts the game */
const game = new Phaser.Game(config);