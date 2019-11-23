const { ApolloServer } = require("apollo-server");
const dns = require("dns");

const typeDefs = `

	type Item {
		id: Int
		type: String
		description: String
	}

	type Domain {
		name: String
		url: String
		available: Boolean
		extension: String
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
		generateDomains: [Domain]
		generateDomain(name: String): [Domain]
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

const isDomainAvailable = function(url){
	return new Promise(function(resolve, reject){
		dns.resolve(url, function(error){
				if(error) resolve(true);
				else resolve(false);
		});
	});
}

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
		},

		async generateDomains(){
			//console.log("gerando domains...");
			const domains = [];
			//sempre que prefixes ou sufixes for alterado,
			//o vue chamará essa função
			for (const prefix of itens.filter(item => item.type === 'prefix')) {
				for (const sufix of itens.filter(item => item.type === 'sufix')) {
					const name = prefix.description + sufix.description;
					const link = name.toLowerCase();
					const url = `http://sistemas.ufgd.edu.br/sai/${link}`;
					const available = await isDomainAvailable(`${link}.com.br`);
					domains.push({
						name,
						url,
						available
					});
				}
			}
			return domains;
		},

		async generateDomain(_, args){
			const name = args.name;
			//console.log(name);
			const domains = [];
			const extensions = [".com.br", ".com", ".net", ".org"];
			for(const extension of extensions){
				const link = name.toLowerCase();
					const url = `${link}${extension}`;
					const available = await isDomainAvailable(url);
					domains.push({
						name,
						url,
						available,
						extension
					});
			}
			return domains;
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers});
server.listen();