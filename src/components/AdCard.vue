<template>
  <div class="d-flex">

    <img class="ad-img mb-2" :src="ad.tall" alt="">
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
  width: 38vh;



}
</style>