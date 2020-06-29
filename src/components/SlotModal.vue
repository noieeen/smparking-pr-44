<template>
  <div class="slotModal">
    <b-modal
      id="slotModall"
      ref="modal"
      :title="'Slot Setting '+[[$store.state.slotSelect[0]]]"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      centered
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-cols-lg="2"
          label="SMparking"
          label-size="lg"
          label-class="font-weight-bold pt-1 logo-primary h1"
          class="mb-0 ml-2"
        >
          <b-form-group
            label-cols-sm="4"
            label="Best slot:"
            label-align-sm="right"
            :state="slotState"
            label-for="numberFloor"
            invalid-feedback="Floor is required"
          >
            <b-form-checkbox
              id="markEntrance"
              v-model="bestSlot"
              name="markEntrance"
              value="accepted"
              class="form-group col-md mt-2"
              unchecked-value="not_accepted"
            >
              This
              <strong>{{$store.state.slotSelect[0]}}</strong> is best slot
            </b-form-checkbox>
          </b-form-group>

          <b-form-group>
            <b-button variant="danger" class="float-right mr-4" @click="deleteSlot">Remove slot</b-button>
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { db, rdb } from "../firebase";
import { firestore } from "firebase";
//import * as admin from 'firebase-admin';
const admin = require("firebase-admin");

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

      slotState: null,
      bestSlot: "not_accepted",

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
      totalState: null,

      bestStatus: null,
      bestStatusKey: null
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  computed: {
    // total: function() {
    //   let total = this.zone * this.zoneHeight * this.selected;
    //   return total;
    // }
    // currentFloor:function(){
    //   let now =this.$store.state.floor
    //   return  now
    // }
  },
  mounted() {
    let bestFromRdbRef = rdb.ref("/bestSlot");
    bestFromRdbRef.on("value", snapshot => {
      this.bestStatus = snapshot.val();
      this.bestStatusKey = snapshot.key;
    });
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      // this.floorState = valid;
      // this.zoneState = valid;
      // this.zoneHeightState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;

      this.bestSlot = "not_accepted";
      // this.selectedFloor = this.$store.state.floor;
      // this.selected = "2";
      // this.floor = this.$store.state.floor;
      // this.zone = null;
      // this.zoneHeight = null;
      // this.floorState = null;
      // this.zoneState = null;
      // this.zoneHeightState = null;
      // this.total = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    deleteSlot() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          let zone = this.$store.state.slotSelect[0].match(/[a-zA-Z]+/g);
          zone = zone[0];
          //console.log('dalete',this.$store.state.floor.toString(),zone,this.$store.state.slotSelect[0])

          /** delete slot เสร็จแลัววว */
          let setSlotDetail = db
            .collection("floors")
            .doc(this.$store.state.floor.toString()) /**floor */
            .collection("zoneDetail")
            .doc(zone) /**zone */
            .collection("slotDetail")
            .doc(this.$store.state.slotSelect[0]) /**slot */
            .delete()
            .then(docRef => {
              /**ดัก progress upload ยังไม่ได้ทำ*/
              console.log("Document deleted");
            })
            .catch(error => {
              console.log("Error adding document: ", error);
            });

          Swal.fire("Deleted!", "Deleted successfully.", "success");

          this.$bvModal.hide("slotModall");

          // Toast.fire({           //***ดี */
          // icon: 'success',
          // title: 'Signed in successfully'
          // });
        }
      });
    },
    markBestSlot() {
      // let posXY = () => 3 + 1;
      // console.log(posXY());

      let slotSelect = [this.$store.state.slotSelect[0]].toString();
      if (slotSelect !== null) {
        if (this.bestSlot == "accepted") {
          let setBsetToFirebase = rdb
            .ref("/bestSlot")
            .child(slotSelect)
            .set(true)
            .then(() => console.log("set best Success"));
        } if (this.bestSlot == "not_accepted") {
          let setBsetToFirebase = rdb
            .ref("/bestSlot")
            .child(slotSelect)
            .remove()
            .then(() => console.log("delete best Success"));
        }
      }
      //       let bestArr = this.floors[(this.$store.state.floor - 1).toString()]
      //         .bestSlot;

      //       let setBestSlot = null;
      //       if (this.bestSlot === "accepted") {
      //         setBestSlot = { bestSlot: true };
      //         console.log("bestSlot", setBestSlot);
      //       } else if (this.bestSlot === "not_accepted") {
      //         setBestSlot = { bestSlot: false };
      //         console.log("bestSlot", setBestSlot);
      //       }
      // let besBestt = {'bestSlot':[this.$store.state.slotSelect[0]]}

      // // var washingtonRef = db.collection("floors").doc("1");

      // // // Atomically add a new region to the "regions" array field.
      // // washingtonRef.update({
      // //     'bestSlot': admin.firestore.FieldValue.arrayUnion("greater_virginia")
      // // });

      // // // Atomically remove a region from the "regions" array field.
      // // washingtonRef.update({
      // //     'bestSlot': admin.firestore.FieldValue.arrayRemove("east_coast")
      // // });

      // // let col = db.collection('floors').doc('1')
      // // //let query = col.where('bestSlot','array-contains','1B-02')
      // // col.update({'bestSlot':FieldValue.arrayUnion('1A-01')})
      // // // .get().then(snapshot =>{
      // // //   snapshot.docs.forEach(doc =>{
      // // //     console.log('items',doc.id,doc.data())
      // // //   })
      // // // })

      //       let zone = this.$store.state.slotSelect[0].match(/[a-zA-Z]+/g);
      //       zone = zone[0];
      //       //console.log('dalete',this.$store.state.floor.toString(),zone,this.$store.state.slotSelect[0])
      //       let bestSlot = null;
      //       /** delete slot เสร็จแลัววว */
      //       let setSlotDetail = db
      //         .collection("floors")
      //         .doc(this.$store.state.floor.toString()) /**floor */
      //         // .collection("zoneDetail")
      //         // .doc(zone) /**zone */
      //         // .collection("slotDetail")
      //         // .doc(this.$store.state.slotSelect[0]) /**slot */
      //       /** =======>>>>>> */  .update(besBestt /**https://www.youtube.com/watch?v=4t2eHrFW_0M */)
      //        // .update({ bestSlot: admin.firestore.FieldValue.arrayUnion([this.$store.state.slotSelect[0]])})
      //         .then(docRef => {
      //           /**ดัก progress upload ยังไม่ได้ทำ*/
      //           console.log("Added document with ID: ", docRef);
      //         })
      //         .then(() => {
      //           this.$bvModal.hide("slotModall");
      //           //this.$refs.
      //         })
      //         .catch(error => {
      //           console.log("Error adding document: ", error);
      //         });
    },

    handleSubmit() {
      this.markBestSlot();

      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      ////this.submittedNames.push(this.name);
      //this.submittedNames.push(this.floor);
      // console.log("floor", this.floor);
      // console.log("zone", this.zone);
      // console.log("zoneHeight", this.zoneHeight);
      // console.log("zoneWidth", this.selected);

      // let num = parseInt(this.floor);
      // // var batch = db.batch();

      // this.total = this.floor * this.zone * this.zoneHeight * this.selected;

      // let dataFloor = {
      //   height: this.zoneHeight.toString(),
      //   width: this.selected.toString(),
      //   zone: this.zone.toString(),
      //   timeStramp: Date.now()
      // };
      // let zoneData = { id1: "handicap", entrance: false };
      // let idStatus = { status: "active" };

      // let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      this.$nextTick(() => {
        this.$bvModal.hide("slotModall");
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
