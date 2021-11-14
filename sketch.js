var restartImg, groundImage, obstacle;
var jump, girl, girl_stop, girl_running, girl_jump,girl; 
var obstaclesGroup, walkCG, stopGroup;
var score;
var path;
var jumpCG;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    girl_running = loadAnimation("walk.png","run.png");
    girl_stop = loadImage("walk.png");
    groundImage = loadImage("background.png");   
     
    obstacle = loadImage("obstacle.png");    
    restartImg = loadImage("restart.png");    
}

function setup() {  
    createCanvas(800,500);
    // Moving background
    path=createSprite(200,150);
    path.addImage(groundImage);
    path.velocityX = -1;
    path.scale = 1;
    
    girl = createSprite(100,200);
    girl.addAnimation("running", girl_running);
    girl.scale = 0.15;
    girl.velocityX = 2;

    obstaclesGroup = createGroup();
    stopCG = createGroup();
    score = 0;
}

function draw() {
    background(0);
    drawSprites();

    text("Score: "+ score, 300,50);
    //text("Path.x: "+ path.x, 400,50);

    if(gameState === PLAY){
        //move the ground
        path.velocityX = -1;

        if (girl.x > width){
            girl.x = 20;
        } 

        if (path.x < 100){
            path.x = width/3;
        }      
        
        if(girl.y < 50)
        {
            girl.y = 450;
        }

        if(girl.y > 450)
        {
            girl.y = 50;
        }

        //spawn obstacles on the ground
        spawnObstacles(); 

        if(obstaclesGroup.isTouching(girl)){
            gameState = END;  
        }

        if(keyDown("up")) {
            startframe = frameCount;
            girl.velocityY = -4;
          }

        if(keyDown("down")) {
              girl.velocityY = 4;
          }
        
        if(keyDown("space")) {
              girl.velocityY = 0;
          }
    }
    else if (gameState === END) {
        path.velocityX = 0;
        girl.velocityX = 0;
        girl.velocityY = 0;
        //walkCG.destroyEach();
        stopGirl();
        obstaclesGroup.destroyEach();
        text("Press space key to Restart the game!", 500,200);

        if(keyDown("space")) {
            reset();
          }
    }

}

function reset(){
    gameState = PLAY;
    stopCG.destroyEach();
    

    //girl = createSprite(100,200);
    //girl.addAnimation("running", girl_running);
    //girl.scale = 0.15;
    path.velocityX = -1;
    girl.velocityX = 2;

    score = 0;
   }

   
function spawnObstacles(){
    if (frameCount % 70 == 0){

        
      var obstacle = createSprite(girl.x + Math.round(random(80, 100)), girl.y + Math.round(random(-50, 50)));
      //obstacle.velocityX = -5;

       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.2;
       obstacle.lifetime = 50;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
       score++;
    }
   }

   function stopGirl(){
    var player1 = createSprite(girl.x,girl.y);
    player1.scale = 0.17;

    player1.addAnimation("opponentPlayer1",girl_stop);
    //player1.setLifetime=30;
    stopCG.add(player1);
}





