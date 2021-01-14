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
 *
 * THREE.ExtrudeBufferGeometry
 * https://discourse.threejs.org/t/three-extrudebuffergeometry-how-to-extrude-according-to-the-given-path-point/8349
 */

var canvas, renderer, camera, light, scene, group
var width = window.innerWidth
var height = window.innerHeight

var mouse = new THREE.Vector3()
var drawCount = 10

var posArray = []
var shapesArray = []

var line

function main() {
  canvas = document.querySelector("canvas")
  canvas.addEventListener("mousedown", onMouseDown, false)
  canvas.width = width
  canvas.height = height

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(0, 0, 2)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  addLine()

  requestAnimationFrame(render)
}

render = (time) => {
  time *= 0.001
  renderer.render(scene, camera)

  // shapesArray.forEach((shape) => {
  //   shape.rotation.x = time
  //   shape.rotation.y = time
  // })

  updatePositions()
  requestAnimationFrame(render)
}

addLine = () => {
  const geometry = new THREE.BufferGeometry()
  let positions = new Float32Array(drawCount * 3)

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setDrawRange(0, drawCount)
  const material = new THREE.LineBasicMaterial()
  line = new THREE.Line(geometry, material)

  scene.add(line)
}

drawShape = (index) => {
  group = new THREE.Group()

  let circle = new THREE.Shape()
  circle.moveTo(0, 0).absarc(0, 0, 0.05, 0, Math.PI * 2, false)

  let path = new THREE.CatmullRomCurve3(posArray)
  let step = path.points.length
  let geometry = new THREE.ExtrudeBufferGeometry(circle, {
    extrudePath: path,
    curveSegments: 4,
    steps: step,
  })

  let material = new THREE.MeshPhongMaterial({ color: null })

  var mesh = new THREE.Mesh(geometry, material)
  // group.add(mesh)
  scene.add(mesh)

  shapesArray[index] = 1
}

updatePositions = () => {
  let positions = line.geometry.attributes.position.array
  let index = 0

  drawCount = posArray.length
  line.geometry.setDrawRange(0, drawCount)
  line.geometry.attributes.position.needsUpdate = true

  for (let i = 0; i < drawCount; i++) {
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
    posArray.push(currentPos)

    if (posArray.length > 2) {
      drawShape(shapesArray.length)
    }
  }
}

onMouseDown = (event) => {
  let x = (event.clientX / width) * 2 - 1
  let y = -(event.clientY / height) * 2 + 1
  let z = 0

  let currentPos = new THREE.Vector3(x, y, z)
  posArray = new Array()
  posArray.push(currentPos)

  canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = () => {
  // shapesArray.push(posArray)
  console.log(shapesArray)
  canvas.removeEventListener("mousemove", onMouseMove, false)
}

main()
