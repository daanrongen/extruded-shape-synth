var pixel_resolution = 2
var container, stats
var camera, scene, renderer
var uniforms

init()
animate()

function init() {
  camera = new THREE.Camera()
  camera.position.set(0, 0, 1)
  scene = new THREE.Scene()

  var geometry = new THREE.SphereBufferGeometry(1, 1, 100, 100)

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
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

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.u_resolution.value.x = renderer.domElement.width
  uniforms.u_resolution.value.y = renderer.domElement.height
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function onMouseMove(event) {
  uniforms.u_mouse.value.x = 2 * (event.clientX / window.innerWidth)
  uniforms.u_mouse.value.y = 2 * (1 - event.clientY / window.innerHeight)
}

function render() {
  uniforms.u_time.value += 0.01
  renderer.render(scene, camera)
}
