const CommandHandler = require('./CommandHandler')
const { MessageEmbed } = require('discord.js')

class DiscordCommandHandler extends CommandHandler {
  constructor (args, bot, minecraft, message) {
    super(args, bot)

    this.minecraft = minecraft
    this.message = message
  }

  error (error) {
    const errorEmbed = new MessageEmbed()

    if (error instanceof Error) {
      errorEmbed
        .setColor('RED')
        .setTitle(error.message)
        .setDescription(error.stack)
        .setFooter(error.code)
    } else if (typeof error === 'string') {
      errorEmbed
        .setColor('RED')
        .setTitle('Error')
        .setDescription(error)
    } else throw new Error('Invalid error type')

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
