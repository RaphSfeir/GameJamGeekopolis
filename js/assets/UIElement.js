(function (window) {

	UIElement = function(level, src){
		this.initialize(level, src);
	}

	var ui = UIElement.prototype = new _.Bitmap();

// static public properties:
	UIElement.path = 'img/UI/';
	
// public properties:
	ui._X ; 
	ui._Y ; 
	ui._currentMsg ; 
	ui._msgCount ; 
	ui._level ; 
	ui.active = true ;  
// constructor:
	ui.initialize = function (level, src) {
		this.x = MSG_X ; 
		this.y = MSG_Y ; 
		this._currentMsg = 1 ; 
		if (level == 1) {
			this._msgCount = 6 ; 
		}
		else this._msgCount = 0 ; 
		this.load(level, src);
	}

	ui.tick = function () {

	}

	ui.hide = function() {
		this.active = false ; 
		this.visible = false ; 
	}

	ui.load = function(level, src){
		this._level = level ; 

		this.image = new Image();
		this.image.src = UIElement.path + "msg" + this._level + "-" + this._currentMsg + ".png";
		var that = this;
		this.image.onload = function() {
            UIContainer.addChild(that);
			that.addEventListener("click", function(e){
				that.manageClick();
			});
		}
	}
	ui.manageClick = function(){
		if (this._currentMsg <= this._msgCount)
		{
			this._currentMsg++ ; 
			this.image.src = UIElement.path + "msg" + this._level + "-" + this._currentMsg + ".png";
		}
		else {
		//afficher dans le hud en tant que cible potentielle
			this.hide() ; 
			gameActive = true ; 
		}
	}
// public methods:
	window.UIElement = UIElement;

}(window));
