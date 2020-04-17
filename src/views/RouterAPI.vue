<template>
    <section class="page-container">
        <h3 class="h3">What is the difference between <strong>$router.push()</strong> and <strong>$router.go()</strong> and <strong>$router.replace()</strong></h3>
    </section>
</template>

<script>
export default {
    name: 'RouterAPI',
}
</script>

<style lang="scss" scoped>
.page-container {
    margin-top: 100px;
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