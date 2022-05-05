const CommandHandler = require('./CommandHandler')
const { tellraw, error } = require('../util/chat')

class ChatCommandHandler extends CommandHandler {
  constructor (args, bot, username) {
    super(args, bot)

    this.username = username
  }

  tellraw (message, username = this.username) {
    tellraw(this.bot, message, username)
  }

  error (message, username = this.username) {
    console.log(message)
    console.log(typeof message)
    error(this.bot, message instanceof Error ? message.stack : typeof message === 'string' ? message : null, username)
  }
}

module.exports = ChatCommandHandler
