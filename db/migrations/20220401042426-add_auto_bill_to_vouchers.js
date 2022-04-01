'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'vouchers',
      'auto_bill',
      {type: Sequelize.BOOLEAN, allowNull: true}
    ).then(() => {
      return queryInterface.addColumn(
        'vouchers',
        'billing_amount',
        {type: Sequelize.INTEGER, allowNull: true}
      )
    }).then(() => {
      return queryInterface.addColumn(
        'vouchers',
        'billing_date',
        {type: Sequelize.INTEGER, allowNull: true}
        )
    }).then(() => {
      return queryInterface.addColumn(
        'vouchers',
        'billing_due_date',
        {type: Sequelize.INTEGER, allowNull: true}
      )
    }).then(() => {
      return queryInterface.addColumn(
        'vouchers',
        'billing_phone_number',
        {type: Sequelize.STRING, allowNull: true}
      )
    }).then(() => {
      return queryInterface.addColumn(
        'vouchers',
        'billing_email',
        {type: Sequelize.STRING, allowNull: true}
      )
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'vouchers',
      'auto_bill'
    ).then(() => {
      return queryInterface.removeColumn(
        'vouchers',
        'billing_amount'
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'vouchers',
        'billing_date'
        )
    }).then(() => {
      return queryInterface.removeColumn(
        'vouchers',
        'billing_due_date'
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'vouchers',
        'billing_phone_number'
      )
    }).then(() => {
      return queryInterface.removeColumn(
        'vouchers',
        'billing_email'
      )
    })
  }
};
