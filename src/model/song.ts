import { Response } from '@/model/request'

export interface SongDeatail {
  poster: string
  lyric: string
  name: string
  singer: string
  isFavorite: boolean
  likeSinger: boolean
  url: string
}

export interface SongDetailResponse extends Response {
  data: SongDeatail
}

export interface SongListResponse extends Response {
  data: SongDeatail[]
}
