import { defineComponent, onMounted } from 'vue'
import styles from './app.module.less'
import Header from '@/components/Header'
import Song from '@/components/Song'
import useTab from '@/composables/app/useTab'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  components: { Header, Song },
  setup() {
    const store = useStore()
    const { tabIndex } = useTab()

    onMounted(() => {
      store.dispatch('song/getSongList')
    })
    return () => (
      <div class={styles.app}>
        <Header v-model={[tabIndex.value, 'tabIndex']} />
        {/* v-if 不能再使用 */}
        {tabIndex.value === 1 && <Song />}
        {/* v-show 还可以用 */}
        {/* <Song v-show={tabIndex.value === 1} /> */}
      </div>
    )
  }
})
