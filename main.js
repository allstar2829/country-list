// 測試
Vue.component('card', {
  template: `
    <div class="card">
      自己打字 {{msg}} {{parentMsg}}
    </div>`,
  props: ["parentMsg"],
  data: () => {
    return {
      msg: '這是子元件的 data'
    }
  }
});

Vue.component('main-nav', {
  template: `
    <div class="topBar">
      <h1>COUNTRY LIST</h1>
      <search-bar @update-text="getChildText"></search-bar>
    </div>
  `,
  methods:{
    getChildText(searchText){
      // return searchText
      // 得到search-bar 內傳回值
      this.$emit("update-text", searchText);
      // 直接再把searchText 傳出去
    },
  }
});

Vue.component('search-bar', {
  template: `
    <div class="searchBar">
      <input type="text" v-model="searchString" @input="sendToParent" placeholder="S E A R C H" />
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  `,
  data() {
    return {
      searchString: ""
    }
  },
  methods:{
    sendToParent() {
      if(this.searchString !== ""){
        this.$emit("update-text", this.searchString)
      }
    }
  }
});

Vue.component('order-btn', {
  template: `
    <div class="orderBtn" @click="changeOrder">
      <i class="fa fa-list" aria-hidden="true"></i>
    </div>`
  ,
  data(){
    return{
      isReverse: false,
    }
  },
  methods:{
    changeOrder() {
      this.isReverse = !this.isReverse;
    },
  }
});

// Vue.component('info-bg', {
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
  template: `
    <div class="info">
      <div class="info_content">
        <img :src="showTableData.flag" />
        <ul>
          <li>- {{showTableData.name}}</li>
          <br />
          <li>
            2位國家代碼 : {{showTableData.alpha2Code}}
          </li>
          <li>
            3位國家代碼 : {{showTableData.alpha3Code}}
          </li>
          <li>
            母語名稱 : {{showTableData.nativeName}}
          </li>
          <li>
            替代國家名稱 :
            {{showTableData.altSpellings}}
          </li>
          <li>
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
    <li @click="info_Open">
      <img :src="showTableData.flag" />
    </li>
  `,
  props: ["show-table-data"],
  methods:{
    info_Open() {
      console.log('aaa') 
    },
  }
});

// Vue.component('pagination', {
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


const app = new Vue({
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
    getString(string){
      // console.log(string)
      this.isSearch = string
      // console.log(this.isSearch)
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
