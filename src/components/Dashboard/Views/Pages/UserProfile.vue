<template>
  <div class="row">
    <div class="col-lg-8 col-md-7 edit-profile">
      <edit-profile-form></edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";

export default {
  components: {
    EditProfileForm
  }
};
</script>
<style>
.edit-profile {
  margin: 0 auto;
}
</style>
