<template>
  <div style="width: 700px">
    <slot></slot>
    <form v-on:submit.prevent="submitFormProdut">
      <div v-if="alert" style="color: red">
        <ul>
          <li v-for="(item, index) in alert" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="form-control">
        <label for="product-name">Product Name</label>
        <input
          id="product-name"
          name="product-name"
          type="text"
          required
          v-model="product.name"
        />
      </div>
      <div class="form-control">
        <label for="price">Price</label>
        <input
          id="price"
          name="price"
          required
          type="number"
          v-model="product.price"
        />
      </div>
      <div class="form-control">
        <label for="category">Category</label>
        <select
          id="category"
          v-model="product.category"
          name="category"
          required
        >
          <option
            v-for="(item, index) in categories"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <h2>Product Description ?</h2>

        <textarea
          required
          id="how-video"
          value="description"
          v-model="product.description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="product-image">Product Image</label>
        <input required type="file" id="img-file" @change="uploadImage()" />
      </div>
      <div class="btn">
        <button>Add Product</button>
      </div>
    </form>
  </div>
</template>
<script>
//libs
import { mapState } from "vuex";
export default {
  data() {
    return {
      alert: null,
      product: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      },
      dt: "",
    };
  },
  computed: {
    ...mapState(["expected"]),
    categories() {
      return this.$store.getters.categories;
    },
  },
  watch: {
    expected() {
      //alert errors
      {
        let expected = this.$store.getters.expected("add-product");
        if (expected != undefined) {
          if (expected.status == "error") {
            this.alert = expected.result.subMessage;
          } else if (expected.status == "success") {
            this.alert = [expected.result.subMessage];

            this.$store.commit("FETCH_ADD_PRODUCT", expected.result.data);
          }
        }
      }
    },
  },
  methods: {
    //All request in create.
    init: function () {
      this.$store.dispatch("fetchData", {
        path: "/api/fetch/categories",
        mutation: "FETCH_CATEGORIES",
        related: "fetch-categories",
      });
    },
    //Add product.
    submitFormProdut: function () {
      this.dt.append("name", this.product.name);
      this.dt.append("price", this.product.price);
      this.dt.append("category", this.product.category);
      this.dt.append("description", this.product.description);

      this.$store.dispatch("postData", {
        path: "/api/add/product",
        data: this.dt,
        related: "add-product",
      });
    },

    // Update image
    uploadImage() {
      // Empty the images so that we upload new ones
      const image = document.querySelector("#img-file");
      // Make sure the file input is not null
      if (!image.files) return;
      // Make sure the selected file size is greater than 0
      if (image.files[0]["size"] < 1) return;
      // Make sure the selected file is an image
      if (!RegExp(/image/i).test(image.files[0]["type"])) return;
      // The file is a valid image.
      this.dt = new FormData();
      this.dt.append("image", image.files[0]);
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
form {
  max-width: 40rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type="checkbox"],
input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
.btn {
  text-align: end;
}
/* alert  */
.alert {
  color: red;
}
</style>