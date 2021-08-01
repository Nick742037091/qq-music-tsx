import { ref, computed, Ref, onMounted, watch } from 'vue'
const formatTime = (time: number): string => {
  const addZero = (num: number) => {
    return num < 10 ? '0' + num : '' + num
  }
  const m = Math.floor(time / 60)
  const s = time % 60
  return addZero(m) + ':' + addZero(s)
}

export default (audio: Ref<HTMLMediaElement | undefined>) => {
  /********** 状态 **********/
  // 播放比例
  const playedRatio = ref(0)
  // 总时长
  const duration = ref(0)
  // 播放的时间
  const playedTime = computed(() =>
    Math.round(playedRatio.value * duration.value)
  )
  const formatDuration = computed(() => formatTime(duration.value))
  const formatPlayedTime = computed(() => formatTime(playedTime.value))
  // 播放状态
  const isPlaying = ref(false)
  // 播放进度定时器
  let progressTimer: NodeJS.Timeout | null = null

  /**************** 动作 ************/
  // 播放/暂停动作
  const onTogglePlay = () => {
    if (!audio.value) return
    isPlaying.value = !isPlaying.value
    if (isPlaying.value) {
      audio.value.play()
    } else {
      audio.value.pause()
    }
  }
  // 前进15秒
  const jumpForward15s = () => {
    if (!audio.value || !isPlaying.value || !duration.value) return
    const newTime = Math.min(playedTime.value + 15, duration.value)
    audio.value.currentTime = newTime
    playedRatio.value = newTime / duration.value
  }
  // 后退15秒
  const jumpBackward15s = () => {
    if (!audio.value || !isPlaying.value || !duration.value) return
    const newTime = Math.max(playedTime.value - 15, 0)
    audio.value.currentTime = newTime
    playedRatio.value = newTime / duration.value
  }

  /**********************************/

  /********** 播放进度定时器 **********/
  const startTimer = () => {
    progressTimer = setInterval(() => {
      if (!audio.value) return
      playedRatio.value = audio.value.currentTime / duration.value
    }, 1000)
  }
  const stopTimer = () => {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
  }
  watch(isPlaying, (value) => {
    if (value) {
      startTimer()
    } else {
      stopTimer()
    }
  })
  /*********************************/

  //监听播放数据初始化
  onMounted(() => {
    if (!audio.value) return
    // 元数据(时长等)加载完成
    audio.value.addEventListener('loadedmetadata', () => {
      if (!audio.value) return
      duration.value = Math.floor(audio.value.duration)
    })
    // 播放出错
    audio.value.addEventListener('error', () => {
      isPlaying.value = false
    })
    // 播放结束
    audio.value.addEventListener('ended', () => {
      isPlaying.value = false
      // 播放结束，重置播放进度
      playedRatio.value = 0
    })
  })

  // 拖动Slider，修改播放进度
  const onChangeSlider = (value: number) => {
    if (!audio.value) return
    audio.value.currentTime = value * duration.value
  }

  return {
    playedRatio,
    duration,
    playedTime,
    formatDuration,
    formatPlayedTime,
    isPlaying,
    onTogglePlay,
    jumpForward15s,
    jumpBackward15s,
    onChangeSlider,
  }
}
