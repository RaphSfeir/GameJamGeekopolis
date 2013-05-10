(function (window) {

	Player = function(params){
		this.initialize(params);
	}
	var p = Player.prototype
// static public properties:
	Player.path = 'img/sprites/';
	
// public properties:
	p.position = {x:null, y:null, rotation: 90};
// constructor:
	p.initialize = function (params) {
		this.load(params);

	}

// public methods:

	p.tick = function (event) {
	}

	p.load = function(params){
		var imgMonsterAIdle = new Image();
    	imgMonsterAIdle.src = "img/sprites/MonsterAIdle.png";
		var imgMonsterARun = new Image();
    	imgMonsterARun.src = "img/sprites/MonsterARun.png";
    	imgMonsterARun.onload = function() {
			var spriteSheet = new _.SpriteSheet({
				// image to use
				images: [imgMonsterARun], 
				// width, height & registration point of each sprite
				frames: {width: 64, height: 64, regX: 32, regY: 32}, 
				animations: {    
				walk: [0, 9, "walk", 4]
				}
			});
			var spriteSheetIdle = new _.SpriteSheet({
			    images: [imgMonsterAIdle],
			    frames: { width: 64, height: 64, regX: 32, regY: 32 }, 
			    animations: {
			        idle: [0, 10, "idle", 4]
			    }
			});
			// create a BitmapAnimation instance to display and play back the sprite sheet:
			bmpAnimation = new _.BitmapAnimation(spriteSheet);

			// start playing the first sequence:
			bmpAnimation.gotoAndPlay("walk");     //animate
			    
			// set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
			// of animated rats if you disabled the shadow.
			bmpAnimation.shadow = new _.Shadow("#454", 0, 5, 4);

			bmpAnimation.name = "monster1";
			bmpAnimation.direction = 90;
			bmpAnimation.vX = 1;
			bmpAnimation.x = 16;
			bmpAnimation.y = 32;
			        
			// have each monster start at a specific frame
			bmpAnimation.currentFrame = 0;
			cPlayground.addChild(bmpAnimation);
			cPlayground.update(); 
			console.log(cPlayground); 
		}


		// var spriteSheet = new createjs.SpriteSheet({
		//     // image to use
		//     images: [imgMonsterARun], 
		//     // width, height & registration point of each sprite
		//     frames: {width: 64, height: 64, regX: 32, regY: 32}, 
		//     animations: {    
		//         walk: [0, 9, "walk"]
		//     }
		// });
		// console.log("add player"); 
		// cPlayground.addChild(this);
		// cPlayground.update();
	}
	window.Player = Player;

}(window));
