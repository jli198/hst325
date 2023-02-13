/*
 *	This is just an example scene. In a real game or simulation, there would
 *  like be many different 'scenes'. A scene is basically any self-contained
 *  part of the game with some kind of visual output. They work by extending
 *  the defult Phaser.Scene object. Note that where it says "MainScene"
 *  below could be the name of any scene, so long as it is initially referenced
 *  in index.js.
 */

export default class MainScene extends Phaser.Scene {
    constructor () {
        super("MainScene");
    }

		//if we needed to run something immediately on loading, we'd put it here
		init() {
      console.log('MainScene');
		}

		//if we needed anything to preload, we'd put it here
		preload() {

		}

		//is meant to create everything the scene needs to run
    create () {

			//set the slogan -- change this!
			var stevensSlogan = "Gamers on the Rise®";

			//create a background image from the asset 'stevens-campus-8bit'
			//we are setting it at position 0,0, and telling it with setOrigin(0) that this
			//is the top left of the image. we are also setting its alpha property to 0
			var background = this.add.image(0, 0, 'stevens-campus-8bit').setOrigin(0).setAlpha(0);

			//tweens are animations -- here we are saying, make the alpha property
			//of the background be equal to 1.0, and take 500 ms for this, and
			//start immediately (0 delay)
			this.tweens.add({
				targets: [background],
				alpha: 1.0,
				delay: 0,
				duration: 500
			})

			//create the textWelcome images
			var textWelcome = this.add.image(250,-38,'welcome-to').setDepth(10).setOrigin(0).setVisible(true)

			//another tween -- this one moves the welcome text down
			//by adjusting the y property
 			this.tweens.add({
				targets: [textWelcome],
				delay: 600,
				duration: 1000,
				y: 130
			})

			//create the "Stevens" signature image
			var stevensSig = this.add.image(70,100,"stevens-sig").setOrigin(0);
			stevensSig.setCrop(0,0,0,174); //set the crop to be the height of the image, but no width

			var cropObj = {width:0}; //create an object to manipulate the tween of
			this.tweens.add({
				targets: [cropObj],
				delay: 1600,
				duration: 1000,
				width: 516, //max width of image
				onUpdate: function() {
					stevensSig.setCrop(0,0,cropObj.width,174) //set the crop
				}
			})

			//format text for slogan
			var fmt = {
				fontFamily: "Times New Roman",
				fontSize: "28pt",
				align: "center",
				color: "#ffffff",
				fontStyle: "italic"
			}

			//create the text objects off screen
			var textTagline = this.add.text(320,400,stevensSlogan,fmt).setOrigin(0.5,0.5).setDepth(10);
			var textTagline2 = this.add.text(textTagline.x+2,textTagline.y+2,stevensSlogan,{...fmt,...{color: "#992a44"}}).setOrigin(0.5,0.5);

			//and move them up once the right amount of time has passed so that the
			//signature is revealed.
			this.tweens.add({
				targets: [textTagline],
				delay: 2100,
				duration: 1500,
				y: 290,
				onUpdate: function() {
					textTagline2.setY(textTagline.y+2);
				}
			})
    }
}
