<template>
  <v-form v-model="seedStore.seedForm">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          class="neutral20-border border-radius-16"
          :src="getSeedImage"
          max-height="192px"
          contain
        ></v-img>
        <div class="font-weight-semibold mt-4 mb-2">
          Hình ảnh sản phẩm <span class="red--text" v-if="!isEditing">*</span>
        </div>
        <v-file-input
          v-model="seedStore.seedThumbnail"
          placeholder="Chọn hình ảnh sản phẩm"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          prepend-icon=""
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
          v-model="seedStore.seed.name"
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
          v-model="seedStore.seed.seedlingCategory"
          class="border-radius-8"
          placeholder="Chọn danh mục giống"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="seedStore.categories"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="6">
        <div class="font-weight-semibold mb-2">
          Giá <span class="red--text">*</span>
        </div>
        <v-text-field
          v-model="seedStore.seed.price"
          type="number"
          class="border-radius-8"
          placeholder="Nhập giá sản phẩm"
          suffix="vnđ"
          :rules="[$rules.required]"
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
          v-model="seedStore.seed.origin"
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
          Mô tả giống <span class="red--text">*</span>
        </div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập mô tả giống"
          v-model="seedStore.seed.description"
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
        <div class="font-weight-semibold mb-2">Hướng dẫn chăm sóc</div>
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn chăm sóc"
          v-model="seedStore.seed.careInstruction"
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
          v-model="seedStore.seedCertification"
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
          v-model="seedStore.seedAccreditation"
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
import { seedStore } from "../store/seed-store";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      items: ["Tin tức", "Giới thiệu"],
    };
  },
  computed: {
    ...mapStores(seedStore),
    getSeedImage() {
      if (
        this.seedStore.seed &&
        this.seedStore.seed.images &&
        !this.seedStore.seedThumbnail
      )
        return this.seedStore.seed.images;
      if (!this.seedStore.seedThumbnail)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.seedStore.seedThumbnail);
    },
    getCertificationImage() {
      if (
        this.seedStore.seed &&
        this.seedStore.seed.certificationImages &&
        !this.seedStore.seed.certificationImages
      )
        return this.seedStore.seed.certificationImages;
      if (!this.seedStore.seedCertification)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.seedStore.seedCertification);
    },
    getAccreditationImage() {
      if (
        this.seedStore.seed &&
        this.seedStore.seed.accreditationImages &&
        !this.seedStore.seed.accreditationImages
      )
        return this.seedStore.seed.accreditationImages;
      if (!this.seedStore.seedAccreditation)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.seedStore.seedAccreditation);
    },
  },
};
</script>
