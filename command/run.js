const { getCommandByName } = require('../util/command')

const ChatCommandHandler = require('./ChatCommandHandler')
const DiscordCommandHandler = require('./DiscordCommandHandler')

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
  },
  discord (name, args, message, minecraft, bot) {
    const command = getCommandByName(name)

    const handler = new DiscordCommandHandler(args, bot, minecraft, message)

    if (!command) {
      handler.error('Unknown Command!')
      return
    }

    if (!command.discord) {
      handler.error('This command is not supported for discord!')
      return
    }

    try {
      command.discord(handler)
    } catch (error) {
      handler.error(error)
    }
  }
}
