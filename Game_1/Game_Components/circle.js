var circleSize, approachSize, accuracy, approachRate, x, y, circleColor, number, hitSound, failSound, time, isActive;

function Circle(circleSize, accuracy, approachRate, x, y, color, number, time) {
    this.circleSize = circleSize * 20;
    this.accuracy = accuracy;
    this.approachRate = approachRate;
    this.x = x;
    this.y = y;
    this.circleColor = color;
    this.number = number;
    this.time = time;
    isActive = false;
    hitSound = loadSound('../Game_Components/assets/drum-hitnormal.wav');
    failSound = loadSound('../Game_Components/assets/fail-sound.wav');

    this.update = function (currentTime) {
        let timeDiff = this.time - currentTime;
        if (timeDiff < 0) {
            fail();
            return -1;
        };
        this.approachSize = this.circleSize + (timeDiff * this.approachRate);

        addCircle(this.x, this.y, this.circleSize, this.approachSize);

        isActive = true;

        return 0;
    };

    this.click = function (mouseX, mouseY, songTime) {
        let distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
        console.log(distance);
        console.log(distance <= this.circleSize);
        if (distance <= circleSize) {
            if (Math.abs(this.time - songTime) <= 0.5) {
                success();
                return 1;
            } else {
                fail();
                console.log("Fail 1");
                return -1;
            }
        } else if (distance <= this.approachSize) {
            fail();
            console.log("Fail 2");
            return -1;
        } else {
            return 0;
        }
    };

    return this;
}

function success() {
    //hitSound.play();
    console.log("success");
}

function fail() {
    //failSound.play();
    console.log("fail");
}