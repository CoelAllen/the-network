<template>
  <div class="card mt-2 ms-.5">


    <form ref="postForm" @submit.prevent="handleSubmit">
      <div class="d-flex px-3">
        <div class="form-group w-100 mt-3">
          <label for="post-body">Make Post:</label>
          <textarea class="form-control" v-model="editable.body" id="post-body" rows="3"></textarea>
        </div>
      </div>
      <div class="my-3 d-flex">

        <div class="input-group px-2">
          <div class="input-group-prepend ">
            <span class="input-group-text" id="img-url">Image URL:</span>
          </div>
          <input type="url" class="form-control" v-model="editable.imgUrl" aria-label="Default"
            aria-describedby="img-url">
        </div>
        <button style="width:100px" type="submit" class="form-control btn btn-primary me-2">Post</button>
      </div>
    </form>
  </div>

</template>


<script>

import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {


  setup() {
    const editable = ref({})
    return {

      profile: computed(() => AppState.activeProfile),
      editable,
      async handleSubmit() {
        try {
          await postsService.createPost(editable.value)
          // editable.value = {
          //   post: {}
          // }
        } catch (error) {
          Pop.error(error, '[submittingPostForm]')
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.detail-img {
  border-radius: 50%;
  height: 8vh;
  margin-right: 3vh;
  margin-top: 3vh;
}
</style>