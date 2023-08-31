import Vue from "vue";
import Vuex from "vuex";
const company = JSON.parse(localStorage.getItem('@veripay_user'))

Vue.use(Vuex);

export default new Vuex.Store({
  
        state: {
        jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTcxMjMyOSwianRpIjoiMzAxNGNiOGItYjAwYS00NDVhLTk5Y2QtZDRhMjQ2N2ZiMzQ2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJlbWFpbCI6Imtlbm55c3VjY2Vzc2theUBnbWFpbC5jb20iLCJjb3VudHJ5X2NvZGUiOiIrMjM0IiwicGhvbmUiOiIwODEwNDc2MzgwOCIsImJ1c2luZXNzX25hbWUiOiJOb2R5IiwiY29tcGFueV91cmwiOiJodHRwOi8vbm9keS52ZXJpcGF5Lm5nIiwidmFsaWRhdGlvbiI6MSwiaW5zdGl0dXRpb25fY29kZSI6IlUwNTg4IiwibmFtZSI6Ik5vZHkiLCJzZXR1cCI6MCwic2lnbnVwX3N0YWdlIjo0LCJhY3RpdmF0ZWQiOnRydWUsImFkbWluX2NvZGUiOiI5NzkxMzc1MjExMTEyODIwMjIiLCJ2YWxpZGF0ZV90b2tlbiI6IjE4OGNjNCIsImFkZHJlc3MiOiJBZHJlc3MiLCJjaXR5IjoiSWtvcm9kdSIsImNvdW50cnkiOiJOaWdlcmlhIiwic3RhdGUiOiJMYWdvcyIsInppcF9jb2RlIjoiMjI5MjI5In0sIm5iZiI6MTY2OTcxMjMyOSwiZXhwIjoxNjY5NzU1NTI5fQ.WDqjW4VV6GblshmnwL7tY6KUFtLHpyIpwxqwyiB-yO8',
      //jwt: localStorage.getItem('@veripay_token'),

     //institution_code: company.institution_code,
    institution_code: "K1254",
    baseURL: 'http://143.198.235.199:2120' 
  },
  getters: {
    getJwt(state) {
      return state.jwt;
    },
    baseURL(state){
      return state.baseURL;
    },
    getInstuCode(state) {
      return state.institution_code;
    },
  },  
  mutations: {
    getjwt(state, payload){
      state.baseURL = payload;
    }
  },
  actions: {},
  modules: {},
});
