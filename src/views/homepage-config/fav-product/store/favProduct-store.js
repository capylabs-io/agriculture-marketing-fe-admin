import { defineStore } from "pinia";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";
import { Common, Product, ProductCategory } from "@/plugins/api";

export const favProductStore = defineStore("favProduct", {
  state: () => ({
    favProductPage: 1,
    favProductsPerPage: 10,
    favProductCreateDialog: false,
    categories: [],
    favProduct: {},
    favProducts: [],
    favProductThumbnail: null,
    favProductCertification: null,
    favProductAccreditation: null,
    favProductForm: false,
    searchKey: "",
  }),
  getters: {
    slicedfavProducts() {
      if (!this.favProducts || this.favProducts.length == 0) return [];
      return this.filteredfavProducts.slice(
        (this.favProductPage - 1) * this.favProductsPerPage,
        this.favProductPage * this.favProductsPerPage
      );
    },
    filteredfavProducts() {
      if (!this.favProducts || this.favProducts.length == 0) return [];
      let filtered = this.favProducts;
      if (this.searchKey)
        filtered = filtered.filter(
          (favProduct) =>
            favProduct.name
              .toLowerCase()
              .includes(this.searchKey.trim().toLowerCase()) ||
            favProduct.code
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
    totalfavProductPage() {
      if (!this.favProducts || this.filteredfavProducts.length == 0) return 1;
      if (this.filteredfavProducts.length % this.favProductsPerPage == 0)
        return this.filteredfavProducts.length / this.favProductsPerPage;
      else
        return (
          Math.floor(this.filteredfavProducts.length / this.favProductsPerPage) + 1
        );
    },
    totalfavProduct() {
      if (!this.favProducts || this.filteredfavProducts.length == 0) return 1;
      return this.filteredfavProducts.length;
    },
  },
  actions: {
    async fetchfavProducts() {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error(
            "Error occurred when fetching favProducts!",
            "Please try again later!"
          );
          return;
        }
        const favProducts = get(res, "data.data", []);
        if (!favProducts && favProducts.length == 0) return;
        const mappedfavProducts = favProducts.map((favProduct) => {
          return {
            id: favProduct.id,
            ...favProduct.attributes,
            favProductCategory: {
              id: get(favProduct, "attributes.favProductCategory.data.id", -1),
              ...get(favProduct, "attributes.favProductCategory.data.attributes", {}),
            },
            cooperative: {
              id: get(favProduct, "attributes.cooperative.data.id", -1),
              ...get(favProduct, "attributes.cooperative.data.attributes", {}),
            },
            artisan: {
              id: get(favProduct, "attributes.artisan.data.id", -1),
              ...get(favProduct, "attributes.artisan.data.attributes", {}),
            },
            store: {
              id: get(favProduct, "attributes.store.data.id", -1),
              ...get(favProduct, "attributes.store.data.attributes", {}),
            },
            area: {
              id: get(favProduct, "attributes.area.data.id", -1),
              ...get(favProduct, "attributes.area.data.attributes", {}),
            },
            author: get(favProduct, "attributes.user.data.attributes", {}),
          };
        });
        this.favProducts = mappedfavProducts;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await ProductCategory.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching favProduct categories!",
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
    async createfavProduct() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.favProductThumbnail),
          await this.uploadFile(this.favProductCertification),
          await this.uploadFile(this.favProductAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.favProduct,
          images: uploadedThumbnail ? uploadedThumbnail[0] : "",
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : "",
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : "",
        };

        const res = await Product.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Tạo sản phẩm mới thành công!");
        router.push("/favProduct");
      } catch (error) {
        alert.error("Create favProduct fail! Please try again later!");
      } finally {
        loading.hide();
      }
    },
    async updatefavProduct() {
      try {
        if (!this.favProduct) return;
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.favProductThumbnail),
          await this.uploadFile(this.favProductCertification),
          await this.uploadFile(this.favProductAccreditation),
        ];

        const [
          uploadedThumbnail,
          uploadedCertification,
          uploadedAccreditation,
        ] = await Promise.all(promises);
        let query = {
          ...this.favProduct,
          images: uploadedThumbnail
            ? uploadedThumbnail[0]
            : this.favProduct.images,
          certificationImages: uploadedCertification
            ? uploadedCertification[0]
            : this.favProduct.certificationImages,
          accreditationImages: uploadedAccreditation
            ? uploadedAccreditation[0]
            : this.favProduct.accreditationImages,
        };

        const res = await Product.update(this.favProduct.id, {
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.reset();
        alert.success("Cập nhật sản phẩm mới thành công!");
        router.push("/favProduct");
      } catch (error) {
        alert.error("Update favProduct fail! Please try again later!");
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
    async togglefavProduct(favProductId, isActive) {
      if (!favProductId) return;
      try {
        loading.show();
        const res = await Product.update(favProductId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`${isActive ? "Hiện" : "Ẩn"}  sản phẩm thành công!"`);
        await this.fetchfavProducts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deletefavProduct(favProductId) {
      if (!favProductId) return;
      try {
        loading.show();
        const res = await Product.remove(favProductId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Xóa sản phẩm thành công!");
        await this.fetchfavProducts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    reset() {
      this.favProduct = {};
      this.favProductAccreditation = null;
      this.favProductCertification = null;
      this.favProductThumbnail = null;
    },
    // async fetchVoucher() {
    //   const user = userStore();
    //   try {
    //     loading.show();
    //     const res = await Voucher.fetchVouchers();
    //     if (!res) {
    //       alert.error(`Error occurred! Please try again later!`);
    //       return;
    //     }
    //     this.voucherData = res.data;
    //     this.voucherDataId = this.voucherData.map((index) => index.id);
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //     alert.error(error);
    //   } finally {
    //     loading.hide();
    //   }
    // },
  },
});
/* eslint-enable */
