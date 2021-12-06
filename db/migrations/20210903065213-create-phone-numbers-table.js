module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('phone_numbers', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      customer_id: {
        type: Sequelize.UUID
      },
      pending_customer_id: {
        type: Sequelize.UUID
      },
      phone_number: {
        type: Sequelize.STRING
      },
      confirmation_token: {
        type: Sequelize.STRING
      },
      is_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.addIndex('phone_numbers', ['customer_id'])
    await queryInterface.addIndex('phone_numbers', ['pending_customer_id'])
    await queryInterface.addIndex('phone_numbers', ['phone_number'])
    await queryInterface.addIndex('phone_numbers', ['confirmation_token'])
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
