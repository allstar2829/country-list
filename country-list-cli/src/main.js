import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // global store
  state: {
    allcountries: [],
    current_choosed_info: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 50,
    currentPage: 1
  },
  mutations: {
    // changePageSize用變數接收(state, size)值100
    // changePageSize(state, size) {
    //   state.pageSize = size;
    // },
    // addCountries用變數country接收data
    getCountries(state, country) {
      state.allcountries = country;
    },
    // resetCountries(state) {
    //   // 或是讓state的allcountries 值清空
    //   state.allcountries = [];
    // }
    getTableData(state, tableData) {
      // 讓state的allcountries 值變更
      state.tableData = tableData;
    },
    chooseInfo(state,choosedOrNot){
      state.current_choosed_info = choosedOrNot;
    },
    reverseOrder(state,reverse){
      state.isReverse = reverse;
    },
    isSearch(state){
      state.isSearch = isSearch;
    },
    getPageSize(state, size) {
      state.pageSize = size;
    },
    currentPage(state, nowPage) {
      state.currentPage = nowPage;
    },
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
