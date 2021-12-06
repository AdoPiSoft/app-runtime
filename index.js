require('@adopisoft/require-jse')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const app = require('@adopisoft/app')
const crash_handler = require('./crash-handler.js')
const reboot_tmp = path.join(process.env.APPDIR, 'reboot.tmp')

async function start () {
  try {
    crash_handler(process)
    await app()
  } catch (e) {
    console.log('App crashed!', e)
    if (fs.existsSync(reboot_tmp)) {
      console.log('Running repair app...')
      require('@adopisoft/repair-upgrade')()
    } else {
      fs.writeFileSync(reboot_tmp, '')
      exec('reboot')
    }
  }
}

module.exports = start()
