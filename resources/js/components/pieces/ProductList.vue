<template>
  <div>
    <button @click="AddProduct">Add Product</button>
    <h2>Product List</h2>
    <!-- Table of show products -->
    <table>
      <tr>
        <th>ID</th>
        <th>name</th>
        <th>description</th>
        <th>price</th>
        <th>category</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Pipsi</td>
        <td>this just test</td>
        <td>12</td>
        <td>liquid</td>
      </tr>
    </table>

    <!-- The Modal Of add product -->
    <div id="myModal" class="modal" v-if="modalDisply">
      <div class="model-content">
        <add-product>
          <span class="close" @click="modalDisply = !modalDisply">&times;</span>
        </add-product>
      </div>
    </div>
  </div>
</template>
<script>
import AddProduct from "./AddProduct.vue";
export default {
  data() {
    return {
      modalDisply: false,
    };
  },
  components: { AddProduct },
  methods: {
    AddProduct() {
      this.modalDisply = true;
    },
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