<template>
  <div id="building">
    <q-pull-to-refresh @refresh="refresh">
      <!--第一部分 物品图片-->
      <q-carousel
          swipeable
          animated
          v-model="slide"
          navigation
          :autoplay="autoplay"
          infinite
          transition-prev="slide-right"
          transition-next="slide-left"
      >
        <q-carousel-slide v-for="(item,index) in imgDetail" :name="index" :img-src="item.url"/>
      </q-carousel>
    </q-pull-to-refresh>
    <div class="q-pa-md q-gutter-sm">
      <!--第二部分 物品详情-->
      <q-card class="my-card q-pa-md no-margin no-shadow" v-ripple.early>
        <span class="price text-h5">￥{{ itemDetail.price }}</span>
        <span class="float-right text-grey">100人看过</span>
        <p class="title text-h6 text-weight-bold no-margin">{{ itemDetail.title }}</p>
        <q-separator/>
        <div class="q-mt-xs">{{ itemDetail.description }}
        </div>
        <div clickable color="white" text-color="black" class="q-pt-sm vertical-middle">
          <q-avatar size="28px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          {{ itemDetail.nickname }}
          <span class="text-caption text-grey-7">{{ itemDetail.userid }} 计算机</span>
          <span class="text-caption float-right text-grey-7 q-mt-xs">{{ itemDetail.createtime }}</span>
        </div>
        <!--    出价    -->
      </q-card>
      <!--第三部分 出价-->
      <q-card class="my-card q-pa-sm no-shadow q-mt-md q-ml-none" v-ripple.early>
        <p class="q-pt-xs q-pl-xs  no-margin text-weight-bold">出价</p>
        <div class="q-pl-md q-pr-md q-pt-sm q-pb-sm">
          <span v-if="Auction.length===0" class="text-grey-6"> 暂无用户出价，说出你的价格!？</span>
          <q-chip clickable color="white" text-color="black" v-for="item in Auction" :key="item.id">
            <q-avatar>
              <img :src="item.avatar">
            </q-avatar>
            {{ item.username }} 出价：<span class="text-orange">￥{{ item.price }}</span>
          </q-chip>
        </div>
      </q-card>
      <!--第四部分 评论 -->
      <q-card class="my-card q-pa-sm no-shadow q-mt-md q-ml-none">
        <p class="q-pt-xs q-pl-xs  no-margin text-weight-bold">评论</p>
        <q-list>
          <div class="text-grey-5 q-ml-md" v-if="FComment.length===0">还没有人发评论，快来抢第一</div>
          <q-expansion-item expand-icon-class="hidden" v-for="(item,indexX) in FComment"
                            :key="item.id"
          >
            <template v-slot:header>
              <q-item-section style="display: contents" v-ripple>
                <q-item-section avatar class="vertical-top">
                  <q-avatar text-color="white">
                    <img :src="item.avatar" alt="">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="no-margin">
                    <span class="text-primary">{{ item.nickname }}</span>
                    <span class="text-caption text-grey-7">{{ item.userid }} 计算机</span>
                    <span class="no-margin text-caption text-grey-7 float-right">{{
                        item.createtime
                      }}</span>
                  </div>
                  <p class="no-margin">{{ item.content }}</p>
                  <span class="no-margin text-caption text-grey-7 " @click.once=" handleEComment(item.id,indexX)"
                        v-if="item.counts>0">查看{{
                      item.counts
                    }}条回复     <q-btn @click.stop="handleReply(item.id)" color="primary float-right" size="xs"
                                     icon="comment"/></span>
                  <!--                  <span class="text-purple  float-right" @click.stop="CommSeccess('回复')"><q-icon-->
                  <!--                      name="comment" size="xs"></q-icon></span>-->
                </q-item-section>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item clickable v-ripple class="q-pr-none" v-for="commit in EComment[indexX] "
                          @click.stop="handleReply(commit.id)">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="commit.avatar">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">{{ commit.nickname }} </span>回复：
                        <span class="text-primary">{{ commit.tousername }}</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        {{ commit.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
      <!--第五部分 空白站位-->
      <div style="text-align: center">
        <p class=" q-mt-lg text-caption text-grey-7">没有更多内容</p>
        <div style="height:10vh">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import {useRouter} from "vue-router/dist/vue-router";
import {CommFail, CommSeccess} from "components/common";
import {api} from "boot/axios";
import {Dialog} from "quasar";

const $router = useRouter()
const autoplay = ref(false)
const slide = ref(0)
let itemid = ref()
let itemDetail = ref({})
let imgDetail = ref([])
let Auction = ref([])
let FComment = ref([])
let EComment = ref([])
let $dialog = Dialog

//监测网址操作，返回物品id
watch(() => $router.currentRoute.value.query, (newValue, oldValue) => {
  if (newValue.id === '') {
    CommFail("信息载入失败")
    $router.push("/")
  }
  itemid.value = newValue.id
}, {immediate: true})
loadPage()//这个一定要在获取temId之后

//刷新
function loadPage() {
  loadItemInfo()
  loadImginfo()
  loadAuction()
  loadFComment()
  CommSeccess("全部刷新")
}

//获取物品详细信息
function loadItemInfo() {
  api.get('/item/id?itemid=' + itemid.value).then(res => {
    itemDetail.value = res.data
    //@ts-ignore
    itemDetail.value.createtime = itemDetail.value.createtime.slice(5, 10)
  })
}

//获取图片
function loadImginfo() {
  api.get('/file/id?itemid=' + itemid.value).then(res => {
    imgDetail.value = res.data

  })
}

//获取出价
function loadAuction() {
  api.get('/auction/queryItem/' + itemid.value).then(res => {
    Auction.value = res.data
  })
}

//获取全部父级评论
function loadFComment() {
  api.get('/comment/f?itemid=' + itemid.value).then(res => {
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createtime = res.data[i].createtime.slice(5, 10)
    }
    FComment.value = res.data
  })
}

//获取子集评论
function handleEComment(value: any, indexX: any) {
  api.get('comment/e?commentid=' + value).then(res => {
    //@ts-ignore
    EComment.value[indexX] = res.data
  })
}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    loadPage()
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

//回复评论
function handleReply(value: any) {
  $dialog.create({
    title: '回复评论',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: false,
    position: "bottom"
  }).onOk(data => {
    // console.log('>>>> OK, received', data)
    console.log(itemid.value)
    console.log(data)
    api.post('/comment/', {"itemid": itemid.value, "content": data}).then(res => {
      if (res.code == "200") {
        CommSeccess("发送成功")
        $router.go(0)
      }
    })
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    CommSeccess("不发就不发，ㄟ( ▔, ▔ )ㄏ ！")
  })
}
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