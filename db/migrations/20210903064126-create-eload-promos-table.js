module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eload_promos', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      machine_id: {
        type: Sequelize.STRING
      },
      sort_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      short_name: {
        type: Sequelize.STRING
      },
      provider_id: {
        type: Sequelize.UUID
      },
      keyword: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      price: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.addIndex('eload_promos', ['machine_id'])
    await queryInterface.addIndex('eload_promos', ['provider_id'])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
