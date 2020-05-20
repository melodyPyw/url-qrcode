<template>
  <div id="app">
    <vue-qrcode v-if="url" :width="200" :height="200" :value="url" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import VueQrcode from 'vue3-qrcode'

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
      if (window.chrome.tabs) {
        window.chrome.tabs.getSelected(null, function (tab) {
            changUrl(tab.url)
        });
      }
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
