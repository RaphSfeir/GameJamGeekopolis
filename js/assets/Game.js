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
		resize();
		this.setLevel(startLevel); 
    	g._player = new Player();
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
		var levelData = "      ######                                          \n                                                                        \n                 ########################### \n"; 
		
		for (var jY = 0 ; jY < this._levelData.sizeY ; jY++) {
			for (var jX = 0 ; jX < this._levelData.sizeX ; jX++) {
				if (levelData[jX] == "#") {
					if (!this._levelTiles[jX])
						this._levelTiles[jX] = new Array() ; 

					this._levelTiles[jX][jY] = new Tile("wall", 2, jX, jY); 
				}
				else {
					if (!this._levelTiles[jX])
						this._levelTiles[jX] = new Array() ; 
					this._levelTiles[jX][jY] = new Tile(null, 0, jX, jY); 
				}
			}
		}
		console.log(this._levelTiles); 

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
