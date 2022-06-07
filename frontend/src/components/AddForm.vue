<template>

  <form>
    <div class="form-group">
      <label for="newBrand">Brand</label>
      <input type="text" class="form-control" id="newBrand"  placeholder="new brand" v-model="new_brand">
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </div>
    <div class="form-group">
      <label for="newModel">Model</label>
      <input type="text" class="form-control" id="newModel" placeholder="new model" v-model="new_model">
    </div>
    <div class="form-group">
      <label for="newPrice">Price</label>
      <input type="int" class="form-control" id="newPrice" placeholder="0 €" v-model="new_price">
    </div>
    <button  class="btn btn-primary" v-on:click="add_item">Submit</button>
  </form>

</template>

<script>
export default {
  name: "AddForm",
  data() {
    return {
      new_item: {},
      new_brand: '',
      new_model: '',
      new_price: ''
    }
  },
  methods: {

    add_item() {
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newbrand: this.new_brand, newmodel: this.new_model, newprice: this.new_price })
      };
      fetch('http://127.0.0.117:11717/item', requestOptions)
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
    // add_item() {
    //   fetch('http://127.0.0.117:11717/item/add', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({a: 7, str: 'Some string: &=&'})
    //   }).then(res => res.json())
    //       .then(res => console.log(res));
    // }
  }
}
</script>

<style scoped>



</style>