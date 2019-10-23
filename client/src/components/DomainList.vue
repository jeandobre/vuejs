<template>
	<div>
		<div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<AppItemList title="Prefixos" v-bind:items="prefixes" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix"></AppItemList>
					</div>
					<div class="col-md">
						<AppItemList title="Sufixos" v-bind:items="sufixes" v-on:addItem="addSufix" v-on:deleteItem="deleteSufix"></AppItemList>
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
			prefixes: [],
			sufixes: []
		};
	},
	methods: {
		addPrefix(prefix) {
			this.prefixes.push(prefix);
		},
		addSufix(sufix) {
			this.sufixes.push(sufix);
		},
		deletePrefix(prefix) {
			this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
		},
		deleteSufix(sufix) {
			this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
		}
	},
	computed: {
		domains() {
			console.log("gerando domains...");
			const domains = [];
			//sempre que prefixes ou sufixes for alterado,
			//o vue chamará essa função
			for (const prefix of this.prefixes) {
				for (const sufix of this.sufixes) {
					const name = prefix + sufix;
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
		axios({
			url : "http://localhost:4000",
			method: "post",
			data : {
				query : `
					{
						prefixes: itens (type: "prefix") {
							id
							type
							description
						}

						sufixes: itens (type: "sufix") {
							description
						}
					}
				`
			}
		}).then(response => {
			const query = response.data; //data do axios
			this.prefixes = query.data.prefixes.map(prefix => prefix.description);
			this.sufixes = query.data.sufixes.map(sufix => sufix.description);
		});
	}
};
</script>

<style>

</style>
