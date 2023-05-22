<template>
  <v-form v-model="productStore.productForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getProductImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">
          Hình ảnh sản phẩm <span class="red--text" v-if="!isEditing">*</span>
        </div>
        <v-file-input
          v-model="productStore.productThumbnail"
          placeholder="Chọn hình ảnh sản phẩm"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          prepend-icon=""
          accept="image/*"
          :show-size="1000"
          :rules="isEditing ? [] : [$rules.required]"
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
          v-model="productStore.product.name"
          type="text"
          class="border-radius-8"
          placeholder="Nhập tên sản phẩm"
          :rules="[$rules.required]"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Danh mục sản phẩm <span class="red--text">*</span>
        </div>
        <v-select
          :disabled="isEditing"
          class="border-radius-8"
          placeholder="Chọn danh mục sản phẩm"
          v-model="productStore.product.productCategory"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="productStore.categories"
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
          type="number"
          class="border-radius-8"
          placeholder="Nhập giá sản phẩm"
          suffix="vnđ"
          v-model="productStore.product.price"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Nguồn gốc Xuất xứ <span class="red--text">*</span>
        </div>
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Nhập nguồn gốc xuất xứ ví dụ Kiên Giang"
          v-model="productStore.product.origin"
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
          v-model="productStore.product.description"
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
        <div class="font-weight-semibold mb-2">Hướng dẫn sử dụng</div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn sử dụng"
          v-model="productStore.product.instruction"
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
          v-model="productStore.productCertification"
          placeholder="Chọn hình Giấy chứng nhận"
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
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getAccreditationImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">Giấy kiểm định</div>
        <v-file-input
          v-model="productStore.productAccreditation"
          placeholder="Chọn hình Giấy kiểm định"
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
import { productStore } from "../store/product-store";

export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(productStore),
    getProductImage() {
      if (
        this.productStore.product &&
        this.productStore.product.images &&
        !this.productStore.productThumbnail
      )
        return this.productStore.product.images;
      if (!this.productStore.productThumbnail)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.productStore.productThumbnail);
    },
    getCertificationImage() {
      if (
        this.productStore.product &&
        this.productStore.product.certificationImages &&
        !this.productStore.product.certificationImages
      )
        return this.productStore.product.certificationImages;
      if (!this.productStore.productCertification)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.productStore.productCertification);
    },
    getAccreditationImage() {
      if (
        this.productStore.product &&
        this.productStore.product.accreditationImages &&
        !this.productStore.product.accreditationImages
      )
        return this.productStore.product.accreditationImages;
      if (!this.productStore.productAccreditation)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.productStore.productAccreditation);
    },
  },
  methods: {},
};
</script>
