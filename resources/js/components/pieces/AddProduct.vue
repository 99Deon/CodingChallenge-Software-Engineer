<template>
  <div style="width: 700px">
    <slot></slot>
    <form v-on:submit.prevent="submitFormProdut">
      <div class="alert" v-if="errors">
        <h1>Error !!</h1>
        <ul v-for="(erros, key) in errors" :key="key">
          <li>{{ erros }}</li>
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
        <input id="price" name="price" type="number" v-model="product.price" />
      </div>
      <div class="form-control">
        <label for="category">Category</label>
        <select id="category" name="category">
          <option value="google">Google</option>
        </select>
      </div>

      <div class="form-control">
        <h2>Product Description ?</h2>

        <textarea
          id="how-video"
          value="description"
          v-model="product.description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="product-image">Product Image</label>
        <input
          id="img-file"
          name="product-image"
          type="file"
          @change="update_images()"
        />
      </div>
      <div class="btn">
        <button>Add Product</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errors: null,
      product: {
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      },
    };
  },
  methods: {
    submitFormProdut() {
      alert("dd");
    },

    // Update image
    update_images() {
      // Empty the images so that we upload new ones
      const image = document.querySelector("#img-file");
      // Make sure the file input is not null
      if (!image.files) return;
      // Make sure the selected file size is greater than 0
      if (image.files[0]["size"] < 1) return;
      // Make sure the selected file is an image
      if (!RegExp(/image/i).test(image.files[0]["type"])) return;
      // The file is a valid image.
      const formData = new FormData();
      formData.append("image", image.files[0]);
      this.$store;
      // .dispatch("uploadFile", {
      //   path: "/api/update/image/profile",
      //   data: formData,
      //   related: "add-image",
      //   returned: true,
      // })
      this.product.image = formData;
      // .then((res) => {
      //   return res ? true : false;
      // });
    },
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