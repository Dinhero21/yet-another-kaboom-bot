function parseUsername (username) {
  return username
    .replace(/§c/, '')
}

module.exports = { parseUsername }
