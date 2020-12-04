var camera, scene, renderer, mesh

var dim = 10
var spacing = (Math.PI * 2) / dim
var numPoints = dim * dim
var size = 10

init()
animate()

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 0, 30)

  scene = new THREE.Scene()
  var geometry = new THREE.Geometry()

  const spotlight = new THREE.DirectionalLight(0xffffff, 1)
  spotlight.position.set(0, 1, 5)
  scene.add(spotlight)

  for (var i = 0; i < dim + 1; i++) {
    var z = size * Math.cos((spacing / 2) * i)
    var s = size * Math.sin((spacing / 2) * i)
    for (var j = 0; j < dim; j++) {
      var x1 = Math.cos(spacing * j) * s
      var y1 = Math.sin(spacing * j) * s
      var z1 = z

      geometry.vertices.push(new THREE.Vector3(x1, y1, z1))
    }
  }

  for (let i = dim + 1; i < numPoints + dim; i++) {
    geometry.faces.push(new THREE.Face3(i, i - 1, i - dim))
    geometry.faces.push(new THREE.Face3(i - dim - 1, i - dim, i - 1))
  }

  var material = new THREE.MeshPhongMaterial({
    wireframe: true,
  })
  mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.y = Math.PI / 2
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1)
  document.body.appendChild(renderer.domElement)
  window.addEventListener("resize", onWindowResize, false)
}

function animate() {
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
