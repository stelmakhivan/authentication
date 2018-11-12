const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/users/login').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/users/register').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('Test the fake path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/fake').then(response => {
      expect(response.statusCode).toBe(404);
    });
  });
});
