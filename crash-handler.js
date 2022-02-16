const path = require('path')
const util = require('util')
const fs = require('fs')
const append = util.promisify(fs.appendFile)
const log_path = path.join(process.env.APPDIR, 'system.log')
const type = 'critical'

function log (err) {
  let d = new Date()
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  let date = [year, month, day].join('-')
  let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let datetime = [date, time].join(' ')
  let msg = encodeURIComponent(err.toString())
  return append(log_path, `${type} [[ ${msg} ]] ${datetime}\n`)
}

module.exports = (p) => {
  p.on('unhandledRejection', e => {
    console.log('unhandledRejection', e)
    return log(e)
  })

  p.on('uncaughtException', async (err) => {
    console.log('uncaughtException', err)
    await log(err)
    p.exit(1)
  })

  p.on('error', async (err) => {
    console.log('Uncaught Error', err)
    return log(err)
  })
}
