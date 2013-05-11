(function (window) {

	ObjectInter = function(src, x, y, universe){
		this.initialize(src, x, y, universe);
	}

	var o = ObjectInter.prototype = new _.Bitmap();

// static public properties:
	ObjectInter.path = 'img/objects/';
	
// public properties:
	o._isRamassable ; 
	o._isPNJ ; 
	o._mapX ; 
	o._mapY ; 
	o._id;
	o.type ;
	o.active = true ;  
// constructor:
	o.initialize = function (src, x, y, universe) {
		this._mapX = x ; 
		this._mapY = y ; 
		this.type = src ; 
		this.x = this._mapX * TILE_WIDTH ; 
		this.y = this._mapY * TILE_HEIGHT ; 
		this.load(src, x, y, universe);
	}

	o.tick = function () {
		if (!isNaN(gameCamera.x)) {
			//this.x = o._mapX * TILE_WIDTH - gameCamera.x ; 
			//this.y = o._mapY * TILE_HEIGHT - gameCamera.y ; 
		}

	}

	o.hide = function() {
		this.active = false ; 
		this.visible = false ; 
	}

	o.load = function(src,x,y, universe){
		this.image = new Image();
		this.image.src = ObjectInter.path+src+".png"; 
		var that = this;
		this.image.onload = function() {
            universeContainer[universe].addChild(that);
		}
	}
// public methods:
	window.ObjectInter = ObjectInter;

}(window));
