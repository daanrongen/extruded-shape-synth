function main() {
  const canvas = document.querySelector("canvas")
  const renderer = new THREE.WebGLRenderer({ canvas })

  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 5, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(-10, 10, 10)
  scene.add(light)

  const objects = []

  const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    })
  )
  scene.add(earthMesh)
  objects.push(earthMesh)

  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 1.4
  earthMesh.add(moonOrbit)

  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    })
  )
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
