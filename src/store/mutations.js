export default {
  changeArgs (state, obj) {
    for (let i in obj) {
      state[i] = obj[i]
    }
  }
}
