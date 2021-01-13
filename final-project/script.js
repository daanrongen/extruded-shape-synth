/**
 * custom procedural shapes:
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_shapes.html
 *
 * 3d polylines:
 * http://jaanga.github.io/blode/lines-with-width-and-thickness/sphere-and-cylinder-polylines/sphere-and-cylinder-polylines.html#
 *
 * custom geometry:
 * https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html
 */

var canvas, renderer, camera, light, scene
var width = window.innerWidth
var height = window.innerHeight

function main() {
  canvas = document.querySelector("canvas")
  canvas.width = width
  canvas.height = height
  const objects = []

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })

  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
  camera.position.set(0, 0, 10)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  scene = new THREE.Scene()

  light = new THREE.PointLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  const geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(-1, -1, 1), // 0
    new THREE.Vector3(1, -1, 1), // 1
    new THREE.Vector3(-1, 1, 1), // 2
    new THREE.Vector3(1, 1, 1), // 3
    new THREE.Vector3(-1, -1, -1), // 4
    new THREE.Vector3(1, -1, -1), // 5
    new THREE.Vector3(-1, 1, -1), // 6
    new THREE.Vector3(1, 1, -1) // 7
  )

  geometry.faces.push(
    // front
    new THREE.Face3(0, 3, 2),
    new THREE.Face3(0, 1, 3),
    // right
    new THREE.Face3(1, 7, 3),
    new THREE.Face3(1, 5, 7),
    // back
    new THREE.Face3(5, 6, 7),
    new THREE.Face3(5, 4, 6),
    // left
    new THREE.Face3(4, 2, 6),
    new THREE.Face3(4, 0, 2),
    // top
    new THREE.Face3(2, 7, 6),
    new THREE.Face3(2, 3, 7),
    // bottom
    new THREE.Face3(4, 1, 0),
    new THREE.Face3(4, 5, 1)
  )

  geometry.computeFaceNormals()

  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    // wireframe: true,
    // wireframeLinewidth: 2,
  })
  const shape = new THREE.Mesh(geometry, material)
  objects.push(shape)

  function render(time) {
    time *= 0.0002

    objects.forEach((obj) => {
      obj.rotation.y = time
      obj.rotation.z = time
      scene.add(obj)
    })

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
