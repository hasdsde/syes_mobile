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
          <q-btn flat color="negative" class="float-right" @click="logout()" label="退出"/>
        </template>
      </q-banner>
      <q-tabs
          class="text-grey-9"
          indicator-color="transparent"
      >
        <div class="row" style="width: 100%">
          <div class="col">
            <q-route-tab name="star" icon="star_border" to="/MyCollection" :label="'收藏   '+aboutCount.collect"/>
          </div>
          <div class="col">
            <q-route-tab name="alarms" icon="history" to="/MyHistory" :label="'历史 '+aboutCount.history"/>
          </div>
          <div class="col">
            <q-route-tab name="attention" icon="comment" to="/MyComment" :label="'评论 '+aboutCount.comment"/>
          </div>
          <div class="col">
            <q-route-tab name="more" icon="more_horiz" label="更多"/>
          </div>
        </div>


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
          <q-route-tab style="padding: 0 0.3rem" name="uploadItem" icon="unarchive" label="我发布的" to="/Posted">
            <q-badge rounded text-color="primary" color="white" floating>{{ aboutCount.post }}</q-badge>
          </q-route-tab>
          <q-route-tab style="padding: 0 0.3rem" name="soldItem" icon="paid" label="我的出价" to="/Auction">
            <q-badge text-color="primary" color="white" floating>{{ aboutCount.auction }}</q-badge>
          </q-route-tab>
          <q-route-tab style="padding: 0 0.3rem" name="getItem" icon="shopping_cart" label="我买入的"
                       to="/BuyOrder">
            <q-badge color="primary" floating>{{ aboutCount.orders }}</q-badge>
          </q-route-tab>
          <q-route-tab style="padding: 0 0.3rem" name="userChat" icon="shopping_basket" label="我卖出的"
                       to="/SoldOrder">
            <q-badge color="primary" floating>{{ aboutCount.sold }}</q-badge>
          </q-route-tab>
        </q-tabs>
      </q-banner>
    </div>
    <!--  第三部分  -->
    <div class="bg-white q-mt-md" style="border-radius: 2%">
      <q-list>
        <q-item clickable v-ripple.early @click="goRolling()">
          <q-item-section avatar>
            <q-icon color="primary" name="motion_photos_on"/>
          </q-item-section>
          <q-item-section>[测试]抽卡吃饭</q-item-section>
        </q-item>
        <q-item clickable v-ripple.early>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle"/>
          </q-item-section>
          <q-item-section>用户信息设置</q-item-section>
        </q-item>
        <q-item clickable v-ripple.early>
          <q-item-section avatar>
            <q-icon color="primary" name="settings"/>
          </q-item-section>
          <q-item-section>系统设置</q-item-section>
        </q-item>
        <q-item clickable v-ripple.early @click="OpenSource=true">
          <q-item-section avatar>
            <q-icon color="primary" name="fa-brands fa-github"/>
          </q-item-section>
          <q-item-section>开源/贡献者</q-item-section>
        </q-item>
        <q-item clickable v-ripple.early @click="About=true">
          <q-item-section avatar>
            <q-icon color="primary" name="info"/>
          </q-item-section>
          <q-item-section>关于</q-item-section>
        </q-item>

      </q-list>
    </div>
    <!--  一些弹窗内容  -->
    <q-dialog v-model="OpenSource">
      <q-card>
        <q-card-section>
          <div class="text-h6">开源/贡献者</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>后端仓库: <p> https://github.com/hasdsde/syes_springboot</p></div>
          <div>后台仓库: <p> https://github.com/hasdsde/syes_quasra</p></div>
          <div>前台仓库: <p> https://github.com/hasdsde/syes_mobile</p></div>
          <span>期待各位的star奥！</span>
          <span class="text-orange">{{ 'Ciallo～(∠·ω< )⌒★' }} </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="关闭" color="primary" v-close-popup @click="CommWarn('Ciallo～(∠·ω< )⌒★')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="About">
      <q-card>
        <q-card-section>
          <div class="text-h6">关于</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
          labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {getUserInfo, UserInfo} from "src/common/models";
import {CommWarn} from "src/common/common";
import {useRouter} from "vue-router/dist/vue-router";
import {Notify} from "quasar";
import {api} from "boot/axios";


const $router = useRouter()
const About = ref(false)
const OpenSource = ref(false)
const userinfo: UserInfo = ref(getUserInfo())

class AboutCount {
  collect = 0
  history = 0
  comment = 0
  post = 0
  auction = 0
  orders = 0
  sold = 0
}

let aboutCount = ref(AboutCount)
//我对此表示无语
//@ts-ignore
aboutCount.value.collect = 0//@ts-ignore
aboutCount.value.history = 0//@ts-ignore
aboutCount.value.comment = 0//@ts-ignore
aboutCount.value.post = 0//@ts-ignore
aboutCount.value.auction = 0//@ts-ignore
aboutCount.value.orders = 0//@ts-ignore
aboutCount.value.sold = 0//@ts-ignore
getAboutCount()

//获取图标信息
function getAboutCount() {
  api.get('/itemHome/About').then(res => {
    aboutCount.value = res.data
  })
}

//退出

function logout() {
  Notify.create({
    message: '确定要退出吗？',
    color: 'red',
    icon: 'warning',
    position: 'top',
    actions: [
      {
        label: '确定', color: 'yellow', handler: () => { /* ... */
          localStorage.clear()
          $router.push('/login')
        }
      },
      {
        label: '取消', color: 'white', handler: () => { /* ... */
        }
      }
    ]
  })

}

function goRolling() {
  console.log('触发啊')
  $router.push('/rolling')
}
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