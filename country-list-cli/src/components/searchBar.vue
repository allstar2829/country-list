<template>
    <div class="searchBar">
        <input type="text" placeholder="S E A R C H"
        v-model="$store.state.isSearch"/>
        <i class="fa fa-search" aria-hidden="true"></i>
    </div>
</template>

<script>

export default {
    // data() {
    //     return {
    //     searchString: "",
    //     currentPageChild: 1,
    //     }
    // },
    // methods:{
    //     sendToParent() {
    //     if(this.searchString !== ""){
    //         this.$emit("update-text", this.searchString)
    //     } else{
    //         // console.log(this.searchString = '')
    //         this.$emit("update-text", this.searchString = "")}
    //     },
    //     currentPageChildChange() {
    //     // console.log(this.currentPageChild)
    //     this.$emit("update-current-page", this.currentPageChild)
    //     },
    // }
}
</script>

<style scoped>

.searchBar{
    position: absolute;
    width: auto;
    height: auto;
    padding: 10px;
    top: 20px;
    right: 80px;
    border-radius: 20px;
    background-color: transparent;
    transition: all .6s;
}
.searchBar:hover{
    background-color: #fff;
}
.searchBar input{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgb(36, 36, 36);
    outline: none;
}

</style>