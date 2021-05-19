import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  // global store
  state: {
    allCountries: [],
    currentChoosedInfo: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
    maxPage: 1
  },
  mutations: {
    getCountries(state, country) {
      state.allCountries = country;
      // console.log(country) 有接到陣列 含250筆資料
      // console.log(country[0].flag)
    },
    changeOrder(state) {
      state.isReverse = !state.isReverse;
    },
    searchString(state) {
      state.isSearch = "";
    },
    maxPage(state) {
      let result = state.allCountries.length / state.pageSize;
      let maxPage = Math.ceil(result);

      state.maxPage = maxPage;
      console.log(maxPage);
    },
    previousPage(state) {
      if (state.state.currentPage > 1) {
        state.state.currentPage -= 1;
      }
    },
    nextPage() {
      if (state.state.currentPage === 10) {
        return false;
      } else {
        state.state.currentPage += 1;
      }
    }
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
