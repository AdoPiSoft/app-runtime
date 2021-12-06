module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eload_providers', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      sort_number: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      name: {
        type: Sequelize.STRING
      },
      short_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      supports_regular_denom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
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
