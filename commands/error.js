module.exports = {
  chat (handler) {
    const error = handler.args.join(' ')

    handler.error(error)
  },
  name: 'error'
}
