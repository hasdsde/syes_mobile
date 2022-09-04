<template>
  <div id="building">
    <!-- 第一部分 -->
    <div>
      <q-carousel
          swipeable
          animated
          v-model="slide"
          navigation
          infinite
          transition-prev="slide-right"
          transition-next="slide-left"
      >
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg"/>
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg"/>
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg"/>
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg"/>
      </q-carousel>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <!--第二部分-->
      <q-card class="my-card q-pa-md no-margin no-shadow" v-ripple.early>
        <span class="price text-h5">￥114.514</span>
        <span class="float-right text-grey">100人看过</span>
        <p class="title text-h6 text-weight-bold no-margin">女生自用99新3090共十片</p>
        <q-separator/>
        <div class="q-mt-xs">女生自用99新3090共十片女生自用99新
          3090共十片女生自用99新3090共十片女生自用99新3090共十片
        </div>
        <!--    出价    -->
      </q-card>
      <q-card class="my-card q-pa-md no-shadow q-mt-md q-ml-none" v-ripple.early>
        <p>出价</p>
        <q-chip clickable color="white" text-color="black">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          田所浩二 出价：<span class="text-orange">￥200</span>
        </q-chip>
        <q-chip clickable color="white" text-color="black">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          田所浩二 出价：<span class="text-orange">￥200</span>
        </q-chip>
        <q-chip clickable color="white" text-color="black">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          田所浩二 出价：<span class="text-orange">￥200</span>
        </q-chip>
      </q-card>
      <q-card class="my-card q-pa-md no-shadow q-mt-md q-ml-none" v-ripple.early>
        <p>评论</p>
      </q-card>
      <!--   评论   -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const autoplay = ref(false)
const slide = ref(1)
</script>

<style scoped>
#building {
  background-color: rgb(238, 238, 238);
  width: 102%;
  height: 101%;
  position: fixed;
  background-size: cover;
}

.price {
  color: red;
}
</style>