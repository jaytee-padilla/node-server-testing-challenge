//database
const db = require('../data/db-config');

module.exports = {
	get,
	getById,
	findByUsername,
	add,
	deleteUser
}

function get() {
	return db('users')
		.select('user_id', 'username')
		.orderBy('user_id');
}

function getById(id) {
	return db('users')
		.where('user_id', id);
}

function findByUsername(username) {
	return db('users')
		.where('username', username)
		.first();
}

async function add(userAcc) {
	const [id] = await db('users').insert(userAcc, 'id');
	
	return getById(id);
}

function deleteUser(id) {
	return db('users')
		.where('user_id', id)
		.del();
}