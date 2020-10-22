export default {
  setProfession(state, item) {
    state.user = item
  },
  newGame(state) {
    state.user = {}
  }
}
