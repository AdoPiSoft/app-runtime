var path = require('path')
var fs = require('fs-extra')
var validator = require('json-duplicate-key-handle')
var translations_path = path.join(__dirname, 'config/translations')
var default_file = 'en.json'

async function validateKeys () {
  var missing_keys = {}
  var enTranslations = await fs.readJson(path.join(translations_path, default_file))
  var keys = Object.keys(enTranslations)
  var files = await fs.readdir(translations_path).then(files => files.filter(f => f !== default_file))
  for (var f of files) {
    var ext = path.extname(f)
    if (ext === '.json') {
      var translations = await fs.readJson(path.join(translations_path, f))
      keys.forEach(k => {
        if (!translations[k]) {
          missing_keys[f] = missing_keys[f] || []
          missing_keys[f].push(k)
        }
      })
    }
  }
  if (Object.keys(missing_keys).length) {
    var formatted_keys = ''
    files.forEach(f => {
      if (missing_keys[f]) {
        formatted_keys += `\n${f}:`
        missing_keys[f].forEach(k => {
          formatted_keys += `\n\t${missing_keys[f].join('\n\t')}`
        })
      }
    })
    throw new Error(`\nIncomplete Translations:\n${formatted_keys}\n\n`)
  }
}

async function validateTranslations () {
  var files = await fs.readdir(translations_path)

  for (var f of files) {
    var ext = path.extname(f)
    if (ext === '.json') {
      var translationFile = path.join(translations_path, f)
      var content = await fs.readFile(translationFile, 'utf8')
      var err = validator.validate(content)
      if (err) {
        throw new Error(`${err}\nin translation file: ${translationFile}\n`)
      }
    }
  }

  validateKeys()
}

module.exports = validateTranslations()
