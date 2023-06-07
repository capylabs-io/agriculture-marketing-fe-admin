<template>
  <v-form v-model="documentStore.documentForm">
    <v-row class="">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Tiêu đề</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.title"
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
        <div class="font-weight-semibold mb-2">Số ký hiệu</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.numberOf"
          placeholder="Nhập ký hiệu bài viết"
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
        <div class="font-weight-semibold mb-2">Ngày ban hành</div>
      </v-col>
      <v-col cols="12" md="7">
        <RangeDatePicker
          @change="documentStore.changeDocumentDuration"
          :isEditing="isEditing"
          :chosenDate="[documentStore.document.issueDate]"
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Loại văn bản</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          v-model="documentStore.document.documentCategory"
          class="border-radius-8"
          :rules="[$rules.required]"
          :items="documentStore.categories"
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
        <div class="font-weight-semibold mb-2">Lĩnh vực</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.field"
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
        <div class="font-weight-semibold mb-2">Người ký</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.signatory"
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
        <div class="font-weight-semibold mb-2">Cơ quan ban hành</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.issuer"
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
        <div class="font-weight-semibold mb-2">Cơ quan tiếp nhận</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          class="border-radius-8"
          v-model="documentStore.document.receiver"
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
        <div class="">
          <div class="font-weight-semibold">File</div>
          <div class="mb-2 text-sm neutral80--text">
            Hỗ trợ file đuôi .docx, .pdf, .exe
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          v-model="documentStore.file"
          placeholder="Chọn tệp"
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
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { documentStore } from "../store/document-store";
import { mapStores } from "pinia";
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    RangeDatePicker: () => import("@/components/RangeDatePicker.vue"),
  },
  computed: {
    ...mapStores(documentStore),
    getProductImage() {
      if (
        this.documentStore.document &&
        this.documentStore.document.images &&
        !this.documentStore.file
      )
        return this.documentStore.document.images;
      if (!this.documentStore.file) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.documentStore.file);
    },
  },
  methods: {
    onFileChanged(data) {
      this.documentStore.file = data;
      if (this.documentStore.file) {
        this.documentStore.uploadFile();
      }
    },
  },
};
</script>
