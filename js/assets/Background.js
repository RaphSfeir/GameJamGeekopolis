(function (window) {

	Background = function(src){
		this.initialize(src);
	}

	var bg = Background.prototype = new _.Bitmap();

// static public properties:
	Background.path = 'img/backgrounds/';

// public properties:
	bg.posXinit ; 
	bg.posYinit ; 
	bg.scaleFactor ; 

// constructor:
	bg.Container_initialize = bg.initialize;	//unique to avoid overiding base class

	bg.initialize = function (src) {
		this.load(src);
	}

// public methods:

	bg.tick = function (event) {
		bg.x = this.posXinit - gameCamera.x / this.scaleFactor  ;
		bg.y = this.posYinit - gameCamera.y / this.scaleFactor - this.height / 2 - 320 ; ;
	}

	bg.setBackgroundSrc = function(newSrc) {
		var src = Background.path+newSrc+".jpg";
		bg.image = new Image() ;
		bg.image.src = src; 
	}

	bg.load = function(src){
		var src = Background.path+src+".jpg";
		bg.image = new Image() ;
		bg.image.src = src; 
		bg.scaleX = 1 ; 
		bg.scaleY = 1 ; 
		bg.scaleFactor = 2 ; 
		bg.posXinit = 0 ; 
		bg.posYinit = 0 ; 
		bg.width = 1800 ; 
		bg.height = 1000 ;
		bg.image.onload = function() {
			cBackground.addChild(bg);
			cBackground.update();
			console.log(bg); 
		}
	}
	window.Background = Background;

}(window));
