import { defineStore } from "pinia";
import { Product, ProductCategory, Common } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash";
import router from "@/router";

export const productStore = defineStore("product", {
  state: () => ({
    productPage: 1,
    productsPerPage: 10,
    categories: [],
    product: {},
    products: [],
    productThumbnail: null,
    productCertification: null,
    productAccreditation: null,
    productForm: false,
    searchKey: "",
  }),
  getters: {
    slicedProducts() {
      if (!this.products || this.products.length == 0) return [];
      return this.filteredProducts.slice(
        (this.productPage - 1) * this.productsPerPage,
        this.productPage * this.productsPerPage
      );
    },
    filteredProducts() {
      if (!this.products || this.products.length == 0) return [];
      let filtered = this.products;
      if (this.searchKey)
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            product.code.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
            product.origin.toLowerCase().includes(this.searchKey.trim().toLowerCase())
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
    totalProductPage() {
      if (!this.products || this.filteredProducts.length == 0) return 1;
      if (this.filteredProducts.length % this.productsPerPage == 0)
        return this.filteredProducts.length / this.productsPerPage;
      else return Math.floor(this.filteredProducts.length / this.productsPerPage) + 1;
    },
    totalProduct() {
      if (!this.products || this.filteredProducts.length == 0) return 1;
      return this.filteredProducts.length;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        loading.show();
        const res = await Product.fetch({
          populate: "*",
        });
        if (!res) {
          alert.error("Error occurred when fetching products!", "Please try again later!");
          return;
        }
        const products = get(res, "data.data", []);
        if (!products && products.length == 0) return;
        const mappedProducts = products.map((product) => {
          return {
            id: product.id,
            ...product.attributes,
            productCategory: get(product, "attributes.productCategory.data.attributes", {}),
            author: get(product, "attributes.user.data.attributes", {}),
          };
        });
        this.products = mappedProducts;
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
          alert.error("Error occurred when fetching product categories!", "Please try again later!");
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
    async createProduct() {
      try {
        loading.show();
        //upload images
        let promises = [
          await this.uploadFile(this.productThumbnail),
          await this.uploadFile(this.productCertification),
          await this.uploadFile(this.productAccreditation),
        ];

        const [uploadedThumbnail, uploadedCertification, uploadedAccreditation] = await Promise.all(promises);
        let query = {
          ...this.product,
          images: uploadedThumbnail ? uploadedThumbnail[0].url : "",
          certificationImages: uploadedCertification ? uploadedCertification[0].url : "",
          accreditationImages: uploadedAccreditation ? uploadedAccreditation[0].url : "",
        };

        const res = await Product.create({
          data: query,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        console.log("res", res);
        alert.success("Create product successfully!");
        router.push("/product");
      } catch (error) {
        alert.error("Create product fail! Please try again later!");
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
    async toggleProduct(productId, isActive) {
      if (!productId) return;
      try {
        loading.show();
        const res = await Product.update(productId, {
          data: {
            status: isActive ? "publish" : "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success(`${isActive ? "Enable" : "Disable"}  product successfully!"`);
        await this.fetchProducts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async deleteProduct(productId) {
      if (!productId) return;
      try {
        loading.show();
        const res = await Product.remove(productId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Remove product successfully!");
        await this.fetchProducts();
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
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
