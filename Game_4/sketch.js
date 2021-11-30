//Initializing browser window canvas
var canvasDiv = document.getElementById('myCanvas');
var parentWidth = canvasDiv.offsetWidth;
var parentHeight = canvasDiv.offsetHeight;

//Required variables for game
var ready = -1;
var endMsg = "";
var c;
var sizeText = 14;
var textOffset = 250;
var counter = 0;

function setup(){
  let canvas1 = createCanvas(600, 600);
  canvas1.position(parentWidth/2 - 300, parentHeight/2 - 300);
  background(220);
  
  function timeIt(){
    if(ready == 1)
      counter++
  }

  setInterval(timeIt, 1000);
}

function draw(){
  if(mouseX > 0 && mouseX < 120 && mouseY > 0 && mouseY < 30){
    background(220);
  }
  noStroke();
  mainMenuButton = createButton('Main Menu');
  mainMenuButton.position(0, 0);
  mainMenuButton.size(100,50);
  mainMenuButton.mousePressed(returnToMainMenu)

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
  text(timerText(), 550, 20);

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
  rect(30, 450, 30, 100);
  rect(10, 490, 110, 20);

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
    fill(0,0,0,150);
    noStroke();
    rect(0, 0, parentWidth, parentHeight);
    endMsg = "You Win! Your final time was: " + formatTime(counter);
    make_score_list("game4");
    let score_list = get_score_list("game4");
    add_to_score_list("game4", formatTime(counter));
    c = 'white';
    sizeText = 25
    textOffset = 190
    ready = 0;
    counter = 0;
  }

  // Opening message
  if(ready == -1) {
    fill(0,0,0,2);
    rect(0, 0, parentWidth, parentHeight);
    c = 'White';
    endMsg = "Welcome to Maze Game, please place your mouse over the enter area to start!\nWhen you do a timer will replace the exit text and you have to make it through the\nmaze in the shortest time.";
  }
  textSize(sizeText);
  fill(c);
  text(endMsg, width/2 - textOffset, height/2);
  
  //Lose Scenarios
	//Big Walls
	//rect(120,0, 100, 460);
  if((ready == 1) && (mouseX > 120 && mouseX < 220 && mouseY > 0 && mouseY < 460)) {
  	gameOver()
  }
 	//rect(220,360, 260, 100);
  if((ready == 1) && (mouseX > 220 && mouseX < 480 && mouseY > 360 && mouseY < 460)) {
  	gameOver()
  }
	//rect(340,130, 260, 110);
  if((ready == 1) && (mouseX > 340 && mouseX < 600 && mouseY > 130 && mouseY < 240)) {
  	gameOver()
  }
  //rect(430,0, 100, 110);
  if((ready == 1) && (mouseX > 430 && mouseX < 530 && mouseY > 0 && mouseY < 110)) {
  	gameOver()
  }
  //End Maze
	//rect(340,30, 60, 100);
  if((ready == 1) && (mouseX > 340 && mouseX < 400 && mouseY > 30 && mouseY < 130)) {
  	gameOver()
  }
  //rect(530,100, 50, 10);
  if((ready == 1) && (mouseX > 530 && mouseX < 580 && mouseY > 100 && mouseY < 110)) {
  	gameOver()
  }
  //rect(550,70, 50, 10);
  if((ready == 1) && (mouseX > 550 && mouseX < 600 && mouseY > 70 && mouseY < 80)) {
  	gameOver()
  }
  //rect(530,40, 50, 10);
  if((ready == 1) && (mouseX > 530 && mouseX < 580 && mouseY > 40 && mouseY < 50)) {
  	gameOver()
  }

  //Beginning maze
  //rect(30, 50, 60, 100)
  if((ready ==1 ) && (mouseX > 30 && mouseX < 90 && mouseY > 50 && mouseY < 150)){
    gameOver()
  }
  //rect(0, 180, 100, 60)
  if((ready == 1) && (mouseX > 0 && mouseX < 100 && mouseY > 180 && mouseY < 240)){
    gameOver()
  }
  //rect(30, 280, 100, 50)
  if((ready == 1) && (mouseX > 30 && mouseX < 130 && mouseY > 280 && mouseY < 330)){
    gameOver()
  }
  //rect(0, 370, 90, 70)
  if((ready == 1) && (mouseX > 0 && mouseX < 90 && mouseY > 370 && mouseY < 440)){
    gameOver()
  }
  //rect(0, 530, 100, 70)
  if((ready == 1) && (mouseX > 0 && mouseX < 100 && mouseY > 530 && mouseY < 600)){
    gameOver()
  }
  //rect(30, 450, 30, 100)
  if((ready == 1) && (mouseX > 30 && mouseX < 60 && mouseY > 450 && mouseY < 550)){
    gameOver()
  }
  //rect(10, 490, 110, 20)
  if((ready == 1) && (mouseX > 10 && mouseX < 120 && mouseY > 490 && mouseY < 510)){
    gameOver()
  }

  //Bottom Maze
  //rect(150, 400, 50, 150)
  if((ready == 1) && (mouseX > 150 && mouseX < 200 && mouseY > 400 && mouseY < 550)){
    gameOver()
  }
  //rect(250, 500, 50, 100)
  if((ready == 1) && (mouseX > 250 && mouseX < 300 && mouseY > 500 && mouseY < 600)){
    gameOver()
  }
  //rect(350, 400, 50, 150)
  if((ready == 1) && (mouseX > 350 && mouseX < 400 && mouseY > 400 && mouseY < 550)){
    gameOver()
  }
  //rect(450, 490, 50, 200)
  if((ready == 1) && (mouseX > 450 && mouseX < 500 && mouseY > 490 && mouseY < 690)){
    gameOver()
  }
  //rect(520, 500, 100, 30)
  if((ready == 1) && (mouseX > 520 && mouseX < 620 && mouseY > 500 && mouseY < 530)){
    gameOver()
  }
  //rect(520, 500, 35, 70)
  if((ready == 1) && (mouseX > 520 && mouseX < 555 && mouseY > 500 && mouseY < 570)){
    gameOver()
  }
  //rect(470, 410, 100, 50)
  if((ready == 1) && (mouseX > 470 && mouseX < 570 && mouseY > 410 && mouseY < 460)){
    gameOver()
  }
  //Right/Middle of Maze
  //rect(520, 330, 100, 50)
  if((ready == 1) && (mouseX > 520 && mouseX < 620 && mouseY > 330 && mouseY < 380)){
    gameOver()
  }
  //rect(540, 230, 30, 60)
  if((ready == 1) && (mouseX > 540 && mouseX < 570 && mouseY > 230 && mouseY < 290)){
    gameOver()
  }
  //rect(400, 240, 30, 80)
  if((ready == 1) && (mouseX > 400 && mouseX < 430 && mouseY > 240 && mouseY < 320)){
    gameOver()
  }
  //rect(430, 290, 60, 30)
  if((ready == 1) && (mouseX > 430 && mouseX < 490 && mouseY > 290 && mouseY < 320)){
    gameOver()
  }
  //rect(320, 260, 50, 100)
  if((ready == 1) && (mouseX > 320 && mouseX < 370 && mouseY > 260 && mouseY < 360)){
    gameOver()
  }
  //rect(220, 260, 70, 30)
  if((ready == 1) && (mouseX > 220 && mouseX < 290 && mouseY > 260 && mouseY < 290 )){
    gameOver()
  }
  //rect(270, 260, 20, 70)
  if((ready == 1) && (mouseX > 270 && mouseX < 290 && mouseY > 260 && mouseY < 330) ){
    gameOver()
  }
  //rect(220, 200, 90, 40)
  if((ready == 1) && (mouseX > 220 && mouseX < 310 && mouseY > 200 && mouseY < 240) ){
    gameOver()
  }
  //rect(220, 120, 100, 40)
  if((ready == 1) && (mouseX > 220 && mouseX < 320 && mouseY > 120 && mouseY < 160) ){
    gameOver()
  }
  //rect(270, 70, 70, 30)
  if((ready == 1) && (mouseX > 270 && mouseX < 340 && mouseY > 70 && mouseY < 100) ){
    gameOver()
  }
  //rect(230, 30, 20, 90)
  if((ready == 1) && (mouseX > 230 && mouseX < 250 && mouseY > 30 && mouseY < 120) ){
    gameOver()
  }
  //rect(270, 0, 50, 50)
  if((ready == 1) && (mouseX > 270 && mouseX < 320 && mouseY > 0 && mouseY < 50) ){
    gameOver()
  }

  //Outside the canvas
  if((ready == 1) && (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 2)) {
  	gameOver()
  }
  if(mouseX == 0 && mouseY == 0)
    ready = -1;
}

