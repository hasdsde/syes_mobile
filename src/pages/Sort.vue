<template>
  <div>
    <q-splitter
        style="height: 87vh"
        v-model="splitterModel"
    >

      <template v-slot:before style="width: 20%">
        <q-tabs
            v-model="tab"
            vertical
            class="text-primary"
        >
          <q-tab v-for="item in pmenu" :name="item.name" :icon="item.icon" :label="item.name"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
            v-model="tab"
            swipeable
            vertical
            animated
            transition-prev="jump-up"
            transition-next="jump-down"
        >
          <q-tab-panel v-for="p in pmenu" :name="p.name">
            <div class="text-h4 q-mb-md">{{ p.name }}</div>
            <span v-for="n in nmenu">
              <q-btn class="q-ma-xs" v-if="n.pid===p.id" outline color="primary" :label="n.name" :icon="n.icon"
                     @click="handleLink(n.name)"/>
            </span>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router/dist/vue-router";

let pmenu = ref()
let nmenu = ref()
const tab = ref('生活用品')
const splitterModel = 20
const $router = useRouter()

loadPage()

function loadPage() {
  api.get('/sort/p').then(res => {
    pmenu.value = res.data
  })
  api.get('/sort/nAll').then(res => {
    nmenu.value = res.data
  })

}

function handleLink(value: any) {
  $router.push("/sortList?sort=" + value)
}
</script>

<style scoped>

</style>
