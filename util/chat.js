const colors = require('../colors.json')

function tellraw (bot, message = null, username = '@a') {
  return bot.core.run(`tellraw ${username} ${JSON.stringify(message)}`)
}

function error (bot, message = null, username = '@a') {
  this.tellraw({ text: `Error: ${message}`, color: colors.error })
}

module.exports = { tellraw, error }
