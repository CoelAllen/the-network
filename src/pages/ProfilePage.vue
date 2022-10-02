<template>
  <div class="container-fluid d-flex">

    <section class="row mx-2 mt-3 justify-content-center" v-if="profile">
      <!-- <ProfilePageDetail /> -->
      <div class="card">
        <div class="card-header mt-1 bio-banner">
        </div>
        <img class="profile-picture" :src="profile.picture" alt="">
        <div class="card-body mt-5 d-flex justify-content-between">
          <h3>{{profile.name}}</h3>
          <div class="d-flex">

            <h5 class="ps-3">{{profile.class}}</h5>
            <a v-if="profile.graduated==true">
              <i class="mdi mdi-school px-1" title="Graduate"></i>
            </a>
          </div>
          <div>
            <a v-if="profile.github" :href="profile.github" target="_blank">
              <i class="mdi mdi-github px-1" title="GitHub"></i>
            </a>
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank">
              <i class="mdi mdi-linkedin px-1" title="LinkedIn"></i>
            </a>
            <a v-if="profile.resume" :href="profile.resume" target="_blank">
              <i class="mdi mdi-paperclip px-1" title="Resume"></i>
            </a>
          </div>
        </div>
        <p>{{profile.bio}}</p>
      </div>
      <div v-if="profile.id == account.id">

        <PostForm />
      </div>
      <PostCard v-for="p in posts" :post="p" :key="p.id" />
      <div class="d-flex justify-content-between">
        <!-- <span @click="changePage(previousPage)" :disabled="!previousPage" :class="{'disabled' : !previousPage}"
          class="d-flex align-items-center">
          <i class="mdi mdi-chevron-double-left fs-2"></i>
          <h4 class="mb-0">Last Page</h4>
        </span>
        <span @click="changePage(nextPage)" :disabled="!nextPage"
        :class="`bg-dark ${!nextPage ? 'bg-secondary' : ''}`" class="d-flex align-items-center">
        <h4 class="mb-0">Next Page</h4>
        <i class="mdi mdi-chevron-double-right fs-2"></i>
      </span> -->
      </div>
    </section>

    <div v-else>
      Loading
    </div>
    <div class="ms-3 mt-4">
      <AdCard v-for="a in ads" :ad="a" />
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import ProfilePageDetail from '../components/ProfilePageDetail.vue';
import ProfilePageDetail1 from '../components/ProfilePageDetail.vue';
import { Account } from '../models/Account.js';
import PostForm from '../components/PostForm.vue';
import { Ad } from '../models/Ad.js';
import AdCard from '../components/AdCard.vue';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';




export default {
  props: {
    ad: { type: Ad, required: true }
  },
  setup() {
    const route = useRoute();
    async function getAds() {
      try {
        await adsService.getAds()
        logger.log('[gettingAdsProfile]')
      } catch (error) {
        Pop.error(error.message, '[gettingAds]')
      }
    }

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[getProfileById in profilepage]");
      }
    }
    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[getPostsById]");
      }
    }
    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
      getAds();
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads)
    };
  },
  components: { PostCard, ProfilePageDetail, ProfilePageDetail1, PostForm, AdCard }
}
</script>


<style lang="scss" scoped>
.bio-banner {
  height: 25vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;

}

.profile-picture {
  border-radius: 50%;
  height: 16vh;
  position: absolute;
  top: 120px;
  left: 50px;
}
</style>