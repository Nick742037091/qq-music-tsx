import { computed } from 'vue'
import { useStore } from 'vuex'
export default () => {
  const store = useStore()
  // 歌曲详情
  const songDetail = computed(() => store.getters['song/songDetail'])
  const rowLyric = computed(() => '我的爱明明还在')
  /* ****** 收藏歌曲 *******/
  const favoriteIcon = computed(() =>
    // TODO 这里为啥不用require
    songDetail.value.isFavorite
      ? 'src/assets/favorite-active.png'
      : 'src/assets/favorite-inactive.png'
  )
  const onToggleFavorite = () => {
    songDetail.value.isFavorite = !songDetail.value.isFavorite
  }
  /* ****** 关注歌手 *******/
  const likeSingerStatus = computed(() =>
    songDetail.value.likeSinger ? '已关注' : '关注'
  )
  const likeStatusClass = computed(() => {
    let cls = 'like '
    return (
      cls + (songDetail.value.likeSinger ? 'like--active' : 'like--inactive')
    )
  })
  const onToggleLikeSinger = () => {
    songDetail.value.likeSinger = !songDetail.value.likeSinger
  }
  return {
    rowLyric,
    favoriteIcon,
    onToggleFavorite,
    likeSingerStatus,
    onToggleLikeSinger,
    likeStatusClass,
    songDetail,
  }
}
