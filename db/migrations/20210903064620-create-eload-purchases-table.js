module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eload_purchases', {
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
      product_id: {
        type: Sequelize.UUID
      },
      provider_id: {
        type: Sequelize.UUID
      },
      coinslot_id: {
        type: Sequelize.STRING
      },
      coinslot_alias: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.STRING
      },
      product_keyword: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('succeed', 'failed', 'queued', 'incomplete'),
        defaultValue: 'incomplete'
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      is_refunded: {
        type: Sequelize.BOOLEAN
      },
      message: {
        type: Sequelize.STRING
      },
      suffix: {
        type: Sequelize.STRING
      },
      trace_number: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('eload_purchases', ['machine_id'])
    await queryInterface.addIndex('eload_purchases', ['provider_id'])
    await queryInterface.addIndex('eload_purchases', ['customer_id'])
    await queryInterface.addIndex('eload_purchases', ['product_id'])
    await queryInterface.addIndex('eload_purchases', ['coinslot_id'])
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
