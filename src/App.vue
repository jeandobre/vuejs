<template>
  <div >
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <div class="text-secondary">Aplicação geradora de nomes para aprender VueJs</div>
    </div>
    <div id="main">
        <div class="container">
            <div class="row">
              <div class="col-md">
                <h5>Prefixos <span class="badge badge-info">{{ prefixes.length }}</span></h5>
                <div class="card">
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                        {{prefix}}
                      </li>                                      
                    </ul>    
                    <br/>                    
                    <div class="input-group">
                      <input class="form-control" type="text" placeholder="Digite o prefixo" v-model="prefix"
                            v-on:keyup.enter="addPrefix(prefix)" />   
                      <div class="input-group-append">
                        <button class="btn btn-info" v-on:click="addPrefix(prefix)"><span class="fa fa-plus"></span></button>
                      </div>             
                    </div>
                  </div>                  
                </div>
              </div>
              <div class="col-md">
                <h5>Sufixos <span class="badge badge-info">{{ sufixes.length }}</span></h5>
                <div class="card">
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                        <div class="row">
                          <div class="col-md">
                            {{ sufix }}
                          </div>
                          <div class="col-md text-right">
                            <button class="btn btn-danger btn-mini" v-on:click="deleteSufix(sufix)"><span class="fa fa-trash"></span></button>
                          </div>
                        </div>
                      </li>                                     
                    </ul>
                    <br/>
                    <div class="input-group">
                      <input class="form-control" type="text" 
                      v-on:keyup.enter="addSufix(sufix)"
                      v-model="sufix" placeholder="Digite o sufixo" />   
                      <div class="input-group-append">
                        <button class="btn btn-info" v-on:click="addSufix(sufix)"><span class="fa fa-plus"></span></button>
                      </div>             
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <h5>Domains <span class="badge badge-info">{{ domains.length }}</span></h5>
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
												<a class="btn btn-success" v-bind:href="domain.url" target="_blank" >
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

import  "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
	name: "app",
	data : function() {
		return {
			prefix : "",
			sufix : "",
			prefixes : ["Air", "Jet", "Flight"],
			sufixes : ["Hub", "Station", "Mart"]
		};
	},
	methods: {
		addPrefix(prefix){
			this.prefixes.push(prefix);
			this.prefix = "";
			
		},
		addSufix(sufix) {
			this.sufixes.push(sufix);
			this.sufix = "";
			
		}, 
		deletePrefix(prefix){},
		deleteSufix(sufix){
			this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
			
		},
	},
	computed: {
		domains() {
			console.log("gerando domains...");
			const domains = [];
			//sempre que prefixes ou sufixes for alterado,
			//o vue chamará essa função
			for(const prefix of this.prefixes){
				for(const sufix of this.sufixes){
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
	beforeCreate(){},

	//este método é disparado quando o componente já está criado
	//ideal para buscar dados do backend
	created() {}
};
</script>

<style>
  #slogan{
    margin-top: 30px;
    margin-bottom: 30px;
  }

  #main{
    background-color: #f1f1f1;
    padding-top: 30px;
    padding-bottom: 30px;
  }
</style>
