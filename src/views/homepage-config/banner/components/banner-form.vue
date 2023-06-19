<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="3">
        <v-file-input
          placeholder="Tải ảnh lên đây"
          prepend-inner-icon="mdi-tray-arrow-up"
          class="border-radius-8"
          accept="image/png, image/jpeg, image/bmp,image/webp"
          ref="myfile"
          prepend-icon=""
          :rules="[$rules.required]"
          :show-size="1000"
          clearable
          outlined
          solo
          dense
          flat
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          type="text"
          class="border-radius-8"
          placeholder="Đường dẫn tới trang web"
          :rules="[$rules.required]"
          solo
          outlined
          dense
          flat
          prepend-inner-icon="mdi-link-variant"
        />
      </v-col>
      <v-col cols="12" md="5" class="d-flex align-center">
        <div
          class="text-right full-width text-md font-weight-medium neutral60--text"
        >
          #{{ index }}
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-img :src="banner.imageUrl" class="border-radius-16"> </v-img>
    </v-row>
  </v-form>
</template>

<script>
// import { postStore } from "../stores/news-store";
// import { mapStores } from "pinia";
export default {
  components: {},
  data() {
    return {
      //Marked: For Text Editor
    };
  },
  props: {
    banner: {
      type: Object,
      default: () => null,
    },
    index: {
      type: String,
      default: () => null,
    },
  },
  computed: {
    // ...mapStores(postStore),
  },
  watch: {},
  methods: {
    onFileChanged(data) {
      this.postStore.file = data;
      if (this.postStore.file) {
        this.postStore.uploadFile();
      }
    },
  },
};
</script>
