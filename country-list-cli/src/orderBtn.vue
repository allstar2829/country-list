<template>
    <div class="orderBtn" @click="changeChildOrder">
        <i class="fa fa-list" aria-hidden="true"></i>
    </div>
</template>

<script>
export default {
    data(){
        return{
        isChildReverse: false
        }
    },
    methods:{
        changeChildOrder() {
        this.$emit("update-order",this.isChildReverse);
        // console.log(this.isChildReverse);
        },
    }
}
</script>

<style scoped>

.orderBtn{
    position: absolute;
    width: auto;
    height: auto;
    padding: 5px;
    top: 0;
    right: 0;
    background-color: #6E6E6E;
    border-radius: 3px;
    transition: .6s;
}
.orderBtn:hover{
    background-color: #272727;
}
.fa-list{
    color: #fff;
}

</style>