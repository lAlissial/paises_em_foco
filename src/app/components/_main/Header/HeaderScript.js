import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState('filterReducer', {
      hideFilter: state => state.result
    })
  },
  methods: {
    ...mapActions('filterReducer', ['setFilterVisibility']),
    show () {
      this.setFilterVisibility()
    }
  }
}
