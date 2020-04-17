<template>
    <section class="page-container">

        <h3 class="h3">How to communicate between child and parent using props and events</h3>

        <div class="test-container">

            <h4>Value of <strong>propOne</strong> in parent: <strong>{{ propOne }}</strong></h4>
            <h4>Value of <strong>propForNested</strong> in parent: <strong>{{ propForNested }}</strong></h4>
        
            <firstchild
                :propOne="propOne"
                :propForNested="propForNested"
                @inputchange="e => propOne = e"
            ></firstchild>

        </div>

    </section>
</template>

<script>
import firstchild from '../components/childparent/firstchild.vue'

export default {
    name: 'ChildParent',
    components: {
        firstchild,
    },
    data() {
        return {
            propOne: 'Some Value',
            propForNested: '0',
        }
    },
    mounted() {
        this.$on('nestedchanged', e => this.propForNested = e)
    },
}
</script>

<style lang="scss" scoped>
.test-container {
    display: flex;
    flex-direction: column;
}
h3 {
    margin: 20px 0;
}
strong {
    font-family: monospace;
    margin: 10px;
    color: $dark-gray;
    font-size: 1em;
}
h4 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>