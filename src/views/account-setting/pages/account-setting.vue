<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <ChangePasswordDialog />

    <div class="text-dp-xs font-weight-bold">Thông tin tài khoản</div>
    <div class="d-flex align-center mt-4">
      <div class="d-flex align-center gap-8">
        <div class="neutral30-border border-radius-8 overflow-hidden">
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="userStore.isEditingBrandInfo = true"
            v-if="!userStore.isEditingBrandInfo"
            depressed
            >Chỉnh sửa</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="userStore.isEditingBrandInfo"
        >
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="userStore.isEditingBrandInfo = false"
            depressed
            >Hủy</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="userStore.isEditingBrandInfo"
        >
          <v-btn
            color="primary"
            class="white--text text-none font-weight-bold px-2"
            :disabled="!userStore.brandInfoForm && !userStore.avatarUrl"
            @click="editAccount()"
            depressed
            >Lưu thay đổi</v-btn
          >
        </div>
      </div>
    </div>
    <div class="border-radius-16 white-bg neutral20-border px-6 pt-6 pb-2 mt-6">
      <CreateNewsForm />
    </div>
    <!-- <div>
        <div class="d-flex align-center justify-space-between mt-4">
          <div class="text-lg font-weight-bold">Password</div>
        </div>
     
      </div> -->
    <v-row class="mt-5">
      <v-col cols="12" md="5">
        <v-btn
          color="primary"
          class="border-radius-8 text-none font-weight-bold"
          @click="userStore.changePasswordDialog = true"
          depressed
          >Đổi mật khẩu</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.upload-container {
  position: relative;
}
.upload-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
}
.account-ava {
  width: 56px !important;
  height: 56px !important;
}
</style>

<script>
// import PictureInput from "vue-picture-input";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
// import { get } from "lodash";
export default {
  components: {
    CreateNewsForm: () => import("../components/account-edit-form.vue"),
    ChangePasswordDialog: () => import("../dialogs/change-password-dialog.vue"),
  },
  data() {
    return {
      isEditing: false,
      isShowPass: false,
    };
  },
  computed: {
    ...mapStores(userStore),
    // partnerAvatar() {
    //   return get(
    //     this.userStore,
    //     "partner.avatarUrl",
    //     require("@/assets/components/upload-icon.png")
    //   );
    // },
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.userStore.changePartnerAvatar(imageFile);
      } else {
        console.log("FileReader API not supported!");
      }
    },
    editAccount() {
      this.userStore.updateAccountSetting();
      this.profileEdit = false;
    },
  },
  async created() {
    // this.userStore.reset();
    // if (this.$route.path.includes("account-setting")) {
    //   await this.userStore.fetchPartnerInfo();
    // } else {
    //   const partnerId = this.$route.params.id;
    //   if (!partnerId) this.$router.push("/dashboard");
    //   await this.userStore.fetchPartner(partnerId);
    // }
  },
  // components: {
  //   // PictureInput,
  // },
};
</script>
