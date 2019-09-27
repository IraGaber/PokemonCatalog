<template>
	<div class="pokeData">
		<Header  v-bind:isMain="false"/>

		<main class="main-content" v-if="ready">
			<section class="pokeData__base" >
				<div class="pokeData__img-wrapper">
					<div class="pokeData__images">
						<img class="pokeData__img pokeData__img_front" v-bind:src="pokemonInfo.sprites.front_default" v-bind:alt="pokemonInfo.name">
						<img class="pokeData__img pokeData__img-back" v-bind:src="pokemonInfo.sprites.back_default" v-bind:alt="pokemonInfo.name">
					</div>
				</div>

				<div class="pokeData__dates">
					<p class="pokeData__data pokeData__data_name">name: {{pokemonInfo.name}}</p>
					<p class="pokeData__data">weight: {{pokemonInfo.weight}}</p>
					<p class="pokeData__data">height: {{pokemonInfo.height}}</p>
					<p class="pokeData__data">exp: {{pokemonInfo.base_experience}}</p>
				</div>
			</section>
			<section class="pokeData__more">
				<h2>Abilities:</h2>
					<p v-for="(item, index) in abilities"> <span class="likeh3">{{abilities[index].name}}</span> - {{abilities[index].effect_entries[0].effect}}</p>
				<h2>Stats:</h2>
				<article v-for="(item, index) in pokemonInfo.stats">
					<h3>{{pokemonInfo.stats[index].stat.name}} </h3>
					<p>Base stat - {{pokemonInfo.stats[index].base_stat}}, effort- {{pokemonInfo.stats[index].effort}}</p>
				</article>
				<h2>Types:</h2>
				<p>{{typesList}}</p>
				<h2>Species:</h2>
				<p>{{pokemonInfo.species.name}} </p>
				<h2 v-if="items.length">Held Items:</h2>
				<article v-for="(item, index) in items">
					<h3>{{item.data.name.replace(/-/g, ' ')}}</h3>
					<p>{{item.data.effect_entries[0].effect}}</p>
					<p>{{item.data.effect_entries[0].short_effect}}</p>
				</article>
				<h2 v-if="location">Location:</h2>
				<p>{{location}}</p>
			</section>
		</main>
		<loader v-else/>

	</div>
</template>
<script>
		import loader from '~/components/loader.vue';
		import Header from '~/components/header.vue';


	export default {
		data () {
			return {
				pokemonInfo: null,
				abilities: null,
				location: null,
				items: null,
				ready: false
			}
		},
		computed:{
			typesList: function() {
				return this.pokemonInfo.types.map(item => item.type.name).join(', ');
			}
		},
		mounted: function() {
			const id = this.$router.currentRoute.path.slice(1);
		    this.$axios
				.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then(response => {
					this.pokemonInfo = response.data;
					const abilityRequests = this.pokemonInfo.abilities.map((el, index) => {
						return this.$axios.get(this.pokemonInfo.abilities[index].ability.url);
					});
					Promise.all(abilityRequests).then( (abilities) => { 				//ability
						this.abilities = abilities.map(response => response.data);
						this.$axios
							.get(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)		//location
							.then((response) => {
								this.location = response.data.map((item) => {
									return item.location_area.name[0].toUpperCase() +  item.location_area.name.replace(/-/g, ' ').slice(1);    //заменяем 1 букву на заглавную, а затем заменяем тире на пробелы
								}).join(', '); //превращаем в строку с запятыми мкжду елементами
								const itemRequests = this.pokemonInfo.held_items.map((el, index) => {
									return this.$axios.get(this.pokemonInfo.held_items[index].item.url);
								});
								Promise.all(itemRequests).then((itemData) => { 	
									this.items = itemData;
									this.ready = true;
								});
							})
					})
				})
				.catch( (error) => {
					console.log(error);
					console.log('не получилось');
				})
		},
		components:{
			loader, 
			Header
		}
	}
</script>
<style csoped lang="sass">
.pokeData
	display: flex
	flex-direction: column
	align-items: center
.pokeData__base
	width: 100%
	margin: 20px 0
	display: flex
	align-items: center
	cursor: pointer
.pokeData__img-wrapper
	background-color: transparent
	width: 100px
	height: 100px
	perspective: 300px
	margin-right: 50px
	
.pokeData__images
	position: relative
	width: 100%
	height: 100%
	text-align: center
	transition: transform 0.6s
	transform-style: preserve-3d
	border: 1px solid #7f7f7f

.pokeData__img-wrapper:hover .pokeData__images
  transform: rotateY(180deg)

.pokeData__img
	position: absolute
	left: 0
	top: 0
	width: 100%
	height: 100%
	backface-visibility: hidden

.pokeData__img-back
	background-color: #ccb3bb
	color: white
	transform: rotateY(180deg)

.pokeData__dates
	text-transform: capitalize

.pokeData__data_name
	font-size: 20px
	font-weight: bold
	margin-bottom: 10px
</style>
