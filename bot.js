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

    this.host = options.host
    this.port = options.port
    this.server = `${options.host}:${options.port}`

    this.position = new Vec3(null, null, null)

    const client = createClient(options)
    this._client = client

    this.version = client.version

    client.once('login', data => {
      this.entityId = data.entityId // Entity id for op detection

      this.emit('login', data)
    })

    client.on('chat', data => {
      this.emit('chat', data)
    })

    client.on('position', data => {
      this.position = data
      this.emit('position', data)
    })

    client.once('end', reason => {
      this.emit('end', reason, 'end')
    })

    client.once('kick_disconnect', data => {
      const parsed = JSON.parse(data.reason)

      this.emit('end', parsed, 'kick_disconnect')
    })

    client.once('disconnect', data => {
      const parsed = JSON.parse(data.reason)

      this.emit('end', parsed, 'disconnect')
    })

    client.on('error', error => {
      this.emit('end', error, 'error')
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
