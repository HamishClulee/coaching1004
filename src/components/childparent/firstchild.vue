<template>
    <section class="child-container">

        <h4>Value of propOne in child: {{ propOne }}</h4>
        <h4>Value of localValue in child: {{ localValue }}</h4>

        <!-- @input="$emit('inputchange', localValue)"-->
        <input class="form-input" type="text" v-model="localValue" />

        <nestedchild :propForNested="propForNested"></nestedchild>

    </section>
</template>

<script>
import nestedchild from './nestedchild'
export default {
    name: 'FirstChild',
    components: {
        nestedchild,
    },
    props: {
        propOne: {
            type: String,
            required: true,
        },
        propForNested: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localValue: '',
        }
    },
    mounted() {
        // To avoid mutating props directly, make a local copy
        this.localValue = this.propOne
    },
    // either watch for the changes here, or use @input event for a form item in the template block
    watch: {
        localValue: function () {
            this.$emit('inputchange', this.localValue)
        },
    },
}
</script>

<style lang="sass" scoped>
.child-container
    margin-top: 2em
    margin-left: 2em
    padding: 1em
    border-left: 1px solid green
h4 
    color: coral
.child-container
    display: flex
    flex-direction: column
.form-input
    font-size: 1.2em
    border-bottom: 1px solid #adadad
    border-top: none
    border-left: none
    border-right: none
    border-radius: 0
    font-size: 1.2em
    padding: 7px 0
    outline: none
    &:hover 
        border-bottom: 1px solid #adadad
        border-top: none
        border-left: none
        border-right: none
    &:focus 
        border-bottom: 1px solid #adadad
        border-top: none
        border-left: none
        border-right: none
        box-shadow: none
</style>