create schema namegator;

create table namegator.itens(
	id serial,
	type text not null,
	description text not null
);

insert into namegator.itens values(1, 'prefix', 'Air');
insert into namegator.itens values(2, 'prefix', 'Jet');
insert into namegator.itens values(3, 'prefix', 'Flight');
insert into namegator.itens values(4, 'sufix', 'Hub');
insert into namegator.itens values(5, 'sufix', 'Station');
insert into namegator.itens values(6, 'sufix', 'Mart');