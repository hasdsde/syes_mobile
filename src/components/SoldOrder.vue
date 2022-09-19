<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-pull-to-refresh @refresh="refresh" scroll-target=".my-card">
      <q-infinite-scroll @load="onLoad" :offset="100">
        <!--列表-->
        <q-list>
          <q-expansion-item
              expand-icon-toggle
              expand-separator
              default-opened
              expand-icon-class="no-padding"
              class="shadow-1 q-mt-md"
              v-for="item in itemInfos"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar square size="5rem">
                  <q-img :ratio="1/1" :src="item.url"/>
                </q-avatar>
              </q-item-section>
              <q-item-section class="q-pa-sm">
                <div>
                  <div>{{ item.title }}</div>
                  <span class="text-orange text-weight-bold">￥{{ item.price }} </span>
                  <span class="text-primary">{{ item.nickname }} </span>
                  <span class="text-caption text-grey">{{ item.createtime }}</span>
                </div>
              </q-item-section>
            </template>
            <q-card bordered class="rounded-borders">
              <q-card-section class="no-padding no-margin no-shadow">
                <!--步进器-->
                <q-stepper
                    v-model="item.status"
                    ref="stepper"
                    color="primary"
                    animated
                    class="no-margin no-padding no-shadow"
                >
                  <q-step
                      :name="1"
                      title="确认"
                      icon="settings"
                      :done="item.status > 1"
                  >
                    点击确认后进行线下交易
                  </q-step>

                  <q-step
                      :name="2"
                      title="线下交易"
                      icon="create_new_folder"
                      :done="item.status > 2"
                  >
                    交易完成后，点击按钮结束交易
                  </q-step>

                  <q-step
                      :name="3"
                      title="完成"
                      icon="add_comment"
                  >
                    <q-icon name="emoji_emotions" size="md" class="absolute-center" color="primary"></q-icon>
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation v-if="item.status!==3">
                      <q-btn @click="checkStatus(item.id)" color="primary" v-if="item.status===2"
                             label="确认交易"/>
                    </q-stepper-navigation>
                  </template>
                  <template v-slot:message>
                    <q-banner v-if="item.status === 1" class="bg-primary text-white q-px-lg">
                      请等待买家的确认...
                    </q-banner>
                    <q-banner v-else-if="item.status === 2" class="bg-primary text-white q-px-lg">
                      双方正在线下交易...
                    </q-banner>
                    <q-banner v-else-if="item.status === 3" class="bg-green-8 text-white q-px-lg">
                      交易完成
                    </q-banner>
                  </template>
                </q-stepper>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <!--   空白站位   -->
        <div style="text-align: center">
          <q-spinner-dots v-if="!noData" color="primary" size="40px"/>
          <p class=" q-mt-lg text-caption text-grey-7">没有更多内容</p>
          <div style="height:1vh">
          </div>
        </div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {api} from "boot/axios";
import {CommSeccess} from "components/common";
import {Notify} from "quasar";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)
let $router = useRouter()
let noData = ref(false)

//加载页面
function loadPage() {
  api.get('/about/SoldOrder?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    res.data.forEach((item: { createtime: string; }) => {
      //@ts-ignore
      item.createtime = item.createtime.slice(5, 16).replace('T', ' ')
    })
    if (res.data.length == 0) {
      CommSeccess('全部加载完成')
      noData.value = true
    } else {
      for (let i = 0; i < res.data.length; i++) {//@ts-ignore
        itemInfos.value.push(res.data[i])
      }
    }
  })
}

//末尾加载
function onLoad(index: any, done: any) {
  setTimeout(() => {
    if (noData.value == false) {
      currentPage.value = currentPage.value + 1
      loadPage()
    }
    done();
  }, 1000)

}

//下拉刷新
function refresh(done: () => void) {
  setTimeout(() => {
    itemInfos.value = []
    currentPage.value = 1
    loadPage()
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

//切换状态
function checkStatus(value1: any) {
  Notify.create({
    message: '确定吗',
    type: 'positive',
    position: 'top',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => {
          api.get('/order/status2?id=' + value1).then(res => {
            $router.go(0)
          })
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })

}

//点击跳转
function handleLink(value: any) {
  $router.push("item?id=" + value)
}
</script>

<style scoped>

</style>