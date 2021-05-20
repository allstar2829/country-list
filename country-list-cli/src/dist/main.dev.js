"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _Vuex = _interopRequireDefault(require("Vuex"));

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_Vuex["default"]);

var store = new _Vuex["default"].Store({
  // global store
  state: {
    allCountries: [],
    currentChooseInfo: null,
    isReverse: false,
    isSearch: "",
    tableData: 1,
    pageSize: 25,
    currentPage: 1,
    calculatedPage: 1
  },
  mutations: {
    setCountries: function setCountries(state, country) {
      state.allCountries = country; // console.log(country) 有接到陣列 含250筆資料
      // console.log(country[0].flag)
    },
    infoOpen: function infoOpen(state, index) {
      state.currentChooseInfo = index;
    },
    infoClose: function infoClose(state) {
      state.currentChooseInfo = null;
    },
    changeOrder: function changeOrder(state) {
      state.isReverse = !state.isReverse;
    },
    searchString: function searchString(state) {
      state.isSearch = "";
    },
    previousPage: function previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    nextPage: function nextPage(state) {
      if (state.currentPage === state.calculatedPage) {
        return false;
      } else {
        state.currentPage += 1;
      }
    },
    calculatedPage: function calculatedPage(state, page) {
      state.calculatedPage = page;
    },
    reset: function reset(state) {
      state.currentPage = 1;
    }
  }
});
new _vue["default"]({
  el: "#app",
  store: store,
  render: function render(h) {
    return h(_App["default"]);
  }
});