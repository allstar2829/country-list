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
    pageSize: 1,
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
    chooseInfo(state){
      state.current_choosed_info = null;
    },
    // chooseInfoClose(state){
    //   state.current_choosed_info = null;
    // },
    reverseOrder(state){
      state.isReverse = false;
    },
    searchString(state){
      state.isSearch = "";
    },
    getPageSize(state) {
      state.pageSize = 25;
    },
    currentPage(state) {
      state.currentPage = 1;
    },
    text(){
      console.log(aaa)
    }
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
