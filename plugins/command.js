const run = require('../command/run')
const config = require('../config')

function inject (bot) {
  bot.on('message', (username, message) => {
    if (username === bot.username) return

    if (message.startsWith(config.prefix.chat)) {
      message = message.substring(config.prefix.chat.length)

      const args = message.split(' ')
      const name = args.shift()

      run.chat(name, args, bot)
    }
  })
}

module.exports = { inject }
