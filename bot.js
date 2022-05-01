const { createClient } = require('minecraft-protocol')
const Vec3 = require('vec3')
const EventEmitter = require('events')

class Bot extends EventEmitter {
  constructor (options = {}) {
    super()

    options.host ??= 'localhost'
    options.port ??= 25565
    options.username ??= 'Player'
    options.password ??= null

    this.position = new Vec3(null, null, null)

    const client = createClient(options)
    this._client = client

    this.version = client.version

    client.once('login', data => {
      this.emit('login', data)
    })

    client.on('chat', data => {
      this.emit('chat', data)
    })

    client.on('position', data => {
      this.position = data
      this.emit('position', data)
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
