import VueRouter from "vue-router";
import Vue from "vue";

import Index from "./components/Index"
//* 404
import NotFound from "./components/404";

Vue.use(VueRouter);
const routes = [
    //? Global Routes
    { path: "/", name: "index", component: Index },
    //* 404
    { path: "*", component: NotFound }
];


const router = new VueRouter({
    routes,
    mode: "history",
    linkExactActiveClass: "",
    linkActiveClass: "active"
});




export default router;