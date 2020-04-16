import Vue from 'vue'
import Vuex from 'vuex'
import { saveData, TILE_STORE, GLOBAL_STORE } from '../storage'
import { buildTileData } from '../util/data'

import CoronaAPI from '../api'
const CAPI = new CoronaAPI()

export const ADD_TILE_DATA = 'ADD_TILE_DATA'
export const ADD_GLOBAL = 'ADD_GLOBAL'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tile_data: {},
        global: [],
    },
    mutations: {
        [ADD_TILE_DATA]: (state, tile_data) => {
            state.tile_data = tile_data
        },
        [ADD_GLOBAL]: (state, global) => {
            state.global = global   
        },
    },
    actions: {
        init({ commit }) {

            // async
            CAPI.statistics().then(res => {
                const data = res.data.response

                commit(ADD_GLOBAL, data)
                commit(ADD_TILE_DATA, buildTileData(data))

                saveData(GLOBAL_STORE, data)
                saveData(TILE_STORE, buildTileData(data))
            })
        },
    },
    getters: {
        getGlobal: state => state.global,
        getTileData: state => state.tile_data,
    },
})
