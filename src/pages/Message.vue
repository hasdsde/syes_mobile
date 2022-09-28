<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      消息阅读后即可删除消息
      <template v-slot:action>
        <q-btn flat color="white" label="关闭提示"/>
      </template>
    </q-banner>
  </div>
  <div style="max-width: 100%">
    <!--  未读消息  -->
    <q-list bordered>
      <q-item-label header>未读消息</q-item-label>
      <q-item v-for="item in unReadMessage" class="q-mb-sm" clickable v-ripple @click="handleLink">
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
      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="text-grey-8 q-gutter-md">
            <q-btn flat dense round icon="delete_forever"/>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router/dist/vue-router";
import {getUserInfo, UserChatInfo} from "src/common/models";
import {api} from "boot/axios";
import {ref} from "vue";

const unReadMessage = ref(new UserChatInfo())
const $router = useRouter()
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

function handleLink() {
  $router.push("/chat?id=11")
}

//获取当前用户信息
let userInfo = new UserChatInfo()
userInfo = getUserInfo()

//获取未读信息
getNews()

function getNews() {
  api.get('/chat/new').then(res => {
    unReadMessage.value = res.data
  })
}
</script>


<style scoped>

</style>
