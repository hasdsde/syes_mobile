<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="['hey, how are you? ']"
          stamp="7 minutes ago"
          sent
          text-sanitize
          name-sanitize
          bg-color="amber-7"
      />
      <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
          text-color="white"
          bg-color="primary"
          text-sanitize
          name-sanitize
      />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>