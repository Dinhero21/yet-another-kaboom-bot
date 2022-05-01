const parseText = require('../util/text_parser')

module.exports = {
  /**
     * Injects the plugin into the client
     * @param {object} client - The client object
     */
  inject: function (client) {
    client.on('chat', function (packet) {
      const message = parseText(packet.message)
      client.emit('parsed_chat', message, packet)
    })

    client.on('parsed_chat', function (message, data) {
      const msg = message.raw
      if (msg.match(/<.*§r> .*/g)) {
        if (data.sender === '00000000-0000-0000-0000-000000000000') return
        const username = msg.substr(3).split('§r>')[0]
        const message = msg.split('§r> §r')[1]
        client.emit('message', username, message, data.sender)
      } else if (msg.match(/<.*> .*/g)) {
        if (data.sender === '00000000-0000-0000-0000-000000000000') return
        const username = msg.substr(3).split('>')[0]
        const message = msg.split('> ')[1]
        client.emit('message', username, message, data.sender)
      } else if (msg.match(/.* .*§r: §.*/g)) {
        if (data.sender === '00000000-0000-0000-0000-000000000000') return
        const username = msg.split(' ')[1].split('§r:')[0]
        const message = msg.split('§r: ')[1].substr(2)
        client.emit('message', username, message, data.sender)
      } else if (msg.match(/§.*§[be.]: \/.*/g)) {
        const username = msg.split(/§[be]: /)[0]
        const command = msg.split(/§[be]: /)[1]
        client.emit('cspy', username, command)
      }
    })
  }
}
