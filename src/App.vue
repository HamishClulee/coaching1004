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
import { EventBus, MESSAGES } from './EventBus.js'
import adurotoast from './components/adurotoast'
import navbar from './components/navbar'
import globalstats from './components/globalstats'
import countriestable from './components/countriestable'
import { mapActions } from 'vuex'
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
        // this.$API.summary().then(res => {
        //     this.global = res.data.Global
        //     this.countries = res.data.Countries
        // })
    },
    mounted() {
        EventBus.$on(MESSAGES, (payload) => {
            this.showToast = payload.show
            this.text = payload.text || ''
            this.bgColor = payload.bgColor || ''
            this.textColor = payload.textColor || ''
            this.timeToLive = payload.timeToLive || 0
        })
    },
    methods: {
        ...mapActions(['init']),
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
