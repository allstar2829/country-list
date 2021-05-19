import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  // global store
  state: {
    allcountries: [],
    current_choosed_info: 1,
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
      // console.log(country) 有接到陣列 含250筆資料
      console.log(country[0].flag)
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
