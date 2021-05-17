<template>
    <div
      class="infoBg"
      @click="info_Close_Child"
    ></div>
</template>

<script>
export default {
    methods:{
        info_Close_Child() {
            this.$emit("update-info-close");
        },
    }
}
</script>

<style>

.infoBg{
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: rgb(51, 51, 51);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    opacity: .8;
    pointer-events: auto;
    transition: .6s ease;
}

</style>