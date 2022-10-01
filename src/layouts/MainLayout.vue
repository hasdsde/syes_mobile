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
        <q-icon name="search" size="sm" @click="SearchDisplay = true"></q-icon>
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
                     :active="link === item.link" @click="link = item.link" :to="item.link">
          <q-badge v-if="item.name === 'Message' &&mCount>0" color="red" rounded floating>{{ mCount }}</q-badge>
          <q-badge v-if="item.name === 'AboutMe' &&oCount>0" color="primary" rounded floating>{{ oCount }}</q-badge>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
  <!-- 搜索对话框 -->
  <q-dialog v-model="SearchDisplay" position="top">
    <q-card style="width: 350px" class="q-ma-md">
      <q-input outlined v-model="SearchText" @keydown.enter="SearchRoute" placeholder="输入物品关键词">
        <template v-slot:append>
          <q-btn color="primary" @click="SearchRoute()" label="搜索"/>
        </template>
      </q-input>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {Allmenus, menus} from "src/common/models";
import {useRouter} from "vue-router/dist/vue-router";
import {api} from "boot/axios";
import {CommInfo} from "src/common/common";

let $router = useRouter()
const leftDrawerOpen = ref(false)
const tab = ref(false)
const link = ref('')
let positions = ref()
let menu = ref(menus)
let Allmenu = ref(Allmenus)
const mCount = ref(0)
const oCount = ref(0)
const SearchDisplay = ref(false)
const SearchText = ref('')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value

}

//面包屑监控
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

getMessageAndOrder()

//获取未读信息和交易物品
function getMessageAndOrder() {
  api.get('/itemHome/Message').then(res => {
    mCount.value = res.data.mCount
    oCount.value = res.data.oCount
    if (res.data.mCount > 0) {
      CommInfo('你有' + res.data.mCount + '条未读消息')
    }
    if (res.data.oCount > 0) {
      CommInfo('你有' + res.data.oCount + '件进行中的订单')
    }
  })
}


function SearchRoute() {
  $router.push('/search?text=' + SearchText.value)
  SearchText.value = ''
  SearchDisplay.value = false
}
</script>
<style>
.my-menu-link {
  color: rgb(25, 118, 210);
  background: #F2C037
}
</style>
