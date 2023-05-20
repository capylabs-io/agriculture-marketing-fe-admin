import Vue from "vue";
import VueRouter from "vue-router";
import { userStore } from "@/stores/userStore";
import alert from "@/plugins/alert";
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
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/account-setting",
        name: "Admin Account",
        component: () => import("../views/account-setting/pages/account-setting.vue"),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/news",
        name: "News Management",
        component: () => import("../views/news/pages/news.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/product",
        name: "Product Management",
        component: () => import("../views/product/pages/product-management.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/supply",
        name: "Supply Management",
        component: () => import("../views/supply/pages/supply-management.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/seed",
        name: "Breed Management",
        component: () => import("../views/breed/pages/breed-management.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/create-supply",
        name: "Create Supply",
        component: () => import("../views/supply/pages/create-supply.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit-supply",
        name: "Update Supply",
        component: () => import("../views/supply/pages/edit-supply.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/write-post",
        name: "Write Post",
        component: () => import("../views/news/pages/create-news.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit-post",
        name: "Update Post",
        component: () => import("../views/news/pages/edit-news.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/create-product",
        name: "Create Product",
        component: () => import("../views/product/pages/create-product.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit-product",
        name: "Update Product",
        component: () => import("../views/product/pages/edit-product.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/create-seed",
        name: "Create Seedling",
        component: () => import("../views/breed/pages/create-breed.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit-seed",
        name: "Update Seedling",
        component: () => import("../views/breed/pages/edit-breed.vue"),
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

router.beforeEach((to, from, next) => {
  const user = userStore();
  if (to.meta && to.meta.requiresAuth && !user.isConnected) {
    alert.error("You need to login before accessing this site!");
    next("/");
  }
  next();
});

export default router;
