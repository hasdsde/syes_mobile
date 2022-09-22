<template>
  <q-layout view="hHh Lpr lFf">
    <!--  顶部栏  -->
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
            <q-breadcrumbs-el :label="positions" :icon="positions.icon"/>
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
    <q-footer class="bg-white text-black" style="height: 3rem;align-self: auto;">
      <div class="row  ">
        <div class="col-2" style="width: 13%">
          <q-btn icon="add" class="float-right q-mr-sm" round color="primary" size="md"></q-btn>
        </div>
        <div class="col-8">
          <q-input filled v-model="text" dense/>
        </div>
        <div class="col-2" style="width: 19%">
          <q-btn color="primary" class="float-right vertical-bottom" label="发送"/>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {Allmenus} from "src/common/models";
import {useRouter} from "vue-router";

const link = ref('')
let $router = useRouter()
const leftDrawerOpen = ref(false)
let positions = ref()
let menu = ref(Allmenus)
let username = ref('雾雨魔理沙')

//侧栏开关
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

//面包屑
watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  positions.value = '魔理沙'
}, {immediate: true})

</script>

<style scoped>

</style>