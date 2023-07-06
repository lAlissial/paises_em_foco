import { createStore } from 'vuex';
import FilterReducer from './reducer/filterReducer'

const store = createStore({
  modules: {
    filterReducer: FilterReducer
  }
});

export default store
