<template>
  <div>
    <NavBar />
    <ProductList />
  </div>
</template>
<script>
import NavBar from "./pieces/NavBar";
import ProductList from "./pieces/ProductList";
export default {
  components: {
    NavBar,
    ProductList,
  },
};
</script>