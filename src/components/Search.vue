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
            <q-breadcrumbs-el :label="'搜索：'+text" icon="search"/>
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
      <div class="q-pa-sm q-pa-sm q-gutter-md">
        <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
          <q-infinite-scroll @load="onLoad" :offset="100">
            <!--   卡片   -->
            <q-card class="my-card row q-mt-md" v-ripple.early v-for="itemInfo in itemInfos"
                    @click="handleLink(itemInfo.id)" :key="itemInfo.id">
              <!--左侧图片-->
              <div class="col q-pa-sm ">
                <q-img class="rounded-borders" :ratio="1/1" style="max-width: 100%;max-height: 100%"
                       :src="itemInfo.url" alt=""/>
              </div>
              <!--右侧信息-->
              <div class="col-7 q-pa-sm column">
                <!--标题-->
                <div class="col-5">
                  <div class="text-body1 text-weight-bold ellipsis-2-lines">{{ itemInfo.title }}</div>
                </div>
                <!--用户与价格-->
                <div class="col">
                  <span class="text-red text-h6">￥{{ itemInfo.price }}  </span>
                  <q-chip>
                    <q-avatar>
                      <img :src="itemInfo.avatar">
                    </q-avatar>
                    <span class="text-caption">{{ itemInfo.nickname }}</span>
                  </q-chip>
                </div>
                <!--按钮-->
                <div class="col">
                </div>
              </div>
            </q-card>
            <!--   空白站位   -->
            <div style="text-align: center">
              <q-spinner-dots v-if="!noData" color="primary" size="40px"/>
              <p class=" q-mt-lg text-caption text-grey-7">没有更多内容</p>
              <div style="height:1vh">
              </div>
            </div>
            <!--加载动画-->
          </q-infinite-scroll>
        </q-pull-to-refresh>
      </div>
    </q-page-container>
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

<script lang="ts" setup>
//监测网址操作，返回物品id,根据物品id获取聊天id
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {api} from "boot/axios";
import {CommSeccess} from "src/common/common";
import {Allmenus} from "src/common/models";

const SearchDisplay = ref(false)
const SearchText = ref('')

const link = ref('')
let menu = ref(Allmenus)
let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)
let noData = ref(false)
const text = ref()
const $router = useRouter()
const leftDrawerOpen = ref(false)
watch(() => $router.currentRoute.value.query, (newValue, oldValue) => {
  if (newValue.text == '') {
    $router.push("/")
  } else {
    text.value = newValue.text
  }
}, {immediate: true})

//加载页面
function loadPage() {
  api.get('/itemHome/search?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value + '&text=' + text.value).then(res => {
    if (res.data.length == 0) {
      CommSeccess('全部加载完成')
      noData.value = true
    } else {
      for (let i = 0; i < res.data.length; i++) {//@ts-ignore
        itemInfos.value.push(res.data[i])
      }
      //@ts-ignore
      itemInfos.value.forEach(ItemInfo => ItemInfo.history = history)
    }
  })
}

//末尾加载
function onLoad(index: any, done: any) {
  setTimeout(() => {
    if (noData.value == false) {
      currentPage.value = currentPage.value + 1
      loadPage()
    }
    done();
  }, 1000)

}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    itemInfos.value = []
    currentPage.value = 1
    loadPage()
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

//侧栏开关
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

//点击跳转
function handleLink(value: any) {
  $router.push("item?id=" + value)
}

function SearchRoute() {
  $router.push('/search?text=' + SearchText.value)
  setTimeout(() => {
    $router.go(0)
  }, 100)
}
</script>

<style scoped>

</style>

