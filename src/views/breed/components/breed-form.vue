<template>
  <v-form v-model="seedStore.seedForm">
    <v-row>
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Ảnh sản phẩm</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
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
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              class="neutral20-border border-radius-16"
              :src="getSeedImage"
              max-height="192px"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Danh mục</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          :disabled="isEditing"
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Tên sản phẩm</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Mô tả giống</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Xuất xứ</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Giá</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Hướng dẫn chăm sóc</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>

    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Hình ảnh chứng nhận</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
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
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              class="neutral20-border border-radius-16"
              :src="getCertificationImage"
              max-height="192px"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Thuộc Đại lý</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          :disabled="isEditing"
          class="border-radius-8"
          placeholder="Chọn Đại lý"
          v-model="seedStore.seed.store"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="agencyCategory"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Thuộc Vùng sản xuất</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          :disabled="isEditing"
          class="border-radius-8"
          placeholder="Chọn Vùng sản xuất"
          v-model="seedStore.seed.area"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="regionCategory"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Thuộc Hợp tác xã</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          :disabled="isEditing"
          class="border-radius-8"
          placeholder="Chọn Hợp tác xã"
          v-model="seedStore.seed.cooperative"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="htxCategory"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Thuộc Nghệ nhân</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          :disabled="isEditing"
          class="border-radius-8"
          placeholder="Chọn Nghệ nhân"
          v-model="seedStore.seed.artisan"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="artisanCategory"
          flat
          solo
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
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
    agencyCategory: {
      type: Array,
      default: () => [],
    },
    artisanCategory: {
      type: Array,
      default: () => [],
    },
    htxCategory: {
      type: Array,
      default: () => [],
    },
    regionCategory: {
      type: Array,
      default: () => [],
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
