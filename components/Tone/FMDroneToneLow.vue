<template>
  <div>
    <div id="tone" />
  </div>
</template>

<script>
export default {
  name: 'FMDRoneTone',
  data() {
    return {
      container: null,
      dottedMaterial: null
    }
  },
  mounted() {
    // console.log(' *****************   TONE MOUNTED  ********************')
    this.$Tone.Transport.bpm.value = 60
    this.play()
  },
  methods: {
    fmDrone: function (notes, playSeconds, tailSeconds) {
      const reverb = new this.$Tone.Reverb({ decay: playSeconds / 4, wet: 0.8 })
      reverb.generate() // Risky not to wait but ¯\_(ツ)_/¯

      const synth = new this.$Tone.PolySynth(notes.length, this.$Tone.FMSynth).chain(
        new this.$Tone.Chorus({ frequency: 0.33, depth: 0.7, wet: 0.85 }),
        new this.$Tone.FeedbackDelay({
          delayTime: playSeconds / 16,
          feedback: 0.33,
          wet: 0.66
        }),
        reverb,
        this.$Tone.Master
      )

      synth.set({
        harmonicity: 0.5,
        modulationIndex: 1,
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: playSeconds / 4,
          sustain: 1,
          release: tailSeconds - 1,
          attackCurve: 'linear',
          releaseCurve: 'linear'
        },
        modulation: { type: 'sine' },
        modulationEnvelope: {
          attack: playSeconds * 2,
          sustain: 1,
          release: tailSeconds,
          releaseCurve: 'linear'
        },
        volume: -30
      })
      synth.triggerAttackRelease(notes, playSeconds)
    },
    fmBells: function (notes, playSeconds, tailSeconds) {
      const delay = new this.$Tone.FeedbackDelay({
        delayTime: playSeconds / 8,
        feedback: 0.88,
        wet: 0.66
      })

      const flanger = new this.$Tone.FeedbackDelay({
        delayTime: 0.005,
        feedback: 0.1,
        wet: 0.33
      })
      new this.$Tone.LFO(1, 0.003, 0.007).start().connect(flanger.delayTime)

      const reverb = new this.$Tone.Reverb({ decay: playSeconds / 4, wet: 0.8 })
      reverb.generate() // Risky not to wait but ¯\_(ツ)_/¯

      const synth = new this.$Tone.PolySynth(5, this.$Tone.FMSynth).chain(
        delay,
        flanger,
        reverb,
        this.$Tone.Master
      )
      synth.set({
        harmonicity: 1.4,
        modulationIndex: 1,
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.6,
          release: tailSeconds - 1
        },
        modulation: { type: 'triangle' },
        modulationEnvelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.6,
          release: tailSeconds
        },
        volume: -30
      })
      synth.triggerAttackRelease(notes, playSeconds)
    },

    bounceChord: function (notes, synthFn, playDuration, tailDuration) {
      const playSeconds = this.$Tone.Time(playDuration).toSeconds()
      const tailSeconds = this.$Tone.Time(tailDuration).toSeconds()
      return this.$Tone.Offline(
        () => synthFn(notes, playSeconds, tailSeconds),
        playSeconds + tailSeconds
      )
    },
    play: function () {
      // console.log(' *****************   TONE = > PLAY    ********************')
      const that = this
      Promise.all([
        this.bounceChord(['A#4', 'F5', 'A#5', 'D#6', 'F6'], this.fmDrone, 3, 3),
        this.bounceChord(['D#5', 'A#5', 'C4', 'G4', 'A#4', 'C7'], this.fmDrone, 3, 3),
        this.bounceChord(['F4', 'C4', 'D#5', 'A#5', 'C6'], this.fmDrone, 3, 3),
        this.bounceChord(['A#5', 'D#4', 'G4', 'C5', 'D#5', 'G6'], this.fmDrone, 3, 3),
        this.bounceChord(['A#4', 'F5', 'A#5', 'D#6', 'F6'], this.fmBells, 3, 3),
        this.bounceChord(['D#5', 'A#5', 'C4', 'G4', 'A#4', 'C7'], this.fmBells, 3, 3),
        this.bounceChord(['F4', 'C4', 'D#5', 'A#5', 'C6'], this.fmBells, 3, 3),
        this.bounceChord(['A#5', 'D#4', 'G4', 'C5', 'D#5', 'G6'], this.fmBells, 3, 3)
      ]).then((buffers) => {
        const patternCtrl = new that.$Tone.CtrlPattern([0, 1, 2, 3], 'random')
        const timeCtrl = new that.$Tone.CtrlRandom(6, 18)
        function next(time) {
          const droneBuffer = buffers[patternCtrl.next()]
          const bellBuffer = buffers[4 + patternCtrl.next()]
          new that.$Tone.BufferSource({ buffer: droneBuffer, playbackRate: 0.125 })
            .toMaster()
            .start(time)
          new that.$Tone.BufferSource({ buffer: bellBuffer, playbackRate: 0.125 })
            .toMaster()
            .start(time)
          that.$Tone.Transport.scheduleOnce(next, '+' + timeCtrl.value)
        }
        next(that.$Tone.now())
      })
      this.$Tone.Transport.start()
      // document.querySelector('button').remove();
    }
  }
}
</script>
