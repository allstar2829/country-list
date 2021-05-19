"use strict";

// 測試
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
// emit > 邏輯順序可以簡單想成:
// 1. 子層執行一件事情 > ex: @click/ @input
// 2. 執行後啟動函式 > @click = "sendToParent"
// 3. 父層html 如<div></div> 接住 @sendToParent 後
// 4. 也執行父層函式 > @sendToParent="sendMeg"
// 四個步驟缺一不可><! 別忘
// 寫法 > $emit('自定義動作',要回傳的參數)
// this.$emit('previousPage_child',this.currentPage_child)
// vue內記得要加 this.
Vue.component("main-nav", {
  template: "\n      <div class=\"topBar\">\n        <h1>COUNTRY LIST</h1>\n        <search-bar @update-text=\"getChildText\" @update-current-page=\"getCurrentPage\"></search-bar>\n      </div>\n    ",
  props: ["current-page-parent"],
  methods: {
    getChildText: function getChildText(searchText) {
      // return searchText
      // 確定有得到search-bar 傳回值
      this.$emit("update-text", searchText); // 直接再把searchText 傳出去
      // <main-nav> 接值 @update-text後, 執行"getString"
    },
    getCurrentPage: function getCurrentPage(currentPage) {
      this.$emit("update-current-page", currentPage); // console.log(currentPage)
    }
  }
}); // 組件內的data 必為函式, 如此重複使用組件才不會影醒彼此的值
// 詳見語昕影片

Vue.component("search-bar", {
  template: "\n      <div class=\"searchBar\">\n        <input type=\"text\" placeholder=\"S E A R C H\" @keyup=\"currentPageChildChange\"\n        v-model=\"searchString\" @input=\"sendToParent\" />\n        <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n      </div>\n    ",
  data: function data() {
    return {
      searchString: "",
      currentPageChild: 1
    };
  },
  methods: {
    sendToParent: function sendToParent() {
      if (this.searchString !== "") {
        this.$emit("update-text", this.searchString);
      } else {
        this.$emit("update-text", this.searchString = ""); // console.log(this.searchString = '')
      }
    },
    currentPageChildChange: function currentPageChildChange() {
      // console.log(this.currentPageChild)
      this.$emit("update-current-page", this.currentPageChild);
    }
  }
});
Vue.component("order-btn", {
  template: "\n      <div class=\"orderBtn\" @click=\"changeChildOrder\">\n        <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\n      </div>",
  data: function data() {
    return {
      isChildReverse: false
    };
  },
  methods: {
    changeChildOrder: function changeChildOrder() {
      this.$emit("update-order", this.isChildReverse); // console.log(this.isChildReverse);
    }
  }
}); // 對比info, info-bg沒有引用父層資料 props: ['show-table-data'], 所以若 有加v-if =showTableData, 就會報錯 !

Vue.component("info-bg", {
  template: "\n      <div\n        class=\"infoBg\"\n        @click=\"info_Close_Child\"\n      ></div>\n      ",
  methods: {
    info_Close_Child: function info_Close_Child() {
      this.$emit("update-info-close");
    }
  }
}); // info藉由props 傳入資料後, 傳入的是showTableData內的[一筆資料] (showTableData[currentChoosedInfo
]) 有點類似item的概念, 所以獲取的資料就是 showTableData.屬性

Vue.component("info", {
  template: "\n      <div class=\"info\" v-if=\"showTableData\">\n        <div class=\"info_content\">\n          <img v-if=\"showTableData.flag\" :src=\"showTableData.flag\" />\n          <ul>\n            <li v-if=\"showTableData.name\">- {{showTableData.name}}</li>\n            <br />\n            <li v-if=\"showTableData.alpha2Code\">\n              2\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha2Code}}\n            </li>\n            <li v-if=\"showTableData.alpha3Code\">\n              3\u4F4D\u570B\u5BB6\u4EE3\u78BC : {{showTableData.alpha3Code}}\n            </li>\n            <li v-if=\"showTableData.nativeName\">\n              \u6BCD\u8A9E\u540D\u7A31 : {{showTableData.nativeName}}\n            </li>\n            <li v-if=\"showTableData.altSpellings\">\n              \u66FF\u4EE3\u570B\u5BB6\u540D\u7A31 :\n              {{showTableData.altSpellings}}\n            </li>\n            <li v-if=\"showTableData.callingCodes\">\n              \u570B\u969B\u96FB\u8A71\u5340\u865F :\n              {{showTableData.callingCodes}}\n            </li>\n          </ul>\n        </div>\n      </div>\n      ",
  props: ["show-table-data"]
});
Vue.component("content-data", {
  template: "\n      <li>\n        <img :src=\"showTableData.flag\" @click=\"info_Open_Child\"/>\n      </li>\n    ",
  props: ["show-table-data"],
  methods: {
    info_Open_Child: function info_Open_Child() {
      // console.log('abc')
      this.$emit("update-info-open");
    }
  }
});
Vue.component("pagination", {
  template: "\n      <div class=\"pagination\">\n        <i class=\"fa fa-caret-left\" @click=\"previousPage_child\"></i>\n        {{currentPage}} / {{maxPage}}\n        <i class=\"fa fa-caret-right\" @click=\"nextPage_child\"></i>\n      </div>\n    ",
  props: ["max-page", "current-page"],
  methods: {
    previousPage_child: function previousPage_child() {
      // console.log("pre");
      this.$emit("previous-page-child");
    },
    nextPage_child: function nextPage_child() {
      // console.log("next");
      this.$emit("next-page-child");
    }
  }
});
var app = new Vue({
  el: "#app",
  // component:{
  //   card
  // },
  data: {
    allCountries
: [],
    currentChoosedInfo
: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1
  },
  methods: {
    info_Open: function info_Open(index) {
      this.currentChoosedInfo
 = index;
    },
    info_Close: function info_Close() {
      this.currentChoosedInfo
 = null;
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
      // console.log("next");
      //   this.currentPage +=
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
    reset: function reset(page) {
      this.currentPage = page;
    },
    getString: function getString(string) {
      // console.log(string)
      this.isSearch = string; // console.log(this.isSearch)
    }
  },
  computed: {
    searchedCountries: function searchedCountries() {
      var _this = this;

      var copiedData = this.allCountries
.map(function (x) {
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
      // console.log(this.orderedCountries.length);
      //   if (this.currentPage > this.maxPage()){
      //     this.currentPag = 1
      //   }
      //   判斷search的分頁的狀態, 此處已用 keyup 的 reset替代寫了

      var start = (this.currentPage - 1) * this.pageSize;
      var end = this.currentPage * this.pageSize; // console.log('開始筆數', start, '結束筆數', end);

      return copiedData.slice(start, end); //   = return this.orderedCountries.length.slice(start, end);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    // this.testFunction();
    axios.get("https://restcountries.eu/rest/v2/all").then(function (response) {
      _this2.allCountries
 = response.data.map(function (element) {
        return element;
      });
      _this2.tableData = _this2.allCountries
.length;
    });
  }
});