// TODO vue3 tsx 模板
import { defineComponent, reactive, toRefs } from 'vue'
import styles from './header.module.less'
const TAB_LIST = [
  { key: 'recommend', title: '推荐' },
  { key: 'song', title: '歌曲' },
  { key: 'lyric', title: '歌词' }
]

export default defineComponent({
  name: 'Header',
  props: {
    tabIndex: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const tabList = reactive(TAB_LIST)
    const onClickTab = (event: MouseEvent, index: number) => {
      // TODO 没法用事件修饰符了
      event.stopPropagation()
      emit('update:tabIndex', index)
    }
    const { tabIndex } = toRefs(props)
    return () => (
      <div class={styles.header}>
        <div class={styles['arrow-down']} />
        <div class={styles['tab-block']}>
          {tabList.map((item, index) => (
            <div
              class={[
                styles.tab,
                index === tabIndex.value ? styles['tab--active'] : ''
              ]}
              key={item.key}
              onClick={(event) => onClickTab(event, index)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div class={styles.share} />
      </div>
    )
  }
})
