<template>
  <!-- TODO Make new post Function, must be logged in!! -->
  <div class="g-0 container-fluid d-flex w-100">
    <section class="col-md-8 m-2">
      <div v-if="account.id">
        <PostForm />
      </div>

      <PostCard v-for="p in posts" :post="p" />
      <div class="d-flex justify-content-between">

        <span @click="newerPage(previousPage)" :disabled="!previousPage" :class="{'disabled d-none' : !previousPage}"
          class="d-flex align-items-center selectable">
          <i class="mdi mdi-chevron-double-left fs-2"></i>
          <h4 class="mb-0">Last Page</h4>
        </span>
        <span @click="olderPage(nextPage)" :disabled="!nextPage" :class="{'disabled d-none' : !nextPage}"
          class="d-flex align-items-center selectable">
          <h4 class="mb-0">Next Page</h4>
          <i class="mdi mdi-chevron-double-right fs-2"></i>
        </span>
      </div>
    </section>
    <div class="ms-4 mt-3 ads">
      <AdCard v-for="a in ads" :ad="a" />
      <AdCard v-for="a in ads" :ad="a" />
      <AdCard v-for="a in ads" :ad="a" />
      <AdCard v-for="a in ads" :ad="a" />
      <AdCard v-for="a in ads" :ad="a" />
    </div>

  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { onMounted, popScopeId } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue'
import ProfileDetail from '../components/ProfileDetail.vue';
import { useRoute } from 'vue-router';
import AdCard from '../components/AdCard.vue';
import { adsService } from '../services/AdsService.js';
import { Ad } from '../models/Ad.js';
import AdCard1 from '../components/AdCard.vue';
import PostForm from '../components/PostForm.vue';
import { Account } from '../models/Account.js';

export default {
  props: {
    ad: { type: Object, required: true },

  },
  setup() {
    const route = useRoute();


    async function getAds() {
      try {

        await adsService.getAds()
        logger.log('[gettingAdsHome]')
      } catch (error) {
        Pop.error(error.message, '[gettingAds]')
      }
    }

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error.message, "[gettingPosts]")
      }
    }
    onMounted(() => {
      getPosts();
      getAds()
    })
    // getPosts()
    return {
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      nextPage: computed(() => AppState.olderPage),
      previousPage: computed(() => AppState.newerPage),
      account: computed(() => AppState.account),


      async olderPage(pageUrl) {
        try {
          await postsService.olderPage(pageUrl)
        } catch (error) {
          logger.error(error, '[changePage]')
          Pop.error(error.message)
        }
      },
      async newerPage(pageUrl) {
        try {
          await postsService.newerPage(pageUrl)
        } catch (error) {
          logger.error(error, '[changePage]')
          Pop.error(error.message)
        }
      }

    }
  },
  components: { PostCard, ProfileDetail, AdCard, AdCard1, PostForm }
}
</script>

<style scoped lang="scss">

</style>
