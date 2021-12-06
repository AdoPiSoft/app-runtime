module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_agents', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      mobile_device_id: {
        type: Sequelize.UUID
      },
      ua_string: {
        type: Sequelize.STRING
      },
      browser_name: {
        type: Sequelize.STRING(25)
      },
      engine_name: {
        type: Sequelize.STRING(25)
      },
      os_name: {
        type: Sequelize.STRING(25)
      },
      os_version: {
        type: Sequelize.STRING(25)
      },
      device_model: {
        type: Sequelize.STRING(25)
      },
      device_type: {
        type: Sequelize.STRING(25)
      },
      device_vendor: {
        type: Sequelize.STRING(25)
      },
      cpu_architecture: {
        type: Sequelize.STRING(25)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('user_agents', ['mobile_device_id'])
    await queryInterface.addIndex('user_agents', ['ua_string'])
    await queryInterface.addIndex('user_agents', ['created_at'])
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
