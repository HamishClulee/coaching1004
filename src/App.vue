<template>
    <div id="god-div">
        <navbar></navbar>

        <globalstats v-bind="{ global }"></globalstats>

        <countriestable></countriestable>

        <transition name="slide-fade" mode="out-in">
            <adurotoast
                v-if="showToast"
                v-bind="{ text, textColor, bgColor, timeToLive }"
            ></adurotoast>
        </transition>
    </div>
</template>

<script>
import { EventBus, MESSAGES, FIVE_SECONDS, setUpMessages } from './EventBus.js'
import adurotoast from './components/adurotoast'
import navbar from './components/navbar'
import globalstats from './components/globalstats'
import countriestable from './components/countriestable'
import { mapActions, mapMutations } from 'vuex'
import { ADD_TILE_DATA, ADD_GLOBAL } from './store'
import { getData, doesDataExist, TILE_STORE, GLOBAL_STORE } from './storage'

export default {
    name: 'App',
    components: {
        adurotoast,
        navbar,
        globalstats,
        countriestable,
    },
    data() {
        return {
            showToast: false,
            text: '',
            bgColor: '',
            textColor: '',
            timeToLive: 0,
            global: {},
            countries: [],
        }
    },
    created() {

        this.init()

    },
    mounted() {

        EventBus.$on(MESSAGES, (payload) => {
            setUpMessages(payload, this)
        })

        if (doesDataExist(TILE_STORE) && doesDataExist(GLOBAL_STORE)) {

            this.ADD_TILE_DATA(getData(TILE_STORE))

            this.ADD_GLOBAL(getData(GLOBAL_STORE))

            EventBus.$emit(MESSAGES, {
                showToast: true,
                text: 'Serving stored data merging in API results',
                bgColor: 'aduro-green',
                textColor: '#FFF',
                timeToLive: FIVE_SECONDS,
            })

        } else {
            EventBus.$emit(MESSAGES, {
                showToast: true,
                text: 'No stored data, fetching from API',
                bgColor: 'aduro-blue',
                textColor: '#FFF',
                timeToLive: FIVE_SECONDS,
            })
        }

    },
    methods: {
        ...mapActions(['init']),
        ...mapMutations([ADD_TILE_DATA, ADD_GLOBAL]),
    },
}
</script>

<style lang="scss" scoped>
.god-div {
    .app-master-container {
    height: 100vh;
    width: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
}
}
</style>
