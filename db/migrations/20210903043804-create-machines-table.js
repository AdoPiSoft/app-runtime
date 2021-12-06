module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('machines', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      cid: {
        type: Sequelize.STRING
      },
      centralized_server_token: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {}
}
