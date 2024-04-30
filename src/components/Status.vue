<script setup>
import {onServerPrefetch, reactive} from 'vue';
import {fetchServerStatus} from "../apis/ServerStatus";

const props = defineProps({
  serverIp: {
    type: String,
    default: 'alsace.work'
  },
  serverName: {
    type: String,
    default: '工业园'
  }
});

const serverStatus = reactive({
  status: 'checking',
  players: 0
})

onServerPrefetch(async () => {
  try {
    const data = await fetchServerStatus(props.serverIp);
    Object.assign(serverStatus, data);
  } catch (error) {
    console.error("Failed to fetch server status:", error);
    serverStatus.status = 'error';
    serverStatus.players = 0;
  }
});
</script>

<template>
  <div v-if="serverStatus" class="group p-6 sm:p-8 rounded-3xl border dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-2xl font-semibold text-black">
        {{ props.serverName }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        {{ props.serverIp }}
      </p>
      <div class="p-2 rounded-full w-1/6 text-center"
           :class="{
             'bg-green-500': serverStatus.status === 'online',
             'bg-yellow-500': serverStatus.status === 'checking',
             'bg-red-500': serverStatus.status === 'offline'
           }">
        <span class="text-white text-lg">
          {{ serverStatus.status === 'online' ? '在线' : serverStatus.status === 'offline' ? '离线' : '加载中' }}
        </span>
      </div>
    </div>
    <div v-if="serverStatus.status === 'online'">
      <p class="text-4xl text-gray-900">
        {{ serverStatus.players }}
      </p>
      <p class="text-gray-600 dark:text-gray-300">
        在线人数
      </p>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
