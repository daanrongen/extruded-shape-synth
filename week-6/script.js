function main() {
  const canvas = document.querySelector("canvas")

  const renderer = new THREE.WebGLRenderer({ canvas })
  const loader = new THREE.TextureLoader()

  renderer.setClearColor(0xffffff, 1)

  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 40, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(100, 100, -100)
  scene.add(light)

  var geometry = new THREE.SphereGeometry(1, 32, 32)

  const objects = []

  const earthOrbit = new THREE.Object3D()
  scene.add(earthOrbit)
  objects.push(earthOrbit)

  loader.load("2_no_clouds_4k.jpg", (texture) => {
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      map: texture,
    })

    const earthMesh = new THREE.Mesh(geometry, earthMaterial)
    earthMesh.scale.set(5, 5, 5)
    earthOrbit.add(earthMesh)
    objects.push(earthMesh)
  })

  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 10
  earthOrbit.add(moonOrbit)

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  })
  const moonMesh = new THREE.Mesh(geometry, moonMaterial)
  moonOrbit.add(moonMesh)
  objects.push(moonMesh)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height

    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }

  function render(time) {
    time *= 0.0002

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach((obj) => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
