<template>
  <v-form v-model="artisanStore.artisanForm">
    <v-row class="">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Ảnh đại diện</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          placeholder="Chọn ảnh"
          v-model="artisanStore.thumbnail"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          ref="myfile"
          prepend-icon=""
          :rules="isEditing ? [] : [$rules.required]"
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
              :src="getArtisanImage"
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
        <div class="font-weight-semibold mb-2">Họ và tên</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="artisanStore.artisan.name"
          class="border-radius-8"
          placeholder="Nhập tên"
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
        <div class="font-weight-semibold mb-2">Danh xưng</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          class="border-radius-8"
          v-model="artisanStore.artisan.artisanCategory"
          :rules="[$rules.required]"
          :items="artisanStore.categories"
          item-text="name"
          item-value="id"
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
        <div class="font-weight-semibold mb-2">Số CCCD/ Chứng minh thư</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="artisanStore.artisan.idNumber"
          class="border-radius-8"
          placeholder="Nhập tên"
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
    <!-- <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Ngày cấp</div>
      </v-col>
      <v-col cols="12" md="7">
        <RangeDatePicker
          :isEditing="isEditing"
          @change="artisanStore.changeArtisanDuration"
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider> -->
    <!-- 
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Nơi cấp</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Nhập tiêu đề bài viết"
          :rules="[$rules.required]"
          solo
          outlined
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider> -->
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Quê quán</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="artisanStore.artisan.origin"
          placeholder="Nhập tiêu đề bài viết"
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
        <div class="font-weight-semibold mb-2">Địa chỉ</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="artisanStore.artisan.address"
          placeholder="Nhập tiêu đề bài viết"
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
        <div class="font-weight-semibold mb-2">Số điện thoại</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="artisanStore.artisan.phone"
          placeholder="Nhập tên"
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
        <div class="font-weight-semibold mb-2">Email</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Nhập tên"
          v-model="artisanStore.artisan.email"
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
    <!-- <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Hình ảnh căn cước công dân</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          placeholder="Chọn ảnh"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          ref="myfile"
          prepend-icon=""
          :rules="isEditing ? [] : [$rules.required]"
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
              :src="getArtisanImage"
              max-height="192px"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider> -->
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Hình ảnh giấy chứng nhận</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          v-model="artisanStore.certification"
          placeholder="Chọn ảnh"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          ref="myfile"
          prepend-icon=""
          :rules="isEditing ? [] : [$rules.required]"
          :show-size="1000"
          clearable
          outlined
          solo
          dense
          flat
        />
        <!-- <v-row v-if="artisanStore.artisan.certification">
          <v-col
            cols="12"
            md="4"
            v-for="(image, index) in getCertificationImage"
            :key="index"
          >
            <v-img
              class="neutral20-border border-radius-16"
              :src="image"
              max-height="192px"
              cover
            ></v-img>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12" md="4" :src="getCertificationImage">
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
  </v-form>
</template>

<script>
import { artisanStore } from "../store/artisan-store";
import { mapStores } from "pinia";
import { rules } from "@/plugins/rules";

export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    // RangeDatePicker: () => import("@/components/RangeDatePicker.vue"),
  },
  data() {
    return {
      rules: rules,
    };
  },
  computed: {
    ...mapStores(artisanStore),
    getArtisanImage() {
      if (
        this.artisanStore.artisan &&
        this.artisanStore.artisan.thumbnail &&
        !this.artisanStore.thumbnail
      )
        return this.artisanStore.artisan.thumbnail;
      if (!this.artisanStore.thumbnail) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.artisanStore.thumbnail);
    },
    getCertificationImage() {
      if (
        this.artisanStore.artisan &&
        this.artisanStore.artisan.certification &&
        !this.artisanStore.certification
      )
        return this.artisanStore.artisan.certification;
      if (!this.artisanStore.certification)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.artisanStore.certification);
    },
  },
  methods: {
    onFileChanged(data) {
      this.artisanStore.file = data;
      if (this.artisanStore.file) {
        this.artisanStore.uploadFile();
      }
    },
  },
};
</script>
