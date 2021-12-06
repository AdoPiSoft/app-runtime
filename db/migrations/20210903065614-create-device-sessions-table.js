module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('device_sessions', {
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
      mobile_device_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      session_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('device_sessions', ['machine_id'])
    await queryInterface.addIndex('device_sessions', ['mobile_device_id'])
    await queryInterface.addIndex('device_sessions', ['session_id'])
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
