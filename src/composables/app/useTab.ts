import { ref } from 'vue'

export default () => {
  const tabIndex = ref(1)
  return {
    tabIndex,
  }
}
