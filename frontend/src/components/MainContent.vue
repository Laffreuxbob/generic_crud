<template>
<h1>Main Page </h1>
  <div>
    <button v-on:click="this.switch_mode('list')">List</button>
    <button v-on:click="this.switch_mode('add')">add</button>
  </div>


  <ItemList v-if="mode === 'list'"/>
  <AddForm v-if="mode === 'add'"/>
</template>

<script>

import ItemList from './List.vue'
import AddForm from "@/components/AddForm";

export default {
  name: 'MainMainContent',
  components: {
    ItemList,
    AddForm
  },
  props: {
    msg: String,
  },
  data() {
    return {
      mode: 'list'
      // mode_list: ['list', 'add'],
      // mode_index: 0,
      // mode: this.mode_list[this.mode_index],
    }
  },
  methods: {
    switch_mode(str){
      this.mode = str
    }
  }
}
</script>

<style scoped>

</style>