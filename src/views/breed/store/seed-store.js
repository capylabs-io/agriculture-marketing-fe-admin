import { defineStore } from "pinia";
import { Seed, Common, SeedCategory } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const seedStore = defineStore("seed", {
  state: () => ({
    seedPage: 1,
    seedsPerPage: 10,
    categories: [],
    seed: {},
    seeds: [],
    seedThumbnail: null,
    seedCertification: null,
    seedAccreditation: null,
    seedForm: false,
    searchKey: "",
  }),
  getters: {
    slicedSeeds() {
      if (!this.seeds || this.seeds.length == 0) return [];
      return this.filteredSeeds.slice(
        (this.seedPage - 1) * this.seedsPerPage,
        this.seedPage * this.seedsPerPage
      );
    },
    filteredSeeds() {
      if (!this.seeds || this.seeds.length == 0) return [];
      let filtered = this.seeds;
      if (this.searchKey)
        filtered = filtered.filter(
          (seed) =>
            seed.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            seed.code
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            seed.origin
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
    totalSeedPage() {
      if (!this.seeds || this.filteredSeeds.length == 0) return 1;
      if (this.filteredSeeds.length % this.seedsPerPage == 0)
        return this.filteredSeeds.length / this.seedsPerPage;
      else return Math.floor(this.filteredSeeds.length / this.seedsPerPage) + 1;
    },
    totalSeed() {
      if (!this.seeds || this.filteredSeeds.length == 0) return 1;
      return this.filteredSeeds.length;
    },
  },
  actions: {
    async fetchSeeds() {
      try {
        loading.show();
        const res = await Seed.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching seeds!",
            "Please try again later!"
          );
          return;
        }
        const seeds = get(res, "data.data", []);
        if (!seeds && seeds.length == 0) return;
        const mappedSeeds = seeds.map((seed) => {
          return {
            id: seed.id,
            ...seed.attributes,
            seedCategory: get(
              seed,
              "attributes.seedCategory.data.attributes",
              {}
            ),
            author: get(seed, "attributes.user.data.attributes", {}),
          };
        });
        this.seeds = mappedSeeds;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await SeedCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching seed categories!",
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
    async createSeed() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.seedThumbnail),
          await this.uploadFile(this.seedCertification),
          await this.uploadFile(this.seedAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.seed,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
        };

        const res = await Seed.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo Giống mới thành công!");
        router.push("/seed");
      } catch (error) {
        alert.error("Create seed fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updateSeed() {
      try {
        if (!this.seed) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.seedThumbnail),
          await this.uploadFile(this.seedCertification),
          await this.uploadFile(this.seedAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);

        let query = {
          ...this.seed,
          images: uploadedThumbnail ? uploadedThumbnail[0] : this.seed.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.seed.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.seed.accreditationImages,
        };

        const res = await Seed.update(this.seed.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật Giống thành công!");
        router.push("/seed");
      } catch (error) {
        alert.error("Create seed fail! Please try again later!");
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
    async toggleSeed(seedId, isActive) {
      if (!seedId) return;
      try {
        loading.show();
        const res = await Seed.update(seedId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(
          `${isActive ? "Enable" : "Disable"}  seed successfully!"`
        );
        await this.fetchSeeds();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deleteSeed(seedId) {
      if (!seedId) return;
      try {
        loading.show();
        const res = await Seed.remove(seedId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa Giống thành công!");
        await this.fetchSeeds();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.seed = {};
      this.seedAccreditation = null;
      this.seedCertification = null;
      this.seedThumbnail = null;
    },
  },
});
/* eslint-enable */
