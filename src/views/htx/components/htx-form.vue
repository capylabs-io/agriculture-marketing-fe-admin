<template>
  <v-form v-model="htxStore.htxForm">
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
          v-model="htxStore.htx.thumbnail"
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
              :src="gethtxImage"
              max-height="130px"
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
        <div class="font-weight-semibold mb-2">Tên Đại lý</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="htxStore.htx.name"
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
        <div class="font-weight-semibold mb-2">Danh mục</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          class="border-radius-8"
          v-model="htxStore.htx.htxCategory"
          :rules="[$rules.required]"
          :items="htxStore.categories"
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
        <div class="font-weight-semibold mb-2">Kinh độ</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="htxStore.htx.long"
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
        <div class="font-weight-semibold mb-2">Vĩ độ</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="htxStore.htx.lat"
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
        <div class="font-weight-semibold mb-2">Mã số thuế</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="htxStore.htx.taxCode"
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
        <div class="font-weight-semibold mb-2">Mã số đăng kí kinh doanh</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="htxStore.htx.businessCode"
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
          v-model="htxStore.htx.address"
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
        <div class="font-weight-semibold mb-2">Tên người đại diện</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="htxStore.htx.representative"
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
        <div class="font-weight-semibold mb-2">Số điện thoại</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="htxStore.htx.phone"
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
          v-model="htxStore.htx.email"
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
              :src="gethtxImage"
              max-height="130px"
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
        <div class="">
          <div class="font-weight-semibold">Hình ảnh giấy chứng nhận</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          v-model="htxStore.htx.certification"
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
        <v-row v-if="isEditing">
          <v-col
            cols="12"
            md="4"
            v-for="(image, index) in getCertificationImage"
            :key="index"
          >
            <v-img
              class="neutral20-border border-radius-16"
              :src="image"
              max-height="130px"
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
import { htxStore } from "../store/htx-store";
import { mapStores } from "pinia";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},
  computed: {
    ...mapStores(htxStore),
    gethtxImage() {
      if (
        this.htxStore.htx &&
        this.htxStore.htx.thumbnail &&
        !this.htxStore.file
      )
        return this.htxStore.htx.thumbnail;
      if (!this.htxStore.file) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.htxStore.file);
    },
    getCertificationImage() {
      if (this.htxStore.htx && this.htxStore.htx.certification.quality)
        return this.htxStore.htx.certification.quality;
      if (!this.htxStore.certification.quality)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.htxStore.file);
    },
  },
  methods: {
    onFileChanged(data) {
      this.htxStore.file = data;
      if (this.htxStore.file) {
        this.htxStore.uploadFile();
      }
    },
  },
};
</script>
