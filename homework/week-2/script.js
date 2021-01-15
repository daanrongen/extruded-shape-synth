var maximJs = maximilian()
var maxiSynth

var kick
var snare
var hat

const tones = {
  A: 220,
  B: 247,
  C: 261,
  D: 293,
  E: 330,
  F: 349,
  G: 392,
}

const { A, B, C, D, E, F, G } = tones
const arpeggiator = Object.values(tones).map((tone) => tone)

var playHead = 0
var mySynth = new maxiSynth()
var maxiAudio = new maximJs.maxiAudio()

maxiAudio.outputIsArray(true, 2)
maxiAudio.init()

var myClock = new maximJs.maxiClock()
myClock.setTempo(120)
myClock.setTicksPerBeat(4)

var kick1 = new maximJs.maxiSample()
var snare1 = new maximJs.maxiSample()
var hat1 = new maximJs.maxiSample()

kick1.setSample(maximJs.maxiTools.getArrayAsVectorDbl(kick))
snare1.setSample(maximJs.maxiTools.getArrayAsVectorDbl(snare))
hat1.setSample(maximJs.maxiTools.getArrayAsVectorDbl(hat))

maxiAudio.play = function () {
  if (kick1.isReady() && snare1.isReady) {
    myClock.ticker()

    if (myClock.tick) {
      playHead++

      runSynths(playHead)

      if (playHead % 8 == 4) {
        kick1.trigger()
      } else if (playHead % 4 == 0) {
        snare1.trigger()
      }

      if (playHead % 4 == 2) {
        hat1.trigger()
      }
    }

    var kickOut = kick1.playOnce()
    var snareOut = snare1.playOnce()
    var hatOut = hat1.playOnce() * 0.3

    var mix = kickOut + snareOut + hatOut + mySynth.play()

    return mix
  }
}

function runSynths(playHead) {
  mySynth.saw = true
  mySynth.frequency = arpeggiator[playHead % arpeggiator.length]
  mySynth.cutoff = 500
  mySynth.adsr.trigger = 1
}
