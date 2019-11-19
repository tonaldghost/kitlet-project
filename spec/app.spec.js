const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sorted'));
const request = require('supertest');
const connection = require('../db/connection');

after(() => {
	connection.destroy();
});
beforeEach(() => {
	return connection.seed.run();
});

describe('/api', () => {
	describe('/items', () => {
		describe('GET RESOLVED', () => {
			it('Status: 200 and returns all items', () => {
				return request(app).get('/api/items').expect(200).then(({ body: { items } }) => {
					expect(items[0]).contains.keys('price', 'item_id', 'owner', 'category', 'body', 'img_url', 'is_available');
				});
			});
		});
		describe('GET REJECTED', () => {
			it('catches any anomalous urls passed --> WILDCARD', () => {
				return request(app).get('/api/banarama').expect(404).then(({ body }) => {
					expect(body.wildcard).to.equal('Page not found!');
				});
			});
		});
		// potential errors for this post request are rife.
		// passed false for is_available? invalid owner?
		// think we need price in items table?
		// error when sending image off to firebase?
		// describe('POST RESOLVED', () => {
		// 	it('Status: 200, adds new item and returns the object just added in full. (returned on key of item)', () => {
		// 		return request(app)
		// 			.post('/api/items')
		// 			.send({
		// 				owner: 'umayrs95',
		// 				body: 'my new music thing up for grabs guys - only $10!',
		// 				category: 'Music',
		// 				img_url: 'hhtp:fakeimg',
		// 				is_available: true,
		// 				price: 10
		// 			})
		// 			.expect(200)
		// 			.then(({ body }) => {
		// 				console.log(body);
		// 			});
		// 	});
		// });
	});
	describe('/items/:item_id', () => {
		describe('GET RESOLVED', () => {
			it('Status: 200 and returns single item by its id on the key item (no array)', () => {
				return request(app).get('/api/items/3').expect(200).then(({ body: { item } }) => {
					expect(item).to.contain.keys('owner', 'category', 'body', 'img_url', 'is_available');
				});
			});
		});
		describe('GET REJECTED', () => {
			it('returns 404 if passed non-existent author', () => {
				return request(app).get('/api/items/99').expect(404).then(({ text }) => {
					expect(text).to.equal('Item not found');
				});
			});
			it('returns 404 if passed invalid item end point (not numeric)', () => {
				return request(app).get('/api/items/apples').expect(404);
			});
		});
	});
	describe('/categories', () => {
		describe('GET RESOLVED', () => {
			it('Status: 200 and returns all items', () => {
				return request(app).get('/api/categories').expect(200).then(({ body: { categories } }) => {
					expect(categories[0]).to.contain.keys('slug', 'description');
				});
			});
		});
	});
	describe('/users', () => {
		describe('GET RESOLVED', () => {
			it('Status: 200 and returns all users', () => {
				return request(app).get('/api/users').expect(200).then(({ body: { users } }) => {
					expect(users[0]).to.contain.keys('username', 'fullname', 'img');
				});
			});
		});
	});
	describe('/users/:username', () => {
		describe('GET RESOLVED', () => {
			it('Status: 200 and returns single user by username (no array)', () => {
				return request(app).get('/api/users/tonyboi').expect(200).then(({ body: { user } }) => {
					expect(user).to.contain.keys('username', 'fullname', 'img');
				});
			});
		});
	});
});
