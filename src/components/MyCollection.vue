<template>
  <div class="q-pa-sm q-pa-sm q-gutter-md">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="100">
        <h5 class="q-pl-md">收藏</h5>
        <!--   卡片   -->
        <q-card class="my-card row" v-ripple.early v-for="itemInfo in itemInfos" :key="itemInfo.id">
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
              <q-btn outline rounded :color="itemInfo.collect==1?'red':'grey'" class="float-right" icon="favorite"
                     @click="handleStatus(itemInfo)" size="sm"/>
            </div>
          </div>
        </q-card>
        <!--   空白站位   -->
        <div style="text-align: center">
          <q-spinner-dots color="primary" size="40px"/>
          <p class=" q-mt-lg text-caption text-grey-7">没有更多内容</p>
          <div style="height:1vh">
          </div>
        </div>
        <!--加载动画-->
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {api} from "boot/axios";
import {ref} from "vue";
import {CommSeccess} from "components/common";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)


//加载页面
function loadPage() {
  api.get('/about/collect?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    for (let i = 0; i < res.data.length; i++) {//@ts-ignore
      itemInfos.value.push(res.data[i])
    }
    //@ts-ignore
    itemInfos.value.forEach(ItemInfo => ItemInfo.collect = collect)
  })
}

//末尾加载
function onLoad(index: any, done: any) {
  setTimeout(() => {
    currentPage.value = currentPage.value + 1
    console.log("触发")
    loadPage()
    done();
  }, 500)

}

//切换收藏状态
function handleStatus(value: any) {
  if (value.collect == 1) {
    value.collect = ref(0)
    CommSeccess('取消收藏')
  } else {
    value.collect = ref(1)
    CommSeccess("添加收藏")
  }
  api.get('/usercollect/change?itemid=' + value.id)
}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    itemInfos.value.slice(0, itemInfos.value.length)
    loadPage()
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}
</script>

<style scoped>
#building {
  background-image: linear-gradient(to bottom, rgb(244, 254, 255), rgb(238, 238, 238));
  width: 104%;
  height: 96%;
  position: fixed;
  background-size: cover;
  overflow: auto;
}
</style>