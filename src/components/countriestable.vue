<template>
    <section class="countries-table-container">
        <table>
            <thead>
                <tr>
                    <th @click="active = sortedByCountry">Country</th>
                    <th @click="active = sortedByCases">Cases</th>
                    <th @click="active = sortedByDeaths">Deaths</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(country, index) in active" :key="index">
                    <td>
                        {{ country.Country }}
                    </td>
                    <td>
                        {{ country.TotalConfirmed }}
                    </td>
                    <td>
                        {{ country.TotalDeaths }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    name: 'countriestable',
    props: {
        countries: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            active: [],
        }
    },
    methods: {
        sortnumeric(sortbykey) {
            return this.countries.sort((a, b) => {
                return b[sortbykey] - a[sortbykey]
            })
        },
        sortalphabetic(sortbykey) {
            return this.countries.sort((a, b) => {
                if (a[sortbykey] < b[sortbykey]) return -1
                if (a[sortbykey] > b[sortbykey]) return 1
                return 0
            })
        },
    },
    computed: {
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
        countries: function(nue, old) {
            if (old.length === 0 && nue.length > 0) {
                this.active = this.countries
            }
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