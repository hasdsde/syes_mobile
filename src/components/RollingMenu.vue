<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row">
      <q-select outlined v-model="optionNow" :options="options" style="width: 30vw" dense behavior="menu">
        <template v-slot:prepend>
          <q-icon name="event"/>
        </template>
      </q-select>
      <q-btn color="primary" label="筛选:关闭" class="q-ml-md"/>
      <q-btn color="primary" label="保底:关闭" class="q-ml-md"/>
    </div>
    <div style="text-align: center">
      <div class="roll  " ref="roll" id="rollCircle">
        <!--    这是那个圆盘    -->
      </div>
      <div>
        <div>当前数据 {{ number }}</div>
        <img class="pointer" src="src/css/pointer.png">
      </div>
      <q-btn color="primary" label="我的回合！" @click="MyRoll" class="q-ml-md"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";


const optionNow = ref('全部')
const options = ['全部', '一层', '二层', '三层']
const lineNum = 36
let roll: any;
let bgFragment: any;
let random = ref(0)
let allData = ref([])
let number = ref(0)
onMounted(() => {
  //设置虚线
  roll = document.getElementById('rollCircle')
  bgFragment = document.createDocumentFragment();
  api.get('/roll/enable').then(res => {
    allData.value = res.data
    generateShape()
  })
})


//生成图形
function generateShape() {
  for (let i = 0; i < lineNum; i++) {
    let bgItem = document.createElement('li');
    bgItem.style.backgroundColor = 'rgb(158, 158, 158)'
    let deg = (360 / lineNum) * i
    bgItem.style.transform = `rotate(${deg}deg)`;
    bgItem.style.transformOrigin = 'center'
    bgItem.style.position = 'absolute'
    bgItem.style.width = '45vw'
    bgItem.style.listStyle = 'none'
    bgItem.style.height = '1px'
    bgItem.style.transformOrigin = 'left'
    bgItem.style.top = '50%'
    bgItem.style.left = '50%'
    bgFragment.appendChild(bgItem);
  }
  //@ts-ignore
  roll.appendChild(bgFragment)
  //设置文字

  for (let i = 0; i < lineNum; i++) {
    let bgItem = document.createElement('li');
    bgItem.style.backgroundColor = 'rgb(158, 158, 158)'
    let deg = (360 / lineNum) * (i + 0.75)
    bgItem.style.transform = `rotate(${deg}deg)`;
    bgItem.style.transformOrigin = 'center'
    bgItem.style.position = 'absolute'
    bgItem.style.width = '0'
    bgItem.style.listStyle = 'none'
    bgItem.style.height = '0'
    bgItem.style.transformOrigin = 'left'
    bgItem.style.top = '50%'
    bgItem.style.left = '50%'
    bgItem.style.float = 'right'
    bgItem.textContent = '一一一 一二三四伍' + (i + 1)
    bgFragment.appendChild(bgItem);
  }
  //@ts-ignore
  roll.appendChild(bgFragment)
}

function MyRoll() {
  random = ref(Math.round(Math.random() * 2000 + 2000))
  //就算是个整数，也会有向上取整，大可放心
  roll.style.transition = '10s';
  roll.style.transform = `rotate(${random.value}deg)`;
  number.value = Math.ceil((360 - random.value % 360) / 10)
}

console.log(number)//在触发事件后输出

</script>

<style scoped>
.roll {
  position: relative;
  margin: 5vh auto;
  width: 90vw;
  height: 90vw;
  border-radius: 50%;
  border: 3px rgb(25, 118, 210) solid;
}

.pointer {
  width: 12vw;
  position: fixed;
  top: 56%;
  left: 44%;
}
</style>

