<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDate"
        background-color="white"
        append-icon="mdi-calendar"
        class="border-radius-8"
        readonly
        outlined
        hide-details
        dense
        placeholder="Chọn  thời gian"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      formatting
      no-title
      scrollable
      color="primary"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Hủy </v-btn>
      <v-btn text color="primary" @click="dateChange"> Xong </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { mapStores } from "pinia";
import { documentStore } from "@/views/document/store/document-store";
import moment from "moment";
export default {
  props: {
    chosenDate: {
      type: String,
      default: null,
    },
    isEditing: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapStores(documentStore),
    formattedDate() {
      if (!this.date || this.date.length == 0) return;
      return moment.utc(this.date).format("DD/MM/YYYY");
    },
  },
  data: () => ({
    date: [],
    menu: false,
  }),
  watch: {
    chosenDate: {
      handler(currentDate) {
        if (!currentDate || currentDate.length == 0) return;
        (this.date = moment(currentDate).toISOString().substring(0, 10)),
          console.log("date", this.date);
      },
      immediate: true,
    },
  },
  methods: {
    dateChange() {
      this.$refs.menu.save(this.date);
      this.$emit("change", [
        moment.utc(this.date, "YYYY-MM-DD").toISOString().substring(0, 10),
      ]);
      this.menu = false;
    },
  },
};
</script>
