<template>
  <v-form v-model="postStore.postForm">
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Danh mục</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          v-model="postStore.post.postCategory"
          class="border-radius-8"
          :rules="[$rules.required]"
          :items="postStore.categories"
          item-text="name"
          return-object
          @change="changeCategory($event)"
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
        <div class="font-weight-semibold mb-2">Tiêu đề</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-text-field
          type="text"
          v-model="postStore.post.title"
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
    <v-divider class="mt-3"></v-divider>
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Ảnh minh hoạ</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          placeholder="Chọn hình minh hoạ"
          prepend-inner-icon="mdi-paperclip"
          class="border-radius-8"
          v-model="postStore.file"
          accept="image/png, image/jpeg, image/bmp,image/webp"
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
              :src="getProductImage"
              max-height="192px"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-divider
      class="mt-3"
      v-if="
        videoPost ||
        imagePost ||
        postStore.post.videoContent ||
        postStore.post.imageContent
      "
    ></v-divider>
    <v-row class="mt-3" v-if="videoPost || postStore.post.videoContent">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Video bài viết</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-radio-group v-model="radioGroup" column>
          <v-radio label="bằng YouTube" value="1"> </v-radio>
          <v-text-field
            type="text"
            v-model="postStore.youtubeUrl"
            class="border-radius-8 mt-1"
            placeholder="Nhập link video"
            solo
            :disabled="radioGroup == 1 ? false : true"
            :background-color="radioGroup == 1 ? '' : 'neutral10'"
            outlined
            dense
            flat
          />
          <v-radio
            label="Tải liên từ máy tính"
            value="2"
            class="mt-2"
          ></v-radio>
          <v-file-input
            v-model="postStore.postFile"
            placeholder="Chọn video bài viết"
            :disabled="radioGroup == 2 ? false : true"
            :background-color="radioGroup == 2 ? '' : 'neutral10'"
            prepend-inner-icon="mdi-paperclip"
            class="border-radius-8 mt-1"
            prepend-icon=""
            :show-size="1000"
            clearable
            outlined
            solo
            dense
            flat
          />
        </v-radio-group>

        <v-row>
          <v-col cols="12" md="12">
            <div>Normal video:</div>
            <video width="100%" :src="getListPostVideo" controls>
              Your browser does not support the video tag.
            </video>
            <div>Youtube video:</div>
            <LazyYoutube maxWidth="100%" :src="getListPostVideo" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
    <v-row class="mt-3" v-if="imagePost || postStore.post.imageContent">
      <v-col cols="12" md="3">
        <div class="">
          <div class="font-weight-semibold">Ảnh bài viết</div>
          <div class="mb-2 text-sm neutral80--text">
            This will be displayed on your profile
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <v-file-input
          v-model="postStore.postFile"
          placeholder="Chọn Ảnh bài viết"
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
        <v-row v-if="postStore.post.imageContent">
          <v-col
            cols="12"
            md="4"
            v-for="(value, index) in getListPostImage"
            :key="index"
          >
            <v-img
              class="neutral20-border border-radius-16"
              :src="value"
              height="180px"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>

    <!-- <v-row class="mt-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Nội dung</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-textarea
          type="text"
          v-model="postStore.post.content"
          class="border-radius-8"
          placeholder="Nhập nội dung bài viết"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row> -->

    <v-divider class="mt-3"></v-divider>
    <v-row class="my-3">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Nội dung</div>
      </v-col>
      <v-col cols="12" md="7">
        <!-- Marked: For Text Editor -->
        <vue-editor
          id="editor"
          v-model="postStore.post.content"
          :editorToolbar="customToolbar"
          useCustomImageHandler
          @image-added="handleImageAdded"
        >
        </vue-editor>
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { postStore } from "../stores/news-store";
import { mapStores } from "pinia";
import { VueEditor } from "vue2-editor";
import { LazyYoutube } from "vue-lazytube";
export default {
  components: {
    VueEditor,
    LazyYoutube,
  },
  data() {
    return {
      //Marked: For Text Editor
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
      imagePost: false,
      videoPost: false,
      radioGroup: null,
    };
  },
  props: {
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(postStore),
    getProductImage() {
      if (
        this.postStore.post &&
        this.postStore.post.images &&
        !this.postStore.file
      )
        return this.postStore.post.images;
      if (!this.postStore.file) return require("@/assets/no-image.png");
      return URL.createObjectURL(this.postStore.file);
    },
    getListPostImage() {
      if (
        this.postStore.post &&
        this.postStore.post.imageContent &&
        !this.postStore.postFile
      )
        return this.postStore.post.imageContent;
      if (this.postStore.postFile) return require("@/assets/no-image.png");
      return this.postStore.postFile;
    },
    getListPostVideo() {
      if (
        this.postStore.post &&
        this.postStore.post.videoContent &&
        !this.postStore.postFile
      )
        return this.postStore.post.videoContent;
      if (!this.postStore.postFile) return "";
      return URL.createObjectURL(this.postStore.postFile);
    },
  },
  watch: {},
  methods: {
    onFileChanged(data) {
      this.postStore.file = data;
      if (this.postStore.file) {
        this.postStore.uploadFile();
      }
    },
    changeCategory(category) {
      if (!category) return;
      if (category.name == "Ảnh") {
        this.imagePost = true;
        this.videoPost = false;
      } else if (category.name == "Video") {
        this.videoPost = true;
        this.imagePost = false;
      } else {
        this.videoPost = false;
        this.imagePost = false;
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
