const parser = require('../util/text_parser')

function inject (bot) {
  bot.on('chat', packet => {
    const message = parse(packet.message)
    client.emit('parsed_chat', message, packet)
  })

  bot.on('parsed_chat', (message, data) => {
    const { raw } = message

    if (raw.match(/<.*§r> .*/g)) {
      if (data.sender === '00000000-0000-0000-0000-000000000000') return
      const username = raw.substr(3).split('§r>')[0]
      const message = raw.split('§r> §r')[1]

      client.emit('message', username, message, data.sender)
    } else if (raw.match(/<.*> .*/g)) {
      if (data.sender === '00000000-0000-0000-0000-000000000000') return

      const username = raw.substr(3).split('>')[0]
      const message = raw.split('> ')[1]

      client.emit('message', username, message, data.sender)
    } else if (raw.match(/.* .*§r: §.*/g)) {
      if (data.sender === '00000000-0000-0000-0000-000000000000') return

      const username = raw.split(' ')[1].split('§r:')[0]
      const message = raw.split('§r: ')[1].substr(2)

      client.emit('message', username, message, data.sender)
    } else if (raw.match(/§.*§[be.]: \/.*/g)) {
      const username = raw.split(/§[be]: /)[0]
      const command = raw.split(/§[be]: /)[1]

      client.emit('cspy', username, command)
    }
  })
}