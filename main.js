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
  template: `
    <div>
      <main-nav></main-nav>

      <main>
        <div class="intro">
          <p>Get information about countries via a RESTful API</p>
          <order-btn></order-btn>
        </div>

        <content></content>
      </main>

      <!-- 資訊彈窗 -->
      <transition name="fade">
        <info-bg></info-bg>
      </transition>

      <transition name="fade">
        <info></info>
      </transition>

      <pagination></pagination>
    </div>
  `,
  mounted() {
    // this.testFunction();

    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      this.allcountries = response.data.map((element) => element);

      this.tableData = this.allcountries.length;
    });
  },
});

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


Vue.component('main-nav', {
  template: `
    <nav>
      <h1>COUNTRY LIST</h1>
      <search-bar></search-bar>
    </nav>
  `,
});

Vue.component('search-bar', {
  template: `
    <div class="searchBar">
      <input type="text" v-model="isSearch" placeholder="S E A R C H" @keyup="reset"/>
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  `,
  data() {
    return {
      isSearch: '',
    }
  }
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
      v-if="current_choosed_info !== null"
      @click="info_Close"
    ></div>
    `,
});

Vue.component("info", {
  template: `
    <div class="info" v-if="current_choosed_info !== null">
      <div class="info_content">
        <img :src="showTableData[current_choosed_info].flag" />
        <ul>
          <li>- {{showTableData[current_choosed_info].name}}</li>
          <br />
          <li>
            2位國家代碼 : {{showTableData[current_choosed_info].alpha2Code}}
          </li>
          <li>
            3位國家代碼 : {{showTableData[current_choosed_info].alpha3Code}}
          </li>
          <li>
            母語名稱 : {{showTableData[current_choosed_info].nativeName}}
          </li>
          <li>
            替代國家名稱 :
            {{showTableData[current_choosed_info].altSpellings}}
          </li>
          <li>
            國際電話區號 :
            {{showTableData[current_choosed_info].callingCodes}}
          </li>
        </ul>
      </div>
    </div>
    `,
  props: ["current_choosed_info: null","showTableData"],
});

Vue.component('content', {
  template: `
    <div class="content">
      <ul>
        <content-data></content-data>
      </ul>
    </div>
  `,
});

Vue.component('content-data', {
  template: `
    <li v-for="(item,index) in showTableData">
      <img :src="item.flag" @click="info_Open(index)" />
    </li>
  `,
});

Vue.component('pagination', {
  template: `
    <div class="pagination">
      <i class="fa fa-caret-left" @click="previousPage"></i>
      {{currentPage}} / {{maxPage()}}
      <i class="fa fa-caret-right" @click="nextPage"></i>
    </div>
  `,
});
