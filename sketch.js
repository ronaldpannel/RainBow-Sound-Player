const playBtn = document.getElementById("btn");

let radius;
let angle;
let av;
let rainbows = [];
let num;
let period = 100000;
let audio;

let midiNotes = [
  "108",
  "107",
  "105",
  "103",
  "101",
  "100",
  "98",
  "96",
  "95",
  "93",
  "91",
  "89",
  "88",
  "86",
  "84",
  "83",
  "81",
  "79",
  "77",
  "76",
  "74",
  "72",
  "71",
  "69",
  "67",
  "65",
  "64",
  "62",
  "60",
];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  num = 29;
  for (let i = 0; i < num; i++) {
    let radius = 200;
    let spacing = i * 20;
    let angle = 180;
    let va = 180 * radius * i * 0.000003;
    let h = 200 + (100 / num) * i;
    let note = 76;

    rainbows[i] = new Rainbow(radius + spacing, angle, va, h, note);
  }
}
function draw() {
  background(240, 150, 30);
  noFill();
  playBtn.addEventListener("click", () => {
    if (getAudioContext().state !== "running") {
      getAudioContext().resume();
    }
  });

  for (let i = 0; i < rainbows.length; i++) {
    rainbows[i].update();
    rainbows[i].draw();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
