(function (window) {

	function Game(startLevel) {
		this.initialize(startLevel);
	}
	var g = Game.prototype ;
	g._isReady = false;
	g._started = false;
	g._engine = null;
	g._player = null;
	g._tilesMap = []; 
	g._currentLevel ; 
	g._levelData = {};
	finalLevel = 9 ; 
	gameCamera = null ; 
	gameBackground = null ; 
	levelTiles = new Array(); 
	objectsList1 = new Array() ; 
	objectsList2 = new Array() ; 
	initPosition = {x: 330, y:955}
	var objectsI1 = 0 ; 
	var objectsI2 = 0 ; 
	bonusToPick = 1; 
	otherLevelTiles = new Array(); 
	g._lastUniverseSwitch = new Date() ; 
	g._universeSwitchCooldown = 100 ; 
	g._currentUniverse = 0 ;
	g._otherUniverse = 1 ;

// constructor:
	this.Container_initialize = this.initialize;	//unique to avoid overiding base class

	g.initialize = function (startLevel) {
		this.setLevel(startLevel);
    	gameBackground = new Background("city5");
    	gameCamera = new Camera() ; 
    	this.launchTicker(); 
    	g._player = new Player(initPosition);
    	//Game events
		$(document).on('click', function(e){
		});
	}

	g.loadMessage = function(level) {
		console.log("load message"); 
		var msg = new UIElement(level, "msg1-1");
	}

// public methods:
	g.setLevel = function (level) {
		gameActive = false ; 
		messagesActive = true ; 
		g.loadMessage(level); 
		if (this._currentUniverse == 1) game.switchUniverse(); 
		this.clearLevelData(); 
		this._currentLevel = level ; 
		this._levelData = {sizeX: 53, sizeY: 54};
		this.loadLevelData(level); 

	}

	g.clearLevelData = function () {
		levelTiles = new Array() ; 
		otherLevelTiles = new Array() ; 
		objectsList1 = new Array() ; 
		objectsList2 = new Array() ;
		universeContainer[0].removeAllChildren();
		universeContainer[1].removeAllChildren();
	}
	g.loadOtherUniverse = function(level) {
		otherLevelTiles = new Array() ; 
		var txtFile = new XMLHttpRequest();
		txtFile.open("GET", "levels/level" + level + "-2.txt", true);
		var that = this ; 
		txtFile.onreadystatechange = function() {
		  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		    if (txtFile.status === 200) {  // Makes sure it's found the file.
				var levelData = "                                                                                    ##########                                       ######                                          \n                                                                        \n                 ########################### \n"; 
				levelData = txtFile.responseText; 
				
				for (var jY = 0 ; jY < that._levelData.sizeY ; jY++) {
					for (var jX = 0 ; jX < that._levelData.sizeX ; jX++) {
						var currentTile = jY * that._levelData.sizeX + jX ; 
						if (levelData[currentTile] == "#") {
							if (!otherLevelTiles[jX])
								otherLevelTiles[jX] = new Array() ; 

							otherLevelTiles[jX][jY] = new Tile("wall", 2, jX, jY, false, 1); 
						}
						else if (levelData[currentTile] == "O") {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							objectsList2[objectsI2] = new ObjectInter("bonus", jX, jY, 1); 
							objectsI2++ ; 
						}
						else if (levelData[currentTile] == "1") {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							objectsList2[objectsI2] = new ObjectInter("PNJ", jX, jY, 1); 
							objectsI2++ ; 
						}
						else {
							if (!otherLevelTiles[jX])
								otherLevelTiles[jX] = new Array() ; 
							otherLevelTiles[jX][jY] = new Tile(null, 0, jX, jY, false, 1); 
						}
					}
				}
            	cPlayground.addChild(universeContainer[0]); 
            	cPlayground.addChild(universeContainer[1]); 
            	cPlayground.addChild(dialogContainer); 
            	cPlayground.addChild(UIContainer); 
            	that.makeUniverseVisible(1, false); 
				}
			}
		}
		txtFile.send(null);
	}
	g.makeUniverseVisible = function(universe, visibility) {
		universeContainer[universe].visible = visibility ;	
	}

	g.loadLevelData = function (level) {
		levelTiles = new Array() ; 
		var txtFile = new XMLHttpRequest();
		txtFile.open("GET", "levels/level" + level + "-1.txt", true);
		var that = this ; 
		txtFile.onreadystatechange = function() {
		  if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		    if (txtFile.status === 200) {  // Makes sure it's found the file.
				var levelData = ""
				levelData = txtFile.responseText; 
				
				for (var jY = 0 ; jY < that._levelData.sizeY ; jY++) {
					for (var jX = 0 ; jX < that._levelData.sizeX ; jX++) {
						var currentTile = jY * that._levelData.sizeX + jX ; 
						if (levelData[currentTile] == "#") {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							levelTiles[jX][jY] = new Tile("wall", 2, jX, jY, false, 0); 
						}
						else if (levelData[currentTile] == "O") {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							objectsList1[objectsI1] = new ObjectInter("bonus", jX, jY, 0); 
							objectsI1++ ; 
						}
						else if (levelData[currentTile] == "1") {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							objectsList1[objectsI1] = new ObjectInter("PNJ", jX, jY, 0); 
							objectsI1++ ; 
						}
						else {
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 
							levelTiles[jX][jY] = new Tile(null, 0, jX, jY, false, 0); 
						}
					}
				}
				that.loadOtherUniverse(level) ; 
				}
			}
		}
		txtFile.send(null);
		

	}

	g.switchUniverse = function(switchUniverseGravity) {
		console.log(gameActive); 
		var current = new Date();
		var interval = new Date();
		var tempGravity; 
		interval.setTime(current.getTime() - g._lastUniverseSwitch.getTime()); 
		if (interval.getMilliseconds() > g._universeSwitchCooldown) {
			g._lastUniverseSwitch = new Date() ; 
			var temp = levelTiles ;
			levelTiles = otherLevelTiles ;
			tempGravity = GravityAcceleration ;  
			if (switchUniverseGravity) {
				GravityAcceleration = GravityAcceleration2 ; 
				GravityAcceleration2 = tempGravity ; 
			}
			if (g._currentUniverse == 0) 
    			gameBackground.setBackgroundSrc("city6");
    		else gameBackground.setBackgroundSrc("city5");
			otherLevelTiles = temp ; 
            this.makeUniverseVisible(g._currentUniverse, false); 
            this.makeUniverseVisible(g._otherUniverse, true); 
            var temp = g._otherUniverse ; 
            g._otherUniverse = g._currentUniverse ; 
            g._currentUniverse = temp ; 
		} 	
	}

	g.switchTilesData = function () {
	}

    g.getLevelCollision = function (x, y) {
        // Prevent escaping past the level ends.
        if (x < 0 || x >= this._levelData.sizeX) {
            return 1;
        }
        // Allow jumping past the level top and falling through the bottom.
        if (y < 0 || y >= this._levelData.sizeY) {
            return 0;
        }
        return levelTiles[x][y].Collision;
    };

	g.launchTicker = function() {
		_.Ticker.addListener(window);
		_.Ticker.useRAF = true;
		_.Ticker.setFPS(60);
		_.Ticker.addEventListener("tick", this.tick);
	}

	g.tick = function (event) {
		if (gameActive) {
			if (keyIsEnter && canSwitchUniverse) {
				canSwitchUniverse = false ;
				g.switchUniverse() ; 
				console.log("switch"); 
				console.log(gameActive); 
			}
			g._player.tick();
			for (var k = 0 ; k < objectsList1.length ; k++) {
				if (objectsList1[k])
					objectsList1[k].tick() ; 
			}
			for (var u = 0 ; u < objectsList2.length ; u++) {
				if (objectsList2[u])
					objectsList2[u].tick() ; 
				
			}
			universeContainer[0].setTransform(-gameCamera.x, -gameCamera.y) ; 	
			universeContainer[1].setTransform(-gameCamera.x, -gameCamera.y) ;  
			dialogContainer.setTransform(-gameCamera.x, -gameCamera.y) ;  
			gameCamera.tick() ; 
			gameBackground.tick();
			renderCanvas();
		}
		else if (messagesActive) {
			renderCanvas();

		}
	}
	window.Game = Game;

}(window));
