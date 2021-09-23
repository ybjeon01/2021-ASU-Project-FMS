var mapdata = fetch("mapdata.json")
.then(response => {
  return response.json();
})
.then(data => mapdata = data);

console.log(mapdata);

function setup() {
    createCanvas(1000,1000);
}
  
function draw() {
    background(255);

    text(frameRate().toLocaleString(undefined,{ maximumFractionDigits: 0 })
          ,10,30);

    circle(mouseX,mouseY,30);
}