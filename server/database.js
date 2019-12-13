const { Client } = require("pg");

const client = new Client({
	user: "postgres",
	password : "post",
	database: "namegator",
	port: 5433
});

client.connect();

exports.execute = function(query, values){
	return new Promise(function(resolve, reject){
		client.query(query, values, function(err, res){
			if(err){
				reject(err);
			}	else {
				resolve(res.rows);
			}
		});
	});
}