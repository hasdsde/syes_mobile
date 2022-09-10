<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      这个是收藏页面
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss"/>
        <q-btn flat color="white" label="Update Credit Card"/>
      </template>
    </q-banner>
  </div>
</template>

<script setup lang="ts">
import {api} from "boot/axios";
import {ref} from "vue";

let pageSize = ref(6)
let currentPage = ref(1)

loadPage()

function loadPage() {
  api.get('/about/collect?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    console.log(res)
  })
}
</script>

<style scoped>

</style>