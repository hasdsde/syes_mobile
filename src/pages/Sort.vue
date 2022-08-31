<template>
  <div>
    <q-splitter
        style="height: 100vh"
        v-model="splitterModel"
    >

      <template v-slot:before style="width: 20%">
        <q-tabs
            v-model="tab"
            vertical
            class="text-primary"
        >
          <q-tab name="mails" icon="mail" label="Mails"/>
          <q-tab name="alarms" icon="alarm" label="Alarms"/>
          <q-tab name="movies" icon="movie" label="Movies"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
            v-model="tab"
            swipeable
            vertical
            animated
            transition-prev="jump-up"
            transition-next="jump-down"
        >
          <q-tab-panel name="mails">
            <div class="text-h4 q-mb-md">Mails</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const tab = ref('mails')
const splitterModel = 20
</script>

<style scoped>

</style>
