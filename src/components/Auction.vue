<template>
  <div class="q-pa-sm q-pa-sm q-gutter-md">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="100" id="building">
        <h5 class="q-pl-md" id="building">我的出价</h5>
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
              <span class="text-red text-h6">￥{{ itemInfo.itemprice }}  </span>
              <q-chip>
                <q-avatar>
                  <img :src="itemInfo.avatar">
                </q-avatar>
                <span class="text-caption">{{ itemInfo.nickname }}</span>
              </q-chip>
            </div>
            <!--按钮-->
            <div class="col">
              <span class="q-mt-sm text-weight-bold "
                    style="font-size: medium;display: inline-block">出价:
                <span class="text-orange">￥{{ itemInfo.price }}</span>
                </span>
              <q-btn outline rounded color="primary" class="float-right q-mt-sm"
                     icon="edit" label="修改"
                     @click.stop="prompt = true;getPrice(itemInfo.price,itemInfo.id)" size="sm"/>
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
        <!-- 对话框-->
        <q-dialog v-model="prompt" position="bottom">
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">出价</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input dense v-model="yourPrice" v-if="yourPrice>0 || yourPrice===''" autofocus
                       @keyup.enter="prompt = false"/>
              <q-input dense v-model="newPrice" v-if="yourPrice<0" autofocus @keyup.enter="prompt = false"/>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat v-if="yourPrice>0" label="删除出价" class="text-red float-left" @click="DeletePrice()"
                     v-close-popup/>
              <q-btn flat label="取消" v-close-popup/>
              <q-btn flat v-if="yourPrice>0 || yourPrice===''" label="修改" @click="UpdateAuction" v-close-popup/>
              <q-btn flat v-if="yourPrice<0" label="确定" @click="newAuction" v-close-popup/>
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
import {Notify} from "quasar";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)
const $router = useRouter()
let noData = ref(false)
let prompt = ref(false)
let yourPrice = ref()
let newPrice = ref()
let itemid = ref()

//加载页面
function loadPage() {
  api.get('/about/auction?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    if (res.data.length == 0) {
      CommSeccess('全部加载完成')
      noData.value = true
    } else {
      for (let i = 0; i < res.data.length; i++) {//@ts-ignore
        itemInfos.value.push(res.data[i])
      }
      //@ts-ignore
      itemInfos.value.forEach(ItemInfo => ItemInfo.collect = collect)
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

//传递价格
function getPrice(value1: any, value2: any) {
  yourPrice.value = value1
  console.log(yourPrice.value)
  itemid.value = value2
  console.log(itemid.value)
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


//发起出价
function newAuction() {
  api.post("/auction/", {
    "itemid": itemid.value,
    "price": newPrice.value
  }).then(res => {
    if (res.code == '200') {
      CommSeccess('新增成功')
      $router.go(0)
    }
  })
}

//修改出价
function UpdateAuction() {
  api.put("/auction/", {
    'itemid': itemid.value,
    'price': yourPrice.value
  }).then(res => {
    if (res.code == '200') {
      CommSeccess("提交成功")
      $router.go(0)
    }
  })
}

//删除确认
function DeletePrice() {
  Notify.create({
    message: '确定要删除出价吗',
    color: 'red',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => {
          api.delete('/auction/?itemid=' + itemid.value).then(res => {
            if (res.code == '200') {
              CommSeccess('操作成功')
              $router.go(0)
            }
          })
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })
}
</script>

<style scoped>

</style>