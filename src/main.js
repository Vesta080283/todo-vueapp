// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.css";

Vue.config.productionTip = false;

Vue.use(VueMaterial);

const firebaseConfig = {
  apiKey: "AIzaSyBShWSJjn7sszSDWjJRbxFksLT0_YuOfxE",
  authDomain: "todo-vueapp-c42c7.firebaseapp.com",
  projectId: "todo-vueapp-c42c7",
  storageBucket: "todo-vueapp-c42c7.appspot.com",
  messagingSenderId: "458699133931",
  appId: "1:458699133931:web:725e19ff4b923dc1817fae"
};
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },

  template: "<App/>"
});
