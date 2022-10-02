<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo"
          src="https://images.squarespace-cdn.com/content/v1/5f91fcbc36a5b9015fb24cc4/1607033652221-YG15SRJDYT9JS3SG19MU/network_logo.png"
          height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>

      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input type="text" class="form-control" required="true" minlength="2" placeholder="Search Posts"
            v-model="editable.term" name="search">
          <label for="search" class="visually-hidden">Search Posts</label>
          <button type="submit" class="btn btn-dark "><i class="mdi mdi-magnify"></i></button>
        </div>
      </form>
    </div>
  </nav>
</template>
      

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import Login from './Login.vue'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          await postsService.getPostsBySearchTerm(editable.value.term)
        } catch (error) {
          logger.error('[Search]', error)
          Pop.error(error)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
