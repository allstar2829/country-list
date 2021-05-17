"use strict";

var store = new Vuex.Store({
  // global store
  state: {
    // 類似new Vue()裡面的data
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1
  },
  mutations: {
    // 類似new Vue()裡面的methods
    info_Open: function info_Open(index) {
      this.current_choosed_info = index;
    },
    info_Close: function info_Close() {
      this.current_choosed_info = null;
    },
    changeOrder: function changeOrder() {
      this.isReverse = !this.isReverse;
    },
    previousPage: function previousPage() {
      // console.log("pre");
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage: function nextPage() {
      if (this.currentPage === this.maxPage()) {
        return false;
      } else {
        this.currentPage += 1;
      }
    },
    maxPage: function maxPage() {
      var result = this.searchedCountries.length / this.pageSize;
      var maxPage = Math.ceil(result);
      return maxPage;
    },
    reset: function reset(page) {
      this.currentPage = page;
    },
    getString: function getString(string) {
      this.isSearch = string;
    }
  }
});
Vue.component('main-nav', {
  template: "\n    <div class=\"topBar\">\n      <h1>COUNTRY LIST</h1>\n      <search-bar></search-bar>\n    </div>\n  "
});
Vue.component('search-bar', {
  template: "\n    <div class=\"searchBar\">\n      <input type=\"text\" placeholder=\"S E A R C H\" \n      @keyup=\"reset\"v-model=\"isSearch\" />\n      <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n    </div>\n  "
});
Vue.component('order-btn', {
  template: "\n    <div class=\"orderBtn\" @click=\"changeOrder\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n    </div>"
});
Vue.component('info-bg', {
  template: "\n    <div\n      class=\"infoBg\"\n      @click=\"info_Close_Child\"\n    ></div>\n    ",
  methods: {
    info_Close_Child: function info_Close_Child() {
      this.$emit("update-info-close");
    }
  }
});
Vue.component("info", {
  template: "\n    <div class=\"info\" v-if=\"showTableData\">\n      <div class=\"info_content\">\n        <img v-if=\"showTableData.flag\" :src=\"showTableData.flag\" />\n        <ul>\n          <li v-if=\"showTableData.name\">- {{showTableData.name}}</li>\n          <br />\n          <li v-if=\"showTableData.alpha2Code\">\n            2\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha2Code}}\n          </li>\n          <li v-if=\"showTableData.alpha3Code\">\n            3\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha3Code}}\n          </li>\n          <li v-if=\"showTableData.nativeName\">\n            \u6BCD\u8A9E\u540D\u7A31 : {{showTableData.nativeName}}\n          </li>\n          <li v-if=\"showTableData.altSpellings\">\n            \u66FF\u4EE3\u570B\u5BB6\u540D\u7A31 :\n            {{showTableData.altSpellings}}\n          </li>\n          <li v-if=\"showTableData.callingCodes\">\n            \u570B\u969B\u96FB\u8A71\u5340\u865F :\n            {{showTableData.callingCodes}}\n          </li>\n        </ul>\n      </div>\n    </div>\n    ",
  props: ['show-table-data']
});
Vue.component('content-data', {
  template: "\n    <li>\n      <img :src=\"item.flag\" @click.native=\"info_Open(index)\"/>\n    </li>\n  "
});
Vue.component('pagination', {
  template: "\n    <div class=\"pagination\">\n      <i class=\"fa fa-caret-left\" @click=\"previousPage_child\"></i>\n      {{currentPage}} / {{maxPage}}\n      <i class=\"fa fa-caret-right\" @click=\"nextPage_child\"></i>\n    </div>\n  ",
  props: ["max-page", "current-page"],
  methods: {
    previousPage_child: function previousPage_child() {
      // console.log("pre");
      this.$emit('previous-page-child');
    },
    nextPage_child: function nextPage_child() {
      // console.log("next");
      this.$emit('next-page-child');
    }
  }
});
var app = new Vue({
  el: "#app",
  store: store,
  data: {
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1
  },
  methods: {
    info_Open: function info_Open(index) {
      this.current_choosed_info = index;
    },
    info_Close: function info_Close() {
      this.current_choosed_info = null;
    },
    changeOrder: function changeOrder() {
      this.isReverse = !this.isReverse;
    },
    previousPage: function previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage: function nextPage() {
      if (this.currentPage === this.maxPage()) {
        return false;
      } else {
        this.currentPage += 1;
      }
    },
    maxPage: function maxPage() {
      var result = this.searchedCountries.length / this.pageSize;
      var maxPage = Math.ceil(result);
      return maxPage;
    },
    reset: function reset(page) {
      this.currentPage = page;
    },
    getString: function getString(string) {
      this.isSearch = string;
    }
  },
  computed: {
    searchedCountries: function searchedCountries() {
      var _this = this;

      var copiedData = this.allcountries.map(function (x) {
        return x;
      });
      var searchedCountriesNum = [];

      if (this.isSearch) {
        searchedCountriesNum = copiedData.filter(function (country) {
          return country.name.toLowerCase().includes(_this.isSearch.toLowerCase());
        });
      } else {
        return copiedData;
      }

      return searchedCountriesNum;
    },
    orderedCountries: function orderedCountries() {
      var copiedData = this.searchedCountries.map(function (x) {
        return x;
      });

      if (this.isReverse) {
        return copiedData.reverse();
      } else {
        return copiedData;
      }
    },
    showTableData: function showTableData() {
      var copiedData = this.orderedCountries.map(function (x) {
        return x;
      });
      var start = (this.currentPage - 1) * this.pageSize;
      var end = this.currentPage * this.pageSize;
      return copiedData.slice(start, end);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    axios.get("https://restcountries.eu/rest/v2/all").then(function (response) {
      _this2.allcountries = response.data.map(function (element) {
        return element;
      });
      _this2.tableData = _this2.allcountries.length;
    });
  }
});