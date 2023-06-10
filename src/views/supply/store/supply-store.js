import { defineStore } from "pinia";
import { Supply, Common, SupplyCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";
import { userStore } from "@/stores/userStore";

export const supplyStore = defineStore("supply", {
  state: () => ({
    supplyPage: 1,
    suppliesPerPage: 10,
    categories: [],
    supply: {},
    supplies: [],
    supplyThumbnail: null,
    supplyCertification: null,
    supplyAccreditation: null,
    supplyForm: false,
    searchKey: "",
  }),
  getters: {
    slicedSupplies() {
      if (!this.supplies || this.supplies.length == 0) return [];
      return this.filteredSupplies.slice(
        (this.supplyPage - 1) * this.suppliesPerPage,
        this.supplyPage * this.suppliesPerPage
      );
    },
    filteredSupplies() {
      if (!this.supplies || this.supplies.length == 0) return [];
      let filtered = this.supplies;
      if (this.searchKey)
        filtered = filtered.filter(
          (supply) =>
            supply.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            supply.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            supply.origin
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase())
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
    totalSupplyPage() {
      if (!this.supplies || this.filteredSupplies.length == 0) return 1;
      if (this.filteredSupplies.length % this.suppliesPerPage == 0)
        return this.filteredSupplies.length / this.suppliesPerPage;
      else
        return (
          Math.floor(this.filteredSupplies.length / this.suppliesPerPage) + 1
        );
    },
    totalSupply() {
      if (!this.supplies || this.filteredSupplies.length == 0) return 1;
      return this.filteredSupplies.length;
    },
  },
  actions: {
    async fetchSupplies() {
      try {
        loading.show();
        const res = await Supply.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching supplies!",
            "Please try again later!"
          );
          return;
        }
        const supplies = get(res, "data.data", []);
        if (!supplies && supplies.length == 0) return;
        const mappedSupplies = supplies.map((supply) => {
          return {
            id: supply.id,
            ...supply.attributes,
            supplyCategory: {
              id: get(supply, "attributes.supplyCategory.data.id", -1),
              ...get(supply, "attributes.supplyCategory.data.attributes", {}),
            },
            store: {
              id: get(supply, "attributes.store.data.id", -1),
              ...get(supply, "attributes.store.data.attributes", {}),
            },
            author: get(supply, "attributes.user.data.attributes", {}),
          };
        });
        this.supplies = mappedSupplies;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await SupplyCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching supply categories!",
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
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async createSupply() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.supplyThumbnail),
          await this.uploadFile(this.supplyCertification),
          await this.uploadFile(this.supplyAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.supply,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
          user: userStore().userData.id,
        };

        const res = await Supply.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Create supply successfully!");
        router.push("/supply");
      } catch (error) {
        alert.error("Create supply fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updateSupply() {
      try {
        if (!this.supply) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.supplyThumbnail),
          await this.uploadFile(this.supplyCertification),
          await this.uploadFile(this.supplyAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.supply,
          images: uploadedThumbnail ? uploadedThumbnail[0] : this.supply.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.supply.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.supply.accreditationImages,
        };

        const res = await Supply.update(this.supply.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Create supply successfully!");
        router.push("/supply");
      } catch (error) {
        alert.error("Create supply fail! Please try again later!");
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
        alert.success("Upload Image successfully!");
        return uploadedUrls;
      } catch (error) {
        alert.error("Error occurred!", error.message);
        return;
      } finally {
        loading.hide();
      }
    },
    async toggleSupply(supplyId, isActive) {
      if (!supplyId) return;
      try {
        loading.show();
        const res = await Supply.update(supplyId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(
          `${isActive ? "Enable" : "Disable"}  supply successfully!"`
        );
        await this.fetchSupplies();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deleteSupply(supplyId) {
      if (!supplyId) return;
      try {
        loading.show();
        const res = await Supply.remove(supplyId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Remove supply successfully!");
        await this.fetchSupplies();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.supply = {};
      this.supplyAccreditation = null;
      this.supplyCertification = null;
      this.supplyThumbnail = null;
    },
  },
});
/* eslint-enable */
