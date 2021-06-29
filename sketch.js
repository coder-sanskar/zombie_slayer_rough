const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var soldier, sol_firing, backgroundImg, zombie;

var soldierAnimation, sol_standImg, soldier_dying;

var bullet, bulletImg, antidote, antidoteImg; 

var zombieAnimation, strip;

var health = 5, healthImg, hlth; 

var score = 0, formBg, formImg, startButton, startImg;

var gameOver, gameOverImg, restart, restartImg; 

var zomb2Animation;

var PLAY=1, END=2, FORM=0,  gameState = FORM;

function preload(){

  zombieAnimation = loadAnimation("zombies/Zombie1.png","zombies/Zombie2.png", "zombies/Zombie3.png", "zombies/Zombie4.png",
   "zombies/Zombie5.png", "zombies/Zombie6.png", "zombies/Zombie7.png", "zombies/Zombie8.png");

   soldierAnimation = loadAnimation("sd1.png","sd2.png","sd3.png","sd4.png","sd5.png","sd6.png","sd7.png","sd8.png","sd9.png")

   zomb2Animation = loadAnimation("zombies/z1.png", "zombies/z2.png", "zombies/z3.png", "zombies/z4.png");

sol_firing = loadImage("soldier-firing.png");
bulletImg = loadImage("bullet.png");
backgroundImg = loadImage("bg.png");
antidoteImg = loadImage("Antidote.png");
healthImg = loadImage("Health.png");
sol_standImg = loadImage("soldier-standing.png");
gameOverImg = loadImage("game-over.png");
startImg = loadImage("start.png");
restartImg = loadImage("restart.png");
formImg = loadImage("Z.S.poster.jpg");


}

function setup() {
  createCanvas(800,400);
  
  soldier = createSprite(750, 200, 50, 50);
  soldier.addImage("soldier",sol_standImg);
  soldier.scale = 1.5;

restart = createSprite(width/2,height/2+140, 10,10);
restart.addImage("restart", restartImg);
restart.scale = 0.4;
restart.visible = false;

gameOver = createSprite(width/2, 207, 10,10);
   gameOver.addImage("gameOver", gameOverImg);
   gameOver.visible = false;

   score = 0;
  
 
  

  zombGroup = new Group();
  bulletGroup = new Group();
  antidoteGroup = new Group();
  zomb2Group = new Group();

  form();

}

