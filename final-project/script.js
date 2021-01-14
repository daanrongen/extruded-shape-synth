var canvas, renderer, camera, light, scene
var width = window.innerWidth
var height = window.innerHeight

var mouse = new THREE.Vector3()
var drawCount = 10

var points = []
var shapes = []

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
  camera.position.set(0, 0, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  requestAnimationFrame(render)
}

render = (time) => {
  time *= 0.0001
  renderer.render(scene, camera)

  shapes.forEach((shape) => {
    const rotation = time
    shape.rotation.x = rotation
    shape.rotation.y = rotation
  })

  requestAnimationFrame(render)
}

drawLine = () => {
  const material = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 2,
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometry, material)
  scene.add(line)
}

drawShape = () => {
  const group = new THREE.Group()

  let circle = new THREE.Shape()
  circle.moveTo(0, 0).absarc(0, 0, 0.05, 0, Math.PI * 2, false)

  let path = new THREE.CatmullRomCurve3(points)
  let step = path.points.length
  let geometry = new THREE.ExtrudeBufferGeometry(circle, {
    extrudePath: path,
    curveSegments: 4,
    steps: step,
  })

  let material = new THREE.MeshPhongMaterial({ color: null })

  var mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)

  shapes.push(group)
  scene.add(group)
}

onMouseMove = (event) => {
  if (renderer) {
    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1
    mouse.z = 0

    let currentPos = new THREE.Vector3(mouse.x, mouse.y, mouse.z)
    points.push(currentPos)

    drawLine()
  }
}

onMouseDown = (event) => {
  mouse.x = (event.clientX / width) * 2 - 1
  mouse.y = -(event.clientY / height) * 2 + 1
  mouse.z = 0

  points = new Array()
  let currentPos = new THREE.Vector3(mouse.x, mouse.y, mouse.z)
  points.push(currentPos)

  canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = () => {
  drawShape()

  scene.children
    .filter((child) => child.type === "Line")
    .forEach((line) => scene.remove(line))

  canvas.removeEventListener("mousemove", onMouseMove, false)
}

main()
