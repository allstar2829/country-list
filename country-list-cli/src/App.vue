<template>
  <div id="app">

    <main-nav></main-nav>

    <main>
      <div class="intro">
          <p>Get information about countries via a RESTful API</p>
          <order-btn @click.native="changeOrder"></order-btn>
        </div>

      <div class="content">
        <ul>
            <content-data v-for="(item,index) in showTableData" :key="index" :show-table-data="item" @click.native="info_Open(index)"></content-data>
          </ul>
      </div>
    </main>

    <transition name="fade">
      <info-bg 
        v-if="showTableData[this.$store.state.currentChoosedInfo
]"
        @click.native="info_Close"></info-bg>
    </transition>

    <transition name="fade">
      <info 
        v-if="showTableData[this.$store.state.currentChoosedInfo
]" 
        :show-table-data="showTableData[this.$store.state.currentChoosedInfo
]"></info>
    </transition>

    <pagination></pagination>
    
  </div>
</template>

<script>
import mainNav from './components/mainNav';
import orderBtn from './components/orderBtn';
import info from './components/info';
import infoBg from './components/infoBg';
import contentData from './components/contentData';
import pagination from './components/pagination';

export default {
  name: 'app',
  components: {
    mainNav,
    orderBtn,
    info,
    infoBg,
    contentData,
    pagination,
  },
  methods: {
    info_Open(index) {
      this.$store.state.currentChoosedInfo
 = index;
    },
    info_Close() {
      this.$store.state.currentChoosedInfo
 = null;
    },
    changeOrder() {
      this.$store.commit('changeOrder');
    },
    previousPage() {
      this.$store.commit('previousPage');
    },
    nextPage() {
      this.$store.commit('nextPage');
    },
    reset(page) {
      this.$store.state.currentPage = page;
    },
  },
  computed: {
    searchedCountries() {
      const copiedData = this.$store.state.allCountries
.map((x) => x);
      let searchedCountriesNum = [];

      if (this.$store.state.isSearch) {
        searchedCountriesNum = copiedData.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(this.$store.state.isSearch.toLowerCase());
        });
      } else {
        return copiedData;
      }
      return searchedCountriesNum;
    },

    orderedCountries() {
      const copiedData = this.searchedCountries.map((x) => x);

      if (this.$store.state.isReverse) {
        return copiedData.reverse();
      } else {
        return copiedData;
      }
    },

    showTableData() {
      const copiedData = this.orderedCountries.map((x) => x);

      const start = (this.$store.state.currentPage - 1) * this.$store.state.pageSize;
      const end = this.$store.state.currentPage * this.$store.state.pageSize;

      return copiedData.slice(start, end);
    },
  },
  mounted() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      
      const data = response.data.map((element) => element)
      this.$store.commit('getCountries', data)
    });
  },
}
</script>


<style>
#app {
  font-family: 'Work Sans', sans-serif;
  background-color: #fff;
  overflow-x: hidden;
}

main{
    width: 1300px;
    margin: 0 auto;
    padding-top: 40px;
}
.intro{
    position: relative;
    height: 50px;
}
.intro p{
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
}
.content{
    margin: 0 auto;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
</style>