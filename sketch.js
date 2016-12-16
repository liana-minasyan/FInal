var ball;
var plate;
var breaks = [];
var y = 70;
var bgimage;
var t = 0;
var player;
var lifes = [];
var number = 3;
var bar = [];

function setup() {
 bgimage = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Fornax_Dwarf.jpg/600px-Fornax_Dwarf.jpg");
 canvas = createCanvas(600,600);
  Recetpage();
  ball.xspeed = 0;
  ball.yspeed = 0;
  var posit_x = canvas.width/2 + innerWidth/2 + y;
  var posit_y = innerHeight/2-height/2;

  var button = createButton("Start");
    button.mousePressed(Recetpage);
    button.position(posit_x, posit_y+100);

  var rbutton = createButton("Restart");
    rbutton.mousePressed(Recover);
    rbutton.position(posit_x, posit_y + 160);

  var pause = createButton("Pause");
    pause.mousePressed(Stop);
    pause.position(posit_x, posit_y + 220);
  
  var resume = createButton("Resume");
    resume.mousePressed(Resume);
    resume.position(posit_x,posit_y+ 280)
}

function Recetpage(){
  ball = new Ball ();
  plate = new Plate ();
  player = new Game ();

 t = 0;
 number = 3;
  for(j = 0; j < 21; j++ ){
    bar[j] = new Breaks(72.5+j*75, y,50);
    bar[j].color = color(0,255,0);
    if (bar[j].x + bar[j].length/2 > width){
      bar[j].y = bar[j-7].y + 50 ;
      bar[j].x = bar[j-7].x;
    }
  }
  for(i = 0; i < 20; i++ ){
    breaks[i] = new Breaks(55+i*120, y,70);
    breaks[i].color = color(0,0 ,110);
    if (breaks[i].x + breaks[i].length > width){
      breaks[i].y = breaks[i].y + 70 * floor((breaks[i].x + breaks[i].length/2)/width);
      breaks[i].x = breaks[i].x - width * floor((breaks[i].x + breaks[i].length/2)/width);
    }
  }  
}

function draw() {
  background(bgimage);
  player.lifes();
  player.gameOver();
  player.score();
  player.winGame();
  ball.display();
  ball.move();
  ball.bounce();
  plate.draw();
  plate.move();
  
  fill(75, 127, 232);
  for(i = 0; i < breaks.length; i++){
    breaks[i].createBreaks();
    ball.distroy();
  }
  for(j = 0; j < bar.length; j++){
    bar[j].createBreaks();
  }
  ball.changeDir();
  if(keyIsDown(LEFT_ARROW)) {
    plate.dir(-1);
  }
  if(keyIsDown(RIGHT_ARROW)) {
    plate.dir(1);
  }  
}
  
function keyReleased (){
  plate.dir(0);
}

function Recover(){
  loop();

Recetpage();
ball.xspeed = 0;
ball.yspeed = 0;
}

function Stop(){
  noLoop();
}

function Resume(){
  loop();
}

var toggle = document.getElementById('toggle');
var slider = document.querySelector('.slider');

toggle.addEventListener('click', toggleSlider, false);

function toggleSlider(){
    if (slider.classList.contains('opened')) {
        slider.classList.remove('opened');
        slider.classList.add('closed');
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
    }
}