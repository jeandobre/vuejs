const { ApolloServer } = require("apollo-server");

const typeDefs = `

	type Item {
		id: Int
		type: String
		description: String
	}

	type Query {
		itens (type: String): [Item]
	}

	input ItemInput{
		type: String
		description: String
	}

	type Mutation {
		saveItem(item:ItemInput): Item
		deleteItem(id : Int):Boolean
	}

`;

const itens = [
	{ id : 1, type: "prefix", description: "Air"},
	{ id : 2, type: "prefix", description: "Jet"},
	{ id : 3, type: "prefix", description: "Flight"},
	{ id : 4, type: "sufix", description: "Hub"},
	{ id : 5, type: "sufix", description: "Station"},
	{ id : 6, type: "sufix", description: "Mart"},
];

const resolvers = {
	Query : {
		itens(_,args){
			return itens.filter(item => item.type === args.type);
		}
	},
	Mutation:{
		saveItem(_,args) { 
			const item = args.item;
			item.id = Math.floor(Math.random() * 1000);
			itens.push(item);
			return item;
		},
		deleteItem(_,args){
			const id = args.id;
			const item = itens.find(item => item.id === id);
			if(!item) return false;
			itens.splice(itens.indexOf(item), 1);
			return true;
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers});
server.listen();