/*
Ficher des variables globales accessibles à l'ensemble du projet.
*/

//liste des code de touche clavier
window._ = window.createjs;
var KEY = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SPACE: 32,
		ENTER: 13,
		ESC: 27,
		PAUSE: 80,
		"0": 96,
		"1": 97,
		"2": 98,
		"3": 99,
		"4": 100,
		"5": 101,
		"6": 102,
		"7": 103,
		"8": 104,
		"9": 105
	};
	//objet mouse contenant les variables de déplacement de la souris
	// Déjà pris en charge avec easelJS ?
var mouse = {
	x: 0,
	y: 0,
	dx: 0,
	dy: 0,
	ox: 0,
	oy: 0,
	up: true,
	down: false
};
LIMIT_MAX_X = 1500 ; 
LIMIT_MIN_X = 0 ; 
INTERVAL_COLLISION = 20 ; 
TILE_HEIGHT = 32 ; 
TILE_WIDTH = 32 ; 
LIMIT_DEATH_Y = 1800 ; 
MSG_X = 0 ;
MSG_Y = 0 ; 
canSwitchUniverse = true ;
var keyIsUp = false ; 
var keyIsDown = false ; 
var keyIsLeft = false ; 
var keyIsRight = false ; 
var keyIsEnter = false ; 
var frameWidth = 800 ; 
var frameHeight = 600 ; 
var TileCollision = { Passable: 0, Impassable: 1, Platform: 2 };
var numberOfImagesLoaded = 0; 
var game = null;
var cBackground = new _.Stage("background");
var cPlayground = new _.Stage("playground");
	cPlayground.enableMouseOver(10);
	cPlayground.mouseMoveOutside = true;
var universeContainer = new Array(new _.Container()) ; 
	 universeContainer[1] = new _.Container() ; 
dialogContainer = new _.Container() ; 
UIContainer = new _.Container() ; 
var imgMonsterAIdle = new Image();
var imgMonsterARun = new Image();
var tileWall = new Image();
var GravityAcceleration = 1;
var GravityAcceleration2 = 0.5;
var MaxFallSpeed = 500 ; 
var gameActive = true ; 
var messageActive = false ; 