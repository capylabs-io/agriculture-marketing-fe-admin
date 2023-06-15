<template>
  <v-form v-model="agencyStore.agencyForm">
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
          v-model="agencyStore.thumbnail"
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
              :src="getagencyImage"
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
        <div class="font-weight-semibold mb-2">Tên Đại lý</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="agencyStore.agency.name"
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
          v-model="agencyStore.agency.storeCategory"
          :rules="[$rules.required]"
          :items="agencyStore.categories"
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
    <!-- <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Số/ký hiệu</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          v-model="agencyStore.agency.code"
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
    <v-divider class="mt-3"></v-divider> -->
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Kinh độ</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="agencyStore.agency.long"
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
          v-model="agencyStore.agency.lat"
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
          v-model="agencyStore.agency.taxCode"
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
          v-model="agencyStore.agency.businessCode"
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
          v-model="agencyStore.agency.address"
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
          v-model="agencyStore.agency.representative"
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
          v-model="agencyStore.agency.phone"
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
          v-model="agencyStore.agency.email"
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
        <div class="font-weight-semibold mb-2">Giới thiệu tổng quan</div>
      </v-col>
      <v-col cols="12" md="7">
        <vue-editor
          id="editor"
          v-model="agencyStore.agency.description"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
        <!-- <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập mô tả sản phẩm"
          v-model="productStore.product.description"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        /> -->
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
              :src="getagencyImage"
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
          v-model="agencyStore.certification"
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
          <v-col
            cols="12"
            md="4"
            v-for="(value, index) in getCertificationImage.quality"
            :key="index"
          >
            <v-img
              class="neutral20-border border-radius-16"
              :src="value"
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
import { agencyStore } from "../store/agency-store";
import { mapStores } from "pinia";
import { VueEditor } from "vue2-editor";

export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      htmlForEditor: "",
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "image"],
        ["clean"], // remove formatting button
      ],
    };
  },
  computed: {
    ...mapStores(agencyStore),
    getagencyImage() {
      if (
        this.agencyStore.agency &&
        this.agencyStore.agency.thumbnail &&
        !this.agencyStore.thumbnail
      )
        return this.agencyStore.agency.thumbnail;
      if (!this.agencyStore.thumbnail) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.agencyStore.thumbnail);
    },
    getCertificationImage() {
      if (
        this.agencyStore.agency &&
        this.agencyStore.agency.certification &&
        !this.agencyStore.certification
      )
        return this.agencyStore.agency.certification;
      if (!this.agencyStore.certification)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.agencyStore.certification);
    },
  },
  methods: {
    onFileChanged(data) {
      this.agencyStore.file = data;
      if (this.agencyStore.file) {
        this.agencyStore.uploadFile();
      }
    },
    //Marked: For Text Editor
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        const uploadedUrls = await this.postStore.uploadFile(file);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          this.$alert.error("Upload fail!");
          return;
        }
        Editor.insertEmbed(cursorLocation, "image", uploadedUrls[0]);
        resetUploader();
      } catch (error) {
        console.error("Error occurred! Error: " + error);
      }
    },
  },
};
</script>
