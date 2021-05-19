<template>
    <li>
        <img :src="showTableData.flag"/>
        <!-- {{$store.state.allcountries[0].name}}  -->
    </li>
</template>

<script>
export default {
    props: ["show-table-data"],
}
</script>

<style>
.content ul{
    display: flex;
    flex-wrap: wrap;
}
.content li{
    padding: 15px 15px;
    border-radius: 15px;
    overflow: hidden;
    transition: all .4s;
}
.content li:hover{
    box-shadow: 2px 2px 4px rgba(0,0,0,.2);
}
.content img{
    width: 230px;
    height: 140px;
    display: block;
}
</style>