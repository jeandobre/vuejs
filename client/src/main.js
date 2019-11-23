import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import DomainList from "./components/DomainList.vue";
import DomainView from "./components/DomainView.vue";
import Vuex from "vuex";
import axios from "axios/dist/axios";

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
	state : {
		item: {
			prefix:[],
			sufix:[]
		},
		domains:[]
	},
	mutations:{
		addItem(state, payload){
			const { item, newItem } = payload;
			state.item[item.type].push(newItem);
		},
		
		deleteItem(state, payload){
			const { item } = payload;
			state.item[item.type].splice(state.item[item.type].indexOf(item), 1);
		},
		
		setItems(state, payload){
			const { itens, type } = payload;
			state.item[type] = itens; //.map(prefix => prefix.description);
		},

		setDomains(state, payload){
			const { domains } = payload;
			state.domains = domains;
		}
	},
	actions:{
		async addItem(context, payload){
			const item = payload;
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
				context.commit("addItem", { item, newItem });
				context.dispatch("generateDomains");
			});
		},
		async deleteItem(context, payload){
			const item = payload;
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
				context.commit("deleteItem", { item });
				context.dispatch("generateDomains");
			});
		},
		async getItem(context, payload){
			const type = payload;

			return axios({
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
				context.commit("setItems", { itens: query.data.item, type } );
				
			});
		},
		async generateDomains(context){
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation {
							domains: generateDomains {
								name
								url
								available
							}
						}
					`
				}
			}).then(response => {
				const query = response.data;
				context.commit("setDomains", { domains: query.data.domains });
			});
		}
	}
});

const router = new VueRouter({
	routes: [
		{
			path: "/domains",
			component: DomainList
		},
		{
			path: "/domains/:domain",
			component: DomainView,
			props: true
		},
		{
			path: "/",
			redirect: "/domains"
		}
	]
});

Promise.all([
	store.dispatch("getItem", "prefix"),
	store.dispatch("getItem", "sufix")
]).then(() => {
	store.dispatch("generateDomains");
});


Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
