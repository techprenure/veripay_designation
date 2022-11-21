import Vue from "vue";
import Vuex from "vuex";
const company = JSON.parse(localStorage.getItem('@veripay_user'))

Vue.use(Vuex);

export default new Vuex.Store({
  
        state: {
          // jwt:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2OTA2NjkyNiwianRpIjoiNDk0YzExNDYtYjdhOC00NDM2LTgzY2EtYmM5ZTE1ZDY0M2ExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJlbWFpbCI6Im9ueWVrYWNoaXNhbXVlbDE4QGdtYWlsLmNvbSIsImNvdW50cnlfY29kZSI6IisyMzQiLCJwaG9uZSI6IjA4MDY5NTIzNjM5IiwiYnVzaW5lc3NfbmFtZSI6IkFwcG1hcnQgSW50ZWdyYXRlZCIsImNvbXBhbnlfdXJsIjoiaHR0cDovL2FwcG1hcnRpbnRlZ3IudmVyaXBheS5uZyIsInZhbGlkYXRpb24iOjEsImluc3RpdHV0aW9uX2NvZGUiOiJLMTI1NCIsIm5hbWUiOiJBcHBtYXJ0IEludGVncmF0ZWQiLCJzZXR1cCI6MCwic2lnbnVwX3N0YWdlIjo0LCJhY3RpdmF0ZWQiOnRydWUsImFkbWluX2NvZGUiOiI5Mzk4MjMzMzIxMTEyMTIwMjIiLCJhZGRyZXNzIjoiR2F0ZSIsImNpdHkiOiJVbXVhaGlhIiwiY291bnRyeSI6Ik5pZ2VyaWEiLCJzdGF0ZSI6IkFiaWEiLCJ6aXBfY29kZSI6IjEyMzM0NSJ9LCJuYmYiOjE2NjkwNjY5MjYsImV4cCI6MTY2OTExMDEyNn0.f5zXTuKTVjiKqoZs5axLyAiczCvPKy92xekWKJhxccU',
          jwt: localStorage.getItem('@veripay_token'),

    institution_code: company.institution_code,
    // institution_code: "K1254",
    baseURL: 'http://143.198.235.199'
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
