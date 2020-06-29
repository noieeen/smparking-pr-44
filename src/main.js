import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import { fb } from "./firebase";
import VueFirestore from "vue-firestore";



Vue.use(VueFirestore);

require("firebase/firestore");



import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


import "bootstrap";
import './assets/app.scss'
import 'popper.js'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)






import Swal from "sweetalert2"; //alert
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
window.Toast = Toast;


fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
