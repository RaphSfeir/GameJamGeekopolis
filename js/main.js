var imgMonsterARun = new Image();

function init() {
    //find canvas and load images, wait for last image to load
    cPlayground = document.getElementById("playground");

    imgMonsterARun.onload = handleImageLoad;
    imgMonsterARun.onerror = handleImageError;
    imgMonsterARun.src = "../img/sprites/MonsterARun.png";
}