//Initializing browser window canvas
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;

//Required variables for game
var ready = -1;
var endMsg = "";
var c;

function setup(){
  let canvas1 = createCanvas(600, 600);
  canvas1.position(parentWidth/2 - 300, parentHeight/2 - 300);
  background(220);
}

function draw(){
  if(mouseX > 0 && mouseX < 120 && mouseY > 0 && mouseY < 30){
    background(220);
  }
  noStroke();

  //enter box
  textSize(12);
  fill('white');
  rect(0, 0, 120, 30);
  fill('black');
  text("Enter here", 20, 20);

  //exit box
  fill('white');
  rect(530, 0, 70, 30);
  fill('black');
  text('Exit', 550, 20);

  // Obstacles and Walls
  fill(0);
  //Big walls
  rect(120,0, 100, 460);
  rect(220,360, 260, 100);
  rect(340,130, 260, 110);
  rect(430,0, 100, 110);
  
  //End maze
  rect(340,30, 60, 100);
  rect(530,100, 50, 10);
  rect(550,70, 50, 10);
  rect(530,40, 50, 10);

  //Beginning maze
  rect(30, 50, 60, 100);
  rect(0, 180, 100, 60);
  rect(30, 280, 100, 50);
  rect(0, 370, 90, 70);
  rect(0, 530, 100, 70);
  rect(30, 450, 30, 100)
  rect(10, 490, 110, 20)

  //Bottom maze
  rect(150, 400, 50, 150);
  rect(250, 500, 50, 100);
  rect(350, 400, 50, 150);
  rect(450, 490, 50, 200);
  rect(520, 500, 100, 30);
  rect(520, 500, 35, 70);
  rect(470, 410, 100, 50);

  //Right/Middle of Maze
  rect(520, 330, 100, 50);
  rect(540, 230, 30, 60);
  rect(400, 240, 30, 80);
  rect(430, 290, 60, 30);
  rect(320, 260, 50, 100);
  rect(220, 260, 70, 30);
  rect(270, 260, 20, 70);
  rect(220, 200, 90, 40);
  rect(220, 120, 100, 40);
  rect(270, 70, 70, 30);
  rect(230, 30, 20, 90);
  rect(270, 0, 50, 50);

  // Play
  if(mouseX > 0 && mouseX < 120 && mouseY > 0 && mouseY < 30) {
    ready = 1;
    endMsg = "";
  }
  if(ready == 1) {
    strokeWeight(2);
    stroke(50,205,50);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  // Win Scenario
  if(ready == 1 && mouseX > 530 && mouseX < 600 && mouseY > 0 && mouseY < 30) {
    endMsg = "You Win! Your final time was: ";
    c = 'blue';
    ready = 0;
  }

  // Opening message
  if(ready == -1) {
    c = 'green';
    endMsg = "Welcome to Maze Game, Place your mouse over the enter area to start!";
  }
  textSize(14);
  fill(c);
  text(endMsg, width/2 - 200, height/2);
  

  //Lose Scenarios
	//Big Walls
	//rect(120,0, 100, 460);
  if((ready == 1) && (mouseX > 120 && mouseX < 220 && mouseY > 0 && mouseY < 460)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
 	//rect(220,360, 260, 100);
  if((ready == 1) && (mouseX > 220 && mouseX < 480 && mouseY > 360 && mouseY < 460)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
	//rect(340,130, 260, 110);
  if((ready == 1) && (mouseX > 340 && mouseX < 600 && mouseY > 130 && mouseY < 240)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  //rect(430,0, 100, 110);
  if((ready == 1) && (mouseX > 430 && mouseX < 530 && mouseY > 0 && mouseY < 110)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  //End Maze
	//rect(340,30, 60, 100);
  if((ready == 1) && (mouseX > 340 && mouseX < 400 && mouseY > 30 && mouseY < 130)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  //rect(530,100, 50, 10);
  if((ready == 1) && (mouseX > 530 && mouseX < 580 && mouseY > 100 && mouseY < 110)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  //rect(550,70, 50, 10);
  if((ready == 1) && (mouseX > 550 && mouseX < 600 && mouseY > 70 && mouseY < 80)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  //rect(530,40, 50, 10);
  if((ready == 1) && (mouseX > 530 && mouseX < 580 && mouseY > 40 && mouseY < 50)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }

  //Outside the canvas
  if((ready == 1) && (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 2)) {
  	ready = 0;
  	endMsg = "You Lose, place your mouse over the enter area to restart!";
    c = 'red'
  }
  if(mouseX == 0 && mouseY == 0)
    ready = -1;
}