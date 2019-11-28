apiInfo = (req, res, next) => {
	res.status(200).send({
		'GET /api': {
			description: 'serves up a json representation of all the available endpoints of the api'
		},
		'GET /api/categories': {
			description: 'serves an array of all categories',
			queries: [],
			exampleResponse: {
				categories: [ { slug: 'audio', description: 'Audio kit' } ]
			}
		},
		'GET /api/items': {
			description: 'serves an array of all items',
			queries: [],
			exampleResponse: {
				items: [
					{
						title: 'Mic',
						body: 'Microphone, only slightly used',
						item_id: 1,
						price: 10,
						owner: 'username-here',
						img_url: 'item-image-url-here',
						is_available: true,
						category: 'audio',
						requested: 0,
						location: 'Bradford'
					}
				]
			}
		},
		'POST /api/items': {
			description: 'posts a new item',
			queries: [],
			exampleRequest: {
				item_id: 4,
				title: 'Drumpad',
				owner: 'umayrs95',
				body: 'my new music thing up for grabs guys - only $10!',
				category: 'audio',
				img_url: 'img-url-here',
				is_available: true,
				price: 10,
				location: 'Bradford',
				requested: 2
			}
		},
		'GET /api/items/:item_id': {
			description: 'gets an item by id',
			queries: [],
			exampleResponse: {
				item: {
					item_id: 3,
					title: 'Cables',
					img_url: 'img-url-here',
					category: 'audio',
					owner: 'username-here',
					body: 'Description of item...',
					is_available: true,
					requested: 1,
					location: 'Leeds',
					price: 8
				}
			}
		},
		'PATCH /api/items/:item_id': {
			description: "edits an item by it's id",
			queries: [],
			exampleRequest: {
				title: 'Amplifier'
			},
			exampleResponse: {
				item: {
					item_id: 1,
					title: 'Amplifier',
					body: 'Description of item...',
					category: 'audio',
					img_url: 'img-url-here',
					owner: 'username-here',
					requested: 0,
					price: 30,
					location: 'Leeds',
					is_avialable: false
				}
			}
		},
		'GET /api/messages/sent/:username': {
			description: 'gets an array of messages sent by user',
			queries: [],
			exampleResponse: {
				messages: [
					{
						message_id: 1,
						title: 'Item available?',
						body: 'Is this item still available by any chance?',
						sent_from: 'username-in-parametric',
						sent_to: 'username-here',
						created_at: '2018-11-15T12:21:54.171Z'
					}
				]
			}
		},
		'GET /api/messages/received/:username': {
			description: 'gets an array of messages sent to user',
			queries: [],
			exampleResponse: {
				messages: [
					{
						message_id: 1,
						title: 'Item unavailable',
						body: 'Sorry, this item is not available at the moment',
						sent_from: 'username-here',
						sent_to: 'username-in-parametric',
						created_at: '2018-11-15T12:21:54.171Z'
					}
				]
			}
		},
		'GET /api/messages/:messages_id': {
			description: "gets a message by it's id",
			queries: [],
			exampleResponse: {
				message: {
					message_id: 1,
					title: 'Item unavailable',
					body: 'Sorry, this item is not available at the moment',
					sent_from: 'username-here',
					sent_to: 'different-username-here',
					created_at: '2018-11-15T12:21:54.171Z'
				}
			}
		},
		'POST /api/messages': {
			description: 'posts a new message',
			queries: [],
			exampleRequest: {
				title: 'Pickup time',
				body: 'When is a good time for me to pick the kit up?',
				sent_from: 'username-here',
				sent_to: 'different-username-here'
			}
		},
		'GET /api/requests/incoming': {
			description: 'gets incoming requests for a user (by username query)',
			queries: [ 'username=username-here (NEEDED)' ],
			exampleResponse: {
				requests: [
					{
						request_id: 1,
						request_user: 'different-username-here',
						item_id: 3,
						body: 'Can I rent this kit out for 3 days?'
					}
				]
			}
		},
		'GET /api/requests/outgoing': {
			description: 'gets outgoing requests for a user (by username query)',
			queries: [ 'username=username-here (NEEDED)' ],
			exampleResponse: {
				requests: [
					{
						request_id: 7,
						request_user: 'username-from-query',
						item_id: 5,
						body: 'Can I rent this kit out for 2 days?'
					}
				]
			}
		},
		'GET /api/requests/:request_id': {
			description: "gets a request by it's id",
			queries: [],
			exampleResponse: {
				request: {
					request_id: 3,
					request_user: 'username-here',
					item_id: 8,
					body: 'Can I rent this kit out for a few days?'
				}
			}
		},
		'POST /api/requests': {
			description: 'posts a new request',
			queries: [],
			exampleRequest: {
				item_id: 1,
				request_user: 'username-here',
				body: 'What is the max time I can rent this out for?'
			}
		},
		'GET /api/users': {
			description: 'gets an array of users',
			queries: [],
			exampleResponse: {
				users: [
					{
						username: 'username-here',
						fullname: 'fullname-here',
						location: 'Leeds',
						img: 'img-url-here'
					}
				]
			}
		},
		'GET /api/users/:username': {
			description: 'gets a user by username',
			queries: [],
			exampleResponse: {
				user: {
					username: 'username-in-parametric',
					fullname: 'fullname-here',
					location: 'Leeds',
					img: 'img-url-here'
				}
			}
		},
		'GET /api/users/:username/items': {
			description: 'gets the items for a user',
			queries: [],
			exampleResponse: {
				items: [
					{
						item_id: 3,
						title: 'Cables',
						img_url: 'img-url-here',
						category: 'audio',
						owner: 'username-here',
						body: 'Description of item...',
						is_available: true,
						requested: 1,
						location: 'Leeds',
						price: 8
					}
				]
			}
		}
	});
};

module.exports = apiInfo;
