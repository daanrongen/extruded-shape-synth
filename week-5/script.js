var canvas = document.querySelector("canvas")
canvas.addEventListener("mousemove", getMouse, false)
var width = window.innerWidth
var height = window.innerHeight
var context = canvas.getContext("2d")
canvas.width = width
canvas.height = height

var fov = 200
var point = []
var points = []
var point3d = []

var mouseX = 0
var mouseY = 0

var HALF_WIDTH = width / 2
var HALF_HEIGHT = height / 2

var point3d2 = []
var angleX = 0
var angleY = 0

var dim = 170
var spacing = (Math.PI * 2) / dim
var numPoints = Math.pow(dim, 2)
var size = 200

for (var i = 0; i < dim; i++) {
  var ringSize = size * Math.sin((spacing / 2) * i)

  for (var j = 0; j < dim; j++) {
    var point = [
      Math.cos(spacing * 1 * j) * Math.cos(spacing * 1 * j) * ringSize,
      Math.cos(spacing * 1 * j) * Math.sin(spacing * 1 * j) * ringSize,
      (size * ((spacing / 7) * i)) / 2,
    ]

    points.push(point)
  }
}

function draw() {
  context.fillRect(0, 0, width, height)
  context.fillStyle = "white"

  angleX = (mouseX / width - 0.5) / 4
  angleY = (mouseY / height - 0.5) / 4

  for (var i = 0; i < numPoints; i++) {
    point3d = points[i]

    x3d = point3d[0]
    y3d = point3d[1]
    z3d = point3d[2]

    var scale = fov / (fov + z3d)

    rotateX(point3d, angleY)
    rotateY(point3d, angleX)
    rotateZ(point3d, angleY)

    var x2d = x3d * scale + HALF_WIDTH
    var y2d = y3d * scale + HALF_HEIGHT

    context.strokeStyle = `rgb(255, 0, 0)`
    context.beginPath()
    context.moveTo(x2d, y2d)
    context.lineTo(x2d + scale, y2d)
    context.stroke()
  }

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)

function rotateX(point3d, theta) {
  var y = point3d[1]
  var z = point3d[2]

  var tempy = y
  var tempz = z

  y = Math.cos(theta) * tempy - Math.sin(theta) * tempz
  z = Math.sin(theta) * tempy + Math.cos(theta) * tempz

  point3d[1] = y
  point3d[2] = z
}

function rotateY(point3d, theta) {
  var x = point3d[0]
  var z = point3d[2]

  var tempx = x
  var tempz = z

  x = Math.cos(theta) * tempx + Math.sin(theta) * tempz
  z = -1 * Math.sin(theta) * tempx + Math.cos(theta) * tempz

  point3d[0] = x
  point3d[2] = z
}

function rotateZ(point3d, theta) {
  var x = point3d[0]
  var y = point3d[1]

  var tempx = x
  var tempy = y

  x = Math.cos(theta) * tempx - Math.sin(theta) * tempy
  y = Math.sin(theta) * tempx + Math.cos(theta) * tempy

  point3d[0] = x
  point3d[1] = y
}

function getMouse(mousePosition) {
  mouseX = mousePosition.layerX
  mouseY = mousePosition.layerY
}
