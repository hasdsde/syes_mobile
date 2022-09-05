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
        <div clickable color="white" text-color="black" class="q-pt-sm vertical-middle">
          <q-avatar size="28px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          田所浩二
          <span class="text-caption text-grey-7">20 计算机</span>
          <span class="text-caption float-right text-grey-7 q-mt-xs">8月8日</span>
        </div>
        <!--    出价    -->
      </q-card>
      <!--第二部分-->
      <q-card class="my-card q-pa-sm no-shadow q-mt-md q-ml-none" v-ripple.early>
        <p class="q-pt-xs q-pl-xs  no-margin text-weight-bold">出价</p>
        <div class="q-pl-md q-pr-md q-pt-sm q-pb-sm">
          暂无用户出价，说出你的价格!？
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
        </div>
      </q-card>
      <!--   评论   -->
      <q-card class="my-card q-pa-sm no-shadow q-mt-md q-ml-none">
        <p class="q-pt-xs q-pl-xs  no-margin text-weight-bold">评论</p>
        <q-list>

          <q-expansion-item expand-icon-class="hidden">
            <template v-slot:header>
              <q-item-section avatar class="vertical-top">
                <q-avatar icon="bluetooth" color="primary" text-color="white"/>
              </q-item-section>
              <q-item-section>
                <div class="no-margin">
                  <span class="text-primary">刘华强</span>
                  <span class="text-caption text-grey-7">20 计算机</span>
                  <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                </div>
                <p class="no-margin">你这瓜保熟吗？</p>
                <span class="no-margin text-caption text-grey-7" v-ripple.early>查看3条回复</span>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item clickable v-ripple class="q-pr-none" v-ripple.early>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">瓜摊老板 </span>回复：
                        <span class="text-primary">刘华强</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        我开水果摊的，能买你生瓜蛋子？
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple class="q-pr-none" v-ripple.early>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">刘华强 </span>回复：
                        <span class="text-primary">瓜摊老板</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        我问你这瓜保熟吗？
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple class="q-pr-none" v-ripple.early>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">瓜摊老板 </span>回复：
                        <span class="text-primary">刘华强</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        你故意找茬是不是？你要不要吧！
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-icon-class="hidden">
            <template v-slot:header>
              <q-item-section avatar class="vertical-top">
                <q-avatar icon="bluetooth" color="primary" text-color="white"/>
              </q-item-section>
              <q-item-section>
                <div class="no-margin">
                  <span class="text-primary">奥特曼大王</span>
                  <span class="text-caption text-grey-7">20 计算机</span>
                  <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                </div>
                <p class="no-margin">我是学生，50包邮给我</p>
                <span class="no-margin text-caption text-grey-7" v-ripple.early>查看1条回复</span>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item clickable v-ripple class="q-pr-none" v-ripple.early>
                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">老板 </span>回复：
                        <span class="text-primary">奥特曼大王</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        你是畜生也不行
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
      <div style="text-align: center">
        <p class=" q-mt-lg text-caption text-grey-7">没有更多内容</p>
        <div style="height:10vh">
        </div>
      </div>

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
  overflow: auto;
}

.price {
  color: red;
}
</style>