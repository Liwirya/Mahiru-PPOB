const fs = require('fs');
const chalk = require('chalk')
const moment = require('moment')
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')


require('../index')
nocache('../index', module => console.log(chalk.greenBright('[ Mas Khan Store ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

require('../main')
nocache('../main', module => console.log(chalk.greenBright('[ Mas Khan Store ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

// Auto Update Server
require('./myfunc')
nocache('./myfunc', module => console.log(chalk.greenBright('[ Mas Khan Store ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

module.exports = { nocache, uncache }