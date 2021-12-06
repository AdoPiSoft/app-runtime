module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription_payments', {
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
      account_number: {
        type: Sequelize.STRING
      },
      ref_number: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.UUID
      },
      amount: {
        type: Sequelize.INTEGER
      },
      paid_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('subscription_payments', ['account_number'])
    await queryInterface.addIndex('subscription_payments', ['ref_number'])
    await queryInterface.addIndex('subscription_payments', ['transaction_id'])
    await queryInterface.addIndex('subscription_payments', ['paid_at'])
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
