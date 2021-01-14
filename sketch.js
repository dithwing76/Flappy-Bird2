var bird
var pipe1
var pipe2
var pipes
var edges
var yPipe
var PLAY=1
var BUTTON =2
var END =0
var gameState = BUTTON
var score
var highscore =0
var points 
var i = 0
var sensor
var j = 1
var birdimg
var bg
var bgimg
var pipeimg
var blocker1
var blocker2
var speed = 5
var gameover
var gameimg
var playbutton
var playimg
function preload(){
  gameimg =loadImage("sign.png")
  birdimg = loadImage("bird.png")
  bgimg = loadImage("flappybg.png")
  pipeimg = loadImage("pipe.png")
  playimg = loadImage("playbutton.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight-200);//600,600
  camera.on()
  camera.x =displayWidth/2
  camera.y =displayHeight/2
  camera.y =camera.y-100
  camera.zoom = 1
  
  bg =createSprite(camera.x, camera.y)
  bg.addImage(bgimg)
  bg.scale =2.1

  gameover=createSprite(camera.x, camera.y/4)
  gameover.addImage(gameimg)
  gameover.scale =0.1
  playbutton=createSprite(camera.x, camera.y/2)
  playbutton.addImage(playimg)
  playbutton.scale =0.1
  pipes = createGroup();
  bird =createSprite(displayWidth/4,300,30,30)
  bird.shapeColor="lightGreen";
  bird.rotation = 70;
  bird.addImage(birdimg)
  bird.scale =0.1
  yPipe =300
  score = 0
  points = 0
  sensor =createSprite(displayWidth/4,800,30,30)
  sensor.visible =false
  blocker1 =createSprite(0,displayHeight/2,displayWidth/4,displayHeight)
  blocker2 =createSprite(displayWidth,displayHeight/2,displayWidth/4,displayHeight)
  blocker1.shapeColor="white"
  blocker2.shapeColor="white"
  gameover.visible =false
  playbutton.visible =false
  console.log(displayWidth)
  gameover.depth =100
  playbutton.depth =100
}

function draw() {
  background("cyan")
  textSize(20)
  
  //edges
  edges = createEdgeSprites();
  
  //
  //gamestate
  
  if (gameState===PLAY){
    gameover.depth =10
  playbutton.depth =10
    gameover.visible =false
  playbutton.visible =false
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    bg.velocityX= -2
    score = score+1
    if (sensor.isTouching(pipes)&&j ==1){
      points = points +1
      j=0
      if(points%10===0){
        speed =speed+1
      }
    }
    if(!sensor.isTouching(pipes)){
      j=1
    }
    if (keyWentDown("space")){
      bird.velocityY =-10
    }
    createPipes();
    if(bird.velocityY < 0){
       bird.rotation =-40
    }else if(bird.velocityY < 5){
      bird.rotation=0
    }else{
      bird.rotation=50
    }
    gameover.visible =false
  playbutton.visible =false
    if(bird.isTouching(edges)){
       gameState = END
    }
    bird.velocityY =bird.velocityY +1
  }else if(gameState ===END){
    pipes.setLifetimeEach (65)
    bird.rotation=50
    bird.velocityY =bird.velocityY +2
    pipes.setVelocityXEach(0)
  }else if(gameState ===BUTTON){
    bird.velocityY=0
  }
  bird.collide(edges)
  //
  

  
  if(bird.isTouching(pipes)){
   gameState =END
   gameover.visible =true
   playbutton.visible =true
  }
  
  
  drawSprites()
  fill("black")
  
  if(gameState ===END){
    bg.velocityX= 0
    gameover.visible =true
  playbutton.visible =true
    if (mousePressedOver(playbutton)){
      bird.destroy()
      pipes.destroyEach()
      gameover.depth =0
  playbutton.depth =0
      setup();
      gameState = PLAY
      
    }
  }else if(gameState ===BUTTON){
    
    if (mousePressedOver(playbutton)){
      bird.destroy()
      pipes.destroyEach()
      gameover.depth =0
  playbutton.depth =0
      setup();
      gameState = PLAY
    }
    
  }
  text("Points: "+points,500,50)
  //text("score: "+score,500,70)
  text("Highscore: "+highscore,500,75)
  if(points> highscore){
    highscore = points
  }
  gameover.visible =false
  playbutton.visible =false
  //text(gameState,100,100)
  if(gameState===1){
    gameover.visible =false
  playbutton.visible =false

  }else if(gameState ===0||gameState ===2){
    gameover.visible =true
  playbutton.visible =true
  }
}
function createPipes(){
  i =score -10
  if (i % 60 ===0&&i>25){
    yPipe =Math.round(random(200,550))
    pipe1=createSprite(displayWidth,yPipe-400,50,600)
    pipe2=createSprite(displayWidth,yPipe+400,50,600)
    pipe1.addImage(pipeimg)
    pipe2.addImage(pipeimg)
    
    pipe1.depth =1
    pipe2.depth =1
    bg.depth =1
    gameover.depth =0
  playbutton.depth =0
    pipe1.rotation =-180
    pipes.add(pipe1)
    pipes.add(pipe2)
    pipes.setLifetimeEach (75)
    pipes.setColorEach("green")
    pipes.setVelocityXEach(speed*-1)
  }
}
