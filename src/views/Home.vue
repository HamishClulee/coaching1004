<template>
    <div class="page-container">

        <globalstats></globalstats>

        <countriestable></countriestable>

    </div>
</template>

<script>
import globalstats from '../components/globalstats'
import countriestable from '../components/countriestable'
export default {
    name: 'Home',
    components: {
        globalstats,
        countriestable,
    },
}
</script>
<style lang="scss" scoped></style>
