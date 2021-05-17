<template>
    <div class="topBar">
        <h1>COUNTRY LIST</h1>
        <search-bar @update-text="getChildText" @update-current-page="getCurrentPage"></search-bar>
    </div>
</template>

<script>
import searchBar from './searchBar';

export default {
    components: {
        searchBar,
    },
    props:["current-page-parent"],
    methods:{
        getChildText(searchText){
        this.$emit("update-text", searchText);
        },
        getCurrentPage(currentPage){
        this.$emit("update-current-page", currentPage);
        },
    },
}
</script>

<style scoped>

.topBar{
    width: 100vw;
    height: 80px;
    background-color: #eee;
    opacity: .9;
    display: flex;
}
.topBar h1{
    width: 100%;
    text-align: center;
    font-size: 2rem;
    line-height: 80px;
    letter-spacing: 5px;
    text-shadow: 1px 1px 3px rgb(36, 36, 36,.5);
}

</style>