const EventEmitter = require('events')
const { Client, Intents } = require('discord.js')

class DiscordBot extends EventEmitter {
  bots = {}

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
  }
}

module.exports = DiscordBot
