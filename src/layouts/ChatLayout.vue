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
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <!--   详细信息   -->
          <q-chat-message v-for="item in chatInfo"
                          :name="item.userid===userinfo.infoid?userinfo.username:chatUser.username.value"
                          :avatar="item.userid===userinfo.infoid?userinfo.avatar:chatUser.avatar.value"
                          :text="[item.content]"
                          :stamp="item.createtime"
                          :sent="item.userid==userinfo.infoid"
                          text-sanitize
                          name-sanitize
                          :bg-color="item.userid==userinfo.infoid?'primary':'secondary'"
          />
        </div>
      </div>
    </q-page-container>
    <!--  底部栏  -->
    <q-footer class="bg-white text-black" style="height: 3rem;align-self: auto;">
      <div class="row  ">
        <div class="col-2" style="width: 13%">
          <q-btn icon="add" class="float-right q-mr-sm" round color="primary" size="md"></q-btn>
        </div>
        <div class="col-8">
          <q-input filled v-model="context" dense @keydown.enter="handleSend"/>
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
let chatInfo = ref([])
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
    res.data.forEach((item: any) => {
      item.createtime = item.createtime.replace('T', ' ').slice(5.10)
    })
    chatInfo.value = res.data.reverse()
  })
}

initWebSocket()

//下面是websocket
function initWebSocket(this: any) {
  if (typeof WebSocket === 'undefined') {
    CommFail('你的浏览器不支持Websocket,不能使用该功能')
    return
  } else {
    Url = "ws://localhost:8000/chatServer/" + userinfo.infoid;
    console.log(Url)
    webSock = new WebSocket(Url);
    webSock.onopen = function () {
      CommSeccess("WebSocket已连接")
    }

  }
}

webSock.onmessage = function (msg) {
  console.log(msg)
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


</script>

<style scoped>

</style>