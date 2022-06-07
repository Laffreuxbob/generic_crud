<template>
  <div className="container" style="float: left">

    <label for="searchbar">Search :
      <input type="text" id="searchbar" name="searchbar" v-model="search"> {{ search }}
    </label>
    <span> LLLLLL {{ updated_product }} LLLLLLL</span>

    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Brand</th>
        <th scope="col">Model</th>
        <th scope="col">Price</th>
      </tr>
      </thead>
      <tbody>
            <SingleItem v-for="product in products"
                        v-bind:key="product.id"
                        v-show="search_method(product)"
                        @single_delete="single_delete"
                        :product='product'/>
      </tbody>
    </table>
  </div>

  <!--  <CartVue/>-->

</template>

<script>

import SingleItem from "@/components/Item";

export default {
  name: 'ItemList',
  components: {
    SingleItem
  },
  data() {
    return {
      products: [],
      search: '',
      updated_product: {}
    }
  },
  mounted() {
    fetch("http://127.0.0.117:11717/item")
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        });

  },
  methods: {
    debug(obj) {
      console.log(obj)
    },
    search_method(obj){
      return obj.brand.includes(this.search) || obj.model.includes(this.search)
    },
    single_delete(obj) {
      this.products = this.products.reduce((p,c) => (c.id !==  obj.id && p.push(c),p),[])
    },
    single_update(obj) {
      this.updated_product = obj
    }
  }
}
</script>

<style scoped>
 button { margin-left: 5%}
</style>