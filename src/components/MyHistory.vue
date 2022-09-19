<template>
  <div class="q-pa-sm q-pa-sm q-gutter-md">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="100">
        <q-btn color="deep-orange" class="float-right" glossy label="删除全部" @click="deleteAll()"/>
        <h5 class="q-pl-md">浏览历史</h5>
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
              <q-btn outline rounded color="red" class="float-right" icon="delete_forever"
                     @click.stop="handleStatus(itemInfo)" size="sm"/>
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
</template>

<script setup lang="ts">
//加载页面
import {api} from "boot/axios";
import {ref} from "vue";
import {CommSeccess} from "components/common";
import {useRouter} from "vue-router/dist/vue-router";
import {Notify} from "quasar";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)
let $router = useRouter()
let noData = ref(false)

function loadPage() {
  api.get('/about/history?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
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

//切换收藏状态
function handleStatus(value: any) {
  api.get('/userhistory/delOne?itemid=' + value.id)
  $router.go(0);
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

//删除全部
function deleteAll() {
  Notify.create({
    message: '确定要清除全部吗?',
    color: 'negative',
    position: 'top',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => {
          api.get('/userhistory/delAll')
          $router.go(0);
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })
}

//点击跳转
function handleLink(value: any) {
  $router.push("item?id=" + value)
}
</script>

<style scoped>

</style>