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
	p.jumpSpeed = 24.4 ; 
	p.speedX = 1 ; 
	p.limitSpeedX = 3.58 ; 
	p.limitSpeedY = 15.7 ; 
	p.currentBonus = 0 ; 
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
    drawnDialog = new _.Bitmap() ; 

// constructor:
	p.initialize = function (params) {
		this.load(params);

	}

// public methods:

	p.tick = function (event) {
		this.controlsBehavior(); 
		this.applyPhysics();
		this.limitVelocity();  
		this.collideObjects() ; 
		this.drawRender() ; 
		this.testDie() ; 
		if (!keyIsUp) this.canJump = true ; 
	}
	p.testDie = function() {
		if (this.y >= LIMIT_DEATH_Y) {
			console.log("Die !") ;
			this.x = initPosition.x ; 
			this.y = initPosition.y ; 
			if (game._currentUniverse == 1) game.switchUniverse(); 
		}
	}

	p.endGame = function() {
		alert("end") ; 
	}

	p.pickupBonus = function () {
		this.currentBonus++ ; 
		if (this.currentBonus == bonusToPick) {
			if (game._currentLevel == finalLevel) {
				this.endGame() ; 
			}
			else {
				this.currentBonus = 0 ; 
				bonusToPick = 1 ; 
				game.setLevel(game._currentLevel + 1);
				this.setPosition(initPosition); 
			}
		}
	}

	p.setPosition = function(params) {
		this.x = params.x ;
		this.y = params.y ;
	}

	p.erraseDialogs = function () {
		dialogContainer.removeAllChildren() ; 
	}

	p.loadDialog = function(dialog, pnj) {
		console.log(dialog); 
		drawnDialog = new _.Bitmap("img/dialogs/mygod.png");
		drawnDialog.x = pnj.x ; 
		drawnDialog.y = pnj.y - 150; 
		console.log(drawnDialog); 
		dialogContainer.addChild(drawnDialog);
		console.log(cPlayground) ; 
		cPlayground.update() ; 
	}

	p.collideObjects = function() {
		var objectsToSee ;
        var bounds = this.boundingRectangle();
        var centerTile = Math.floor(bounds.center / StaticTile.Width);
        var centerYTile = Math.floor(bounds.centerY / StaticTile.Height);
		if (game._currentUniverse == 0) {
			objectsToSee = objectsList1 ;
		}
		else objectsToSee = objectsList2 ;
		for (var k = 0 ; k < objectsToSee.length ; k++) {
			if (objectsToSee[k]) {
				if (objectsToSee[k].active) {
					if (objectsToSee[k].type == "bonus") {
						if (parseInt(objectsToSee[k]._mapX) == parseInt(centerTile) && parseInt(objectsToSee[k]._mapY) == parseInt(centerYTile)) 
						{
							this.pickupBonus() ; 
							objectsToSee[k].hide() ; 
							objectsToSee[k].active = false; 
						}	
					}
					else if (objectsToSee[k].type == "PNJ") {
					 	if ((objectsToSee[k]._mapX <= centerTile + 1 && objectsToSee[k]._mapX >= centerTile - 1) &&  objectsToSee[k]._mapY <= centerYTile + 1 && objectsToSee[k]._mapY >= centerYTile - 1) 
					 	{
					 		console.log(objectsToSee[k]);

					 		this.loadDialog(objectsToSee[k].dialog, objectsToSee[k]) ; 
						}
						else this.erraseDialogs() ; 
					}
				}
			}
		}
	}

	p.controlsBehavior = function() {
		if (keyIsLeft) {
			if (bmpAnimation.currentAnimation != "walk") {
					if (bmpAnimation.spriteSheet != "run") 
						bmpAnimation.spriteSheet = this.spritesSheets["run"]
				bmpAnimation.gotoAndPlay("walk");
			}
			this.vX -= this.speedX ; 
		}
		else if (keyIsRight) {
			if (bmpAnimation.currentAnimation != "walk_h") {
					if (bmpAnimation.spriteSheet != "run") 
						bmpAnimation.spriteSheet = this.spritesSheets["run"]
				bmpAnimation.gotoAndPlay("walk_h");

			}
			this.vX += this.speedX ; 
		}
		else {
			if (bmpAnimation.currentAnimation != "idle") {
				console.log(bmpAnimation.currentAnimation);
				bmpAnimation.spriteSheet = this.spritesSheets["idle"]
				bmpAnimation.gotoAndPlay("idle");
				console.log("idle"); 
			}
			this.vX = 0 ; 
		}
		if (keyIsUp) {
			this.doJump() ; 
		}
	}

	p.limitVelocity = function () {
		if (this.vX > this.limitSpeedX) this.vX = this.limitSpeedX ; 
		else if (this.vX < -this.limitSpeedX) this.vX = - this.limitSpeedX;
		if (this.vY > this.limitSpeedY) this.vY = this.limitSpeedY ; 
		else if (this.vY < -this.limitSpeedY) this.vY = - this.limitSpeedY;
		if (this.x > LIMIT_MAX_X) {
			if (this.vX > 0) {
				this.vX = 0 ;
				this.x = LIMIT_MAX_X ; 
			}
		}
		else if (this.x < LIMIT_MIN_X) {
			if (this.vX < 0) {
				this.vX = 0 ; 
				this.x = LIMIT_MIN_X ; 
			}
		}
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
        var centerY = parseInt(Math.round(this.y)); 
        var top = parseInt(Math.round(this.y - 64));
        var right = parseInt(Math.round(this.x + 32));
        var bottom = parseInt(Math.round(this.y + 64));
        return {left: left, top: top, right: right, bottom: bottom, center:center, centerY: centerY}; 
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
		_.SpriteSheetUtils.addFlippedFrames(this.spritesSheets["run"], true, false, false);
		this.spritesSheets["idle"] = new _.SpriteSheet({
		    images: [imgMonsterAIdle],
		    frames: { width: 64, height: 64, regX: 32, regY: 32 }, 
		    animations: {
		        idle: [0, 9, "idle", 4]
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

		bmpAnimation.name = "monster1";
		bmpAnimation.direction = -90;
		bmpAnimation.vX = 1;
		bmpAnimation.x = this.x = params.x;
		bmpAnimation.y = this.y =  params.y;
		        
		// have each monster start at a specific frame
		bmpAnimation.currentFrame = 0;
		cPlayground.addChild(bmpAnimation);
		cPlayground.update(); 


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
