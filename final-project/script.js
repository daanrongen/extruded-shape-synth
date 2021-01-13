/**
 * custom procedural shapes:
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
 *
 * 3d polylines:
 * http://jaanga.github.io/blode/lines-with-width-and-thickness/sphere-and-cylinder-polylines/sphere-and-cylinder-polylines.html#
 *
 * custom geometry:
 * https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html
 *
 * draw line dynamically:
 * https://jsfiddle.net/wilt/a21ey9y6/
 */

var canvas, renderer, camera, light, scene
var width = window.innerWidth
var height = window.innerHeight

var mouse = new THREE.Vector3()
var mouseDown = false

var line
var drawCount
var posArray = []

function main() {
  canvas = document.querySelector("canvas")
  //   canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mousedown", onMouseDown, false)
  //   canvas.addEventListener("mouseup", onMouseUp, false)
  canvas.width = width
  canvas.height = height

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 0, 5)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  //   const customPts = []
  //   customPts.push(new THREE.Vector3(0, 0, 0.3))
  //   customPts.push(new THREE.Vector3(0.2, 0.3, 0.3))
  //   customPts.push(new THREE.Vector3(0, 0.5, 0.5))

  //   const customShape = new THREE.Shape(customPts)
  //   addShape(customShape, 0x0000ff, 0, 0, 0, 1)
  //   addLine(customShape, 0x0000ff, 0, 0, 0, 1)

  var geometry = new THREE.BufferGeometry()
  var positions = new Float32Array(500 * 3)
  addLine(geometry, positions, 0x0000ff)

  updatePositions()
  requestAnimationFrame(render)
}

render = (time) => {
  renderer.render(scene, camera)

  drawCount = posArray.length
  line.geometry.setDrawRange(0, drawCount)
  line.geometry.attributes.position.needsUpdate = true
  updatePositions()

  requestAnimationFrame(render)
}

addLine = (geometry, positions, color) => {
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3))
  drawCount = 2
  geometry.setDrawRange(0, drawCount)

  var material = new THREE.LineBasicMaterial({ color })
  line = new THREE.Line(geometry, material)
  scene.add(line)

  addShape(geometry, positions, color)
}

addShape = (geometry, positions, color) => {
  const shape = new THREE.Shape()
}

updatePositions = () => {
  var positions = line.geometry.attributes.position.array
  var index = 0

  for (let i = 0; i < posArray.length; i++) {
    positions[index++] = posArray[i].x
    positions[index++] = posArray[i].y
    positions[index++] = posArray[i].z
  }
}

onMouseMove = (event) => {
  if (renderer) {
    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1
    var currentPos = new THREE.Vector3(mouse.x, mouse.y, 0)

    currentPos.unproject(camera)
    posArray.push(currentPos)
  }
}

onMouseDown = (event) => {
  var x = (event.clientX / width) * 2 - 1
  var y = -(event.clientY / height) * 2 + 1

  var currentPos = new THREE.Vector3(x, y, 0)
  currentPos.unproject(camera)
  posArray.push(currentPos)

  document.addEventListener("mousemove", onMouseMove, false)
  document.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = (event) => {
  document.removeEventListener("mousemove", onMouseMove, false)
}

main()
