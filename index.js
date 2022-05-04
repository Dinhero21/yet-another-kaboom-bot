const Bot = require('./Bot')
const fs = require('fs')
const path = require('path')
const reload = require('require-reload')(require)

require('dotenv').config()

const servers = JSON.parse(process.env.SERVERS)

servers.forEach(server => {
  const [host, port] = server.split(':')

  const bot = new Bot({ host, port })

  loadPlugins(bot)

  bot.once('login', () => {
    bot.createCore()
  })

  bot.on('parsed_chat', data => {
    log(`${data.ansi}`)
  })

  function log (message) {
    console.log(`[${server}] ${message}\x1b[0m`)
  }
})

function loadPlugins (bot) {
  for (const filename of fs.readdirSync('./plugins')) {
    const fullpath = path.join(__dirname, './plugins', filename)

    let plugin

    try {
      plugin = reload(fullpath)

      plugin.inject(bot)
    } catch (error) {
      console.error(`[${filename}] ${error}`)
    }
  }
}
