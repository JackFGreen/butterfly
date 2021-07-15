const chalk = require('chalk')

exports.log = (s, color = 'green') => {
  console.log(chalk[color](s))
}
