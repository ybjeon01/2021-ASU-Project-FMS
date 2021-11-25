var spinsDone, spinsNeeded, score, rotationsPerMinute, startSpinSound, doneSpinSound;

function Spinner(spinsNeeded) {
    spinsDone = 0;
    this.spinsNeeded = spinsNeeded;
    score = 0;
    rotationsPerMinute = 0;
    startSpinSound = loadSound('assets/start_spin_sound.mp3');
    doneSpinSound = loadSound('assets/done_spin_sound.mp3');
}