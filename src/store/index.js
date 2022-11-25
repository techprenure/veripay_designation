import Vue from "vue";
import Vuex from "vuex";
const company = JSON.parse(localStorage.getItem('@veripay_user'))

Vue.use(Vuex);

export default new Vuex.Store({
  
        state: {
          //jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTE4MTEyNywianRpIjoiZDQzYzJmZjgtMjhkOC00ZjI1LWIxY2UtZjdiOWEyY2EzMDUzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJlbWFpbCI6Im9ueWVrYWNoaXNhbXVlbDE4QGdtYWlsLmNvbSIsImNvdW50cnlfY29kZSI6IisyMzQiLCJwaG9uZSI6IjA4MDY5NTIzNjM5IiwiYnVzaW5lc3NfbmFtZSI6IkFwcG1hcnQgSW50ZWdyYXRlZCIsImNvbXBhbnlfdXJsIjoiaHR0cDovL2FwcG1hcnRpbnRlZ3IudmVyaXBheS5uZyIsInZhbGlkYXRpb24iOjEsImluc3RpdHV0aW9uX2NvZGUiOiJLMTI1NCIsIm5hbWUiOiJBcHBtYXJ0IEludGVncmF0ZWQiLCJzZXR1cCI6MCwic2lnbnVwX3N0YWdlIjo0LCJhY3RpdmF0ZWQiOnRydWUsImFkbWluX2NvZGUiOiI5Mzk4MjMzMzIxMTEyMTIwMjIiLCJhZGRyZXNzIjoiR2F0ZSIsImNpdHkiOiJVbXVhaGlhIiwiY291bnRyeSI6Ik5pZ2VyaWEiLCJzdGF0ZSI6IkFiaWEiLCJ6aXBfY29kZSI6IjEyMzM0NSJ9LCJuYmYiOjE2NjkxODExMjcsImV4cCI6MTY2OTIyNDMyN30.2i4bk7B6Zo8mpdizFPTCvKkEZXswN_BHRZqAuq9lqkE',
        jwt: localStorage.getItem('@veripay_token'),

     institution_code: company.institution_code,
  //  institution_code: "K1254",
    baseURL: 'http://localhost:8080' 
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
also 