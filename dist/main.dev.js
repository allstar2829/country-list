"use strict";

// 測試
Vue.component('card', {
  template: "\n    <div class=\"card\">\n      \u81EA\u5DF1\u6253\u5B57 {{msg}} {{parentMsg}}\n    </div>",
  props: ["parentMsg"],
  data: function data() {
    return {
      msg: '這是子元件的 data'
    };
  }
});
Vue.component('main-nav', {
  template: "\n    <div class=\"topBar\">\n      <h1>COUNTRY LIST</h1>\n      <search-bar @update-text=\"getChildText\"></search-bar>\n    </div>\n  ",
  methods: {
    getChildText: function getChildText(searchText) {
      // return searchText
      // 得到search-bar 內傳回值
      this.$emit("update-text", searchText); // 直接再把searchText 傳出去
    }
  }
});
Vue.component('search-bar', {
  template: "\n    <div class=\"searchBar\">\n      <input type=\"text\" v-model=\"searchString\" @input=\"sendToParent\" placeholder=\"S E A R C H\" />\n      <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n    </div>\n  ",
  data: function data() {
    return {
      searchString: ""
    };
  },
  methods: {
    sendToParent: function sendToParent() {
      if (this.searchString !== "") {
        this.$emit("update-text", this.searchString);
      }
    }
  }
});
Vue.component('order-btn', {
  template: "\n    <div class=\"orderBtn\" @click=\"changeOrder\">\n      <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n    </div>",
  data: function data() {
    return {
      isReverse: false
    };
  },
  methods: {
    changeOrder: function changeOrder() {
      this.isReverse = !this.isReverse;
    }
  }
}); // Vue.component('info-bg', {
//   template: `
//     <div
//       class="infoBg"
//       v-if="current_choosed_info !== null"
//       @click="info_Close"
//     ></div>
//     `,
//   data(){
//     return{
//       current_choosed_info: null,
//     }
//   },
//   methods:{
//     info_Close() {
//       this.current_choosed_info = null;
//     },
//   }
// });

Vue.component("info", {
  template: "\n    <div class=\"info\">\n      <div class=\"info_content\">\n        <img :src=\"showTableData.flag\" />\n        <ul>\n          <li>- {{showTableData.name}}</li>\n          <br />\n          <li>\n            2\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha2Code}}\n          </li>\n          <li>\n            3\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha3Code}}\n          </li>\n          <li>\n            \u6BCD\u8A9E\u540D\u7A31 : {{showTableData.nativeName}}\n          </li>\n          <li>\n            \u66FF\u4EE3\u570B\u5BB6\u540D\u7A31 :\n            {{showTableData.altSpellings}}\n          </li>\n          <li>\n            \u570B\u969B\u96FB\u8A71\u5340\u865F :\n            {{showTableData.callingCodes}}\n          </li>\n        </ul>\n      </div>\n    </div>\n    ",
  props: ['show-table-data']
});
Vue.component('content-data', {
  template: "\n    <li @click=\"info_Open\">\n      <img :src=\"showTableData.flag\" />\n    </li>\n  ",
  props: ["show-table-data"],
  methods: {
    info_Open: function info_Open() {
      console.log('aaa');
    }
  }
}); // Vue.component('pagination', {
//   template: `
//     <div class="pagination">
//       <i class="fa fa-caret-left" @click="previousPage"></i>
//       {{currentPage}} / {{maxPage()}}
//       <i class="fa fa-caret-right" @click="nextPage"></i>
//     </div>
//   `,
//   methods:{
//     previousPage() {
//       // console.log("pre");
//       if (this.currentPage > 1) {
//         this.currentPage -= 1;
//       }
//     },
//     nextPage() {
//       // console.log("next");
//       //   this.currentPage +=
//       //     1 && this.currentPage < this.searchedCountries / this.pageSize;
//       if (this.currentPage === this.maxPage()) {
//         return false;
//       } else {
//         this.currentPage += 1;
//       }
//     },
//   }
// });

var app = new Vue({
  el: "#app",
  // component:{
  //   card
  // },
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
    },
    getString: function getString(string) {
      // console.log(string)
      this.isSearch = string; // console.log(this.isSearch)
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
});