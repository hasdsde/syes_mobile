<template>
  <div class="q-pa-md q-gutter-sm" style="padding: 0">
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
          <q-carousel-slide v-for="item in rows" :name="item.id" :img-src="item.url"/>
          <!--          <q-carousel-slide :name="2" img-src="https://img.hasdsd.cn/img/parallax2.jpg"/>-->
          <!--          <q-carousel-slide :name="3" img-src="https://img.hasdsd.cn/img/mountains.jpg"/>-->
          <!--          <q-carousel-slide :name="4" img-src="https://img.hasdsd.cn/img/parallax1.jpg"/>-->
        </q-carousel>
      </div>
      <!--  列出的物品  -->
      <div class="q-pa-md row items-start q-gutter-md" style="width: 100%;">
        <!--左侧列-->
        <div class="column" style="padding: 0 ;margin: auto;width: 50% ;position: absolute;">
          <q-card class="my-card justify-around" v-for="item in itemInfo1" :key="item.id">
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
                20计算机 发布于{{ item.createtime }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!--右侧列-->
        <div class="column" style="padding: 0 ;margin: auto;width: 50%;position: absolute;left: 50%">
          <q-card class="my-card justify-around" v-for="item in itemInfo2" :key="item.id">
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
                20计算机 发布于{{ item.createtime }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {api} from "boot/axios";
import {CommSeccess, LoadingFail, LoadingNotify, LoadingSucceed} from "components/common";

const slide = ref(1)
const autoplay = ref(2000)
const loading = LoadingNotify()
let pageSize = ref(6)
let currentPage = ref(1)
let itemInfo = ref([])
let itemInfo1 = ref([])
let itemInfo2 = ref([])
let a = ref('aaaa')
let rows = ref()

loadPage()

//加载页面，刷新
function loadPage() {
  let bool = true;
  api.get("/itemHome/page?pagesize=" + pageSize.value + "&currentpage=" + currentPage.value).then(res => {
    LoadingSucceed(loading)
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createtime = res.data[i].createtime.slice(4, 10)
      //@ts-ignore
      itemInfo.value.push(res.data[i])
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
  api.get("/rollimg/").then(res => {
    rows.value = res.data
  })
}

function refresh(done: () => void) {
  setTimeout(() => {
    done()
    loadPage()
    CommSeccess("刷新")
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
