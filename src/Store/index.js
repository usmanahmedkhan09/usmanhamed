
import Vue from 'vue'
import Vuex from 'vuex'
import { appModule } from './Modules/app'
import { survayModule } from './Modules/survay'
import createPersistedState from 'vuex-persistedstate'
import { english, arabic } from '../lib/Translation';
import i18n, { selectedLocale } from '../plugins/i18n';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        language: 'english',
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
          if(payload == 'Arabic'){            
            document.body.classList.add('arabic');
            document.body.classList.remove('english');
            document.body.setAttribute("dir", "rtl");
            this.state.language = arabic;
            this.state.engArr = '0'
          }
          else{
            document.body.classList.add('arabic');
            document.body.classList.remove('english');
            document.body.setAttribute("dir", "rtl");
            this.state.language = arabic;
            this.state.engArr = '0'

            // document.body.classList.add('english');
            // document.body.classList.remove('arabic');
            // document.body.setAttribute("dir", "ltr");
            // this.state.language = english;
            // this.state.engArr = '1'
          } 
        },
        resetState (state) {
            const initial = initialState()
            Object.keys(initial).forEach(key => { state[key] = initial[key] })
          },
      },
      actions: {
        SET_LANGUAGE({commit,state}, payload){
          commit('setLanguage',payload);
        },
        changeLocale({ commit }, newLocale) {
          i18n.locale = newLocale // important!
          commit('updateLocale', newLocale)
        }
      },
    plugins: [createPersistedState()]
})
