import Vue from "vue";
import VueRouter from "vue-router";

// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: `/home`,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {

  next();
});

export default router;
