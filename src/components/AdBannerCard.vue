<template>
  <div class="text-center">

    <img class="ad-img" :src="ad.banner" alt="">
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'



export default {
  props: {
    ad: { type: Object, required: true }
  },
  setup() {
    return {
      ads: computed(() => AppState.ads)
    }

  }
}
</script>


<style lang="scss" scoped>
.ad-img {
  width: 80vh;



}
</style>