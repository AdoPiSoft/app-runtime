var yaml = require('js-yaml')
var fs = require('fs')
var createUUID = require('uuid-by-string')
var seed_path = `${process.env.APPDIR}/db/seeds/eload_providers.yaml`
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var seeds = yaml.safeLoad(fs.readFileSync(seed_path)).map(s => {
      s.id = createUUID(String(s.id))
      s.created_at = new Date()
      return s
    })
    await queryInterface.bulkInsert('eload_providers', seeds)
  },

  down: (queryInterface, Sequelize) => {
    var { Op } = Sequelize
    var seeds = yaml.safeLoad(fs.readFileSync(seed_path))
    var ids = seeds.map((s) => createUUID(String(s.id)))
    return queryInterface.bulkDelete('eload_providers', {id: {[Op.in]: ids} }, {})
  }
}
