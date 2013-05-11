(function (window) {

	ObjectInter = function(params){
		this.initialize(params);
	}

	var o = ObjectInter.prototype = new _.Bitmap();

// static public properties:
	ObjectInter.path = 'img/objects/';
	
// public properties:
	o._isRamassable ; 
	o._isPNJ ; 
	o._id;
// constructor:
	o.initialize = function (params) {
		this.setMapCoords({x: params.x, y: params.y});
		this.load(params.src);
		this._life = this._lifeLeft = params.life;
	}

	o.load = function(src){
		this.image = new Image();
		this.image.src = ObjectInter.path+src; 
		var that = this;
		this.image.onload = function() {
			cPlayground.addChild(that);
			console.log(that) ; 
		}
	}
// public methods:
	window.ObjectInter = ObjectInter;

}(window));
