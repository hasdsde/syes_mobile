<template>
  <div class="q-pa-md q-gutter-sm" id="building">
    <!--  第一部分  -->
    <div>
      <q-banner style="background-color: rgba(0,0,0,0)">
        <template v-slot:avatar>
          <q-avatar>
            <img :src="userinfo.avatar" alt="">
          </q-avatar>
          {{ userinfo.username }}
        </template>
        <template v-slot:default class="justify-start" style="margin-left: 0;margin-right: auto">
          <q-btn flat color="negative" class="float-right" label="退出"/>
        </template>
      </q-banner>
      <q-tabs
          class="text-grey-9"
          indicator-color="transparent"
      >
        <q-tab name="star" icon="star_border" label="收藏"/>
        <q-tab name="alarms" icon="history" label="历史"/>
        <q-tab name="attention" icon="add_link" label="关注"/>
        <q-tab name="more" icon="more_horiz" label="更多"/>
      </q-tabs>
    </div>

    <!--  第二部分  -->
    <div>
      <q-banner rounded class="bg-white">
        <div>订单操作</div>
        <q-tabs
            class="text-primary justify-between"
            indicator-color="transparent"
        >
          <q-tab style="padding: 0 0.3rem" name="uploadItem" icon="unarchive" label="我发布的"/>
          <q-tab style="padding: 0 0.3rem" name="soldItem" icon="paid" label="我卖出的"/>
          <q-tab style="padding: 0 0.3rem" name="getItem" icon="shopping_cart" label="我买入的"/>
          <q-tab style="padding: 0 0.3rem" name="userChat" icon="chat" label="我的评论"/>
        </q-tabs>
      </q-banner>
    </div>
    <!--  第三部分  -->
    <div class="bg-white q-mt-md" style="border-radius: 2%">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle"/>
          </q-item-section>
          <q-item-section>用户信息设置</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="settings"/>
          </q-item-section>
          <q-item-section>系统设置</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-brands fa-github"/>
          </q-item-section>
          <q-item-section>开源/贡献者</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="info"/>
          </q-item-section>
          <q-item-section>关于</q-item-section>
        </q-item>

      </q-list>
    </div>
    <!--  一些弹窗内容  -->

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getUserInfo, UserInfo} from "components/models";

const userinfo: UserInfo = ref(getUserInfo())

</script>

<style scoped>
#building {
  background-image: linear-gradient(to bottom, rgb(244, 254, 255), rgb(238, 238, 238));
  width: 102%;
  height: 101%;
  position: fixed;
  background-size: cover;
}
</style>