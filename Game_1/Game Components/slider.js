var circleSize, accuracy, approachRate, sliderColor, number, isReverse, hitSound, slideSound;
var x1, y1, x2, y2; // Bezier curve details

function Slider(circleSize, accuracy, approachRate, color, number, x1, y1, x2, y2, isReverse) {
    this.circleSize = circleSize;
    this.accuracy = accuracy;
    this.approachRate = approachRate;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.sliderColor = color;
    this.number = number;
    this.isReverse = isReverse
    hitSound = loadSound('assets/hit_sound.mp3');
    slideSound = loadSound('assets/slide_sound.mp3');
}