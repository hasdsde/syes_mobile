<template>
  <div class="q-pa-md q-gutter-sm">
    <!--  轮播图  -->
    <div class="q-pa-md mobile-only">
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
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg"/>
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg"/>
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg"/>
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg"/>
      </q-carousel>
    </div>
    <!--  列出的物品  -->
    <q-card class="my-card content-start">
      <q-img src="https://img.hasdsd.cn/img/1661820629513.jpg"/>

      <q-card-section>
        <q-btn
            fab
            color="primary"
            icon="favorite_border"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            女生自用99新RTX3090显卡，共200张，手慢无！
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place"/>
            250 ft
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          ￥114.514
        </div>
        <div class="text-caption text-grey">
          20级，计算机专业 发布于2077年1月1日 114514人看过
        </div>
      </q-card-section>


    </q-card>
    <q-card class="my-card content-start">
      <q-img src="https://img.hasdsd.cn/img/1661820629513.jpg"/>

      <q-card-section>
        <q-btn
            fab
            color="primary"
            icon="favorite_border"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            女生自用99新RTX3090显卡，共200张，手慢无！
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place"/>
            250 ft
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          ￥114.514
        </div>
        <div class="text-caption text-grey">
          20级，计算机专业 发布于2077年1月1日 114514人看过
        </div>
      </q-card-section>


    </q-card>
    <q-card class="my-card content-start">
      <q-img src="https://img.hasdsd.cn/img/1661820629513.jpg"/>

      <q-card-section>
        <q-btn
            fab
            color="primary"
            icon="favorite_border"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            女生自用99新RTX3090显卡，共200张，手慢无！
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place"/>
            250 ft
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          ￥114.514
        </div>
        <div class="text-caption text-grey">
          20级，计算机专业 发布于2077年1月1日 114514人看过
        </div>
      </q-card-section>


    </q-card>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const slide = ref(1)
const autoplay = ref(2000)
</script>

<style scoped>
.q-pa-md {
  padding: 0;
}

.my-card {
  width: 100%;
  max-width: 200px
}

</style>
