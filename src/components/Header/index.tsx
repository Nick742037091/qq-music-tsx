// TODO vue3 tsx 模板
import { defineComponent, reactive, toRefs } from 'vue'
import styles from './header.module.less'
const TAB_LIST = [
  { key: 'recommend', title: '推荐' },
  { key: 'song', title: '歌曲' },
  { key: 'lyric', title: '歌词' },
]

export default defineComponent({
  name: 'Header',
  props: {
    tabIndex: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const tabList = reactive(TAB_LIST)
    const onClickTab = (index: number) => {
      emit('update:tabIndex', index)
    }
    const { tabIndex } = toRefs(props)
    return () => (
      <div class={styles.header}>
        {/* 这样使用css有点恶心，但谁让我们使用css module呢 */}
        <div class={styles['arrow-down']} />
        <div class={styles['tab-block']}>
          {tabList.map((item, index) => (
            <div
              class={[
                styles.tab,
                // 写起来太别捏了
                index === tabIndex.value ? styles['tab--active'] : '',
              ]}
              key={item.key}
              onClick={() => onClickTab(index)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div class={styles.share} />
      </div>
    )
  },
})
