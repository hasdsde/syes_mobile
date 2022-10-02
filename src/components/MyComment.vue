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
              <q-item-section class="q-pa-sm" @click="handleLink(item.id)">
                <div>
                  <div>{{ item.title }}</div>
                  <span class="text-primary">{{ item.nickname }} </span>
                  <span class="text-caption text-grey">{{ item.createtime }}</span>
                </div>
              </q-item-section>
            </template>
            <q-card bordered class="rounded-borders">
              <q-card-section class="no-padding no-margin no-shadow">
                <q-list v-for="commit in CommentList">
                  <q-item clickable v-ripple v-if="commit.id===item.id" @click="handleDelete(commit.cid)">
                    <span v-if="commit.id===item.id"></span>
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="commit.avatar">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-primary">{{ commit.nickname }} </span>回复：
                        <span class="text-primary">{{ commit.tousername }}</span>
                        <span class="no-margin text-caption text-grey-7 float-right">8月8日</span>
                      </q-item-label>
                      <q-item-label>
                        {{ commit.content }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <!--   空白站位   -->
        <div style="text-align: center">
          <q-spinner-dots v-if="!noData" color="primary" size="40px"/>
          <div class="text-caption text-grey text-center q-mt-md">点击评论以删除</div>
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
import {CommSeccess} from "src/common/common";
import {Notify} from "quasar";

let pageSize = ref(6)
let currentPage = ref(0)
let itemInfos = ref([])
let collect = ref(1)
let $router = useRouter()
let noData = ref(false)
let itemList = ref([])
let CommentList = ref([])

//加载页面
function loadPage() {
  api.get('/about/comment?pagesize=' + pageSize.value + '&currentpage=' + currentPage.value).then(res => {
    res.data.forEach((item: { createtime: string; }) => {
      //@ts-ignore
      item.createtime = item.createtime.slice(5, 16).replace('T', ' ')
    })
    if (res.data.length == 0) {
      CommSeccess('全部加载完成')
      noData.value = true
    } else {
      for (let i = 0; i < res.data.length; i++) {
        //@ts-ignore
        if (itemList.value.indexOf(res.data[i].id) == -1) {//@ts-ignore
          itemList.value.push(res.data[i].id)
          //@ts-ignore
          itemInfos.value.push(res.data[i])
        }
        //@ts-ignore
        CommentList.value.push(res.data[i])
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
    $router.go(0)
    //先清空内容
    CommSeccess("刷新")
    done()
  }, 1000)
}

//删除评论
function handleDelete(value: any) {
  Notify.create({
    message: '确定要删除这条评论吗',
    type: 'negative',
    position: 'top',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => {
          api.delete('/comment/u/' + value).then(res => {
            $router.go(0)
            loadPage()
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