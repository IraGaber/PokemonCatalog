import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

	state: {
		quantityToShow: 10,
		view: 'list',
		pokemons: [],
		pokemonsReady: false,
		limit: null,
		offset: null,
		pageNumber: null,
		pageQuantity: null
	},
	mutations: {
		changeQuantityToShow: (state, newValue) => {state.quantitytoShow = newValue}, 
		changeView: (state) => {
			if (state.view == "list") state.view = "table"
			else state.view = "list"
		},
		changePokemonList: (state, newList) => {
			state.pokemons = newList;
		},
		changePokemonStatus: (state, status) => {
			state.pokemonsReady	= status;
		},
		changeLimit: (state, value) => {
			state.limit	= value;
		},
		changeOffset: (state, value) => {
			state.offset = value;
		},
		definePageNum: (state) =>{
			state.pageQuantity = Math.floor(964 / state.limit) + 1;
			state.pageNumber = Math.ceil(state.offset / state.limit) + 1;

			// 963:limit - количество страниц 
			// offset:limit - текущая страница 
		}
	},
	actions: {
		upDatePokemons(context, requestData){ //requestData imclude offset & limit
			context.commit('changePokemonStatus', false);
			context.commit('changeLimit', requestData.limit);
			context.commit('changeOffset', requestData.offset);
			context.commit('definePageNum');

			let pokemons = [];
			this.$axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${requestData.offset}&limit=${requestData.limit}`)
			.then( (response) => {
				pokemons = response.data.results;
				for (let i = 0; i < pokemons.length; i++) {
				this.$axios.get(pokemons[i].url)
					.then((response) => {
						pokemons[i].id = response.data.id;
						pokemons[i].weight = response.data.weight;
						pokemons[i].experience = response.data.base_experience;
						pokemons[i].frontImg = response.data.sprites.front_default || "no-photo.png";
						pokemons[i].backImg = response.data.sprites.back_default || "no-photo.png";
						Vue.set(pokemons[i], 'height', response.data.height); //иначе вне реактиности
					})
				}
				
			})
			.then(()=>{
				context.commit('changePokemonList', pokemons);
				context.commit('changePokemonStatus', true);
			})
			.catch( (error) => {
				console.log(error);
				console.log('не получилось');
			})
		}
	}
})
export default store