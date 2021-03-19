/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

//VueRouter
import router from "./routes";



//? Vue router
//? Store management
import store from "./store/index";

const app = new Vue({
    router,
    store,
    el: '#app',
});
