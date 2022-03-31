<template>
  <div class="pitch-chart">
    <div class="controls">
      <select v-model="oscillatorType">
        <option
          v-for="type in  oscillatorTypes"
          :key="type"
          :value="type">
          {{ type }}
        </option>
      </select>
      Gain
      <input type="range" :step="0.01" :min="0.01" :max="2" v-model.number="gain">
      <span class="gain">{{ gain }}</span>

      Fadeout
      <input type="range" :step="0.01" :min="0.03" :max="20" v-model.number="fadeout">
      <span class="fadeout">{{ fadeout }}</span>

      <span v-if="touches.length">{{ touches.join(', ') }}Hz</span>
    </div>

    <div class="freq-track" ref="freq-track">
      <svg width="15000" height="100" stroke="#aaa" stroke-width="1" viewbox="0,0,15000,100">
        <line x1="50%" x2="50%" y1="0" y2="100" stroke="#eee"></line>
        <line x1="0" x2="10000" y1="50" y2="50"></line>

        <template v-for="(item, idx) in freqs">
          <line
            :x1="item.freq"
            :x2="item.freq"
            y1="45" y2="55"></line>
          <text
            :x="item.freq"
            :y="isWhite(idx) ? 60 : 40"
            fill="#666"
            alignment-baseline="middle" text-anchor="middle">
            {{ item.name }}
          </text>
        </template>
      </svg>
    </div>
  </div>
</template>

<script>
function noteToFreq (noteNumber) {
  // noteNumber: 1 = A0 ... 13 = A1... 88 = C8
  // refer: https://en.wikipedia.org/wiki/Piano_key_frequencies
  let freq = Math.pow(Math.pow(2, 1 / 12), noteNumber - 49) * 440
  return Math.round(freq * 100000) / 100000
}

const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
const keys = 88
const freqs = []

for (let i = 1; i <= keys; i++) {
  let num = Math.floor(i / 12)
  if (i % 12 > 3) num += 1

  freqs.push({
    freq: noteToFreq(i),
    name: notes[(i - 1) % 12] + num
  })
}

const CUSTOM_OSC_TYPE = {
  horn: new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]),
  organ: new Float32Array([0,0,1,0,1]),
  organ2: new Float32Array([0.000000,-0.000000,-0.042008,0.010474,-0.138038,0.002641,-0.001673,0.001039,-0.021054,0.000651,-0.000422,0.000334,-0.000236,0.000191,-0.000161,0.000145,-0.018478,0.000071,-0.000066,0.000047,-0.000044,0.000041,-0.000034,0.000031,-0.000030,0.000028,-0.000025,0.000024,-0.000022,0.000020,-0.000015,0.000013,-0.011570,0.000004,-0.000003,0.000003,-0.000003,0.000003,-0.000003,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000001,0.000001,-0.000001,0.000001,-0.000000,0.000000,-0.000000,0.000000,-0.000000,0.000000,-0.000000,0.000000,-0.000000,0.000000,-0.000000,0.000000,-0.000898,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000000,-0.000000,0.000000]),
  organ3: new Float32Array([0,0.2,0,-0.2])
}

