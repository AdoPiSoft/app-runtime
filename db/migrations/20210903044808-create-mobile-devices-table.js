module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mobile_devices', {
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
      customer_id: {
        type: Sequelize.UUID
      },
      alias: {
        type: Sequelize.STRING
      },
      passcode: {
        type: Sequelize.STRING
      },
      passcode_required_at: {
        type: Sequelize.DATE
      },
      hostname: {
        type: Sequelize.STRING
      },
      mac_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip_address: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      enable_cookie: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('connected', 'disconnected'),
        defaultValue: 'disconnected'
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      cloner_id: {
        type: Sequelize.UUID
      },
      blocked_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    })
    await queryInterface.addIndex('mobile_devices', ['mac_address'])
    await queryInterface.addIndex('mobile_devices', ['token'])
    await queryInterface.addIndex('mobile_devices', ['customer_id'])
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
