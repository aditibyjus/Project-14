var restartImg, groundImage, obstacle;
var jump, girl_running, girl_jump,girl; 
var obstaclesGroup, jumpGroup;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    girl_running = loadAnimation("walk.png","run.png");
    girl_jump = loadAnimation("jump.png");
    
    groundImage = loadImage("background.png");    
    obstacle = loadImage("obstacle.png");    
    restartImg = loadImage("restart.png");    
}

function setup() {
  
    createCanvas(600, 200);
  
    ground = createSprite(100,90);
    ground.addImage(groundImage);
    ground.velocityX = -4;


    girl = createSprite(50,90);
    girl.addAnimation("running", girl_running);
    girl.scale = 0.5;
      
    //set collider for girl
    girl.setCollider("rectangle",0,0,40,40);

    obstaclesGroup = createGroup();
    jumpGroup =  createGroup();
    
    //gameOver = createSprite(300,100);
    //gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
  
    score = 0;
}

function draw() {
    text("Score: "+ score, 500,50);

    if(gameState === PLAY){
        //move the ground
        ground.velocityX = -7;
        
        if (ground.x < 0){
            ground.x = ground.width/2;
        }      
        
        //spawn obstacles on the ground
        spawnObstacles(); 
        
        //jump when the space key is pressed
        if(keyDown("space")) {
            girl.velocityY = -12;        
            jumpGirl();            
            girl.velocityY = 12;

        }

        if(obstaclesGroup.isTouching(girl)){
            gameState = END;  
            girl.velocityY= 0 ;
            ground.velocityX = 0;

        }

       
    }
    else if (gameState === END) {
        ground.velocityX = 0;
    }

}

function jumpGirl(){
        
    var jump = createSprite(400,165,10,40);
    jump.velocityX = -7;
    
     //assign scale and lifetime to the obstacle           
     jump.scale = 0.5;
     jump.lifetime = 100;
    
    //add each obstacle to the group
    jumpGroup.add(girl_jump);
  }


function spawnObstacles(){
    if (frameCount % 60 == 0){
      var obstacle = createSprite(400,165,10,40);
      //obstacle.velocityX = -(6+score/100);
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 200;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

