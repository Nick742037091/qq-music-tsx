import Mockjs from 'mockjs'
import { mockBoolean, mockImg, mockInt, mockName, mockWords } from './common'

const mockSongDetail = () => {
  const lyric = new Array(mockInt(20, 50))
    .fill(null)
    .map(() => mockWords())
    .join('<br/>')
  return {
    poster: mockImg(),
    lyric,
    name: mockWords(3, 8),
    singer: mockName(),
    isFavorite: mockBoolean(),
    likeSinger: mockBoolean(),
    url: 'http://music.163.com/song/media/outer/url?id=447925558.mp3',
  }
}

// 这里要使用正则，避免devServer不生效
Mockjs.mock(/song\/detail/, 'get', {
  code: 0,
  msg: '',
  data: mockSongDetail(),
})

Mockjs.mock(/song\/list/, 'get', () => {
  const data = new Array(mockInt(10, 20))
    .fill(null)
    .map((item) => mockSongDetail())
  return {
    code: 0,
    msg: '',
    data,
  }
})
