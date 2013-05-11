(function (window) {

	Player = function(params){
		this.initialize(params);
	}
	var p = Player.prototype
// static public properties:
	Player.path = 'img/sprites/';
    var StaticTile = new Tile(null, 0, 0, 0);
	
// public properties:
	p.position = {x:null, y:null, rotation: 90};
	p.spritesSheets = []; 
	p.isAlive = true ; 
	p.hasReachedExit = false ; 
	p.direction = 1 ; 
	p.jumpSpeed = 20 ; 
	p.speedX = 1 ; 
	p.limitSpeedX = 3 ; 
	p.limitSpeedY = 13 ; 
	p.vX = 0 ; 
	p.vY = 0 ; 
	p.MoveAcceleration = 1 ; 
	p.canJump = true ; 
	p.previousTileY = 0 ; 
	p.isOnGround = true ; 
    width = parseInt(frameWidth * 0.4);
    left = parseInt((frameWidth - width) / 2);
    height = parseInt(frameWidth * 0.8);
    top = parseInt(frameHeight - height);

// constructor:
	p.initialize = function (params) {
		this.load(params);

	}

// public methods:

	p.tick = function (event) {
		this.controlsBehavior(); 
		this.applyPhysics();
		this.limitVelocity();  
		this.drawRender() ; 
		if (!keyIsUp) this.canJump = true ; 
	}

	p.controlsBehavior = function() {
		if (keyIsLeft) {
			this.vX -= this.speedX ; 
		}
		else if (keyIsRight) {
			this.vX += this.speedX ; 
		}
		else this.vX = 0 ; 
		if (keyIsUp) {
			this.doJump() ; 
		}
	}

	p.limitVelocity = function () {
		if (this.vX > this.limitSpeedX) this.vX = this.limitSpeedX ; 
		else if (this.vX < -this.limitSpeedX) this.vX = - this.limitSpeedX;
		if (this.vY > this.limitSpeedY) this.vY = this.limitSpeedY ; 
		else if (this.vY < -this.limitSpeedY) this.vY = - this.limitSpeedY;
	}

 	/// Gets a rectangle which bounds this player in world space.
    p.doJump = function () {
	    if (this.isOnGround && this.canJump) {
	    	this.vY -= this.jumpSpeed ; 
	    	this.isOnGround = false ;
        	this.previousTileY = null ; 
        	this.canJump = false ; 
    	}
    };

    /// Gets a rectangle which bounds this player in world space.
    p.boundingRectangle = function () {
        var left = parseInt(Math.round(this.x - 32));
        var center = parseInt(Math.round(this.x)); 
        var top = parseInt(Math.round(this.y - 64));
        var right = parseInt(Math.round(this.x + 32));
        var bottom = parseInt(Math.round(this.y + 64));

        return {left: left, top: top, right: right, bottom: bottom, center:center}; 
    };

	p.loadSprites = function () {
		this.spritesSheets["run"] = new _.SpriteSheet({
			// image to use
			images: [imgMonsterARun], 
			// width, height & registration point of each sprite
			frames: {width: 64, height: 64, regX: 32, regY: 32}, 
			animations: {    
			walk: [0, 9, "walk", 4]
			}
		});
		this.spritesSheets["idle"] = new _.SpriteSheet({
		    images: [imgMonsterAIdle],
		    frames: { width: 64, height: 64, regX: 32, regY: 32 }, 
		    animations: {
		        idle: [0, 10, "idle", 4]
		    }
		});
	}

	Player.prototype.applyPhysics = function () {
        if (this.isAlive && !this.hasReachedExit) {

            // Base velocity is a combination of horizontal movement control and
            // acceleration downward due to gravity.
            this.x += this.vX * this.direction;
            this.y += this.vY * this.direction;
            //this.velocity.y = this.DoJump(this.velocity.y);
            this.handleCollisions(); 
        }
    };

    Player.prototype.handleCollisions = function () {
        var bounds = this.boundingRectangle();
        var centerTile = Math.floor(bounds.center / StaticTile.Width);
        var leftTile = Math.floor(bounds.left / StaticTile.Width);
        var rightTile = Math.ceil((bounds.right / StaticTile.Width)) - 1;
        var topTile = Math.floor(bounds.top / StaticTile.Height);
        var bottomTile = Math.ceil((bounds.bottom / StaticTile.Height)) - 1;

        // Reset flag to search for ground collision.
        this.isOnGround = false;
        var groundCollision = game.getLevelCollision(centerTile, bottomTile);
        if (groundCollision == 1) {
        	this.isOnGround = true ; 
        	this.vY = 0 ; 
        }
        else if (groundCollision == 2 && this.vY >= 0) {
        	if ((this.y + TILE_WIDTH)  <= (bottomTile * StaticTile.Height) + INTERVAL_COLLISION && (this.y + TILE_WIDTH) >= (bottomTile * StaticTile.Height) - INTERVAL_COLLISION)
        	{
        		if ((bounds.bottom + this.vY * this.direction) / 1 > bottomTile * StaticTile.Height) {
        			this.y = bottomTile * StaticTile.Height - 32 ; 
		        	this.isOnGround = true ; 
		        	this.vY = 0 ; 
	        	}
        	}
        	else {
        		this.isOnGround = false ; 
        		this.vY += GravityAcceleration ; 
        	}
        }
        else {
        	this.isOnGround = false ; 
        	this.vY += GravityAcceleration ; 
        }
    };

	Player.prototype.drawRender = function () {
		bmpAnimation.x = this.x - gameCamera.x; 
		bmpAnimation.y = this.y - gameCamera.y; 
    };


	p.load = function(params){
		this.loadSprites() ; 
		bmpAnimation = new _.BitmapAnimation(this.spritesSheets["run"]);

		bmpAnimation.gotoAndPlay("walk"); 
		bmpAnimation.shadow = new _.Shadow("#454", 0, 5, 4);

		bmpAnimation.name = "monster1";
		bmpAnimation.direction = 90;
		bmpAnimation.vX = 1;
		bmpAnimation.x = this.x = 320;
		bmpAnimation.y = this.y =  32;
		        
		// have each monster start at a specific frame
		bmpAnimation.currentFrame = 0;
		cPlayground.addChild(bmpAnimation);
		cPlayground.update(); 
		console.log(cPlayground); 


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
