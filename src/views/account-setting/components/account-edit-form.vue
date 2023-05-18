<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          v-if="!userStore.userData.avatar"
          class="neutral20-border border-radius-16"
          :src="require('@/assets/components/landing/profile.webp')"
          max-height="128px"
          max-width="128px"
        ></v-img>
        <v-img
          v-else
          class="neutral20-border border-radius-16"
          :src="userStore.userData.avatar"
          max-height="128px"
          max-width="128px"
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Ảnh đại diện</div>
        <v-file-input
          v-model="userStore.file"
          :disabled="!userStore.isEditingBrandInfo"
          placeholder="Chọn hình minh hoạ"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          accept="image/png, image/jpeg, image/bmp,image/webp"
          ref="myfile"
          @change="onFileChanged($event)"
          prepend-icon=""
          :show-size="1000"
          clearable
          outlined
          solo
          dense
          flat
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="4">
        <div class="font-weight-semibold mb-2">Tên thành viên</div>
        <v-text-field
          v-model="userStore.userSignUpData.name"
          :disabled="!userStore.isEditingBrandInfo"
          type="text"
          class="border-radius-8"
          placeholder="Phùng thanh độ"
          solo
          outlined
          dense
          flat
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="4">
        <div class="font-weight-semibold mb-2">Số điện thoại</div>
        <v-text-field
          v-model="userStore.userSignUpData.phoneNumber"
          type="text"
          :disabled="!userStore.isEditingBrandInfo"
          class="border-radius-8"
          placeholder="+84 930-298135"
          solo
          outlined
          dense
          flat
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="4">
        <div class="font-weight-semibold mb-2">Địa chỉ</div>
        <v-text-field
          v-model="userStore.userSignUpData.address"
          type="text"
          :disabled="!userStore.isEditingBrandInfo"
          class="border-radius-8"
          placeholder="Phùng thanh độ"
          solo
          outlined
          dense
          flat
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { mapStores } from "pinia";
export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      items: ["Tin tức", "Giới thiệu"],
    };
  },
  methods: {
    onFileChanged(data) {
      this.userStore.file = data;
      console.log("file", data);
    },
  },
};
</script>
