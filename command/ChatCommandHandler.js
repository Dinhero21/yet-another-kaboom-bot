const CommandHandler = require('./CommandHandler')

class ChatCommandHandler extends CommandHandler {
  tellraw (message) {
    console.log(message)
  }
}

module.exports = ChatCommandHandler
