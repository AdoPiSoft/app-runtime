module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vouchers', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      type: Sequelize.STRING,
      machine_id: Sequelize.STRING,
      batch_number: Sequelize.INTEGER,
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      minutes: Sequelize.INTEGER,
      megabytes: Sequelize.INTEGER,
      eload_amount: Sequelize.INTEGER,
      users_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      max_users: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      price: Sequelize.INTEGER,
      expiration_hours: Sequelize.INTEGER,
      allow_pause: Sequelize.BOOLEAN,
      generated_by: Sequelize.STRING,
      session_id: Sequelize.UUID,
      activated_at: Sequelize.DATE,
      bandwidth_down_kbps: {
        type: Sequelize.INTEGER,
        defaultValue: 1024
      },
      bandwidth_up_kbps: {
        type: Sequelize.INTEGER,
        defaultValue: 1024
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.addIndex('vouchers', ['code'])
    await queryInterface.addIndex('vouchers', ['batch_number'])
    await queryInterface.addIndex('vouchers', ['activated_at'])
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
