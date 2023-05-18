<template>
  <v-navigation-drawer class="pa-0" width="284px" permanent app>
    <div class="d-flex flex-column full-height overflow-hidden pa-4">
      <div class="d-flex justify-center align-center py-7 logo-img mx-auto">
        <v-img :src="require(`@/assets/logo.png`)" />
      </div>

      <v-divider class="mt-2"></v-divider>
      <div class="py-6">
        <v-list class="py-0">
          <v-list-item
            class="border-radius-8 py-0 px-2"
            to="/dashboard"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Báo cáo thống kê</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/product"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-pine-tree</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Quản lý sản phẩm</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            to="/supply"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-warehouse</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
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
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-leaf</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
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
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Quản lý bài viết</v-list-item-title
            >
          </v-list-item>
          <!-- <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Quản lý hội viên</v-list-item-title
            >
          </v-list-item> -->
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/account-setting"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md font-weight-medium"
              >Thông tin tài khoản
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <div class="d-flex align-center justify-space-between mt-6">
        <div class="d-flex align-center">
          <v-img
            class="avatar-img"
            :src="require(`@/assets/components/landing/profile.webp`)"
          />
          <div class="ml-4">
            <div
              class="font-weight-bold text-sm neutral100--text text-capitalize"
            >
              Độ Phùng
            </div>
            <div class="text-caption neutral70--text">admin.123</div>
          </div>
        </div>
        <v-btn
          class="d-flex red60--text px-0 text-none mb-2 text-btn align-center"
          @click="onLogoutClicked"
          icon
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
          <v-icon class="mr-2" color="red60"> mdi-power </v-icon>
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
export default {
  computed: {},
  methods: {
    onLogoutClicked() {
      this.$router.push("/login");
    },
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
  width: 180px;
  height: 32px;
}

.active-item {
  background: var(--v-primary40-base) !important;
}
</style>
