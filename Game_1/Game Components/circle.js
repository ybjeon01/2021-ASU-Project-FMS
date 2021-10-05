var circleSize, accuracy, approachRate, x, y, color, number, hitSound;

function Circle(circleSize, accuracy, approachRate, x, y, color, number) {
    this.size = size;
    this.accuracy = accuracy;
    this.approachRate = approachRate;
    this.x = x;
    this.y = y;
    this.color = color;
    this.number = number;
    hitSound = loadSound('assets/hit_sound.mp3');
}