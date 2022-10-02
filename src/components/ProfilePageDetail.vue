<template>
  <div class="d-flex align-items-center" v-if="profile">
    <div>
      <img class="profile-img" :src="profile.picture" alt="">

      <div v-if="profile.graduated==true">
        <i class="mdi mdi-school"></i>
      </div>
    </div>
    <div>
      <i class="mdi mdi-github p-2"></i>
      <i class="mdi mdi-linkedin p-2"></i>
      <i class="mdi mdi-format-list-bulleted-type p-2"></i>
    </div>

  </div>
  <div class="col-8">
    <h3>{{profile.name}}</h3>
    <p>{{profile.bio}}</p>
  </div>
</template>





<script>

import { computed } from '@vue/reactivity';

import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';

export default {
  props: {
    profile: {
      type: Account,
      required: true
    }
  },
  setup() {
    return {
      profile: computed(() => AppState.activeProfile)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-img {
  border-radius: 50%;
  height: 20vh;
  margin-right: 3vh;
}
</style>