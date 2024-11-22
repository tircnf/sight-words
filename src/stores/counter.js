import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const kinderWords = ['hello', 'hi', 'hey', 'howdy'];
  const firstGradeWords = ['apple', 'banana', 'carrot', 'dog'];



  return { count, doubleCount, increment }
})
