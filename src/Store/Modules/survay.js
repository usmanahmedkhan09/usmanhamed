export const survayModule = {
  state: {
    survayInfo: {}
  },
  getters: { 
    getSurvay: state => state.survayInfo 
  },
  mutations: {
    setSurvay(state,payload){
        this.state.survayInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
}
