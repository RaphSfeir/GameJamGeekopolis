
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
    imgMonsterARun.src = "img/sprites/MonsterARun.png";

    imgMonsterAIdle.onload = handleImageLoad;
    imgMonsterAIdle.onerror = handleImageError;
    imgMonsterAIdle.src = "img/sprites/MonsterAIdle.png";
}

function handleImageLoad(e) {
    numberOfImagesLoaded++;

    // We're not starting the game until all images are loaded
    // Otherwise, you may start to draw without the resource and raise 
    // this DOM Exception: INVALID_STATE_ERR (11) on the drawImage method
    if (numberOfImagesLoaded == 2) {
        numberOfImagesLoaded = 0;
        startGame();
    }
}
function handleImageError(e) {
	alert("Error while loading image ! Please consult console for error content."); 
	console.log(e); 
}

function startGame() {
    new Player(); 
	_.Ticker.addListener(window);
	_.Ticker.useRAF = true;
	_.Ticker.setFPS(60);
	_.Ticker.addEventListener("tick", handleTick);
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
	e.preventDefault();
	return false;
});