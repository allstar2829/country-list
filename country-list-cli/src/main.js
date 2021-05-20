import Vue from "vue";
import Vuex from "Vuex";
import App from "./App.vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  // global store
  state: {
    allCountries: [],
    currentChooseInfo: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
    calculatedPage: 1,
  },
  mutations: {
    setCountries(state, country) {
      state.allCountries = country;
      // console.log(country) 有接到陣列 含250筆資料
      // console.log(country[0].flag)
    },
    infoOpen(state, index) {
      state.currentChooseInfo = index;
    },
    infoClose(state) {
      state.currentChooseInfo = null;
    },
    changeOrder(state) {
      state.isReverse = !state.isReverse;
    },
    searchString(state) {
      state.isSearch = "";
    },
    previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    nextPage(state) {
      if (state.currentPage === state.calculatedPage) {
        return false;
      } else {
        state.currentPage += 1;
      }
    },
    calculatedPage(state, page){
      state.calculatedPage = page
    },
    reset(state){
      state.currentPage = 1;
    }
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
