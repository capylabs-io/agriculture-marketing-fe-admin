<template>
  <v-form v-model="supplyStore.supplyForm">
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
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              class="neutral20-border border-radius-16"
              :src="getSupplyImage"
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Tên sản phẩm</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Số/ký hiệu vật tư</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          v-model="supplyStore.supply.code"
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
        <div class="font-weight-semibold mb-2">Mô tả sản phẩm</div>
      </v-col>
      <v-col cols="12" md="7">
        <!-- <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập mô tả sản phẩm"
          v-model="supplyStore.supply.description"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        /> -->

        <vue-editor
          id="editor"
          v-model="supplyStore.supply.description"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
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
          v-model="supplyStore.supply.origin"
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
          v-model="supplyStore.supply.price"
          type="number"
          class="border-radius-8"
          placeholder="Nhập giá sản phẩm"
          suffix="vnđ"
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
        <div class="font-weight-semibold mb-2">Công dụng</div>
      </v-col>
      <v-col cols="12" md="7">
        <vue-editor
          id="editor"
          v-model="supplyStore.supply.usage"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
        <!-- <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập công dụng sản phẩm"
          v-model="supplyStore.supply.usage"
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
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Hướng dẫn sử dụng</div>
      </v-col>
      <v-col cols="12" md="7">
        <vue-editor
          id="editor"
          v-model="supplyStore.supply.useInstruction"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
        <!-- <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn sử dụng"
          v-model="supplyStore.supply.useInstruction"
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
          v-model="supplyStore.supplyCertification"
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
          v-model="supplyStore.supply.store"
          class="border-radius-8"
          placeholder="Chọn Đại lý"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="storeCategory"
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
import { supplyStore } from "../store/supply-store";
import { VueEditor } from "vue2-editor";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
    storeCategory: {
      type: Array,
      default: () => [],
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
        !this.supplyStore.certificationImages
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
        !this.supplyStore.accreditationImages
      )
        return this.supplyStore.supply.accreditationImages;
      if (!this.supplyStore.supplyAccreditation)
        return require("@/assets/no-image.png");
      return URL.createObjectURL(this.supplyStore.supplyAccreditation);
    },
  },
  methods: {
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
