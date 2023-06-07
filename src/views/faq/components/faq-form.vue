<template>
  <v-form v-model="faqStore.faqForm">
    <v-row class="">
      <v-col cols="12" md="3">
        <div class="font-weight-semibold mb-2">Danh mục</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-select
          v-model="faqStore.faq.faqCategory"
          class="border-radius-8"
          :rules="[$rules.required]"
          :items="faqStore.categories"
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
        <div class="font-weight-semibold mb-2">Nội dung câu hỏi</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-textarea
          type="text"
          v-model="faqStore.faq.question"
          background-color="neutral10"
          class="border-radius-8"
          placeholder="Nội dung"
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
        <div class="font-weight-semibold mb-2">Nội dung trả lời</div>
      </v-col>
      <v-col cols="12" md="7">
        <v-textarea
          type="text"
          v-model="faqStore.faq.anwser"
          background-color="neutral10"
          class="border-radius-8"
          placeholder="Nội dung"
          :rules="[$rules.required]"
          auto-grow
          flat
          solo
          outlined
        />
      </v-col>
      <v-col cols="12" md="2"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { faqStore } from "../store/faq-store";
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
    ...mapStores(faqStore),
  },
  methods: {
    onFileChanged(data) {
      this.faqStore.file = data;
      if (this.faqStore.file) {
        this.faqStore.uploadFile();
      }
    },
  },
};
</script>
