<template>
  <div class="q-pa-md q-gutter-sm">
    <!--  信息输入框  -->
    <q-input outlined v-model="uploadItem.title.value" label="标题" :rules="[val => !!val || '* 标题不能为空',]">
      <template v-if="uploadItem.title.value" v-slot:append>
        <q-icon name="cancel" @click.stop="uploadItem.title.value = null" class="cursor-pointer"/>
      </template>
    </q-input>
    <q-input
        prefix="￥"
        v-model.number="uploadItem.price.value"
        type="number"
        label="价格"
        outlined
        placeholder="0~9999"
        :rules="[
          val => !!val || '* 价格不能为空',
          val => val>0 && val<9999 || '价格范围0~9999',
          ]"
    />
    <div class="row q-mb-md">
      <div class="col">
        <q-select outlined @update:model-value="handleNname" v-model="Pnow" :options="PSort" label="分类"
                  class="q-mr-sm"/>
      </div>
      <div class="col">
        <q-select outlined v-model="Nnow" :options="NSort" class="q-ml-sm" label="分类"/>
      </div>
    </div>
    <q-input
        v-model="uploadItem.description.value"
        outlined
        type="textarea"
        label="描述"
        placeholder="新旧情况、来源、数量、使用时间、瑕疵等"
    >
      <template v-if="uploadItem.description.value" v-slot:append>
        <q-icon name="cancel" @click.stop="uploadItem.description.value = null" class="cursor-pointer"/>
      </template>
    </q-input>
    <!--图片上传-->
    <q-uploader
        url="http://192.168.31.100:8000/file/upload"
        label="图片上传"
        multiple
        color="primary"
        style="width: 98%"
        max-file-size="10485760"
        max-files="10"
        auto-upload
        field-name="file"
        :form-fields="[{name:'userid',value:userInfo.userid}]"
        @uploaded="ImgInfo"
        @failed="UploadFail"
        @rejected="upReject"
    />
    <!--  按钮  -->
    <div class="q-mt-md">
      <q-btn unelevated rounded style="float: right" color="primary" label="提交" @click="handleSumbit()"/>
      <q-btn unelevated rounded style="float: left" color="primary" @click="handleSave()" label="暂时保存"/>
    </div>
  </div>
  <!-- 空白站位 -->
  <div style="text-align: center">
    <div style="height:8vh">
    </div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfo, UploadItem} from "src/common/models";
import {ref} from "vue";
import {api} from "boot/axios";
import {CommFail, CommSeccess} from "src/common/common";
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
let uploadItem = new UploadItem()
let uploadItemHC = new UploadItem()
let userInfo = getUserInfo()
let formData = new FormData()
let piclist: any = ref([])
let PSort = ref([])
let NSort = ref([])
let Pnow = ref('请选择')
let Nnow = ref()

loadItem()
getPsort()

//加载草稿
function loadItem() {
  if (localStorage.getItem('uploadItem') == null || localStorage.getItem('uploadItem') == '') {
  } else {
    //@ts-ignore
    uploadItemHC = JSON.parse(localStorage.getItem('uploadItem'))
    //@ts-ignore
    uploadItem.title.value = uploadItemHC.title._value
    //@ts-ignore
    uploadItem.price.value = uploadItemHC.price._value
    //@ts-ignore
    uploadItem.description.value = uploadItemHC.description._value
  }
}


//获取上传图片回调，得到上传图片id
function ImgInfo(info: any) {
  CommSeccess('上传成功')
  piclist.value.push(JSON.parse(info.xhr.response).data.id)
}

function UploadFail(info: any) {
  CommFail('图片上传失败:' + info)
  console.log(info)
}

function upReject(rejectedEntries: any) {
  CommFail('拒绝上传:' + rejectedEntries)
  console.log(rejectedEntries)
}

//上传图片
function handleSumbit() {
  var data = new FormData();
  data.append("title", uploadItem.title.value)
  data.append("userid", userInfo.userid)
  data.append("description", uploadItem.description.value)
  data.append("price", uploadItem.price.value)
  data.append("sort", Nnow.value)
  //@ts-ignore
  data.append("piclist", piclist.value)
  api.post("/item/uploadAll", data).then(res => {
        if (res.code == "200") {
          CommSeccess('上传成功')
          uploadItem.clear();
          localStorage.setItem('uploadItem', '')
          setTimeout(() => {
            $router.go(0)
          }, 1000)
        }
      }
  )
}


//获取父级分类
function getPsort() {
  api.get('/sort/p').then(res => {
    res.data.forEach((item: any) => {
      //@ts-ignore
      PSort.value.push(item.name);
    })
  })
}

//保存草稿
function handleSave() {
  localStorage.setItem('uploadItem', JSON.stringify(uploadItem))
  CommSeccess("注意：图片不会保存")
}

//获取子集分类
function handleNname(value: any) {
  NSort.value.splice(0, NSort.value.length)
  api.get('/sort/pn?name=' + value).then(res => {
    res.data.forEach((item: any) => {//@ts-ignore
      NSort.value.push(item.name)
    })
  })
}
</script>

<style scoped>

</style>
