import { defineStore } from "pinia";
import { Artisan, ArtisanCategory, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const artisanStore = defineStore("artisan", {
  state: () => ({
    artisanPage: 1,
    artisansPerPage: 10,
    categories: [],
    artisan: {},
    artisans: [],
    artisanThumbnail: null,
    artisanCertification: null,
    artisanAccreditation: null,
    artisanForm: false,
    searchKey: "",
  }),
  getters: {
    slicedartisans() {
      if (!this.artisans || this.artisans.length == 0) return [];
      return this.filteredartisans.slice(
        (this.artisanPage - 1) * this.artisansPerPage,
        this.artisanPage * this.artisansPerPage
      );
    },
    filteredartisans() {
      if (!this.artisans || this.artisans.length == 0) return [];
      let filtered = this.artisans;
      if (this.searchKey)
        filtered = filtered.filter(
          (artisan) =>
            artisan.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            artisan.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            artisan.origin
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
    totalartisanPage() {
      if (!this.artisans || this.filteredartisans.length == 0) return 1;
      if (this.filteredartisans.length % this.artisansPerPage == 0)
        return this.filteredartisans.length / this.artisansPerPage;
      else
        return (
          Math.floor(this.filteredartisans.length / this.artisansPerPage) + 1
        );
    },
    totalartisan() {
      if (!this.artisans || this.filteredartisans.length == 0) return 1;
      return this.filteredartisans.length;
    },
  },
  actions: {
    async fetchArtisans() {
      try {
        loading.show();
        const res = await Artisan.fetch({
          sort: "updatedAt:desc",
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching artisans!",
            "Please try again later!"
          );
          return;
        }
        const artisans = get(res, "data.data", []);
        if (!artisans && artisans.length == 0) return;
        const mappedArtisans = artisans.map((artisan) => {
          return {
            id: artisan.id,
            ...artisan.attributes,
            artisanCategory: {
              id: get(artisan, "attributes.artisanCategory.data.id", -1),
              ...get(artisan, "attributes.artisanCategory.data.attributes", {}),
            },
          };
        });

        this.artisans = mappedArtisans;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await ArtisanCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching artisan categories!",
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
    async createartisan() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.artisanThumbnail),
          await this.uploadFile(this.artisanCertification),
          await this.uploadFile(this.artisanAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.artisan,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
        };

        const res = await Artisan.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo Giống mới thành công!");
        router.push("/artisan");
      } catch (error) {
        alert.error("Create artisan fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updateartisan() {
      try {
        if (!this.artisan) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.artisanThumbnail),
          await this.uploadFile(this.artisanCertification),
          await this.uploadFile(this.artisanAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.artisan,
          images: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.artisan.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.artisan.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.artisan.accreditationImages,
        };

        const res = await Artisan.update(this.artisan.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật Giống thành công!");
        router.push("/artisan");
      } catch (error) {
        alert.error("Create artisan fail! Please try again later!");
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
    async toggleartisan(artisanId, isActive) {
      if (!artisanId) return;
      try {
        loading.show();
        const res = await Artisan.update(artisanId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(
          `${isActive ? "Enable" : "Disable"}  artisan successfully!"`
        );
        await this.fetchartisans();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deleteartisan(artisanId) {
      if (!artisanId) return;
      try {
        loading.show();
        const res = await Artisan.remove(artisanId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa Giống thành công!");
        await this.fetchartisans();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.artisan = {};
      this.artisanAccreditation = null;
      this.artisanCertification = null;
      this.artisanThumbnail = null;
    },
  },
});
/* eslint-enable */
