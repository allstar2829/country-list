<template>
  <div id="app">

    <main-nav @update-text="getString" @update-current-page="reset"></main-nav>
    <main>
      <div class="intro">
          <p>Get information about countries via a RESTful API</p>
          <order-btn @update-order="changeOrder"></order-btn>
        </div>

        {{$store.state.pageSize}}
        
      <div class="content">
        <ul>
            <content-data :show-table-data="item" :key="index" v-for="(item,index) in showTableData" @click.native="info_Open(index)"></content-data>
          </ul>
      </div>
    </main>

    <transition name="fade">
      <info-bg v-if="showTableData[this.$store.state.current_choosed_info]"
        @update-info-close="info_Close"></info-bg>
    </transition>

    <transition name="fade">
      <info v-if="showTableData[this.$store.state.current_choosed_info]" :show-table-data="showTableData[this.$store.state.current_choosed_info]"></info>
    </transition>

    <pagination :max-page="maxPage()" :current-page="$store.state.currentPage" @previous-page-child="previousPage" @next-page-child="nextPage"></pagination>
    
  </div>

</template>

<script>
import mainNav from './mainNav';
import orderBtn from './orderBtn';
import info from './info';
import infoBg from './infoBg';
import contentData from './contentData';
import pagination from './pagination';

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
      this.$store.state.current_choosed_info = index;
    },
    info_Close() {
      this.$store.state.current_choosed_info = null;
    },
    changeOrder() {
      this.$store.state.isReverse = !this.$store.state.isReverse;
    },
    previousPage() {
      if (this.$store.state.currentPage > 1) {
        this.$store.state.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.$store.state.currentPage === this.maxPage()) {
        return false;
      } else {
        this.$store.state.currentPage += 1;
      }
    },
    maxPage() {
      let result = this.searchedCountries.length / this.$store.state.pageSize;
      let maxPage = Math.ceil(result);
      return maxPage;
    },
    reset(page) {
      this.$store.state.currentPage = page;
    },
    getString(string){
      this.$store.state.isSearch = string
    }
  },
  computed: {
    searchedCountries() {
      const copiedData = this.$store.state.allcountries.map((x) => x);
      let searchedCountriesNum = [];

      if (this.$store.state.isSearch) {
        searchedCountriesNum = copiedData.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(this.$store.state.toLowerCase());
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
    // 以pageSize 為例:
    // 在data內 
    // this.pageSize = 100
    // 執行changePageSize 將store的pageSize改掉 (有傳值)
    // this.$store.commit('changePageSize',100)
    //                    ( 沒傳值 )
    // this.$store.commit('resetCountries')
    this.$store.commit('chooseInfo',null)
    this.$store.commit('reverseOrder',false)
    this.$store.commit('isSearch')
    this.$store.commit('getPageSize',25)
    this.$store.commit('currentPage',1)

    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      
      const data = response.data.map((element) => element)
      this.$store.commit('getCountries', data)

      const tableData = this.$store.state.allcountries.length;
      this.$store.commit('getTableData', tableData)
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

/* reset */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
