const colors = require('../colors.json')

function tellraw (bot, message = null, username = '@a') {
  return bot.core.run(`tellraw ${username} ${JSON.stringify(message)}`)
}

function error (bot, message = null, username = '@a') {
  return tellraw(bot, { text: `Error: ${message}`, color: colors.error }, username)
}

module.exports = { tellraw, error }
