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
          <!--   这是右边   -->
          <q-chat-message
              :name="userinfo.username"
              :avatar="userinfo.avatar"
              :text="['hey, how are you? ']"
              stamp="7 minutes ago"
              sent
              text-sanitize
              name-sanitize
              bg-color="amber-7"
          />
          <!--   这是左边   -->
          <q-chat-message
              :name="chatUser.username.value"
              :avatar="chatUser.avatar.value"
              :text="['doing fine, how r you?']"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="primary"
              text-sanitize
              name-sanitize
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
          <q-input filled v-model="input" dense/>
        </div>
        <div class="col-2" style="width: 19%">
          <q-btn color="primary" class="float-right vertical-bottom" label="发送"/>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import {onUnmounted, ref, watch} from "vue";
import {Allmenus, getUserInfo, UserChatInfo, UserInfo} from "src/common/models";
import {useRouter} from "vue-router";
import {CommFail} from "src/common/common";
import {api} from "boot/axios";

const link = ref('')
let $router = useRouter()
const leftDrawerOpen = ref(false)
let positions = ref()
let menu = ref(Allmenus)
const input = ref()
let webSock: WebSocket
let Url = ''
const userinfo: UserInfo = ref(getUserInfo())
let chatUser = new UserChatInfo()
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

//获取历史消息

//下面是websocket
function initWebSocket(this: any) {
  if (typeof WebSocket === 'undefined') {
    CommFail('你的浏览器不支持Websocket,不能使用该功能')
    return
  } else {
    Url = "ws://localhost:8000/chatServer/" + userinfo.userid.value;
    webSock = new WebSocket(Url);
  }
}

//路由关闭时关闭连接
onUnmounted(() => {
  // webSock.close()
})
</script>

<style scoped>

</style>