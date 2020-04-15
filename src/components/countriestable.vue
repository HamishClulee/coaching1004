<template>
    <section class="countries-table-container">
        <table>
            <thead>
                <tr>
                    <th @click="active = sortedByCountry">Country</th>
                    <th @click="active = sortedByCases">
                        <span class="dual-item-row">
                            Active Cases (
                                <span class="second-item">+new</span>
                        )</span>    
                    </th>
                    <th @click="active = sortedByCases">Recovered</th>
                    <th @click="active = sortedByDeaths">
                        <span class="dual-item-row">
                            Deaths (
                                <span class="second-item">+new</span>
                        )</span>
                    </th>
                    <th @click="active = sortedByDeaths">Tests</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(country, index) in getGlobal" :key="index">
                    <td>
                        {{ country.country }}
                    </td>
                    <td>
                        <span class="dual-item-row">
                            {{ country.cases.active | commas }}
                            (<span class="second-item">{{ country.cases.new }}</span>)
                        </span>
                    </td>
                    <td>
                        {{ country.cases.recovered | commas }}
                    </td>
                    <td>
                        <span class="dual-item-row">
                            {{ country.deaths.total | commas }}
                            (<span class="second-item">{{ country.deaths.new }}</span>)
                        </span> 
                    </td>
                    <td>
                        {{ country.tests.total | commas }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatNumberWithCommas } from '../util'
export default {
    name: 'countriestable',
    data() {
        return {
            active: [],
        }
    },
    methods: {
        sortnumeric(sortbykey) {
            return this.getCountries.sort((a, b) => {
                return b[sortbykey] - a[sortbykey]
            })
        },
        sortalphabetic(sortbykey) {
            return this.getCountries.sort((a, b) => {
                if (a[sortbykey] < b[sortbykey]) return -1
                if (a[sortbykey] > b[sortbykey]) return 1
                return 0
            })
        },
    },
    filters: {
        commas: function (value) {
            return formatNumberWithCommas(value)
        },
        removePlus: function(value) {
            return value.replace('+', '')
        },
        addPlus: function(value) {
            return `+${value}`
        },
    },
    computed: {
        ...mapGetters(['getGlobal']),
        sortedByCountry() {
            return this.sortalphabetic('Country')
        },
        sortedByCases() {
            return this.sortnumeric('TotalConfirmed')
        },
        sortedByDeaths() {
            return this.sortnumeric('TotalDeaths')
        },
    },
    watch: {
        getCountries: function() {
            this.active = this.getCountries
        },
    },
}
</script>

<style lang="scss" scoped>
.countries-table-container {
    border-radius: 3px;
    padding: 10px 0;
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.dual-item-row {
    display: flex;
    align-items: center;
    justify-content: center;
    .second-item {
        color: $a-green;
        font-size: 70%;
    }
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
    cursor: pointer;
}

th {
    &:hover {
        background-color: $light-gray;
    }
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>