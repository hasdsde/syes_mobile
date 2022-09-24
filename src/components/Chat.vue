<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="['hey, how are you? ']"
          stamp="7 minutes ago"
          sent
          text-sanitize
          name-sanitize
          bg-color="amber-7"
      />
      <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
          text-sanitize
          name-sanitize
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserChatInfo} from "src/common/models";
import {CommFail} from "src/common/common";
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
let userinfo = new UserChatInfo()
getUserinfo()

function getUserinfo() {
  if (localStorage.getItem("userinfo")) {
    userinfo = JSON.parse(localStorage.getItem("userinfo"))
    console.log(userinfo)
  } else {
    CommFail('用户信息获取失败')
    $router.push("/login")
  }
}

</script>

<style scoped>

</style>