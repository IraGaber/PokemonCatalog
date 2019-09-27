<template>
	<nav class="pagesnav">
		<template v-if="this.$store.state.pageNumber > 1" >
			<button v-if="this.$store.state.pageNumber != 2" class="pagesnav__page"   @click="firstPage()">1</button>
			<button class="pagesnav__page" @click="prevPage()">{{this.$store.state.pageNumber - 1}}</button>
		</template>
		<button class="pagesnav__page pagesnav__page_current"> {{this.$store.state.pageNumber}}</button>
		<template v-if="this.$store.state.pageNumber < this.$store.state.pageQuantity" >
			<button class="pagesnav__page" @click="nextPage()">{{this.$store.state.pageNumber  + 1}}</button>
			<button v-if="this.$store.state.pageNumber + 1 < this.$store.state.pageQuantity" class="pagesnav__page" @click="lastPage()" >{{this.$store.state.pageQuantity}}</button>
		</template>
	</nav>
</template>
<script>
	export default {
		
		methods:{
			firstPage(){
				this.$router.push( {path: '', query: {offset: 0, limit: this.$route.query.limit}} );
				this.$store.dispatch('upDatePokemons', ( {offset: 0, limit: this.$route.query.limit} ));

			},
			prevPage(){
				const newOffset = (this.$route.query.offset - this.$route.query.limit >= 0) ? this.$route.query.offset - this.$route.query.limit : 0; //offset не может быть отрицательным
				this.$router.push( {path: '', query: {offset: newOffset, limit: this.$route.query.limit}} );
				this.$store.dispatch('upDatePokemons', ( {offset: newOffset, limit: this.$route.query.limit} ));

			},
			nextPage(){
				const newOffset = +this.$route.query.offset + +this.$route.query.limit 
				this.$router.push( {path: '', query: {offset: newOffset, limit: this.$route.query.limit}} );
				this.$store.dispatch('upDatePokemons', ( {offset: newOffset, limit: this.$route.query.limit} ));
			},
			lastPage(){
				const newOffset = 964 - this.$route.query.limit;
				this.$router.push( {path: '', query: {offset: newOffset, limit: this.$route.query.limit}} );
				this.$store.dispatch('upDatePokemons', ( {offset: newOffset, limit: this.$route.query.limit} ));
			}
		},
		computed: {
			pageNumber: function () {
				return this.$store.state.pageNumber;
			}
		},
	}
</script>
<style csoped lang="sass">
	.pagesnav
		margin-bottom: 20px
		width: 100%
		display: flex
		justify-content: center
		align-items: center
	.pagesnav__page
		height: 100%
		border: 1px solid #4f4f4f
		margin: 0 3px
		color: #4f4f4f
		font-size: 44px
	.pagesnav__page_current
		color: black
		background-color: #ccb3bb
		cursor: default
</style>