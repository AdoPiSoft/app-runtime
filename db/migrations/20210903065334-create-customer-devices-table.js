module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_devices', {
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
        type: Sequelize.UUID
      },
      customer_id: {
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.addIndex('customer_devices', ['machine_id'])
    await queryInterface.addIndex('customer_devices', ['mobile_device_id'])
    await queryInterface.addIndex('customer_devices', ['customer_id'])
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
