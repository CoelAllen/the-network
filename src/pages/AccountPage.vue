<template>
  <div class="container-fluid">
    <div class="mt-3">
      <div class="text-center">
        <img class="mt-3 rounded elevation-3" :src="account.picture" alt="">
        <h2 class="mt-2">{{account.name}}</h2>
        <div class="d-flex justify-content-center">

          <h5>{{account.class}}
          </h5>
          <div v-if="account.graduated == true">
            <i class="mdi mdi-school"></i>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">

        <div v-if="account.github">
          <a :href="account.github" target="_blank">
            <i class="fs-1 mdi mdi-github px-2" title="Github"></i></a>
        </div>
        <div v-if="account.linkedin">
          <a :href="account.linkedin" target="_blank">
            <i class="fs-1 mdi mdi-linkedin px-2" title="LinkedIn"></i></a>
        </div>
        <div v-if="account.resume">
          <a :href="account.resume" target="_blank">
            <i class="fs-1 mdi mdi-paperclip px-2" title="Resume"></i></a>
        </div>
      </div>

      <p>{{account.bio}}</p>
      <div class="text-end mb-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
          title="Edit Account Info">
          Edit
        </button>

      </div>

    </div>
    <div class="ms-3 mt-4">
      <AdBannerCard v-for="a in ads" :ad="a" />
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AccountForm />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import AccountForm from '../components/AccountForm.vue';
import AdCard from '../components/AdCard.vue';
import AdBannerCard from '../components/AdBannerCard.vue';
import { Ad } from '../models/Ad.js';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';
export default {
  props: {
    ad: { type: Object, required: true }
  },
  setup() {
    async function getAds() {
      try {

        await adsService.getAds()
        logger.log('[gettingAdsHome]')
      } catch (error) {
        Pop.error(error.message, '[gettingAds]')
      }
    }
    onMounted(() => {
      getAds()
    })
    return {
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads)
    };
  },
  components: { AccountForm, AdCard, AdBannerCard }
}
</script>

<style scoped>
.bio-banner {
  height: 25vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;

}
</style>
