const request = require('supertest');
const app = require('./server');

describe('API tests', () => {
  it('should seed the database', async () => {
    const res = await request(app)
      .post('/articles/seed')
      .expect('Content-Type', /text/)
      .expect(200);
    expect(res.text).toEqual('Seed succeeded.');
  });

  it('should fetch an article by ID', async () => {
    // Database has to be seed before proceeding
    const res = await request(app)
      .get('/articles/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('title');
  });
});
