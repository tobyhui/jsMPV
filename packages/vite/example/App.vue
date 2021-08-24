<template>
  <h1>Hello Vue</h1>
  <h2>
    <div>count is {{ count }}</div>
    <button @click="add">add</button>
  </h2>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(6)
    const add = () => {
      count.value++
    }
    return { count, add }
  }
}
</script>