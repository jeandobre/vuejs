<template>
	<div>
		<div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<AppItemList title="Prefixos" type="prefix" v-bind:items="item.prefix" v-on:addItem="addItem" v-on:deleteItem="deleteItem"></AppItemList>
					</div>
					<div class="col-md">
						<AppItemList title="Sufixos" type="sufix" v-bind:items="item.sufix" v-on:addItem="addItem" v-on:deleteItem="deleteItem"></AppItemList>
					</div>
				</div>
				<br/>
				<h5>
					Domains
					<span class="badge badge-info">{{ domains.length }}</span>
				</h5>
				<div class="card">
					<div class="card-body">
						<ul class="list-group">
							<li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
								<div class="row">
									<div class="col-md">
										{{ domain.name }}
										{{ domain.url }}
									</div>
									<div class="col-md text-right">
										<a class="btn btn-success" v-bind:href="domain.url" target="_blank">
											<span class="fa fa-shopping-cart"></span>
										</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>

import AppItemList from "./AppItemList";
import axios from "axios/dist/axios";

export default {
	name: "app",
	components: {
		AppItemList
	},
	data: function() {
		return {
			item: {
				prefix:[],
				sufix:[]
			}
		};
	},
	methods: {
		addItem(item) {
			//this.prefixes.push(prefix);
			axios({
				url: "http://localhost:4000",
				method: "post",
				data:{
					query:`
						mutation ($item : ItemInput) {
							newItem: saveItem (item: $item){
								id
								type
								description
							}
						}
					`,
					variables:{
						item
					}
				}
			}).then(response => {
				const query = response.data;
				const newItem = query.data.newItem;
				this.item[item.type].push(newItem);
			});
		},

		deleteItem(item) {
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation($id: Int) {
							deleted: deleteItem(id: $id)
						}
					`,
					variables:{
						id : item.id
					}
				}
			}).then(() => {
				this.getItem(item.type);
			});
		},
		
		getItem(type){
			axios({
				url : "http://localhost:4000",
				method: "post",
				data : {
					query : `
						query($type:String){
							item: itens (type: $type) {
								id
								type
								description
							}
						}
					`,
					variables:{
						type
					}
				}
			}).then(response => {
				const query = response.data; //data do axios
				this.item[type] = query.data.item; //.map(prefix => prefix.description);
			});
		}
	},
	computed: {
		domains() {
			console.log("gerando domains...");
			const domains = [];
			//sempre que prefixes ou sufixes for alterado,
			//o vue chamará essa função
			for (const prefix of this.item.prefix) {
				for (const sufix of this.item.sufix) {
					const name = prefix.description + sufix.description;
					const link = name.toLowerCase();
					const url = `http://sistemas.ufgd.edu.br/sai/${link}`;
					domains.push({
						name,
						url
					});
				}
			}
			return domains;
		}
	},
	//neste método ainda não existe os métodos criados,
	//não é possivel chamar nenhum método
	beforeCreate() {},

	//este método é disparado quando o componente já está criado
	//ideal para buscar dados do backend
	created() {
		//Chamar o axios para fazer a conexão com o graphQL
		//criar com um objeto de configuração
		this.getItem("prefix");
		this.getItem("sufix");
	}
};
</script>

<style>

</style>
