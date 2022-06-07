<template>

  <tr>
    <td class="col-lg-1">
      <span v-show="!create_mode"> {{ product.brand }} </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_brand" :placeholder=" product.brand " class="col-lg-12"> </span>
    </td>
    <td class="col-lg-1">
      <span v-show="!create_mode"> {{ product.model }} </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_model" :placeholder=" product.model " class="col-lg-12"> </span>
    </td>
    <td class="col-lg-1">
      <span v-show="!create_mode"> {{ product.price }} € </span>
      <span v-show="create_mode"> <input type="text" v-model="updated_price" :placeholder=" product.price " class="col-lg-12"> </span>
    </td>
    <td class="col-lg-2" id="actions">
      <button v-on:click="update_item(product)" class="btn btn-warning col-lg-2" v-show="!create_mode"> Update </button>
      <button v-on:click="save_item(product)" class="btn btn-success col-lg-2" v-show="create_mode"> Save </button>
      <button v-on:click="delete_item(product)" class="btn btn-danger col-lg-2"> Delete </button>
    </td>
  </tr>

</template>

<script>
export default {
  name: "SingleItem",
  data () {
    return {
      create_mode: false,
      updated_brand: '',
      updated_model: '',
      updated_price: ''
    }
  },
  props: ['product'],
  methods: {
    delete_item(obj){
      console.log("delete", obj.id)
      // POST request using fetch with error handling
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_to_delete: obj.id })
      };
      fetch('http://127.0.0.117:11717/item', requestOptions)
          .then(async response => { console.log(response)
            // const data = await response.json();
            // // check for error response
            // if (!response.ok) {
            //   // get error message from body or default to response status
            //   const error = (data && data.message) || response.status;
            //   return Promise.reject(error);
            // }
          })
          .then(
              this.$emit('single_delete', obj)
          )
          .catch(error => {
            console.error('There was an error!', error);
          });
    },
    update_item() {
      this.create_mode = !this.create_mode
    },
    save_item(obj) {
      this.create_mode = !this.create_mode;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_to_update: obj.id,
          updated_brand: this.updated_brand !== '' ? this.updated_brand : obj.brand,
          updated_model: this.updated_model !== '' ? this.updated_model : obj.model,
          updated_price: this.updated_price !== '' ? this.updated_price : obj.price,
        })
      };

      fetch('http://127.0.0.117:11717/item', requestOptions)
          .then(
              async response => { console.log(response)
          })
          .then (

          )
          .then(
              this.$emit('single_update', obj)
          )
          .catch(error => {
            console.error('There was an error!', error);
          });
    }
  }
}
</script>

<style scoped>
#actions {

}

.btn {
margin-left: 10px;
}
</style>