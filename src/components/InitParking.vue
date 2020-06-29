<template>
  <div class="initParking">
    <!-- <b-button v-b-modal.initParking>Open Modal</b-button> -->
    <!-- 
    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="floor in submittedNames" :key="floor">{{ floor }}</li>
      </ul>
    </div>-->

    <b-modal
      id="initParkingg"
      ref="modal"
      title="Gennerate Parking"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-cols-lg="1"
          label="SMparking"
          label-size="lg"
          label-class="font-weight-bold pt-1 logo-primary h1"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="4"
            label="Floor:"
            label-align-sm="right"
            label-for="selectFloor"
          >
            <b-form-select
              v-model="selectedFloor"
              :state="zoneWidthState"
              :options="optionsFloor"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              invalid-feedback="Floor is required"
            ></b-form-select>
            <b-form-input
              v-if="selectedFloor === '2'"
              id="selectFloor"
              v-model="customFloor"
              :state="customFloorState"
              class="mt-2"
              placeholder="Ex. 1-5, 8, 11-13"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Number of floor:"
            label-align-sm="right"
            :state="floorState"
            label-for="numberFloor"
            invalid-feedback="Floor is required"
          >
            <b-form-input
              id="numberFloor"
              v-model="floor"
              :state="floorState"
              type="number"
              min="0"
              max="100"
              required
              placeholder="Max: 100"
              :disabled="selectedFloor === '2'"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Number of zone:"
            label-align-sm="right"
            label-for="numberZone"
            :state="zoneState"
            invalid-feedback="Zone is required"
          >
            <b-form-input
              id="numberZone"
              v-model="zone"
              :state="zoneState"
              type="number"
              min="0"
              max="100"
              placeholder="Max: 100"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Zone height:"
            label-align-sm="right"
            :state="zoneHeightState"
            label-for="numberZoneHeight"
            invalid-feedback="Height is required"
          >
            <b-form-input
              id="numberZoneHeight"
              v-model.number="zoneHeight"
              :state="zoneHeightState"
              type="number"
              min="0"
              max="100"
              placeholder="Max: 100"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Width:"
            label-align-sm="right"
            label-for="zoneWidth"
          >
            <b-form-radio-group
              id="zoneWidth"
              v-model="selected"
              :state="zoneWidthState"
              :options="options"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              class="mt-2"
            ></b-form-radio-group>
            <div class="mt-1 ml-3">
              Side:
              <strong>{{ selected }}</strong>
            </div>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Total Slots:"
            label-size="lg"
            label-class="font-weight-bold pt-1 text-total"
            label-align-sm="right"
            label-for="totalSlots"
          >
            <b-form-input
              v-model="total"
              :disabled="true"
              id="totalSlots"
              class="text-center"
              size="lg"
              v-show="selectedFloor === '1'"
            ></b-form-input>
            <b-form-input
              v-model="custom"
              :disabled="true"
              id="totalSlots"
              class="text-center"
              size="lg"
              v-show="selectedFloor === '2'"
            ></b-form-input>
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { db } from "../firebase";
import { firestore } from "firebase";
export default {
  name: "initParking",
  data() {
    return {
      floors: [],
      selected: "2",
      options: [
        { item: "1", name: "1 Side" },
        { item: "2", name: "2 Side" }
      ],
      selectedFloor: "1",
      optionsFloor: [
        { item: "1", name: "All" },
        { item: "2", name: "Custom adjective" }
      ],
      name: "",
      nameState: null,
      submittedNames: [],

      customFloor: null,
      customFloorState: null,
      customFloorCheck: false,
      floor: null,
      floorState: null,
      zone: null,
      zoneState: null,
      zoneHeight: null,
      zoneHeightState: null,
      zoneWidth: null,
      zoneWidthState: null,
      //total: null,
      totalState: null
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  computed: {
    total: function() {
      let total = this.floor * this.zone * this.zoneHeight * this.selected;
      return total;
    },
    custom: function() {
      let target = [];
      let targetOne = null;
      let customFloor = this.customFloor;
      let searchComma = ",";
      let searchTo = "-";
      let arrayTo = [];
      let customTotal = 0;
      if (customFloor !== null) {
        let firstCheck = customFloor.indexOf(searchComma);
        //console.log(firstCheck);
        if (firstCheck > -1) {
          target = customFloor.split(",");
          console.log(target.length, target);
          customTotal = this.zone * this.zoneHeight * this.selected;
          // find all strings in array containing '-'
          //let items = ['item 1', 'thing', 'id-3-text', 'class','1-3','60-0'];
          let matches = target.filter(s => s.includes("-"));
          //console.log('to',matches)
          for (let i in matches) {
            let to = matches[i].split("-");
            //console.log('t',to)
            arrayTo.push(to);
          }
          console.log("arrayTo", arrayTo);
        } else {
          /**ตัวเดียว */
          let firstCheck = customFloor.indexOf(searchTo);
          if (firstCheck > -1) {
            //console.log("-", false);
            targetOne = customFloor;
            console.log("t", targetOne);
          }else{

          }
          customTotal = this.zone * this.zoneHeight * this.selected;
        }
      }
      return customTotal;
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.floorState = valid;
      this.zoneState = valid;
      this.zoneHeightState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;

      this.customFloor = null;
      this.customFloorCheck = false;

      this.selectedFloor = "1";
      this.selected = "2";
      this.floor = null;
      this.zone = null;
      this.zoneHeight = null;
      this.floorState = null;
      this.zoneState = null;
      this.zoneHeightState = null;
      this.total = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    customSetting() {},

    resetCollection() {
      // let citiesRef = db.collection("floors");
      // let allCities = citiesRef
      //   .get()
      //   .then(snapshot => {
      //     snapshot.forEach(doc => {
      //       if (!doc.exists) {
      //         console.log("No such document!");
      //       } else {
      //         console.log("Document data:", doc.id, "=>", doc.data());
      //       }
      //     });
      //   })
      //   .catch(err => {
      //     console.log("Error getting documents", err);
      //   });
      /* Delete Collection */
      // db.collection("floors")
      //   .get()
      //   .then((res) => {
      //     res.forEach((element) => {
      //       element.ref.delete();
      //     });
      //   })
      //   .catch((err) => {
      //     console.log("Error getting documents", err);
      //   });
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      ////this.submittedNames.push(this.name);
      this.submittedNames.push(this.floor);
      // console.log("floor", this.floor);
      // console.log("zone", this.zone);
      // console.log("zoneHeight", this.zoneHeight);
      // console.log("zoneWidth", this.selected);
      let num = parseInt(this.floor);
      // var batch = db.batch();

      this.total = this.floor * this.zone * this.zoneHeight * this.selected;

      /**reset before create */
      console.log("initial");
      let c = await this.resetCollection();

      let dataFloor = {
        height: this.zoneHeight.toString(),
        width: this.selected.toString(),
        zone: this.zone.toString(),
        timeStramp: Date.now()
      };
      let zoneData = { id1: "handicap", entrance: false };
      let idStatus = { status: "active" };

      //let pos;

      let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      /** ได้แล้ว แต่สร้างนาน กิน Bandwidth */
      
      for (let floor = 0; floor < num; floor++) {
        let setFloors = db
          .collection("floors")
          .doc((floor + 1).toString())
          .set(dataFloor);
        if (parseInt(this.zone) != 0) {
          for (let zone = 0; zone < parseInt(this.zone); zone++) {
            let setZoneDetail = db
              .collection("floors")
              .doc((floor + 1).toString())
              .collection("zoneDetail")
              .doc(az.charAt(zone))
              .set(zoneData);
            for ( let slot = 0; slot < parseInt(this.zoneHeight * this.selected);slot++) {
              let setSlotDetail = db
                .collection("floors")
                .doc((floor + 1).toString())
                .collection("zoneDetail")
                .doc(az.charAt(zone))
                .collection("slotDetail")
                .doc(
                  (floor + 1).toString() +
                    az.charAt(zone) +
                    "-" +
                    ('0'+(slot + 1)).slice(-2) /**add '0' ,if slot less then 10 */

                   
                )
                .set(idStatus)
                .then((docRef)=>{
                  /**ดัก progress upload ยังไม่ได้ทำ*/
                  console.log('Document written');
                }).then(()=>{
                  this.$bvModal.hide("initParkingg");
                }).catch((error)=>{
                  console.log('Error adding document: ',error)
                })
                
            }
          }
        }
      }

      /*                 */
      // // Get a new write batch
      // let batch = db.batch();

      // // Set the value of 'NYC'
      // let nycRef = db.collection("cities").doc("NYC");
      // batch.set(nycRef, { name: "New York City" });

      // // // Update the population of 'SF'
      // // let sfRef = db.collection('cities').doc('SF');
      // // batch.update(sfRef, {population: 1000000});

      // // // Delete the city 'LA'
      // // let laRef = db.collection('cities').doc('LA');
      // // batch.delete(laRef);

      // // Commit the batch
      // return batch.commit().then(function() {
      //   // ...
      // });

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("initParkingg");
      });
    }
  }
};
</script>
<style lang="scss">
.text-total {
  color: #81b9bf;
}
.logo-primary {
  color: #aebfbe;
}
</style>
