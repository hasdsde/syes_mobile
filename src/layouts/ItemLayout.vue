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
            <q-breadcrumbs-el :label="positions.label" :icon="positions.icon"/>
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
      <router-view/>
    </q-page-container>
    <!--  底部栏  -->
    <q-footer class="bg-white text-black" style="height: 5.5%;align-self: auto;">
      <div class="row q-pa-xs ">
        <!--    点赞   -->
        <div class="col q-pt-xs">
          <q-btn flat rounded :color="FuncButton.iflike===1? 'primary':'grey-7' " icon="thumb_up"
                 @click="handleZAN()">
            <q-badge color="grey-1" text-color="grey-7" floating>{{ FuncButton.likes }}</q-badge>
          </q-btn>
        </div>
        <!--    收藏    -->
        <div class="col col q-pt-xs">
          <q-btn flat rounded :color="FuncButton.ifcollect===1? 'yellow':'grey-7' " icon="star" @click="handleSC()">
            <q-badge color="grey-1" text-color="grey-7" floating>{{ FuncButton.collects }}</q-badge>
          </q-btn>
        </div>
        <!--    评论    -->
        <div class="col col q-pt-xs">
          <q-btn flat rounded color="primary " icon="textsms" @click="handleComment()">
            <q-badge color="grey-1" text-color="grey-7" floating>{{ FuncButton.comments }}</q-badge>
          </q-btn>
        </div>
        <div class="col-3">
        </div>
        <div class="col-4">
          <q-btn unelevated rounded class="float-right q-mr-xs" color="amber" label="出价" icon="monetization_on"/>
        </div>
      </div>
    </q-footer>
  </q-layout>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {Allmenus} from "components/models";
import {useRouter} from "vue-router/dist/vue-router";
import {api} from "boot/axios";
import {BottomSeccess, CommSeccess} from "components/common";
import {Dialog} from "quasar";

let $router = useRouter()
const leftDrawerOpen = ref(false)
const tab = ref(false)
const link = ref('')
let positions = ref()
let menu = ref(Allmenus)
const itemid = ref()
let $dialog = Dialog
const FuncButton = ref({
  "collects": '',
  'comments': '',
  'likes': '',
  'iflike': '',
  'ifcollect': ''
})

//监测网址操作，返回物品id
watch(() => $router.currentRoute.value.query, (newValue, oldValue) => {
  itemid.value = newValue.id
}, {immediate: true})

//侧栏开关
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

loadFunc()

//加载功能按钮
function loadFunc() {
  api.get('/userlike/queryByItemId?itemid=' + itemid.value).then(res => {
    FuncButton.value = res.data
  })
}

//点赞
function handleZAN() {
  BottomSeccess('thumb_up', '赞')
  api.get('/userlike/change?itemid=' + itemid.value).then(res => {
        if (res.code == '200') {
          loadFunc()
        }
      }
  )
}

//收藏
function handleSC() {
  BottomSeccess('star', '收藏')
  api.get('/usercollect/change?itemid=' + itemid.value).then(res => {
        if (res.code == '200') {
          loadFunc()
        }
      }
  )
}

//新增评论
function handleComment() {
  $dialog.create({
    title: '发布新评论',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: false,
    position: "bottom"
  }).onOk(data => {
    // console.log('>>>> OK, received', data)
    console.log(itemid.value)
    console.log(data)
    api.post('/comment/', {"itemid": itemid.value, "content": data}).then(res => {
      if (res.code == "200") {
        CommSeccess("发送成功")
        $router.go(0)
      }
    })
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    CommSeccess("不发就不发，ㄟ( ▔, ▔ )ㄏ ！")
  })

}

//面包屑
watch(() => $router.currentRoute.value.path, (newValue, oldValue) => {
  positions.value = findTitle()
}, {immediate: true})

function findTitle() {
  for (let i = 0; i < Allmenus.length; i++) {
    if (menu.value[i].link == $router.currentRoute.value.path) {
      return menu.value[i]
    }
  }
}


</script>

<style scoped>
.my-menu-link {
  color: rgb(25, 118, 210);
  background: #F2C037
}

.bg-opacity {
  background-color: white;
  opacity: 0.6;
}
</style>