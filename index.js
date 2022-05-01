const Bot = require('./bot.js')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const plugins = fs.readdirSync('./plugins').map(filename => path.join(__dirname, './plugins', filename)).map(require)

const servers = JSON.parse(process.env.SERVERS)

servers.forEach(server => {
  const [host, port] = server.split(':')

  const bot = new Bot({ host, port })

  loadPlugins(bot)
})

function loadPlugins (bot) {
  for (const plugin of plugins) plugin.inject(bot)
}