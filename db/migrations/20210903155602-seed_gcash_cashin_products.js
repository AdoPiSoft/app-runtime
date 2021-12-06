var createUUID = require('uuid-by-string')
var provider = {id: createUUID('17'), name: 'GCASH CASH-IN', short_name: 'GCASH CASH-IN', description: '', sort_number: 17, is_available: true, supports_regular_denom: false}
var yaml = require('js-yaml')
var fs = require('fs')
var seed_path = `${process.env.APPDIR}/db/seeds/eload_promos.yaml`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    provider.created_at = new Date()

    var promos = yaml.safeLoad(fs.readFileSync(seed_path))
    promos = promos.filter(p => createUUID(String(p.provider_id)) === provider.id)

    try {
      await queryInterface.bulkInsert('eload_providers', [provider])
    } catch (e) {}
    try {
      var resp = await queryInterface.sequelize.query(
        'SELECT machine_id FROM "eload_promos" ORDER BY created_at DESC LIMIT 1',
        {type: queryInterface.sequelize.QueryTypes.SELECT}
      )
      if (resp.length) {
        var [{ machine_id }] = resp
        for (var i = 0; i < promos.length; i++) {
          var keyword = promos[i].keyword
          var amount = parseInt(keyword.match(/\d+/)[0])
          promos[i].provider_id = provider.id
          promos[i].created_at = new Date()
          promos[i].price = amount + 10
          promos[i].machine_id = machine_id
        }
        await queryInterface.bulkInsert('eload_promos', promos)
      }
    } catch (e) {
      console.log('Warning:', e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('eload_providers', {id: provider.id})
    await queryInterface.bulkDelete('eload_promos', {provider_id: provider.id})
  }
}
