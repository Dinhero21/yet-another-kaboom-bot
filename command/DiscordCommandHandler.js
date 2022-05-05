const CommandHandler = require('./CommandHandler')
const generateErrorEmbed = require('../util/discord')

class DiscordCommandHandler extends CommandHandler {
  constructor (args, bot, minecraft, message) {
    super(args, bot)

    this.minecraft = minecraft
    this.message = message
  }

  error (error) {
    const errorEmbed = generateErrorEmbed(error)

    this.sendEmbed(errorEmbed)
  }

  sendEmbed (embed) {
    this.send({ embeds: [embed] })
  }

  send (message) {
    this.message.channel.send(message)
  }
}

module.exports = DiscordCommandHandler
