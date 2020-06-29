<template>
  <div>
    <nav id="sidebar">
      <div class="custom-menu">
        <button type="button" id="sidebarCollapse" class="btn btn-primary" @click="closeMenu()">
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4 pt-5">
        <h1>
          <a href="/" class="logo">SM</a>
          <span class="h6 ml-1">parking</span>
        </h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <h5 class="h6">Adjust per Zone</h5>

            <b-form
              @submit.prevent="applyChange"
              @reset="onReset"
              class="form-row my-4 justify-content-center"
            >
              <b-form-group label="Zone">
                <b-form-input
                  v-model="zoneChange"
                  type="text"
                  class="form-control text-center"
                  placeholder="Zone"
                />
                
              </b-form-group>           
             

              <b-form-group label="height" class="form-group col-md-5">
                <b-form-input type="text" class="form-control" placeholder="Height" />
              </b-form-group>
              <span class="h6 align-self-center mx-1 pt-4">
                <i class="fa fa-times" aria-hidden="true"></i>
              </span>
              <b-form-group label="widht" class="form-group col-md-5">
                <b-form-input type="text" class="form-control" placeholder="Width" v-model="selected" />
              </b-form-group>

              <fieldset class="form-group">
                <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0 mx-2">Side</legend>
                  <div class="col-sm-9">
                    <b-form-group label>
                      <b-form-radio v-model="selected" name="some-radios" value="1">1 Side</b-form-radio>
                      <b-form-radio v-model="selected" name="some-radios" value="2">2 Side</b-form-radio>
                    </b-form-group>
                  </div>
              
                </div>
              </fieldset>

              <b-button
                type="submit"
                @click="applyChange"
                class="btn btn-secondary d-blockmr-0 ml-auto"
              >Apply Change</b-button>
            </b-form>
          </li>

          <li>
            <a href="#">
              <i class="fas fa-grip-horizontal mx-1"></i>Grid Views
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fas fa-list-ul mx-1"></i>List Views
            </a>
          </li>
        </ul>

        <!-- <div class="mb-5">
          <h3 class="h6">Subscribe for newsletter</h3>
          <form action="#" class="colorlib-subscribe-form">
            <div class="form-group d-flex">
              <div class="icon">
                <span class="icon-paper-plane"></span>
              </div>
              <input type="text" class="form-control" placeholder="Enter Email Address" />
            </div>
          </form>
        </div>-->

        <div class="footer">
          <p>SM PARKING</p>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { db } from "../firebase";
export default {
  name: "Sidebar",
  data() {
    return {
     
      zoneSelect: null,
      selected: ""
      //checkEntrance: ""
    };
  },
  computed: {
    zoneChange() {
      
      //console.log('zoneSelect >>',this.$store.state.zoneSelect[1].length)
      return (this.zoneSelect = this.$store.state.zoneSelect[0]);

    },
  },
  methods: {
    onReset() {
      alert("Form reset");
    },

    applyChange() {
      // console.log(this.zoneChange);
      // console.log(this.checkEntrance);
      // //  db.collection('floors').doc((this.$store.state.floor).toString())
      // //   .collection('zoneDetail').doc(this.zoneSelect)
      // //   .set({entrance:false})
      // // if(this.checkEntrance == 'accepted'){
      // //   this.checkEntrance = 'not_accepted'}
      // //   else{
      // //     this.checkEntrance = 'accepted'
      // //   }
      // if (this.checkEntrance == "accepted") {
      //   this.entrance = "accepted";
      //   console.log("k", this.entrance);
      //   db.collection("floors")
      //     .doc(this.$store.state.floor.toString())
      //     .collection("zoneDetail")
      //     .doc(this.zoneSelect)
      //     .set({ entrance: true });
      // } else if (this.checkEntrance == "not_accepted") {
      //   this.entrance = "accepted";
      //   console.log("f", this.entrance);
      //   db.collection("floors")
      //     .doc(this.$store.state.floor.toString())
      //     .collection("zoneDetail")
      //     .doc(this.zoneSelect)
      //     .set({ entrance: false });
     // }
    },
    closeMenu() {
      if ($) {
        ("use strict");

        var fullHeight = function() {
          $(".js-fullheight").css("height", $(window).height());
          $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
          });
        };
        fullHeight();

        $("#sidebarCollapse").on("click", function() {
          $("#sidebar").toggleClass("active");
        });
      }
    },
    mounted() {
      $("#width").val(this.selected);
      console.log("work");
    }
  }
};
</script>
<style lang="scss">
@import "./src/assets/sidebar.scss";
#sidebar {
  min-height: 100%;
}
</style>