module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'sessions',
      'billing_email',
      {type: Sequelize.STRING, allowNull: true}
    )
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'sessions',
      'billing_email'
    )
  }
}
