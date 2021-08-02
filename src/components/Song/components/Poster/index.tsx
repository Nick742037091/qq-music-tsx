import { computed, defineComponent } from 'vue'
import styles from './poster.module.less'
const DEFAULT_POSTER = 'src/assets/img_poster_default.png'

export default defineComponent({
  setup() {
    const posterStyle = computed(() => {
      // const backgroundImg = url.value || DEFAULT_POSTER
      const backgroundImg = DEFAULT_POSTER
      return {
        backgroundImage: `url(${backgroundImg})`
      }
    })
    return () => (
      <div class={styles.poster} style={posterStyle.value}>
        <div class={styles['poster-container']}></div>
      </div>
    )
  }
})
