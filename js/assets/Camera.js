(function(window){

	function Camera(position) {
		this._position = null;
		this.initialize();
	};

	Camera.prototype.initialize = function (position) {
		var that = this;
		this._position = (position == undefined) ? {x:0,y:0} : position;
	};
	// public methods:
	Camera.prototype.x = function(x) {
		if(x != undefined){
			this._position.x = x;
			return this;
		}
		else{
			return this._position.x;
		}
	};
	Camera.prototype.y = function(y) {
		if(y != undefined){
			this._position.y = y;
			return this;
		}
		else{
			return this._position.y;
		}
	};
	Camera.prototype.tick = function (event) {
		this.x = game._player.x - frameWidth / 2; 
		this.y = game._player.y - frameHeight / 3; 
		console.log(this.x + " ; "+ this.y); 
	};

	window.Camera = Camera;
}(window));
