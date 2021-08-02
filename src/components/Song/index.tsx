import styles from './song.module.less'
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import Poster from './components/Poster'
import usePlayStatus from '@/composables/song/usePlayStatus'

export default defineComponent({
  components: { Poster },
  setup() {
    const store = useStore()
    // 定义元素为HTMLMediaElement
    const audio = ref<HTMLMediaElement>()
    const playStatus = usePlayStatus(audio)

    const audioUrl = computed(() => store.getters['song/songDetail'].url)
    const showPlayList = ref(false)

    return () => (
      <div class={styles.song}>
        <Poster />
      </div>
    )
  }
})
