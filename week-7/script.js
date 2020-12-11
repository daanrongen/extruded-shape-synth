var pixel_resolution = 3
var container, stats
var camera, scene, renderer
var uniforms

init()
animate()

function init() {
  camera = new THREE.Camera()
  camera.position.z = 1
  scene = new THREE.Scene()
  var geometry = new THREE.PlaneBufferGeometry(2, 2)

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
  document.body.appendChild(renderer.domElement)

  onWindowResize()
  window.addEventListener("resize", onWindowResize, false)
  window.addEventListener("mousemove", onMouseMove, false)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  uniforms.time.value += 0.01
  renderer.render(scene, camera)
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.resolution.value.x = renderer.domElement.width
  uniforms.resolution.value.y = renderer.domElement.height
}

function onMouseMove(event) {
  uniforms.mouse.value.x = 2 * (event.clientX / window.innerWidth)
  uniforms.mouse.value.y = 2 * (1 - event.clientY / window.innerHeight)
}
