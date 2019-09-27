<template>
	<main>
		<Header  v-bind:isMain="true" />
		<div class="main-content">
			<div class="list" v-if="this.$store.state.pokemonsReady == true">
				<listItem v-for="item in this.$store.state.pokemons" v-bind:item="item"  v-bind:key="item.id" />
			</div>
			<loader v-else/>
			<pagesnav/>
		</div>
	</main>
</template>

<script>
import Header from '~/components/header.vue';

import loader from '~/components/loader.vue';
import listItem from '~/components/listItem.vue';
import pagesnav from '~/components/pagesnav.vue';


export default {
	data () {
		return {
		}
	},
	computed: {
		pokemonList: function(){
			return this.$store.state.pokemons;
		},
		pokemonStatus: function(){
			return this.$store.state.pokemonsReady;
		},
		offset: function() {
		
			if (typeof(Number(this.$route.query.offset)) == "number" && this.$route.query.offset >=0 && this.$route.query.offset <= 964 && this.$route.query.limit ){
				return this.$route.query.offset;
			}
			else {
				this.$router.push( {path: '', query: {offset: 0, limit: this.$route.query.limit || 10}} );
				return 0
			}
		},
		limit: function() {
			if (typeof(Number(this.$route.query.limit)) == "number" && this.$route.query.limit > 1 && this.$route.query.limit < 100 && this.$route.query.offset){
				return this.$route.query.limit;
			}
			else {
				this.$router.push( {path: '', query: {offset: this.$route.query.offset || 0, limit: 10}} );
				return 10;
			}
		}
	},
	methods:{
	},
	mounted: function () {
		this.$store.dispatch('upDatePokemons', { limit:this.limit, offset:this.offset });
	},
	components:{
		Header,
		loader,
		listItem,
		pagesnav
	}
}
</script>

<style csoped lang="sass">
.pokemon
	display: flex
	padding: 10px
	margin: 30px 0px
	border: 1px solid #7f7f7f
	@media screen and (max-width: 480px)
		margin: 10px 0px
</style>
