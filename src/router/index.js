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
        path: "/dash-board",
        name: "Dash Board",
        component: () => import("../views/dash-board/pages/dash-board.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      // {
      //   path: "/campaign/:id",
      //   name: "Campaign Detail",
      //   component: () => import("../views/campaign/pages/CampaignDetail.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/create-campaign",
      //   name: "Create Campaign",
      //   component: () => import("../views/campaign/pages/CreateCampaign.vue"),
      //   meta: {
      //     requiresAuth: true,
      //     requiresPartnerAuth: true,
      //   },
      // },
      // {
      //   path: "/category",
      //   name: "Category Management",
      //   component: () => import("../views/category/pages/CategoryManagement.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/user-management",
      //   name: "User Management",
      //   component: () => import("../views/user/pages/UserManagement.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/user-detail/:id",
      //   name: "User Detail",
      //   component: () => import("../views/user/pages/UserDetail.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/account-setting",
      //   name: "Partner Account",
      //   component: () => import("../views/partner/pages/PartnerDetail.vue"),
      //   meta: {
      //     requiresAuth: true,
      //     requiresPartnerAuth: true,
      //   },
      // },
      // {
      //   path: "/partner",
      //   name: "Partner Management",
      //   component: () => import("../views/partner/pages/PartnerManagement.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/partner/:id",
      //   name: "Partner Detail",
      //   component: () => import("../views/partner/pages/PartnerDetail.vue"),
      //   meta: {
      //     requiresAuth: true,
      //     requiresMaintainerAuth: true,
      //   },
      // },
      // {
      //   path: "/dashboard",
      //   name: "Dashboard",
      //   component: () => import("../views/dashboard/pages/DashboardLayout.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
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
