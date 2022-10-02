<template>
  <div class="post-card m-2 col-12">

    <div class="post-card card d-flex">
      <div class="card-header">
        <ProfileDetail :profile="post.creator" />
      </div>
      <div v-if="post.imgUrl" class="card-body p-3 d-flex justify-content-center">
        <img class="post-img img-fluid" :src="post.imgUrl" :alt="post.creator">
      </div>
      <p class="p-2">{{post.body}}</p>
      <div class="card-footer d-flex justify-content-end">
        <!-- TODO make like function -->
        <i class="mdi mdi-heart-outline"></i>{{post.likeIds.length}}
        <span>
          <div v-if="profile">
            <i class="mdi mdi-delete"></i>
          </div>
        </span>
      </div>
    </div>

  </div>
</template>




<script>

import { computed } from '@vue/reactivity';

import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import ProfileDetail from './ProfileDetail.vue';


export default {
  props: {
    post: { type: Post, required: true }
  },
  setup() {
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts)
    };
  },
  components: { ProfileDetail }
}
</script>


<style lang="scss" scoped>
.post-img {

  max-height: 20vh;
}
</style>