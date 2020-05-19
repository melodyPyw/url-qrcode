<template>
  <div class="hello">
    {{count}}
    <button @click="handleAdd">add</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const handleAdd = () => {
      count.value++
    }
    return {
      count,
      handleAdd
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
