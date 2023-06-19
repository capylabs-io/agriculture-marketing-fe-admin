<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <DetailDrawer />

    <div class="text-dp-md font-weight-semibold">Hòm thư, liên hệ</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <v-text-field
        v-model="contactStore.searchKey"
        class="search-field border-radius-8"
        placeholder="Tìm kiếm"
        prepend-inner-icon="mdi-magnify"
        flat
        solo
        outlined
        dense
        hide-details
      ></v-text-field>
      <!-- <v-btn
        class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
        elevation="0"
        to="/create-contact"
        outlined
      >
        <v-icon small>mdi-plus</v-icon>
        <div class="ml-1">Thêm giống</div>
      </v-btn> -->
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <!-- @click:row="onRowClicked($event)" -->
      <v-data-table
        :headers="headers"
        :items="contactStore.slicedcontacts"
        :items-per-page="contactStore.contactsPerPage"
        hide-default-footer
      >
        <template v-slot:item="props">
          <tr
            :class="
              props.item.data.status == 'unChecked'
                ? 'active font-weight-semibold'
                : ''
            "
            @click="onRowClicked(props.item)"
          >
            <td class="text-center">{{ props.item.name }}</td>
            <td class="text-center">{{ props.item.email }}</td>
            <td class="text-center">{{ props.item.title }}</td>
            <td class="text-center">{{ props.item.createdAt }}</td>
            <td class="text-center"></td>
          </tr>
        </template>
        <!-- <template v-slot:[`item.id`]="{ item }">
          <div class="d-flex flex-column align-center">
            <v-checkbox :key="item.id"></v-checkbox>
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template> -->
      </v-data-table>
    </div>

    <div class="d-flex justify-space-between align-center mt-6">
      <div class="d-flex align-center gap-8">
        Hiện
        <v-select
          class="border-radius-8 items-per-page-field"
          :items="itemsPerPage"
          v-model="contactStore.contactsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
          :value="contactStore.totalcontact"
          flat
          solo
          outlined
          dense
          hide-details
          readonly
        ></v-text-field>
        sản phẩm
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        color="primary"
        :length="contactStore.totalcontactPage"
        v-model="contactStore.contactPage"
      ></v-pagination>
    </div>
  </div>
</template>
ontact

<script>
import { mapStores } from "pinia";
import { contactStore } from "../store/contact-store";
import router from "@/router";
export default {
  components: {
    DetailDrawer: () => import("../components/faq-detail-drawer.vue"),
  },
  computed: {
    ...mapStores(contactStore),
  },
  data() {
    return {
      items: [
        {
          thumbnail: require("@/assets/components/landing/image-2.webp"),
          name: "Giống cây Bonsai",
          code: "NSHL-132219",
          publishedAt: "19/04/2023",
          author: "Phùng Thanh Độ",
          qrcode: require("@/assets/components/qrcode-example.png"),
        },
      ],
      itemsPerPage: [10, 50, 100],
      headers: [
        // {
        //   text: "",
        //   value: "id",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: "Người gửi",
          value: "name",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },

        {
          text: "Tiêu đề",
          value: "title",
          align: "center",
          sortable: false,
        },
        {
          text: "Ngày gửi",
          value: "createdAt",
          align: "center",
          sortable: false,
        },
        {
          text: "Hành động",
          value: "action",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.contactStore.fetchContacts();
  },
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
    onOpenClicked(code) {
      const link = process.env.VUE_APP_USER_PAGE + "contacts/" + code;
      window.open(link);
    },
    onRowClicked(item) {
      this.contactStore.contact = item;
      if (item.data.status == "unChecked") {
        this.contactStore.updateContactStatus();
      }
      this.contactStore.drawerDetail = true;
      this.contactStore.contact.contactCategory = item.contactCategory.id;
    },
    onEditClicked(item) {
      this.contactStore.contact = item;
      this.contactStore.contact.contactCategory = item.contactCategory.id;
      router.push("/edit-contact");
    },
    onDeleteClicked(contactId) {
      this.$dialog.confirm({
        title: "Xác nhận xóa Giống",
        topContent: "Bạn có chắc bạn muốn xóa Giống này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.contactStore.deletecontact(contactId);
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.active {
  background: linear-gradient(var(--v-neutral10-base)),
    linear-gradient(var(--v-neutral20-base));
}
</style>
