module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eload_denoms', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.ENUM('range', 'specific'),
        defaultValue: 'range'
      },
      machine_id: {
        type: Sequelize.STRING
      },
      provider_id: {
        type: Sequelize.UUID
      },
      description: {
        type: Sequelize.TEXT
      },
      denominations: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      topup: {
        type: Sequelize.INTEGER
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('eload_denoms', ['machine_id'])
    await queryInterface.addIndex('eload_denoms', ['provider_id'])
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
