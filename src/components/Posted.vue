<template>
  <div class="q-pa-sm q-pa-sm q-gutter-md">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="10">
        <h5 class="q-pl-md">我的发布</h5>
        <!--   卡片   -->
        <q-card class="my-card row q-mt-md" v-ripple.early v-for="itemInfo in itemInfos"
                @click="handleLink(itemInfo.id)"
                :key="itemInfo.id">
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
              <q-btn rounded :color="itemInfo.onsale==1?'primary':'grey'" class="float-right"
                     :label="itemInfo.onsale==1?'已上架':'已下架'"
                     @click.stop="handleStatus(itemInfo)" size="sm"/>
              <q-btn rounded color="primary" label="编辑" class="float-right q-mr-sm"
                     @click.stop="edit=true;itemEdit=itemInfo;" @click.once="getOptions()"
                     size="sm"/>
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
        <!-- 修改信息-->
        <q-dialog v-model="edit" position="bottom">
          <q-card>
            <q-card-section>
              <div class="text-h6">修改物品</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input v-model="itemEdit.title" label="标题"/>
              <q-input v-model="itemEdit.price" label="价格"/>
              <q-select v-model="itemEdit.sort" label="分类" :options="sortInfo"/>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="取消" color="red" v-close-popup/>
              <q-btn flat label="修改" color="primary" @click="handleEdit()" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {api} from "boot/axios";
import {ref} from "vue";
import {CommSeccess} from "components/common";
import {useRouter} from "vue-router/dist/vue-router";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let posted = ref(1)
let noData = ref(false)
const $router = useRouter()
const edit = ref(false)
let itemEdit = ref({})
let sortInfo = ref([])

//加载页面
function loadPage() {
  api.get('/about/posted?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    if (res.data.length == 0) {
      CommSeccess('全部加载完成')
      noData.value = true
    } else {
      for (let i = 0; i < res.data.length; i++) {//@ts-ignore
        itemInfos.value.push(res.data[i])
      }
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

//切换上架状态
function handleStatus(value: any) {
  if (value.onsale == 1) {
    value.onsale = ref(0)
    CommSeccess('下架')
  } else {
    value.onsale = ref(1)
    CommSeccess("上架")
  }
  api.get('/item/status?id=' + value.id + '&status=' + !!value.onsale).then(res => {
        itemInfos.value.slice(0, itemInfos.value.length)
        loadPage()
      }
  )

}

function handleEdit() {

  api.put('/item/', {//@ts-ignore
    'id': itemEdit.value.id,//@ts-ignore
    'title': itemEdit.value.title,//@ts-ignore
    'price': itemEdit.value.price,//@ts-ignore
    'sort': itemEdit.value.sort
  }).then(res => {
    if (res.code == '200') {
      CommSeccess('操作成功')
      loadPage()
    }
  })
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

//点击跳转
function handleLink(value: any) {
  $router.push("item?id=" + value)
}

//获取分类选项
function getOptions() {
  api.get('/sort/nAll').then(res => {
    res.data.forEach((item: any) => {
      //@ts-ignore
      sortInfo.value.push(item.name)
    })
    console.log(sortInfo)
  })
}
</script>

<style scoped>

</style>