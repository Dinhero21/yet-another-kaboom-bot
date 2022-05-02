const { getCommandByName } = require('../util/command')

const ChatCommandHandler = require('./ChatCommandHandler')

module.exports = {
  chat (name, args, bot, username) {
    const command = getCommandByName(name)

    const handler = new ChatCommandHandler(args, bot, username)

    if (!command) {
      handler.error('Unknown Command!')
      return
    }

    if (!command.chat) {
      handler.error('This command is not supported for chat!')
      return
    }

    try {
      command.chat(handler)
    } catch (error) {
      handler.error(error)
    }
  }
}
