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
	levelTiles = new Array(); 
	otherLevelTiles = new Array(); 
	g._lastUniverseSwitch = new Date() ; 
	g._universeSwitchCooldown = 100 ; 
	g._currentUniverse = 0 ;
	g._otherUniverse = 1 ;

// constructor:
	this.Container_initialize = this.initialize;	//unique to avoid overiding base class

	g.initialize = function (startLevel) {
		this.setLevel(startLevel); 
    	this.launchTicker(); 
    	//Game events
		$(document).on('click', function(e){
		});
	}

// public methods:
	g.setLevel = function (level) {
		this._currentLevel = level ; 
		this._levelData = {sizeX: 54, sizeY: 45, gravity: 5};
		this.loadLevelData(level); 

		console.log(levelTiles); 
		console.log(otherLevelTiles); 
    	g._player = new Player();
	}

	g.clearLevelData = function () {
		// this._levelTiles = new Array() ; 
		terrainContainer.removeAllChildren(); 
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
						else {
							if (!otherLevelTiles[jX])
								otherLevelTiles[jX] = new Array() ; 
							otherLevelTiles[jX][jY] = new Tile(null, 0, jX, jY, false, 1); 
						}
					}
				}
            	cPlayground.addChild(universeContainer[0]); 
            	cPlayground.addChild(universeContainer[1]); 
            	that.makeUniverseVisible(1, false); 
				}
			}
		}
		txtFile.send(null);
	}
	g.makeUniverseVisible = function(universe, visibility) {
		if (visibility) {
				universeContainer[universe].alpha = 1 ; 
				cPlayground.update() ;
		}
		else {
				universeContainer[universe].alpha = 0.1 ; 
			}
			// universeContainer[universe].visible = visibility ;	
	}

	g.loadLevelData = function (level) {
		levelTiles = new Array() ; 
		var txtFile = new XMLHttpRequest();
		txtFile.open("GET", "levels/level" + level + "-1.txt", true);
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
							if (!levelTiles[jX])
								levelTiles[jX] = new Array() ; 

							levelTiles[jX][jY] = new Tile("wall", 2, jX, jY, false, 0); 
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

	g.switchUniverse = function() {
		var current = new Date();
		var interval = new Date();
		interval.setTime(current.getTime() - g._lastUniverseSwitch.getTime()); 
		if (interval.getMilliseconds() > g._universeSwitchCooldown) {
			g._lastUniverseSwitch = new Date() ; 
		var temp = levelTiles ;
		console.log(levelTiles[1]) ; 
		console.log(otherLevelTiles);  
		levelTiles = otherLevelTiles ; 
		otherLevelTiles = temp ; 
		console.log("switched") ;
			console.log("SWITCH") ; 
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
		if (keyIsEnter) g.switchUniverse() ; 
		g._player.tick();
		renderCanvas();
	}
	window.Game = Game;

}(window));
