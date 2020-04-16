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
// harmony
import { EventBus, MESSAGES, FIVE_SECONDS, setUpMessages, GLOBAL_SPINNER } from './EventBus'
import { mapActions, mapMutations } from 'vuex'
import { ADD_TILE_DATA, ADD_GLOBAL, SET_WINDOW_SIZE, SET_SCROLL_LOCATION } from './store'
import { getData, doesDataExist, TILE_STORE, GLOBAL_STORE } from './storage'
import { debounce } from './util'

// components
import adurotoast from './components/adurotoast'
import navbar from './components/navbar'
import globalstats from './components/globalstats'
import countriestable from './components/countriestable'

// useful cludge - Explain: used on line 89 ish eslint is wrong, Blame: Hamish
// eslint-disable-next-line no-unused-vars
let __proxy

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
            showSpinner: false,
            text: '',
            bgColor: '',
            textColor: '',
            timeToLive: 0,
            global: {},
            countries: [],
        }
    },
    created() {

        // api fetching commence - vuex mapped action
        this.init()

        // set state ui vars
        this.SET_WINDOW_SIZE()
        this.SET_SCROLL_LOCATION()
    },
    mounted() {

        // Toast user messages
        EventBus.$on(MESSAGES, payload => {
            setUpMessages(payload, this)
        })

        // Global loading spinner
        EventBus.$on(GLOBAL_SPINNER, showSpinner => {
            this.showSpinner = showSpinner
        })

        // If data exists in local stroage, commit that data into vuex directly while the API 
        // calls resolve. This means that even if the API is offline, there should still be data displayed
        // TODO: add a user message to inform if the data from the API failed to resolve..
        // something like 'Displaying old data (use time stamp?), either the API is offline, or your 
        // connection to the internet is unstable'
        if (doesDataExist(TILE_STORE) && doesDataExist(GLOBAL_STORE)) {

            this.ADD_TILE_DATA(getData(TILE_STORE))

            this.ADD_GLOBAL(getData(GLOBAL_STORE))

            // Serving data from local storage
            EventBus.$emit(MESSAGES, {
                showToast: true,
                text: 'Serving stored data merging in API results',
                bgColor: 'aduro-green',
                textColor: '#FFF',
                timeToLive: FIVE_SECONDS,
            })

        } else {
            // There is no data in local storage, user will have to wait for the API call to resolve
            EventBus.$emit(MESSAGES, {
                showToast: true,
                text: 'No stored data, fetching from API',
                bgColor: 'aduro-blue',
                textColor: '#FFF',
                timeToLive: FIVE_SECONDS,
            })
        }


        // Set up debounced watchers for window width, width height and scrollY location
        // To extend these into breakpoints would be as easy as assigning sizes to $ proxies
        // ie $small = 330 or whatever, then in template v-if="getWindowWidth < $small" -> do a thing
        // useful cludge - used because debounce changes the context of 'this'
        __proxy = this
        window.addEventListener('resize', debounce(this.sizeChange, 500))
        window.addEventListener('scroll', debounce(this.scrollChange, 100))

    },
    methods: {
        ...mapActions(['init']),
        ...mapMutations([ADD_TILE_DATA, ADD_GLOBAL, SET_WINDOW_SIZE, SET_SCROLL_LOCATION]),
        // Window size event watcher handler
        sizeChange: () => {

            __proxy.SET_WINDOW_SIZE()
		
        },
        // Scroll event watcher handler
        scrollChange: () => {

            __proxy.SET_SCROLL_LOCATION()

        },
    },
}
</script>

<style lang="scss" scoped>
.god-div {
    min-height: 100vh;
    overflow-x: hidden !important; // to prevent side scrolling caused by vertical scroll bars in some mobile browsers 
}
</style>
