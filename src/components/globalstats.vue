<template>
    <section class="global-stats-container">
        <div class="stat-item" v-for="(val, key, index) in getTileData" :key="index" :style="{ background: variablesToArray[index] }">
            {{ key }} : {{ formattedWithCommas(val) }}
        </div>
    </section>
</template>

<script>
import variables from '../style/variables.scss'
import { formatNumberWithCommas } from '../util/index'
import { mapGetters } from 'vuex'
export default {
    name: 'globalstats',
    methods: {
        formattedWithCommas(val) {
            return formatNumberWithCommas(val)
        },
    },
    computed: {
        ...mapGetters(['getTileData']),
        variablesToArray() {
            return Object.keys(variables).map(key => {
                return variables[key]
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.global-stats-container {
    margin: 70px 0 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}
.stat-item {
    border-radius: 3px;
    margin: 2px;
    width: 32vw;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    color: white;
}
</style>