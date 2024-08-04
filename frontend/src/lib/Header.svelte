<script>
	import Nav from "./Nav.svelte";
	export let title = "talktalk!!";
</script>

<div class="header">
	<div class="banner">
		<!-- TODO: Put image(s) for banner(s) here later -->
		<img src="" alt="placeholder banner" />
	</div>
	<div class="title"><h1>{title}</h1></div>
</div>

<style>
	h1 {
		font-size: 2em;
		text-align: center;
		margin: 20px 0;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.banner {
		/* LMFAO */
		width: 450px;
		height: 150px;
		/* object-fit: cover; */
	}

	.banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
