<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
        />
        <!--顶栏-->
        <q-toolbar-title>
          <!--     面包屑     -->
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el :label="positions.label" :icon="positions.icon"/>
          </q-breadcrumbs>
        </q-toolbar-title>
        <q-icon name="search" size="sm"></q-icon>
      </q-toolbar>
    </q-header>
    <!--  侧栏  -->
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
    >
      <q-list>
        <q-item
            v-for="item in menu"
            clickable
            v-ripple
            :active="link === item.link"
            @click="link = item.link"
            active-class="my-menu-link"
            :to="item.link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon"/>
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
    <!--中间内容-->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!--  底部栏  -->
    <q-footer>
      <q-tabs
          class="bg-white"
          active-color="primary"
          style="height: 56px;align-self: auto;"
          active-class="my-menu-link"
      >
        <q-route-tab v-for="item in menu" :name="item.name" :label="item.label" :icon="item.icon" class="text-dark"
                     :active="link === item.link" @click="link = item.link" :to="item.link"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {Allmenus, menus} from "src/common/models";
import {useRouter} from "vue-router/dist/vue-router";

let $router = useRouter()
const leftDrawerOpen = ref(false)
const tab = ref(false)
const link = ref('')
let positions = ref()
let menu = ref(menus)
let Allmenu = ref(Allmenus)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value

}

watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  positions.value = findTitle()
}, {immediate: true})

function findTitle() {
  for (let i = 0; i < Allmenu.value.length; i++) {
    if (Allmenu.value[i].link == $router.currentRoute.value.path) {
      return menu.value[i]
    }
  }
}
</script>
<style>
.my-menu-link {
  color: rgb(25, 118, 210);
  background: #F2C037
}
</style>
