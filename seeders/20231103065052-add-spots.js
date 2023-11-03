'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [
      { name: "Antarctica", cycle_access: false, lat: -90, lon: 0 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Greenland", cycle_access: false, lat: 72, lon: -40 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Easter Island", cycle_access: true, lat: -27.1127, lon: -109.3497 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Machu Picchu", cycle_access: false, lat: -13.1631, lon: -72.5450 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Mount Everest", cycle_access: false, lat: 27.9881, lon: 86.9250 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Great Barrier Reef", cycle_access: false, lat: -18.2871, lon: 147.6992 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Stonehenge", cycle_access: true, lat: 51.1789, lon: -1.8262 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Trans-Siberian Railway", cycle_access: false, lat: 55.7558, lon: 37.6176 , createdAt: new Date(), updatedAt: new Date()},
      { name: "Uluru (Ayers Rock)", cycle_access: false, lat: -25.3444, lon: 131.0369 , createdAt: new Date(), updatedAt: new Date()},
      { name: "The Great Wall of China", cycle_access: true, lat: 40.4319, lon: 116.5704 , createdAt: new Date(), updatedAt: new Date()},
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
