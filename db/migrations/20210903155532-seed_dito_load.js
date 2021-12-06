var createUUID = require('uuid-by-string')
var dito_provider = {id: createUUID('16'), name: 'DITO', short_name: 'DITO', description: '', sort_number: 6, is_available: true, supports_regular_denom: true}
var denoms = [
  {type: 'specific', denominations: '15;20;30', topup: 3, provider_id: dito_provider.id},
  {type: 'specific', denominations: '50', topup: 5, provider_id: dito_provider.id},
  {type: 'specific', denominations: '100;200;300;500;1000', topup: 6, provider_id: dito_provider.id}
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    dito_provider.created_at = new Date()

    try {
      await queryInterface.bulkInsert('eload_providers', [dito_provider])
    } catch (e) {}

    try {
      var resp = await queryInterface.sequelize.query(
        'SELECT machine_id FROM "eload_denoms" ORDER BY created_at DESC LIMIT 1',
        {type: queryInterface.sequelize.QueryTypes.SELECT}
      )
      if (resp.length) {
        var [{ machine_id }] = resp
        for (var i = 0; i < denoms.length; i++) {
          denoms[i].created_at = new Date()
          denoms[i].machine_id = machine_id
        }
        await queryInterface.bulkInsert('eload_denoms', denoms)
      }
    } catch (e) {
      console.log('Warning:', e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('eload_providers', {id: dito_provider.id})
    await queryInterface.bulkDelete('eload_denoms', {provider_id: dito_provider.id})
  }
}
