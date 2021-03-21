<template>
  <div>
    <!-- The Modal Of add product -->
    <div id="myModal" class="modal" v-if="modalDisply">
      <div class="model-content">
        <add-product>
          <span class="close" @click="modalDisply = !modalDisply">&times;</span>
        </add-product>
      </div>
    </div>
    <button @click="AddProduct">Add Product</button>

    <div class="flex-container">
      <div class="flex-item-left">
        <h2>Product List</h2>
      </div>
      <div class="flex-item-right">
        <label>filter by a category</label>
        <select
          id="category"
          name="category"
          v-model="category"
          required
          @change="filter()"
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
    </div>
    <!-- Table of show products -->
    <table>
      <tr>
        <th>ID</th>
        <th>name <button @click="sortName()">sort</button></th>
        <th>description</th>
        <th>price <button @click="sortPrice()">sort</button><span></span></th>
        <th>category</th>
      </tr>
      <tr v-for="(product, index) in products" :key="index">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category_id }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AddProduct from "./AddProduct.vue";
export default {
  components: { AddProduct },
  data() {
    return {
      modalDisply: false,
      category: null,
    };
  },
  computed: {
    ...mapState(["expected"]),
    products() {
      return this.$store.getters.products;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    //All request in create.
    init: function () {
      this.$store.dispatch("fetchData", {
        path: "/api/fetch/products",
        mutation: "FETCH_PRODUCTS",
        related: "fetch-products",
      });
      this.$store.dispatch("fetchData", {
        path: "/api/fetch/categories",
        mutation: "FETCH_CATEGORIES",
        related: "fetch-categories",
      });
    },
    // Desply modal
    AddProduct: function () {
      this.modalDisply = true;
    },
    // Sort element by name .
    sortName() {
      this.products.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison;
      });
    },
    // Sort by price
    sortPrice() {
      this.products.sort(function (a, b) {
        const priceA = a.price;
        const priceB = b.price;

        let comparison = 0;
        if (priceA > priceB) {
          comparison = 1;
        } else if (priceA < priceB) {
          comparison = -1;
        }
        return comparison;
      });
    },
    // Filter by category
    filter() {
      this.$store.dispatch("fetchData", {
        path: "/api/fetch/products/by/category",
        mutation: "FETCH_PRODUCTS",
        related: "fetch-products",
        data: this.category,
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
/* Modal start */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  top: 0;
  left: 0;
  height: 100%; /* Full height make screen balck opacity*/
  width: 100%; /* Full width make screen balck opacity*/
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(131, 79, 79, 0.4); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.model-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* The Close Button */
.close {
  color: #e0dddd;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>