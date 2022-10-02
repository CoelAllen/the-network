<template>
  <div class="component">
    <router-link :to="{name: 'Profile', params: {id:creator.id}}">
      <div class="card-header d-flex my-2">
        <img class="post-img" :src="creator.picture" :alt="creator.name" :title="creator.name">
        <div class="p-2">
          <p><b>{{creator.name}}</b></p>
          <i class="mdi mdi-school" v-if="creator.graduated == true"></i>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

import { Account } from '../models/Account.js';

export default {
  props: {
    creator: {
      type: Account,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.post-img {
  height: 8vh;
  width: auto;
  border-radius: 50%;

}
</style>
      
      
     


      
      
      
      
      
      
      