<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <i class="fas fa-car mr-2"></i>
      <a class="navbar-brand" href="/">
        <!-- <img
          src="/docs/4.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        />-->
        SMparking
      </a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">Admin</a>
          </li>

          <li class="nav-item">
            <!-- <a href="#" class="nav-link" @click="setting">Setting</a> -->
            <a
              class="nav-link btn btn-info mx-2"
              style="color:white;"
              type="button"
              data-toggle="modal"
              data-target="#editFloor"
              @click="$bvModal.show('editFloorr')"
              title="Edit Current Floor"
            >Edit</a>
          </li>
          <li class="nav-item">
            <!-- <a href="#" class="nav-link" @click="setting">Setting</a> -->
            <a
              class="nav-link btn btn-success mx-2"
              style="color:white;"
              type="button"
              data-toggle="modal"
              data-target="#initParking"
              @click="$bvModal.show('initParkingg')"
              title="Gennerate Parking"
            >Gennerate</a>
          </li>
          <li class="nav-item">
            <router-link to="/statuslist" class="nav-link">List view</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/recommend" class="nav-link">Assign Page</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    // setting(){
    //   // this.$mount
    //   console.log('work')
    //   this.$bvModal.show('initParking')
    // }
  }
};
</script>
<style lang="scss">
@import "./src/assets/navbar.scss";
.navbar {
  z-index: 1;
}
</style>