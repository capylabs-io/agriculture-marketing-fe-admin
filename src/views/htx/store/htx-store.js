import { defineStore } from "pinia";
import { Cooperative, CooperativeCategory, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const htxStore = defineStore("htx", {
  state: () => ({
    htxPage: 1,
    htxsPerPage: 10,
    categories: [],
    htx: {},
    htxs: [],
    htxThumbnail: null,
    htxCertification: null,
    htxAccreditation: null,
    htxForm: false,
    searchKey: "",
    file: null,
    thumbnail: null,
    certification: null,
    description: "",
  }),
  getters: {
    slicedhtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      return this.filteredhtxs.slice(
        (this.htxPage - 1) * this.htxsPerPage,
        this.htxPage * this.htxsPerPage
      );
    },
    filteredhtxs() {
      if (!this.htxs || this.htxs.length == 0) return [];
      let filtered = this.htxs;
      if (this.searchKey)
        filtered = filtered.filter(
          (htx) =>
            htx.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            htx.code.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      return filtered;
    },
    // sortedCampaigns() {
    //   if (!this.voucherData || this.voucherData.length == 0) return [];
    //   let sortedCampaigns = this.voucherData;
    //   if (!this.sortBy) return sortedCampaigns;
    //   switch (this.sortBy) {
    //     default:
    //     case "asc":
    //       sortedCampaigns.sort((a, b) => a.title.localeCompare(b.title));
    //       break;
    //     case "desc":
    //       sortedCampaigns.sort((a, b) => b.title.localeCompare(a.title));
    //       break;
    //     case "newest":
    //       sortedCampaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //       break;
    //     case "oldest":
    //       sortedCampaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    //       break;
    //     case "priceUp":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => a.price - b.price);
    //       break;
    //     case "priceDown":
    //       sortedCampaigns
    //         // .filter((voucher) => voucher.price)
    //         .sort((a, b) => b.price - a.price);
    //       break;
    //   }
    //   return sortedCampaigns;
    // },
    totalhtxPage() {
      if (!this.htxs || this.filteredhtxs.length == 0) return 1;
      if (this.filteredhtxs.length % this.htxsPerPage == 0)
        return this.filteredhtxs.length / this.htxsPerPage;
      else return Math.floor(this.filteredhtxs.length / this.htxsPerPage) + 1;
    },
    totalhtx() {
      if (!this.htxs || this.filteredhtxs.length == 0) return 1;
      return this.filteredhtxs.length;
    },
  },
  actions: {
    async fetchhtxs() {
      try {
        loading.show();
        const res = await Cooperative.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching htxs!",
            "Please try again later!"
          );
          return;
        }
        const htxs = get(res, "data.data", []);
        if (!htxs && htxs.length == 0) return;
        const mappedHtxs = htxs.map((htx) => {
          return {
            id: htx.id,
            ...htx.attributes,
            cooperativeCategory: {
              id: get(htx, "attributes.cooperativeCategory.data.id", -1),
              ...get(htx, "attributes.cooperativeCategory.data.attributes", {}),
            },
          };
        });

        this.htxs = mappedHtxs;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await CooperativeCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching htx categories!",
            "Please try again later!"
          );
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
          };
        });
        this.categories = mappedCategories;
        this.categoryDictionary = Object.fromEntries(
          this.categories.map((x) => [x.id, x.name])
        );
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async createhtx() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.thumbnail),
          await this.uploadFile(this.certification),
        ];

        const [uploadedThumbnail, uploadedCertification] = await Promise.all(
          promises
        );

        let query = {
          ...this.htx,
          thumbnail: uploadedThumbnail ? uploadedThumbnail[0] : "",
          metadata: { description: this.htx.metadata.description },
          certification: {
            quality: uploadedCertification ? uploadedCertification : [],
          },
        };

        const res = await Cooperative.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo  mới thành công!");
        router.push("/htx");
      } catch (error) {
        alert.error("Create htx fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updatehtx() {
      try {
        if (!this.htx) return;
        loading.show();
        let promises = [
          await this.uploadFile(this.thumbnail),
          await this.uploadFile(this.certification),
        ];

        const [uploadedThumbnail, uploadedCertification] = await Promise.all(
          promises
        );

        let query = {
          ...this.htx,
          thumbnail: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.htx.thumbnail,
          certification: {
            quality: uploadedCertification
              ? uploadedCertification
              : this.htx.certification.quality,
          },
        };

        const res = await Cooperative.update(this.htx.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật thành công!");
        router.push("/htx");
      } catch (error) {
        alert.error("Create htx fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async uploadFile(file) {
      try {
        if (!file) return;

        loading.show();
        const formData = new FormData();
        formData.append("files", file);

        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload ảnh thành công!");
        return uploadedUrls;
      } catch (error) {
        alert.error("Error occurred!", error.message);
        return;
      } finally {
        loading.hide();
      }
    },

    async deletehtx(htxId) {
      if (!htxId) return;
      try {
        loading.show();
        const res = await Cooperative.remove(htxId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa  thành công!");
        await this.fetchhtxs();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.htx = {};
      this.htxAccreditation = null;
      this.htxCertification = null;
      this.htxThumbnail = null;
      this.file = null;
      this.thumbnail = null;
      this.certification = null;
    },
  },
});
/* eslint-enable */
