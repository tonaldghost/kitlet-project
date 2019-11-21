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
			it('can accept order and sort by queries by a valid column', () => {
				return request(app).get('/api/items?sort_by=price&&order=asc').expect(200).then(({ body: { items } }) => {
					expect(items).to.be.sortedBy('price', { ascending: true });
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

		describe('POST RESOLVED', () => {
			it('Status: 200, adds new item and returns the object just added in full. (returned on key of item)', () => {
				return request(app)
					.post('/api/items')
					.send({
						owner: 'umayrs95',
						body: 'my new music thing up for grabs guys - only $10!',
						category: 'Music',
						img_url: 'hhtp:fakeimg',
						is_available: true,
						price: 10
					})
					.expect(201)
					.then(({ body: { item } }) => {
						expect(item).to.contain.keys('item_id', 'owner', 'category', 'body', 'img_url', 'is_available', 'price');
					});
			});
		});
		describe('POST REJECTED', () => {
			it('Status:400 if bad request is made', () => {
				return request(app).post('/api/items').send({}).expect(400).then(({ res: { statusMessage } }) => {
					expect(statusMessage).to.equal('Bad Request');
				});
			});
		});
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/items').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
				});
			});
		});
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
				return request(app).get('/api/items/99').expect(404).then(({ error: { text } }) => {
					expect(text).to.equal('Item not found');
				});
			});
			it('returns 404 if passed invalid item end point (not numeric)', () => {
				return request(app).get('/api/items/apples').expect(404);
			});
		});
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/items/3').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
				});
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
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/categories').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
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
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/users').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
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
		describe('GET REJECTED', () => {
			it('Status:404 if user does not exist', () => {
				return request(app).get('/api/users/benny').expect(404).then(({ error: { text } }) => {
					expect(text).to.equal('User not found');
				});
			});
		});
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/users/tonyboi').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
				});
			});
		});
		describe('/users/:username/items', () => {
			describe('GET RESOLVED', () => {
				it('Status:200 and returns all items associated with the current user', () => {
					return request(app).get('/api/users/umayrs95/items').expect(200).then(({ body: { items } }) => {
						expect(items[0].owner).to.equal('umayrs95');
					});
				});
			});
			describe('INVALID METHODS', () => {
				it('Status:405 when invalid methods are used on this endpoint', () => {
					return request(app).put('/api/users/tonyboi/items').expect(405).then(({ body }) => {
						expect(body.msg).to.equal('invalid method');
					});
				});
			});
		});
	});
	describe('/requests/:request_id', () => {
		describe('GET RESOLVED', () => {
			it('Status:200 and returns request by request id', () => {
				return request(app).get('/api/requests/1').expect(200).then(({ body: { request } }) => {
					expect(request[0]).to.contain.keys('request_user', 'item_id', 'body');
				});
			});
		});
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/requests/1').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
				});
			});
		});
	});
	describe('/requests', () => {
		describe('/incoming', () => {
			describe('GET RESOLVED', () => {
				it('Status:200 and returns all requested items by username query', () => {
					return request(app)
						.get('/api/requests/incoming?username=umayrs95')
						.expect(200)
						.then(({ body: { incoming } }) => {
							expect(incoming[0].owner).to.equal('umayrs95');
						});
				});
			});
			describe('INVALID METHODS', () => {
				it('Status:405 when invalid methods are used on this endpoint', () => {
					return request(app).put('/api/requests/incoming?username=umayrs95').expect(405).then(({ body }) => {
						expect(body.msg).to.equal('invalid method');
					});
				});
			});
		});
		describe('/outgoing', () => {
			describe('GET RESOLVED', () => {
				it('Status:200 and returns all outgoing requests by username query', () => {
					return request(app)
						.get('/api/requests/outgoing?username=umayrs95')
						.expect(200)
						.then(({ body: { outgoing } }) => {
							expect(outgoing[0].request_user).to.equal('umayrs95');
						});
				});
			});
			describe('INVALID METHODS', () => {
				it('Status:405 when invalid methods are used on this endpoint', () => {
					return request(app).put('/api/requests/outgoing?username=umayrs95').expect(405).then(({ body }) => {
						expect(body.msg).to.equal('invalid method');
					});
				});
			});
		});
		describe('POST RESOLVED', () => {
			it('Status:201 and returns the posted request', () => {
				return request(app)
					.post('/api/requests')
					.send({ request_user: 'tonyboi', item_id: 1, body: 'Hey, can I rent this off you for a couple of days?' })
					.expect(201)
					.then(({ body: { request } }) => {
						expect(request[0]).to.contain.keys(
							'request_user',
							'body',
							'item_id',
							'owner',
							'category',
							'img_url',
							'is_available',
							'price',
							'location'
						);
						expect(request[0].request_user).to.equal('tonyboi');
					});
			});
		});
		describe('INVALID METHODS', () => {
			it('Status:405 when invalid methods are used on this endpoint', () => {
				return request(app).put('/api/requests').expect(405).then(({ body }) => {
					expect(body.msg).to.equal('invalid method');
				});
			});
		});
	});
});
