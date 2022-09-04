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
    {{ "piclist:" + piclist }}
    <div class="q-mt-md">
      <q-btn unelevated rounded style="float: right" color="primary" label="提交" @click="handleSumbit()"/>
      <q-btn unelevated rounded style="float: left" color="primary" label="暂时保存"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import {getUserInfo, UploadItem} from "components/models";
import {ref} from "vue";
import {api} from "boot/axios";
import {CommSeccess} from "components/common";

const uploadItem = new UploadItem()
let userInfo = getUserInfo()
let formData = new FormData()
let piclist: any = ref([])

function ImgInfo(info: any) {
  piclist.value.push(JSON.parse(info.xhr.response).data.id)
}

function handleSumbit() {
  var data = new FormData();
  data.append("title", uploadItem.title.value)
  data.append("userid", userInfo.userid)
  data.append("description", uploadItem.description.value)
  data.append("price", uploadItem.price.value)
  //@ts-ignore
  data.append("piclist", piclist.value)
  api.post("/item/uploadAll", data).then(res => {
        if (res.code == "200") {
          CommSeccess('操作成功')
        }
      }
  )
}
</script>

<style scoped>

</style>
