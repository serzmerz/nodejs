'use strict';
module.exports = {
    up(queryInterface, Sequelize) {
        queryInterface.createTable(
            'User',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                username: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
                },
                accessToken: {
                    type: Sequelize.STRING
                },
                refreshToken: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                }
            },
            {
                engine: 'InnoDB',
                charset: 'utf-8',
                schema: 'public'
            }
        );
    }
};
