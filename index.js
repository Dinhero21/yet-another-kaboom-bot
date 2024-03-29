const Bot = require('./Bot')
const DiscordBot = require('./DiscordBot')
const fs = require('fs')
const path = require('path')
const reload = require('require-reload')(require)
const randomstring = require('randomstring')

require('dotenv').config()

const servers = JSON.parse(process.env.SERVERS)

const discord = new DiscordBot({ token: process.env.DISCORD_TOKEN })

loadPlugins('./discord/plugins/', discord)

servers.forEach(server => {
  const [host, port] = server.split(':')

  handleBot()

  function handleBot () {
    const bot = new Bot({ host, port, username: randomstring.generate(8) })

    if (server in discord) discord.bots[server].removeAllListeners()

    discord.bots[server] = bot

    discord.onBotAdded(bot)

    bot.once('login', () => {
      loadPlugins('./plugins/', bot)

      bot.createCore()
    })

    bot.on('parsed_chat', data => {
      log(`${data.ansi}`)
    })

    bot.once('end', data => {
      log(`End: ${data}`)

      let timeout = 1000 // server === 'sus.shhnowisnottheti.me:25565' ? 1000 * 30 : 1000

      if (data.extra?.find(data => data.text === 'Wait 5 seconds before connecting, thanks! :)')) timeout = 1000 * 6

      setTimeout(handleBot, timeout)
    })

    bot._client.on('error', error => {
      log(`Error: ${error}`)
    })

    function log (message) {
      console.info(`[${server}] ${message}\x1b[0m`)
    }
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
