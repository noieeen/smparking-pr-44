<template>
  <div class="config">
    <div class="page-wrapper d-flex align-items-stretch">
      <div class="container-fluid">
        <!-- <initParking></initParking> -->

        <div class="page-content p-4 p-md-5 pt-5">
          <Navbar />

          <div class="bg-light mt-5">
            <!-- <h1 class="display-2">Config</h1> -->
            <page-number></page-number>
            <main class="page-content pt-2">
              <router-view :key="$route.path"></router-view>
              <div>
                <section>
                  <nav aria-label="Page navigation ">
                    <div class="pagination overflow-auto justify-content-center">
                      <div class>
                        <b-pagination-nav
                          pills
                          v-model="currentPage"
                          :link-gen="linkGen"
                          :number-of-pages="rows"
                          use-router
                        ></b-pagination-nav>
                      </div>
                      <div>
                       
                      </div>
                    </div>
                  </nav>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>

    <!-- <PageNavi /> -->

    <initParking></initParking>
    <editFloor></editFloor>
    <slotModal></slotModal>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

import PageNavi from "@/components/PageNavi";
import InitParking from "@/components/InitParking";
import EditFloor from "@/components/EditFloor";
import SlotModal from "@/components/SlotModal";
import PageNumber from "@/components/PageNumberBackground.vue";

import { db } from "../firebase";
export default {
  components: {
    Navbar,

    PageNavi,
    InitParking,
    EditFloor,
    SlotModal,
    PageNumber
  },

  data() {
    return {
      floors: [],
      /** Change row pageNavi here */
      rows: 55,
      perPage: 1,
      currentPage: this.$store.state.floor,
      goFloor: null
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  // data() {
  //   return {
  //     zone: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //     perZone: [1, 2, 3, 4, 5, 6, 7, 8],
  //     slot: 4
  //   };
  // },
  // data() {
  //   return {
  //     rows: 100,
  //     perPage: 1,
  //     currentPage: 4
  //   };
  // }
  methods: {
    test() {
      console.log("floors page", this.floors.length);
    },
    linkGen(pageNum) {
      //return pageNum === 1 ? "?" : `?floor=${pageNum}`;
      return `/floor/${pageNum}`;
    },
    changefloor() {}
  },
  updated() {
    this.$store.commit("changeFloor", this.currentPage);
    //alert('update Config',this.rows)
    console.log(this.currentPage);
  },
  onSubmit(e) {}
};
</script>
<style lang="scss">
.config {
  z-index: -1;
  min-height: 100%;
  min-width: 100%;
}
</style>
