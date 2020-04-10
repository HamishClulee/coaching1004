<template>
    <section class="global-stats-container">
        <div class="stat-item" v-for="(val, key, index) in global" :key="val" :style="{ background: variablesToArray[index] }">
            {{ key }} : {{ val }}
        </div>
    </section>
</template>

<script>
import variables from '../style/variables.scss'
export default {
    name: 'globalstats',
    props: {
        global: {
            type: Object,
            required: true,
        },
    },
    computed: {
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
    width: 32%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    color: white;
}
</style>