export default {
  data () {
    return {
      oscillatorTypes: ['sine', 'square', 'sawtooth', 'triangle', 'custom_horn', 'custom_organ', 'custom_organ2', 'custom_organ3'],
      oscillatorType: 'sine',
      freqs,
      context: null,
      analyser: null,
      gainNode: null,
      oscillator: null,
      sounds: [],
      touches: [],
      touching: false,
      fadeout: 0.03,
      gain: 0.25
    }
  },
  computed: {
    track () {
      return this.$refs['freq-track']
    }
  },
  methods: {
    // 符號是否為白鍵（白鍵true 黑鍵false）
    isWhite (idx) {
      // A = 0 B = 2 C = 3 D = 5 E = 7 F = 8 G = 10
      return [0, 2, 3, 5, 7, 8, 10].includes(idx % 12)
    },

    initAudioAPI () {
      this.context = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.context.createAnalyser()
      this.analyser.connect(this.context.destination)
    },

    setFreq () {
      for (let i in this.touches) {
        // let touch = this.touches[i]
        // const rect = this.track.getBoundingClientRect()

        // let x = touch - rect.left
        var x = this.touches[i]
        x = x > 0 ? x : 0

        if (this.sounds[i]) {
          this.sounds[i].sound.setValueAtTime(x, this.context.currentTime)
        } else {
          // create new oscillator node
          const oscillator = this.context.createOscillator()
          const gainNode = this.context.createGain()
          gainNode.gain.value = this.gain
          gainNode.connect(this.analyser)
          oscillator.connect(gainNode)
          oscillator.start(this.context.currentTime)

          // set osc type
          const customOscType = this.oscillatorType.search('custom') > -1

          if (customOscType) {
            var real = CUSTOM_OSC_TYPE[this.oscillatorType.replace('custom_', '')]
            var imag = new Float32Array(real.length) // cos
            var wave = this.context.createPeriodicWave(real, imag)
            oscillator.setPeriodicWave(wave)
          } else {
            oscillator.type = this.oscillatorType
          }

          let sound = oscillator.frequency.setValueAtTime(x, this.context.currentTime)

          this.sounds.push({ sound, oscNode: oscillator, gainNode })
        }
      }

      // 如果現有聲部大於touch數量，則需移除聲部
      if (this.sounds.length > this.touches.length) {
        let begin = this.touches.length
        let end = this.sounds.length

        for (let i = begin; i < end; i++) {
          // remove the sound
          // important! set gain value again
          this.sounds[begin].gainNode.gain.setValueAtTime(this.sounds[begin].gainNode.gain.value, this.context.currentTime)
          // and fadeout
          this.sounds[begin].gainNode.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + this.fadeout)
          this.sounds[begin].oscNode.stop(this.context.currentTime + this.fadeout)
          this.sounds.splice(begin, 1)
        }
      }
    },

    // 解析mouse, touch events
    // 新增 mouseUp 是因爲mouseup event還是會回傳clientX，無法判定是否還按著
    parseTouches ($event, mouseUp) {
      const touches = []
      const rect = this.track.getBoundingClientRect()

      if ($event.touches) {
        for (let touch of $event.touches) {
          if (this.track.contains(touch.target)) {
            touches.push(touch.clientX - rect.left)
          }
        }
      } else if ($event.clientX && !mouseUp) {
        if (this.track.contains($event.target)) {
          touches.push($event.clientX - rect.left)
        }
      }

      return touches
    },

    // events
    onTouchStart ($event) {
      // init audio
      if (!this.context) {
        this.initAudioAPI()
      }

      this.context.resume()

      if (this.track.contains($event.target)) {
        $event.preventDefault()

        // touches
        this.touches = this.parseTouches($event)
        this.setFreq()

        this.touching = true
      }
    },
    onTouchMove ($event) {
      if (!this.touching) return

      $event.preventDefault()

      // touches
      this.touches = this.parseTouches($event)
      this.setFreq()
    },
    onTouchEnd ($event) {
      if (!this.touching) return

      $event.preventDefault()

      // touches
      this.touches = this.parseTouches($event, true)
      this.setFreq()

      if (!this.touches.length) {
        this.touching = false
      }
    }
  },

  beforeDestroy () {
    document.removeEventListener('mousedown', this.onTouchStart)
    document.removeEventListener('mousemove', this.onTouchMove)
    document.removeEventListener('mouseup', this.onTouchEnd)
    document.removeEventListener('touchstart', this.onTouchStart)
    document.removeEventListener('touchmove', this.onTouchMove)
    document.removeEventListener('touchend', this.onTouchEnd)
  },
  mounted () {
    document.addEventListener('mousedown', this.onTouchStart, { passive: false })
    document.addEventListener('mousemove', this.onTouchMove, { passive: false })
    document.addEventListener('mouseup', this.onTouchEnd, { passive: false })
    document.addEventListener('touchstart', this.onTouchStart, { passive: false })
    document.addEventListener('touchmove', this.onTouchMove, { passive: false })
    document.addEventListener('touchend', this.onTouchEnd, { passive: false })
  }
}
</script>

<style lang="scss">
.pitch-chart {
  position: relative;
  width: fit-content;

  .controls {
    position: sticky;
    left: 0;
    width: 100vw;
    padding: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #fff;
    font-size: 12px;

    .fadeout,
    .gain {
      margin-right: 10px;
      padding: 0 5px;
      border-radius: 100px;
      background: #eee;
      color: #222;
    }
  }

  select {
    width: 100px;
    font-size: 16px;
  }

  input[type=range] {
    width: 80px;
  }

  .touches-obj {
    background: #222;
  }

  .freq-track {
    background: #2c2c2c;

    text {
      font-size: 6px;
      stroke: none;
    }
  }
}
</style>
