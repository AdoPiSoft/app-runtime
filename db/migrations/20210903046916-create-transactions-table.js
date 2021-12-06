module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
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
      coinslot_id: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.ENUM('voucher', 'coin', 'cash', 'eload', 'subscription')
      },
      voucher_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2)
      },
      mobile_device_mac: {
        type: Sequelize.STRING
      },
      mobile_device_id: {
        type: Sequelize.UUID
      },
      phone_number: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('transactions', ['coinslot_id'])
    await queryInterface.addIndex('transactions', ['customer_id'])
    await queryInterface.addIndex('transactions', ['voucher_id'])
    await queryInterface.addIndex('transactions', ['mobile_device_mac'])
    await queryInterface.addIndex('transactions', ['mobile_device_id'])
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
