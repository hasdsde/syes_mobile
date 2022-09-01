<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input outlined v-model="uploadItem.title.value" label="标题" :rules="[
          val => !!val || '* 标题不能为空',]">
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
    <q-uploader
        class="q-mt-lg"
        style="width: 98%"
        label="上传图片"
        auto-upload
        multiple
        accept=".jpg,.png,.webp,.bmp"
        max-file-size="1048576"
        max-files="10"
        :factory="factoryFn"
    />
    <div class="q-mt-md">
      <q-btn unelevated rounded style="float: right" color="primary" label="提交" @click="handleSumbit()"/>
      <q-btn unelevated rounded style="float: left" color="primary" label="暂时保存"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import {getUserInfo, UploadItem} from "components/models";
import {api} from "boot/axios";

const uploadItem = new UploadItem()
const userInfo = getUserInfo()
let formData = new FormData()

//上传图片
function factoryFn(files: any) {
  // returning a Promise
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i])
  }
  console.log(formData.getAll("file"))
}

function handleSumbit() {

  api.post("/file/upload", {formData},).then(res => {
    console.log(res)
  })
}
</script>

<style scoped>

</style>
