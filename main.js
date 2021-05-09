new Vue({
  el: "#app",
  data: {
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
    // searchedCountriesNum: 1,
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
      // console.log("pre");
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      console.log("next");
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
    maxPage() {
      let result = this.searchedCountries.length / this.pageSize;
      // // console.log(result) // Nan
      // console.log(this.showTableData) // array > console.log(this.showTableData.length)
      // console.log(this.pageSize)
      let maxPage = Math.ceil(result);
      // console.log(maxPage)
      return maxPage;
    },
    reset() {
      this.currentPage = 1;
    },
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

      // console.log('長度',this.currentPage - 1 );
      // console.log('顯示筆數', this.pageSize);
      //  console.log(this.orderedCountries.length);

      //   if (this.currentPage > this.maxPage()){
      //     this.currentPag = 1
      //   }
      //   判斷search的時候 分頁的狀態, 此處已用 keyup 的 reset替代寫了

      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      // console.log('開始筆數', start, '結束筆數', end);

      return copiedData.slice(start, end);
      //   = return this.orderedCountries.length.slice(start, end);
    },
  },

  mounted() {
    // this.testFunction();

    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      this.allcountries = response.data.map((element) => element);

      this.tableData = this.allcountries.length;
    });
  },
});
