<template>
	<header class="header">
		<a href="/"><img class="header__logo" src="logo.png"/></a>
		
		<div v-if="isMain" class="header__btns">
			<select ref="limit" name="limit"  class="header__quntity-select" v-on:change="changeLimit">
				<option v-bind:value="this.$store.state.limit" selected>{{this.$store.state.limit}}</option>
				<option  v-if="this.$store.state.limit !=5" v-bind:value="5">5</option>  <!--v-if чтобы не повторялись значения  -->
				<option v-if="this.$store.state.limit !=10" v-bind:value="10">10</option>
				<option v-if="this.$store.state.limit !=20" v-bind:value="20">20</option>
				<option v-if="this.$store.state.limit !=50" v-bind:value="50">50</option>

			</select>
			<button class="header__view" @click="changeView">
	   			 <font-awesome-icon :icon="['fab', 'microsoft']"/>
			</button>
		</div>
	   	<router-link :to="'/'" v-else>
	   		<font-awesome-icon class="header-back" :icon="['fas', 'arrow-left']"/>
	   	</router-link>

	</header>
</template>
<script>
	export default {
		data () {
			return {
			}
		},
		methods:{
			changeLimit(){
				const selectLimit = this.$refs.limit;
				this.$router.push({ path: '', query: {offset: this.$route.query.offset, limit: selectLimit.options[selectLimit.selectedIndex].value}});
				console.log( selectLimit.options[selectLimit.selectedIndex].value);
				this.$store.dispatch('upDatePokemons', ( {offset: this.$route.query.offset, limit: selectLimit.options[selectLimit.selectedIndex].value} ));
				this.$refs.limit.selectedIndex = 0; //значение первого option - всегда вібраное значение
			},
			changeView(){
				this.$store.commit('changeView', this.index);
			}
		},
		mounted(){
		},
		props: ['isMain']
	}
</script>
<style  lang="sass">
	.header
		width: 100%
		background-color: #ccb3bb
		display: flex
		align-items: center
		justify-content: space-between
		padding: 10px 50px
		@media screen and (max-width: 480px)
			padding: 10px
	.header__logo
		height: 50px
	.header__btns
		display: flex
		align-items: center
	.header__quntity-select
		height: 50px
		padding: 0 20px
		text-align: center

	.header__view
		margin-left: 10px
		border: none
		height: 50px
		outline: none
		background: none
		font-size: 44px
		color: #7f7f7f
		@media screen and (max-width: 850px)
			display: none
	.header-back
		color: #7f7f7f
		font-size: 52px
	


</style>