<template>
  <div class="d-flex align-items-center" v-if="profile">
    <router-link :to="{name:'Profile', params: {id: profile.id}}">

      <img class="detail-img" :src="profile.picture" alt="">
    </router-link>
    <div>
      <h3>{{profile.name}}</h3>
      <p>{{profile.class}}</p>
      <div v-if="profile.graduated==true">

        <i class="mdi mdi-school"></i>
      </div>


    </div>
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
    }
  }
}
</script>


<style lang="scss" scoped>
.detail-img {
  border-radius: 50%;
  height: 8vh;
  width: 8vh;
  margin-right: 3vh;
}
</style>