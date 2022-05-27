const CommandHandler = require('./CommandHandler')
const { tellraw, error } = require('../util/chat')

class ChatCommandHandler extends CommandHandler {
  constructor (args, bot, username, sender) {
    super(args, bot)

    this.username = username
    this.sender = sender

    const player = bot.players.getPlayerByUUID(sender)

    this.player = player
  }

  tellraw (message, username = this.player.name) {
    tellraw(this.bot, message, username)
  }

  error (message, username = this.player.name) {
    error(this.bot, message instanceof Error ? message.stack : typeof message === 'string' ? message : null, username)
  }
}

module.exports = ChatCommandHandler
