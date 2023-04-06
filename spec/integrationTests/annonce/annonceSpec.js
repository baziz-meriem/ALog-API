const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/annonce/annonce";



describe('Annonce tests', () => {

});
