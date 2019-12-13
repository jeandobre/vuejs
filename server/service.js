const database = require("./database");

exports.getItensByType = function(type){
	return database.execute("SELECT * FROM namegator.itens WHERE type = $1", [type]);
};

exports.getItens = function(){
	return database.execute("select * from namegator.itens");
};

exports.saveItem = function(item){
	return database.execute("INSERT INTO namegator.itens (type, description) VALUES ($1, $2) returning *", [item.type, item.description]); 
};

exports.deleteItem = function(id){
	return database.execute("DELETE FROM namegator.itens WHERE id = $1", [id]);
};