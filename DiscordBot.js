const EventEmitter = require('events')
const { Client, Intents } = require('discord.js')

class DiscordBot extends EventEmitter {
  constructor (options = {}) {
    super()

    const client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    })

    this._client = client

    client.login(options.token)

    client.on('ready', () => {
      this.emit('ready')
    })

    client.on('messageCreate', message => {
      this.emit('messageCreate', message)
    })
  }
}

module.exports = DiscordBot
