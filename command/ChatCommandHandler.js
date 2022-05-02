const CommandHandler = require('./CommandHandler')
const { tellraw } = require('../util/chat')

class ChatCommandHandler extends CommandHandler {
  constructor (args, bot, username) {
    super(args, bot)

    this.username = username
  }

  tellraw (message, username = this.username) {
    tellraw(this.bot, message, username)
  }
}

module.exports = ChatCommandHandler
