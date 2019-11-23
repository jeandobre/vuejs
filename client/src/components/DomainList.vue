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
									<div class="col-md-6">
										{{ domain.name }}							
									</div>
									<div class="col-md-3">
										<span class="badge badge-warning">
										{{ (domain.available) ? "Disponível" : "Não"}}
										</span>
									</div>
									<div class="col-md-3 text-right">
										<a class="btn btn-success" v-bind:href="domain.url" target="_blank">
											<span class="fa fa-shopping-cart"></span>
										</a>
										&nbsp;
										<button class="btn btn-info" @click="openDomain(domain)">
											<span class="fa fa-search"></span>
										</button>

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
import { mapState, mapActions } from "vuex";

export default {
	name: "app",
	components: {
		AppItemList
	},

	data: function() {
		return {
			
		};
	},

	methods: {
		/*
		addItem(item) {
			//this.prefixes.push(prefix);
			this.$store.dispatch("addItem", item);
		},

		deleteItem(item) {
			this.$store.dispatch("deleteItem", item);
		},
		
		getItem(type){
			this.$store.dispatch("getItem", type);
		},
		
		generateDomains() {
			this.$store.dispatch("generateDomains");
		},*/
		...mapActions(["addItem", "deleteItem", "getItem", "generateDomains"]),

		openDomain(domain){
			this.$router.push({
				//Template literal (liture)
				path: `/domains/${domain.name}`
			});
		}
	},

	computed: {
		/*
		item() {
			return this.$store.state.item;
		},
		domains(){
			return this.$store.state.domains;
		} */
		...mapState(["item", "domains"])
	},
	//neste método ainda não existe os métodos criados,
	//não é possivel chamar nenhum método
	beforeCreate() {},

	//este método é disparado quando o componente já está criado
	//ideal para buscar dados do backend
	created() {
		//Chamar o axios para fazer a conexão com o graphQL
		//criar com um objeto de configuração

	}
};
</script>

<style>

</style>
