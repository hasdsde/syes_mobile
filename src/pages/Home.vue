<template>
  <div class="q-pa-md q-gutter-sm" style="padding: 0">
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
        <q-carousel-slide :name="1" img-src="https://img.hasdsd.cn/img/quasar.jpg"/>
        <q-carousel-slide :name="2" img-src="https://img.hasdsd.cn/img/parallax2.jpg"/>
        <q-carousel-slide :name="3" img-src="https://img.hasdsd.cn/img/mountains.jpg"/>
        <q-carousel-slide :name="4" img-src="https://img.hasdsd.cn/img/parallax1.jpg"/>
      </q-carousel>
    </div>
    <!--  列出的物品  -->
    <div class="q-pa-md row items-start q-gutter-md" style="padding: 0 ;margin: auto;width: 100vw">
      <q-card class="my-card justify-around">
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
      <q-card class="my-card justify-around">
        <q-img src="https://img.hasdsd.cn/img/1661820629476.jpg"/>

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
      <q-card class="my-card justify-around">
        <q-img src="https://img.hasdsd.cn/img/1661820629484.jpg"/>

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
      <q-card class="my-card justify-around">
        <q-img src="https://img.hasdsd.cn/img/1661820629507.jpg"/>

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
      <q-card class="my-card justify-around">
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
      <q-card class="my-card justify-around">
        <q-img src="https://img.hasdsd.cn/img/1661820629529.jpg"/>

        <q-card-section style="padding: 0.1rem 0.5rem;height: 4rem">
          <div class="row no-wrap items-center" style="padding: 0">
            <div class="col text-body1  text-weight-bold ellipsis-2-lines" style="font-size: 1rem;padding-top: 0.5rem;">
              女生自用99新RTX3090显卡，共200张，手慢无！
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class=" q-pt-none
            " style="padding-top: 10px">
          <div class="text-subtitle1 ">
            ￥114.514
            <span class="text-subtitle2 text-caption">100人想要</span>
          </div>
          <div class="text-caption text-grey ellipsis">
            20级计算机 田所浩二
            <br>
            发布于2022年1月1日
          </div>
        </q-card-section>
      </q-card>
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const slide = ref(1)
const autoplay = ref(2000)
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
