<template>
  <div class="q-pa-md q-gutter-sm" id="building">
    <div class="q-pa-md q-gutter-sm alpahBG" style="height: 22rem;border-radius: 2%">
      <div class="text-h4">登录</div>
      <q-separator/>
      <div>
        <br>
        <q-input outlined v-model="userinfo.userid.value" label="学号" ref="userinfo.useridRef.value" :rules="idRules">
          <template v-if="userinfo.userid.value" v-slot:append>
            <q-icon name="cancel" @click.stop="userinfo.userid.value = null;userinfo.password.value = null"
                    class="cursor-pointer"/>
          </template>
        </q-input>
        <br>
        <q-input outlined v-model="userinfo.password.value" label="密码" :type="isPwd ? 'password' : 'text'"
                 ref="userinfo.passwordRef.value" :rules="nameRules">
          <template v-slot:append>
            <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <br>
        <q-btn color="primary" rounded class="float-right" label="登录" @click="handleLogin"/>
        <q-btn color="secondary" rounded class="float-left" label="注册"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UserInfo} from "src/common/models";
import {CommFail, CommSeccess} from "src/common/common";
import {api} from "boot/axios";
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
const userinfo = new UserInfo();
const isPwd = ref(true)
let nameRules = ref([(val: string | any[]) => (val && val.length > 0) || '输入值为空'])
let idRules = ref([
  (val: number) => (val > 20191111111 && val < 20229999999) || '请输入正确的学号'
])

//登录验证
function handleLogin() {
  localStorage.clear()
  if (userinfo.userid.value && userinfo.password.value) {
    api.post("/user/login", {
      "userid": userinfo.userid.value,
      "password": userinfo.password.value
    }).then(res => {
      CommSeccess("登录成功")
      localStorage.setItem("token", JSON.stringify(res.data.token))
      delete res.data.token
      localStorage.setItem("userinfo", JSON.stringify(res.data))
      $router.push('/Home')
    })
  } else {
    CommFail('用户名或密码为空')
  }
}
</script>
<style scoped>
#building {
  background-image: linear-gradient(to bottom right, #EAD6EE, #A0F1EA);
  width: 102%;
  height: 101%;
  position: fixed;
  background-size: cover;
}

.alpahBG {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>