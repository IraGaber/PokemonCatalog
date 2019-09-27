<template>
<router-link :to=" ''+ item.id " class="pokemon-link-wrapper" v-bind:class="`pokemon-link-wrapper__${listView}`" > 
	<div class="pokemon">
		<div class="pokemon__img-wrapper">
			<div class="pokemon__images">
				<img class="pokemon__img pokemon__img_front" v-bind:src="item.frontImg" v-bind:alt="item.name">
				<img class="pokemon__img pokemon__img-back" v-bind:src="item.backImg" v-bind:alt="item.name">
			</div>
		</div>

		<div class="pokemon__dates">
			<p class="pokemon__data pokemon__data_name">name: {{item.name}}</p>
			<p class="pokemon__data">weight: {{item.weight}}</p>
			<p class="pokemon__data">height: {{item.height}}</p>
			<p class="pokemon__data">exp: {{item.experience}}</p>
		</div>
	</div>
</router-link>
</template>
<script>
	export default {
		data(){
			return{
			}
		},
		computed: {
			listView: function () {
				return this.$store.state.view;
			}
		},
		methods: {
		},
		mounted: function(){
		},
		props: ['item']
	}
</script>
<style csoped lang="sass">
.list
	display: flex
	flex-wrap: wrap
	justify-content: space-between
.pokemon-link-wrapper
	display: block
	// width: 100%
.pokemon-link-wrapper__list
	width: 100%
	
.pokemon-link-wrapper__table
	width: 370px
	max-width: 100%
	@media screen and (max-width: 850px)
		width: 100%


.pokemon
    align-items: center
    cursor: pointer
.pokemon__img-wrapper
	background-color: transparent
	width: 100px
	height: 100px
	perspective: 300px
	margin-right: 50px
	
.pokemon__images
	position: relative
	width: 100%
	height: 100%
	text-align: center
	transition: transform 0.6s
	transform-style: preserve-3d
	border: 1px solid #7f7f7f

.pokemon__img-wrapper:hover .pokemon__images
  transform: rotateY(180deg)

.pokemon__img
	position: absolute
	left: 0
	top: 0
	width: 100%
	height: 100%
	backface-visibility: hidden

.pokemon__img-back
	background-color: #ccb3bb
	color: white
	transform: rotateY(180deg)

.pokemon__dates
	text-transform: capitalize
	font-family: cursive

.pokemon__data_name
	font-size: 20px
	font-weight: bold
	margin-bottom: 10px

</style>
