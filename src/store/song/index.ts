import { Module, MutationTree, ActionTree, Getter, GetterTree } from 'vuex'
import { SongState } from './types'
import { SongDeatail } from '@/model/song'
import { fetchSongList } from '@/api/song'

const state: SongState = {
  songList: [],
  songIndex: 0,
}

const getters: GetterTree<SongState, null> = {
  songDetail(state) {
    return state.songList[state.songIndex] || {}
  },
}

const mutations: MutationTree<SongState> = {
  setSongList(state, payload: SongDeatail[]) {
    state.songList = payload
  },
  setSongIndex(state, payload: number) {
    state.songIndex = payload
  },
}

const actions: ActionTree<SongState, null> = {
  async getSongList({ commit }) {
    const { code, data } = await fetchSongList()
    if (code !== 0) return
    commit('setSongList', data)
  },
}

const module: Module<SongState, null> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
export default module
