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
	g._levelTiles = new Array(); 

// constructor:
	this.Container_initialize = this.initialize;	//unique to avoid overiding base class

	g.initialize = function (startLevel) {
		this.setLevel(startLevel); 
    	this.launchTicker(); 
    	//Game events
		$(document).on('click', function(e){
		});
	}

	g.setLevel = function (level) {
		this._currentLevel = level ; 
		this._levelData = {sizeX: 54, sizeY: 45, gravity: 5};
		this.loadLevelData(level); 
				console.log(this._levelTiles); 
	}

	g.loadLevelData = function (level) {

		var txtFile = new XMLHttpRequest();
		txtFile.open("GET", "levels/level1.txt", true);
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
							if (!that._levelTiles[jX])
								that._levelTiles[jX] = new Array() ; 

							that._levelTiles[jX][jY] = new Tile("wall", 2, jX, jY); 
						}
						else {
							if (!that._levelTiles[jX])
								that._levelTiles[jX] = new Array() ; 
							that._levelTiles[jX][jY] = new Tile(null, 0, jX, jY); 
						}
					}
				}
    			g._player = new Player();
				console.log(this._levelTiles); 
		    }
		  }
		}
		txtFile.send(null);
		

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
        return this._levelTiles[x][y].Collision;
    };

	g.launchTicker = function() {
		_.Ticker.addListener(window);
		_.Ticker.useRAF = true;
		_.Ticker.setFPS(60);
		_.Ticker.addEventListener("tick", this.tick);
	}
// public methods:

	g.tick = function (event) {
		g._player.tick();
		renderCanvas();
	}
	window.Game = Game;

}(window));
