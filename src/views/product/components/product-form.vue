<template>
  <v-form v-model="productStore.productForm">
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
        <v-row>
          <v-col cols="12" md="4">
            <v-img
              class="neutral20-border border-radius-16"
              :src="getProductImage"
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Tên sản phẩm</div>
      </v-col>
      <v-col cols="12" md="7">
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
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Mã truy xuất</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          v-model="productStore.product.code"
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
        <vue-editor
          id="editor"
          v-model="productStore.product.description"
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
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Giá</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          v-model="productStore.product.price"
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
        <div class="font-weight-semibold mb-2">Hướng dẫn sử dụng</div>
      </v-col>
      <v-col cols="12" md="7">
        <vue-editor
          id="editor"
          v-model="productStore.product.instruction"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
        <!-- <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn sử dụng"
          v-model="productStore.product.instruction"
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
        <div class="font-weight-semibold mb-2">Công dụng</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-textarea
          type="text"
          class="border-radius-8"
          placeholder="Nhập hướng dẫn sử dụng"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider> -->

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
          v-model="productStore.product.store"
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
          v-model="productStore.product.area"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="areaCategory"
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
          v-model="productStore.product.cooperative"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          :items="cooperativeCategory"
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
          v-model="productStore.product.artisan"
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
import { productStore } from "../store/product-store";
import { VueEditor } from "vue2-editor";
export default {
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
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
    storeCategory: {
      type: Array,
      default: () => [],
    },
    artisanCategory: {
      type: Array,
      default: () => [],
    },
    cooperativeCategory: {
      type: Array,
      default: () => [],
    },
    areaCategory: {
      type: Array,
      default: () => [],
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
        !this.productStore.productCertification
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
