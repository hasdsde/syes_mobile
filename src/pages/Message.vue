<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner class="bg-primary text-white">
      消息阅读后即可删除消息
      <template v-slot:action>
        <q-btn flat color="white" label="关闭提示"/>
      </template>
    </q-banner>
  </div>
  <div style="max-width: 100%">
    <!--  未读消息  -->
    <q-list bordered>
      <q-item-label header>未读消息</q-item-label>
      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge rounded color="red" label="1"/>
        </q-item-section>
      </q-item>
      <!--   历史消息   -->
      <q-separator/>
      <q-item-label header>历史消息</q-item-label>
      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="text-grey-8 q-gutter-md">
            <q-btn flat dense round icon="delete_forever"/>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">

const offline = [{
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
}]
</script>

<style scoped>

</style>
