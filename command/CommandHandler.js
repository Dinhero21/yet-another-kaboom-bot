class CommandHandler {
  constructor (args, bot) {
    this.args = args
    this.bot = bot
    this.core = this.bot.core
  }
}

module.exports = CommandHandler
