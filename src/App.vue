<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-2 d-none d-md-block bg-primary text light sidebar">
        <div class="mt-3">

          <Login />
        </div>
      </div>
      <div class="col-md-10 main-content">

        <router-view />
      </div>
    </div>

  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.sidebar {
  height: 100vh;
}

.main-content {
  height: 100vh;
  overflow-y: auto;
}
</style>
