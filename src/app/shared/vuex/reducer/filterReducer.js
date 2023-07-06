import FilterAction from '../action/filterAction'

const INITIAL_STATE = false

const FilterReducer = {
  namespaced: true,
  state: {
    result: INITIAL_STATE
  },
  mutations: {
    openCloseFilter (state) {
      state.result = !state.result
    }
  },
  actions: FilterAction
}

export default FilterReducer
