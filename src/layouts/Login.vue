<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="q-pa-md q-gutter-sm bg-grey-3" style="height: 19rem">
      <div class="text-h4">登录</div>
      <q-separator/>
      <div>
        <br>
        <q-input outlined v-model="userinfo.userid" label="学号">
          <template v-if="userinfo.userid" v-slot:append>
            <q-icon name="cancel" @click.stop="userinfo.userid = null;userinfo.password = null" class="cursor-pointer"/>
          </template>
        </q-input>
        <br>
        <q-input outlined v-model="userinfo.password" label="密码" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <br>
        <q-btn color="primary" rounded class="float-right" label="登录"/>
        <q-btn color="secondary" rounded class="float-left" label="注册"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UserInfo} from "components/models";

const userinfo = new UserInfo();
const isPwd = ref(true)
</script>
<style scoped>

</style>