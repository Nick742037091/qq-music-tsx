import { defineComponent } from 'vue'
import styles from './app.module.less'
import Header from '@/components/Header'
import useTab from '@/composables/app/useTab'
export default defineComponent({
  name: 'App',
  components: { Header },
  setup() {
    const { tabIndex } = useTab()
    return () => (
      <div class={styles.app}>
        {/* jsx中使用的的v-model */}
        <Header v-model={[tabIndex.value, 'tabIndex']} />
      </div>
    )
  },
})
