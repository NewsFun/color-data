<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="sass">
@import './styles/base.sass'
#app 
    background-color: #2c3e50
</style>
