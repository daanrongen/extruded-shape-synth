var pixel_resolution = 2
var container, stats
var camera, scene, renderer
var uniforms

init()
animate()

function init() {
  container = document.getElementById("container")
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 0, 4)
  scene = new THREE.Scene()

  var geometry = new THREE.SphereGeometry(1, 100, 100)

  uniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() },
    mouse: { type: "v2", value: new THREE.Vector2() },
  }

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  })

  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio / pixel_resolution)
  container.appendChild(renderer.domElement)

  onWindowResize()
  window.addEventListener("resize", onWindowResize, false)
  window.addEventListener("mousemove", onMouseMove, false)
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.resolution.value.x = renderer.domElement.width
  uniforms.resolution.value.y = renderer.domElement.height
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function onMouseMove(event) {
  uniforms.mouse.value.x = 2 * (event.clientX / window.innerWidth)
  uniforms.mouse.value.y = 2 * (1 - event.clientY / window.innerHeight)
}

function render() {
  uniforms.time.value += 0.01
  renderer.render(scene, camera)
}
