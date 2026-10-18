let osc, playing = false, waveform = 'sine', reverb, filter, t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noFill();
  osc = new p5.Oscillator(waveform);
  osc.start();
  osc.amp(0);
  filter = new p5.LowPass();
  reverb = new p5.Reverb();
  osc.disconnect();
  osc.connect(filter);
  reverb.process(filter, 4, 2);
}

function draw() {
  background(0, 0, 5, 0.1);
  if (playing) {
    let freq = map(mouseX, 0, width, 100, 1200);
    let amp = map(mouseY, 0, height, 1, 0);
    let hue = map(freq, 100, 1200, 180, 320);
    osc.freq(freq);
    osc.amp(amp, 0.1);
    filter.freq(map(mouseX, 0, width, 300, 2000));
    stroke(hue, 80, 100);
    strokeWeight(2);
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = height / 2 + sin(x * 0.02 + t) * amp * 200;
      vertex(x, y);
    }
    endShape();
    t += 0.05;
  } else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Click to start/stop\nMove mouse for pitch (X) and volume (Y)\nPress 1–4 to change waveform", width / 2, height / 2);
  }
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text(`Waveform: ${waveform}`, width / 2, height - 30);
}

function mousePressed() {
  userStartAudio();
  playing = !playing;
  if (!playing) osc.amp(0, 0.2);
}

function keyPressed() {
  if (key === '1') waveform = 'sine';
  if (key === '2') waveform = 'triangle';
  if (key === '3') waveform = 'sawtooth';
  if (key === '4') waveform = 'square';
  osc.setType(waveform);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
