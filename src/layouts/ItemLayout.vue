<template>
  <!--  下拉刷新  -->
  <q-pull-to-refresh @refresh="refresh">
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
      <q-footer class="bg-white text-black" style="height: 5.5%;align-self: auto;">
        <div class="row q-pa-xs ">
          <div class="col q-pt-xs">
            <q-btn flat rounded color="grey-7" icon="thumb_up_off_alt">
              <q-badge color="grey-1" text-color="grey-7" floating>22</q-badge>
            </q-btn>
          </div>
          <div class="col col q-pt-xs">
            <q-btn flat rounded color="grey-7  " icon="star_border">
              <q-badge color="grey-1" text-color="grey-7" floating>22</q-badge>
            </q-btn>
          </div>
          <div class="col col q-pt-xs">
            <q-btn flat rounded color="grey-7 " icon="textsms">
              <q-badge color="grey-1" text-color="grey-7" floating>22</q-badge>
            </q-btn>
          </div>
          <div class="col-3">
          </div>
          <div class="col-4">
            <q-btn unelevated rounded class="float-right q-mr-xs" color="amber" label="出价" icon="monetization_on"/>
          </div>
        </div>
      </q-footer>
    </q-layout>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {Allmenus} from "components/models";
import {useRouter} from "vue-router/dist/vue-router";
import {CommSeccess} from "components/common";

let $router = useRouter()
const leftDrawerOpen = ref(false)
const tab = ref(false)
const link = ref('')
let positions = ref()
let menu = ref(Allmenus)
const itemid = ref()

//监测网址操作，返回物品id
watch(() => $router.currentRoute.value.query, (newValue, oldValue) => {
  itemid.value = newValue
  console.log(itemid.value.id)
}, {immediate: true})

//侧栏开关
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value

}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

//面包屑
watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  positions.value = findTitle()
}, {immediate: true})

function findTitle() {
  for (let i = 0; i < Allmenus.length; i++) {
    if (menu.value[i].link == $router.currentRoute.value.path) {
      return menu.value[i]
    }
  }
}


</script>

<style scoped>
.my-menu-link {
  color: rgb(25, 118, 210);
  background: #F2C037
}

.bg-opacity {
  background-color: white;
  opacity: 0.6;
}
</style>