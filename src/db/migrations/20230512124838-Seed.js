'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            { id:4, email: 'john@example.com', password: '12345678',firstName: "firstName1",lastName: "lastName1" },
            { id:5, email: 'name@example.com', password: '123456789', firstName: "firstName2",lastName: "lastName2"},
            { id:6, email: 'mick@example.com', password: '1234567899',firstName: "firstName3",lastName: "lastName3"}
        ], {});
        await queryInterface.bulkInsert('Blogs', [
            { text: 'message example1', userId: '4' },
            { text: 'message example2', userId: '5' },
            { text: 'message example3', userId: '6' }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Blogs', null, {});
    }
};
