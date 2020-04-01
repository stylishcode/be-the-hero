const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  // Before the tests starts
  beforeEach(async () => {
    // clean the database for each test
    await connection.migrate.rollback();
    // create migrations
    await connection.migrate.latest();
  });
  
  // After the tests ends
  afterAll(() => {
    connection.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ASDE",
        email: "asde@asde.com",
        whatsapp: "91988888888",
        city: "Belém",
        uf: "PA"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});