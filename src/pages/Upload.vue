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
    <q-select outlined @update:model-value="handleNname" v-model="uploadItem.sort.value" :options="PSort" label="分类"/>
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
        url="http://localhost:8000/file/upload"
        label="图片上传"
        multiple
        color="primary"
        style="width: 98%"
        max-file-size="1048576"
        max-files="10"
        auto-upload
        field-name="file"
        :form-fields="[{name:'userid',value:userInfo.userid}]"
        @uploaded="ImgInfo"
    />
    <!--  按钮  -->
    <div class="q-mt-md">
      <q-btn unelevated rounded style="float: right" color="primary" label="提交" @click="handleSumbit()"/>
      <q-btn unelevated rounded style="float: left" color="primary" @click="handleSave()" label="暂时保存"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import {getUserInfo, UploadItem} from "components/models";
import {ref} from "vue";
import {api} from "boot/axios";
import {CommSeccess} from "components/common";
import {useRouter} from "vue-router/dist/vue-router";

const $router = useRouter()
let uploadItem = new UploadItem()
let uploadItemHC = new UploadItem()
let userInfo = getUserInfo()
let formData = new FormData()
let piclist: any = ref([])
let PSort = ref([])
loadItem()

//加载草稿
function loadItem() {
  if (localStorage.getItem('uploadItem') == null || localStorage.getItem('uploadItem') == '') {
    console.log("没有草稿")
  } else {
    //@ts-ignore
    uploadItemHC = JSON.parse(localStorage.getItem('uploadItem'))
    //@ts-ignore
    uploadItem.title.value = uploadItemHC.title._value
    //@ts-ignore
    uploadItem.price.value = uploadItemHC.price._value
    //@ts-ignore
    uploadItem.description.value = uploadItemHC.description._value
    console.log(uploadItem)
  }
}


//获取上传图片回调，得到上传图片id
function ImgInfo(info: any) {
  piclist.value.push(JSON.parse(info.xhr.response).data.id)
}

//上传图片
function handleSumbit() {
  var data = new FormData();
  data.append("title", uploadItem.title.value)
  data.append("userid", userInfo.userid)
  data.append("description", uploadItem.description.value)
  data.append("price", uploadItem.price.value)
  data.append("sort", uploadItem.sort.value)
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

getPsort()

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
  console.log(value)
  console.log(uploadItem.sort.value)
}
</script>

<style scoped>

</style>
