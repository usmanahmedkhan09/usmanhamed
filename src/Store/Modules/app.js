import createPersistedState from 'vuex-persistedstate'
import { english, arabic } from '../../lib/Translation';
import i18n, { selectedLocale } from '../../plugins/i18n'

export const appModule = {
  state: {
    language: null,
    engArr: '1',
    locale: selectedLocale
  },
  getters: { 
    getLanguage: (state) => { return state.language },
    getEngArr: (state) => { return state.engArr }
  },
  mutations: {
    updateLocale(state, newLocale) {
      state.locale = newLocale
    },
    setLanguage(state,payload){
      if(payload == '1'){
        localStorage.setItem('isEnglish','1');
        document.body.classList.add('english');
        document.body.classList.remove('arabic');
        document.body.setAttribute("dir", "ltr");
        this.state.language = english;
        this.state.engArr = '1'
      }
      else{
        localStorage.setItem('isEnglish','0');
        document.body.classList.add('arabic');
        document.body.classList.remove('english');
        document.body.setAttribute("dir", "rtl");
        this.state.language = arabic;
        this.state.engArr = '0'
      } 
    }
  },
  actions: {
    SET_LANGUAGE({commit,state}, payload){
      commit('setLanguage',payload);
    },
    changeLocale({ commit }, newLocale) {
      i18n.locale = newLocale // important!
      commit('updateLocale', newLocale)
    }
  }
}
