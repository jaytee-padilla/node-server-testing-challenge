const request = require('supertest');
const server = require('../server');
// set authorization token
let token;

beforeAll(done => {
	request(server)
		.post('/api/login')
		.send({
			username: "jaytee9",
			password: "yuh"
		})
		.end((error, response) => {
			token = response.body.token;
			done();
		});
});

// GET users endpoint
describe('GET /users', () =>{
	it('should return 200 OK', () => {
		return request(server)
			.get('/api/users')
			.set('Authorization', `${token}`)
			.then(res => {
				expect(res.status).toBe(200);
			})
	});

	it('return 400 Bad Request', () => {
		return request(server)
			.get('/api/users')
			.then(res => {
				expect(res.status).toBe(400);
			})
	});
})

// add user endpoint
describe('POST /register', () => {
	it('should return 201 Created', () => {
		return request(server)
			.post('/api/register')
			.send({
				// must give unique username in order to pass test
				username: "jaytee13",
				password: "yuh"
			})
			.then(res => {
				expect(res.status).toBe(201);
			})
	});

	it('should return 400 Bad Request', () => {
		return request(server)
			.post('/api/register')
			.send({
				username: "jaytee9",
				password: "yuh"
			})
			.then(res => {
				expect(res.status).toBe(400);
			})
	});
});

// login endpoint
describe('POST /login', () => {
	it('should return 200 OK', () => {
		return request(server)
			.post('/api/login')
			.send({
				username: "jaytee9",
				password: "yuh"
			})
			.then(res => {
				expect(res.status).toBe(200);
			})
	});

	it('should return 400 Bad Request', () => {
		return request(server)
			.post('/api/login')
			.send({
				username: "jaytee9",
				password: "yuhh"
			})
			.then(res => {
				expect(res.status).toBe(401);
			})
	});
});

// delete endpoint
describe('DELETE /users/:id', () => {
	it('should return 200', () => {
		return request(server)
			.delete('/api/users/4') // id must exist for test to pass
			.set('Authorization', `${token}`)
			.then(res => {
				expect(res.status).toBe(200);
			})
	});

	it('should return 404', () => {
		return request(server)
			.delete('/api/users/3') // id must exist for test to pass
			.set('Authorization', `${token}`)
			.then(res => {
				console.log(res.body)
				expect(res.status).toBe(404);
			})
	});
});