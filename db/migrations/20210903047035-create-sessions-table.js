module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sessions', {
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
      transaction_id: {
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.STRING
      },
      max_users: {
        type: Sequelize.INTEGER
      },
      bandwidth_up_kbps: {
        type: Sequelize.INTEGER
      },
      bandwidth_down_kbps: {
        type: Sequelize.INTEGER
      },
      use_global_bandwidth: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      time_seconds: {
        type: Sequelize.INTEGER
      },
      data_mb: {
        type: Sequelize.INTEGER
      },
      running_time_seconds: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      data_consumption_mb: {
        type: Sequelize.DECIMAL(28, 6),
        defaultValue: 0
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      voucher_id: {
        type: Sequelize.UUID
      },
      expire_minutes: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.INTEGER
      },
      expiration_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      allow_pause: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      pause_limit: {
        type: Sequelize.INTEGER,
        defaultValue: 99 // unlimited
      },
      is_free_trial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      auto_bill: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      billing_amount: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      billing_date: {
        allowNull: true,
        type: Sequelize.INTEGER // day of the month
      },
      billing_due_date: {
        allowNull: true,
        type: Sequelize.INTEGER // day of the month
      },
      billing_phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.addIndex('sessions', ['transaction_id'])
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
