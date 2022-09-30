<template>
  <div style="max-width: 100%">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="250" :disable="noData" debounce="1000">
        <!--  未读消息  -->
        <q-list bordered>
          <q-item-label header v-if="unReadMessage==null">未读消息</q-item-label>
          <q-item v-for="item in unReadMessage" class="q-mb-sm" clickable v-ripple @click="handleLink(item.infoid)">
            <q-item-section avatar>
              <q-avatar>
                <img :src="item.avatar">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.nickname }}</q-item-label>
              <q-item-label caption lines="1">{{ item.cont }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge rounded color="red" :label="item.count"/>
            </q-item-section>
          </q-item>
          <!--   历史消息   -->
          <q-separator/>
          <q-item-label header>历史消息</q-item-label>
          <q-item v-for="item in chatHisMessage"
                  class="q-mb-sm" clickable v-ripple @click="handleLink(item.infoid)">
            <q-item-section avatar>
              <q-avatar>
                <img :src=" item.avatar
          ">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.nickname }}</q-item-label>
              <q-item-label caption lines="1">{{ item.cont }}</q-item-label>
            </q-item-section>
            <q-item-section side>
            </q-item-section>
          </q-item>
        </q-list>
      </q-infinite-scroll>
      ]
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router/dist/vue-router";
import {getUserInfo, UserChatInfo} from "src/common/models";
import {api} from "boot/axios";
import {ref} from "vue";
import {CommSeccess} from "src/common/common";

const unReadMessage = ref()//这个有问题啊
const chatHisMessage = ref([])
const $router = useRouter()
let pageSize = ref(6)
let noData = ref(false)
let currentPage = ref(0)
const offline = [{
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
}]


//末尾加载
function onLoad(index: any, done: any) {
  currentPage.value = currentPage.value + 1
  getChatHis()
  done();
}

//点击跳转
function handleLink(value: any) {
  $router.push("/chat?id=" + value)
}

//获取当前用户信息
let userInfo = new UserChatInfo()
userInfo = getUserInfo()
getNews()

//获取未读信息
function getNews() {
  api.get('/chat/new').then(res => {
    unReadMessage.value = res.data
  })
}


//获取历史消息
function getChatHis() {
  api.get('/chat/ChatHis?CurrentPage=' + currentPage.value + '&PageSize=' + pageSize.value).then(res => {
    if (res.data.length == 0) {
      noData.value = true
      CommSeccess('全部加载完成')
    } else {
      for (let i = 0; i < res.data.length; i++) {
        //@ts-ignore
        chatHisMessage.value.push(res.data[i])
      }
    }
  })
}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    //无所谓了已经
    $router.go(0)
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

</script>


<style scoped>

</style>
