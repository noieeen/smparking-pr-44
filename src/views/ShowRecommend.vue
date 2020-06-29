<template>
  <div class="container-fulid h-100">
    <div id="logo-background">
      <p class="logo">SM</p>
      <p class="parking-logo">Parking</p>
    </div>
    <div class="jusify-content-center align-items-center">
      <div class="text-right mr-4">
        <router-link to="/config">Back to Config Page</router-link>
      </div>
      <p class="h1 my-5">Assigned Slot</p>
      <div v-if="!isShow" class="row justify-content-center">
        <EllipsisLoader :color="'#aebfbe'" />
      </div>
      <div>
        <p class="display-1" style="color:black">{{recommendSlot[0]}}</p>
      </div>
<button class="btn btn-primary" @click="forceRe" >
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Refresh...
</button>
      <button class="btn btn-warning m-3" @click="getTicket(recommendSlot[0])">Get Ticket</button>
      <!-- <p class="mt-4">Busy Slot</p>
      <ul class="list-unstyled">
        <li class="pointer" v-for="(i,key) in assignVal" :key="key">
          {{key}}>>{{i}}
          <i v-if="i.status == true" class="fas fa-parking icon-empty mx-2"></i>
          <i v-else-if="i.status == false" class="fas fa-parking icon-full mx-2"></i>
        </li>
      </ul>-->
    </div>
  </div>
</template>
<script>
import { rdb } from "../firebase";
import EllipsisLoader from "@bit/joshk.vue-spinners-css.ellipsis-loader";
let slotStatusRef = rdb.ref("/sensor");
let sensorRef = rdb.ref("/sensorr");
let bestFromRdbRef = rdb.ref("/bestSlot");
export default {
  components: {
    EllipsisLoader
  },
  data() {
    return {
      isShow: false,
      rec: null,
      arrSensor: null,
      slotStatus: null,
      //slotStatusKey: null,
      sortPriority: new Map(),
      assignVal: new Map(),
      nowAssign: null,
      refreshAssign: false
    };
  },
  created() {
    //this.recommendSlot();
    //console.log("onCreate", this.recommendSlot());
    slotStatusRef.on("value", snapshot => {
      //this.slotStatusKey = snapshot.key;
      this.slotStatus = snapshot.val();
    });
    //this.recommendSlot();
  },
  mounted() {
    slotStatusRef.on("value", snapshot => {
      //this.slotStatusKey = snapshot.key;
      this.slotStatus = snapshot.val();
    });
    this.recommendSlot;
    sensorRef.on("child_changed", snapshot => {
      console.log('sensorRef',snapshot.val()) 
    });
  },
  computed: {
    recommendSlot() {
      if (this.refreshAssign == false) {
        let fb = this.slotStatus;
        for (let i in fb) {
          if (fb[i].status == true) {
            this.assignVal.set(i, fb[i].value);
          }
        }
        this.assignVal[Symbol.iterator] = function*() {
          yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        };
        //console.log(typeof this.slotStatus, this.slotStatus);
        //console.log("MAP", this.assignVal.keys().next().value);
        this.nowAssign = this.assignVal.keys().next().value;
        //console.log("this.nowAssign", this.nowAssign);
        let arr = Array.from(this.assignVal);
        let find = arr.find(x => x[0]);
        console.log("assignVal", find);
        // if (this.assignVal.keys().next().value != null) {
        this.isShow = true;
        // }
        console.log("isShow", this.isShow);

        return find; //this.nowAssign//this.assignVal.keys().next().value;
      }
      this.refreshAssign = true;
    }
  },
  methods: {
    getTicket(i) {
      if (i != null) {
        let j = rdb
          .ref("sensor/" + i)
          .update({ status: false })
          .then(() => {
            Swal.fire("Updated!", i + " updated successfully.", "success");
          })
          .then(() => {
            this.update();
            this.refreshAssign = false;
          });
      } else {
        alert("Can not Assign");
      }
    },
    update() {
      slotStatusRef.on("value", snapshot => {
        this.slotStatus = snapshot.val();
        console.log("update");
        console.log("refreshAssign", this.refreshAssign);
        this.recommendSlot;
      });
    },
    forceRe(){
      /**Refresh page */
      this.$router.go(0);
    },
  },
  watch: {
    re() {
      this.recommendSlot;
    }
  }
};
</script>
<style lang="scss">
.center {
  position: absolute;
  // top: 35%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}
.icon-empty {
  color: #94af76;
}
.icon-full {
  color: #af4448;
}
.pointer {
  cursor: default;
}
// .container-fulid {
//   background-color: #dce7e7;
// }
// html,
// body {
//   margin: 0;
//   padding: 0;
//   background-color: #dce7e7;
// }
@import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&family=IBM+Plex+Sans:ital,wght@1,600&family=Monoton&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Galada&display=swap");
.container-fulid {
  background-color: white;
}
.logo {
  //font-family: 'IBM Plex Sans', sans-serif;
  // font-family: "Bungee Shade", cursive;
  font-family: "Monoton", cursive;
  color: #d8d8d8;
  font-weight: 400;
  font-size: 21rem;
  //margin: 0;
}
.parking-logo {
  font-family: "Galada", cursive;
  color: #9e9e9e;
  font-size: 10rem;
  //margin: 0;
}
#logo-background {
  left: 0%;
  top: 0%;
  position: fixed;
  opacity: 50%;
  z-index: -1;
}
#logo-background :hover {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
}
</style>
