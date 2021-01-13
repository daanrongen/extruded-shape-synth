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

var canvas, renderer, camera, light, scene, controls
var view
var width = window.innerWidth
var height = window.innerHeight

var mouse = new THREE.Vector3()
var posArray = []
var pos1, pos2

var circles = []

var line
var drawCount

function main() {
  canvas = document.querySelector("canvas")
  canvas.addEventListener("mousedown", onMouseDown, false)
  canvas.width = width
  canvas.height = height

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, width / height, 2, 100)
  camera.position.set(0, 0, 5)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  //   controls = new THREE.OrbitControls(camera, renderer.domElement)

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  var geometry = new THREE.BufferGeometry()
  var positions = new Float32Array(2 * 3)
  addLine(geometry, positions, 0x0000ff)
  updatePositions()

  requestAnimationFrame(render)
}

render = () => {
  renderer.render(scene, camera)

  drawCount = posArray.length
  line.geometry.setDrawRange(0, drawCount)
  line.geometry.attributes.position.needsUpdate = true

  updatePositions()
  requestAnimationFrame(render)
}

drawCircle = ({ x, y, z }, r, s) => {
  console.log(x, y, z)

  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  })

  var circleGeometry = new THREE.CircleGeometry(r, s)
  var circle = new THREE.Mesh(circleGeometry, material)
  circle.position.set(x, y, z)
  circle.rotation.set(0, 5, 0)

  scene.add(circle)
}

addLine = (geometry, positions, color) => {
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  drawCount = 2
  geometry.setDrawRange(0, drawCount)

  var material = new THREE.LineBasicMaterial({ color })
  line = new THREE.Line(geometry, material)

  scene.add(line)
}

updatePositions = () => {
  let positions = line.geometry.attributes.position.array
  let index = 0

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
    let currentPos = new THREE.Vector3(mouse.x, mouse.y, 0)

    currentPos.unproject(camera)
    posArray.push(currentPos)
  }
}

onMouseDown = (event) => {
  let x = (event.clientX / width) * 2 - 1
  let y = -(event.clientY / height) * 2 + 1
  let z = 0

  let currentPos = new THREE.Vector3(x, y, z)
  currentPos.unproject(camera)
  posArray.push(currentPos)

  drawCircle(currentPos, 0.5, 8)

  canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = (event) => {
  canvas.removeEventListener("mousemove", onMouseMove, false)
}

main()
