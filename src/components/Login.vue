<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          <span class="mx-3 text-success lighten-30">{{ account.name || user.name }}</span>
        </div>
      </div>
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>

        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
    <div>

    </div>
    <img class="mt-5" style="width: 25vh"
      src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Beach_day_cser.svg"
      alt="">
    <p class="m-5">Look! A Dog!</p>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import ProfilePage from '../pages/ProfilePage.vue'
export default {
  setup() {
    return {
      profile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      }
    };
  },
  components: { ProfilePage }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}
</style>
