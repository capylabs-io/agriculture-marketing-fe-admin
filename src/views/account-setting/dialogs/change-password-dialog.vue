<template>
  <v-dialog
    v-model="accountStore.changePasswordDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="pa-4">
      <v-form v-model="changePasswordForm">
        <div class="text-lg font-weight-bold text-center">Đổi Mật Khẩu</div>
        <div class="mt-4">
          <div class="text-sm neutral70--text font-weight-bold">
            Mật khẩu hiện tại
          </div>
          <v-text-field
            :append-icon="isShowPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowPass1 ? 'text' : 'password'"
            :rules="$rules.password"
            @click:append="isShowPass1 = !isShowPass1"
            v-model="currentPassword"
            class="border-radius-6 mt-1 pa-0"
            placeholder="mật khẩu"
            color="primary"
            outlined
            flat
            solo
            filled
            dense
          />
        </div>
        <div class="mt-4">
          <div class="text-sm neutral70--text font-weight-bold">
            Mật khẩu mới
          </div>
          <v-text-field
            :append-icon="isShowPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowPass2 ? 'text' : 'password'"
            :rules="$rules.password"
            @click:append="isShowPass2 = !isShowPass2"
            v-model="newPassword"
            class="border-radius-6 mt-1 pa-0"
            placeholder="mật khẩu"
            color="primary"
            outlined
            flat
            solo
            filled
            dense
          />
        </div>
        <div class="mt-4">
          <div class="text-sm neutral70--text font-weight-bold">
            Xác nhận mật khẩu mới
          </div>
          <v-text-field
            :append-icon="isShowPass3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowPass3 ? 'text' : 'password'"
            :rules="$rules.password"
            @click:append="isShowPass3 = !isShowPass3"
            v-model="confirmPassword"
            class="border-radius-6 mt-1 pa-0"
            placeholder="mật khẩu"
            color="primary"
            outlined
            flat
            solo
            filled
            dense
          />
        </div>
        <v-divider class="my-4"></v-divider>
        <div class="d-flex align-center justify-space-between">
          <v-btn
            class="text-none text-btn border-radius-8 px-2"
            color="gray"
            elevation="0"
            @click="onCancelClicked"
            dense
          >
            Hủy
          </v-btn>
          <v-btn
            class="text-none text-btn border-radius-8 px-2"
            color="primary"
            elevation="0"
            @click="onChangeClicked"
            :disabled="!changePasswordForm"
            dense
          >
            Thay đổi
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { accountStore } from "../stores/accountStore";
export default {
  data() {
    return {
      isShowPass1: false,
      isShowPass2: false,
      isShowPass3: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      changePasswordForm: false,
    };
  },
  computed: {
    ...mapStores(accountStore),
  },
  methods: {
    onCancelClicked() {
      this.accountStore.changePasswordDialog = false;
    },
    async onChangeClicked() {
      if (this.confirmPassword != this.newPassword) {
        this.$alert.error("Confirm password does not match new password!");
        return;
      }
      await this.accountStore.changePassword(
        this.currentPassword,
        this.newPassword,
        this.confirmPassword
      );
    },
  },
};
</script>
