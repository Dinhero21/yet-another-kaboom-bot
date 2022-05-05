const Bot = require('./Bot')
const DiscordBot = require('./DiscordBot')
const fs = require('fs')
const path = require('path')
const reload = require('require-reload')(require)

require('dotenv').config()

const servers = JSON.parse(process.env.SERVERS)

const discord = new DiscordBot({ token: process.env.DISCORD_TOKEN })

loadPlugins('./discord/plugins/', discord)

servers.forEach(server => {
  const [host, port] = server.split(':')

  const bot = new Bot({ host, port })

  discord.bots[server] = bot

  loadPlugins('./plugins/', bot)

  bot.once('login', () => {
    bot.createCore()
  })

  bot.on('parsed_chat', data => {
    discord.onParsedChat(data, bot)

    log(`${data.ansi}`)
  })

  function log (message) {
    console.log(`[${server}] ${message}\x1b[0m`)
  }
})

function loadPlugins (directory, bot) {
  for (const filename of fs.readdirSync(directory)) {
    const fullpath = path.join(__dirname, directory, filename)

    let plugin

    try {
      plugin = reload(fullpath)

      plugin.inject(bot)
    } catch (error) {
      console.error(`[${filename}] ${error}`)
    }
  }
}
