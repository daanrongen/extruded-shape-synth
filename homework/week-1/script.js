var maxi = maximilian()
var maxiEngine = new maxi.maxiAudio()
var settings = new maxi.maxiSettings()
settings.sampleRate = 44100

const VOLUME = 0.5
const BPM = 120

var drawOutput = new Array(1024)
var counter = 0
var feedback = 0.1

var carrier = new maxi.maxiOsc()
var modulator = new maxi.maxiOsc()

const fqs = {
  c1: 150,
  c2: 80,
  m1: 5,
  m2: 3,
}

var delay = new maxi.maxiDelayline()
var delayTime = (BPM / 60) * settings.sampleRate

maxiEngine.init()

maxiEngine.play = () => {
  counter++

  var sum =
    carrier.sinewave(fqs.c1 + modulator.sinewave(fqs.m1) * 20) +
    carrier.sinewave(fqs.c2) +
    carrier.sinewave(fqs.c2 + modulator.sinewave(fqs.m2)) **
      carrier.sinewave(fqs.c1) *
      -1

  var out = sum * VOLUME

  drawOutput[counter % 1024] = out
  return out
}

var canvas = document.querySelector("canvas")
var width = window.innerWidth
var height = window.innerHeight
var context = canvas.getContext("2d")
context.fillStyle = "white"

canvas.setAttribute("width", width)
canvas.setAttribute("height", height)

var spacing = width / 1024

function draw() {
  context.clearRect(0, 0, width, height)

  for (var i = 0; i < 1024; i++) {
    context.beginPath()
    context.moveTo(i * spacing, height / 2)
    context.lineTo(i * spacing, height / 2 + (drawOutput[i] * height) / 4)
    context.strokeStyle = "rgb(255, 0, 0)"
    context.stroke()
    context.closePath()
  }
  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
