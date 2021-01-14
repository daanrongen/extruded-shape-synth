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

var canvas, renderer, camera, light, scene, group
var width = window.innerWidth
var height = window.innerHeight

var circle
var circles = []

var mouse = new THREE.Vector3()
var drawCount = 2
var posArray = []

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

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 0, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  group = new THREE.Group()
  scene.add(group)

  addLine(0x0000ff)

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

addShape = (shape, color, { x, y, z }, { rx, ry, rz }) => {
  const geometry = new THREE.ShapeBufferGeometry(shape)

  mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({ color: color, wireframe: true })
  )
  mesh.position.set(x, y, z)
  mesh.rotation.set(rx, ry, rz)
  group.add(mesh)

  addLineShape(shape, color, { x, y, z }, { rx, ry, rz })
}

addLineShape = (shape, color, { x, y, z }, { rx, ry, rz }) => {
  const points = shape.getPoints()

  const geometryPoints = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(
    geometryPoints,
    new THREE.LineBasicMaterial({ color: color })
  )
  line.position.set(x, y, z)
  line.rotation.set(rx, ry, rz)

  const particles = new THREE.Points(
    geometryPoints,
    new THREE.PointsMaterial({ color: color, size: 0.05 })
  )
  particles.position.set(x, y, z)
  particles.rotation.set(rx, ry, rz)

  circles.push({ points, x, y, z })
  group.add(line, particles)
}

addLine = (color) => {
  const geometry = new THREE.BufferGeometry()
  let positions = new Float32Array(drawCount * 3)

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setDrawRange(0, drawCount)

  const material = new THREE.LineBasicMaterial({ color, linewidth: 1 })
  line = new THREE.Line(geometry, material)

  group.add(line)
}

drawCylinder = (c1, c2) => {
  console.log(c1, c2)
  let vertices = []

  //   c1.points.forEach((v2) => vertices.push(new THREE.Vector3(v2.x, v2.y, 0)))
  //   c2.points.forEach((v2) => vertices.push(new THREE.Vector3(v2.x, v2.y, 0)))

  const geometry = new THREE.Geometry()
  //   console.log(vertices)
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

    posArray.push(currentPos)
  }
}

onMouseDown = (event) => {
  let x = (event.clientX / width) * 2 - 1
  let y = -(event.clientY / height) * 2 + 1
  let z = 0

  let currentPos = new THREE.Vector3(x, y, z)
  posArray.push(currentPos)

  circle = new THREE.Shape()
    .moveTo(0, 0)
    .absarc(0, 0, 0.4, 0, Math.PI * 2, false)

  addLineShape(circle, 0x0000ff, currentPos, { rx: 5, ry: 0, rz: 0 }, 1)

  canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = (event) => {
  if (circles.length == 2) {
    drawCylinder(circles[0], circles[1])
  }

  canvas.removeEventListener("mousemove", onMouseMove, false)
}

main()
