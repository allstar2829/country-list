<template>
    <div class="info" v-if="showTableData">
        <div class="info_content">
            <img v-if="showTableData.flag" :src="showTableData.flag" />
            <ul>
            <li v-if="showTableData.name">- {{showTableData.name}}</li>
            <br />
            <li v-if="showTableData.alpha2Code">
                2位國家代碼 : {{showTableData.alpha2Code}}
            </li>
            <li v-if="showTableData.alpha3Code">
                3位國家代碼 : {{showTableData.alpha3Code}}
            </li>
            <li v-if="showTableData.nativeName">
                母語名稱 : {{showTableData.nativeName}}
            </li>
            <li v-if="showTableData.altSpellings">
                替代國家名稱 :
                {{showTableData.altSpellings}}
            </li>
            <li v-if="showTableData.callingCodes">
                國際電話區號 :
                {{showTableData.callingCodes}}
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['show-table-data'],
}
</script>

<style scoped>

.info{
    width: 700px;
    height: 250px;
    padding: 30px;
    background-color: rgb(255, 255, 255);
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    box-shadow: 1px 1px 4px rgb(92, 92, 92);
    z-index: 2;

    opacity: 1;
    pointer-events: auto;
    transition: .6s ease;
}
.info_content{
    display: flex;
}
.info img{
    width: 300px;
}
.info ul{
    margin-left: 20px;
    margin-top: 20px;
}
.info li{
    margin-bottom: 8px;
}
</style>