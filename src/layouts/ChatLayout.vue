<template>
  <q-layout view="hHh Lpr lFf">
    <!--  顶部栏  -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
        />
        <!--顶栏-->
        <q-toolbar-title>
          <!--     面包屑     -->
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el :label="positions" :icon="positions.icon"/>
          </q-breadcrumbs>
        </q-toolbar-title>
        <q-icon name="search" size="sm"></q-icon>
      </q-toolbar>
    </q-header>
    <!--  侧栏  -->
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
    >
      <q-list>
        <q-item
            v-for="item in menu"
            clickable
            v-ripple
            :active="link === item.link"
            @click="link = item.link"
            active-class="my-menu-link"
            :to="item.link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon"/>
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
    <!--中间内容-->
    <q-page-container>
      <q-infinite-scroll @load="onLoad" reverse :offset="50" :disable="noData">
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"/>
          </div>
        </template>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <!--   详细信息   -->
            <q-chat-message
                v-for="item in chatInfo"
                :name="item.userid==userinfo.infoid?userinfo.username:chatUser.username.value"
                :avatar="item.userid==userinfo.infoid?userinfo.avatar:chatUser.avatar.value"
                :text="[item.content]"
                :stamp="item.createtime"
                :sent="item.userid==userinfo.infoid"
                text-sanitize
                name-sanitize
                :bg-color="item.userid==userinfo.infoid?'primary':'secondary'"
            />
          </div>
        </div>
      </q-infinite-scroll>
    </q-page-container>
    <!--  底部栏  -->
    <q-footer class="bg-white text-black" style="height: 3rem;align-self: auto;">
      <div class="row  ">
        <div class="col-2" style="width: 13%">
          <q-btn icon="add" class="float-right q-mr-sm" round color="primary" size="md"></q-btn>
        </div>
        <div class="col-8">
          <q-input filled v-model="context" dense @keydown.enter="handleSend"
                   @focus="handleButtom()"/>
        </div>
        <div class="col-2" style="width: 19%">
          <q-btn color="primary" class="float-right vertical-bottom" label="发送" @click="handleSend"/>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {Allmenus, getUserInfo, UserChatInfo} from "src/common/models";
import {useRouter} from "vue-router";
import {CommFail, CommSeccess} from "src/common/common";
import {api} from "boot/axios";
import {scroll} from 'quasar'

const link = ref('')
let $router = useRouter()
const leftDrawerOpen = ref(false)
let positions = ref()
let menu = ref(Allmenus)
const context = ref()
let pageSize = ref(6)
let currentPage = ref(1)
let webSock: WebSocket
let Url = ''
const userinfo: UserChatInfo = getUserInfo()
let chatUser = new UserChatInfo()
let chatInfo = ref([]) //所有的聊天消息
let nowMessage: any = {} //临时消息
let noData = ref(false);//查看历史消息已经查询完毕
const {getVerticalScrollPosition, setVerticalScrollPosition} = scroll
getChatUserinfo()

//侧栏开关
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

//面包屑
watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  positions.value = '魔理沙'
}, {immediate: true})


//获取聊天用户信息
function getChatUserinfo() {
  //@ts-ignore
  chatUser.infoid.value = $router.currentRoute.value.query.id
  api.get("/user/getinfo/" + chatUser.infoid.value).then(res => {
    chatUser.username.value = res.data.nickname
    chatUser.avatar.value = res.data.avatar
  })
}

getHisChat()

//获取历史消息
function getHisChat() {
  api.post('/chat/his', {
    "userid": userinfo.infoid,
    "touserid": chatUser.infoid.value,
    "pageSize": pageSize.value,
    "currentPage": currentPage.value,
  }).then(res => {
    if (res.data.length == 0) {
      noData.value = true
      CommSeccess("全部已经加载完成")
    } else {
      res.data.forEach((item: any) => {
        item.createtime = item.createtime.replace('T', ' ').slice(5.10)
      })
      res.data.forEach((item: any) => {
        //@ts-ignore
        chatInfo.value.unshift(item)
      })
    }
  })
}

//上拉加载新页面
function onLoad(index: any, done: any) {
  setTimeout(() => {
    if (!noData.value) {
      console.log("触发刷新")
      currentPage.value = currentPage.value + 1
      setVerticalScrollPosition(window, 60, 100)
      getHisChat()
    }
    done()
  }, 2000)

}


initWebSocket()

//websocket初始化
function initWebSocket(this: any) {
  if (typeof WebSocket === 'undefined') {
    CommFail('你的浏览器不支持Websocket,不能使用该功能')
    return
  } else {
    Url = "ws://192.168.31.100:8000/chatServer/" + userinfo.infoid;
    console.log(Url)
    webSock = new WebSocket(Url);
    webSock.onopen = function () {
      CommSeccess("WebSocket已连接")
    }

  }
}

//@ts-ignore  接收消息
webSock.onmessage = function (msg) {
  nowMessage = JSON.parse(msg.data)
  nowMessage.createtime = nowMessage.createtime.replace('T', ' ')
  nowMessage.createtime = nowMessage.createtime.slice(5, 20)//@ts-ignore
  chatInfo.value.push(nowMessage)
  //有新消息自动滚到底部
  setVerticalScrollPosition(window, 1000, 800)

}

//发送
function handleSend() {
  if (context.value == '') {
    CommFail('消息不能为空')
  } else {
    webSock.send(JSON.stringify({
      "toUserId": chatUser.infoid.value,
      "context": context.value
    }))
    context.value = ''
  }

}

//@ts-ignore  接收消息
webSock.onerror = function (msg) {
  CommFail("出现错误" + msg)
}

//点击输入框后跳转到窗口底部
function handleButtom() {
  console.log("触发了")
  setVerticalScrollPosition(window, 9999, 1)
}
</script>

<style scoped>

</style>