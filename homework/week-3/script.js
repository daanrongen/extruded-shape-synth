var TWO_PI = Math.PI * 2

var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var context = canvas.getContext("2d")

var counter = 0
var speed = 0.2
var positionX = canvas.width / 2
var positionY = canvas.height / 2

function draw() {
  var segments = 800
  var spacing = TWO_PI / segments
  var radius = 200

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.beginPath()

  counter++
  if (counter >= 200) counter -= speed
  else if (counter == 0) counter += speed

  for (var i = 0; i < segments; i++) {
    context.strokeStyle = "#000000"

    var x =
      Math.sin(spacing * i * (counter * 0.02)) *
      Math.cos(spacing * i * (counter * 0.1)) *
      radius
    var y =
      Math.sin(spacing * i * counter) *
      Math.sin(spacing * i * (counter * 0.02)) *
      radius

    context.lineTo(positionX + x, positionY + y)
  }

  context.stroke()
  context.closePath()
  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
