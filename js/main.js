
// create spritesheet and assign the associated data.
jQuery(document).ready(function($) {
	init(); 
});
function init() {
    //find canvas and load images, wait for last image to load
    loadAssets();
}

function loadAssets() {
	imgMonsterARun.onload = handleImageLoad;
    imgMonsterARun.onerror = handleImageError;
    imgMonsterARun.src = "img/sprites/RoyRun.png";

    imgMonsterAIdle.onload = handleImageLoad;
    imgMonsterAIdle.onerror = handleImageError;
    imgMonsterAIdle.src = "img/sprites/MonsterAIdle2.png";

    tileWall.onload = handleImageLoad;
    tileWall.onerror = handleImageError;
    tileWall.src = "img/tiles/wall.jpg";
}

function handleImageLoad(e) {
    numberOfImagesLoaded++;

    // We're not starting the game until all images are loaded
    // Otherwise, you may start to draw without the resource and raise 
    // this DOM Exception: INVALID_STATE_ERR (11) on the drawImage method
    if (numberOfImagesLoaded == 3) {
        numberOfImagesLoaded = 0;
        startGame();
    }
}
function handleImageError(e) {
	alert("Error while loading image ! Please consult console for error content."); 
	console.log(e); 
}

function startGame() {
	game = new Game(1); 
}

function debug(data){
	$('<div>').html(data+'<br/>').prependTo($('#debug'));
}
function resize(){
	$('canvas').each(function(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	});
	//Prevents click. Hud won't be resized ? 
	//$('#hud').width(window.innerWidth).height(window.innerHeight);
}

function handleTick() {
	renderCanvas();
}

function renderCanvas() {
	cPlayground.update();
	cBackground.update();
}

$(document).on('mousemove', function(e){
	e.preventDefault();
	var x = e.clientX;
	var y = e.clientY;
	mouse.dx = x - mouse.ox;
	mouse.dy = y - mouse.oy;
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	mouse.ox = x;
	mouse.oy = y;

});
$(document).on('mouseup', function(e){
	e.preventDefault();
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	mouse.down = true;
	mouse.up = false;
});
$(document).on('mousedown', function(e){
	e.preventDefault();
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	mouse.down = false;
	mouse.up = true;
});
$(window).on('resize', function(){
	//resize();
});
$(document).on('click', function(e){
});


$(document).on('keydown', function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == KEY.UP || code == KEY.SPACE) keyIsUp = true;
	if(code == KEY.DOWN) keyIsDown = true;
	if(code == KEY.LEFT) keyIsLeft = true;
	if(code == KEY.RIGHT) keyIsRight = true;
	if(code == KEY.ENTER) {
		keyIsEnter = true;
	}
	if(code == KEY.ESC) {
		gameActive = !gameActive; 
	}
});
$(document).on('keyup', function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == KEY.UP || code == KEY.SPACE) keyIsUp = false;
	if(code == KEY.DOWN) keyIsDown = false;
	if(code == KEY.LEFT) keyIsLeft = false;
	if(code == KEY.RIGHT) keyIsRight = false;
	if(code == KEY.ENTER) {
		if (gameActive) canSwitchUniverse = true ; 
		keyIsEnter = false;
	}
});
 _.Sound.addEventListener("loadComplete", createjs.proxy(this.loadHandler, this));
 _.Sound.registerSound("sounds/jump.wav", "sound");
 _.Sound.registerSound("sounds/powerup.wav", "powerup");
 _.Sound.registerSound("sounds/fall.wav", "fall");
 _.Sound.registerSound("sounds/changedim.wav", "changedim");
 function loadHandler(event) {
 	console.log("load sound");
     // This is fired for each sound that is registered.
     instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
     instance.setVolume(0.5);
 }