function draw() {
  background(backgroundImg);

 strip = createSprite(400,25,800,50);
  strip.shapeColor = "black";
  //strip.depth = strip.depth-2;



if (gameState === FORM){

 



if (mousePressedOver(startButton)){
gameState = PLAY;
startButton.visible = false;
formBg.visible = false;
}

}

if (gameState === PLAY){



if (frameCount%100===0){
spawnZombies();
}

if (frameCount%120===0){
spawnZomb2();
}


if (keyDown("SPACE")){
  createBullet(); 
soldier.changeImage("solF", sol_firing);
}

if (frameCount%400===0){
createAntidote();
}

if (zomb2Group.x > 800||zombGroup.x > 800){
  score = score-1;
}


soldier.x = mouseX;
soldier.y = mouseY;


  /*soldier.velocityX = 0;
  soldier.velocityY = 0;


 if(keyDown("UP_ARROW")) {
    
    soldier.velocityY = -6;
    
  }
    
 if (keyDown("DOWN_ARROW")) {
    soldier.velocityY = 6;
     
    
 }
  
  if (keyDown("LEFT_ARROW")) {
    
    soldier.velocityX = -6;
   
  }
    
    if (keyDown("RIGHT_ARROW")) {
      soldier.velocityX = 6;
       
      
    }*/

    

    if (soldier.index !== null){
  for (var i = 0; i< zombGroup.length; i++)
  if (zombGroup.get(i).isTouching(soldier)){
    zombGroup.get(i).destroy();
    health = health-1;
  }
}

if (soldier.index !== null){
  for (var i = 0; i< zomb2Group.length; i++)
  if (zomb2Group.get(i).isTouching(soldier)){
    zomb2Group.get(i).destroy();
    health = health-1;
  }
}

if (zombGroup.index !== null){
  for (var i = 0; i< bulletGroup.length; i++)
  if (bulletGroup.get(i).isTouching(zombGroup)){
    bulletGroup.get(i).destroy();
    
  }
}


if (zomb2Group.index !==null){
  for(var  i = 0; i < bulletGroup.length; i++)
  if (bulletGroup.get(i).isTouching(zomb2Group)){
  bulletGroup.get(i).destroy();
  } 

}

if (bulletGroup.index !==null){
for(var  i = 0; i < zomb2Group.length; i++)
if (zomb2Group.get(i).isTouching(bulletGroup)){
zomb2Group.get(i).destroy();
  } 

}

if (soldier.index !== null){
 for (var i = 0; i < antidoteGroup.length; i++)
   if(antidoteGroup.get(i).isTouching(soldier)){
    antidoteGroup.get(i).destroy();
    score = score+1
    
       }
}

if (bulletGroup.index !== null){
 for(var i = 0; i < zombGroup.length; i++)
   if(zombGroup.get(i).isTouching(bulletGroup)){
    zombGroup.get(i).destroy();
    
       }
}

var hlth = createSprite(215,25,10,10);
  hlth.addImage("health", healthImg);
  hlth.scale = 0.03;

if (health === 0){
   gameState = END;
   }

}

  else if (gameState === END){
    
    zombGroup.setVelocityXEach(0);
    zomb2Group.setVelocityXEach(0);

    zomb2Group.setLifetimeEach(0);
    zombGroup.setLifetimeEach(0);
    antidoteGroup.setLifetimeEach(0);

   zomb2Group.visible = false;
   zombGroup.visible = false;
   antidoteGroup.visible = false;
   gameOver.visible = true;
   restart.visible = true;

   soldier.velocityX = 0;
   soldier.velocityY = 0;

   soldier.changeAnimation("solDying", soldierAnimation);
 

   if (mousePressedOver(restart)){
  reset();
}  

   }

  drawSprites();

  textSize(30);
  fill("white");
  text("『 Zᴏᴍʙɪᴇ•Sʟᴀʏᴇʀ 』", 270,35);
  

  textSize(29);
  fill("white");
  text("Sᴄᴏʀᴇ : " + score, 650,35);

  textSize(29);
  fill("white");
  text("Hᴇᴀʟᴛʜ : " + health + "x", 50,35);

   

}

function spawnZombies(){
 var zomb = createSprite(0,Math.round(random(180,370)),10,10);
 zomb.addAnimation("zombie", zombieAnimation);
 zomb.velocityX = 4;
 zomb.lifetime = 900;
 zomb.scale = 0.5;
 zombGroup.add(zomb);
}

function createBullet(){
var bullet = createSprite(100,100,50,20);
bullet.addImage("bullet", bulletImg);
bullet.x = soldier.x;
bullet.y = soldier.y;
bullet.velocityX = -5;
bullet.lifetime = 800;
bullet.scale = 0.1;
bulletGroup.add(bullet);
}

function createAntidote(){
var antidote = createSprite(Math.round(random(0,500)), Math.round(random(190,370)), 10,10);
antidote.addImage("antidote", antidoteImg);
antidote.scale = 0.05;
antidoteGroup.add(antidote);
}

function spawnZomb2(){
 var zomb2 = createSprite(0,Math.round(random(180,370)),10,10);
 zomb2.addAnimation("zombie2", zomb2Animation);
 zomb2.velocityX = 4;
 zomb2.lifetime = 900;
 zomb2Group.add(zomb2);
}

function reset(){
gameState = PLAY;

gameOver.visible = false;
restart.visible = false;

zombGroup.destroyEach();
zomb2Group.destroyEach();
antidoteGroup.destroyEach();
score = 0;
health = 5;

}

function form(){

  formBg=createSprite(400,200);
  formBg.addImage("formImg", formImg);
  formBg.scale = 1.6

//input = createInput("Enter your name");
  
  startButton = createSprite(400,350,50,50);
  startButton.addImage("start",startImg);
  startButton.scale = 0.5;

  
  
  


}