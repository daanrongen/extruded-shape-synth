var canvas = document.querySelector("canvas")
var context = canvas.getContext("2d")

var width = window.innerWidth
var height = window.innerHeight
canvas.width = width
canvas.height = height

var mouseX
var mouseY
var isDrawing = false

canvas.addEventListener("mousedown", (event) => {
  mouseX = event.offsetX
  mouseY = event.offsetY
  isDrawing = true
})

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    drawLine(context, mouseX, mouseY, event.offsetX, event.offsetY)
    mouseX = event.offsetX
    mouseY = event.offsetY
  }
})

window.addEventListener("mouseup", (event) => {
  if (isDrawing) {
    drawLine(context, mouseX, mouseY, event.offsetX, event.offsetY)
    mouseX = 0
    mouseY = 0
    isDrawing = false
  }
})

function draw() {
  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = "black"
  context.lineWidth = 1
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}
