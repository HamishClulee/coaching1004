<template>
    <section class="child-container">

        <h4>Value of propForNested in child: {{ propForNested }}</h4>
        <h4>Value of localValue in child: {{ localValue }}</h4>

        <!-- @input="$emit('inputchange', localValue)"-->
        <input class="form-input" type="number" v-model="localValue" />

    </section>
</template>

<script>
export default {
    name: 'NestedChild',
    props: {
        propForNested: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localValue: '0',
        }
    },
    mounted() {
        // To avoid mutating props directly, make a local copy
        this.localValue = this.propForNested
    },
    // either watch for the changes here, or use @input event for a form item in the template block
    watch: {
        localValue: function () {
            this.$parent.$parent.$emit('nestedchanged', this.localValue)
        },
    },
}
</script>

<style lang="sass" scoped>
.child-container
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