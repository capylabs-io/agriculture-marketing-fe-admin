import Vue from "vue";
import VueRouter from "vue-router";
import { userStore } from "@/stores/userStore";
import alert from "@/plugins/alert";
// import alert from "@/plugins/alert";

// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/pages/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register/pages/register.vue"),
  },
  {
    path: "/",
    name: "Mainlayout",
    component: () => import("../views/Mainlayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/dash-board/pages/dash-board.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/account-setting",
        name: "Admin Account",
        component: () =>
          import("../views/account-setting/pages/account-setting.vue"),

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
          requiresAdminAuth: true,
        },
      },
      {
        path: "/write-post",
        name: "Write Post",
        component: () => import("../views/news/pages/create-news.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-post",
        name: "Update Post",
        component: () => import("../views/news/pages/edit-news.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/product",
        name: "Product Management",
        component: () =>
          import("../views/product/pages/product-management.vue"),
        meta: {
          requiresAuth: true,
        },
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
          requiresArtisanAuth: false,
        },
      },
      {
        path: "/create-supply",
        name: "Create Supply",
        component: () => import("../views/supply/pages/create-supply.vue"),
        meta: {
          requiresAuth: true,
          requiresArtisanAuth: false,
        },
      },
      {
        path: "/edit-supply",
        name: "Update Supply",
        component: () => import("../views/supply/pages/edit-supply.vue"),
        meta: {
          requiresAuth: true,
          requiresArtisanAuth: false,
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
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/artisan",
        name: "Artisan Management",
        component: () =>
          import("../views/artisan/pages/artisan-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/create-artisan",
        name: "Create Artisan",
        component: () => import("../views/artisan/pages/create-artisan.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-artisan",
        name: "Update Artisan",
        component: () => import("../views/artisan/pages/edit-artisan.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/agency",
        name: "Agency Management",
        component: () => import("../views/agency/pages/agency-management.vue"),
        meta: {
          requiresAuth: true,
          requiresArtisanAuth: false,
          requiresStoreAuth: false,
        },
      },
      {
        path: "/create-agency",
        name: "Create Agency",
        component: () => import("../views/agency/pages/create-agency.vue"),
        meta: {
          requiresAuth: true,
          requiresArtisanAuth: false,
          requiresStoreAuth: false,
        },
      },
      {
        path: "/edit-agency",
        name: "Update Agency",
        component: () => import("../views/agency/pages/edit-agency.vue"),
        meta: {
          requiresAuth: true,
          requiresArtisanAuth: false,
          requiresStoreAuth: false,
        },
      },
      {
        path: "/htx",
        name: "HTX Management",
        component: () => import("../views/htx/pages/htx-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/create-htx",
        name: "Create HTX",
        component: () => import("../views/htx/pages/create-htx.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-htx",
        name: "Update HTX",
        component: () => import("../views/htx/pages/edit-htx.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/region",
        name: "Region Management",
        component: () => import("../views/region/pages/region-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/create-region",
        name: "Create Region",
        component: () => import("../views/region/pages/create-region.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-region",
        name: "Update Region",
        component: () => import("../views/region/pages/edit-region.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },

      {
        path: "/contact",
        name: "Contact Management",
        component: () =>
          import("../views/contact/pages/contact-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },

      {
        path: "/document",
        name: "Document Management",
        component: () =>
          import("../views/document/pages/document-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/create-document",
        name: "Create Document",
        component: () => import("../views/document/pages/create-document.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-document",
        name: "Edit Document",
        component: () => import("../views/document/pages/edit-document.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },

      {
        path: "/faq",
        name: "FAQ Management",
        component: () => import("../views/faq/pages/faq-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/create-faq",
        name: "Create FAQ",
        component: () => import("../views/faq/pages/create-faq.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/edit-faq",
        name: "Edit FAQ",
        component: () => import("../views/faq/pages/edit-faq.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-banner",
        name: "Banner",
        component: () =>
          import("../views/homepage-config/banner/pages/banner-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-banner",
        name: "Banner",
        component: () =>
          import("../views/homepage-config/banner/pages/banner-management.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-product",
        name: "favProduct",
        component: () =>
          import(
            "../views/homepage-config/fav-product/pages/fav-product-management.vue"
          ),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-htx",
        name: "favHtx",
        component: () =>
          import("../views/homepage-config/htx/pages/fav-htx-managment.vue"),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-artisan",
        name: "favArtisan",
        component: () =>
          import(
            "../views/homepage-config/artisan/pages/fav-artisan-managment.vue"
          ),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-agency",
        name: "favAgency",
        component: () =>
          import(
            "../views/homepage-config/agency/pages/fav-agency-managment.vue"
          ),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-partner",
        name: "favPartner",
        component: () =>
          import(
            "../views/homepage-config/partner/pages/fav-partner-managment.vue"
          ),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
      },
      {
        path: "/homepage-fav-region",
        name: "favRegion",
        component: () =>
          import(
            "../views/homepage-config/region/pages/fav-region-managment.vue"
          ),
        meta: {
          requiresAuth: true,
          requiresAdminAuth: true,
        },
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
    next("/login");
  }
  if (to.meta && to.meta.requiresAdminAuth && !user.isAuthenticated) {
    alert.error("Not allowed!");
    next("/product");
  }
  if (to.meta && to.meta.requiresArtisanAuth && !user.isArtisan) {
    alert.error("Not allowed!");
    next("/product");
  }
  if (to.meta && to.meta.requiresCooperativeAuth && !user.isCooperative) {
    alert.error("Not allowed!");
    next("/agency");
  }
  if (to.meta && to.meta.requiresStoreAuth && !user.isStore) {
    alert.error("Not allowed!");
    next("/product");
  }
  next();
});

export default router;
