<template>
  <div class="page-wrapper d-flex align-items-stretch h-100 mb-5">
    <div class="container-fluid">
      <!-- <p>The destination is :{{this.$route.params.id}}</p> -->
      <!-- <div class="row">
              <div class="col-md-1" v-for="(i,index) in floor.zone" :key="index">
                <table class="table table-light">
                  <thead>
                    <tr>
                      <th colspan="2">Zone{{index+1}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="spot-list" v-for="(i,index) in floor.height" :key="index">
                      <td class="spot" v-for="i in floor.width" :key="i"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
      </div>-->

      <!-- <div class="display-1" v-if="notfoundStatus == true">Floor not foundStatus</div> -->

      <div>
        <b-nav>
          <b-nav-item disabled>Symbol Color:</b-nav-item>
          <b-nav-item disabled>
            Empty
            <div class="rectangle empty"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Full
            <div class="rectangle full"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Near Best
            <div class="rectangle near"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Best Slot
            <div class="rectangle best"></div>
          </b-nav-item>
          <b-nav-item>
            <button class="btn btn-primary mt-2" @click="forceRe">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Refresh...
            </button>
          </b-nav-item>
        </b-nav>
      </div>

      <!-- <div>
        <ul v-for="(index,keyy) in slotStatus.floor" :key="keyy" class="text-left">
          <li v-for="(indexx,key) in index" :key="key">floor:{{keyy}} {{index}}</li>
        </ul>
        <hr />/**กำลังทำ */
        <p>Busy Slot</p>
        <div v-for="(i,key) in slotStatus" :key="key">{{key}} > status: {{i}}</div>
        <hr />

        <div>
          <ul style="list-style: none;">
            <p>Best list</p>
            <li v-for="(i,key) in  bestStatus" :key="key">{{key}} > status: {{i}}</li>
          </ul>
          <hr />
        </div>
      </div>

      <button class="btn btn-info my-5" @click="test">test</button>
      <button class="btn btn-danger my-5 mx-5" @click="test2">test2</button>-->

      <!-- <div class="border m-4">
              <div class="btn btn-primary m-2">primary</div>
              <div class="btn btn-secondary m-2">secondary</div>
              <div class="btn btn-success m-2">success</div>
              <div class="btn btn-info m-2">info</div>
              <div class="btn btn-warning m-2">warning</div>
              <div class="btn btn-danger m-2">danger</div>
      </div>-->

      <!-- <div class="mt-5">
              <ul v-for="i in floor.zone" :key="i">
                <li>ss</li>
              </ul>
      </div>-->
      <div v-if="!isShow" class="row justify-content-center">
        <EllipsisLoader :color="'#aebfbe'" />
      </div>

      <!-- border border-primary p-5 -->

      <div v-if="isShow" class="parking">
        <div class="row">
          <div class="col-3" v-for="(i,zone) in all_zones" :key="zone">
            <table class="table">
              <tr>
                <th :colspan="2">
                  <div class="d-inline-flex align-items-center my-auto">
                    <span>Zone {{i[0]}}</span>
                    <!-- <div class="box ml-2 yellow-striped" v-if="i.entrance == true"></div> -->
                  </div>
                </th>
              </tr>
              <tbody>
                <!-- <tr v-for="(j,k) in slots" :key="k">
                              <td v-for="(i,slot) in 2" :key="slot" align="center" valign="center">
                                <div
                                  class="rectangle lady"
                                  :title="'id' +[[j]]"
                                  @click="infoSpot(i)"
                                >{{j['.key']}}</div>
                              </td>
                </tr>-->

                <tr v-for="(current_array, parent_node_index) in i[1]" :key="parent_node_index">
                  <td
                    v-for="(item,index) in current_array"
                    :key="index"
                    class="rectangle"
                    data-toggle="modal"
                    data-target="#slotModal"
                    @click="$bvModal.show('slotModall'),infoSpot(item)"
                    title="Slot setting"
                  >
                    <!-- style="color:white" -->
                    <div v-if="item[2] === 'busy'" class="full">{{item[0]}}</div>
                    <div v-else-if="item[2] === 'best'" class="best" style="color:white">{{item[0]}}</div>
                    <div v-else-if="item[2] === 'near'" class="near">{{item[0]}}</div>
                    <div v-else-if="item[2] === 'empty'" class="empty">{{item[0]}}</div>
                    <!-- <b-spinner
                      v-if="item[1] === 0"
                      class="m-1"
                      variant="success"
                      type="grow"
                      label="Spinning"
                    ></b-spinner>
                    <b-spinner
                      v-if="item[1]===1"
                      class="m-1"
                      variant="warning"
                      type="grow"
                      label="Spinning"
                    ></b-spinner>-->
                  </td>
                  <!--
                     @click="infoSpot(item)"
                  {{(parent_node_index*2+index+1)}} is {{item}}-->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      <login></login>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import { db, rdb } from "../firebase";
import * as firebase from "firebase";
import EllipsisLoader from "@bit/joshk.vue-spinners-css.ellipsis-loader";
//var database = firebase.database();
let slotStatusRef = rdb.ref("/sensor");
let bestFromRdbRef = rdb.ref("/bestSlot");
export default {
  components: {
    EllipsisLoader,
   Login ,
  },
  data() {
    return {
      destinationId: this.$route.params.id,
      currentFloor: this.$store.state.floor,
      counter: 0,
      floors: [],
      zones: [],
      slots: [],
      evenSlot: [],
      zoneSlot: [],
      floor: {
        height: null,
        width: null,
        zone: null
      },
      all_zones: new Map(),
      isShow: false,
      slotStatus: {},
      slotStatusKey: null,
      slotStatusRef: null,
      arrBestSlot: [],
      bestStatus: {},
      bestStatusKey: null,
      allSlot: new Map(),
      arrSlotStatus: [],
      idAndStatue: []
    };
  },
  // firestore() {
  //     return {
  //         floors: db.collection("floors"),
  //         zones: db
  //             .collection("floors")
  //             .doc(this.$store.state.floor.toString())
  //             .collection("zoneDetail"),
  //
  //
  //     };
  // },
  computed: {
    showBest() {
      /** ทำอยู่ */
      return this.bestStatus;
    }
  },
  mounted() {
    this.getZoneWithSlot();
    /**ทำอยู่ */
    slotStatusRef.on("value", snapshot => {
      this.slotStatus = snapshot.val();
      this.slotStatusKey = snapshot.key;
      let key = snapshot.key;
      // let val = snapshot.val()
      //this.arrSlotStatus.push(key);
      // console.log("slotStatus",Object.keys(this.slotStatus),Object.values(this.slotStatus));
    });
    bestFromRdbRef.on("value", snapshot => {
      this.bestStatus = snapshot.val();
      this.bestStatusKey = snapshot.key;
    });
  },
  methods: {
    getZoneWithSlot() {
      let marticSlot = [];
      let countZone = 0;

      let postiX = 0;

      let positY = 0;
      let posZoneChange = 0;
      //let arrAllZone = new Map();
      let dis = 0;

      let ready = "ready";
      let busy = "busy";
      let bestSlot = true;

      let stateBestArr = [];

      console.log("getzone");
      let arr = this.zones;
      //console.log(this.zones);
      console.log("1234");

      let arrayzone = [];
      let arrayChunked = [];
      db.collection("floors")
        .doc(this.$store.state.floor.toString())
        .collection("zoneDetail")
        .get()
        .then(data => {
          data.forEach(doc => {
            let size = data.size;
            let currentDataSize = 0;
            // console.log(data.size)
            db.collection("floors")
              .doc(this.$store.state.floor.toString())
              .collection("zoneDetail")
              .doc(doc.id)
              .collection("slotDetail")
              .get()
              .then(data => {
                data.forEach(doc => {
                  // console.log("id >", doc.id);
                  // console.log("arrayzone", arrayzone);
                  let z = doc.id;
                  let zoneTop =
                    z
                      .toString()
                      .split(/\d|\-/)[1]
                      .charCodeAt(0) - 65;
                  let numSlot = Number(z.split("-")[1]);

                  console.log("zoneTop", zoneTop);

                  postiX =
                    Math.floor(zoneTop / 4) * 6 + Math.floor((numSlot - 1) / 2);
                  //console.log(doc.data().status);
                  positY = ((numSlot - 1) % 2) + (zoneTop % 4) * 2;
                  console.log(
                    "--------",
                    doc.id,
                    "->[",
                    postiX,
                    ",",
                    positY,
                    "]"
                  );
                  // console.log("posty", positY);
                  /**found busy status */
                  let foundStatus = false;
                  /**found best slot */
                  let foundBest = false;
                  let disAll = [];
                  for (let [key, value] of Object.entries(this.bestStatus)) {
                    let keyZone =
                      key
                        .toString()
                        .split(/\d|\-/)[1]
                        .charCodeAt(0) - 65;
                    let keySlot = Number(key.split("-")[1]);
                    let keyPosiX =
                      Math.floor(keyZone / 4) * 6 +
                      Math.floor((keySlot - 1) / 2);
                    //console.log('inloop',key,value);
                    let keyPosiY = ((keySlot - 1) % 2) + (keyZone % 4) * 2;
                    dis = Math.sqrt(
                      Math.pow(Math.abs(keyPosiX - postiX), 2) +
                        Math.pow(Math.abs(keyPosiY - positY), 2)
                    );
                    // console.log(key, "->[", keyPosiX, ",", keyPosiY, "]");
                    disAll.push(dis);
                    // console.log(dis);
                    //console.log('disAll',...disAll);
                    // console.log(key);
                  }
                  let min = Math.min(...disAll);
                  //console.log("minnnnn", Math.min(...disAll));
                  // console.log(this.bestStatus)
                  this.allSlot.set(doc.id, min);
                  /** */
                  let status = "empty";
                  /**found busy status */
                  foundStatus = Object.keys(this.slotStatus).find(
                    slot => slot == doc.id //&& Object.values(this.slotStatus) === true
                  );
                   /**set sensor RDB */
                  if (!foundStatus) {
                    let j = rdb
                      .ref("sensor/" + doc.id)
                      .set({ status: true, value: min });
                    console.log(doc.id + " is new ceate");
                  }
                  // let getStatsRdb = Object.keys(this.slotStatus).filter(
                  //   slot => this.slotStatus[doc.id].status == false
                  // )//.map(slot => this.slotStatus[doc.id]);
                  //console.log("yyy", doc.id, Object.values(this.slotStatus[doc.id])[0]);

                  /**found best slot */
                  foundBest = Object.keys(this.bestStatus).find(
                    slot => slot == doc.id
                  );
                  // if (foundStatus) {
                  //   status = "busy";
                  // }
                  
                  /**Check to Set color */
                  if (Object.values(this.slotStatus[doc.id])[0] == false) {
                    status = "busy";
                  } else if (foundBest) {
                    status = "best";
                  } else if (min === 1) {
                    status = "near";
                  } else if (
                    Object.values(this.slotStatus[doc.id])[0] == true
                  ) {
                    status = "empty";
                  }

                  //if(getStatsRdb[])
                  // for(let i in getStatsRdb){
                  //   if(getStatsRdb[i] == true){

                  //   }else if(getStatsRdb[i] == false){

                  //   }
                  // }

                  /** 
                       const inventory = [
                        {name: 'apples', quantity: 2},
                        {name: 'bananas', quantity: 0},
                        {name: 'cherries', quantity: 5},
                        {name: 'melon', quantity: 0},
                      ];
                      const result = inventory.filter( ({ quantity }) => quantity === 0 );
                  */

                  arrayzone.push([doc.id, min, status]);

          

                  //arrayzone.push([doc.id,doc.data().status,doc.data().bestSlot,busy])
                  /** */
                  this.allSlot[Symbol.iterator] = function*() {
                    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
                  };

                  // sort by value
                  stateBestArr.sort(function(a, b) {
                    return a.value - b.value;
                  });

                  // (...this.allSlot).map(e =>{ return e[1];}).slice().sort(function(a, b) {
                  //   return a - b;
                  // });
                  console.log([...this.allSlot]);

                  //console.log("stateBestArr", ...stateBestArr);
                  // let a = ['1A-00','2A-00']
                  //this.$store.commit("recommendSlot", a); //stateBestArr

                  // if (foundStatus) {
                  //   console.log("foundStatus", foundStatus);
                  // } else {
                  //   console.log("not_foundStatus");
                  // }
                  /**Transform map to array */
                  /**
                     let myMap = new Map().set('GFG', 1).set('Geeks', 2);
                     let arr =[...myMap.values()]
                        console.log(arr);
                   */

                  //let closest = true;
                  // pos = [postiX, positY]; //'['+posX+','+ posY+']';
                  //marticSlot.push([doc.id, pos]);

                  /**work */
                  //arrClosest.forEach((element)=>console.log('testForEach',element[0],'X=', element[1][0],'Y=', element[1][1]))
                  //console.log("arrClosest", arrClosest[i][0]);
                  if (arrayzone.length === 2) {
                    arrayChunked.push(arrayzone);
                    arrayzone = [];
                  }
                });

                /**out loop2 */
                this.all_zones.set(doc.id, arrayChunked);
                arrayChunked = [];
                // console.log(this.all_zones);
                /** */
                if (this.all_zones.size > countZone) {
                  //marticSlot.push(countZone);
                }
                countZone = this.all_zones.size;
                // console.log("marticSlot", this.all_zones.size, marticSlot);
                /** */
                // console.log("this.allzone.size", this.all_zones.size);
                if (this.all_zones.size === size) {
                  this.isShow = true;
                  console.log("All_Zone", this.all_zones);
                }
                // --->>  this.$store.commit("showRecommendSlot", stateBestArr);
              });
          });
        });
    },
    forceRe() {
      /**Refresh page */
      this.$router.go(0);
    },
   

    infoSpot(i) {
      console.log(i[".key"], Object.values(i));
      this.$store.commit("changeSlot", i);
    },
    updated() {
      this.floor = this.$store.state.floor;
      // currentFloor: this.$store.state.floor
      console.log(this.floor);
      this.getZoneWithSlot();
    }
  }
};
</script>
<style lang="scss">
// td:nth-child(1){
//   align-: center;
// }
td div {
  text-align: center;
  vertical-align: middle;
}
.spot-list {
  //list-style-type: none;
  //margin: 0 auto;
  float: unset;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.spot-list td {
  //padding: 15px;
  //float: left;
  width: 2.5em;
  height: 1em;
  margin: 0.1em;
  margin-right: 0.2em;
  margin-left: 0.2em;
  background-color: rgb(163, 163, 163);
  display: block;
}
// .spot-list-vertical {
//   transform: rotate(-90deg);
//}
.box {
  width: 30px;
  height: 30px;
  background: gray;
}
.rectangle {
  width: 30px;
  height: 20px;
  background: #e2e2e2ab;
  cursor: pointer;
}
// .box a:hover{
//   cursor: pointer;
// }
th {
  cursor: pointer;
}
td {
  margin: 0;
}
.yellow-striped {
  background-color: var(--mat-yellow);
  background-image: repeating-linear-gradient(
    45deg,
    #ffffff,
    #ffffff 4px,
    rgba(1, 1, 1, 0) 4px,
    rgba(1, 1, 1, 0) 8px
  );
  box-shadow: inset 0 0 0 4px #ffb74d;
}
.handicap {
  background-color: var(--mat-blue);
}
.empty {
  background-color: var(--mat-green);
}
.full {
  background-color: var(--mat-red);
}
.lady {
  background-color: var(--mat-pink);
}
.best {
  background-color: var(--mat-sky);
}
.near {
  background-color: var(--mat-dark-green);
}
:root {
  --mat-sky: #9fa8da;
  --mat-green: #c8e6c9;
  --mat-dark-green: #97b498;
  --mat-teal: #009688;
  --mat-cyan: #00bcd4;
  --mat-white: #f5f5f5;
  --mat-light-gray: #e0e0e0;
  --mat-dark-teal: #00796b;
  --mat-blue: #5d99c6;
  --mat-red: #e57373;
  --mat-yellow: #ffb74d;
  --mat-dark-yellow: #f57c00;
  --mat-pink: #fce4ec;
}
.parking {
  min-width: 100%;
  min-height: 100%;
}
.nobr {
  white-space: nowrap;
}
</style>