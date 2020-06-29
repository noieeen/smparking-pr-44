<template>
  <div class="home main-wrapper">
    <div class="background">
      <div class="container h-100">
        <div>
          <nav class="navbar transparent navbar-inverse">
            <router-link to="/" class="navbar-brand h1 mb-0" href="#">SMpaking</router-link>
            <div class="nav-item">
              <button
                class="btn btn-primary"
                type="submit"
                data-toggle="modal"
                title="Login"
                data-target="#login"
              >login</button>
            </div>
          </nav>

          <div class="row justify-content-md-center">
            <div class="col-4">
              <b-card
                title="1st Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 100</b-card-text>
              </b-card>
              <b-card
                title="2nd Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 100</b-card-text>
              </b-card>

              <b-card
                title="3rd Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 150</b-card-text>
              </b-card>

              <b-card
                title="4th Floor"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">Available 150</b-card-text>
              </b-card>
            </div>

            <div class="col-6">
              <b-card
                title="Recommend"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="recommend-font">1A-01</b-card-text>
              </b-card>

              <b-card
                title="Available Total"
                img-alt="Image"
                tag="article"
                style="max-width: 20rem;"
                class="m-3"
              >
                <b-card-text class="floor-num">150</b-card-text>
              </b-card>
            </div>
          </div>
          <div>
            <router-link
              to="/config"
              tag="button"
              title="Config"
              class="btn btn-info btn-lg m-2"
            >To Config</router-link>
            <button class="btn btn-danger btn-lg" @click="resetDB('floors')">Reset DB</button>
          </div>
        </div>
      </div>
    </div>

    <login></login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import { db } from "../firebase";
export default {
  name: "Home",
  components: { Login },

  methods: {
    resetDB() {
      console.log("reset");
      db.collection("floors")
        .get()
        .then(res => {
          res.forEach(element => {
            element.ref.delete();
          });
        });
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
.home {
  font-family: "Raleway", sans-serif;
}
.title {
  font-size: 10em;
}
.home {
  height: 100vh;
}
/** */
.recommend-font {
  font-size: 7em;
}
.floor-num {
  font-size: 1.3rem;
}
.background {
  // //position: inherit;
  // /* margin: auto; */
  background-image: url(/png/parkingBG.jpg);
  // /* Full height */
  // height: 100vh;
  // width: 100vw;
  // //padding: 110px;

  // /* Center and scale the image nicely */
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  // /* opacity: 0.65; */
  // /* filter: brightness(80%); */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  // color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: none;
  z-index: 0;
}

.navbar.transparent.navbar-inverse .navbar-inner {
  border-width: 0px;
  -webkit-box-shadow: 0px 0px;
  box-shadow: 0px 0px;
  background-color: rgba(204, 204, 204, 0.253);
  background-image: -webkit-gradient(
    linear,
    50% 0%,
    50% 100%,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0))
  );
  background-image: -webkit-linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
