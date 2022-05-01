const { getCommandByName } = require('../util/command')

const ChatCommandHandler = require('./ChatCommandHandler')

module.exports = {
  chat (name, args, bot) {
    const command = getCommandByName(name)

    const handler = new ChatCommandHandler(args, bot)

    if (!command) {
      console.error(`Unknown command: ${name}.`)
      return
    }

    command.chat(handler)
  }
}