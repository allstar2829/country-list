const store = new Vuex.Store({ // global store
  state:{ // 類似new Vue()裡面的data
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
  },
  mutations:{ // 類似new Vue()裡面的methods
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
      // console.log("pre");
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
});

Vue.component('main-nav', {
  template: `
    <div class="topBar">
      <h1>COUNTRY LIST</h1>
      <search-bar></search-bar>
    </div>
  `,
});

Vue.component('search-bar', {
  template: `
    <div class="searchBar">
      <input type="text" placeholder="S E A R C H" 
      @keyup="reset"v-model="isSearch" />
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  `,
});

Vue.component('order-btn', {
  template: `
    <div class="orderBtn" @click="changeOrder">
      <i class="fa fa-list" aria-hidden="true"></i>
    </div>`
  ,
});

Vue.component('info-bg', {
  template: `
    <div
      class="infoBg"
      @click="info_Close_Child"
    ></div>
    `,
  methods:{
    info_Close_Child() {
      this.$emit("update-info-close");
    },
  }
});

Vue.component("info", {
  template: `
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
    `,
  props: ['show-table-data'],
});

Vue.component('content-data', {
  template: `
    <li>
      <img :src="item.flag" @click.native="info_Open(index)"/>
    </li>
  `,
});

Vue.component('pagination', {
  template: `
    <div class="pagination">
      <i class="fa fa-caret-left" @click="previousPage_child"></i>
      {{currentPage}} / {{maxPage}}
      <i class="fa fa-caret-right" @click="nextPage_child"></i>
    </div>
  `,
  props: ["max-page","current-page"],
  methods:{
    previousPage_child() {
      // console.log("pre");
      this.$emit('previous-page-child')
    },
    nextPage_child() {
      // console.log("next");
      this.$emit('next-page-child')
    },
  }
});

const app = new Vue({
  el: "#app",
  store,
  data: {
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
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
});
