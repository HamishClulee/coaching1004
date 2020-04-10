import Vue from 'vue'
import Vuex from 'vuex'

import CoronaAPI from '../api'
const CAPI = new CoronaAPI()

const ADD_COUNTRIES = 'ADD_COUNTRIES'
const ADD_GLOBAL = 'ADD_GLOBAL'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        countries: [],
        global: {},
    },
    mutations: {
        [ADD_COUNTRIES]: (state, countries) => {
            state.countries = countries
        },
        [ADD_GLOBAL]: (state, global) => {
            state.global = global   
        },
    },
    actions: {
        init({ commit }) {
            CAPI.summary().then(res => {
                commit(ADD_COUNTRIES, res.data.Countries)
                commit(ADD_GLOBAL, res.data.Global)
            })
        },
    },
})
