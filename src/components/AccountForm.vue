<template>
  <form class="card account-form" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" required name="name">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" class="form-control" v-model="editable.email" required name="email">
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture" required name="picture" placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
      </div>
      <div>
        <label for="github">Github:</label>
        <input type="url" class="form-control" v-model="editable.github" name="github">
      </div>
      <div>
        <label for="linkedin">LinkedIn:</label>
        <input type="url" class="form-control" v-model="editable.linkedin" name="linkedin">
      </div>
      <div>
        <label for="resume">Resume:</label>
        <input type="url" class="form-control" v-model="editable.resume" name="resume">
      </div>
      <div>
        <label for="class">Class:</label>
        <input type="text" class="form-control" v-model="editable.class" name="class">
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="editable.graduated" type="checkbox" value="" id="flexCheckDefault" />
        <label class="form-check-label" for="flexCheckDefault">Graduated</label>
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </form>

</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({

    })
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          Pop.error(error, '[editAccount]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>