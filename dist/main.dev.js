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