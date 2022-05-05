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

  handleBot()

  function handleBot () {
    const bot = new Bot({ host, port, username: 'asdasd' })

    if (server in discord) discord.bots[server].removeAllListeners()

    discord.bots[server] = bot

    discord.onBotAdded(bot)

    loadPlugins('./plugins/', bot)

    bot.once('login', () => {
      bot.createCore()
    })

    bot.on('parsed_chat', data => {
      log(`${data.ansi}`)
    })

    bot.once('end', data => {
      console.log(server, 'end', data)

      let timeout = 0

      if (data.extra?.find(data => data.text === 'Wait 5 seconds before connecting, thanks! :)')) timeout = 1000 * 6

      setTimeout(handleBot, timeout)
    })

    // ? Should this be here?

    // bot._client.once('end', reason => {
    //   log(`End: ${reason}`)
    //
    //   setTimeout(handleBot)
    // })

    bot._client.on('error', error => {
      log(error)
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
