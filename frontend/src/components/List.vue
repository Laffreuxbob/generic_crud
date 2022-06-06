<template>
  <div className="container" style="float: left">

    <label for="searchbar">Search :
      <input type="text" id="searchbar" name="searchbar" v-model="search">
    </label>

    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Brand</th>
        <th scope="col">Model</th>
        <th scope="col">Price</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="product in products" v-bind:key="product.id" v-bind:id="product.id" v-show="search_method(product)">

            <td>
              {{ product.brand }}
            </td>
            <td>
              {{ product.model }}
            </td>
            <td>
              {{ product.price }} €
            </td>
            <td>
              <button v-on:click="update_item(product)"> Update </button>
              <button v-on:click="delete_item(product)"> Delete </button>
            </td>
          </tr>
      </tbody>
    </table>
  </div>

  <!--  <CartVue/>-->

</template>

<script>

export default {
  name: 'ItemList',
  components: {

  },
  data() {
    return {
      products: [],
      search: ''
    }
  },
  mounted() {
    fetch("http://127.0.0.117:11717/products")
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
    delete_item(obj){
      console.log("delete", obj.id)
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_to_delete: obj.id })
      };
      fetch('http://127.0.0.117:11717/item/delete', requestOptions)
          .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
    update_item(obj) {
      console.log("update", obj.id)
    }
  }
}
</script>

<style>

</style>