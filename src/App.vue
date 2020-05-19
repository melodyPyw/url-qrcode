<template>
  <div id="app">
    <vue-qrcode v-if="url" :width="180" :height="180" :value="url" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import VueQrcode from './components/qrCode'

export default {
  components: {
    VueQrcode
  },
  setup() {
    const url = ref('')
    const changUrl = (value) => {
      url.value = value
    }
    onMounted(() => {
      window.chrome.tabs.getSelected(null, function (tab) {
          changUrl(tab.url)
      });
    })
    return {
      url,
      changUrl
    }
  },
}
</script>

<style>
#app {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
}
</style>