function gameOver(){
  ready = 0;
  counter = 0;
  noStroke();
  fill(0,0,0,150);
  rect(0, 0, parentWidth, parentHeight);
  endMsg = "You Lose, place your mouse over the enter area to restart!";
  sizeText = 18
  textOffset = 230
  c = 'red'
}

function timerText(){
  if((ready == -1) || (ready == 0))
    return "Exit";
  else{
    if(ready == 1)
      return formatTime(counter);
  }
}

function formatTime(s){
  var minutes = floor(s / 60);
  var seconds = s % 60;
  return nf(minutes,2) + ':' + nf(seconds,2);
}

function returnToMainMenu()
{
  window.location.href = "/2021-ASU-Project-FMS/";
}

function get_score_list(gameName) {
  return JSON.parse(localStorage.getItem(`${gameName}-scoreList`));
}

function add_to_score_list(gameName, score) {
  let arr = get_score_list(gameName);

  if (!arr.includes(score)) {
    arr.push(score);
    arr.sort((a, b) => b-a);
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify(arr));
  }
}

function make_score_list(gameName) {
  let scoreList = localStorage.getItem(`${gameName}-scoreList`);
  if (scoreList === null) {
    localStorage.setItem(`${gameName}-scoreList`, JSON.stringify([]));
  }
}