import Vue from 'vue'
import Vuex from 'vuex'
import { saveData, getData, doesDataExist, TILE_STORE, GLOBAL_STORE } from '../storage'
import { buildTileData } from '../util/data'
// import { EventBus, MESSAGES, FIVE_SECONDS } from '../EventBus'

import CoronaAPI from '../api'
const CAPI = new CoronaAPI()

const ADD_TILE_DATA = 'ADD_TILE_DATA'
const ADD_GLOBAL = 'ADD_GLOBAL'

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

            // syncronous
            if (doesDataExist(TILE_STORE) && doesDataExist(GLOBAL_STORE)) {

                commit(ADD_TILE_DATA, getData(TILE_STORE))
                commit(ADD_GLOBAL, getData(GLOBAL_STORE))
            }

            // async
            CAPI.statistics().then(res => {
                const data = res.data.response

                commit(ADD_GLOBAL, data)
                commit(ADD_TILE_DATA, buildTileData(data))

                saveData(GLOBAL_STORE, data)
                saveData(ADD_TILE_DATA, buildTileData(data))
            })
        },
    },
    getters: {
        getGlobal: state => state.global,
        getTileData: state => state.tile_data,
    },
})
