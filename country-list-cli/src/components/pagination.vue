<template>
    <div class="pagination">
        <!-- <i class="fa fa-caret-left" @click="previousPage"></i> -->
        {{$store.state.currentPage}} / {{$store.state.maxPage}}
        <!-- <i class="fa fa-caret-right" @click="nextPage"></i> -->
    </div>
</template>

<script>
export default {
    // props: ["max-page","current-page"],
    // methods:{
    //     previousPage_child() {
    //     // console.log("pre");
    //     this.$emit('previous-page-child')
    //     },
    //     nextPage_child() {
    //     // console.log("next");
    //     this.$emit('next-page-child')
    //     },
    // }
}
</script>

<style>

.pagination{
    text-align: center;
    margin: 40px auto;
    font-size: 1.3rem;
}

.fa-caret-left,.fa-caret-right{
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background-color: transparent;
    transition: all .3s;
    color: #acacac;
}

.fa-caret-left:hover,.fa-caret-right:hover{
    background-color: #acacac2d;
}

</style>