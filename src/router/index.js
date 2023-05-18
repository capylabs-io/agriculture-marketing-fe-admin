import Vue from "vue";
import VueRouter from "vue-router";
// import alert from "@/plugins/alert";

// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/login/pages/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register/pages/register.vue"),
  },
  {
    path: "/main",
    name: "Mainlayout",
    component: () => import("../views/Mainlayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/dash-board/pages/dash-board.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/account-setting",
        name: "Admin Account",
        component: () =>
          import("../views/account-setting/pages/account-setting.vue"),

        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/news",
        name: "News Management",
        component: () => import("../views/news/pages/news.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/product",
        name: "Product Management",
        component: () =>
          import("../views/product/pages/product-management.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/supply",
        name: "Supply Management",
        component: () => import("../views/supply/pages/supply-management.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/seed",
        name: "Breed Management",
        component: () => import("../views/breed/pages/breed-management.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/create-supply",
        name: "Create Supply",
        component: () => import("../views/supply/pages/create-supply.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/write-post",
        name: "Write Post",
        component: () => import("../views/news/pages/create-news.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/create-product",
        name: "Create Product",
        component: () => import("../views/product/pages/create-product.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/create-seed",
        name: "Create Breed",
        component: () => import("../views/breed/pages/create-breed.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// router.beforeEach((to, from, next) => {
//   const user = userStore();
//   if (to.meta && to.meta.requiresAuth && !user.isConnected) {
//     alert.error("You need to login before accessing this site!");
//     next("/login");
//   }
//   if (to.meta && to.meta.requiresPartnerAuth && !user.isPartner) {
//     alert.error("Only Partner is allowed!");
//     next("/dashboard");
//   }
//   if (to.meta && to.meta.requiresMaintainerAuth && !user.isMaintainer) {
//     alert.error("Only Partner is allowed!");
//     next("/dashboard");
//   }
//   next();
// });

export default router;
