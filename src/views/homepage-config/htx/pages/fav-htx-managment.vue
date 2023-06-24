<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <CreateDialog />
    <div class="text-dp-md font-weight-semibold">Cấu hình trang chủ</div>
    <div class="d-flex align-center justify-space-between mt-6">
      <div class="d-flex text-xl font-weight-medium">
        Hợp tác xã
        <v-icon class="ml-2" color="black">mdi-help-circle-outline </v-icon>
      </div>
      <div class="d-flex">
        <v-btn
          class="white-bg neutral20-border text-none btn-text border-radius-8 py-5 mr-2"
          elevation="0"
          outlined
          v-if="isOrderChange"
          @click="updateOrderList"
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Cập nhật thứ tự</div>
        </v-btn>
        <v-btn
          class="white-bg neutral20-border text-none btn-text border-radius-8 py-5"
          elevation="0"
          outlined
          @click="favhtxStore.favhtxCreateDialog = true"
        >
          <v-icon small>mdi-plus</v-icon>
          <div class="ml-1">Thêm mới</div>
        </v-btn>
      </div>
    </div>

    <div class="border-radius-12 neutral20-border overflow-hidden mt-3">
      <v-data-table
        :headers="headers"
        :items="favhtxStore.favhtxs ? favhtxStore.favhtxs : ''"
        hide-default-footer
      >
        <template v-slot:body="props">
          <draggable
            v-model="favhtxStore.favhtxs"
            animation="150"
            :move="onMoveCallback"
            :clone="onCloneCallback"
            tag="tbody"
            class="list-group"
            ghost-class="ghost"
            chosen-class="chosen"
            drag-class="drag"
            @end="onDropCallback"
          >
            <dataTableRowHandler
              v-for="(item, index) in props.items"
              :key="index"
              :item="item"
              :headers="headers"
              handle=".handle"
            >
              <template v-slot:[`item.handle`]>
                <div class="text-center handle">
                  <v-btn icon>
                    <v-icon class="handle">mdi-menu</v-icon>
                  </v-btn>
                </div>
              </template>
              <template v-slot:[`item.id`]>
                <div class="text-center">
                  {{ index + 1 }}
                </div>
              </template>
              <template v-slot:[`item.thumbnail`]="{ item }">
                <v-img
                  class="table-img neutral20-border border-radius-8 mx-auto"
                  :src="getImageUrl(item.thumbnail)"
                ></v-img>
              </template>
              <template v-slot:[`item.publishedAt`]="{ item }">
                <div>
                  {{ item.createdAt | ddmmyyyyhhmmss }}
                </div>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-btn icon dense @click="onDeleteClicked(item.code)"
                    ><v-icon>mdi-delete-outline</v-icon></v-btn
                  >
                </div>
              </template>
            </dataTableRowHandler>
            <tr v-if="!favhtxStore.favhtxs.length > 0" class="text-center">
              <td colspan="12" :style="{ height: '400px' }">
                <v-img
                  class="mx-auto no-data-img"
                  :src="require('@/assets/no-data-config.png')"
                ></v-img>
                <div class="mt-4 text-md black--text">Chưa có dữ liệu</div>
              </td>
            </tr>
          </draggable>
        </template>
        <!-- <template v-slot:[`item.thumbnail`]="{ item }">
          <v-img
            class="table-img neutral20-border border-radius-8 mx-auto"
            :src="item.thumbnail"
          ></v-img>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex align-center justify-center">
            <v-btn icon dense @click="onDeleteClicked(item.id)"
              ><v-icon>mdi-delete-outline</v-icon></v-btn
            >
          </div>
        </template>-->
      </v-data-table>
    </div>
    <!-- <div class="d-flex justify-space-between align-center mt-6">
      <div class="d-flex align-center gap-8">
        Hiện~
        <v-select
          class="border-radius-8 items-per-page-field"
          :items="itemsPerPage"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-select>
        trên tổng số
        <v-text-field
          class="border-radius-8 max-item-field"
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
        :length="10"
      ></v-pagination>
    </div> -->
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { favhtxStore } from "../store/favhtx-store";
import draggable from "vuedraggable";
export default {
  computed: {
    ...mapStores(favhtxStore),
  },
  components: {
    CreateDialog: () => import("../dialogs/create-favhtx-dialog.vue"),
    dataTableRowHandler: () =>
      import("../components/data-table-row-handler.vue"),
    draggable,
  },
  data() {
    return {
      isOrderChange: false,
      itemsPerPage: [10, 20, 50],
      // items: [
      //   {
      //     thumbnail: require("@/assets/no-image.png"),
      //     name: "loading...",
      //     code: "loading...",
      //     publishedAt: "loading...",
      //   },

      //   {
      //     thumbnail: require("@/assets/no-image.png"),
      //     name: "loading...",
      //     code: "loading...",
      //     publishedAt: "loading...",
      //   },

      //   {
      //     thumbnail: require("@/assets/no-image.png"),
      //     name: "loading...",
      //     code: "loading...",
      //     publishedAt: "loading...",
      //   },

      //   {
      //     thumbnail: require("@/assets/no-image.png"),
      //     name: "loading...",
      //     code: "loading...",
      //     publishedAt: "loading...",
      //   },
      // ],
      headers: [
        {
          text: "kéo/thả thay đổi thứ tự",
          value: "handle",
          align: "center",
          sortable: false,
          width: "170",
        },
        {
          text: "Thứ tự hiển thị",
          value: "id",
          align: "center",
          sortable: true,
          width: "160",
        },
        {
          text: "Ảnh đại diện",
          value: "thumbnail",
          align: "center",
          sortable: false,
          width: "170",
        },
        {
          text: "Tên",
          value: "name",
          align: "start",
          width: "230",
        },
        {
          text: "Mã truy xuất",
          value: "code",
          align: "start",
          width: "150",
        },
        {
          text: "Ngày tạo",
          value: "publishedAt",
          align: "center",
          sortable: false,
          width: "150",
        },
        {
          text: "",
          value: "action",
          align: "center",
          sortable: false,
          width: "100",
        },
      ],
    };
  },
  async created() {
    await this.favhtxStore.fetchfavhtxCodes();
    await this.favhtxStore.fetchfavhtxs();
  },
  methods: {
    getImageUrl(url) {
      if (!url) return require("@/assets/no-image.png");
      return url;
    },
    onCloneCallback(item) {
      // Create a fresh copy of item
      const cloneMe = JSON.parse(JSON.stringify(item));
      console.log("clone");
      return cloneMe;
    },
    onMoveCallback(evt, originalEvent) {
      this.isOrderChange = true;
      const item = evt.draggedContext.element;
      const itemIdx = evt.draggedContext.futureIndex;
      console.log("onMoveCallback");
      console.log("itemIdx", itemIdx);
      console.log("originalEvent", originalEvent);

      if (item.locked) {
        return false;
      }

      return true;
    },
    onDeleteClicked(productCode) {
      this.favhtxStore.favhtxCodes = this.favhtxStore.favhtxCodes.filter(
        (p) => p !== productCode
      );
      this.$dialog.confirm({
        title: "Xác nhận xóa sản phẩm",
        topContent: "Bạn có chắc bạn muốn xóa Sản phẩm này không?",
        midContent:
          "<span class='error--text'>Sau khi xóa, bạn không thể quay ngược lại hành động này!</span>",
        done: async () => {
          await this.favhtxStore.updatefavhtxs();
        },
      });
    },
    async updateOrderList() {
      this.favhtxStore.favhtxCodes = this.favhtxStore.favhtxs.map(
        (p) => p.code
      );
      await this.favhtxStore.updatefavhtxs();
      this.isOrderChange = false;
    },
    onDropCallback(evt, originalEvent) {
      console.log("onDropCallback", evt);
      console.log("favhtxs", this.favhtxStore.favhtxs);
      console.log("onDropCallback", originalEvent);
    },
  },
};
</script>
<style lang="scss" scoped>
.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content) {
  background: #fff !important;
}
.no-data-img {
  height: 184.0830078125px;
  width: 143px;
}
.ghost {
  opacity: 1;
  background: var(--v-neutral10-base);
}
.chosen {
  opacity: 2;
  background: var(--v-neutral10-base);
}
.drag {
  opacity: 3;
  background: var(--v-neutral10-base);
}
</style>
