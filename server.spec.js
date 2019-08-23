const request = require('supertest');
const server = require('./server');

describe('server', () => {
	// cross-env DB_ENV=testing
	it('tests are running with DB_ENV set as "testing"', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});
	
	describe('GET /', () => {
		it('returns 200 OK', () => {
			// make a GET request to '/' on the server
			return request(server)
				.get('/')
				.then(res => {
					// check that the status code is 200
					expect(res.status).toBe(200);
				});
		});
	});
});