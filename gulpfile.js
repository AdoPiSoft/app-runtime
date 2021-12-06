const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const removeCode = require('gulp-remove-code')
const { series, parallel } = require('gulp')
const terser = require('gulp-terser')
const glob = require('glob')
const gulpParams = require('@adopisoft/gulp-params')

const { prod, debug, drop_console, lite } = gulpParams()

console.log('PROD?', prod)
console.log('DEBUG?', debug)
console.log('DROP_CONSOLE?', drop_console)
console.log('LITE?', lite)

function es (stream) {
  if (!debug || drop_console) {
    return stream.pipe(terser({
      module: true,
      toplevel: true,
      compress: {
        drop_console,
        drop_debugger: true
      }
    }))
  } else {
    return stream
  }
}

function esDir (dir, opts = {}) {
  const _src_dir = typeof opts.srcBaseDir === 'string' ? opts.srcBaseDir : 'src/@adopisoft'
  const _release_dir = typeof opts.releaseBaseDir === 'string' ? opts.releaseBaseDir : 'release/@adopisoft'

  async function clean () {
    const dir_path = path.join(__dirname, _src_dir, dir)
    if (fs.existsSync(dir_path)) {
      const files = await new Promise((resolve, reject) => {
        glob(path.join(__dirname, _src_dir, dir, '**/*'), (err, files) => {
          if (err) return reject(err)
          resolve(files.map(f => {
            const filename = f.replace(_src_dir, dir, '')
            const release_file = path.join(__dirname, _release_dir, dir, filename)
            return release_file
          }))
        })
      })
      for (const f of files) {
        await fs.promises.unlink(f).catch(e => {})
      }
      console.log('Cleaned dir: ', dir_path)
    } else {
      console.log('File/dir not exists: ', dir_path)
    }
  }

  function esJsFiles () {
    return es(
      gulp.src(`${_src_dir}/${dir}/**/*.js`)
        .pipe(removeCode(gulpParams()))
    ).pipe(gulp.dest(`${_release_dir}/${dir}`))
  }

  function copyOtherFiles () {
    return gulp.src([
      `${_src_dir}/${dir}/**/*`,
      `!${_src_dir}/${dir}/**/*.js`
    ]).pipe(gulp.dest(`${_release_dir}/${dir}`))
  }

  return series(
    clean,
    parallel(esJsFiles, copyOtherFiles)
  )
}

function esPlugin (dir) {
  return esDir(dir, {
    srcBaseDir: 'src/plugins',
    releaseBaseDir: 'plugins'
  })
}

exports.default = parallel(
  esDir('app'),
  esDir('core'),
  esDir('repair-upgrade'),
  esDir('plugins', {srcBaseDir: 'src', releaseBaseDir: '.'})
)

exports.plugin = esPlugin
