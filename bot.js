const { createClient } = require('minecraft-protocol')
const EventEmitter = require('events')

class Bot extends EventEmitter {
  constructor (options = {}) {
    super()

    options.host ??= 'localhost'
    options.port ??= 25565
    options.username ??= 'Player'
    options.password ??= null

    const client = createClient(options)
    this._client = client

    client.on('chat', packet => {
      this.emit('chat', packet)
    })
  }

  write (name, params) {
    this._client.write(name, params)
  }

  chat (message) {
    this.write('chat', { message })
  }
}

module.exports = Bot