import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    salary: null,
    allDeductions: [],
    deductionsVisible: false,
    alphabet: [
      { id: 1, text: 'в 1-ый год' },
      { id: 2, text: 'во 2-ой год' },
      { id: 3, text: 'в 3-ий год' },
      { id: 4, text: 'в 4-ый год' },
    ],
  },
  mutations: {
    setSalary: (state, payload) => {
      state.salary = payload;
    },
    clearHistory: (state) => {
      state.salary = '';
      state.allDeductions = [];
    },
    showDeductions: (state) => {
      state.deductionsVisible = true;
    },
    countDeductions: (state, maxPay) => {
      let yearDeduction = state.salary * 12 * 0.13;
      let fullYears = Math.floor(Number(maxPay) / yearDeduction);
      let remainder = maxPay % yearDeduction;
      for (let i = 0; i < fullYears; i++) {
        state.allDeductions.push({ deduction: yearDeduction, id: i + 1 });
      }
      state.allDeductions.push({ deduction: remainder, id: fullYears + 1 });
    }
  },
  actions: {
    setSalary: (ctx, payload) => {
      ctx.commit('setSalary', payload);
    },
    clearHistory: (ctx) => {
      ctx.commit('clearHistory');
    },
    showDeductions: (ctx) => {
      ctx.commit('showDeductions');
    },
    countDeductions: (ctx, payload) => {
      ctx.commit('countDeductions', payload);
    }
  },
  getters: {
    getDeductionsVisible: state => {
      return state.deductionsVisible;
    },
    getDeductions: state => {
      return state.allDeductions;
    },
    getYearText: state => id => {
      let year = state.alphabet.filter(item => item.id == id);
      return year.length != 0 ? year[0].text : '';
    }
  },
})
