module.exports = {
  tellraw (bot, message = null, username = '@a') {
    bot.core.run(`tellraw ${username} ${JSON.stringify(message)}`)
  }
}