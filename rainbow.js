class Rainbow {
  constructor(radius, angle, va, h, note) {
    this.radius = radius;
    this.x;
    this.y;
    this.av = va;
    this.angle = angle;
    this.h = h;
    this.s = 100;
    this.b = 100;
    this.note = note;

    this.env = new p5.Envelope();
    let attackVol = 1;
    let releaseVol = 0;
    let sustainVol = 1;

    let attackTime = 0.1;
    let releaseTime = 0.1;
    let sustainTime = 0.1;

    this.env.setADSR(attackTime, sustainTime, sustainVol, releaseTime);
    this.env.setRange(attackVol, releaseVol);

    this.osc = new p5.Oscillator();
    this.osc.freq(midiToFreq(this.note));
    this.osc.amp(this.env);
    this.synth = new p5.MonoSynth();
  }
  update() {
    this.env.play();
    
    if (this.angle > 180) {
      this.av *= -1;
      this.s = 0;
      this.synth.play("A$", 1, 0, 0.2);
      this.env.play();
      console.log(getAudioContext().state);
    } else if (this.angle < 0) {
      this.av *= -1;
      this.s = 0;
      this.synth.play("A$", 1, 0, 0.2);
      this.env.play();
    } else this.s += 1;
    this.angle += this.av;
  }
  draw() {
    push();
    translate(width / 2, height - 20);
    stroke(this.h, 100, this.b);
    strokeWeight(1.5);
    arc(0, 0, this.radius, this.radius, 180, 360);
    angle += av;
    this.x = (this.radius / 2) * cos(-this.angle);
    this.y = (this.radius / 2) * sin(-this.angle);

    fill(this.h, this.s, this.b);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
    pop();
  }
}
