import { get } from './baseRequest'
import { SongDetailResponse, SongListResponse } from '@/model/song'

export const fetchSongDetail = (): Promise<SongDetailResponse> => {
  return get('/song/detail')
}

export const fetchSongList = (): Promise<SongListResponse> => {
  return get('/song/list')
}
