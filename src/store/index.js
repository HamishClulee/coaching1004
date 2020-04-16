import Vue from 'vue'
import Vuex from 'vuex'
import { saveData, TILE_STORE, GLOBAL_STORE } from '../storage'
import { buildTileData } from '../util/data'

import CoronaAPI from '../api'
const CAPI = new CoronaAPI()

// MUTATION KEYS
export const ADD_TILE_DATA = 'ADD_TILE_DATA'
export const ADD_GLOBAL = 'ADD_GLOBAL'
export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE'
export const SET_SCROLL_LOCATION = 'SET_SCROLL_LOCATION'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tile_data: {},
        global: [],
        ui: {
            windowWidth: 0,
            windowHeight: 0,
            scrollY: 0,
        },
    },
    mutations: {
        [ADD_TILE_DATA]: (state, tile_data) => {
            state.tile_data = tile_data
        },
        [ADD_GLOBAL]: (state, global) => {
            state.global = global   
        },
        [SET_WINDOW_SIZE]: (state) => {
            state.ui.windowWidth = window.innerWidth
            state.ui.windowHeight = window.innerHeight
        },
        [SET_SCROLL_LOCATION]: (state) => {
            state.ui.scrollY = window.scrollY
        },
    },
    actions: {
        init({ commit }) {

            CAPI.statistics().then(res => {
                const data = res.data.response

                // mutate state
                commit(ADD_GLOBAL, data)
                commit(ADD_TILE_DATA, buildTileData(data))

                // save to local storage
                saveData(GLOBAL_STORE, data)
                saveData(TILE_STORE, buildTileData(data))
            })

        },
    },
    getters: {
        getGlobal: state => state.global,
        getTileData: state => state.tile_data,
        windowWidth: (state) => state.ui.windowWidth,
        windowHeight: (state) => state.ui.windowHeight,
        scrollY: (state) => state.ui.scrollY,
    },
})
