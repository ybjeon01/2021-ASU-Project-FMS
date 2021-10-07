var circleSize, accuracy, approachRate, x, y, circleColor, number, hitSound;

function Circle(circleSize, accuracy, approachRate, x, y, color, number) {
    this.size = circleSize;
    this.accuracy = accuracy;
    this.approachRate = approachRate;
    this.x = x;
    this.y = y;
    this.circleColor = color;
    this.number = number;
    hitSound = loadSound('../Game_Components/assets/drum-hitnormal.wav');
}