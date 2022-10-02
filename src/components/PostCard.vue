<template>
  <div class="post-card m-2 col-12">

    <div class="post-card card d-flex elevation-3">
      <div class="card-header">
        <ProfileDetail :profile="post.creator" />
      </div>
      <div v-if="post.imgUrl" class="card-body p-3 d-flex justify-content-center">
        <img class="post-img img-fluid" :src="post.imgUrl" :alt="post.creator">
      </div>
      <p class="p-2">{{post.body}}</p>
      <small class="ps-2">Created At:</small>
      <small class="px-3">{{new Date(post.createdAt)}}</small>
      <div class="card-footer d-flex justify-content-end">
        <i @click="likePost(post.id)" class="mdi mdi-heart-outline selectable"
          title="Like Post"></i>{{post.likeIds.length}}
        <span>
          <div v-if="post.creatorId == account.id">
            <i @click="removePost(post.id)" class="mdi mdi-delete selectable p-2" title="Delete Post"></i>
          </div>
        </span>
      </div>
    </div>

  </div>
</template>




<script>

import { computed } from '@vue/reactivity';


import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import ProfileDetail from './ProfileDetail.vue';


export default {
  props: {
    post: { type: Object, required: true },
  },
  setup() {
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),

      async likePost(id) {
        // if (!this.account.id) {
        //   Pop.
        // }
        try {
          await postsService.likePost(id)
        } catch (error) {
          logger.error(error, "[likingPost]")
          Pop.error("You Are Not Logged In")
        }
      },
      async removePost(id) {
        if (
          await Pop.confirm()
        )
          try {
            await postsService.removePost(id)
          } catch (error) {
            logger.error(error, "[removingPost]")
            Pop.error("This isn't your post!")
          }
      }
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