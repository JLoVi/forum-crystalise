<template>
  <div class="w-full">
    <div class="shadow w-full standard-font">
      <div class="animation bg-blue text-xs leading-none py-1 text-center text-white" :style="{ width: '' + incrPct + '%' }">
        <!-- {{ incrPct }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incrPct: 0,
      maxPct: 100
    }
  },
  mounted() {
    setInterval(() => {
      if (this.incrPct === this.maxPct) { this.$emit('endedProgress'); return }
      //   if (this.isPaused) { return }
      this.incrPct = Math.min(this.incrPct + 10, 120)
    }, 1000)
  },
  methods: {
  }
}
</script>

<style scoped>
.animation {
    -webkit-transition: width 3s; /* For Safari 3.1 to 6.0 */
    transition: width 3s;
    background: rgb(172,172,172);
    background: linear-gradient(90deg, rgba(172,172,172,1) 0%, rgba(173,255,252,1) 50%, rgba(144,255,231,1) 97%, rgba(255,255,255,1) 100%);
    padding: 1rem;
    padding-top: 100rem;
}
</style>
