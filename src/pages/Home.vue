<template>
  <div class="q-pa-md q-gutter-sm" style="padding: 0">
    <!--  下拉刷新  -->
    <q-pull-to-refresh @refresh="refresh">
      <!--  轮播图  -->
      <div class="q-pa-md mobile-only" style="padding:0">
        <q-carousel
            swipeable
            animated
            v-model="slide"
            navigation
            infinite
            :autoplay="autoplay"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
            height="200px"
        >
          <q-carousel-slide v-for="(item,index) in rows" :name="index" :img-src="item.url"/>
        </q-carousel>
      </div>
      <!--  末尾自动加载  -->
      <q-infinite-scroll @load="onLoad" :offset="100">
        <!--  列出的物品  -->
        <div class="q-pa-md row items-start q-gutter-md" style="width: 100%;">
          <!--左侧列-->
          <div class="column bg-grey-2" style="padding: 0 ;margin: auto;width: 50% ;position: absolute;">
            <q-card v-ripple.early class="my-card justify-around" v-for="item in itemInfo1" :key="item.id"
                    @click="handleClick(item.id)">
              <q-img :src="item.url"/>
              <q-card-section style="padding: 0.1rem 0.5rem;max-height: 4rem">
                <div class="row no-wrap items-center" style="padding: 0">
                  <div class="col text-body1  text-weight-bold ellipsis-2-lines"
                       style="font-size: 1rem;padding-top: 0.5rem;">
                    {{ item.title }}...
                  </div>
                </div>
              </q-card-section>
              <q-separator/>
              <q-card-section class=" q-pt-none
            " style="padding-top: 10px">
                <div class="text-subtitle1 ">
                  ￥{{ item.price }}
                  <span class="text-subtitle2 text-caption">{{ item.collectionnum }}人想要</span>
                </div>
                <div class="text-caption text-grey">
                  {{ item.nickname }}
                  <br>
                  {{ item.grade }}计算机 发布于{{ item.createtime }}
                </div>
              </q-card-section>
            </q-card>
            <div style="text-align: center;">
              <div style="height:10.5vh">
              </div>
            </div>
          </div>
          <!--右侧列-->
          <div class="column bg-grey-2" style="padding: 0 ;margin: auto;width: 50%;position: absolute;left: 50%">
            <q-card v-ripple.early class="my-card justify-around" v-for="item in itemInfo2" :key="item.id"
                    @click="handleClick(item.id)">
              <q-img :src="item.url"/>
              <q-card-section style="padding: 0.1rem 0.5rem;max-height: 4rem">
                <div class="row no-wrap items-center" style="padding: 0">
                  <div class="col text-body1  text-weight-bold ellipsis-2-lines"
                       style="font-size: 1rem;padding-top: 0.5rem;">
                    {{ item.title }}...
                  </div>
                </div>
              </q-card-section>
              <q-separator/>
              <q-card-section class=" q-pt-none
            " style="padding-top: 10px">
                <div class="text-subtitle1 ">
                  ￥{{ item.price }}
                  <span class="text-subtitle2 text-caption">{{ item.collectionnum }}人想要</span>
                </div>
                <div class="text-caption text-grey">
                  {{ item.nickname }}
                  <br>
                  {{ item.grade }}计算机 发布于{{ item.createtime }}
                </div>
              </q-card-section>
            </q-card>
            <q-spinner-dots style="margin-left: -5vw" color="primary" size="40px"/>
            <div style="text-align: center;">
              <div style="height:6vh">
              </div>
            </div>
          </div>
        </div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {api} from "boot/axios";
import {LoadingFail, LoadingNotify, LoadingSucceed} from "src/common/common";
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
const slide = ref(0)
const autoplay = ref(2000)
const loading = LoadingNotify()
let pageSize = ref(6)
let currentPage = ref(0)
// let itemInfo = ref([])
let itemInfo1 = ref([])
let itemInfo2 = ref([])
let a = ref('aaaa')
let rows = ref()
loadImg()

//点击物品跳转
function handleClick(id: Number) {
  $router.push('/item?id=' + id)
}

//加载头图
function loadImg() {
  api.get("/rollimg/").then(res => {
    rows.value = res.data
  })
}

//末尾加载
function onLoad(index: any, done: any) {
  setTimeout(() => {
    currentPage.value = currentPage.value + 1
    loadPage()
    done();
  }, 500)

}

//加载页面，刷新
function loadPage() {
  let bool = true;
  api.get("/itemHome/page?pagesize=" + pageSize.value + "&currentpage=" + currentPage.value).then(res => {
    LoadingSucceed(loading)
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createtime = res.data[i].createtime.slice(5, 10)
      //@ts-ignore
      if (bool) {
        //@ts-ignore
        itemInfo1.value.push(res.data[i])
      } else {
        //@ts-ignore
        itemInfo2.value.push(res.data[i])
      }
      bool = !bool;
    }
  }).catch(() => {
    LoadingFail(loading)
  })

}

//下拉刷新
function refresh(done: () => void) {
  currentPage.value = 1
  setTimeout(() => {
    $router.go(0)
    //先清空内容
    // itemInfo1.value.splice(0, itemInfo1.value.length)
    // itemInfo2.value.splice(0, itemInfo2.value.length)
    done()
    // loadPage()
    // CommSeccess("刷新")
  }, 1000)
}
</script>

<style scoped>
.q-pa-md {
  background-color: rgb(245, 245, 245);
}

.my-card {
  width: 100%;
  max-width: 21vh;
  display: inline-block;
  flex: auto;
  margin: 1rem auto;

}

.text-subtitle1 {
  color: red;
  font-weight: bold;
}

.text-subtitle2 {
  color: rgb(158, 170, 199);
  font-weight: normal;
}

</style>
