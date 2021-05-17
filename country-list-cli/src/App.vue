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
  data () {
    return {
      allcountries: [],
      current_choosed_info: null,
      isReverse: false,
      isSearch: "",
      tableData: 1,
      pageSize: 25,
      currentPage: 1,
    }
  },
  methods: {
    info_Open(index) {
      this.current_choosed_info = index;
    },
    info_Close() {
      this.current_choosed_info = null;
    },
    changeOrder() {
      this.isReverse = !this.isReverse;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage === this.maxPage()) {
        return false;
      } else {
        this.currentPage += 1;
      }
    },
    maxPage() {
      let result = this.searchedCountries.length / this.pageSize;
      let maxPage = Math.ceil(result);
      return maxPage;
    },
    reset(page) {
      this.currentPage = page;
    },
    getString(string){
      this.isSearch = string

    }
  },
  computed: {
    searchedCountries() {
      const copiedData = this.allcountries.map((x) => x);
      let searchedCountriesNum = [];

      if (this.isSearch) {
        searchedCountriesNum = copiedData.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(this.isSearch.toLowerCase());
        });
      } else {
        return copiedData;
      }
      return searchedCountriesNum;
    },

    orderedCountries() {
      const copiedData = this.searchedCountries.map((x) => x);

      if (this.isReverse) {
        return copiedData.reverse();
      } else {
        return copiedData;
      }
    },

    showTableData() {
      const copiedData = this.orderedCountries.map((x) => x);
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;

      return copiedData.slice(start, end);
    },
  },
  mounted() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      this.allcountries = response.data.map((element) => element);

      this.tableData = this.allcountries.length;
    });
  },
}
</script>

<template>
  <div id="app">

    <main-nav @update-text="getString" @update-current-page="reset"></main-nav>

    <main>
      <div class="intro">
          <p>Get information about countries via a RESTful API</p>
          <order-btn @update-order="changeOrder"></order-btn>
        </div>
        
      <div class="content">
        <ul>
            <content-data :show-table-data="item" :key="index" v-for="(item,index) in showTableData" @click.native="info_Open(index)"></content-data>
          </ul>
      </div>
    </main>

    <transition name="fade">
      <info-bg v-if="showTableData[current_choosed_info]"
        @update-info-close="info_Close"></info-bg>
    </transition>

    <transition name="fade">
      <info v-if="showTableData[current_choosed_info]" :show-table-data="showTableData[current_choosed_info]"></info>
    </transition>

    <pagination :max-page="maxPage()" :current-page="currentPage" @previous-page-child="previousPage" @next-page-child="nextPage"></pagination>
    
  </div>

</template>

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
