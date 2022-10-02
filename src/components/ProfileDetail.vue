<template>
  <div class="d-flex align-items-center" v-if="profile">
    <router-link :to="{name:'Profile', params: {id: profile.id}}">

      <img class="detail-img" :src="profile.picture" alt="" title="Profile Page">
    </router-link>
    <div>
      <h3>{{profile.name}}</h3>
      <div v-if="profile.class">
        <span>Class of {{profile.class}}</span>
      </div>
      <div class="d-flex">
        <div v-if="profile.graduated==true">
          <i class="mdi mdi-school p-1"></i>
        </div>
        <div v-if="profile.github">
          <i class="mdi mdi-github p-1"></i>
        </div>
        <div v-if="profile.linkedin">
          <i class="mdi mdi-linkedin p-1"></i>
        </div>
        <div v-if="profile.resume">
          <i class="mdi mdi-format-float-left p-1"></i>
        </div>
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
      type: Object,
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