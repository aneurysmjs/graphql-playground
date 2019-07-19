const videoA = {
	id: 'a',
	title: 'Create a GraphQL Schema',
	duration: 120,
	watched: true,
};

const videoB = {
	id: 'b',
	title: 'Ember.js CLI',
	duration: 240,
	watched: false,
};

const videos = [videoA, videoB];

const resolvers = {
	video: () => ({
		id: '1',
		title: 'Foo',
		duration: 180,
		watched: true,
	}),
	videos: () => videos,
};

export default resolvers;
