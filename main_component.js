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
  template: `
      <div class="topBar">
        <h1>COUNTRY LIST</h1>
        <search-bar @update-text="getChildText" @update-current-page="getCurrentPage"></search-bar>
      </div>
    `,
  props: ["current-page-parent"],
  methods: {
    getChildText(searchText) {
      // return searchText
      // 確定有得到search-bar 傳回值
      this.$emit("update-text", searchText);
      // 直接再把searchText 傳出去
      // <main-nav> 接值 @update-text後, 執行"getString"
    },
    getCurrentPage(currentPage) {
      this.$emit("update-current-page", currentPage);
      // console.log(currentPage)
    },
  },
});

// 組件內的data 必為函式, 如此重複使用組件才不會影醒彼此的值
// 詳見語昕影片
Vue.component("search-bar", {
  template: `
      <div class="searchBar">
        <input type="text" placeholder="S E A R C H" @keyup="currentPageChildChange"
        v-model="searchString" @input="sendToParent" />
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    `,
  data() {
    return {
      searchString: "",
      currentPageChild: 1,
    };
  },
  methods: {
    sendToParent() {
      if (this.searchString !== "") {
        this.$emit("update-text", this.searchString);
      } else {
        this.$emit("update-text", (this.searchString = ""));
        // console.log(this.searchString = '')
      }
    },
    currentPageChildChange() {
      // console.log(this.currentPageChild)
      this.$emit("update-current-page", this.currentPageChild);
    },
  },
});

Vue.component("order-btn", {
  template: `
      <div class="orderBtn" @click="changeChildOrder">
        <i class="fa fa-list" aria-hidden="true"></i>
      </div>`,
  data() {
    return {
      isChildReverse: false,
    };
  },
  methods: {
    changeChildOrder() {
      this.$emit("update-order", this.isChildReverse);
      // console.log(this.isChildReverse);
    },
  },
});

// 對比info, info-bg沒有引用父層資料 props: ['show-table-data'], 所以若 有加v-if =showTableData, 就會報錯 !
Vue.component("info-bg", {
  template: `
      <div
        class="infoBg"
        @click="info_Close_Child"
      ></div>
      `,
  methods: {
    info_Close_Child() {
      this.$emit("update-info-close");
    },
  },
});

// info藉由props 傳入資料後, 傳入的是showTableData內的[一筆資料] (showTableData[currentChoosedInfo
]) 有點類似item的概念, 所以獲取的資料就是 showTableData.屬性
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
  props: ["show-table-data"],
});

Vue.component("content-data", {
  template: `
      <li>
        <img :src="showTableData.flag" @click="info_Open_Child"/>
      </li>
    `,
  props: ["show-table-data"],
  methods: {
    info_Open_Child() {
      // console.log('abc')
      this.$emit("update-info-open");
    },
  },
});

Vue.component("pagination", {
  template: `
      <div class="pagination">
        <i class="fa fa-caret-left" @click="previousPage_child"></i>
        {{currentPage}} / {{maxPage}}
        <i class="fa fa-caret-right" @click="nextPage_child"></i>
      </div>
    `,
  props: ["max-page", "current-page"],
  methods: {
    previousPage_child() {
      // console.log("pre");
      this.$emit("previous-page-child");
    },
    nextPage_child() {
      // console.log("next");
      this.$emit("next-page-child");
    },
  },
});

const app = new Vue({
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
    currentPage: 1,
  },
  methods: {
    info_Open(index) {
      this.currentChoosedInfo
 = index;
    },
    info_Close() {
      this.currentChoosedInfo
 = null;
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
    maxPage() {
      let result = this.searchedCountries.length / this.pageSize;
      // // console.log(result) // Nan
      // console.log(this.showTableData) // array > console.log(this.showTableData.length)
      // console.log(this.pageSize)
      let maxPage = Math.ceil(result);
      // console.log(maxPage)
      return maxPage;
    },
    reset(page) {
      this.currentPage = page;
    },
    getString(string) {
      // console.log(string)
      this.isSearch = string;
      // console.log(this.isSearch)
    },
  },
  computed: {
    searchedCountries() {
      const copiedData = this.allCountries
.map((x) => x);
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
      // console.log(this.orderedCountries.length);

      //   if (this.currentPage > this.maxPage()){
      //     this.currentPag = 1
      //   }
      //   判斷search的分頁的狀態, 此處已用 keyup 的 reset替代寫了

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
      this.allCountries
 = response.data.map((element) => element);

      this.tableData = this.allCountries
.length;
    });
  },
});
