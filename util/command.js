const fs = require('fs')
const path = require('path')
const reload = require('require-reload')(require)

function getCommands () {
  const commands = []

  for (const filename of fs.readdirSync(path.join(__dirname, '../commands/'))) {
    const fullpath = path.join('../commands/', filename)

    let command

    try {
      command = reload(fullpath)
      command.parsed = true
    } catch (error) {
      command = { error, parsed: false }
    }

    commands.push(command)
  }

  return commands
}

function getCommandByName (name) {
  const commands = getCommands()

  for (const command of commands) {
    if (command.name === name) return command
  }

  return null
}

module.exports = { getCommands, getCommandByName }
