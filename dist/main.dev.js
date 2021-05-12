"use strict";

new Vue({
  el: "#app",
  data: {
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1 // searchedCountriesNum: 1,

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
      // console.log("pre");
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage: function nextPage() {
      console.log("next"); //   this.currentPage +=
      //     1 && this.currentPage < this.searchedCountries / this.pageSize;

      if (this.currentPage === this.maxPage()) {
        return false;
      } else {
        this.currentPage += 1;
      }
    },
    // returnData() {
    //   this.xxx = "xxx";
    //   return this.xxx;
    // },
    // testFunction() {
    //   console.log(this.returnData());
    // },
    maxPage: function maxPage() {
      var result = this.searchedCountries.length / this.pageSize; // // console.log(result) // Nan
      // console.log(this.showTableData) // array > console.log(this.showTableData.length)
      // console.log(this.pageSize)

      var maxPage = Math.ceil(result); // console.log(maxPage)

      return maxPage;
    },
    reset: function reset() {
      this.currentPage = 1;
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
      }); // console.log('長度',this.currentPage - 1 );
      // console.log('顯示筆數', this.pageSize);
      //  console.log(this.orderedCountries.length);
      //   if (this.currentPage > this.maxPage()){
      //     this.currentPag = 1
      //   }
      //   判斷search的時候 分頁的狀態, 此處已用 keyup 的 reset替代寫了

      var start = (this.currentPage - 1) * this.pageSize;
      var end = this.currentPage * this.pageSize; // console.log('開始筆數', start, '結束筆數', end);

      return copiedData.slice(start, end); //   = return this.orderedCountries.length.slice(start, end);
    }
  },
  template: "\n    <div>\n      <main-nav></main-nav>\n\n      <main>\n        <div class=\"intro\">\n          <p>Get information about countries via a RESTful API</p>\n          <order-btn></order-btn>\n        </div>\n\n        <content></content>\n      </main>\n\n      <!-- \u8CC7\u8A0A\u5F48\u7A97 -->\n      <transition name=\"fade\">\n        <info-bg></info-bg>\n      </transition>\n\n      <transition name=\"fade\">\n        <info></info>\n      </transition>\n\n      <pagination></pagination>\n    </div>\n  ",
  mounted: function mounted() {
    var _this2 = this;

    // this.testFunction();
    axios.get("https://restcountries.eu/rest/v2/all").then(function (response) {
      _this2.allcountries = response.data.map(function (element) {
        return element;
      });
      _this2.tableData = _this2.allcountries.length;
    });
  }
}); // 測試
// Vue.component('card', {
//   template: `
//     <div class="card">
//       自己打字 {{msg}} {{parentMsg}}
//     </div>`,
//   props: ["parentMsg"],
//   data: () => {
//     return {
//       msg: '這是子元件的 data'
//     }
//   }
// });

Vue.component('main-nav', {
  template: "\n    <nav>\n      <h1>COUNTRY LIST</h1>\n      <search-bar></search-bar>\n    </nav>\n  "
});
Vue.component('search-bar', {
  template: "\n    <div class=\"searchBar\">\n      <input type=\"text\" v-model=\"isSearch\" placeholder=\"S E A R C H\" @keyup=\"reset\"/>\n      <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n    </div>\n  ",
  data: function data() {
    return {
      isSearch: ''
    };
  }
});
Vue.component('order-btn', {
  template: "\n    <div class=\"orderBtn\" @click=\"changeOrder\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n    </div>"
});
Vue.component('info-bg', {
  template: "\n    <div\n      class=\"infoBg\"\n      v-if=\"current_choosed_info !== null\"\n      @click=\"info_Close\"\n    ></div>\n    "
});
Vue.component("info", {
  template: "\n    <div class=\"info\" v-if=\"current_choosed_info !== null\">\n      <div class=\"info_content\">\n        <img :src=\"showTableData[current_choosed_info].flag\" />\n        <ul>\n          <li>- {{showTableData[current_choosed_info].name}}</li>\n          <br />\n          <li>\n            2\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData[current_choosed_info].alpha2Code}}\n          </li>\n          <li>\n            3\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData[current_choosed_info].alpha3Code}}\n          </li>\n          <li>\n            \u6BCD\u8A9E\u540D\u7A31 : {{showTableData[current_choosed_info].nativeName}}\n          </li>\n          <li>\n            \u66FF\u4EE3\u570B\u5BB6\u540D\u7A31 :\n            {{showTableData[current_choosed_info].altSpellings}}\n          </li>\n          <li>\n            \u570B\u969B\u96FB\u8A71\u5340\u865F :\n            {{showTableData[current_choosed_info].callingCodes}}\n          </li>\n        </ul>\n      </div>\n    </div>\n    ",
  props: ["current_choosed_info: null", "showTableData"]
});
Vue.component('content', {
  template: "\n    <div class=\"content\">\n      <ul>\n        <content-data></content-data>\n      </ul>\n    </div>\n  "
});
Vue.component('content-data', {
  template: "\n    <li v-for=\"(item,index) in showTableData\">\n      <img :src=\"item.flag\" @click=\"info_Open(index)\" />\n    </li>\n  "
});
Vue.component('pagination', {
  template: "\n    <div class=\"pagination\">\n      <i class=\"fa fa-caret-left\" @click=\"previousPage\"></i>\n      {{currentPage}} / {{maxPage()}}\n      <i class=\"fa fa-caret-right\" @click=\"nextPage\"></i>\n    </div>\n  "
});