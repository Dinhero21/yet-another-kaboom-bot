const Bot = require('./Bot')
const DiscordBot = require('./DiscordBot')
const fs = require('fs')
const path = require('path')
const reload = require('require-reload')(require)
const request = require('sync-request')

require('dotenv').config()

const servers = JSON.parse(process.env.SERVERS)

const discord = new DiscordBot({ token: process.env.DISCORD_TOKEN })

loadPlugins('./discord/plugins/', discord)

const response = request('GET', 'https://www.proxy-list.download/api/v1/get?type=socks5')

const proxies = response.getBody('utf8').split('\r\n')

servers.forEach(server => {
  const [host, port] = server.split(':')

  handleBot()

  function handleBot () {
    const bot = new Bot({ host, port, username: generateRandomUsername() })

    bot.once('login', () => {
      if (server in discord) discord.bots[server].removeAllListeners()

      discord.bots[server] = bot

      discord.onBotAdded(bot)

      loadPlugins('./plugins/', bot)

      bot.createCore()
    })

    bot.on('parsed_chat', data => {
      log(`${data.ansi}`)
    })

    bot.once('end', data => {
      log(`End: ${data}`)

      let timeout = 1000 * 5

      if (data.extra?.find(data => data.text === 'Wait 5 seconds before connecting, thanks! :)')) timeout = 1000 * 10

      setTimeout(handleBot, timeout)
    })

    // ? Should this be here?

    // bot._client.once('end', reason => {
    //   log(`End: ${reason}`)
    //
    //   setTimeout(handleBot)
    // })

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

function generateRandomUsername () {
  return Array.from({ length: 8 }, () => 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUV0123456789'[Math.floor(Math.random() * 58)]).join('')
}
