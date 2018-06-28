
const ADD_CHANNEL = (state, channel) => {
  console.log('mutationg store to add channel ' + channel)
  state.channels[channel] = {}
}

export default {
  ADD_CHANNEL
}
