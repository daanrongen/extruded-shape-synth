var canvas, renderer, camera, light, scene, list
var width = window.innerWidth
var height = window.innerHeight

var mouse = new THREE.Vector3()
var currentPos = new THREE.Vector3()

var points = []
var shapes = []
var tones = []

var maximJs = maximilian()

var playHead = 0
var synth = new maxiSynth()
var maxiAudio = new maximJs.maxiAudio()
maxiAudio.outputIsArray(true, 2)

var myClock = new maximJs.maxiClock()
myClock.setTempo(80)
myClock.setTicksPerBeat(4)
var settings = new maximJs.maxiSettings()
settings.sampleRate = 44100

var counter = 0

var carrier = new maximJs.maxiOsc()
var frequency = new THREE.Vector2()

var color
var playMelody = false

function main() {
  canvas = document.querySelector("canvas")
  canvas.addEventListener("mousedown", onMouseDown, false)
  canvas.addEventListener("mousemove", trackMousePos, false)
  canvas.width = width
  canvas.height = height

  list = document.getElementById("marqueeList")

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  scene = new THREE.Scene()

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.set(0, 0, 5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  light = new THREE.HemisphereLight(0xffffff, 0x00ffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  maxiAudio.init()

  maxiAudio.play = () => {
    myClock.ticker()

    if (myClock.tick && playMelody) {
      runSynths(counter)
      counter++

      if (counter > 3) {
        tones[0] = 0
        playMelody = false

        counter = 0
        runSynths(counter)
      }

      console.log(counter)
    }

    let oscillator = carrier.sinewave(frequency.x * Math.cos(frequency.y))
    let mix = oscillator + synth.play()

    return mix
  }

  requestAnimationFrame(render)
}

render = () => {
  renderer.render(scene, camera)

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  camera.position.set(currentPos.x, currentPos.y, 5)

  requestAnimationFrame(render)
}

drawLine = (point) => {
  points.push(point)

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometry, material)
  scene.add(line)
}

drawShape = (r, s) => {
  let circle = new THREE.Shape()
  circle.moveTo(0, 0).absarc(0, 0, r, 0, Math.PI * 2, false)

  let path = new THREE.CatmullRomCurve3(points)
  let step = path.points.length

  let geometry = new THREE.ExtrudeBufferGeometry(circle, {
    extrudePath: path,
    curveSegments: s,
    steps: step,
  })

  randomValue = (min, max) =>
    Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
    )

  let red = randomValue(50, 255)
  let green = randomValue(50, 255)
  let blue = randomValue(50, 255)

  color = new THREE.Color(`rgb(${red}, ${green}, ${blue})`)

  tones = [randomValue(200, 500), randomValue(200, 500), randomValue(200, 500)]

  let material = new THREE.MeshPhongMaterial({ color })
  var mesh = new THREE.Mesh(geometry, material)

  shapes.push(mesh)
  scene.add(mesh)

  addColor(red, green, blue)
}

onMouseMove = (event) => {
  if (renderer) {
    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1
    mouse.z = 0

    frequency.x = -mouse.x * 1000
    frequency.y = -mouse.y * 1000

    let currentPos = new THREE.Vector3(mouse.x, mouse.y, mouse.z)

    drawLine(currentPos)
  }
}

trackMousePos = (event) => {
  currentPos.x = (event.clientX / width) * 0.25 - 0.125
  currentPos.y = -(event.clientY / height) * 0.25 + 0.125
  currentPos.z = 0
}

onMouseDown = (event) => {
  mouse.x = (event.clientX / width) * 2 - 1
  mouse.y = -(event.clientY / height) * 2 + 1
  mouse.z = 0

  points = new Array()
  points.push(new THREE.Vector3(mouse.x, mouse.y, mouse.z))

  canvas.addEventListener("mousemove", onMouseMove, false)
  canvas.addEventListener("mouseup", onMouseUp, false)
}

onMouseUp = () => {
  drawShape(0.05, 32)
  playMelody = true

  frequency.x = 0
  frequency.y = 0

  scene.children
    .filter((child) => child.type === "Line")
    .forEach((line) => scene.remove(line))

  canvas.removeEventListener("mousemove", onMouseMove, false)
}

runSynths = (counter) => {
  console.log(counter, playMelody)
  synth.saw = true
  synth.frequency = tones[counter]
  synth.cutoff = 500
  synth.adsr.trigger = 1
}

addColor = (r, g, b) => {
  let li = document.createElement("li")
  li.id = `li-${shapes.length}`
  let div = document.createElement("div")
  let circle = document.createElement("span")
  circle.innerHTML = "⬤ "
  circle.style.color = `rgb(${r}, ${g}, ${b})`
  let text = document.createElement("span")
  text.innerHTML = `rgb(${r}, ${g}, ${b})`

  div.appendChild(circle)
  div.appendChild(text)
  li.appendChild(div)

  list.appendChild(li)
}

resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio
  const width = (canvas.clientWidth * pixelRatio) | 0
  const height = (canvas.clientHeight * pixelRatio) | 0
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
  }

  return needResize
}

window.onload = main
