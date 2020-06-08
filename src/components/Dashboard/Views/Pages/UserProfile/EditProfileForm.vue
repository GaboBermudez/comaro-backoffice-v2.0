<template>
  <div class="card">
    <div class="card-header">
      <h4 class="title">Editar Cuenta</h4>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-3">
            <fg-input type="text" label="Usuario" placeholder="Usuario" v-model="user.username"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="email" label="Email" placeholder="Email" v-model="user.email"></fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text" label="Nombre" placeholder="Nombre" v-model="user.firstName"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="Apellido" placeholder="Apellido" v-model="user.lastName"></fg-input>
          </div>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-info btn-fill btn-wd"
            @click.prevent="updateProfile"
            disabled
          >Update Profile</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: "Paper Dashboard",
        username: "michael23",
        email: "",
        lastName: "Faker"
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style>
</style>
