<template>
  <div class="editFloor">
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
    
      id="editFloorr"
      ref="modal"
      :title="'Edit floor '+[[$store.state.floor]]"
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
            :state="floorState"
            label-for="numberFloor"
            invalid-feedback="Floor is required"
          >
            <b-form-input
              id="numberFloor"
              v-model="floor"
              :state="floorState"
              type="number"
              disabled
              required
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
  name: "EditFloor",
  data() {
    return {
      floors: [],
      selected: "2",
      options: [
        { item: "1", name: "1 Side" },
        { item: "2", name: "2 Side" }
      ],
      selectedFloor: null,
      name: "",
      nameState: null,
      submittedNames: [],

      // customfloor: null,
      // customFloorState: null,
      floor: this.$store.state.floor,
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
      let total = this.zone * this.zoneHeight * this.selected;
      return total;
    }
    // currentFloor:function(){
    //   let now =this.$store.state.floor
    //   return  now
    // }
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

      // this.selectedFloor = this.$store.state.floor;
      // this.selected = "2";
      this.floor= this.$store.state.floor;
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
    toFirebase() {},
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
      //   .then(res => {
      //     res.forEach(element => {
      //       element.ref.delete();
      //     });
      //   })
      //   .catch(err => {
      //     console.log("Error getting documents", err);
      //   });
    },
    handleSubmit() {
      this.resetCollection();
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

      let dataFloor = {
        height: this.zoneHeight.toString(),
        width: this.selected.toString(),
        zone: this.zone.toString(),
        timeStramp: Date.now()
      };
      let zoneData = { id1: "handicap", entrance: false };
      let idStatus = { status: "active" };

      let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      /** ได้แล้ว แต่สร้างนาน กิน Bandwidth */

      let setFloors = db
        .collection("floors")
        .doc((this.$store.state.floor).toString())
        .set(dataFloor);
      if (parseInt(this.zone) != 0) {
        for (let zone = 0; zone < parseInt(this.zone); zone++) {
          let setZoneDetail = db
            .collection("floors")
            .doc((this.$store.state.floor).toString())
            .collection("zoneDetail")
            .doc(az.charAt(zone))
            .set(zoneData);
          for (
            let slot = 0;
            slot < parseInt(this.zoneHeight * this.selected);
            slot++
          ) {
            
            let setSlotDetail = db
              .collection("floors")
             .doc((this.$store.state.floor).toString())
              .collection("zoneDetail")
              .doc(az.charAt(zone))
              .collection("slotDetail")
              .doc((this.$store.state.floor).toString()+
                  az.charAt(zone) +
                  "-" +
                    ('0'+(slot + 1)).slice(-2) /**add '0' ,if slot less then 10 */
              )
              .set(idStatus)
               .then((docRef)=>{
                 /**ดัก progress upload ยังไม่ได้ทำ*/
                 
                  console.log('Document written');
                  
                }).then(()=>{
                  this.$bvModal.hide("editFloorr");
                }).catch((error)=>{
                  console.log('Error adding document: ',error)
                })
          }
        }
      }

     
      this.$nextTick(() => {
        this.$bvModal.hide("editFloor");
      });
    }
  }
  // updated() {
  //   currentFloor :this.$store.state.floor
  // }
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
