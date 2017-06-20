'use strict';
module.exports = {
    up(queryInterface, Sequelize) {
        queryInterface.createTable(
            'Server', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    type: Sequelize.INTEGER
                },
                updatedAt: {
                    type: Sequelize.INTEGER
                }
            },
            {
                engine: 'InnoDB',
                charset: 'utf-8',
                schema: 'public'
            }
        );
        queryInterface.changeColumn(
            'User',
            'createdAt',
            {
                type: Sequelize.INTEGER
            }
        );
        queryInterface.changeColumn(
            'User',
            'updatedAt',
            {
                type: Sequelize.INTEGER
            }
        );
    }
};
