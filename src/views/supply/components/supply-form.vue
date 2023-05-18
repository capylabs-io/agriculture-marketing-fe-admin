<template>
  <v-form v-model="supplyStore.supplyForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getSupplyImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">
          Hình ảnh sản phẩm <span class="red--text" v-if="!isEditing">*</span>
        </div>
        <v-file-input
          v-model="supplyStore.supplyThumbnail"
          placeholder="Chọn hình ảnh sản phẩm"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          prepend-icon=""
          :rules="isEditing ? [] : [$rules.required]"
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
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Tên sản phẩm <span class="red--text">*</span>
        </div>
        <v-text-field
          v-model="supplyStore.supply.name"
          type="text"
          class="border-radius-8"
          placeholder="Nhập tên sản phẩm"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Danh mục <span class="red--text">*</span>
        </div>
        <v-select
          v-model="supplyStore.supply.supplyCategory"
          class="border-radius-8"
          placeholder="Chọn danh mục vật tư"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="supplyStore.categories"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">Giá</div>
        <v-text-field
          v-model="supplyStore.supply.price"
          type="number"
          class="border-radius-8"
          placeholder="Nhập giá sản phẩm"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Xuất xứ <span class="red--text">*</span>
        </div>
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Nhập nguồn gốc xuất xứ"
          v-model="supplyStore.supply.origin"
          :rules="[$rules.required]"
          solo
          outlined
          dense
          flat
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="12">
        <div class="font-weight-semibold mb-2">
          Mô tả sản phẩm <span class="red--text">*</span>
        </div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập mô tả sản phẩm"
          v-model="supplyStore.supply.description"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="12">
        <div class="font-weight-semibold mb-2">
          Công dụng sản phẩm <span class="red--text">*</span>
        </div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập công dụng sản phẩm"
          v-model="supplyStore.supply.usage"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="12">
        <div class="font-weight-semibold mb-2">
          Hướng dẫn sử dụng <span class="red--text">*</span>
        </div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn sử dụng"
          v-model="supplyStore.supply.useInstruction"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getCertificationImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Giấy chứng nhận</div>
        <v-file-input
          placeholder="Chọn hình Giấy chứng nhận"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          prepend-icon=""
          v-model="supplyStore.supplyCertification"
          :show-size="1000"
          clearable
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getAccreditationImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Giấy kiểm định</div>
        <v-file-input
          v-model="supplyStore.supplyAccreditation"
          placeholder="Chọn hình giấy kiểm định"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
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
  </v-form>
</template>

<script>
import { mapStores } from "pinia";
import { supplyStore } from "../store/supply-store";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(supplyStore),
    getSupplyImage() {
      if (
        this.supplyStore.supply &&
        this.supplyStore.supply.images &&
        !this.supplyStore.supplyThumbnail
      )
        return this.supplyStore.supply.images;
      if (!this.supplyStore.supplyThumbnail)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.supplyStore.supplyThumbnail);
    },
    getCertificationImage() {
      if (
        this.supplyStore.supply &&
        this.supplyStore.supply.certificationImages &&
        !this.supplyStore.supply.certificationImages
      )
        return this.supplyStore.supply.certificationImages;
      if (!this.supplyStore.supplyCertification)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.supplyStore.supplyCertification);
    },
    getAccreditationImage() {
      if (
        this.supplyStore.supply &&
        this.supplyStore.supply.accreditationImages &&
        !this.supplyStore.supply.accreditationImages
      )
        return this.supplyStore.supply.accreditationImages;
      if (!this.supplyStore.supplyAccreditation)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.supplyStore.supplyAccreditation);
    },
  },
};
</script>
