<template>
  <v-navigation-drawer
    class="pa-0"
    :class="{ 'nav-drawer': !mini }"
    :mini-variant.sync="mini"
    width="286"
    mini-variant-width="80"
    mobile-breakpoint="0"
    disable-resize-watcher
  >
    <div class="d-flex flex-column full-height overflow-hidden pa-4">
      <v-btn
        @click.stop="mini = true"
        v-if="!mini"
        class="btn-toggle-drawer"
        icon
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="mx-auto" :class="mini ? 'mini-logo-img' : 'logo-img'">
        <v-img :src="require('@/assets/quochuy.png')" />
      </div>

      <div
        v-if="!mini"
        class="font-weight-bold green100--text text-sm text-center text-uppercase mt-4 mb-2"
      >
        cổng thông tin giới thiệu sản phẩm và truy xuất nguồn gốc hoa, cây cảnh
        tỉnh bến tre
      </div>
      <v-divider class="mt-4"></v-divider>
      <div class="py-4">
        <v-list class="py-0">
          <v-list-item
            class="border-radius-8 py-0 px-2"
            to="/dashboard"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Báo cáo thống kê</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            dense
            to="/region"
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-warehouse</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Vùng sản xuất</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/htx"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-home-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Hợp tác xã</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/agency"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-store-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Đại lý</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/artisan"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý nghệ nhân</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/product"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-tree-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Cây và Hoa</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/supply"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-shovel</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý vật tư</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/seed"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-seed-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý giống</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/news"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-newspaper-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý bài viết</v-list-item-title
            >
          </v-list-item>

          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/contact"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-badge
                color="red"
                :content="contactStore.contactNotification"
                v-if="mini && contactStore.contactNotification > 0"
              >
                <v-icon>mdi-email-outline</v-icon>
              </v-badge>
              <v-icon v-else>mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2 d-flex align-center"
              v-if="!mini"
            >
              <div>Hòm thư, liên hệ</div>
              <v-spacer></v-spacer>
              <div>
                <v-badge
                  color="red"
                  :content="contactStore.contactNotification"
                  v-if="!mini && contactStore.contactNotification > 0"
                  class="ml-n4"
                >
                </v-badge>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/document"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý văn bản</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/faq"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Quản lý hỏi đáp</v-list-item-title
            >
          </v-list-item>

          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/account-setting"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mx-auto">
              <v-icon>mdi-account-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="text-md font-weight-medium ml-2"
              v-if="!mini"
              >Thông tin tài khoản
            </v-list-item-title>
          </v-list-item>
          <v-list-group
            class="border-radius-8 mt-2 mx-n2"
            :value="true"
            prepend-icon="mdi-cog-outline"
            no-action
            active-class="active-item"
          >
            <template v-slot:activator>
              <v-list-item-title class="mx-n3 text-md font-weight-medium"
                >Cấu hình trang chủ</v-list-item-title
              >
            </template>

            <v-list-item
              v-for="([title, url], i) in admins"
              :key="i"
              link
              class="border-radius-8 mx-4 px-4"
              active-class="active-item"
              :to="url"
            >
              <v-list-item-title class="text-md font-weight-medium">{{
                title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>

      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <div class="d-flex align-center justify-space-between mt-6">
        <v-list-item-avatar v-if="mini">
          <v-img
            :src="
              userStore.userData.avatar
                ? userStore.userData.avatar
                : require(`@/assets/components/landing/profile.webp`)
            "
          />
        </v-list-item-avatar>
        <div class="d-flex align-center" v-if="!mini">
          <v-img
            class="avatar-img"
            :src="
              userStore.userData.avatar
                ? userStore.userData.avatar
                : require(`@/assets/components/landing/profile.webp`)
            "
          />

          <div class="ml-4">
            <div
              class="font-weight-bold text-sm neutral100--text text-capitalize"
            >
              {{
                userStore.userData.name ? userStore.userData.name : "unknown"
              }}
            </div>
            <div class="text-caption neutral70--text">
              {{
                userStore.userData.email ? userStore.userData.email : "unknown"
              }}
            </div>
          </div>
        </div>
        <v-btn
          class="d-flex red60--text px-0 text-none mb-2 text-btn align-center"
          @click="onLogoutClicked"
          icon
          v-if="!mini"
        >
          <v-icon class="mt-2" color="neutral60"> mdi-logout </v-icon>
        </v-btn>
      </div>
      <!-- <div class=" pb-6">
        
        <v-btn
          class="d-flex red60--text px-0 text-none mb-2 text-btn"
          @click="onLogoutClicked"
          text
        >
          <v-icon  color="red60"> mdi-power </v-icon>
          <div>Log Out</div>
        </v-btn>
        <v-divider></v-divider>
        <div class="text-xs neutral70--text mt-2">
          v{{ version }} - {{ environment }}
        </div>
      </div> -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { contactStore } from "@/views/contact/store/contact-store";
import { mapStores } from "pinia";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(contactStore),
  },
  methods: {
    onLogoutClicked() {
      this.userStore.logout();
      this.$router.push("/login");
    },
  },
  created() {
    this.contactStore.fetchContacts();
  },
  data() {
    return {
      mini: false,
      admins: [
        ["Banner", "/homepage-banner"],
        ["Sản phẩm tiêu biểu", "/homepage-fav-product"],
        ["Hợp tác xã", "/homepage-fav-htx"],
        ["Đại lý", "/homepage-fav-agency"],
        ["Nghệ nhân", "/homepage-fav-artisan"],
        ["Đối tác", "/homepage-fav-partner"],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 18px !important;
}
.logo-img {
  width: 56px;
  height: 56px;
}
.mini-logo-img {
  width: 32px;
  height: 32px;
}

.active-item {
  background: var(--v-primary60-base) !important;
  color: white !important;
}
.btn-toggle-drawer {
  position: absolute;
  right: 0;
  top: 16;
}
.nav-drawer {
  min-width: 280px;
}

.v-list__group__header {
  border-radius: 8px !important;
}
.v-list-item--active {
  background: var(--v-primary60-base) !important;
  color: white !important;
}
</style>
