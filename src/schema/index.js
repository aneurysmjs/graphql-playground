import {
	GraphQLSchema,
	GraphQLList,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLNonNull
} from 'graphql';

import productsList from './products.json';

import { createProduct } from '../mutations'

const productType = new GraphQLObjectType({
	name: 'product',
	description: 'products of the store',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the product.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the product.',
		},
		price: {
			type: GraphQLInt,
			description: 'How much it cost',
		},
		stock: {
			type: GraphQLInt,
			description: 'How many are in stock',
		},
		favorite: {
			type: GraphQLBoolean,
			description: 'is this your favorite?'
		},
	},
});

const mutationType = new GraphQLObjectType({
	name: 'Mutations',
	description: 'root mutation',
	fields: {
		createProduct: {
			type: productType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'The name of the product.',
				},
				price: {
					type: new GraphQLNonNull(GraphQLInt),
					description: 'How much it cost',
				},
				stock: {
					type: new GraphQLNonNull(GraphQLInt),
					description: 'How many are in stock',
				},
				favorite: {
					type: new GraphQLNonNull(GraphQLBoolean),
					description: 'is this your favorite?'
				},
			},
			resolve: (_, args) => {
				const result = createProduct(productsList, args);
				console.log('result', result);
				return result;
			}
		},
	}
});

const queryType = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'The root query type.',
	fields: {
		product: {
			type: productType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'The id of the product',
				},
			},
			resolve: (_, args) => new Promise((resolve) => {
				const [product] = productsList.filter(v => v.id === args.id);
				resolve(product);
			}),
		},
		products: {
			type: GraphQLList(productType),
			resolve: () => new Promise((resolve) => {
				resolve(productsList);
			}),
		},
	},
});

const schema = new GraphQLSchema({
	query: queryType,
	mutation: mutationType,
});

export default schema;
