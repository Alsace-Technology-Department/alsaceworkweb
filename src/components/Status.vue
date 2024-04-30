<script setup>
import {onMounted, reactive} from 'vue';
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

onMounted(async () => {
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
  <div
      v-if="serverStatus"
      :class="`group p-6 sm:p-8 rounded-3xl border dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl ${serverStatus.status === 'online' ? 'bg-white text-green-500' : serverStatus.status === 'offline' ? 'bg-white text-red-500' : 'bg-white text-yellow-500'}`"
  >
    <h3 :class="`text-2xl font-semibold ${serverStatus.status === 'online' ? 'text-green-500' : serverStatus.status === 'offline' ? 'text-red-500' : 'text-yellow-500'}`">
      {{ props.serverName }}
    </h3>
    <p class="mt-6 mb-8 text-gray-600 dark:text-gray-300">
      {{
        serverStatus.status === 'online' ? '在线' : serverStatus.status === 'offline' ? '离线' : '检测中...'
      }} - Players: {{ serverStatus.players }}
    </p>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
